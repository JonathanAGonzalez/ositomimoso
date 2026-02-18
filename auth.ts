import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";

/**
 * Configuración completa de Auth.js con bcrypt y MongoDB.
 * Solo se usa en API routes (Node.js runtime), NUNCA en el middleware.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credenciales",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          await connectDB();
          const user = await User.findOne({
            email: String(credentials.email).toLowerCase(),
          }).lean();

          if (!user) return null;

          const isValid = await bcrypt.compare(
            String(credentials.password),
            user.passwordHash,
          );

          if (!isValid) return null;

          return {
            id: String(user._id),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
});
