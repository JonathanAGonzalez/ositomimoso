"use client";

export default function Features() {
  const features = [
    {
      title: "Amor y Cariño",
      description:
        "Cada niño es tratado con el amor y cuidado que merece, creando vínculos afectivos sólidos.",
      icon: "❤️",
      color: "bg-brand-pink/10",
      textColor: "text-brand-pink",
    },
    {
      title: "Desarrollo Integral",
      description:
        "Programas diseñados para estimular el desarrollo cognitivo, emocional y social de cada pequeño.",
      icon: "🎯",
      color: "bg-brand-blue/10",
      textColor: "text-brand-blue",
    },
    {
      title: "Trabajo en Equipo",
      description:
        "Colaboración estrecha con las familias para el bienestar y crecimiento de los niños.",
      icon: "👥",
      color: "bg-brand-brown/10",
      textColor: "text-brand-brown",
    },
    {
      title: "Seguridad",
      description:
        "Instalaciones seguras, higiénicas y adaptadas específicamente para la primera infancia.",
      icon: "🛡️",
      color: "bg-brand-gold/15",
      textColor: "text-brand-gold",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-[32px] bg-white border border-zinc-100 shadow-xl shadow-zinc-200/40 hover:shadow-2xl hover:shadow-zinc-300/50 transition-all duration-500 transform hover:-translate-y-2 flex flex-col items-start"
            >
              <div
                className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-500`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-extrabold text-brand-text mb-4">
                {feature.title}
              </h3>
              <p className="text-zinc-500 leading-relaxed text-sm md:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
