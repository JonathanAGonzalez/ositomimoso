"use client";

import whatsapp from "@/src/assets/whatsapp.png";
import Image from "next/image";
import Link from "next/link";

export default function Contact() {
  const contactInfo = [
    {
      title: "Teléfono",
      desc: "Llámanos de Lunes a Viernes",
      value: "+54 11 4872-5474",
      icon: "📞",
      color: "bg-brand-pink/10",
    },
    {
      title: "Email",
      desc: "Escríbenos cuando quieras",
      value: "info@ositomimoso.com",
      icon: "✉️",
      color: "bg-brand-blue/10",
    },
    {
      title: "Ubicación",
      desc: "Aguero 508",
      value: "CABA, Argentina",
      icon: "📍",
      color: "bg-brand-brown/10",
    },
    {
      title: "Horario",
      desc: "Lun - Vie: 7:30 - 18:00",
      value: "Sábados: 9:00 - 14:00",
      icon: "⏰",
      color: "bg-brand-gold/15",
    },
  ];

  return (
    <section id="contacto" className="py-24 px-6 md:px-16 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-text mb-6">
            ¡Estamos aquí para{" "}
            <span className="font-script italic text-brand-blue font-normal text-5xl md:text-6xl">
              ayudarte!
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            ¿Tienes preguntas? Nos encantaría conocerte y mostrarte nuestra
            escuela. Contáctanos y agenda una visita.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {contactInfo.map((info, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-[32px] shadow-xl shadow-zinc-200/50 border border-zinc-50 flex flex-col items-center text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
            >
              <div
                className={`w-14 h-14 ${info.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm`}
              >
                {info.icon}
              </div>
              <h3 className="text-lg font-extrabold text-brand-text mb-2">
                {info.title}
              </h3>
              <p className="text-zinc-400 text-xs mb-3 font-medium">
                {info.desc}
              </p>
              <p className="text-brand-blue font-bold text-sm">{info.value}</p>
            </div>
          ))}
        </div>

        {/* Map & Card Grid - Reordered to Vertical */}
        <div className="flex flex-col gap-12">
          {/* Redesigned Visit Card */}
          <div className="bg-white rounded-[40px] p-10 md:p-16 border border-zinc-50 shadow-2xl shadow-zinc-200/60 flex flex-col items-center text-center relative overflow-hidden group w-full">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-[80px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-pink/5 rounded-full blur-[80px] -ml-32 -mb-32" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 bg-brand-blue/10 rounded-[32px] flex items-center justify-center text-5xl mb-10 shadow-inner transform rotate-3 group-hover:rotate-0 transition-all duration-700 bg-linear-to-br from-brand-blue/10 to-transparent">
                📅
              </div>

              <h3 className="text-3xl md:text-5xl font-extrabold text-brand-text mb-6">
                ¿Prefieres{" "}
                <span className="font-script italic text-brand-blue font-normal">
                  visitarnos
                </span>{" "}
                en persona?
              </h3>

              <p className="text-zinc-500 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
                Nada nos hace más felices que recibir a nuevas familias. Agenda
                una cita para conocer nuestras instalaciones, nuestro equipo y
                sentir la calidez de{" "}
                <span className="text-brand-brown font-bold text-base md:text-lg">
                  Osito Mimoso
                </span>
                .
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                {/* WhatsApp CTA */}
                <Link
                  href="https://wa.me/5491148725474?text=¡Hola!%20Me%20gustaría%20agendar%20una%20visita%20para%20conocer%20el%20jardín."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-8 py-3.5 bg-[#25D366] text-white rounded-full font-bold shadow-lg shadow-green-200/50 hover:bg-[#20ba59] transition-all transform hover:-translate-y-1 hover:scale-105 active:scale-95 group/btn text-sm md:text-base cursor-pointer"
                >
                  <Image
                    src={whatsapp.src}
                    alt="WhatsApp"
                    width={20}
                    height={20}
                  />
                  Agenda tu visita presencial
                </Link>

                {/* Calendly CTA */}
                {/* Calendly CTA */}
                <Link
                  href="/agendar-visita"
                  className="flex items-center gap-3 px-8 py-3.5 bg-brand-blue text-white rounded-full font-bold shadow-lg shadow-brand-blue/20 hover:bg-brand-blue/90 transition-all transform hover:-translate-y-1 hover:scale-105 active:scale-95 text-sm md:text-base cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <path d="M8 14h.01" />
                    <path d="M12 14h.01" />
                    <path d="M16 14h.01" />
                    <path d="M8 18h.01" />
                    <path d="M12 18h.01" />
                  </svg>
                  Reunión Virtual
                </Link>
              </div>

              {/* Secondary Info */}
              {/* <div className="flex items-center gap-4 px-8 py-4 bg-zinc-50 rounded-3xl border border-zinc-100 shadow-sm">
                <div className="w-10 h-10 bg-brand-gold/20 rounded-xl flex items-center justify-center text-xl">
                  ✨
                </div>
                <div className="text-left">
                  <p className="font-bold text-brand-text text-sm">
                    Cita Previa
                  </p>
                  <p className="text-zinc-400 text-xs">
                    Lun-Vie · 9:00 - 17:00
                  </p>
                </div>
              </div> */}

              <div className="p-1 px-4 rounded-full bg-brand-blue/5 border border-brand-blue/10">
                <p className="text-brand-blue text-[10px] md:text-xs font-bold uppercase tracking-widest">
                  Compromiso con tu pequeño
                </p>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-[40px] shadow-xl shadow-zinc-200/50 border border-zinc-50 overflow-hidden min-h-[450px] relative group w-full">
            <div className="w-full h-[450px] transition-all duration-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.144455822606!2d-58.4116!3d-34.6033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccbe67066b6bb%3A0x68d0b13afbcf227e!2sEscuela%20Infantil%20Osito%20Mimoso%20(Sede%20Abasto)!5e0!3m2!1ses!2sar!4v1771212761097!5m2!1ses!2sar"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[0.2] contrast-[1.1] hover:grayscale-0 transition-all duration-700"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Calendly Modal Portal Removed */}
    </section>
  );
}
