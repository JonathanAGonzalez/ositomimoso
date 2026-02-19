"use client";

export default function Facilities() {
  const facilities = [
    {
      title: "Aulas de Juego",
      desc: "Espacios amplios y luminosos diseñados para estimular la creatividad y el aprendizaje.",
      icon: "🎨",
      image: "bg-linear-to-br from-brand-blue/20 to-brand-pink/20",
    },
    {
      title: "Patio Exterior",
      desc: "Zona de juegos al aire libre con áreas seguras y sombra natural.",
      icon: "🌳",
      image: "bg-linear-to-br from-brand-brown/20 to-brand-gold/20",
    },
    {
      title: "Comedor",
      desc: "Alimentación modalidad con vianda.",
      icon: "🍎",
      image: "bg-linear-to-br from-brand-pink/20 to-brand-brown/20",
    },
    // {
    //   title: "Salas de Descanso",
    //   desc: "Espacios tranquilos y acogedores para la siesta y el descanso.",
    //   icon: "😴",
    //   image: "bg-linear-to-br from-brand-blue/20 to-brand-gold/20",
    // },
    {
      title: "Sala Sensorial",
      desc: "Equipada con materiales para estimular los sentidos y el desarrollo.",
      icon: "✨",
      image: "bg-linear-to-br from-brand-gold/20 to-brand-pink/20",
    },
    {
      title: "Zona Multisensorial",
      desc: "Espacio de psicomotricidad y actividades físicas adaptadas.",
      icon: "🤸",
      image: "bg-linear-to-br from-brand-brown/20 to-brand-blue/20",
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

  return (
    <section id="instalaciones" className="py-24 px-6 md:px-16 bg-white">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {facilities.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-[32px] overflow-hidden shadow-lg shadow-zinc-200/50 hover:shadow-2xl transition-all duration-500 border border-zinc-50"
            >
              <div
                className={`relative h-56 ${item.image} flex items-center justify-center text-5xl`}
              >
                {/* Placeholder Emoji for image */}
                <span className="opacity-40 group-hover:scale-125 group-hover:opacity-100 transition-all duration-700">
                  🧩
                </span>

                {/* Floating Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-xl transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {item.icon}
                </div>
              </div>
              <div className="p-8">
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
