import mongoose, { Schema, Document, Model, Types } from "mongoose";

export type EventType =
  | "visit_proposed"
  | "visit_confirmed"
  | "price_request"
  | "vacancy_request"
  | "conversation_closed_by_admin";

export interface IEvent extends Document {
  conversationId: Types.ObjectId;
  eventType: EventType;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

const EventSchema = new Schema<IEvent>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },
    eventType: {
      type: String,
      required: true,
      enum: [
        "visit_proposed",
        "visit_confirmed",
        "price_request",
        "vacancy_request",
        "conversation_closed_by_admin",
      ],
      index: true,
    },
    timestamp: { type: Date, default: Date.now },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
);

const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;
