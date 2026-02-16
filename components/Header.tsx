"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import logo from "@/src/assets/logo.png";

export default function Header() {
  const [active, setActive] = useState("Inicio");
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    "Inicio",
    "Nosotros",
    "Programas",
    "Instalaciones",
    "Galería",
    "Equipo",
    "Testimonios",
    "Contacto",
  ];

  const normalizeId = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  // Scroll Spy Logic
  useEffect(() => {
    const sectionIds = menuItems.map((item) => normalizeId(item));

    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -80% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const label = menuItems.find((item) => normalizeId(item) === id);
          if (label) setActive(label);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/90 backdrop-blur-xl md:px-16 flex items-center justify-between shadow-sm border-b border-zinc-100/50">
        <div className="flex items-center gap-2">
          <Link
            href="#inicio"
            onClick={() => setActive("Inicio")}
            className="group flex items-center gap-2 transition-opacity hover:opacity-90"
          >
            <div className="transition-all duration-500 ease-out transform group-hover:scale-110 group-hover:-rotate-3 group-active:scale-90">
              <Image
                src={logo.src}
                width={120}
                height={60}
                alt="Osito Mimoso Logo"
                className="w-auto h-12 md:h-14 object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {menuItems.map((item) => (
            <Link
              key={item}
              href={`#${normalizeId(item)}`}
              onClick={() => setActive(item)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                active === item
                  ? "bg-brand-blue/15 text-brand-blue"
                  : "text-zinc-500 hover:text-brand-blue hover:bg-zinc-50"
              }`}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors z-50 relative"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-brand-text"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          )}
        </button>
      </header>

      {/* Mobile Menu Drawer - Outside header, Fixed position */}
      <div
        className={`fixed inset-0 bg-white z-60 lg:hidden transition-all duration-500 ease-in-out transform flex flex-col ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <div className="flex flex-col items-center justify-center grow gap-8 p-10 overflow-y-auto">
          {/* Close Button Inside Drawer */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-brand-text transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="mb-4 animate-bounce-slow">
            <Image
              src={logo.src}
              width={100}
              height={100}
              alt="Logo"
              className="w-auto h-20 object-contain"
            />
          </div>
          <nav className="flex flex-col items-center gap-6 w-full">
            {menuItems.map((item) => (
              <Link
                key={item}
                href={`#${normalizeId(item)}`}
                onClick={() => {
                  setActive(item);
                  setIsOpen(false);
                }}
                className={`text-2xl font-extrabold transition-all duration-300 py-2 ${
                  active === item
                    ? "text-brand-blue scale-110"
                    : "text-zinc-400 hover:text-brand-blue"
                }`}
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-zinc-100 w-full flex flex-col items-center gap-4">
            <p className="text-zinc-400 font-script text-2xl italic text-center">
              ¡Un lugar para crecer feliz!
            </p>
            <div className="flex gap-4">
              <span className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
                ❤️
              </span>
              <span className="w-10 h-10 rounded-full bg-brand-pink/10 flex items-center justify-center">
                🎨
              </span>
              <span className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center">
                ⭐
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
