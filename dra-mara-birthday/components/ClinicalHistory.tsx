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
    <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-[#faf8f3] to-[#f5f1e8] relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-gray-900">
            Historial Clínico (Extraoficial)
          </h2>
          <div className="flex justify-center mb-6">
            <div className="h-1 w-24 bg-gradient-to-r from-amber-300 to-purple-300 rounded-full" />
          </div>
          <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Datos verificados que demuestran científicamente por qué eres extraordinaria
          </p>
        </motion.div>

        {/* DESKTOP VERSION */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white p-8 rounded-2xl border-2 border-amber-200 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
                    {stat.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed font-light mb-6">
                    {stat.desc}
                  </p>
                </div>

                <div>
                  <div className="text-4xl md:text-5xl font-serif font-bold text-amber-800 mb-1">
                    {inView ? (
                      stat.suffix === "∞" ? (
                        <span>∞</span>
                      ) : (
                        <CountUp
                          start={0}
                          end={stat.value}
                          duration={2.5}
                          separator=","
                        />
                      )
                    ) : (
                      "0"
                    )}
                    <span className="text-2xl text-purple-600 ml-1">{stat.suffix}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MOBILE VERSION - Carrusel Suave */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex-shrink-0 w-72 snap-center"
              >
                <motion.div
                  whileHover={{ translateY: -4 }}
                  className="bg-white p-6 rounded-2xl border-2 border-amber-200 shadow-sm"
                >
                  <div className="text-5xl mb-4">{stat.icon}</div>
                  
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
                    {stat.title}
                  </h3>

                  <p className="text-sm text-gray-700 leading-relaxed font-light mb-6">
                    {stat.desc}
                  </p>

                  <div className="text-4xl font-serif font-bold text-amber-800 mb-1">
                    {inView ? (
                      stat.suffix === "∞" ? (
                        <span>∞</span>
                      ) : (
                        <CountUp
                          start={0}
                          end={stat.value}
                          duration={2}
                          separator=","
                        />
                      )
                    ) : (
                      "0"
                    )}
                    <span className="text-lg text-purple-600 ml-1">{stat.suffix}</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {stats.map((_, index) => (
              <motion.div
                key={index}
                className="h-2 w-2 rounded-full bg-amber-300"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}