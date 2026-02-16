"use client";

export default function Philosophy() {
  const tags = [
    "Metodología Montessori",
    "Educación Bilingüe",
    "Atención Personalizada",
  ];

  return (
    <section
      id="nosotros"
      className="py-24 px-6 md:px-16 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20 relative">
          {/* Decorative element */}
          <div className="absolute -left-10 top-0 opacity-10 hidden md:block">
            <svg
              width="150"
              height="80"
              viewBox="0 0 150 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 40C20 40 20 20 40 20C60 20 60 60 80 60C100 60 100 20 120 20C140 20 140 40 150 40"
                stroke="#7FC1E2"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <span className="inline-block px-6 py-2 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-bold mb-6">
            Nuestra Filosofía
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-text mb-6">
            Un lugar para crecer con{" "}
            <span className="font-script italic text-brand-blue font-normal">
              amor
            </span>{" "}
            y{" "}
            <span className="font-script italic text-brand-brown font-normal">
              alegría
            </span>
          </h2>
          <p className="text-zinc-400 max-w-3xl mx-auto text-lg leading-relaxed">
            En Osito Mimoso creemos que cada niño es único y especial. Nuestro
            compromiso es brindar un ambiente cálido, seguro y estimulante donde
            puedan desarrollar todo su potencial.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Text */}
          <div className="order-2 lg:order-1">
            <h3 className="text-3xl md:text-4xl font-extrabold text-brand-text mb-8 leading-tight">
              Ayudamos a los niños a{" "}
              <span className="font-script italic text-brand-blue font-normal text-4xl md:text-5xl">
                descubrir la alegría
              </span>{" "}
              del aprendizaje creativo
            </h3>

            <div className="space-y-6 text-zinc-500 text-lg leading-relaxed mb-10">
              <p>
                Desde hace más de 15 años, hemos acompañado a cientos de
                familias en la hermosa etapa de la primera infancia. Nuestro
                equipo de profesionales cualificados trabaja con pasión y
                dedicación para crear experiencias de aprendizaje
                significativas.
              </p>
              <p>
                Entendemos la importancia de los primeros años en el desarrollo
                de los niños, por eso combinamos metodologías pedagógicas
                innovadoras con el calor humano que cada pequeño necesita para
                sentirse seguro y feliz.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-5 py-2.5 rounded-full bg-zinc-50 text-zinc-600 text-sm font-semibold border border-zinc-100 hover:border-brand-blue/30 hover:bg-white transition-colors cursor-default shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Image & Floating Cards */}
          <div className="order-1 lg:order-2 relative">
            {/* Main Image Container */}
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-700 aspect-4/3 bg-zinc-100 border-8 border-white">
              {/* Using a placeholder for the Lego image since tool failed, but styled to look premium */}
              <div className="absolute inset-0 bg-linear-to-br from-brand-blue/20 to-brand-gold/20 flex items-center justify-center text-6xl">
                🧩
              </div>
              {/* This would be the actual Image component once URI is available */}
              {/* <Image src="/images/activities.jpg" alt="Actividades creativas" fill className="object-cover" /> */}
            </div>

            {/* Floating Card: Emoji */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center text-4xl animate-bounce-slow border border-zinc-50">
              😋
            </div>

            {/* Floating Card: Text Info */}
            <div className="absolute -bottom-10 -left-6 max-w-[220px] bg-brand-brown/15 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-xl transform -rotate-2">
              <div className="flex gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-brand-pink animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse delay-75" />
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse delay-150" />
              </div>
              <p className="text-brand-text font-bold text-sm leading-snug">
                Creatividad y diversión todos los días
              </p>
            </div>

            {/* Decorative background circle */}
            <div className="absolute -z-10 -top-20 -right-20 w-64 h-64 bg-zinc-50 rounded-full" />
          </div>
        </div>
      </div>

      {/* Style for the bounce animation if not present */}
      <style jsx global>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
