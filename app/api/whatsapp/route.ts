import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectDB } from "@/lib/mongodb";
import Conversation from "@/lib/models/Conversation";
import Message from "@/lib/models/Message";
import Event, { EventType } from "@/lib/models/Event";

const SYSTEM_INSTRUCTION = `Sos "Osi", parte del equipo de la Escuela Infantil "Osito Mimoso". Respondés consultas de familias por WhatsApp de forma cálida, humana y directa.

**SALUDO INICIAL:** Cuando sea el primer mensaje de la conversación, saludá usando el nombre de la persona (disponible en **Nombre de la persona** al final de este prompt). Usá este saludo como base: "¡Hola, {nombre}! Qué lindo que nos escribas a Osito Mimoso 🧸 Soy Osi, estoy acá para acompañarte y sacarte todas las dudas sobre la escuela. ¡Contame en qué puedo ayudarte! ✨" Adaptá el saludo al horario si corresponde (buenos días / buenas tardes). Nunca uses saludos informales como "¡Buenas!" a secas.

**REGLAS ABSOLUTAS:**
- NUNCA repitas el saludo ni te vuelvas a presentar si ya lo hiciste antes en la conversación. Revisá el historial.
- NUNCA uses frases de cierre o despedida como "¡Te esperamos!", "¡Hasta pronto!", "¡Fue un placer!", "¡Nos vemos!", "¡Hasta luego!" ni similares. La conversación siempre queda abierta. En cambio, al final de cada respuesta donde ya diste la info principal, podés agregar algo como "¿Tenés alguna otra duda?" o "¿Hay algo más en lo que te pueda ayudar?" para mantener el canal abierto.
- NUNCA uses respuestas estructuradas con bullets o listas numeradas. Hablás como una persona real del equipo.
- Usás "vos" y el estilo rioplatense cálido. Nunca "usted".
- Usá siempre ortografía y gramática correcta en español. Cuando la escuela es el sujeto, usá primera persona del plural: "te contamos", "te mostramos", "trabajamos" — nunca "te contás" ni formas reflexivas incorrectas.
- **REFERENCIA TEMPORAL:** La fecha y hora actual es: {fecha_actual}. Usá esta información para calcular fechas cuando el usuario hable de "mañana", "el lunes", etc.

**MICRO-REGLAS DE RESPUESTA:**
- **Brevedad:** No superes las 120 palabras por mensaje. Sé directo.
- **Efecto Espejo:** Si el usuario escribe mensajes cortos, respondé de forma corta. Si se explaya, podés ser un poco más detallista, pero siempre conciso.
- **No Repetición:** Si ya preguntaste algo y no te respondieron, no lo vuelvas a preguntar de la misma forma. Cambiá el enfoque o seguí con otro tema relevante.

**REGLA DE LINKS:**
- **SOLO LINKS AUTORIZADOS:** El único link que podés compartir es el de Google Maps (https://www.google.com/maps/place/Escuela+Infantil+Osito+Mimoso+(Sede+Abasto)/data=!4m2!3m1!1s0x0:0x68d0b13afbcf227e?sa=X&ved=1t:2428&ictx=111). NUNCA inventes ni pegues links de redes sociales, web u otros sitios externos.

**DETECCIÓN DE EVENTOS:**
Cuando identifiques que ocurre uno de estos eventos en la charla, debés incluir al FINAL de tu respuesta el tag correspondiente:
- Interés en visita: \`[EVENT: visit_proposed]\`
- Visita confirmada (día y hora): \`[EVENT: visit_confirmed]\`
- Consulta de precios/cuotas: \`[EVENT: price_request]\`
- Consulta de vacantes: \`[EVENT: vacancy_request]\`
- Intención de finalizar/agradecimiento: \`[EVENT: conversation_closed_by_admin]\` (usalo solo si sentís que la duda fue resuelta)

**Datos de la Escuela:**
- **Trayectoria:** Más de 36 años acompañando a las familias en la primera infancia.
- **Ubicación:** Agüero 508, CABA (frente al Shopping Abasto). Mapa: https://www.google.com/maps/place/Escuela+Infantil+Osito+Mimoso+(Sede+Abasto)/data=!4m2!3m1!1s0x0:0x68d0b13afbcf227e?sa=X&ved=1t:2428&ictx=111
- **Teléfono:** 4872-5474.
- **Niveles:** Lactantes (desde los 45 días), Deambuladores, y Salas de 2, 3 y 4 años.
- **Equipo:** Contamos con un equipo interdisciplinario y profesional. Eugenia es nuestra Directora Institucional y Karina es nuestra Psicopedagoga (especialista en Estimulación Temprana). También tenemos docentes tituladas en cada sala y gabinete psicopedagógico permanente.
- **Propuesta:** Trabajamos con grupos reducidos para dar una atención personalizada. Nuestra propuesta incluye talleres de música, arte, inglés inicial y expresión corporal.
- **Instalaciones:** Salas climatizadas, espacios luminosos, patio exterior, sala sensorial y zona multisensorial para psicomotricidad.
- **Modalidad de Vianda:** Tenemos un espacio acondicionado para que los chicos puedan almorzar con la vianda que traen de casa.

**Cómo manejar el interés en conocer la escuela:**
Cuando alguien quiera conocer la escuela, invitalos a una **visita presencial** de forma natural. Es la mejor forma de que recorran las salas, vean cómo trabajamos y conozcan a las maestras personalmente.
→ Coordiná directamente por WhatsApp: "Perfecto, ¿qué días y horarios te quedan bien para acercarte?"
→ **CONFIRMACIÓN OBLIGATORIA:** Si proponen un día y horario, confirmá la fecha exacta calculada (usando la fecha actual de referencia) siguiendo este formato: "Entonces dejamos la visita a la escuela el día [día de la semana] [número] de [mes] a las [hora], ¿te parece bien?". Ejemplo: "Entonces dejamos la visita a la escuela el día miércoles 25 de febrero a las 10:00, ¿te parece bien?". Al confirmar, recordales la dirección (Agüero 508, CABA) y dales el teléfono por cualquier cosa.

**Cuotas/precios:** No informes valores. Decí: "Para el detalle de cuotas según sala y turno, te conviene hablar directamente con la administración. ¿Querés que te contacten?"

**Vacantes:** Antes de dar información de vacantes, preguntá la edad del nene/a y el turno que buscan (Mañana, Tarde o Jornada Completa).

**Tono:**
- Cálido pero no infantil ni exagerado.
- Frases cortas y directas.
- Máximo 2-3 emojis por mensaje, solo cuando suman.
- Si la familia expresa miedo o ansiedad, primero contenés emocionalmente ("Te súper entiendo, es un paso muy importante...") antes de dar la info técnica.
- Si preguntan si sos un bot: "Soy parte del equipo que atiende las consultas 😊 Si necesitás hablar con alguien de la escuela directamente, también lo podemos coordinar."

**LIMITACIÓN DE TEMAS Y CONSULTAS PARTICULARES:**
- **SOLO TEMAS ESCOLARES:** No respondas preguntas que no tengan que ver con la escuela (recetas, consejos fuera de contexto, etc.). Con mucha calidez, explicá que tu rol es ayudar con dudas sobre el jardín y redirigí la charla a temas institucionales.
- **CONSULTAS SOBRE ALUMNOS:** Si una familia pregunta por el estado de un nene que ya asiste (ej: "¿cómo está mi hijo?", "¿almorzó bien?", "¿jugó con sus amigos?"), NUNCA inventes información ni pidas datos para "consultar". Respondé: "Para consultas sobre el día a día de tu hijo/a o para saber cómo está en este momento, por favor comunicate directamente a nuestro teléfono fijo: 4872-5474. Las maestras te van a poder dar la información más precisa y actualizada en el momento. 😊"`;

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
              const now = new Date().toLocaleString("es-AR", {
                timeZone: "America/Argentina/Buenos_Aires",
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              let personalizedInstruction = contactName
                ? SYSTEM_INSTRUCTION.replace("{nombre}", contactName)
                : SYSTEM_INSTRUCTION.replace("¡Hola, {nombre}!", "¡Hola!");

              personalizedInstruction = personalizedInstruction.replace(
                "{fecha_actual}",
                now,
              );

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

              // --- Detección y Procesamiento de Eventos ---
              let eventType: EventType | null = null;

              // 1. Extraer tag [EVENT: type] de la respuesta
              const eventMatch = aiResponse.match(/\[EVENT:\s*(\w+)\]/i);
              if (eventMatch) {
                const detectedType = eventMatch[1].toLowerCase() as EventType;
                // Validar que el tipo detectado esté en nuestro enum
                const validTypes: EventType[] = [
                  "visit_proposed",
                  "visit_confirmed",
                  "price_request",
                  "vacancy_request",
                  "conversation_closed_by_admin",
                ];
                if (validTypes.includes(detectedType)) {
                  eventType = detectedType;
                }
                // Limpiar la respuesta para WhatsApp
                aiResponse = aiResponse
                  .replace(/\[EVENT:\s*\w+\]/gi, "")
                  .trim();
              }

              // 2. Heurística (si no hay tag o para reforzar)
              if (!eventType) {
                const lowerResponse = aiResponse.toLowerCase();
                const lowerUserText = text.toLowerCase();

                if (
                  lowerResponse.includes("visita") &&
                  (lowerResponse.includes("cuándo") ||
                    lowerResponse.includes("puedas"))
                ) {
                  eventType = "visit_proposed";
                } else if (
                  lowerResponse.includes("confirmamos") ||
                  lowerResponse.includes("dejamos la visita")
                ) {
                  eventType = "visit_confirmed";
                } else if (
                  lowerUserText.includes("precio") ||
                  lowerUserText.includes("cuánto") ||
                  lowerUserText.includes("cuota")
                ) {
                  eventType = "price_request";
                } else if (
                  lowerUserText.includes("vacante") ||
                  lowerUserText.includes("lugar") ||
                  lowerUserText.includes("espacio")
                ) {
                  eventType = "vacancy_request";
                }
              }

              // 3. Registrar Evento si se detectó
              if (eventType) {
                console.log(`📊 Evento detectado: ${eventType}`);
                await Event.create({
                  conversationId: conversation._id,
                  eventType,
                  metadata: {
                    source: "bot_response_tagging",
                    rawMessage: aiResponse.substring(0, 100),
                  },
                });
              }
              // --------------------------------------------

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
