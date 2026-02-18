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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f0f13 0%, #13131a 100%)",
        fontFamily: "'Inter', sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {/* Logo / Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              margin: "0 auto 16px",
              boxShadow: "0 8px 32px rgba(79,70,229,0.4)",
            }}
          >
            🧸
          </div>
          <h1
            style={{
              margin: "0 0 6px",
              fontSize: "24px",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Osito Mimoso
          </h1>
          <p style={{ margin: 0, fontSize: "14px", color: "#6b6b8a" }}>
            Panel de administración
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "#13131a",
            border: "1px solid #1e1e2e",
            borderRadius: "16px",
            padding: "32px",
            boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
          }}
        >
          <h2
            style={{
              margin: "0 0 24px",
              fontSize: "18px",
              fontWeight: 600,
              color: "#e8e8f0",
            }}
          >
            Iniciar sesión
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {/* Email */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#9999b8",
                  marginBottom: "6px",
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="admin@ositomimoso.com"
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: "10px",
                  border: "1px solid #2a2a3e",
                  background: "#0f0f13",
                  color: "#e8e8f0",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#4f46e5")}
                onBlur={(e) => (e.target.style.borderColor = "#2a2a3e")}
              />
            </div>

            {/* Password */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#9999b8",
                  marginBottom: "6px",
                }}
              >
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: "10px",
                  border: "1px solid #2a2a3e",
                  background: "#0f0f13",
                  color: "#e8e8f0",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#4f46e5")}
                onBlur={(e) => (e.target.style.borderColor = "#2a2a3e")}
              />
            </div>

            {/* Error */}
            {error && (
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: "8px",
                  background: "rgba(220,38,38,0.1)",
                  border: "1px solid rgba(220,38,38,0.3)",
                  color: "#f87171",
                  fontSize: "13px",
                }}
              >
                ⚠️ {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "12px",
                borderRadius: "10px",
                border: "none",
                background: loading
                  ? "#2a2a3e"
                  : "linear-gradient(135deg, #4f46e5, #7c3aed)",
                color: loading ? "#6b6b8a" : "#fff",
                fontSize: "15px",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                marginTop: "4px",
              }}
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
