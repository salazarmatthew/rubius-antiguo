"use client";

import { motion } from "framer-motion";

// Fotos de ejemplo
const photos = [
  {
    id: 1,
    url: "/images/IMG_0121.png",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-2",
    scale: 1, // Cambia para acercar o alejar el zoom de la foto (ej: 0.8, 1.2)
    position: "center", // "top", "bottom", "left", "right" o porcentajes "50% 20%"
  },
  {
    id: 2,
    url: "/images/IMG_0122.png",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
    scale: 1,
    position: "center 60%",
  },
  {
    id: 3,
    url: "/images/IMG_0126.png",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    scale: 1,
    position: "center 10%",
  },
  {
    id: 4,
    url: "/images/IMG_0129.png",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    scale: 1,
    position: "center",
  },
  {
    id: 5,
    url: "/images/IMG_0125.png",
    colSpan: "md:col-span-3",
    rowSpan: "md:row-span-1",
    scale: 1,
    position: "center",
    objectFit: "cover", // Agregado: Usa "contain" para ver la foto entera sin recortes, o "cover" para rellenar
  },
];

export default function MemoryCollage() {
  return (
    <section className="py-24 px-4 bg-[#faf8f3]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-amber-900 mb-4 tracking-wide">
            Recuerdos Insuperables
          </h2>
          <div className="mx-auto h-1 w-24 bg-gradient-to-r from-amber-300 to-purple-300 rounded-full mb-6" />
          <p className="text-xl md:text-2xl font-serif italic text-amber-800/80 font-light leading-relaxed">
            Pequeños fragmentos visuales de una vida hermosa...
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[300px]">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 bg-[#faf8f3] flex items-center justify-center ${photo.colSpan} ${photo.rowSpan}`}
            >
              <div 
                className="w-full h-full transition-transform duration-700"
                style={{ transform: `scale(${("scale" in photo) ? photo.scale : 1})` }}
              >
                <img
                  src={photo.url}
                  alt="Recuerdo memorable"
                  className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                  style={{ 
                    objectFit: ("objectFit" in photo) ? (photo.objectFit as any) : "cover",
                    objectPosition: ("position" in photo) ? (photo.position as string) : "center" 
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
