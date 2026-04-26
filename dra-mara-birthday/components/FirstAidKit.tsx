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
    <section className="py-20 md:py-32 px-4 bg-red-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
              <span className="text-white text-3xl font-bold">+</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Botiquín Emocional
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Para esos días largos de guardia o cuando la vocación pesa. Un remedio rápido para el alma.<br />
            <span className="text-sm font-bold text-red-500 mt-3 inline-block animate-pulse">
              ✨ ¡Puedes presionar los botones varias veces para descubrir diferentes mensajes! ✨
            </span>
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => handleTabClick("hard-day")}
              className={`group flex items-center justify-center gap-2 px-8 py-5 rounded-2xl border-2 transition-all duration-300 font-bold text-lg cursor-pointer transform active:scale-95 shadow-[0_6px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_8px_0_0_rgba(0,0,0,0.1)] active:shadow-[0_0px_0_0_rgba(0,0,0,0.1)] active:translate-y-[6px] ${
                activeTab === "hard-day"
                  ? "bg-red-600 text-white border-red-700 shadow-[0_6px_0_0_#991b1b] hover:shadow-[0_8px_0_0_#991b1b] active:shadow-[0_0px_0_0_#991b1b]"
                  : "bg-white text-red-600 border-red-200"
              }`}
            >
              <HeartPulse size={24} /> Para un día difícil
              <Dices size={18} className={`ml-2 opacity-50 transition-transform duration-300 group-hover:rotate-180 ${activeTab === "hard-day" ? "text-white" : "text-red-400"}`} />
            </button>
            <button
              onClick={() => handleTabClick("laugh")}
              className={`group flex items-center justify-center gap-2 px-8 py-5 rounded-2xl border-2 transition-all duration-300 font-bold text-lg cursor-pointer transform active:scale-95 shadow-[0_6px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_8px_0_0_rgba(0,0,0,0.1)] active:shadow-[0_0px_0_0_rgba(0,0,0,0.1)] active:translate-y-[6px] ${
                activeTab === "laugh"
                  ? "bg-amber-500 text-white border-amber-600 shadow-[0_6px_0_0_#d97706] hover:shadow-[0_8px_0_0_#d97706] active:shadow-[0_0px_0_0_#d97706]"
                  : "bg-white text-amber-600 border-amber-200"
              }`}
            >
              <Smile size={24} /> Necesito reír
              <Dices size={18} className={`ml-2 opacity-50 transition-transform duration-300 group-hover:rotate-180 ${activeTab === "laugh" ? "text-white" : "text-amber-400"}`} />
            </button>
            <button
              onClick={() => handleTabClick("energy")}
              className={`flex items-center justify-center gap-2 px-8 py-5 rounded-2xl border-2 transition-all duration-300 font-bold text-lg cursor-pointer transform active:scale-95 shadow-[0_6px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_8px_0_0_rgba(0,0,0,0.1)] active:shadow-[0_0px_0_0_rgba(0,0,0,0.1)] active:translate-y-[6px] ${
                activeTab === "energy"
                  ? "hidden"
                  : "bg-white text-emerald-700 border-emerald-200"
              }`}
            >
              <ScrollText size={24} /> Tu Receta de Energía
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "energy" ? (
              <motion.div
                key="receta"
                initial={{ opacity: 0, scale: 0.9, y: 30, rotateX: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mx-auto max-w-2xl bg-[#fdfbf7] p-8 md:p-12 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-l-[12px] border-emerald-700 text-left relative overflow-hidden"
              >
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" 
                  style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #000 31px, #000 32px)', backgroundSize: '100% 32px' }} 
                />
                
                <div className="flex justify-between items-start border-b-2 border-emerald-800/20 pb-6 mb-8 relative z-10">
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-emerald-800 tracking-tight">Clínica del Amor</h3>
                    <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest font-semibold">Receta Médica Oficial</p>
                  </div>
                  <div className="text-emerald-700 opacity-80">
                    <Cross size={40} />
                  </div>
                </div>

                <div className="space-y-6 text-gray-800 relative z-10">
                  <div className="flex flex-col md:flex-row md:items-baseline border-b border-gray-200 pb-2">
                    <span className="font-bold text-emerald-800 uppercase text-xs tracking-wider w-32">Paciente:</span>
                    <span className="font-serif text-2xl font-bold text-gray-900 border-b-2 border-dotted border-gray-300 flex-1 px-2">Dra. Mara</span>
                  </div>
                  
                  <div className="flex flex-col md:flex-row border-b border-gray-200 pb-2">
                    <span className="font-bold text-emerald-800 uppercase text-xs tracking-wider w-32 pt-2">Diagnóstico:</span>
                    <p className="font-serif text-lg leading-relaxed pt-1 text-gray-700 border-b-2 border-dotted border-gray-300 flex-1 px-2">
                      Agotamiento extremo por exceso de dedicación, pasión y amor incondicional a los demás.
                    </p>
                  </div>

                  <div className="pt-4">
                    <h4 className="text-4xl font-serif text-emerald-800 mb-6 font-bold">Rx</h4>
                    
                    <div className="space-y-6 pl-4 md:pl-8 font-serif">
                      <div>
                        <span className="font-bold text-gray-900 uppercase text-sm tracking-wider mr-2 block md:inline">Dosis:</span>
                        <span className="text-xl">1 abrazo fuerte y sostenido (administrarse <span className="underline decoration-emerald-500 decoration-2 underline-offset-2">inmediatamente</span>).</span>
                      </div>
                      
                      <div>
                        <span className="font-bold text-gray-900 uppercase text-sm tracking-wider mr-2 block md:inline">Frecuencia:</span>
                        <span className="text-xl">Cada vez que el día se ponga difícil o sientas que no puedes más.</span>
                      </div>

                      <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                        <span className="font-bold text-emerald-800 uppercase text-sm tracking-wider block mb-1">Observaciones Vitales:</span>
                        <p className="text-lg italic text-gray-700 leading-relaxed">
                          "Este tratamiento no tiene fecha de caducidad. Tu empatía no tiene límites, pero tú sí. Tómate un respiro, te queremos y te admiramos por todo lo que haces."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-12 flex justify-end">
                    <div className="text-center w-64">
                      <div className="border-b border-gray-400 pb-2 mb-2">
                        <span className="font-[Signature] text-4xl text-gray-800 inline-block transform -rotate-3 opacity-90" style={{fontFamily: "cursive"}}>Todos los que te amamos</span>
                      </div>
                      <p className="uppercase tracking-widest text-xs font-bold text-emerald-800">Firma Autorizada</p>
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
                className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-2xl mx-auto min-h-[250px] flex items-center justify-center border-t-8 border-red-100"
              >
                {activeTab === "hard-day" ? (
                  <p className="text-2xl font-serif text-gray-800 italic leading-relaxed">
                    {content}
                  </p>
                ) : (
                  <img
                    src={content}
                    alt="Remedio visual"
                    className="max-h-64 rounded-lg shadow-md object-contain"
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
