import type { Metadata } from "next";
import { Nunito, Caveat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import PostHogProvider from "@/components/PostHogProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
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
  title: {
    template: "%s | Osito Mimoso - Escuela de Infantes en CABA",
    default:
      "Osito Mimoso | Escuela de Infantes en Abasto y Almagro - CABA | Maternal y Preescolar",
  },
  description:
    "Escuela de Infantes y Maternal Osito Mimoso en Abasto, CABA. Educación bilingüe, pedagogía Montessori, espacios de juego y contención para niños de 45 días a 5 años. ¡Vení a conocernos!",
  keywords: [
    "jardín de infantes CABA",
    "jardín maternal Abasto",
    "escuela infantil Almagro",
    "guardería en Abasto",
    "educación temprana Buenos Aires",
    "jardín bilingüe CABA",
    "metodología Montessori",
    "preescolar Abasto",
    "estimulación temprana",
    "cuidado infantil CABA",
    "Osito Mimoso",
    "sala de 3 4 y 5 años",
    "jardín maternal zona abasto",
  ],
  authors: [{ name: "Osito Mimoso" }],
  creator: "Osito Mimoso",
  publisher: "Osito Mimoso",
  metadataBase: new URL("https://ositomimoso.com.ar"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Osito Mimoso - Escuela de Infantes en CABA",
    description:
      "Educación con amor y excelencia en Abasto. Bilingüe, Montessori y espacios creativos para tu hijo.",
    url: "https://ositomimoso.com.ar",
    siteName: "Osito Mimoso",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Osito Mimoso - Jardín de Infantes en CABA",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Osito Mimoso - Escuela de Infantes en CABA",
    description:
      "Escuela de Infantes y Maternal Osito Mimoso en Abasto. Educación bilingüe y Montessori.",
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
    // google: "google-site-verification-code-here", // Add verification code when available
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
        <GoogleAnalytics gaId="G-6K6716RQFZ" />
        <PostHogProvider
          apiKey={process.env.POSTHOG_KEY || ""}
          apiHost="/ingest"
        >
          {children}
        </PostHogProvider>
        <Analytics />
      </body>
    </html>
  );
}
