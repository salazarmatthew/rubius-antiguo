"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartPulse, Smile, ScrollText, Cross, Dices } from "lucide-react";

const quotes = [
  "«Recuerda que no solo curas cuerpos, ofreces esperanza y confortas almas. Eres valiosa.»",
  "«Elegiste la medicina no por ser fácil, sino porque tu corazón es lo suficientemente grande para soportarlo.»",
  "«Cada vida que tocas se mejora para siempre. Gracias por tu esfuerzo.»",
  "«Tus manos sanan, tus palabras tranquilizan y tu empatía marca la diferencia.»",
  "«En los días más oscuros, recuerda que tu luz interior es lo que guía a otros hacia la esperanza.»",
  "«Tu fortaleza no solo se mide en lo que soportas, sino en la compasión que sigues mostrando.»",
  "«No estás sola en esto. Todos los que te amamos estamos aquí para apoyarte, hoy y siempre.»",
  "«Tu valentía no se mide en lo que haces, sino en lo que superas.»",
  "Eres un poema escrito con la calidez de tu sonrisa.",
  "Tu autenticidad es tu superpoder; nunca dejes de ser tan tú.",
  "Hay personas que son hogar, y tú eres el refugio favorito de todos nosotros.",
  "Tienes una forma de mirar el mundo que hace que todo parezca más bonito.",
  "Tu risa es el sonido que mejor combina con la felicidad.",
  "No eres solo lo que haces, eres la magia que dejas en quienes te conocen.",
  "Eres esa combinación perfecta de caos adorable y paz absoluta.",
  "Tu presencia es como un rayo de sol en un día de lluvia: necesaria y reconfortante.",
  "Haces que lo complicado se sienta ligero con solo estar presente.",
  "Eres el ingrediente secreto que hace que nuestras vidas sean mejores.",
  "Eres una mujer que no solo brilla, sino que ayuda a otros a encontrar su propia luz.",
  "Tu valentía no grita; a veces es esa voz bajita que dice: 'mañana lo intentaré de nuevo'.",
  "Admiro tu capacidad de levantarte, sacudirte el polvo y seguir caminando con elegancia.",
  "Eres dueña de tus pasos y arquitecta de tu propio destino.",
  "Tu fuerza es silenciosa pero imparable, como la marea.",
  "No necesitas alas para volar, tu determinación ya te lleva a lo más alto.",
  "Eres una mujer de las que dejan huella, no solo cicatrices.",
  "Que nunca te falte amor propio, porque eres la persona más importante de tu vida.",
  "Tu vulnerabilidad no es debilidad, es la prueba de tu increíble coraje.",
  "Eres un recordatorio andante de que se puede ser poderosa y dulce al mismo tiempo.",
  "Incluso las estrellas necesitan la oscuridad para poder brillar. Todo pasará.",
  "Date permiso para estar cansada; descansar es parte del viaje, no una derrota.",
  "Eres valiosa simplemente por ser tú, no por lo mucho que logres hoy.",
  "Tu valor no depende de tu productividad; tu alma merece descanso.",
  "Recuerda que eres humana antes que cualquier otra etiqueta.",
  "Está bien soltar el control y dejar que la vida te sorprenda un poco.",
  "Eres más fuerte de lo que crees y más amada de lo que imaginas.",
  "No tienes que poder con todo tú sola; estamos aquí para sostenerte la mano.",
  "Tus miedos solo son sombras; tu luz es la que es real.",
  "Mañana será un nuevo lienzo y tú tienes los mejores colores.",
  "Si supieras lo mucho que celebramos tu existencia, nunca volverías a dudar de ti.",
  "Gracias por elegirnos para ser parte de tu historia.",
  "Eres nuestra persona favorita en el mundo, hoy y todos los días.",
  "Tenerte cerca es el regalo más grande que la vida nos ha dado.",
  "Tu felicidad es nuestro proyecto favorito.",
  "Eres el 'te quiero' que siempre da gusto decir.",
  "No importa dónde vayas, siempre tendrás un lugar seguro en nuestros brazos.",
  "Tu sola existencia hace que el mundo sea un lugar menos hostil.",
  "Gracias por ser Mara, simplemente por eso.",
  "Eres el orgullo de la familia y el alma de nuestras vidas.",
  "Eres suficiente. Más que suficiente.",
  "Tu belleza empieza en el momento en que decides ser tú misma.",
  "Eres un diamante en un mundo de cristales.",
  "Tu potencial no tiene techo.",
  "Lo que te hace diferente es lo que te hace increíble.",
  "Confía en tu instinto; rara vez se equivoca.",
  "Eres una obra de arte en constante evolución.",
  "Mírate al espejo y sonríe, esa mujer es una guerrera.",
  "Mereces todo lo bueno que te está pasando.",
  "El mundo es mejor porque tú naciste un día como hoy."
];

const memes = [
  "https://media.giphy.com/media/l41YkxvU8c7J7Bba0/giphy.gif", // Cat typing typing
  "https://cdn2.thecatapi.com/images/13m.gif",
  "https://cdn2.thecatapi.com/images/3oh.gif",
  "https://cdn2.thecatapi.com/images/45b.gif",
  "https://cdn2.thecatapi.com/images/4g6.gif",
  "https://cdn2.thecatapi.com/images/chc.gif",
  "https://cdn2.thecatapi.com/images/dbf.gif",
  "https://cdn2.thecatapi.com/images/MTcxMjU0MQ.gif",
  "https://cdn2.thecatapi.com/images/MTc0MDQ0NQ.gif",
  "https://cdn2.thecatapi.com/images/MTkwMjIxNg.gif",
  "https://cdn2.thecatapi.com/images/MTkzMDA2Nw.gif",
  "https://cdn2.thecatapi.com/images/2v.gif",
  "https://cdn2.thecatapi.com/images/sv.gif",
  "https://cdn2.thecatapi.com/images/t6.gif",
  "https://cdn2.thecatapi.com/images/19c.gif",
  "https://cdn2.thecatapi.com/images/33t.gif",
  "https://cdn2.thecatapi.com/images/1te.gif",
  "https://cdn2.thecatapi.com/images/4bg.gif",
  "https://cdn2.thecatapi.com/images/4co.gif",
  "https://cdn2.thecatapi.com/images/4hb.gif",
  "https://cdn2.thecatapi.com/images/7pg.gif",
  "https://cdn2.thecatapi.com/images/7si.gif",
  "https://cdn2.thecatapi.com/images/cgf.gif",
  "https://cdn2.thecatapi.com/images/ctq.gif",
  "https://cdn2.thecatapi.com/images/cv0.gif",
  "https://cdn2.thecatapi.com/images/dt6.gif",
  "https://cdn2.thecatapi.com/images/2om.gif",
  "https://cdn2.thecatapi.com/images/3id.gif",
  "https://cdn2.thecatapi.com/images/4h1.gif",
  "https://cdn2.thecatapi.com/images/7rp.gif",
  "https://cdn2.thecatapi.com/images/ae4.gif"
];

const energies = [
  "https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.gif", // Minions cheering
  "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif", // Dance celebration
  "https://media.giphy.com/media/artj92V8o75VPL7AeQ/giphy.gif", // Let's go
];

export default function FirstAidKit() {
  const [activeTab, setActiveTab] = useState<"hard-day" | "laugh" | "energy" | null>(null);
  const [content, setContent] = useState<string>("");

  const handleTabClick = (tab: "hard-day" | "laugh" | "energy") => {
    setActiveTab(tab);
    if (tab === "hard-day") {
      setContent(quotes[Math.floor(Math.random() * quotes.length)]);
    } else if (tab === "laugh") {
      setContent(memes[Math.floor(Math.random() * memes.length)]);
    } else if (tab === "energy") {
      setContent(energies[Math.floor(Math.random() * energies.length)]);
    }
  };

  return (
    <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-[#faf8f3] to-[#f5f1e8] relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 bg-gradient-to-br from-amber-400 to-rose-400 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <span className="text-white text-3xl font-bold">+</span>
            </motion.div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Botiquín Emocional
          </h2>
          <div className="flex justify-center mb-6">
            <div className="h-1 w-24 bg-gradient-to-r from-amber-300 to-rose-300 rounded-full" />
          </div>
          <p className="text-base md:text-lg text-gray-700 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            Para esos días largos de guardia o cuando la vocación pesa. Un remedio rápido para el alma.
          </p>

          <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center mb-12">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTabClick("hard-day")}
              className={`flex items-center justify-center gap-2 px-4 md:px-8 py-3 md:py-5 rounded-xl md:rounded-2xl border-2 transition-all duration-300 font-semibold text-sm md:text-base cursor-pointer ${
                activeTab === "hard-day"
                  ? "bg-rose-600 text-white border-rose-700 shadow-lg"
                  : "bg-white text-rose-600 border-rose-300 hover:border-rose-400 hover:shadow-md"
              }`}
            >
              <HeartPulse size={20} /> Para un día difícil
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTabClick("laugh")}
              className={`flex items-center justify-center gap-2 px-4 md:px-8 py-3 md:py-5 rounded-xl md:rounded-2xl border-2 transition-all duration-300 font-semibold text-sm md:text-base cursor-pointer ${
                activeTab === "laugh"
                  ? "bg-amber-500 text-white border-amber-600 shadow-lg"
                  : "bg-white text-amber-600 border-amber-300 hover:border-amber-400 hover:shadow-md"
              }`}
            >
              <Smile size={20} /> Necesito reír
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTabClick("energy")}
              className={`flex items-center justify-center gap-2 px-4 md:px-8 py-3 md:py-5 rounded-xl md:rounded-2xl border-2 transition-all duration-300 font-semibold text-sm md:text-base cursor-pointer ${
                activeTab === "energy"
                  ? "bg-purple-600 text-white border-purple-700 shadow-lg"
                  : "bg-white text-purple-600 border-purple-300 hover:border-purple-400 hover:shadow-md"
              }`}
            >
              <ScrollText size={20} /> Tu Receta de Energía
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "energy" ? (
              <motion.div
                key="receta"
                initial={{ opacity: 0, scale: 0.9, y: 30, rotateX: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mx-auto max-w-2xl bg-[#fdfbf7] p-6 md:p-12 rounded-2xl shadow-lg border-l-[6px] md:border-l-[12px] border-purple-600 text-left relative overflow-hidden"
              >
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" 
                  style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #000 31px, #000 32px)', backgroundSize: '100% 32px' }} 
                />
                
                <div className="flex justify-between items-start border-b-2 border-purple-800/20 pb-4 md:pb-6 mb-6 md:mb-8 relative z-10">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-purple-800 tracking-tight">Clínica del Amor</h3>
                    <p className="text-gray-500 text-xs md:text-sm mt-1 uppercase tracking-widest font-semibold">Receta Médica Oficial</p>
                  </div>
                  <div className="text-purple-700 opacity-80">
                    <Cross size={32} />
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6 text-gray-800 relative z-10 text-sm md:text-base">
                  <div className="flex flex-col md:flex-row md:items-baseline border-b border-gray-200 pb-2">
                    <span className="font-bold text-purple-800 uppercase text-xs tracking-wider mb-1 md:mb-0 md:w-32">Paciente:</span>
                    <span className="font-serif text-xl md:text-2xl font-bold text-gray-900">Dra. Mara</span>
                  </div>
                  
                  <div className="flex flex-col md:flex-row border-b border-gray-200 pb-2">
                    <span className="font-bold text-purple-800 uppercase text-xs tracking-wider mb-1 md:mb-0 md:w-32">Diagnóstico:</span>
                    <p className="font-serif leading-relaxed text-gray-700">
                      Agotamiento extremo por exceso de dedicación, pasión y amor incondicional a los demás.
                    </p>
                  </div>

                  <div className="pt-4 md:pt-6">
                    <h4 className="text-3xl md:text-4xl font-serif text-purple-800 mb-4 md:mb-6 font-bold">Rx</h4>
                    
                    <div className="space-y-4 md:space-y-6 pl-3 md:pl-8 font-serif">
                      <div>
                        <span className="font-bold text-gray-900 uppercase text-xs md:text-sm tracking-wider mr-2 block md:inline">Dosis:</span>
                        <span className="text-base md:text-lg">1 abrazo fuerte y sostenido.</span>
                      </div>
                      
                      <div>
                        <span className="font-bold text-gray-900 uppercase text-xs md:text-sm tracking-wider mr-2 block md:inline">Frecuencia:</span>
                        <span className="text-base md:text-lg">Cada vez que necesites.</span>
                      </div>

                      <div className="bg-purple-50/50 p-3 md:p-4 rounded-lg border border-purple-100">
                        <span className="font-bold text-purple-800 uppercase text-xs tracking-wider block mb-2">Observaciones:</span>
                        <p className="text-sm md:text-base italic text-gray-700 leading-relaxed">
                          "Tu empatía no tiene límites, pero tú sí. Tómate un respiro, te queremos."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 md:pt-12 flex justify-end">
                    <div className="text-center">
                      <div className="border-b border-gray-400 pb-1 md:pb-2 mb-1 md:mb-2">
                        <span className="text-lg md:text-2xl text-gray-800 inline-block" style={{fontFamily: "cursive"}}>Todos los que te amamos</span>
                      </div>
                      <p className="uppercase tracking-widest text-xs font-bold text-purple-800">Firma Autorizada</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : activeTab && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={`bg-white p-6 md:p-12 rounded-2xl md:rounded-3xl shadow-lg max-w-2xl mx-auto min-h-[200px] md:min-h-[250px] flex items-center justify-center border-t-4 md:border-t-8 ${
                  activeTab === "hard-day" ? "border-rose-200" : activeTab === "laugh" ? "border-amber-200" : "border-purple-200"
                }`}
              >
                {activeTab === "hard-day" ? (
                  <p className="text-lg md:text-2xl font-serif text-gray-800 leading-relaxed text-center">
                    {content}
                  </p>
                ) : (
                  <img
                    src={content}
                    alt="Remedio visual"
                    className="max-h-52 md:max-h-64 rounded-lg shadow-md object-contain"
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
