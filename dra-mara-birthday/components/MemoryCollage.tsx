"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Maximize2 } from "lucide-react";

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
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 px-4 bg-[#faf8f3]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-4 tracking-wide">
            Recuerdos Insuperables
          </h2>
          <div className="flex justify-center mb-6">
            <div className="h-1 w-24 bg-gradient-to-r from-amber-300 to-purple-300 rounded-full" />
          </div>
          <p className="text-base md:text-xl font-serif italic text-gray-700 font-light leading-relaxed">
            Pequeños fragmentos visuales de una vida hermosa...
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 md:auto-rows-[280px]">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedPhoto(photo.id)}
              className={`relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 bg-[#faf8f3] flex items-center justify-center cursor-pointer ${
                photo.colSpan
              } ${
                photo.rowSpan
              }`}
              style={{
                minHeight: "200px",
              }}
            >
              <div
                className="w-full h-full transition-transform duration-700 group-hover:scale-110"
                style={{ transform: `scale(${"scale" in photo ? photo.scale : 1})` }}
              >
                <img
                  src={photo.url}
                  alt="Recuerdo memorable"
                  className="w-full h-full"
                  style={{
                    objectFit: "objectFit" in photo ? (photo.objectFit as any) : "cover",
                    objectPosition: "position" in photo ? (photo.position as string) : "center",
                  }}
                />
              </div>
              {/* Overlay siempre visible en móvil, hover en desktop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 opacity-40 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              {/* Icono de zoom */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg opacity-0 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <Maximize2 size={20} className="text-gray-800" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal para foto expandida */}
      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={photos.find((p) => p.id === selectedPhoto)?.url}
              alt="Vista expandida"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-lg shadow-lg transition-all"
              aria-label="Cerrar"
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
