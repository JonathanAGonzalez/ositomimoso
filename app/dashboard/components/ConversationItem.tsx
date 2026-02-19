import type { Conversation } from "../types";
import { formatDate, getInitials } from "../utils";

export default function ConversationItem({
  conv,
  isSelected,
  onSelect,
}: {
  conv: Conversation;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const avatarGradient = conv.botActive
    ? "bg-linear-to-br from-dash-accent to-dash-purple"
    : "bg-linear-to-br from-dash-danger to-red-800";

  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center gap-3 px-4 py-3.5 border-b border-dash-bg/40 text-left transition-colors cursor-pointer
        ${isSelected ? "bg-dash-selected" : "bg-transparent hover:bg-dash-hover"}`}
    >
      <div
        className={`w-11 h-11 rounded-full flex items-center justify-center text-base font-bold text-white shrink-0 ${avatarGradient}`}
      >
        {getInitials(conv.contactName, conv.phoneNumber)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-dash-text truncate">
            {conv.contactName || conv.phoneNumber}
          </span>
          <span className="text-[11px] text-dash-muted shrink-0 ml-2">
            {formatDate(conv.lastMessageAt)}
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-lg font-semibold ${
              conv.botActive
                ? "bg-dash-accent/20 text-dash-accent-light"
                : "bg-dash-danger/20 text-dash-danger-light"
            }`}
          >
            {conv.botActive ? "🤖 Bot" : "👤 Humano"}
          </span>
          <span className="text-[11px] text-dash-muted">
            {conv.phoneNumber}
          </span>
        </div>
      </div>
    </button>
  );
}
