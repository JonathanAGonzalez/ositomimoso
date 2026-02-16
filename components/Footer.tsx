"use client";

import React from "react";

export default function Footer() {
  const socialIcons = [
    { icon: "☀️", color: "text-brand-gold" },
    { icon: "❤️", color: "text-brand-pink" },
    { icon: "🎨", color: "text-brand-blue" },
  ];

  const contactList = [
    { icon: "📞", text: "+34 123 456 789" },
    { icon: "✉️", text: "info@ositomimoso.com" },
    { icon: "📍", text: "Calle Principal 123, Madrid" },
  ];

  const scheduleList = [
    { day: "Lunes - Viernes", time: "7:30 - 18:00" },
    { day: "Sábado", time: "9:00 - 14:00" },
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
              <div className="w-10 h-10 bg-brand-blue/10 rounded-lg flex items-center justify-center overflow-hidden text-xl shadow-sm border border-brand-blue/20">
                <span>🐻</span>
              </div>
              <span className="font-bold text-brand-text text-xl tracking-tight">
                osito mimoso
              </span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-xs">
              Un espacio donde los niños crecen felices, seguros y amados.
            </p>
            <div className="flex gap-3">
              {socialIcons.map((social, idx) => (
                <button
                  key={idx}
                  className="w-10 h-10 bg-white shadow-md border border-zinc-50 rounded-full flex items-center justify-center text-lg hover:scale-110 hover:shadow-lg transition-all duration-300"
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-brand-text mb-8 text-lg">Contacto</h4>
            <ul className="space-y-6">
              {contactList.map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 group">
                  <div className="w-8 h-8 bg-brand-blue/5 rounded-lg flex items-center justify-center text-sm group-hover:bg-brand-blue/10 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-zinc-500 text-sm group-hover:text-brand-blue transition-colors cursor-default">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Schedule */}
          <div>
            <h4 className="font-bold text-brand-text mb-8 text-lg">Horario</h4>
            <ul className="space-y-6">
              {scheduleList.map((item, idx) => (
                <li key={idx} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-brand-gold/5 rounded-lg flex items-center justify-center text-sm">
                    {idx === 2 ? "🌙" : "☀️"}
                  </div>
                  <div>
                    <p className="text-brand-text font-bold text-xs mb-0.5">
                      {item.day}
                    </p>
                    <p className="text-zinc-400 text-[10px]">{item.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-zinc-50 pt-10 flex flex-col md:flex-row justify-center items-center gap-4 text-center">
          <p className="text-zinc-300 text-[10px] font-medium tracking-wider">
            © {new Date().getFullYear()} Osito Mimoso. Todos los derechos
            reservados. Hecho con <span className="text-brand-pink">❤️</span>{" "}
            para las familias.
          </p>
        </div>
      </div>
    </footer>
  );
}
