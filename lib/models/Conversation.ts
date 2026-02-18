import mongoose, { Schema, Document, Model } from "mongoose";

export interface IConversation extends Document {
  phoneNumber: string;
  contactName: string;
  botActive: boolean;
  lastMessageAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema = new Schema<IConversation>(
  {
    phoneNumber: { type: String, required: true, unique: true, index: true },
    contactName: { type: String, default: "" },
    botActive: { type: Boolean, default: true },
    lastMessageAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const Conversation: Model<IConversation> =
  mongoose.models.Conversation ||
  mongoose.model<IConversation>("Conversation", ConversationSchema);

export default Conversation;
