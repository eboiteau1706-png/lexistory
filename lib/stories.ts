// lib/stories.ts
export interface Story {
  slug:       string;
  date:       string;
  title:      string;
  category:   string;
  level:      "Curieux" | "Lecteur" | "Érudit";
  readTime:   string;
  paragraphs: string[];
}
 
export const STORIES: Story[] = [
  // ── CURIEUX (enfant / débutant) ──────────────────────────
  {
    slug: "pourquoi-ciel-bleu",
    date: "2026-05-17",
    title: "Pourquoi le ciel est-il bleu ?",
    category: "Science",
    level: "Curieux",
    readTime: "2 min de lecture",
    paragraphs: [
      "Chaque jour, tu lèves les yeux et tu vois un grand ciel bleu. Mais as-tu déjà demandé pourquoi il n'est pas rouge, vert ou violet ? La réponse est cachée dans la lumière du soleil.",
      "La lumière du soleil semble blanche, mais en réalité elle contient toutes les couleurs de l'arc-en-ciel. Quand cette lumière traverse l'atmosphère, elle rencontre de minuscules particules d'air. Ces particules dévient la lumière dans toutes les directions.",
      "La lumière bleue est déviée beaucoup plus facilement que les autres couleurs. Elle rebondit partout dans le ciel, ce qui le rend bleu pour nos yeux. C'est ce qu'on appelle la diffusion de la lumière.",
      "Le soir, quand le soleil est bas, la lumière traverse beaucoup plus d'atmosphère. Le bleu disparaît et c'est le rouge et l'orange qui arrivent jusqu'à nous. C'est pour ça que les couchers de soleil sont si colorés !",
    ],
  },
 
  // ── LECTEUR (ado / intermédiaire) ────────────────────────
  {
    slug: "flamant-rose",
    date: "2026-05-18",
    title: "Pourquoi les flamants roses sont-ils roses ?",
    category: "Histoire · Science",
    level: "Lecteur",
    readTime: "3 min de lecture",
    paragraphs: [
      "Le flamant rose est sans doute l'un des oiseaux les plus emblématiques des zones humides du monde. Pourtant, sa couleur si particulière cache un secret fascinant : les flamants ne naissent pas roses.",
      "À leur naissance, les poussins sont entièrement blancs ou gris. C'est leur alimentation qui va progressivement teinter leur plumage. Ils se nourrissent principalement d'algues et de petits crustacés riches en caroténoïdes, des pigments naturels que leur organisme assimile et redistribue dans leurs plumes.",
      "Un flamant mal nourri perdra progressivement sa couleur rose pour retrouver un plumage terne et blanchâtre. Sa couleur est donc un véritable indicateur de santé — et même de séduction : les flamants aux plumes les plus vives sont ceux qui attirent le plus facilement un partenaire.",
      "La nature, décidément, a toujours une longueur d'avance sur nos cosmétiques.",
    ],
  },
 
  // ── ÉRUDIT (adulte / avancé) ─────────────────────────────
  {
    slug: "biais-cognitifs",
    date: "2026-05-19",
    title: "Les biais cognitifs, ces illusions qui gouvernent nos décisions",
    category: "Psychologie",
    level: "Érudit",
    readTime: "4 min de lecture",
    paragraphs: [
      "Nous aimons penser que nos décisions sont le fruit d'une réflexion rationnelle et méthodique. Pourtant, la psychologie cognitive a démontré depuis plusieurs décennies que notre cerveau est constamment soumis à des biais, ces raccourcis mentaux qui altèrent notre jugement à notre insu.",
      "Le biais de confirmation en est l'exemple le plus pernicieux : nous avons naturellement tendance à rechercher, interpréter et mémoriser les informations qui corroborent nos croyances préexistantes, tout en ignorant celles qui les contredisent. Ce mécanisme, profondément ancré dans notre cognition, explique pourquoi il est si difficile de changer d'avis, même face à des preuves accablantes.",
      "L'effet de halo constitue un autre biais particulièrement influent. Lorsque nous percevons une qualité positive chez une personne — sa beauté, son éloquence ou son charisme — nous lui attribuons spontanément d'autres vertus, comme la compétence ou l'honnêteté, sans aucune justification rationnelle. Ce phénomène explique en partie pourquoi les personnes physiquement attrayantes sont souvent perçues comme plus intelligentes.",
      "Comprendre ces biais ne suffit malheureusement pas à s'en affranchir. Même les chercheurs qui les étudient toute leur vie en restent victimes. La lucidité consiste alors non pas à les éliminer, mais à les reconnaître au moment où ils opèrent — un effort d'introspection permanent qui constitue, peut-être, la forme la plus exigeante de l'intelligence.",
    ],
  },
 
  // ── AJOUTE TES PROCHAINES HISTOIRES ICI ──────────────────
];
 
// Retourne l'histoire du jour selon le niveau
export function getTodayStory(level: Story["level"] = "Lecteur"): Story {
  const today = new Date().toISOString().split("T")[0];
  const story = STORIES.find((s) => s.date === today && s.level === level);
  // Fallback : dernière histoire du niveau demandé
  const fallback = [...STORIES].reverse().find((s) => s.level === level);
  return story ?? fallback ?? STORIES[STORIES.length - 1];
}
 
export function getStoryBySlug(slug: string): Story | undefined {
  return STORIES.find((s) => s.slug === slug);
}
 