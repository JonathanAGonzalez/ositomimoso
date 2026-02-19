import type { Conversation } from "../types";
import { getInitials } from "../utils";

export default function ChatHeader({
  conv,
  togglingBot,
  onToggleBot,
  onBack,
}: {
  conv: Conversation | null;
  togglingBot: boolean;
  onToggleBot: () => void;
  onBack: () => void;
}) {
  if (!conv) return null;

  const avatarGradient = conv.botActive
    ? "bg-linear-to-br from-dash-accent to-dash-purple"
    : "bg-linear-to-br from-dash-danger to-red-800";

  return (
    <div className="flex items-center justify-between gap-2.5 border-b border-dash-border bg-dash-surface px-4 py-3">
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        <button
          onClick={onBack}
          className="sm:hidden shrink-0 bg-transparent border-none text-dash-accent-light text-xl cursor-pointer pr-1"
          aria-label="Volver"
        >
          ←
        </button>
        <div
          className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-sm font-bold text-white ${avatarGradient}`}
        >
          {getInitials(conv.contactName, conv.phoneNumber)}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-white m-0 truncate">
            {conv.contactName || conv.phoneNumber}
          </p>
          <p className="text-[11px] text-dash-muted m-0">{conv.phoneNumber}</p>
        </div>
      </div>

      <button
        onClick={onToggleBot}
        disabled={togglingBot}
        className={`shrink-0 rounded-full border-none px-3.5 py-[7px] text-xs font-semibold whitespace-nowrap transition-all cursor-pointer disabled:cursor-not-allowed ${
          conv.botActive
            ? "bg-dash-danger/15 text-dash-danger-light"
            : "bg-dash-accent/15 text-dash-accent-light"
        }`}
      >
        {conv.botActive ? "🔕 Pausar bot" : "🤖 Activar bot"}
      </button>
    </div>
  );
}
