export default function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3 text-dash-muted h-full px-5">
      <span className="text-[56px]">💬</span>
      <p className="text-lg font-semibold text-dash-label m-0">
        Seleccioná una conversación
      </p>
      <p className="text-sm m-0 text-center">
        Los chats aparecen cuando llegan mensajes de WhatsApp
      </p>
    </div>
  );
}
