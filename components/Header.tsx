"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import logo from "@/src/assets/logo.png";
import posthog from "posthog-js";

export default function Header() {
  const [active, setActive] = useState("Inicio");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pillStyles, setPillStyles] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLElement>(null);
  const isManualScroll = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const menuItems = [
    "Inicio",
    "Nosotros",
    "Programas",
    "Instalaciones",
    "Equipo",
    "Testimonios",
    "Galería",
    "Contacto",
  ];

  const normalizeId = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const handleSetActive = (item: string) => {
    setActive(item);
    posthog.capture("navigation_click", {
      section: item,
    });
    // Disable intersection observer while we scroll to the clicked section
    isManualScroll.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isManualScroll.current = false;
    }, 1000);
  };

  // Scroll detection for header effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll Spy Logic
  useEffect(() => {
    const sectionIds = menuItems.map((item) => normalizeId(item));

    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -80% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Don't update from scroll if we are manually navigating
      if (isManualScroll.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const label = menuItems.find((item) => normalizeId(item) === id);
          if (label) {
            setActive(label);
            // Update URL hash without jumping
            window.history.replaceState(null, "", `#${id}`);
          }
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

    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update pill position when active element changes
  useEffect(() => {
    const updatePill = () => {
      if (navRef.current) {
        const activeElement = navRef.current.querySelector(
          `[data-active="true"]`,
        ) as HTMLElement;
        if (activeElement) {
          setPillStyles({
            left: activeElement.offsetLeft,
            width: activeElement.offsetWidth,
          });
        }
      }
    };

    updatePill();
    // Re-run on window resize to keep pill aligned
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [active]);

  const toggleMenu = () => {
    if (!isOpen) {
      posthog.capture("mobile_menu_opened");
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-16 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "py-3 bg-white/70 backdrop-blur-2xl shadow-lg shadow-zinc-200/20 border-b border-zinc-200/30"
            : "py-5 bg-white/40 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div className="flex items-center gap-2">
          <Link
            href="#inicio"
            onClick={() => handleSetActive("Inicio")}
            className="group flex items-center gap-2 transition-opacity hover:opacity-90 cursor-pointer"
          >
            <div
              className={`transition-all duration-500 ease-out transform group-hover:scale-105 ${
                scrolled ? "" : "group-hover:-rotate-2"
              }`}
            >
              <Image
                src={logo.src}
                width={120}
                height={60}
                alt="Osito Mimoso Logo"
                className={`w-auto object-contain transition-all duration-500 ${
                  scrolled ? "h-10 md:h-11" : "h-12 md:h-14"
                }`}
                priority
              />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav
          ref={navRef}
          className="hidden lg:flex items-center gap-2 relative"
        >
          {/* Sliding Pill Background */}
          <div
            className={`absolute h-10 rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              scrolled ? "bg-brand-blue/10 shadow-sm" : "bg-brand-blue/15"
            }`}
            style={{
              left: `${pillStyles.left}px`,
              width: `${pillStyles.width}px`,
            }}
          />

          {menuItems.map((item) => (
            <Link
              key={item}
              href={`#${normalizeId(item)}`}
              onClick={() => handleSetActive(item)}
              data-active={active === item}
              className={`relative z-10 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                active === item
                  ? "text-brand-blue"
                  : "text-zinc-400 hover:text-zinc-700"
              } cursor-pointer`}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors z-50 relative cursor-pointer"
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
            className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-brand-text transition-colors cursor-pointer"
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
                  handleSetActive(item);
                  setIsOpen(false);
                }}
                className={`text-2xl font-extrabold transition-all duration-300 py-2 ${
                  active === item
                    ? "text-brand-blue scale-110"
                    : "text-zinc-400 hover:text-brand-blue"
                } cursor-pointer`}
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
