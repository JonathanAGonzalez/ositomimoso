"use client";

import React, { useEffect, useRef, useState } from "react";
import posthog from "posthog-js";

import Image from "next/image";
import img1 from "@/src/assets/avioncito.png";
import img2 from "@/src/assets/establecimiento/2.jpg";
import img3 from "@/src/assets/establecimiento/3.jpg";
import img4 from "@/src/assets/establecimiento/4.jpg";
import img5 from "@/src/assets/establecimiento/5.jpg";
import img6 from "@/src/assets/establecimiento/6.jpg";
import img7 from "@/src/assets/establecimiento/7.jpg";
import img8 from "@/src/assets/establecimiento/8.jpg";
import img9 from "@/src/assets/establecimiento/9.jpg";
import img10 from "@/src/assets/establecimiento/10.jpg";

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("Todas");

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    posthog.capture("gallery_filter_changed", {
      filter_category: category,
    });
  };

  const categories = ["Todas", "Espacios", "Actividades", "Aire Libre"];

  const photos = [
    {
      id: 1,
      category: "Aire Libre",
      title: "Hora de viajar",
      size: "large",
      image: img1,
    },
    {
      id: 2,
      category: "Actividades",
      title: "Hora del Cuento",
      size: "small",
      image: img2,
    },
    {
      id: 3,
      category: "Actividades",
      title: "Construyendo Sueños",
      size: "medium",
      image: img3,
    },
    {
      id: 4,
      category: "Actividades",
      title: "Juego Simbólico",
      size: "medium",
      image: img4,
    },
    {
      id: 5,
      category: "Espacios",
      title: "Pasillos Coloridos",
      size: "small",
      image: img5,
    },
    {
      id: 6,
      category: "Actividades",
      title: "Fiestas Temáticas",
      size: "large",
      image: img6,
    },
    {
      id: 7,
      category: "Espacios",
      title: "Sala de Juegos",
      size: "small",
      image: img7,
    },
    {
      id: 8,
      category: "Actividades",
      title: "Trabajo en Equipo",
      size: "medium",
      image: img8,
    },
    {
      id: 9,
      category: "Actividades",
      title: "Compartiendo Momentos",
      size: "large",
      image: img9,
    },
    {
      id: 10,
      category: "Espacios",
      title: "Nos divertimos aprendiendo",
      size: "small",
      image: img10,
    },
  ];

  const filteredPhotos =
    activeFilter === "Todas"
      ? photos
      : photos.filter((p) => p.category === activeFilter);

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
      id="galeria"
      className="py-24 px-6 md:px-16 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-6 py-2 rounded-full bg-brand-pink/10 text-brand-pink text-sm font-bold mb-6">
            Nuestros Momentos
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-text mb-6">
            Una mirada a nuestras
            <span className="font-script italic text-brand-blue font-normal">
              experiencias cotidianas
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Capturamos las sonrisas, el aprendizaje y los descubrimientos que
            hacen único cada día en Osito Mimoso.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-brand-blue text-white shadow-xl shadow-brand-blue/20"
                  : "bg-zinc-50 text-zinc-400 hover:bg-zinc-100"
              } cursor-pointer`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px] grid-flow-dense">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              className={`group relative rounded-[40px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 border-4 border-white transform hover:-translate-y-2
                ${photo.size === "large" ? "md:col-span-2 md:row-span-2" : ""}
                ${photo.size === "medium" ? "md:row-span-2" : ""}
                ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }
              `}
              style={{ transitionDelay: isVisible ? `${idx * 150}ms` : "0ms" }}
            >
              {/* Image */}
              <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-1000">
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  placeholder="blur"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
              </div>

              {/* Info Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-white/70 text-xs font-bold uppercase tracking-widest mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {photo.category}
                </span>
                <h4 className="text-white text-2xl font-extrabold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {photo.title}
                </h4>
              </div>

              {/* Category Tag (Top Right) */}
              <div className="absolute top-6 right-6 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-zinc-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {photo.category}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="font-script text-2xl text-brand-brown mb-4">
            ¡Te esperamos para compartir momentos únicos!
          </p>
          <div className="flex justify-center gap-3">
            <span className="w-3 h-3 rounded-full bg-brand-blue animate-bounce"></span>
            <span className="w-3 h-3 rounded-full bg-brand-pink animate-bounce delay-100"></span>
            <span className="w-3 h-3 rounded-full bg-brand-gold animate-bounce delay-200"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
