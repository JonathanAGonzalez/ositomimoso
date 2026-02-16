"use client";

export default function Programs() {
  const programs = [
    {
      title: "Bebés",
      age: "0-1 año",
      description: "Cuidado especializado en un ambiente cálido y seguro.",
      icon: "👶",
      emoji: "👶",
      activities: [
        "Estimulación temprana",
        "Masajes infantiles",
        "Música y movimiento",
        "Rutinas de sueño y alimentación",
      ],
      color: "bg-brand-blue/10",
      accent: "text-brand-blue",
    },
    {
      title: "Exploradores",
      age: "1-2 años",
      description: "Descubriendo el mundo a través del juego y la exploración.",
      icon: "🎵",
      emoji: "🎵",
      activities: [
        "Desarrollo psicomotriz",
        "Juego sensorial",
        "Lenguaje y comunicación",
        "Socialización",
      ],
      color: "bg-brand-brown/10",
      accent: "text-brand-brown",
    },
    {
      title: "Creativos",
      age: "2-3 años",
      description: "Fomentamos la creatividad y la expresión personal.",
      icon: "🎨",
      emoji: "🎨",
      activities: [
        "Arte y creatividad",
        "Pre-escritura",
        "Autonomía personal",
        "Educación emocional",
      ],
      color: "bg-brand-pink/10",
      accent: "text-brand-pink",
    },
    {
      title: "Preparados",
      age: "3-6 años",
      description: "Listos para dar el gran salto a la educación primaria.",
      icon: "📚",
      emoji: "📚",
      activities: [
        "Pre-lectura y matemáticas",
        "Inglés intensivo",
        "Proyectos educativos",
        "Preparación para primaria",
      ],
      color: "bg-brand-gold/15",
      accent: "text-brand-gold",
    },
  ];

  const valueProps = [
    {
      title: "Metodología Activa",
      desc: "Aprendizaje basado en la experiencia y el juego",
      icon: "🎨",
    },
    {
      title: "Educación Bilingüe",
      desc: "Inmersión natural en inglés desde temprana edad",
      icon: "🌍",
    },
    {
      title: "Grupos Reducidos",
      desc: "Atención personalizada para cada pequeño",
      icon: "👥",
    },
  ];

  return (
    <section id="programas" className="py-24 px-6 md:px-16 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-6 py-2 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-bold mb-6">
            Nuestros Programas
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-text mb-6">
            Nuestras características{" "}
            <span className="font-script italic text-brand-blue font-normal">
              interactivas
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Diseñamos experiencias educativas específicas para cada etapa del
            desarrollo, respetando el ritmo único de cada niño.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {programs.map((program, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[40px] shadow-xl shadow-zinc-200/50 overflow-hidden border border-zinc-50 group hover:shadow-2xl transition-all duration-500"
            >
              <div className="p-8 md:p-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4 items-center">
                    <div
                      className={`w-14 h-14 ${program.color} rounded-2xl flex items-center justify-center text-2xl`}
                    >
                      {program.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-brand-text">
                        {program.title}
                      </h3>
                      <p className="text-zinc-400 text-sm font-medium">
                        {program.age}
                      </p>
                    </div>
                  </div>
                  <span className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
                    {program.emoji}
                  </span>
                </div>

                <p className="text-zinc-500 mb-8 border-b border-zinc-100 pb-8 text-lg">
                  {program.description}
                </p>

                <div className="space-y-4">
                  <h4 className="font-bold text-brand-text flex items-center gap-2">
                    Actividades Principales:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-400">
                    {program.activities.map((act, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-sm md:text-base group/item"
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${program.color.replace("/10", "/40")} group-hover/item:${program.color.replace("/10", "/100")} transition-colors`}
                        />
                        {act}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Value Props */}
        <div className="bg-white rounded-[40px] p-10 md:p-16 shadow-xl shadow-zinc-200/50 border border-zinc-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl -mr-32 -mt-32" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {valueProps.map((prop, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 bg-zinc-50 rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-inner group-hover:bg-brand-blue/10 transition-colors duration-500">
                  {prop.icon}
                </div>
                <h3 className="text-xl font-extrabold text-brand-text mb-3">
                  {prop.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-[200px]">
                  {prop.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
