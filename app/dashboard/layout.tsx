export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Layout limpio para el dashboard, sin header ni footer del sitio principal
  return <>{children}</>;
}
