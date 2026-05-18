import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "LexiStory — Apprends le français en lisant",
  description: "Une histoire courte par jour pour enrichir ton vocabulaire en français. Clique sur n'importe quel mot pour voir sa définition. Gratuit, sans pub.",
  keywords: ["vocabulaire français", "apprendre le français", "histoire du jour", "définition", "lexique", "enrichir vocabulaire"],
  openGraph: {
    title: "LexiStory — Apprends le français en lisant",
    description: "Une histoire courte par jour pour enrichir ton vocabulaire. Clique sur n'importe quel mot pour voir sa définition.",
    url: "https://lexistory-tawny.vercel.app",
    siteName: "LexiStory",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LexiStory — Apprends le français en lisant",
    description: "Une histoire courte par jour pour enrichir ton vocabulaire en français.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4574004728084162"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${playfair.variable} ${dmSans.variable}`}>
        <Nav />
        {children}
        <AdBanner />
        <Footer />
      </body>
    </html>
  );
}