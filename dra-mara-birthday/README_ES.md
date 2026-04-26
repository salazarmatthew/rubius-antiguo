# 🌹 Tributo de Cumpleaños - Dra. Mara

Una página web elegante, minimalista y emotiva para celebrar a una doctora extraordinaria. Diseñada con **Next.js**, **Tailwind CSS** y **Framer Motion**.

## ✨ Características

✅ **Diseño Elegante & Minimalista** - Paleta de colores suave (crema, dorado, lavanda)  
✅ **Totalmente Responsivo** - Se ve perfecta en móvil, tablet y desktop  
✅ **Animaciones Suaves** - Scroll-triggered animations con Framer Motion  
✅ **Tipografía Profesional** - Serif elegante (Playfair Display) para títulos  
✅ **Listo para Vercel** - Deploy en un clic  
✅ **Fácil de Personalizar** - Reemplaza textos y fotos sin tocar código complejo

## 🚀 Inicio Rápido

```bash
# Instala dependencias
npm install

# Ejecuta localmente
npm run dev

# Abre http://localhost:3000
```

## 📝 Personalización

1. **Abre** `app/page.tsx`
2. **Busca** la constante `journeyItems` (línea ~11)
3. **Reemplaza:**
   - Títulos: `title: "Tu Titulo Aqui"`
   - Descripciones: `description: "Tu frase inspiradora"`
   - Fotos: `image: "https://tu-foto.jpg"` 
   - Alineación: `align: "left"` o `"right"`

4. **Personaliza otros textos:**
   - Hero section (sección superior)
   - Footer (sección final)
   - Todos los mensajes

👉 **Lee** `INSTRUCCIONES_PERSONALIZACION.md` para guía detallada con ejemplos

## 🎨 Estructura

```
├── app/
│   ├── layout.tsx          # Layout principal con tipografías
│   ├── globals.css         # Estilos globales
│   └── page.tsx            # Todo el contenido (página principal)
├── public/                 # Carpeta para imágenes estáticas
├── package.json            # Dependencias
└── INSTRUCCIONES_PERSONALIZACION.md  # Guía completa
```

## 🌐 Desplegar en Vercel

```bash
# 1. Sube a GitHub
git init && git add . && git commit -m "Tributo Dra. Mara"
git push origin main

# 2. Ve a vercel.com y conecta tu repo
# 3. ¡Listo! Tu sitio estará en vivo
```

## 📸 Cómo Añadir Fotos

Opciones gratuitas para alojar tus fotos:

1. **Imgur** - Carga directa, muy fácil
2. **Cloudinary** - Servicio profesional gratuito
3. **Google Drive** - Compartir en público y obtener enlace
4. **Servidor propio** - Pon archivos en la carpeta `public/`

## 🎯 Qué Incluye Este Proyecto

✨ **Hero Section** - Fade-in animation elegante  
📍 **5 Tarjetas del Viaje** - Con scroll-triggered animations  
🖼️ **Imágenes Responsivas** - Placeholders listos para reemplazar  
💬 **Frases Inspiradoras** - Sobre dedicación, empatía, inspiración, etc.  
🎁 **Footer Emotivo** - Mensaje de agradecimiento  
🎨 **Paleta Profesional** - Crema, dorado, lavanda y grises elegantes  

## 💡 Tips

- Las animaciones se activan automáticamente al hacer scroll
- Usa imágenes de buena calidad (mínimo 500x400px)
- Las frases pueden ser personales y emotivas
- Todo está optimizado para Vercel

## 📚 Stack Tecnológico

- **Framework:** Next.js 16 (App Router)
- **Estilos:** Tailwind CSS 4
- **Animaciones:** Framer Motion
- **Tipografía:** Google Fonts (Playfair Display + Lato)
- **Hosting:** Vercel (recomendado)

---

**Hecho con ❤️ para celebrar a alguien extraordinario**
