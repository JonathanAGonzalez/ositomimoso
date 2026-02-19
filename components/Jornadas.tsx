"use client";

import { useEffect, useRef, useState } from "react";

export default function Jornadas() {
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
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const jornadas = [
    {
      title: "Jornada Simple",
      icon: "☀️",
      accent: "brand-blue",
      gradient: "from-brand-blue/10 to-brand-blue/5",
      borderColor: "border-brand-blue/20",
      horarios: [
        { label: "Turno Mañana", time: "9:00 a 13:00" },
        { label: "Turno Tarde", time: "14:00 a 17:00" },
      ],
    },
    {
      title: "Jornada Completa",
      icon: "🌟",
      accent: "brand-gold",
      gradient: "from-brand-gold/10 to-brand-gold/5",
      borderColor: "border-brand-gold/20",
      horarios: [{ label: "Horario", time: "9:00 a 17:00" }],
    },
    {
      title: "Pre Hora",
      icon: "🕗",
      accent: "brand-brown",
      gradient: "from-brand-brown/10 to-brand-brown/5",
      borderColor: "border-brand-brown/20",
      horarios: [{ label: "Horario", time: "8:00 a 9:00" }],
    },
  ];

  return (
    <section
      id="jornadas"
      ref={sectionRef}
      className="py-24 px-6 md:px-16 bg-white relative overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute top-10 right-[15%] w-56 h-56 bg-brand-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-[10%] w-48 h-48 bg-brand-blue/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-6 py-2 rounded-full bg-brand-gold/10 text-brand-gold text-sm font-bold mb-6">
            Jornadas y Horarios
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-text mb-6">
            Organizamos tu{" "}
            <span className="font-script italic text-brand-blue font-normal">
              día a día
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Ofrecemos diferentes opciones de jornadas para adaptarnos a las
            necesidades de cada familia.
          </p>
        </div>

        {/* Age badge */}
        <div
          className={`flex justify-center mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-brand-pink/8 border border-brand-pink/15 shadow-lg shadow-brand-pink/5">
            <span className="text-3xl">👶</span>
            <div>
              <p className="text-brand-text font-extrabold text-lg">
                Salas de 1 a 4 años
              </p>
              <p className="text-zinc-400 text-sm">
                Acompañamos cada etapa del crecimiento
              </p>
            </div>
          </div>
        </div>

        {/* Jornadas grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {jornadas.map((jornada, index) => (
            <div
              key={index}
              className={`group relative rounded-[32px] bg-white border ${jornada.borderColor} shadow-lg shadow-zinc-100/60 hover:shadow-2xl hover:shadow-zinc-200/60 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
              }}
            >
              {/* Accent bar */}
              <div
                className={`h-1.5 bg-${jornada.accent} opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Hover gradient */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${jornada.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px]`}
              />

              <div className="relative z-10 p-8 md:p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className={`w-14 h-14 bg-linear-to-br ${jornada.gradient} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm`}
                  >
                    {jornada.icon}
                  </div>
                  <h3 className="text-xl font-extrabold text-brand-text">
                    {jornada.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {jornada.horarios.map((horario, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between p-4 rounded-2xl bg-zinc-50/80 group-hover:bg-white/80 transition-colors duration-300 border border-zinc-100/50`}
                    >
                      <span className="text-zinc-500 font-medium text-sm">
                        {horario.label}
                      </span>
                      <span
                        className={`text-${jornada.accent} font-extrabold text-lg`}
                      >
                        {horario.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative squiggly */}
        <div className="absolute top-6 right-8 opacity-10 hidden md:block">
          <svg
            width="120"
            height="30"
            viewBox="0 0 200 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 20C20 20 20 10 40 10C60 10 60 30 80 30C100 30 100 10 120 10C140 10 140 30 160 30C180 30 180 20 200 20"
              stroke="#ffd25d"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
