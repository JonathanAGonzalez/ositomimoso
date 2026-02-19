import type { Message } from "../types";
import { formatTime } from "../utils";

export default function MessageBubble({ msg }: { msg: Message }) {
  const isOutgoing = msg.role === "bot" || msg.role === "human";

  const bubbleClass = {
    user: "bg-dash-selected rounded-[16px_16px_16px_4px]",
    human:
      "bg-linear-to-br from-dash-success to-emerald-700 rounded-[16px_16px_4px_16px]",
    bot: "bg-linear-to-br from-dash-accent to-purple-800 rounded-[16px_16px_4px_16px]",
  }[msg.role];

  return (
    <div className={`flex ${isOutgoing ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-3.5 py-2.5 text-sm leading-relaxed text-white shadow-md ${bubbleClass}`}
      >
        {msg.role !== "user" && (
          <div className="text-[10px] opacity-70 mb-1 font-semibold">
            {msg.role === "human" ? "👤 Vos" : "🤖 Osi"}
          </div>
        )}
        <p className="m-0 whitespace-pre-wrap break-words">{msg.text}</p>
        <div className="text-[10px] opacity-60 mt-1 text-right">
          {formatTime(msg.timestamp)}
        </div>
      </div>
    </div>
  );
}
