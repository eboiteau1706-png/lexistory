import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";
import UsernameModal from "@/components/UsernameModal";
import "./globals.css";
import OnboardingPopup from "@/components/OnboardingPopup";

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

export const metadata = {
  title: "LexiStory — Apprends le français en lisant",
  description: "Lis une histoire par jour, découvre de nouveaux mots et gagne des XP. L'application qui rend l'apprentissage du vocabulaire français amusant.",
  keywords: "lexistory, vocabulaire français, apprendre français, histoires quotidiennes",
  openGraph: {
    title: "LexiStory",
    description: "Apprends le français en lisant une histoire par jour.",
    url: "https://lexistory.fr",
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4J8MWNBH93" />
<script dangerouslySetInnerHTML={{ __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-4J8MWNBH93');
`}} />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4574004728084162"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${playfair.variable} ${dmSans.variable}`}>
  <Nav />
  <OnboardingPopup />
  <UsernameModal />
  {children}
  <AdBanner />
  <Footer />
</body>
    </html>
  );
}