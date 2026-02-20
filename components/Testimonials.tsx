"use client";

import Link from "next/link";
import posthog from "posthog-js";
import { useEffect, useRef, useState } from "react";
import { getWhatsAppUrl } from "@/src/utils/whatsapp";

export default function Testimonials() {
  const handleCtaClick = () => {
    posthog.capture("testimonials_cta_click", {
      location: "testimonials_section",
    });
  };
  const testimonials = [
    {
      text: "Muy buena atención con los niños, lugar impecable! En este hermoso jardín de 🐻 Mimoso, van a encontrar unas de las cosas más importantes, la confianza y el cuidado que tienen hacia nuestros niños, lo super recomiendo !!!",
      author: "Daniela Elizabeth",
      child: "Hace un año",
      stars: 5,
    },
    {
      text: "Super recomendable, mi hija fue al maternal y al inicial siempre entraba contenta y salía contenta del jardín! Vamos a extrañar mucho 🥹 Queremos agradecer también a las seños y directivos por cuidar tanto a nuestra hija.",
      author: "Jorge Ortiz",
      child: "Hace 11 meses",
      stars: 5,
    },
    {
      text: "Hermoso jardín, un lugar lleno de juegos, en dónde los niños/as aprenden jugando y nos dejan una huella en nuestros corazones.",
      author: "Valeria Noemi Barrionuevo",
      child: "Hace 11 meses",
      stars: 5,
    },
    {
      text: "Mis más agradecimientos! Queremos primaria!!!",
      author: "Deportivo Centenario",
      child: "Hace 11 meses",
      stars: 5,
    },
    {
      text: "Excelente jardín, muy recomendado y un gran ambiente para llevar a tus hijas/os. 🙏",
      author: "JUANMA PROX",
      child: "Hace 2 años",
      stars: 5,
    },
    {
      text: "lo mejor . tu segunda casa!",
      author: "abasto eventos",
      child: "Hace 6 años",
      stars: 5,
    },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonios"
      className="py-24 px-6 md:px-16 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-text mb-6">
            Lo que dicen las{" "}
            <span className="font-script italic text-brand-blue font-normal">
              familias felices
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            La confianza y satisfacción de las familias que nos eligen es
            nuestro mayor orgullo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className={`bg-white p-8 rounded-[32px] shadow-xl shadow-zinc-200/50 border border-zinc-50 flex flex-col relative group hover:shadow-2xl transition-all duration-700 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: isVisible ? `${idx * 100}ms` : "0ms" }}
            >
              <div className="flex gap-1 mb-6">
                {[...Array(item.stars)].map((_, i) => (
                  <span key={i} className="text-brand-gold text-lg">
                    ★
                  </span>
                ))}
              </div>

              <p className="text-zinc-500 italic mb-8 grow leading-relaxed">
                &quot;{item.text}&quot;
              </p>

              <div className="flex items-center gap-4 border-t border-zinc-50 pt-6">
                <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center text-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                  👤
                </div>
                <div>
                  <h4 className="font-bold text-brand-text text-sm md:text-base">
                    {item.author}
                  </h4>
                  <p className="text-zinc-400 text-xs md:text-sm">
                    {item.child}
                  </p>
                </div>
              </div>

              {/* Decorative Quote Icon */}
              <div className="absolute top-8 right-8 text-6xl text-brand-blue/5 pointer-events-none">
                &quot;
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Banner */}
        <div
          className={`bg-brand-blue rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden group transition-all duration-1000 transform ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{ transitionDelay: isVisible ? "600ms" : "0ms" }}
        >
          {/* Decorative shapes */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mt-32 group-hover:bg-white/20 transition-all duration-1000" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl -mr-48 -mb-48" />

          <div className="relative z-10">
            <div className="text-5xl mb-8 animate-bounce-slow">🥰</div>
            <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
              ¿Quieres formar parte de nuestra{" "}
              <span className="font-script italic text-white/90 font-normal">
                familia?
              </span>
            </h3>
            <p className="text-white/80 max-w-2xl mx-auto text-lg mb-10">
              Te invitamos a conocer nuestras instalaciones y nuestro proyecto
              educativo. <br />
              ¡Te esperamos!
            </p>
            <Link
              href={getWhatsAppUrl(
                "¡Hola! Me gustaría agendar una visita para conocer el jardín.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCtaClick}
              className="inline-block px-10 py-4 bg-white text-brand-blue hover:bg-zinc-50 rounded-full font-bold shadow-xl shadow-black/10 transition-all transform hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer"
            >
              Agenda tu Visita
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
