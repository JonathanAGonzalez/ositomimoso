import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Conversation from "@/lib/models/Conversation";

export async function GET() {
  try {
    await connectDB();

    const conversations = await Conversation.find({ archived: { $ne: true } })
      .sort({ lastMessageAt: -1 })
      .lean();

    return NextResponse.json({ conversations });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
