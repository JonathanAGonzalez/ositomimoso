import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectDB } from "@/lib/mongodb";
import Conversation from "@/lib/models/Conversation";
import Message from "@/lib/models/Message";
import Event, { EventType } from "@/lib/models/Event";

const SYSTEM_INSTRUCTION = `Sos "Osi", parte del equipo de la Escuela Infantil "Osito Mimoso". Respondés consultas de familias por WhatsApp de forma cálida, humana y directa.

**SALUDO Y RECONOCIMIENTO:** 
- Al inicio de la charla, saludá cordialmente. Si el usuario se presentó (ej: "Soy Braian"), usá ese nombre. Si no, usá el **Nombre de la persona** que figura al final de este prompt. 
- **IMPORTANTE:** No te quedes solo en el saludo. Respondé de forma inmediata y completa a todas las preguntas o comentarios que el usuario haga en su primer mensaje. Si el usuario cuenta una situación personal (ej: un accidente), mostrá empatía antes de dar la información técnica.

**REGLAS ABSOLUTAS:**
- NUNCA repitas el saludo ni te vuelvas a presentar si ya lo hiciste antes en la conversación. Revisá el historial.
- NUNCA uses frases de cierre o despedida como "¡Te esperamos!", "¡Hasta pronto!", "¡Fue un placer!", "¡Nos vemos!", "¡Hasta luego!" ni similares. La conversación siempre queda abierta con una pregunta como "¿Tenés alguna otra duda?".
- NUNCA uses respuestas estructuradas con bullets o listas numeradas. Hablás como una persona real.
- Usás "vos" y el estilo rioplatense cálido.
- **REFERENCIA TEMPORAL:** La fecha y hora actual es: {fecha_actual}.

**MICRO-REGLAS DE RESPUESTA:**
- **Brevedad:** Máximo 120 palabras. Sé directo.
- **Efecto Espejo:** Adaptá la longitud de tu respuesta a la del usuario.
- **No Repetición:** No insistas con la misma pregunta si no te responden.

**LIMITACIÓN DE TEMAS Y CONSULTAS PARTICULARES:**
- **SOLO TEMAS ESCOLARES:** No respondas temas ajenos al jardín.
- **CONSULTAS SOBRE ALUMNOS O MATERIALES:** Si preguntan por el estado de un alumno (ej: "¿cómo está mi hijo?", "¿se adaptó?") o por detalles específicos de materiales/útiles (ej: "¿está bien el guardapolvo que compré?", "¿falta algo de la lista?"), NO inventes información. Respondé: "Para consultas sobre el día a día de los chicos, su adaptación o dudas puntuales sobre la lista de materiales, por favor comunicate directamente a nuestro teléfono fijo: 4872-5474. Las maestras y el equipo te van a poder dar la información más precisa. 😊"

**DATOS DE LA ESCUELA:**
- **Ubicación:** Agüero 508, CABA (frente al Abasto). 
- **Teléfono:** 4872-5474.
- **Niveles:** Lactantes (45 días), Deambuladores, Salas de 2, 3 y 4 años.
- **Equipo:** Eugenia (Directora), Karina (Psicopedagoga).
- **Visitas:** Invitá siempre a conocer la escuela presencialmente. Coordiná día y horario por acá.
- **Cuotas:** No des valores. Redirigí a administración: "¿Querés que te contacten?".
- **Vacantes:** Preguntá edad y turno (Mañana, Tarde o Completa) antes de informar.

**TONO:**
- Cálido, empático y profesional. Si alguien expresa ansiedad o cuenta un problema, contené emocionalmente antes de informar.
- Máximo 2-3 emojis.`;

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

      const messages = value?.messages || [];
      const contacts = value?.contacts || [];

      // Procesar cada mensaje en el batch (aunque usualmente sea uno)
      for (const message of messages) {
        if (message?.type !== "text") {
          console.log("⚠️ Tipo de mensaje no soportado:", message?.type);
          continue;
        }

        const from = message.from;
        const text = message.text.body;
        const whatsappMessageId = message.id;

        // BUSCAR EL NOMBRE CORRECTO: Buscar el contacto que coincida con el remitente (wa_id)
        // Esto evita que en batches se asigne el nombre de una persona al mensaje de otra.
        const contact = contacts.find(
          (c: { wa_id: string }) => c.wa_id === from,
        );
        const currentContactName = contact?.profile?.name || "";

        console.log(
          `👤 Nombre del contacto (perfil WhatsApp): "${currentContactName}"`,
        );
        console.log(
          `💬 Procesando mensaje de ${currentContactName || from}: "${text}"`,
        );

        try {
          // Conectar a MongoDB
          await connectDB();

          // Marcar como leído (ticks azules)
          await markAsRead(whatsappMessageId);

          // Buscar o crear conversación en MongoDB
          let conversation = await Conversation.findOne({ phoneNumber: from });

          // El nombre efectivo es: primero lo que viene de WhatsApp ahora, sino lo que ya teníamos en DB
          const effectiveName =
            currentContactName || conversation?.contactName || "";

          if (!conversation) {
            conversation = await Conversation.create({
              phoneNumber: from,
              contactName: effectiveName,
              botActive: true,
              lastMessageAt: new Date(),
            });
            console.log(`📝 Nueva conversación creada para ${from}`);
          } else {
            // Actualizar nombre si cambió o se obtuvo uno nuevo por perfil de usuario
            const updateData: {
              lastMessageAt: Date;
              archived: boolean;
              contactName?: string;
            } = {
              lastMessageAt: new Date(),
              archived: false,
            };

            if (
              currentContactName &&
              currentContactName !== conversation.contactName
            ) {
              updateData.contactName = currentContactName;
            }

            await Conversation.updateOne({ _id: conversation._id }, updateData);
            // Actualizar el objeto en memoria
            if (updateData.contactName)
              conversation.contactName = updateData.contactName;
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

          console.log(
            `🧠 Consultando a Gemini para "${effectiveName || from}"...`,
          );
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

              // Usar effectiveName (el perfil de WhatsApp o lo guardado en DB)
              let personalizedInstruction = SYSTEM_INSTRUCTION;

              if (effectiveName) {
                personalizedInstruction += `\n\n**Nombre de la persona**: ${effectiveName}`;
              } else {
                personalizedInstruction += `\n\n**Nombre de la persona**: Desconocido (Saludá cordialmente sin usar un nombre específico a menos que el usuario se presente en este mensaje).`;
              }

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

              // 3. Registrar Evento si se detectó (1 por chat para evitar duplicados en métricas)
              if (eventType) {
                console.log(`📊 Evento detectado: ${eventType}`);
                await Event.findOneAndUpdate(
                  { conversationId: conversation._id, eventType },
                  {
                    $setOnInsert: { timestamp: new Date() },
                    $set: {
                      metadata: {
                        source: "bot_response_tagging",
                        rawMessage: aiResponse.substring(0, 100),
                        updatedAt: new Date(),
                      },
                    },
                  },
                  { upsert: true, new: true },
                );
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
