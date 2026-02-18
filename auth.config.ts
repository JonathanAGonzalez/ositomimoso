import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

/**
 * Configuración edge-safe de Auth.js.
 * NO importa bcrypt ni mongoose — solo define providers y callbacks básicos.
 * Usada por el middleware (Edge Runtime).
 */
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isDashboard) return isLoggedIn;
      return true;
    },
  },
  // El provider Credentials se declara aquí vacío (sin authorize)
  // porque authorize usa bcrypt que no es edge-compatible.
  // La lógica real está en auth.ts
  providers: [Credentials({})],
};
