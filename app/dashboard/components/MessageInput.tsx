export default function MessageInput({
  value,
  onChange,
  onSend,
  sending,
  botPaused,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  sending: boolean;
  botPaused: boolean;
}) {
  const isDisabled = sending || !value.trim();

  return (
    <div className="relative border-t border-dash-border bg-dash-surface px-4 py-3 flex gap-2 items-end">
      {botPaused && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-dash-danger/90 text-white px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
          👤 Modo humano — el bot no responde
        </div>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
        placeholder="Escribí un mensaje..."
        rows={2}
        className="flex-1 rounded-xl border border-dash-input-border bg-dash-input text-dash-text text-sm resize-none outline-none font-[inherit] leading-relaxed px-3.5 py-2.5 focus:border-dash-accent transition-colors"
      />
      <button
        onClick={onSend}
        disabled={isDisabled}
        className={`w-[46px] h-[46px] shrink-0 rounded-xl border-none flex items-center justify-center text-lg cursor-pointer transition-all
          ${isDisabled ? "bg-dash-input-border text-dash-muted cursor-not-allowed" : "bg-linear-to-br from-dash-accent to-dash-purple text-white"}`}
      >
        {sending ? "⏳" : "➤"}
      </button>
    </div>
  );
}
