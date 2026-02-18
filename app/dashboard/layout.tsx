import AuthProvider from "@/components/AuthProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Layout limpio para el dashboard, sin header ni footer del sitio principal
  return <AuthProvider>{children}</AuthProvider>;
}
