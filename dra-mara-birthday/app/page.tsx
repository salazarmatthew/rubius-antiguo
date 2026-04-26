"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";
import FirstAidKit from "../components/FirstAidKit";
import ClinicalHistory from "../components/ClinicalHistory";
import MemoryCollage from "../components/MemoryCollage";

// Datos de prueba - Reemplaza con tus fotos y frases reales
const journeyItems = [
  {
    id: 1,
    title: "Dedicación",
    description:
      "Tu compromiso inquebrantable con la medicina refleja una pasión que va más allá del deber profesional. Cada paciente que atiendas recibe lo mejor de ti.",
    image: "/images/IMG_0130.png",
    align: "left" as const,
  },
  {
    id: 2,
    title: "Excepcional por Naturaleza",
    description:
      "No importa el reto, el paciente o el momento del día; en todas tus versiones entregas lo mejor de ti. Tu capacidad para adaptarte, resolver y brillar en cada rol que asumes es verdaderamente inspiradora.",
    image: "/images/IMG_0128.png",
    align: "right" as const,
  },
  {
    id: 3,
    title: "Inspiración",
    description:
      "Eres ejemplo vivo de que se puede ser excelente sin perder la humanidad. Tu presencia inspira a quienes te rodean a ser mejores personas.",
    image: "/images/IMG_0123.png",
    align: "left" as const,
  },
  {
    id: 4,
    title: "Fortaleza",
    description:
      "A través de los desafíos, mantuviste la serenidad y la determinación. Tu fuerza no solo salva vidas, también transforma corazones.",
    image: "/images/IMG_0127.png",
    align: "right" as const,
    scale: 0.85, // Cambia este número para acercar o alejar el zoom
    position: "center top", // Usa "top" (arriba), "bottom" (abajo), "center" (centro), o un porcentaje exacto como "50% 20%"
  },
  {
    id: 5,
    title: "Generosidad",
    description:
      "Tu generosidad de espíritu es tan vasta como tu conocimiento. Siempre tienes tiempo, palabra y corazón para quien te necesita.",
    image: "/images/IMG_0124.png",
    align: "left" as const,
    scale: 0.85,
    position: "center 5%", // 50% es el centro horizontal, 30% es la altura vertical (0% es hasta arriba, 100% es hasta abajo)
  },
];

// Componente para cada tarjeta del viaje
function JourneyCard({
  item,
  index,
}: {
  item: (typeof journeyItems)[0];
  index: number;
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      x: item.align === "left" ? -60 : 60,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="mb-20 md:mb-32"
    >
      <div
        className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
          item.align === "right" ? "md:flex-row-reverse" : ""
        }`}
      >
        <motion.div variants={imageVariants} className="flex-shrink-0">
          <div className="relative w-80 h-64 md:w-96 md:h-80 rounded-xl overflow-hidden shadow-lg bg-[#faf8f3]">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              style={{
                transform: `scale(${("scale" in item) ? item.scale : 1})`,
                objectPosition: ("position" in item) ? (item.position as string) : "center"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 via-transparent to-purple-100/20 pointer-events-none" />
          </div>
        </motion.div>

        <motion.div variants={textVariants} className="flex-1">
          <div className="max-w-md">
            <span className="inline-block text-6xl font-serif text-amber-200 opacity-40 mb-2">
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3 className="text-3xl md:text-4xl font-serif font-bold text-amber-900 mb-4">
              {item.title}
            </h3>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed font-light">
              {item.description}
            </p>

            <div className="mt-6 h-1 w-16 bg-gradient-to-r from-amber-300 to-purple-300 rounded-full" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Page() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#faf8f3] font-sans">
      <section className="h-screen bg-gradient-to-b from-[#faf8f3] to-[#f5f1e8] flex items-center justify-center relative overflow-hidden px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 right-10 w-72 h-72 bg-amber-100 rounded-full opacity-20 blur-3xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 left-10 w-96 h-96 bg-purple-100 rounded-full opacity-20 blur-3xl"
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="mb-8 flex justify-center"
          >
            <div className="inline-flex items-center gap-3">
              <div className="h-1 w-8 bg-gradient-to-r from-amber-300 to-amber-200 rounded-full" />
              <span className="text-amber-700 text-sm tracking-widest font-medium">
                HONRANDO TU TRAYECTORIA
              </span>
              <div className="h-1 w-8 bg-gradient-to-r from-amber-200 to-amber-300 rounded-full" />
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-serif font-bold text-gray-900 mb-6 leading-tight"
          >
            Una mujer brillante, una doctora excepcional <br />
            <br />
            <span className="text-amber-700">Dra. Mara</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-2xl text-gray-600 mb-12 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Creado para celebrar tu dedicacion, tu empatia y el impacto
            extraordinario que tienes en el mundo
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="cursor-pointer"
            >
              <svg
                className="w-8 h-8 text-amber-700 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 md:py-32 px-4 md:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            Tu Viaje Extraordinario
          </h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Cada paso de tu carrera ha sido marcado por valores que trascienden
            la medicina: dedicacion, empatia, inspiracion y un corazon unico.
          </p>
        </motion.div>

        <div className="space-y-32">
          {journeyItems.map((item, index) => (
            <JourneyCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </section>

      {/* Historial Clínico (Contadores Divertidos) */}
      <ClinicalHistory />

      {/* Botiquín de Primeros Auxilios Emocionales */}
      <FirstAidKit />

      {/* Galería de Recuerdos y Audios Ocultos */}
      <MemoryCollage />

      <section className="bg-gradient-to-b from-[#faf8f3] to-[#f5f1e8] py-24 px-4 relative overflow-hidden">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-50 rounded-full opacity-40 blur-3xl pointer-events-none"
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="mb-8 flex justify-center gap-3">
              <div className="h-1 w-12 bg-gradient-to-r from-purple-300 to-amber-300 rounded-full" />
              <div className="h-1 w-2 bg-amber-400 rounded-full" />
              <div className="h-1 w-12 bg-gradient-to-r from-amber-300 to-purple-300 rounded-full" />
            </div>

            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8 leading-relaxed">
              A veces me pregunto si eres consciente del{" "}
              <span className="text-amber-700">espacio que llenas con solo existir</span>. No es solo cómo iluminas una habitación, sino la manera en que{" "}
              <span className="text-purple-700">reconstruyes mi mundo</span> cada vez que sonríes.
            </h2>

            <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed mb-12">
              Tu presencia en nuestras vidas es un regalo invaluable. Con tu
              sabiduria, tu paciencia y tu corazon inmenso, has dejado una marca
              indeleble que perdurara para siempre.
            </p>

            <div className="space-y-4">
              <p className="text-2xl md:text-3xl font-serif text-amber-800 font-medium">
                Todos te aman porque eres un faro de luz.
              </p>
              <p className="text-gray-600 font-light text-lg">
                Con admiracion y carino infinito
              </p>
            </div>

            <div className="mt-12 flex justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-gradient-to-r from-amber-400 to-purple-400 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-[#2d3436] text-[#f5f1e8] py-12 px-4 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-sm md:text-base font-light"
        >
          Hecho para{" "}
          <span className="text-amber-300 font-medium">Una mujer extraordinaria</span> - Con
          amor y admiracion infinita
        </motion.p>
      </footer>
    </div>
  );
}
