"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import patioImg from "@/src/assets/establecimiento/patio_exterior.png";
import aulaDeJuegos from "@/src/assets/establecimiento/aula_juegos.jpg";
import multiSensorialImg from "@/src/assets/establecimiento/multi-sensorial.webp";
import viandaImg from "@/src/assets/vianda.png";
import sensorialImg from "@/src/assets/sensorial.png";
// Note: We might need to move the video to public if this import fails, but trying this first.
// If it fails, I'll help the user move it. For now, assuming we can get a URL or need a loader.
// Since Next.js doesn't import videos by default without config, I'll use the path relative to public if I move it,
// OR I'll try to Require it if user has a loader.
// actually, let's use the file path if it's in public, but it's in src/assets.
// I will move the video to public to ensure it works reliable.
// But first let's import the images.

export default function Facilities() {
  const facilities = [
    {
      title: "Aulas de Juego",
      desc: "Espacios amplios y luminosos diseñados para estimular la creatividad y el aprendizaje.",
      icon: "🎨",
      gradient: "bg-linear-to-br from-brand-blue/20 to-brand-pink/20",
      image: aulaDeJuegos,
    },
    {
      title: "Patio Exterior",
      desc: "Zona de juegos al aire libre con áreas seguras y sombra natural.",
      icon: "🌳",
      gradient: "bg-linear-to-br from-brand-brown/20 to-brand-gold/20",
      image: patioImg,
    },
    {
      title: "Modalidad de Vianda",
      desc: "Espacio acondicionado para el almuerzo donde los niños traen su comida de casa.",
      icon: "🍎",
      gradient: "bg-linear-to-br from-brand-pink/20 to-brand-brown/20",
      image: viandaImg,
    },
    {
      title: "Sala Sensorial",
      desc: "Equipada con materiales para estimular los sentidos y el desarrollo.",
      icon: "✨",
      gradient: "bg-linear-to-br from-brand-gold/20 to-brand-pink/20",
      image: sensorialImg,
    },
    {
      title: "Zona Multisensorial",
      desc: "Espacio de psicomotricidad y actividades físicas adaptadas.",
      icon: "✨",
      gradient: "bg-linear-to-br from-brand-brown/20 to-brand-blue/20",
      image: multiSensorialImg,
      video: "/videos/multi-sensorial.mp4", // We'll move the file to public/videos
    },
  ];

  const securityPoints = [
    {
      title: "Control de Acceso",
      desc: "Sistema de seguridad 24/7",
      icon: "🔒",
    },
    {
      title: "Higiene Total",
      desc: "Protocolos de limpieza estrictos",
      icon: "🧼",
    },
    { title: "Climatización", desc: "Temperatura controlada", icon: "🌡️" },
    { title: "Videovigilancia", desc: "Monitoreo en tiempo real", icon: "📹" },
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

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    hasVideo: boolean,
  ) => {
    if (hasVideo) {
      const video = e.currentTarget.querySelector("video");
      if (video) {
        video.play().catch((err) => console.log("Video autoplay failed", err));
      }
    }
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement>,
    hasVideo: boolean,
  ) => {
    if (hasVideo) {
      const video = e.currentTarget.querySelector("video");
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="instalaciones"
      className="py-24 px-6 md:px-16 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 px-4">
          <span className="inline-block px-6 py-2 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-bold mb-6">
            Nuestras Instalaciones
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-text mb-6">
            Espacios diseñados para el{" "}
            <span className="font-script italic text-brand-blue font-normal">
              bienestar
            </span>{" "}
            y la{" "}
            <span className="font-script italic text-brand-brown font-normal text-5xl">
              diversión
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Cada rincón de nuestra escuela está pensado para crear un ambiente
            seguro, estimulante y acogedor donde los niños se sientan como en
            casa.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="flex flex-wrap justify-center gap-8 mb-24">
          {facilities.map((item, idx) => (
            <div
              key={idx}
              className={`group bg-white rounded-[32px] overflow-hidden shadow-lg shadow-zinc-200/50 hover:shadow-2xl transition-all duration-700 transform border border-zinc-50 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.4rem)] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: isVisible ? `${idx * 150}ms` : "0ms" }}
              onMouseEnter={(e) => handleMouseEnter(e, !!item.video)}
              onMouseLeave={(e) => handleMouseLeave(e, !!item.video)}
            >
              <div
                className={`relative h-64 ${!item.image ? item.gradient : ""} flex items-center justify-center text-5xl overflow-hidden`}
              >
                {/* Image/Video Content */}
                {item.image && (
                  <>
                    <Image
                      src={item.image}
                      alt={`${item.title} - Jardín de Infantes Osito Mimoso`}
                      fill
                      className={`object-cover transition-transform duration-700 ${item.video ? "group-hover:opacity-0" : "group-hover:scale-110"}`}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  </>
                )}

                {/* Video Layer */}
                {item.video && (
                  <video
                    src={item.video}
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                )}

                {/* Placeholder/Icon if no image */}
                {!item.image && (
                  <span className="opacity-40 group-hover:scale-125 group-hover:opacity-100 transition-all duration-700">
                    🧩
                  </span>
                )}

                {/* Floating Icon */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center text-2xl transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                  {item.icon}
                </div>
              </div>
              <div className="p-8 relative z-10 bg-white">
                <h3 className="text-xl font-extrabold text-brand-text mb-3">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Security Banner */}
        {/* <div className="bg-white rounded-[40px] p-10 md:p-16 shadow-2xl shadow-zinc-200/60 border border-zinc-100 relative overflow-hidden group">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-linear-to-r from-brand-blue/5 via-transparent to-brand-brown/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

          <div className="text-center mb-12 relative z-10">
            <h3 className="text-3xl md:text-4xl font-extrabold text-brand-text mb-4">
              <span className="font-script italic text-brand-blue font-normal">
                Seguridad
              </span>{" "}
              y confort en cada detalle
            </h3>
            <p className="text-zinc-400 font-medium tracking-wide text-sm md:text-base">
              Tu tranquilidad es nuestra prioridad
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative z-10">
            {securityPoints.map((point, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-inner group-hover:shadow-soft transition-all duration-500 hover:rotate-6">
                  {point.icon}
                </div>
                <h4 className="font-bold text-brand-text text-sm md:text-base mb-1">
                  {point.title}
                </h4>
                <p className="text-zinc-400 text-xs md:text-sm">{point.desc}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
}
