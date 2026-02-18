import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Conversation from "@/lib/models/Conversation";
import Message from "@/lib/models/Message";
import { sendWhatsAppMessage } from "@/app/api/whatsapp/route";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { text } = await req.json();

    if (!text?.trim()) {
      return NextResponse.json(
        { error: "El mensaje no puede estar vacío" },
        { status: 400 },
      );
    }

    await connectDB();

    const conversation = await Conversation.findById(id).lean();
    if (!conversation) {
      return NextResponse.json(
        { error: "Conversación no encontrada" },
        { status: 404 },
      );
    }

    // Enviar por WhatsApp
    await sendWhatsAppMessage(conversation.phoneNumber, text.trim());

    // Guardar en MongoDB como mensaje humano
    const message = await Message.create({
      conversationId: id,
      role: "human",
      text: text.trim(),
      timestamp: new Date(),
    });

    // Actualizar lastMessageAt
    await Conversation.updateOne({ _id: id }, { lastMessageAt: new Date() });

    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
