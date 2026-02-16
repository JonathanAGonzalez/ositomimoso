"use client";

export default function Team() {
  const pillars = [
    {
      title: "Formación Especializada",
      desc: "Contamos con docentes tituladas y especialistas en estimulación temprana, psicomotricidad y nutrición infantil.",
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
      title: "Seguridad y Protocolos",
      desc: "Todo nuestro personal está capacitado en primeros auxilios pediátricos y protocolos de cuidado integral.",
      icon: "🛡️",
      color: "bg-brand-brown/10",
    },
  ];

  return (
    <section id="equipo" className="py-24 px-6 md:px-16 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white p-10 rounded-[40px] shadow-xl shadow-zinc-200/50 border border-zinc-50 flex flex-col items-center text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
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

        {/* Commitment Highlight */}
        <div className="max-w-4xl mx-auto bg-white rounded-[40px] p-10 md:p-16 shadow-xl shadow-zinc-200/50 border border-zinc-50 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-2xl" />

          <div className="w-20 h-20 bg-brand-gold/10 rounded-3xl flex items-center justify-center text-4xl mb-8 relative z-10 shadow-inner">
            🤝
          </div>

          <p className="text-zinc-500 text-lg leading-relaxed mb-8 relative z-10">
            En <span className="text-brand-blue font-bold">Osito Mimoso</span>,
            entendemos que dejas en nuestras manos lo más valioso. Por eso,
            nuestro equipo trabaja de forma interdisciplinaria, supervisando
            cada etapa del desarrollo con una mirada{" "}
            <span className="italic font-medium">amorosa y profesional</span>.
          </p>

          <p className="text-zinc-300 text-xs md:text-sm font-medium italic relative z-10">
            Mantenemos la privacidad de nuestro staff para garantizar un entorno
            de trabajo seguro y enfocado exclusivamente en el bienestar de los
            pequeños.
          </p>
        </div>
      </div>
    </section>
  );
}
