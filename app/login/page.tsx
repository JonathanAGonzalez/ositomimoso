"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email o contraseña incorrectos");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError("Error al iniciar sesión. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gradient-to-br from-dash-bg to-dash-surface font-sans p-5">
      <div className="w-full max-w-[400px]">
        {/* Logo / Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-dash-accent to-dash-purple flex items-center justify-center text-[32px] mx-auto mb-4 shadow-[0_8px_32px_rgba(79,70,229,0.4)]">
            🧸
          </div>
          <h1 className="text-2xl font-bold text-white mb-1.5">Osito Mimoso</h1>
          <p className="text-sm text-dash-muted">Panel de administración</p>
        </div>

        {/* Card */}
        <div className="bg-dash-surface border border-dash-border rounded-2xl p-8 shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
          <h2 className="text-lg font-semibold text-dash-text mb-6">
            Iniciar sesión
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="block text-[13px] font-semibold text-dash-label mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="admin@ositomimoso.com"
                className="w-full rounded-[10px] border border-dash-input-border bg-dash-bg text-dash-text text-sm outline-none px-3.5 py-[11px] transition-colors focus:border-dash-accent"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[13px] font-semibold text-dash-label mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-[10px] border border-dash-input-border bg-dash-bg text-dash-text text-sm outline-none px-3.5 py-[11px] transition-colors focus:border-dash-accent"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg border border-dash-danger/30 bg-dash-danger/10 text-dash-danger-light text-[13px] px-3.5 py-2.5">
                ⚠️ {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`mt-1 rounded-[10px] border-none py-3 text-[15px] font-semibold transition-all cursor-pointer
                ${
                  loading
                    ? "bg-dash-input-border text-dash-muted cursor-not-allowed"
                    : "bg-gradient-to-br from-dash-accent to-dash-purple text-white hover:opacity-90"
                }`}
            >
              {loading ? "Ingresando..." : "Ingresar →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
