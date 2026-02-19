import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectDB } from "@/lib/mongodb";
import Conversation from "@/lib/models/Conversation";
import Message from "@/lib/models/Message";

const SYSTEM_INSTRUCTION = `Sos "Osi", parte del equipo de la Escuela Infantil "Osito Mimoso". Respondés consultas de familias por WhatsApp de forma cálida, humana y directa.

**SALUDO INICIAL:** Cuando sea el primer mensaje de la conversación, saludá usando el nombre de la persona (disponible en **Nombre de la persona** al final de este prompt). Usá este saludo como base: "¡Hola, {nombre}! Qué lindo que nos escribas a Osito Mimoso 🧸 Soy Osi, estoy acá para acompañarte y sacarte todas las dudas sobre la escuela. ¡Contame en qué puedo ayudarte! ✨" Adaptá el saludo al horario si corresponde (buenos días / buenas tardes). Nunca uses saludos informales como "¡Buenas!" a secas.

**REGLAS ABSOLUTAS:**
- NUNCA repitas el saludo ni te vuelvas a presentar si ya lo hiciste antes en la conversación. Revisá el historial.
- NUNCA uses frases de cierre o despedida como "¡Te esperamos!", "¡Hasta pronto!", "¡Fue un placer!", "¡Nos vemos!", "¡Hasta luego!" ni similares. La conversación siempre queda abierta. En cambio, al final de cada respuesta donde ya diste la info principal, podés agregar algo como "¿Tenés alguna otra duda?" o "¿Hay algo más en lo que te pueda ayudar?" para mantener el canal abierto.
- NUNCA uses respuestas estructuradas con bullets o listas numeradas. Hablás como una persona real del equipo.
- Usás "vos" y el estilo rioplatense cálido. Nunca "usted".
- Usá siempre ortografía y gramática correcta en español. Cuando la escuela es el sujeto, usá primera persona del plural: "te contamos", "te mostramos", "trabajamos" — nunca "te contás" ni formas reflexivas incorrectas.

**Datos del la Escuela:**
- Dirección: Agüero 508, CABA (frente al Shopping Abasto)
- Mapa: https://www.google.com/maps/place/Escuela+Infantil+Osito+Mimoso+(Sede+Abasto)/data=!4m2!3m1!1s0x0:0x68d0b13afbcf227e?sa=X&ved=1t:2428&ictx=111 (si preguntan por la ubicación, siempre incluí este link)
- Teléfono: 4872-5474
- Niveles: Lactantes, Deambuladores, y Salas de 2, 3, 4 años
- Propuesta: música, arte, juego libre y dirigido, inglés inicial
- Salas climatizadas y espacios luminosos

**Cómo manejar el interés en conocer la escuela:**
Cuando alguien quiere conocer la escuela, ofrecé las dos opciones de forma natural (no como lista numerada):

Opción 1 — **Videollamada**: para charlar con el equipo y resolver dudas sin venir a la escuela.
→ Si eligen esto, compartí SOLO el link: https://calendly.com/ositomimoso/30min (nunca lo repitas dos veces en el mismo mensaje)

Opción 2 — **Visita presencial**: vienen a la escuela, recorren las salas y conocen a las maestras.
→ Si eligen esto, NO uses Calendly. Coordiná directamente por WhatsApp: "Perfecto, ¿qué días y horarios te quedan bien?" Cuando confirmen, dales la dirección: Agüero 508, CABA (frente al Shopping Abasto). Teléfono por si lo necesitan: 4872-5474.

**Cuotas/precios:** No informes valores. Decí: "Para el detalle de cuotas según sala y turno, te conviene hablar directamente con la administración. ¿Querés que te contacten?"

**Vacantes:** Antes de dar información de vacantes, preguntá la edad del nene/a y el turno que buscan (Mañana, Tarde o Jornada Completa).

**Tono:**
- Cálido pero no infantil ni exagerado
- Frases cortas y directas
- Máximo 2-3 emojis por mensaje, solo cuando suman
- Si la familia expresa miedo o ansiedad, primero contenés emocionalmente antes de dar info
- Si preguntan si sos un bot: "Soy parte del equipo que atiende las consultas 😊 Si necesitás hablar con alguien de la escuela directamente, también lo podemos coordinar."`;

const MAX_HISTORY = 20;
const CONTEXT_WINDOW_MINUTES = 20;

// 🌐 Webhook Verification (GET)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Forbidden", { status: 403 });
}

// 📩 Message Handling (POST)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("📦 Payload recibido de Meta:", JSON.stringify(body, null, 2));

    if (body.object === "whatsapp_business_account") {
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;

      // Ignorar notificaciones de estado
      if (value?.statuses) {
        console.log("ℹ️ Notificación de estado ignorada");
        return NextResponse.json({ status: "status update ignored" });
      }

      const message = value?.messages?.[0];
      const contactName = value?.contacts?.[0]?.profile?.name || "";

      if (message?.type === "text") {
        const from = message.from;
        const text = message.text.body;
        const whatsappMessageId = message.id;

        console.log(
          `👤 Nombre del contacto (perfil WhatsApp): "${contactName}"`,
        );
        console.log(
          `💬 Procesando mensaje de ${contactName || from}: "${text}"`,
        );

        try {
          // Conectar a MongoDB
          await connectDB();

          // Marcar como leído (ticks azules)
          await markAsRead(whatsappMessageId);

          // Buscar o crear conversación en MongoDB
          let conversation = await Conversation.findOne({ phoneNumber: from });
          if (!conversation) {
            conversation = await Conversation.create({
              phoneNumber: from,
              contactName: contactName || "",
              botActive: true,
              lastMessageAt: new Date(),
            });
            console.log(`📝 Nueva conversación creada para ${from}`);
          } else {
            // Actualizar nombre si cambió, fecha del último mensaje,
            // y desarchivar si estaba archivada (nuevo mensaje = conversación activa)
            await Conversation.updateOne(
              { _id: conversation._id },
              {
                contactName: contactName || conversation.contactName,
                lastMessageAt: new Date(),
                archived: false,
              },
            );
          }

          // Guardar mensaje del usuario en MongoDB
          await Message.create({
            conversationId: conversation._id,
            role: "user",
            text,
            whatsappMessageId,
            timestamp: new Date(),
          });

          // Si el bot está desactivado, no responder con Gemini
          if (!conversation.botActive) {
            console.log(
              `🔕 Bot desactivado para ${from}. Mensaje guardado sin respuesta automática.`,
            );
            return NextResponse.json({ status: "success" });
          }

          // Cargar historial reciente (solo mensajes dentro de la ventana de contexto)
          const contextCutoff = new Date(
            Date.now() - CONTEXT_WINDOW_MINUTES * 60 * 1000,
          );
          const recentMessages = await Message.find({
            conversationId: conversation._id,
            timestamp: { $gte: contextCutoff },
          })
            .sort({ timestamp: -1 })
            .limit(MAX_HISTORY)
            .lean();

          // Convertir al formato que espera Gemini (orden cronológico, sin el último mensaje del usuario)
          const history = recentMessages
            .reverse()
            .slice(0, -1) // excluir el último (el que acabamos de guardar)
            .filter((m) => m.role === "user" || m.role === "bot")
            .map((m) => ({
              role: m.role === "user" ? ("user" as const) : ("model" as const),
              parts: [{ text: m.text }],
            }));

          console.log("🧠 Consultando a Gemini...");
          const apiKey = process.env.GEMINI_API_KEY?.trim();
          if (!apiKey) throw new Error("GEMINI_API_KEY no configurada");

          const genAI = new GoogleGenerativeAI(apiKey);
          const modelNames = ["gemini-2.0-flash", "gemini-2.0-flash-lite"];
          let aiResponse = "";

          for (const modelName of modelNames) {
            try {
              const personalizedInstruction = contactName
                ? SYSTEM_INSTRUCTION.replace("{nombre}", contactName)
                : SYSTEM_INSTRUCTION.replace("¡Hola, {nombre}!", "¡Hola!");

              const model = genAI.getGenerativeModel({
                model: modelName,
                systemInstruction: personalizedInstruction,
              });

              const chat = model.startChat({ history });
              const result = await chat.sendMessage(text);
              aiResponse = result.response.text();

              console.log(
                `🤖 Gemini (${modelName}) respondió: "${aiResponse.substring(0, 50)}..."`,
              );
              break;
            } catch (modelErr: unknown) {
              const msg =
                modelErr instanceof Error ? modelErr.message : String(modelErr);
              console.warn(`⚠️ Falló ${modelName}: ${msg}`);
            }
          }

          if (!aiResponse) throw new Error("Gemini no devolvió texto");

          // Guardar respuesta del bot en MongoDB
          await Message.create({
            conversationId: conversation._id,
            role: "bot",
            text: aiResponse,
            timestamp: new Date(),
          });

          await sendWhatsAppMessage(from, aiResponse);
          console.log("✅ Proceso completado con éxito");
        } catch (aiError: unknown) {
          const msg =
            aiError instanceof Error ? aiError.message : String(aiError);
          console.error("❌ Error procesando mensaje:", msg);
        }
      } else {
        console.log("⚠️ Tipo de mensaje no soportado:", message?.type);
      }

      return NextResponse.json({ status: "success" });
    }

    return NextResponse.json(
      { status: "not a whatsapp message" },
      { status: 404 },
    );
  } catch (error) {
    console.error("🔥 Error crítico en el Webhook:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// ✅ Marcar mensaje como leído
async function markAsRead(messageId: string) {
  const url = `https://graph.facebook.com/v22.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      status: "read",
      message_id: messageId,
    }),
  });
}

// ✉️ Función auxiliar para enviar mensajes via WhatsApp Cloud API
export async function sendWhatsAppMessage(to: string, text: string) {
  const url = `https://graph.facebook.com/v22.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: to,
      type: "text",
      text: { body: text },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("❌ WhatsApp API Error:", errorData);
  }
}
