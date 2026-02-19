"use client";

export default function ConfirmDeleteModal({
  contactName,
  onConfirm,
  onCancel,
  deleting,
}: {
  contactName: string;
  onConfirm: () => void;
  onCancel: () => void;
  deleting: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="bg-dash-surface border border-dash-border rounded-2xl p-6 w-[90%] max-w-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold text-white m-0 mb-1">
          🗑️ Eliminar conversación
        </h3>
        <p className="text-sm text-dash-muted mt-2 mb-5 leading-relaxed">
          ¿Estás seguro de que querés eliminar la conversación con{" "}
          <strong className="text-white">{contactName}</strong>? Esta acción no
          se puede deshacer desde el panel.
        </p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={deleting}
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-dash-hover text-dash-muted border border-dash-border cursor-pointer transition-colors hover:bg-dash-border disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-dash-danger text-white border-none cursor-pointer transition-colors hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deleting ? "Eliminando…" : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}
