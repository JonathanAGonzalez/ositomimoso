export const POLL_INTERVAL_MS = 3000;

export function formatTime(ts: string) {
  return new Date(ts).toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDate(ts: string) {
  const d = new Date(ts);
  if (d.toDateString() === new Date().toDateString()) return formatTime(ts);
  return d.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" });
}

export function getInitials(name: string, phone: string) {
  return name ? name.charAt(0).toUpperCase() : phone.slice(-2);
}
