"use client";

export default function Testimonials() {
  const testimonials = [
    {
      text: "Osito Mimoso ha sido un verdadero regalo para nuestra familia. Lucas va feliz cada día y hemos visto un desarrollo increíble en tan poco tiempo.",
      author: "Patricia y Carlos",
      child: "Padres de Lucas (2 años)",
      stars: 5,
    },
    {
      text: "Como madre primeriza, tenía muchas dudas. El equipo de Osito Mimoso me ha dado toda la confianza y tranquilidad que necesitaba.",
      author: "Marta Sánchez",
      child: "Mamá de Emma (1 año)",
      stars: 5,
    },
    {
      text: "Llevamos tres años en Osito Mimoso y no podríamos estar más contentos. Sofía ha aprendido tanto y ha hecho amigos maravillosos.",
      author: "Jorge y Ana",
      child: "Padres de Sofía (3 años)",
      stars: 5,
    },
    {
      text: "La atención personalizada y el cariño que recibe David cada día es invaluable. Es más que una escuela, es una segunda familia.",
      author: "Raquel Moreno",
      child: "Mamá de David (4 años)",
      stars: 5,
    },
    {
      text: "Elegir Osito Mimoso fue la mejor decisión. Martina disfruta cada actividad y ha desarrollado una curiosidad increíble por aprender.",
      author: "Miguel y Laura",
      child: "Padres de Martina (2 años)",
      stars: 5,
    },
    {
      text: "Lo que más valoro es la comunicación constante y la profesionalidad del equipo. Pablo ha crecido mucho emocionalmente.",
      author: "Isabel Ruiz",
      child: "Mamá de Pablo (3 años)",
      stars: 5,
    },
  ];

  return (
    <section
      id="testimonios"
      className="py-24 px-6 md:px-16 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-text mb-6">
            Lo que dicen las{" "}
            <span className="font-script italic text-brand-blue font-normal">
              familias felices
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            La confianza y satisfacción de las familias que nos eligen es
            nuestro mayor orgullo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-[32px] shadow-xl shadow-zinc-200/50 border border-zinc-50 flex flex-col relative group hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(item.stars)].map((_, i) => (
                  <span key={i} className="text-brand-gold text-lg">
                    ★
                  </span>
                ))}
              </div>

              <p className="text-zinc-500 italic mb-8 grow leading-relaxed">
                &quot;{item.text}&quot;
              </p>

              <div className="flex items-center gap-4 border-t border-zinc-50 pt-6">
                <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center text-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                  👤
                </div>
                <div>
                  <h4 className="font-bold text-brand-text text-sm md:text-base">
                    {item.author}
                  </h4>
                  <p className="text-zinc-400 text-xs md:text-sm">
                    {item.child}
                  </p>
                </div>
              </div>

              {/* Decorative Quote Icon */}
              <div className="absolute top-8 right-8 text-6xl text-brand-blue/5 pointer-events-none">
                &quot;
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Banner */}
        <div className="bg-brand-blue rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden group">
          {/* Decorative shapes */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mt-32 group-hover:bg-white/20 transition-all duration-1000" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl -mr-48 -mb-48" />

          <div className="relative z-10">
            <div className="text-5xl mb-8 animate-bounce-slow">🥰</div>
            <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
              ¿Quieres formar parte de nuestra{" "}
              <span className="font-script italic text-white/90 font-normal">
                familia?
              </span>
            </h3>
            <p className="text-white/80 max-w-2xl mx-auto text-lg mb-10">
              Te invitamos a conocer nuestras instalaciones y nuestro proyecto
              educativo. <br />
              ¡Te esperamos con los brazos abiertos!
            </p>
            <button className="px-10 py-4 bg-white text-brand-blue hover:bg-zinc-50 rounded-full font-bold shadow-xl shadow-black/10 transition-all transform hover:-translate-y-1 hover:scale-105 active:scale-95">
              Agenda tu Visita
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
