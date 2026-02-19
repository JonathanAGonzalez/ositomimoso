"use client";

import { useEffect, useRef, useState } from "react";

export default function Features() {
  const features = [
    {
      title: "Amor y Contención",
      description:
        "Cada niño es acompañado con afecto y respeto por la individualidad, construyendo vínculos seguros que fortalecen su confianza desde los primeros años.",
      icon: "❤️",
      gradient: "from-brand-pink/15 to-brand-pink/5",
      accent: "bg-brand-pink",
      textColor: "text-brand-pink",
      borderColor: "border-brand-pink/20",
    },
    {
      title: "Desarrollo Integral",
      description:
        "Estimulación cognitiva, emocional y social a través del juego, la exploración y propuestas pensadas para cada etapa del crecimiento.",
      icon: "🧠",
      gradient: "from-brand-blue/15 to-brand-blue/5",
      accent: "bg-brand-blue",
      textColor: "text-brand-blue",
      borderColor: "border-brand-blue/20",
    },
    {
      title: "Trabajo en Equipo con las Familias",
      description:
        "Fomentamos la presencia activa de la familia en el proceso educativo, construyendo vínculos basados en la comunicación y la confianza.",
      icon: "🤝",
      gradient: "from-brand-brown/15 to-brand-brown/5",
      accent: "bg-brand-brown",
      textColor: "text-brand-brown",
      borderColor: "border-brand-brown/20",
    },
    {
      title: "Seguridad y Bienestar",
      description:
        "Espacios diseñados para la primera infancia, con ambientes seguros, preparados para brindar tranquilidad todos los días.",
      icon: "🛡️",
      gradient: "from-brand-gold/15 to-brand-gold/5",
      accent: "bg-brand-gold",
      textColor: "text-brand-gold",
      borderColor: "border-brand-gold/20",
    },
    {
      title: "ESI",
      description:
        "Abordamos la afectividad y el conocimiento del cuerpo desde el respeto. Fomentamos la autonomía y los vínculos saludables en un entorno seguro y de confianza.",
      icon: "🫂",
      gradient: "from-brand-pink/15 to-brand-pink/5",
      accent: "bg-brand-pink",
      textColor: "text-brand-pink",
      borderColor: "border-brand-pink/20",
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
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 md:px-16 bg-[#fafafa] relative overflow-hidden"
    >
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-[20%] w-72 h-72 bg-brand-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-[10%] w-56 h-56 bg-brand-pink/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-6 py-2 rounded-full bg-brand-pink/10 text-brand-pink text-sm font-bold mb-6">
            ¿Por qué elegirnos?
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-text mb-6">
            Lo que nos hace{" "}
            <span className="font-script italic text-brand-blue font-normal">
              especiales
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Cada aspecto de nuestra propuesta está pensado para acompañar el
            crecimiento de tu hijo con calidez y profesionalismo.
          </p>
        </div>

        {/* Cards — top row: 3 cards, bottom row: 2 centered */}
        <div className="flex flex-col gap-8">
          {/* Top row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.slice(0, 3).map((feature, index) => (
              <FeatureCard
                key={index}
                feature={feature}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
          {/* Bottom row — centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto w-full">
            {features.slice(3).map((feature, index) => (
              <FeatureCard
                key={index + 3}
                feature={feature}
                index={index + 3}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative squiggly line */}
      <div className="absolute bottom-8 left-10 opacity-15 hidden md:block">
        <svg
          width="180"
          height="40"
          viewBox="0 0 200 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 20C20 20 20 10 40 10C60 10 60 30 80 30C100 30 100 10 120 10C140 10 140 30 160 30C180 30 180 20 200 20"
            stroke="#ff85a1"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  feature: {
    title: string;
    description: string;
    icon: string;
    gradient: string;
    accent: string;
    textColor: string;
    borderColor: string;
  };
  index: number;
  isVisible: boolean;
}

function FeatureCard({ feature, index, isVisible }: FeatureCardProps) {
  return (
    <div
      className={`group relative p-8 rounded-[32px] bg-white border ${feature.borderColor} shadow-lg shadow-zinc-100/60 hover:shadow-2xl hover:shadow-zinc-200/60 transition-all duration-500 transform hover:-translate-y-2 flex flex-col items-start overflow-hidden ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 120}ms` : "0ms",
      }}
    >
      {/* Gradient background highlight on hover */}
      <div
        className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px]`}
      />

      {/* Accent bar at top */}
      <div
        className={`absolute top-0 left-8 right-8 h-1 ${feature.accent} rounded-b-full opacity-40 group-hover:opacity-80 transition-opacity duration-500`}
      />

      <div className="relative z-10 flex flex-col items-start w-full">
        <div
          className={`w-16 h-16 bg-linear-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm`}
        >
          {feature.icon}
        </div>
        <h3
          className={`text-xl font-extrabold text-brand-text mb-3 group-hover:${feature.textColor} transition-colors duration-300`}
        >
          {feature.title}
        </h3>
        <p className="text-zinc-500 leading-relaxed text-sm md:text-base">
          {feature.description}
        </p>
      </div>
    </div>
  );
}
