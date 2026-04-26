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

      {/* Carta Especial */}
      <section className="relative py-20 md:py-32 px-4 overflow-hidden bg-gradient-to-b from-[#faf8f3] via-[#f5f1e8] to-[#faf8f3]">
        {/* Animated background elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-72 md:w-96 h-72 md:h-96 bg-amber-100 rounded-full opacity-15 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-72 md:w-96 h-72 md:h-96 bg-purple-100 rounded-full opacity-15 blur-3xl pointer-events-none"
        />

        <div className="max-w-2xl mx-auto relative z-10">
          {/* Decorative header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8 md:mb-12"
          >
            <div className="flex items-center gap-3 md:gap-4">
              <motion.div
                animate={{ width: [0, 24, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="h-1 bg-gradient-to-r from-amber-300 to-amber-400 rounded-full"
              />
              <span className="text-amber-700 text-xs tracking-[0.2em] md:tracking-[0.3em] font-semibold uppercase whitespace-nowrap">Una carta especial</span>
              <motion.div
                animate={{ width: [0, 24, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="h-1 bg-gradient-to-r from-amber-400 to-amber-300 rounded-full"
              />
            </div>
          </motion.div>

          {/* Main title */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-2xl md:text-5xl font-serif font-bold text-gray-900 mb-3 md:mb-4 leading-tight"
            >
              Gracias por ser tú,
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-3 mb-4"
            >
              <span className="text-2xl md:text-4xl font-serif text-amber-700 italic">preciosa,</span>
              <span className="text-2xl md:text-4xl font-serif text-purple-700">extraordinaria</span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-xl md:text-3xl font-serif text-gray-900"
            >
              mujer.
            </motion.p>
          </motion.div>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
            className="h-1 w-16 mx-auto bg-gradient-to-r from-amber-300 via-purple-300 to-amber-300 rounded-full mb-10 md:mb-16 origin-center"
          />

          {/* Letter content */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8 text-center mb-12 md:mb-16 px-2"
          >
            {/* Opening quote */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
              className="inline-block w-full"
            >
              <p className="text-5xl md:text-6xl text-amber-200 opacity-50 font-serif leading-none">
                "
              </p>
            </motion.div>

            {/* Paragraph 1 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              viewport={{ once: true }}
              className="text-base md:text-lg text-gray-700 font-light leading-relaxed"
            >
              A veces me pregunto si eres consciente del{" "}
              <span className="text-gray-900 font-semibold bg-gradient-to-r from-amber-100 to-purple-100 bg-clip-text">
                espacio que llenas con solo existir
              </span>
              .
            </motion.p>

            {/* Paragraph 2 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              viewport={{ once: true }}
              className="text-base md:text-lg text-gray-700 font-light leading-relaxed"
            >
              No es solo la forma en que iluminas una habitación, sino la manera en que{" "}
              <span className="text-amber-800 font-semibold italic">
                reconstruyes mi mundo
              </span>{" "}
              cada vez que sonríes.
            </motion.p>

            {/* Paragraph 3 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              viewport={{ once: true }}
              className="text-base md:text-lg text-gray-700 font-light leading-relaxed"
            >
              Eres la mezcla perfecta de fuerza y ternura; una mujer que no solo camina, sino que{" "}
              <span className="text-gray-900 font-semibold underline decoration-purple-300 underline-offset-4">
                deja huella
              </span>{" "}
              en cada vida que toca, especialmente en la mía.
            </motion.p>

            {/* Closing paragraph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.7 }}
              viewport={{ once: true }}
              className="pt-4 md:pt-6"
            >
              <p className="text-lg md:text-2xl font-serif text-gray-900 leading-relaxed">
                Gracias por permitirme ser el{" "}
                <span className="text-purple-700 font-semibold">espectador de tu magia.</span>
              </p>
            </motion.div>

            {/* Closing quote */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.9 }}
              viewport={{ once: true }}
              className="inline-block w-full"
            >
              <p className="text-5xl md:text-6xl text-amber-200 opacity-50 font-serif leading-none">
                "
              </p>
            </motion.div>
          </motion.div>

          {/* Signature section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4 md:gap-6"
          >
            {/* Decorative line */}
            <div className="relative w-20 md:w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

            {/* Signature */}
            <div className="text-center">
              <p className="text-xs md:text-sm tracking-[0.15em] md:tracking-[0.2em] text-amber-700 font-semibold uppercase">
                Con amor infinito
              </p>
              <p className="text-base md:text-lg font-serif text-gray-900 font-bold mt-2">
                Edwin
              </p>
            </div>

            {/* Animated dot accent */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-2 h-2 bg-gradient-to-r from-amber-400 to-purple-400 rounded-full"
            />
          </motion.div>
        </div>
      </section>
  {/* Título: Ajustamos el lead-tight y el tamaño para que no ocupe toda la pantalla */}
  <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-12 leading-[1.3]">
    Gracias por ser tú, <br />
    <span className="text-amber-700 italic">preciosa, brillante</span> <br className="block md:hidden" />
    <span className="text-gray-900"> y </span>
    <span className="text-purple-700 text-4xl md:text-5xl block mt-2 md:inline">extraordinaria</span> 
    <span className="block mt-1">mujer.</span>
  </h2>

  {/* Cuerpo del mensaje: Usamos un ancho máximo para que las líneas no sean infinitas */}
  <div className="max-w-sm mx-auto space-y-8 text-lg md:text-xl text-gray-600 font-light leading-relaxed">
    
    <p className="relative">
      <span className="block mb-2 text-gray-400 text-2xl">“</span>
      A veces me pregunto si eres consciente del <span className="text-gray-900 font-normal">espacio que llenas con solo existir</span>. 
    </p>

    <p>
      No es solo la forma en que iluminas una habitación, sino la manera en que 
      <span className="text-amber-800 font-normal italic"> reconstruyes mi mundo </span> 
      cada vez que sonríes.
    </p>

    <p>
      Eres la mezcla perfecta de fuerza y ternura; una mujer que no solo camina, 
      sino que <span className="text-gray-900 font-normal underline decoration-amber-200 underline-offset-4">deja huella</span> en cada vida que toca, especialmente en la mía.
    </p>

    {/* Cierre: Aumentamos el peso visual para el final */}
    <p className="pt-6 text-2xl font-serif text-gray-900 leading-snug">
      Gracias por permitirme ser el <br />
      <span className="text-purple-800">espectador de tu magia.</span>
      <span className="block mt-2 text-gray-400 text-2xl">”</span>
    </p>
  </div>

  {/* Divisor minimalista para móvil */}
  <div className="mt-16 flex flex-col items-center">
    <div className="h-12 w-px bg-gradient-to-b from-transparent to-gray-300"></div>
    <p className="mt-4 text-xs tracking-[0.2em] text-gray-400 uppercase">Con amor, Edwin</p>
  </div>
</section>

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
