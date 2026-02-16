"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/src/assets/logo.png";

export default function AgendarVisita() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      {/* Minimal Header */}
      <header className="p-6 md:px-16 flex justify-between items-center bg-white/50 backdrop-blur-sm border-b border-zinc-100">
        <Link
          href="/"
          className="group flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Image
            src={logo.src}
            alt="Osito Mimoso Logo"
            width={48}
            height={48}
            className="w-10 h-10 object-contain"
          />
          <span className="font-bold text-brand-text text-xl font-script hidden sm:block">
            osito mimoso
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm font-bold text-zinc-400 hover:text-brand-blue transition-colors flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Volver al inicio
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center pt-10 pb-20 px-4">
        <div className="text-center mb-8 max-w-2xl animate-fadeIn">
          <div className="inline-block p-3 bg-brand-blue/10 rounded-2xl text-3xl mb-4">
            🥰
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-text mb-4">
            Coordinemos una <span className="text-brand-blue">entrevista</span>
          </h1>
          <p className="text-zinc-500 text-lg">
            Elige el horario que mejor te convenga para una videollamada.
            Queremos conocerte y contarte todo sobre nuestra propuesta
            educativa.
          </p>
        </div>

        {/* Calendly Container */}
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl shadow-zinc-200/50 border border-zinc-50 overflow-hidden h-[700px] animate-slideUp">
          <div className="w-full h-full">
            <iframe
              src="https://calendly.com/ositomimoso/30min?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=ffffff&text_color=4a4a4a&primary_color=7fc1e2"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Agendar Reunión Virtual"
              style={{ minHeight: "100%" }}
            />
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="py-6 text-center text-zinc-300 text-xs font-medium">
        <p>
          © {new Date().getFullYear()} Osito Mimoso. Hecho con ❤️ para las
          familias.
        </p>
      </footer>
    </div>
  );
}
