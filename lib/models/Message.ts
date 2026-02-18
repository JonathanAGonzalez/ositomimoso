import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IMessage extends Document {
  conversationId: Types.ObjectId;
  role: "user" | "bot" | "human";
  text: string;
  whatsappMessageId?: string;
  timestamp: Date;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },
    role: {
      type: String,
      enum: ["user", "bot", "human"],
      required: true,
    },
    text: { type: String, required: true },
    whatsappMessageId: { type: String, sparse: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
