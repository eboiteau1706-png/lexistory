// lib/stories.ts
// ─────────────────────────────────────────────────────────
// Ajoute tes histoires ici. Une par jour.
// Chaque histoire a un slug unique (utilisé plus tard pour l'URL et Supabase).
// ─────────────────────────────────────────────────────────

export interface Story {
  slug:       string;       // identifiant unique ex: "flamant-rose"
  date:       string;       // "YYYY-MM-DD"
  title:      string;
  category:   string;       // ex: "Histoire · Science"
  level:      string;       // "Débutant" | "Intermédiaire" | "Avancé"
  readTime:   string;       // ex: "3 min de lecture"
  paragraphs: string[];     // chaque élément = un <p>
}

// ── BIBLIOTHÈQUE D'HISTOIRES ───────────────────────────────
export const STORIES: Story[] = [
  {
    slug: "flamant-rose",
    date: "2026-05-17",
    title: "Pourquoi les flamants roses sont-ils roses ?",
    category: "Histoire · Science",
    level: "Niveau Intermédiaire",
    readTime: "3 min de lecture",
    paragraphs: [
      "Le flamant rose est sans doute l'un des oiseaux les plus emblématiques des zones humides du monde. Pourtant, sa couleur si particulière cache un secret fascinant : les flamants ne naissent pas roses.",
      "À leur naissance, les poussins sont entièrement blancs ou gris. C'est leur alimentation qui va progressivement teinter leur plumage. Ils se nourrissent principalement d'algues et de petits crustacés riches en caroténoïdes, des pigments naturels que leur organisme assimile et redistribue dans leurs plumes.",
      "Un flamant mal nourri perdra progressivement sa couleur rose pour retrouver un plumage terne et blanchâtre. Sa couleur est donc un véritable indicateur de santé — et même de séduction : les flamants aux plumes les plus vives sont ceux qui attirent le plus facilement un partenaire.",
      "La nature, décidément, a toujours une longueur d'avance sur nos cosmétiques.",
    ],
  },

  // ── AJOUTE TES PROCHAINES HISTOIRES ICI ──
  // {
  //   slug: "araignees-soie",
  //   date: "2026-05-18",
  //   title: "La soie d'araignée, plus solide que l'acier ?",
  //   category: "Science",
  //   level: "Niveau Débutant",
  //   readTime: "3 min de lecture",
  //   paragraphs: [...],
  // },
];

// ── RETOURNE L'HISTOIRE DU JOUR ────────────────────────────
export function getTodayStory(): Story {
  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
  const story = STORIES.find((s) => s.date === today);
  // Si pas d'histoire pour aujourd'hui, retourne la dernière dispo
  return story ?? STORIES[STORIES.length - 1];
}

// ── RETOURNE UNE HISTOIRE PAR SLUG ────────────────────────
export function getStoryBySlug(slug: string): Story | undefined {
  return STORIES.find((s) => s.slug === slug);
}
