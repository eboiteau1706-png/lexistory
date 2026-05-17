// lib/dictionary.ts
// ─────────────────────────────────────────────────────────
// Dictionnaire embarqué. Ajoute des mots au fur et à mesure
// que tu crées de nouvelles histoires.
// ─────────────────────────────────────────────────────────

export interface Definition {
  etym:      string;  // origine étymologique courte
  defOrig:   string;  // définition de dictionnaire
  defSimple: string;  // explication simple (niveau 12 ans)
}

const DICT: Record<string, Definition> = {
  // ── HISTOIRE: flamant rose ─────────────────────────────
  "flamant":         { etym: "Du latin flamant, couleur de flamme", defOrig: "Grand oiseau échassier au plumage rose ou rouge, aux pattes et au cou très longs, vivant en colonies dans les zones humides.", defSimple: "Un grand oiseau avec de longues pattes roses qui vit dans les marais. On le reconnaît à sa couleur rose unique !" },
  "flamants":        { etym: "Du latin flamant, couleur de flamme", defOrig: "Pluriel de flamant. Grands oiseaux échassiers au plumage rose ou rouge, vivant en colonies.", defSimple: "Plusieurs grands oiseaux roses avec de longues pattes qui vivent ensemble près de l'eau." },
  "emblématiques":   { etym: "Du latin emblema, ornement en relief", defOrig: "Qui constituent le symbole caractéristique d'une chose, d'un lieu ou d'un groupe.", defSimple: "Quelque chose qui représente si bien un endroit qu'on y pense automatiquement. Comme la Tour Eiffel pour Paris !" },
  "emblématique":    { etym: "Du latin emblema, ornement en relief", defOrig: "Qui constitue le symbole caractéristique d'une chose, d'un lieu ou d'un groupe.", defSimple: "Quelque chose qui représente si bien un endroit qu'on y pense automatiquement. Comme la Tour Eiffel pour Paris !" },
  "zones":           { etym: "Du grec zônê, ceinture", defOrig: "Étendues de terrain présentant des caractères particuliers qui les distinguent des régions voisines.", defSimple: "Des parties d'un lieu qui ont quelque chose de particulier. Comme la zone de jeux dans un parc." },
  "humides":         { etym: "Du latin humidus", defOrig: "Qui contiennent de l'eau ou sont imprégnés de vapeur d'eau.", defSimple: "Mouillé ou plein d'eau. Comme une éponge, ou l'air après la pluie." },
  "particulière":    { etym: "Du latin particularis", defOrig: "Qui appartient à quelque chose en propre, qui présente un caractère spécial ou unique.", defSimple: "Quelque chose de spécial ou d'unique, différent des autres." },
  "fascinant":       { etym: "Du latin fascinare, ensorceler", defOrig: "Qui exerce une attraction irrésistible et captive totalement l'attention.", defSimple: "Tellement intéressant qu'on ne peut pas s'en détacher. Comme regarder un feu de cheminée !" },
  "naissent":        { etym: "Du latin nasci, venir au monde", defOrig: "Viennent au monde, commencent leur existence.", defSimple: "Venir au monde. Comme quand un bébé arrive dans une famille." },
  "naissance":       { etym: "Du latin nasci, venir au monde", defOrig: "Moment où un être vivant vient au monde.", defSimple: "Le premier jour de ta vie, quand tu arrives dans le monde." },
  "poussins":        { etym: "Du latin pullus, petit d'animal", defOrig: "Très jeunes oiseaux qui viennent d'éclore, encore couverts de duvet.", defSimple: "Bébés oiseaux tout petits et doux, comme les bébés poules dans les fermes." },
  "entièrement":     { etym: "Du latin integer, intact", defOrig: "De façon totale et complète, sans exception.", defSimple: "Complètement, à 100%. Comme manger toute son assiette sans rien laisser." },
  "alimentation":    { etym: "Du latin alimentum, nourriture", defOrig: "Ensemble des aliments consommés par un être vivant ; action de se nourrir.", defSimple: "Tout ce qu'on mange et boit pour vivre. Ton alimentation, c'est tous tes repas dans la journée." },
  "progressivement": { etym: "Du latin progressus, avancer", defOrig: "De manière graduelle, par étapes successives, sans brusquerie.", defSimple: "Petit à petit, pas d'un coup. Comme quand tu apprends à faire du vélo et que tu t'améliores jour après jour." },
  "teinter":         { etym: "Du latin tingere, colorer", defOrig: "Donner une légère couleur à quelque chose ; colorer de manière subtile et progressive.", defSimple: "Colorer doucement quelque chose. Comme quand tu mets du jus de fraise dans de l'eau, elle devient légèrement rose." },
  "plumage":         { etym: "Du latin pluma, plume", defOrig: "Ensemble des plumes qui recouvrent le corps d'un oiseau.", defSimple: "Toutes les plumes d'un oiseau, comme les habits naturels que la nature lui a donnés." },
  "nourrissent":     { etym: "Du latin nutrire, nourrir", defOrig: "Apportent à l'organisme les substances nécessaires à sa vie et sa croissance.", defSimple: "Mangent pour vivre et grandir. Tout le monde se nourrit, les animaux comme les humains !" },
  "principalement":  { etym: "Du latin principalis, premier", defOrig: "Avant tout, surtout, en premier lieu.", defSimple: "Surtout, en grande partie. Il mange principalement des pâtes = les pâtes c'est ce qu'il mange le plus." },
  "algues":          { etym: "Du latin alga", defOrig: "Végétaux sans racines ni fleurs, vivant dans l'eau ou dans des lieux humides.", defSimple: "Des plantes qui vivent dans l'eau, comme les trucs verts et glissants qu'on voit dans la mer ou les étangs." },
  "crustacés":       { etym: "Du latin crusta, coquille", defOrig: "Animaux aquatiques à carapace dure, comme les crabes, homards et crevettes.", defSimple: "Des animaux avec une coquille dure qui vivent dans l'eau. Les crabes et les crevettes sont des crustacés." },
  "caroténoïdes":    { etym: "Du grec carota, carotte + eïdos, forme", defOrig: "Pigments organiques naturels de couleur jaune, orange ou rouge, présents dans de nombreux végétaux et animaux.", defSimple: "Des colorants naturels qui existent dans la nature. Ils donnent leur couleur orange aux carottes, rouge aux tomates, et rose aux flamants !" },
  "pigments":        { etym: "Du latin pigmentum, couleur", defOrig: "Substances qui donnent leur couleur aux êtres vivants, aux peintures ou aux tissus.", defSimple: "Des substances colorantes. Ce sont eux qui donnent leur couleur aux cheveux, à la peau et aux fleurs." },
  "naturels":        { etym: "Du latin naturalis", defOrig: "Qui appartiennent à la nature, qui ne sont pas fabriqués par l'être humain.", defSimple: "Qui viennent de la nature, sans transformation. Le bois est naturel, le plastique ne l'est pas." },
  "organisme":       { etym: "Du grec organon, instrument", defOrig: "Être vivant considéré dans son ensemble, avec tous les organes qui le composent.", defSimple: "Le corps entier d'un être vivant avec tous ses organes. Ton organisme, c'est tout ton corps !" },
  "assimile":        { etym: "Du latin assimilare, rendre semblable", defOrig: "Transforme et intègre une substance extérieure pour la rendre utilisable par l'organisme.", defSimple: "Absorber quelque chose et le transformer pour s'en servir. Comme ton corps qui transforme la nourriture en énergie." },
  "redistribue":     { etym: "Du latin distribuere, répartir", defOrig: "Distribue à nouveau, répartit vers différents endroits.", defSimple: "Envoyer quelque chose dans plusieurs endroits différents. Comme distribuer des cartes à tous les joueurs." },
  "plumes":          { etym: "Du latin pluma", defOrig: "Tiges légères recouvertes de filaments qui forment le revêtement des oiseaux.", defSimple: "Ce qui recouvre les oiseaux. Les plumes protègent, tiennent chaud et permettent de voler." },
  "nourri":          { etym: "Du latin nutrire, nourrir", defOrig: "Qui a reçu suffisamment d'aliments pour sa croissance et sa santé.", defSimple: "Qui a mangé assez et bien. Un enfant bien nourri a une alimentation saine et suffisante." },
  "terne":           { etym: "Du vieux français, sans éclat", defOrig: "Qui manque d'éclat, de brillance ou de vivacité ; sans lustre ni vigueur.", defSimple: "Fade, sans couleur ni éclat. Comme un vieux t-shirt délavé qui a perdu ses couleurs." },
  "blanchâtre":      { etym: "De blanc + suffixe -âtre (ressemblant à)", defOrig: "Qui tire sur le blanc, d'un blanc impur ou légèrement grisâtre.", defSimple: "Un peu blanc mais pas vraiment, comme du blanc sale ou un linge mal lavé." },
  "véritable":       { etym: "Du latin veritabilis, vrai", defOrig: "Qui est conforme à la réalité, authentique et non simulé.", defSimple: "Vrai, authentique. Le contraire de faux. Un véritable ami, c'est un ami pour de vrai." },
  "indicateur":      { etym: "Du latin indicare, montrer", defOrig: "Signe ou élément qui donne des informations sur l'état ou l'évolution de quelque chose.", defSimple: "Un signe qui nous donne une information. Comme la jauge d'essence qui indique s'il reste du carburant." },
  "séduction":       { etym: "Du latin seducere, emmener à part", defOrig: "Action de plaire et d'attirer quelqu'un par son charme ou ses qualités.", defSimple: "Le fait de plaire à quelqu'un et de l'attirer vers soi. Comme quand quelqu'un te fait de l'effet !" },
  "vives":           { etym: "Du latin vivus, vivant", defOrig: "Intenses, brillantes, éclatantes (en parlant de couleurs ou de lumières).", defSimple: "Très brillant et intense. Une couleur vive, c'est une couleur forte qui saute aux yeux, pas une couleur pâle." },
  "attirent":        { etym: "Du latin attrahere, tirer vers soi", defOrig: "Exercent une attraction sur quelqu'un ou quelque chose, font venir vers soi.", defSimple: "Faire venir quelqu'un vers soi. Comme un aimant qui attire le métal." },
  "facilement":      { etym: "Du latin facilis, aisé", defOrig: "Sans peine, sans difficulté, avec aisance.", defSimple: "Sans effort, simplement. Si tu fais quelque chose facilement, c'est que c'est pas dur pour toi." },
  "partenaire":      { etym: "De l'anglais partner, associé", defOrig: "Personne avec qui l'on est associé, notamment dans une relation affective ou une activité.", defSimple: "La personne avec qui on fait quelque chose ensemble. Un partenaire de jeu, de travail ou amoureux." },
  "décidément":      { etym: "Du latin decidere, décider", defOrig: "Adverbe exprimant une confirmation ou un constat définitif sur quelque chose.", defSimple: "Vraiment, c'est sûr et certain. On dit ça quand on confirme quelque chose qu'on remarque encore une fois." },
  "cosmétiques":     { etym: "Du grec kosmêtikos, qui arrange", defOrig: "Produits de soin et d'embellissement destinés à être appliqués sur le corps.", defSimple: "Les produits qu'on utilise pour être beau : le rouge à lèvres, la crème, le shampoing sont des cosmétiques." },
  "couleur":         { etym: "Du latin color", defOrig: "Propriété des objets qui produit sur l'œil une sensation due à la façon dont ils réfléchissent la lumière.", defSimple: "Ce que nos yeux perçoivent : rouge, bleu, vert... La couleur donne l'apparence visuelle d'un objet." },
  "secret":          { etym: "Du latin secretus, mis à part", defOrig: "Ce qui est tenu caché, qui n'est pas révélé ou connu de tous.", defSimple: "Une information que tout le monde ne connaît pas. Garder un secret, c'est ne pas le dire." },
  "oiseaux":         { etym: "Du latin avis, oiseau", defOrig: "Animaux vertébrés couverts de plumes, à sang chaud, dont les membres antérieurs sont des ailes.", defSimple: "Les animaux avec des plumes et des ailes. Les moineaux, les aigles et les flamants sont des oiseaux." },
  "nature":          { etym: "Du latin natura", defOrig: "L'ensemble du monde physique, des êtres vivants et des phénomènes non créés par l'homme.", defSimple: "Tout ce qui existe sans que l'homme l'ait fabriqué : les forêts, les animaux, les rivières, le ciel." },
  "longueur":        { etym: "Du latin longitudo", defOrig: "Dimension d'un objet dans son plus grand sens.", defSimple: "La taille d'un objet de bout en bout. La longueur d'une table, c'est la mesure du côté le plus long." },

  // ── MOTS COURANTS ─────────────────────────────────────────
  "sans":      { etym: "Du latin sine", defOrig: "Préposition exprimant l'absence, la privation ou la manque de quelque chose.", defSimple: "Qui n'a pas quelque chose. Sans sucre = pas de sucre dedans." },
  "doute":     { etym: "Du latin dubitare, hésiter", defOrig: "Incertitude de l'esprit qui hésite entre deux jugements ou deux partis.", defSimple: "Quand on n'est pas sûr de quelque chose. Sans doute = probablement, c'est très probable." },
  "cache":     { etym: "Du latin coactare, contraindre", defOrig: "Dissimule, tient hors de la vue ou de la connaissance.", defSimple: "Mettre quelque chose pour qu'on ne le voit pas. Comme cacher un cadeau pour surprendre quelqu'un." },
  "monde":     { etym: "Du latin mundus", defOrig: "Ensemble de tout ce qui existe ; la Terre et ses habitants.", defSimple: "La planète Terre avec tous les gens et les pays qui y vivent." },
  "leur":      { etym: "Du latin illorum, d'eux", defOrig: "Pronom ou adjectif possessif de la troisième personne du pluriel.", defSimple: "Un mot pour dire que quelque chose appartient à plusieurs personnes. Leur maison = la maison qui est à eux." },

  // ── AJOUTE ICI LES MOTS DE TES PROCHAINES HISTOIRES ──────
};

// ── FONCTION DE RECHERCHE ──────────────────────────────────
function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // retire accents
    .replace(/[^a-z]/g, "");
}

export function lookup(word: string): Definition | null {
  // Recherche exacte
  if (DICT[word]) return DICT[word];
  // Recherche sans accents
  const norm = normalize(word);
  for (const key of Object.keys(DICT)) {
    if (normalize(key) === norm) return DICT[key];
  }
  return null;
}
