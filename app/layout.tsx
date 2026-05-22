import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";
import UsernameModal from "@/components/UsernameModal";
import OnboardingPopup from "@/components/OnboardingPopup";
import AnnouncementBanner from "@/components/Announcement";
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
  description: "Une histoire courte par jour pour enrichir ton vocabulaire en français. Clique sur n'importe quel mot pour voir sa définition, gagne des XP et monte de niveau !",
  keywords: "lexistory, vocabulaire français, apprendre français, histoires quotidiennes, définitions",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "LexiStory — Apprends le français en lisant",
    description: "Une histoire courte par jour pour enrichir ton vocabulaire en français. Gratuit, sans pub.",
    url: "https://lexistory.fr",
    siteName: "LexiStory",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "https://lexistory.fr/favicon.png", width: 1080, height: 1080, alt: "LexiStory" }],
  },
  twitter: {
    card: "summary",
    title: "LexiStory — Apprends le français en lisant",
    description: "Une histoire courte par jour pour enrichir ton vocabulaire en français. Gratuit, sans pub.",
    images: ["/favicon.png"],
  },
  robots: { index: true, follow: true },
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
        <AnnouncementBanner />
        <OnboardingPopup />
        <UsernameModal />
        {children}
        <AdBanner />
        <Footer />
      </body>
    </html>
  );
}
