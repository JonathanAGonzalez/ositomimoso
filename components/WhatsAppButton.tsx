"use client";

import Image from "next/image";
import whatsappIcon from "@/src/assets/whatsapp.png";

export default function WhatsAppButton() {
  const phoneNumber = "541148725474";
  const message =
    "¡Hola! Me gustaría recibir información sobre la Escuela Infantil Osito Mimoso.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 group flex items-center gap-3"
      aria-label="Contactar por WhatsApp"
    >
      {/* Tooltip */}
      <span className="bg-white px-4 py-2 rounded-2xl shadow-xl text-brand-text font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 border border-zinc-100 pointer-events-none">
        ¿Consultas? ¡Escríbenos!
      </span>

      {/* Button Body */}
      <div className="bg-[#25D366] p-3.5 rounded-2xl shadow-2xl shadow-green-400/30 hover:shadow-green-400/50 transition-all duration-500 transform group-hover:scale-110 active:scale-95 flex items-center justify-center relative overflow-hidden">
        {/* Animated pulse effect */}
        <span className="absolute inset-0 bg-white/20 animate-pulse" />

        <Image
          src={whatsappIcon}
          alt="WhatsApp"
          width={32}
          height={32}
          className="relative z-10"
        />
      </div>
    </a>
  );
}
