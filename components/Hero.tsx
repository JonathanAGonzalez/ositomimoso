"use client";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-[#fafafa]"
    >
      {/* Decorative background elements */}
      <div className="absolute top-20 left-[10%] w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-40 right-[10%] w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl" />
      <div className="absolute top-40 right-[5%] w-12 h-12 border-4 border-dashed border-zinc-200 rounded-full animate-spin-slow" />

      {/* Small floating blobs from the image */}
      <div className="absolute bottom-[20%] left-[5%] w-32 h-24 bg-brand-blue/10 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] dark:bg-brand-blue/20" />
      <div className="absolute top-[30%] right-[10%] w-16 h-16 bg-zinc-200 rounded-full" />

      <div className="relative z-10 flex flex-col items-center max-w-5xl text-center">
        {/* Center Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="w-24 h-24 bg-white shadow-xl rounded-2xl flex items-center justify-center p-2 mb-2 rotate-3 hover:rotate-0 transition-transform duration-500">
            {/* Replace with actual image later if available */}
            <div className="w-full h-full bg-brand-blue/10 rounded-xl flex items-center justify-center">
              <span className="text-3xl">🐻</span>
            </div>
          </div>
          <p className="font-script text-2xl text-zinc-400">osito mimoso</p>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-brand-text leading-tight mb-6">
          El mejor lugar para <br />
          <span className="font-script italic text-brand-blue font-normal">
            aprender
          </span>{" "}
          y{" "}
          <span className="font-script italic text-brand-brown font-normal">
            jugar
          </span>{" "}
          <br />
          para niños
        </h1>

        <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Descubre miles de actividades divertidas e interactivas para apoyar el
          crecimiento y el proceso de aprendizaje de tu hijo
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <button className="px-8 py-4 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-full font-bold shadow-lg shadow-brand-blue/25 transition-all flex items-center gap-2 group transform hover:-translate-y-1">
            Comenzar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:scale-110 transition-transform"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>
          <button className="px-8 py-4 bg-white hover:bg-zinc-50 text-zinc-600 border border-zinc-100 rounded-full font-bold shadow-sm transition-all transform hover:-translate-y-1">
            Conoce Más
          </button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-zinc-200/50 flex flex-col items-center transform transition-all duration-300 hover:scale-105">
            <div className="mb-4 text-3xl">🎓</div>
            <h3 className="text-4xl font-extrabold text-brand-blue mb-1">
              15+
            </h3>
            <p className="text-zinc-400 font-medium whitespace-nowrap">
              Años de Experiencia
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-zinc-200/50 flex flex-col items-center transform transition-all duration-300 hover:scale-105 border-b-4 border-brand-pink">
            <div className="mb-4 text-3xl">❤️</div>
            <h3 className="text-4xl font-extrabold text-brand-pink mb-1">
              200+
            </h3>
            <p className="text-zinc-400 font-medium whitespace-nowrap">
              Familias Felices
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-zinc-200/50 flex flex-col items-center transform transition-all duration-300 hover:scale-105">
            <div className="mb-4 text-3xl">⭐</div>
            <h3 className="text-4xl font-extrabold text-brand-gold mb-1">
              100%
            </h3>
            <p className="text-zinc-400 font-medium whitespace-nowrap">
              Amor y Dedicación
            </p>
          </div>
        </div>
      </div>

      {/* Squiggly line from image */}
      <div className="absolute bottom-10 right-10 opacity-20 hidden md:block">
        <svg
          width="200"
          height="40"
          viewBox="0 0 200 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 20C20 20 20 10 40 10C60 10 60 30 80 30C100 30 100 10 120 10C140 10 140 30 160 30C180 30 180 20 200 20"
            stroke="#7FC1E2"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </section>
  );
}
