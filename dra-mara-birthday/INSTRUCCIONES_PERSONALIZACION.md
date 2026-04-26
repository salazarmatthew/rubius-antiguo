# 🎉 Instrucciones de Personalización - Tributo Dra. Mara

## Inicio Rápido

### 1. Ejecutar el proyecto localmente
```bash
cd dra-mara-birthday
npm install  # Si aún no lo has hecho
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🎨 Personalización del Contenido

### 1. **Cambiar Textos del Hero (Sección Superior)**

En `app/page.tsx`, busca la sección `{/* Contenido del hero */}` y modifica:

```tsx
<span className="text-amber-700 text-sm tracking-widest font-medium">
  HONRAMOS TU DÍA ESPECIAL  // ← Cambia este texto
</span>

<motion.h1>
  Feliz Cumpleaños
  <br />
  <span className="text-amber-700">Dra. Mara</span>  // ← Cambia "Dra. Mara"
</motion.h1>

<motion.p>
  Un día para celebrar tu dedicación...  // ← Cambia este párrafo
</motion.p>
```

### 2. **Reemplazar Tarjetas del Viaje (Las 5 Secciones Principales)**

En `app/page.tsx`, busca la constante `journeyItems` al inicio del archivo:

```tsx
const journeyItems = [
  {
    id: 1,
    title: "Dedicación",  // ← Título de la tarjeta
    description:
      "Tu compromiso inquebrantable...",  // ← Descripción/frase inspiradora
    image: "https://via.placeholder.com/500x400?text=Dedicación",  // ← URL de la imagen
    align: "left" as const,  // "left" o "right" para alternar posición
  },
  // ... más tarjetas
];
```

**Pasos:**
1. Reemplaza cada `title` con el tema de esa sección
2. Reemplaza cada `description` con una frase inspiradora sobre la Dra. Mara
3. **Importante:** Pon tus fotos en la carpeta `public/images/` dentro de tu proyecto.
   
   - Nómbralas para que sean fáciles de identificar, por ejemplo: `viaje-1.jpg`, `viaje-2.jpg`, etc.
   - En el código, simplemente pon la ruta local comenzando con `/images/...`

   - **Ejemplo correcto:**
     ```
     image: "/images/viaje-1.jpg"
     ```

4. Alterna `align: "left"` y `align: "right"` para que las tarjetas se vean alternadas

**Ejemplo completamente personalizado:**

```tsx
{
  id: 1,
  title: "Su Vocación",
  description: "Dra. Mara, tu dedicación a la medicina no es solo profesionalismo...",
  image: "/images/mi-foto-vocacion.jpg",  // ← Ruta a tu imagen local
  align: "left" as const,
},
```

### 3. **Cambiar Mensaje del Footer (Sección Final)**

Busca la sección `{/* ===== CLOSING SECTION ===== */}` y personaliza:

```tsx
<h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8 leading-relaxed">
  Gracias por ser la doctora,{" "}
  <span className="text-amber-700">la mentora, la amiga</span> que
  cada día transforma vidas  // ← Personaliza este mensaje
</h2>

<p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed mb-12">
  Tu presencia en nuestras vidas es un regalo invaluable...  // ← Y este
</p>

<p className="text-2xl md:text-3xl font-serif text-amber-800 font-medium">
  Te queremos mucho  // ← Y este
</p>
```

### 4. **Añadir Imágenes al Collage**
Abre el archivo `components/MemoryCollage.tsx`. Al principio verás el arreglo `photos`.

**Pasos para usar fotos locales:**
1. Guarda tus fotos en la carpeta `public/images/`
2. Reemplaza el campo `url` por la ruta a tu foto (ejemplo: `"/images/collage-1.jpg"`)

---

## 🎨 Personalización Visual (Colores)

Si quieres cambiar la paleta de colores:

### Colores Actuales:
- **Fondo:** `[#faf8f3]` (Crema cálido)
- **Dorado:** `amber-700`, `amber-300` (Tonos cálidos elegantes)
- **Lavanda:** `purple-300`, `purple-100` (Tonos suaves)
- **Texto oscuro:** `gray-900` (Gris oscuro profundo)
- **Gris:** `gray-700`, `gray-600` (Para textos secundarios)

### Para cambiar colores:

**Opción 1 - Cambiar entre tonos existentes:**
Busca y reemplaza (Ctrl+H en VS Code):
- `amber-700` → `blue-900` (para azul marino)
- `amber-300` → `indigo-200` (para otra variante)
- `purple-300` → `rose-300` (para tonos rosados)

**Opción 2 - Usar colores personalizados en Tailwind:**

Edita `app/globals.css` y agrega:
```css
@layer components {
  :root {
    --color-primary: #1a1a2e; /* Tu color principal */
    --color-accent: #d4af37;  /* Tu color acentuado */
    --color-bg: #faf8f3;      /* Tu fondo */
  }
}
```

Luego en el código: `className="text-[var(--color-primary)]"`

---

## 📸 Añadir Más Tarjetas

Si quieres agregar más de 5 tarjetas:

1. En `journeyItems`, añade un nuevo objeto:

```tsx
const journeyItems = [
  // ... tarjetas existentes ...
  {
    id: 6,
    title: "Nuevo Tema",
    description: "Tu frase inspiradora aquí...",
    image: "https://tu-foto-aqui.jpg",
    align: "left" as const,
  },
];
```

2. El componente `JourneyCard` automáticamente renderizará todas las tarjetas que agregues.

---

## 🚀 Desplegar en Vercel

1. **Sube tu proyecto a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Tributo Dra. Mara"
   git push origin main
   ```

2. **Conecta con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Haz clic en "New Project"
   - Importa tu repositorio de GitHub
   - Haz clic en "Deploy"

3. **Tu sitio estará en vivo en minutos!**

---

## 📝 Resumen de Cambios Rápidos

Edita estos archivos para personalizar:

| Archivo | Qué cambiar |
|---------|-----------|
| `app/page.tsx` | Todos los textos, fotos, y frases |
| `app/layout.tsx` | Título de página (metadata) |
| `app/globals.css` | Colores avanzados (opcional) |

---

## ✨ Tips Profesionales

1. **Para las fotos:** Usa imágenes de buena calidad (mínimo 500x400px) en formatos JPG o PNG
2. **Las frases:** Hazlas personales y emotivas. Pueden ser de 1-3 oraciones
3. **Longitud:** Mantén entre 3-7 tarjetas para mejor impacto visual
4. **Testing:** Abre en móvil y desktop para ver cómo se ve en diferentes pantallas
5. **Animaciones:** Ya están incluidas y se activan automáticamente al hacer scroll

---

## 🐛 Troubleshooting

**"La página se ve rara"**
- Borra la carpeta `.next`: `rm -rf .next`
- Reinicia el servidor: `npm run dev`

**"Las fotos no se ven"**
- Verifica que la URL de imagen sea accesible (copia en el navegador)
- Asegúrate de que no tenga restricciones CORS

**"Error de compilación"**
- Abre la consola del terminal
- Busca el error específico
- Verifica que no tengas errores de sintaxis en comillas o caracteres especiales

---

¡Que disfrutes creando este homenaje especial! 🎉💜
