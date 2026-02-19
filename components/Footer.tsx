"use client";

import React from "react";
import logo from "@/src/assets/logo.png";
import Image from "next/image";
import posthog from "posthog-js";

export default function Footer() {
  const handleContactClick = (contactType: string) => {
    posthog.capture("footer_contact_click", {
      contact_type: contactType,
    });
  };
  const socialIcons = [
    { icon: "☀️", color: "text-brand-gold" },
    { icon: "❤️", color: "text-brand-pink" },
    { icon: "🎨", color: "text-brand-blue" },
  ];

  const contactList = [
    {
      icon: "📞",
      text: "+54 11 4872-5474",
      href: "tel:+541148725474",
      type: "phone",
    },
    {
      icon: "✉️",
      text: "info@ositomimoso.com.ar",
      href: "mailto:info@ositomimoso.com.ar",
      type: "email",
    },
    {
      icon: "📍",
      text: "Aguero 508, CABA, Argentina",
      href: "https://maps.google.com/?q=Aguero+508,+CABA,+Argentina",
      type: "location",
    },
  ];

  const scheduleList = [
    { day: "Lunes - Viernes", time: "8:00 - 17:00" },
    { day: "Sábado", time: "Cerrado" },
    { day: "Domingo", time: "Cerrado" },
  ];

  return (
    <footer className="bg-white pt-20 pb-10 px-6 md:px-16 border-t border-zinc-50 relative overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-16">
          {/* Logo & About */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-6">
              <div>
                <Image src={logo.src} alt="Logo" width={48} height={48} />
              </div>
              <span className="font-bold text-brand-text text-2xl tracking-tight font-script">
                osito mimoso
              </span>
            </div>
            <p className="text-zinc-500 text-base leading-relaxed mb-8 max-w-xs">
              Educación inicial con compromiso y calidez.
            </p>
            <div className="flex gap-3">
              {socialIcons.map((social, idx) => (
                <button
                  key={idx}
                  className="w-11 h-11 bg-white shadow-md border border-zinc-50 rounded-full flex items-center justify-center text-xl hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-brand-text mb-8 text-xl">Contacto</h4>
            <ul className="space-y-6">
              {contactList.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    onClick={() => handleContactClick(item.type)}
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-brand-blue/5 rounded-xl flex items-center justify-center text-base group-hover:bg-brand-blue/10 transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-zinc-600 text-base group-hover:text-brand-blue transition-colors">
                      {item.text}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Schedule */}
          <div>
            <h4 className="font-bold text-brand-text mb-8 text-xl">Horario</h4>
            <ul className="space-y-6">
              {scheduleList.map((item, idx) => (
                <li key={idx} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand-gold/5 rounded-xl flex items-center justify-center text-sm">
                    {idx >= 1 ? "🌙" : "☀️"}
                  </div>
                  <div>
                    <p className="text-brand-text font-bold text-sm mb-0.5">
                      {item.day}
                    </p>
                    <p className="text-zinc-500 text-xs font-medium">
                      {item.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-zinc-100 pt-10 flex flex-col md:flex-row justify-center items-center gap-4 text-center">
          <p className="text-zinc-400 text-xs font-semibold tracking-wide">
            © {new Date().getFullYear()} Osito Mimoso. Todos los derechos
            reservados. Hecho con <span className="text-brand-pink">❤️</span>{" "}
            para las familias.
          </p>
        </div>
      </div>
    </footer>
  );
}
