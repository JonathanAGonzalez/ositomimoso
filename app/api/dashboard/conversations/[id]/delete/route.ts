import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Conversation from "@/lib/models/Conversation";
import Event from "@/lib/models/Event";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await connectDB();

    const conversation = await Conversation.findByIdAndUpdate(
      id,
      { archived: true },
      { new: true },
    );

    if (conversation) {
      await Event.create({
        conversationId: conversation._id,
        eventType: "conversation_closed_by_admin",
        metadata: {
          source: "dashboard_archive",
        },
      });
    }

    if (!conversation) {
      return NextResponse.json(
        { error: "Conversación no encontrada" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error archivando conversación:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
