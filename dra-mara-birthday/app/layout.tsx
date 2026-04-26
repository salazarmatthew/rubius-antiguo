import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import FloatingAudioButton from "@/components/FloatingAudioButton";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Feliz Cumpleaños",
  description: "Un tributo elegante y emotivo para una doctora excepcional en su día especial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfairDisplay.variable} ${lato.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#faf8f3]">
        {children}
        <FloatingAudioButton />
      </body>
    </html>
  );
}
