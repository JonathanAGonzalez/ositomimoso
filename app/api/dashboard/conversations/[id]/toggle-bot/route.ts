import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Conversation from "@/lib/models/Conversation";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { botActive } = await req.json();

    if (typeof botActive !== "boolean") {
      return NextResponse.json(
        { error: "botActive debe ser un booleano" },
        { status: 400 },
      );
    }

    await connectDB();

    const conversation = await Conversation.findByIdAndUpdate(
      id,
      { botActive },
      { new: true },
    ).lean();

    if (!conversation) {
      return NextResponse.json(
        { error: "Conversación no encontrada" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      botActive: conversation.botActive,
    });
  } catch (error) {
    console.error("Error toggling bot:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
