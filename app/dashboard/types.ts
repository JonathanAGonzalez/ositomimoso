export interface Conversation {
  _id: string;
  phoneNumber: string;
  contactName: string;
  botActive: boolean;
  lastMessageAt: string;
}

export interface Message {
  _id: string;
  role: "user" | "bot" | "human";
  text: string;
  timestamp: string;
}
