import type { Metadata } from "next";
import { Nunito, Caveat } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title:
    "Osito Mimoso - Escuela Infantil en CABA | Educación y Cuidado para Niños",
  description:
    "Escuela infantil Osito Mimoso en Buenos Aires. Más de 15 años de experiencia en educación temprana, metodología Montessori, educación bilingüe y atención personalizada para niños de 0 a 6 años.",
  keywords: [
    "escuela infantil",
    "jardín de infantes",
    "guardería CABA",
    "educación temprana",
    "Montessori Buenos Aires",
    "educación bilingüe",
    "cuidado infantil",
    "preescolar Argentina",
    "estimulación temprana",
    "jardín maternal",
    "Osito Mimoso",
    "educación inicial",
    "niños 0 a 6 años",
  ],
  authors: [{ name: "Osito Mimoso" }],
  creator: "Osito Mimoso",
  publisher: "Osito Mimoso",
  metadataBase: new URL("https://ositomimoso.com.ar"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Osito Mimoso - Escuela Infantil en CABA",
    description:
      "Más de 30 años brindando educación de calidad y educación bilingüe. Un espacio donde los niños crecen felices, seguros y amados.",
    url: "https://ositomimoso.com.ar",
    siteName: "Osito Mimoso",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Osito Mimoso - Escuela Infantil",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Osito Mimoso - Escuela Infantil en CABA",
    description:
      "Educación temprana de calidad con metodología Montessori y educación bilingüe. Más de 15 años de experiencia.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code-here",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${nunito.variable} ${caveat.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
