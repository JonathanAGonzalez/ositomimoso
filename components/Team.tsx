"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

// Import team images
import eugeImg from "@/src/assets/team/euge.jpeg";
import karinaImg from "@/src/assets/team/karina.jpeg";
import nataliaImg from "@/src/assets/team/natalia.jpeg";
import belenRImg from "@/src/assets/team/belen_r.jpeg";
import belenFImg from "@/src/assets/team/belen_f.jpeg";
import jazminImg from "@/src/assets/team/jazmin.jpeg";

function MemberCard({
  member,
  accent,
}: {
  member: { name: string; role: string; image: StaticImageData | string };
  accent: string;
}) {
  return (
    <div className="group/card flex flex-col items-center text-center">
      {/* Photo */}
      <div className="relative w-40 h-48 mb-6">
        <div
          className={`absolute inset-0 rounded-[28px] bg-${accent}/20 rotate-3 group-hover/card:rotate-6 transition-transform duration-500`}
        />
        <div className="relative w-full h-full rounded-[28px] overflow-hidden shadow-lg shadow-zinc-200/50 border-4 border-white group-hover/card:shadow-xl group-hover/card:scale-105 transition-all duration-500 bg-zinc-100">
          <Image
            src={member.image}
            alt={`${member.name} - ${member.role} en Osito Mimoso`}
            fill
            className="object-cover object-top"
            placeholder="blur"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      {/* Info */}
      <h4 className="font-extrabold text-brand-text text-xl mb-2">
        {member.name}
      </h4>
      <p
        className={`text-${accent} text-sm font-semibold max-w-[200px] leading-snug`}
      >
        {member.role}
      </p>
    </div>
  );
}

export default function Team() {
  const pillars = [
    {
      title: "Formación especializada",
      desc: "Nuestro equipo educativo cuenta con docentes capacitadas y título habilitante. Contamos con gabinete psicopedagógico de forma permanente.",
      icon: "🎓",
      color: "bg-brand-blue/10",
    },
    {
      title: "Vocación y Empatía",
      desc: "Nuestro proceso de selección prioriza la calidez humana y la capacidad de conectar emocionalmente con cada niño.",
      icon: "❤️",
      color: "bg-brand-pink/10",
    },
    {
      title: "Calidad y confianza",
      desc: "Acompañamos cada momento con responsabilidad, atención y protocolos claros que garantizan el bienestar y la tranquilidad de cada familia.",
      icon: "🛡️",
      color: "bg-brand-brown/10",
    },
  ];

  const teamGroups = [
    {
      label: "Equipo Directivo",
      accent: "brand-blue",
      members: [
        {
          name: "Eugenia",
          role: "Directora Institucional",
          image: eugeImg,
        },
        {
          name: "Karina",
          role: "Psicopedagoga y Prof. Estimulación Temprana",
          image: karinaImg,
        },
      ],
    },
    {
      label: "Equipo Docente",
      accent: "brand-pink",
      members: [
        {
          name: "Natalia",
          role: "Prof. de Nivel Inicial",
          image: nataliaImg,
        },
        {
          name: "Belén R.",
          role: "Prof. de Nivel Inicial",
          image: belenRImg,
        },
        {
          name: "Belén F.",
          role: "Prof. de Nivel Inicial",
          image: belenFImg,
        },
        {
          name: "Jazmín",
          role: "Auxiliar Pedagógica",
          image: jazminImg,
        },
      ],
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
      id="equipo"
      className="py-24 px-6 md:px-16 bg-[#fafafa]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-6 py-2 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-bold mb-6">
            Nuestro Equipo
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-text mb-6">
            Un equipo unido por el{" "}
            <span className="font-script italic text-brand-blue font-normal">
              amor
            </span>{" "}
            y la{" "}
            <span className="font-script italic text-brand-brown font-normal text-5xl">
              formación continua
            </span>
          </h2>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className={`bg-white p-10 rounded-[40px] shadow-xl shadow-zinc-200/50 border border-zinc-50 flex flex-col items-center text-center group hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-1 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isVisible ? `${idx * 150}ms` : "0ms" }}
            >
              <div
                className={`w-16 h-16 ${pillar.color} rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm`}
              >
                {pillar.icon}
              </div>
              <h3 className="text-xl font-extrabold text-brand-text mb-4">
                {pillar.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Team Members by Group */}
        <div className="space-y-20">
          {teamGroups.map((group, gIdx) => (
            <div
              key={gIdx}
              className={`transition-all duration-1000 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: isVisible ? `${(gIdx + 3) * 200}ms` : "0ms",
              }}
            >
              {/* Group label */}
              <h3
                className={`text-center text-${group.accent} font-extrabold text-2xl mb-12 flex items-center justify-center gap-4`}
              >
                <span
                  className={`w-12 h-1 bg-${group.accent}/20 rounded-full`}
                />
                {group.label}
                <span
                  className={`w-12 h-1 bg-${group.accent}/20 rounded-full`}
                />
              </h3>

              {/* Members grid */}
              <div
                className={`grid gap-x-12 gap-y-16 justify-items-center ${
                  group.members.length <= 2
                    ? "grid-cols-1 sm:grid-cols-2 max-w-xl mx-auto"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                }`}
              >
                {group.members.map((member, mIdx) => (
                  <MemberCard
                    key={mIdx}
                    member={member}
                    accent={group.accent}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Commitment note */}
        <div className="mt-24 max-w-4xl mx-auto bg-white rounded-[40px] p-10 md:p-16 shadow-xl shadow-zinc-200/50 border border-zinc-50 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-2xl" />

          <div className="w-20 h-20 bg-brand-gold/10 rounded-3xl flex items-center justify-center text-4xl mb-8 relative z-10 shadow-inner">
            🤝
          </div>

          <p className="text-zinc-500 text-lg leading-relaxed relative z-10">
            En <span className="text-brand-blue font-bold">Osito Mimoso</span>,
            entendemos que dejas en nuestras manos lo más valioso. Por ello,
            trabajamos de manera interdisciplinaria para acompañar el desarrollo
            desde una perspectiva integral, considerando al niño como un sujeto
            único, cuyas dimensiones emocionales, sociales y cognitivas se
            integran y potencian entre sí.
          </p>
        </div>
      </div>
    </section>
  );
}
