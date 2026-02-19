import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

/**
 * Server Component — verifica la sesión en el servidor antes de renderizar.
 * Esto es un segundo nivel de protección además del middleware.
 */
export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return <DashboardClient user={session.user} />;
}
