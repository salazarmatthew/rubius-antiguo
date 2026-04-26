"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  {
    id: 1,
    title: "Tazas de café sobrevivientes",
    value: 1542,
    suffix: "+",
    desc: "El combustible oficial de las guardias de 24 horas",
    icon: "☕",
  },
  {
    id: 2,
    title: "Lágrimas en sonrisas",
    value: 9999,
    suffix: "∞",
    desc: "Contenido incalculable de empatía curativa",
    icon: "😊",
  },
  {
    id: 3,
    title: "Horas sin dormir estudiando",
    value: 8460,
    suffix: "h",
    desc: "¡Pero valieron absolutamente la pena!",
    icon: "🦉",
  },
  {
    id: 4,
    title: "Personas que te admiran",
    value: 100,
    suffix: "%",
    desc: "Literalmente todas las que te conocen",
    icon: "🌟",
  },
];

export default function ClinicalHistory() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="py-20 md:py-32 px-4 bg-slate-900 text-white relative overflow-hidden" ref={ref}>
      {/* Background medical grid pattern */}
      <div className="absolute inset-0 opacity-10" 
        style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      ></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-amber-200">
            Historial Clínico (Extraoficial)
          </h2>
          <p className="text-xl text-slate-300 font-light max-w-2xl mx-auto">
            Datos médicos vitales que demuestran científicamente por qué eres increíble.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-amber-400 transition-colors duration-300 flex flex-col items-center text-center group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-bold font-serif text-white mb-2 flex items-baseline justify-center">
                {inView ? (
                  stat.suffix === "∞" ? (
                    <span>∞</span>
                  ) : (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={3}
                      separator=","
                    />
                  )
                ) : (
                  "0"
                )}
                {stat.suffix !== "∞" && (
                  <span className="text-2xl text-amber-400 ml-1">{stat.suffix}</span>
                )}
              </div>
              <h3 className="text-lg font-medium text-slate-200 mb-2">
                {stat.title}
              </h3>
              <p className="text-sm text-slate-400">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
