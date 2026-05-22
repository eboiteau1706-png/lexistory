"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import styles from "./jeux.module.css";

const GAME_WORDS = [
  { word: "amygdale", def: "Petite partie du cerveau en forme d'amande qui gère nos émotions, surtout la peur.", etym: "Du grec amygdalê, amande" },
  { word: "empathie", def: "Se mettre à la place des autres et ressentir ce qu'ils ressentent.", etym: "Du grec empatheia, passion" },
  { word: "biais", def: "Une erreur que notre cerveau fait sans s'en rendre compte.", etym: "Du vieux français biais, de travers" },
  { word: "lucidité", def: "Voir les choses clairement, sans se mentir. Savoir regarder la vérité en face.", etym: "Du latin luciditas, clarté" },
  { word: "dopamine", def: "Une substance que ton cerveau fabrique quand tu fais quelque chose de plaisant.", etym: "De dopa (acide aminé) + amine" },
  { word: "chlorophylle", def: "La substance verte dans les feuilles qui capte la lumière du soleil pour nourrir la plante.", etym: "Du grec chloros (vert) + phyllon (feuille)" },
  { word: "atmosphère", def: "L'enveloppe d'air qui entoure la Terre. L'air qu'on respire en très grande quantité.", etym: "Du grec atmos (vapeur) + sphaira (sphère)" },
  { word: "introspection", def: "Se regarder à l'intérieur de soi pour comprendre ce qu'on ressent vraiment.", etym: "Du latin introspicere, regarder à l'intérieur" },
  { word: "stoïcisme", def: "Une philosophie qui apprend à rester calme et fort face aux difficultés de la vie.", etym: "Du grec Stoa, portique où enseignait Zénon" },
  { word: "équanimité", def: "Rester calme et serein quoi qu'il arrive.", etym: "Du latin aequanimitas, égalité d'âme" },
  { word: "métaphore", def: "Quand on décrit quelque chose en utilisant les mots d'une autre chose.", etym: "Du grec metaphora, transport" },
  { word: "gravitation", def: "La force qui attire tous les objets vers le bas et qui fait tourner les planètes autour du soleil.", etym: "Du latin gravitas, pesanteur" },
  { word: "neurotransmetteur", def: "Un messager chimique dans le cerveau qui permet aux neurones de communiquer entre eux.", etym: "Du grec neuron + latin transmittere" },
  { word: "microbiome", def: "Toutes les bactéries et microbes qui vivent dans ton corps, surtout dans l'intestin.", etym: "Du grec mikros (petit) + bios (vie)" },
  { word: "séduction", def: "Le fait de plaire à quelqu'un et de l'attirer vers soi.", etym: "Du latin seducere, emmener à part" },
  { word: "consolidation", def: "Rendre quelque chose solide et durable. La consolidation d'un souvenir = le fixer pour qu'il reste longtemps.", etym: "Du latin consolidare, rendre solide" },
  { word: "paradoxal", def: "Qui semble contradictoire. Le sommeil paradoxal est paradoxal car le cerveau est très actif alors qu'on dort.", etym: "Du grec paradoxos, contraire à l'opinion" },
  { word: "effervescence", def: "Beaucoup d'agitation et d'enthousiasme. Un lieu plein d'effervescence = où ça bouge.", etym: "Du latin effervescere, bouillonner" },
  { word: "humanisme", def: "Une façon de penser qui met l'être humain au centre de tout.", etym: "Du latin humanus, humain" },
  { word: "causalité", def: "Le fait qu'une chose en cause une autre. La pluie est la cause de la flaque.", etym: "Du latin causalitas, rapport de cause à effet" },
  { word: "flamant", def: "Un grand oiseau avec de longues pattes roses qui vit dans les marais.", etym: "Du latin flamant, couleur de flamme" },
  { word: "pigments", def: "Des substances colorantes qui donnent leur couleur aux plantes et animaux.", etym: "Du latin pigmentum, couleur" },
  { word: "diffusion", def: "Quand quelque chose se répand partout. Comme une odeur qui se diffuse dans la pièce.", etym: "Du latin diffusio, épandage" },
  { word: "abyssales", def: "Des profondeurs immenses de l'océan, les endroits les plus profonds de la mer.", etym: "Du grec abyssos, sans fond" },
  { word: "eudaimonia", def: "Un bonheur profond qui vient d'une vie bien vécue, pas juste du plaisir immédiat.", etym: "Du grec eu (bien) + daimon (génie)" },
  { word: "mnésique", def: "Qui concerne la mémoire. La consolidation mnésique = comment les souvenirs se fixent dans notre mémoire.", etym: "Du grec mneme, mémoire" },
  { word: "caroténoïdes", def: "Des colorants naturels qui donnent leur couleur aux carottes, tomates et flamants.", etym: "Du grec carota, carotte + eïdos, forme" },
  { word: "glymphatique", def: "Le système de nettoyage du cerveau qui fonctionne pendant qu'on dort, comme un lave-vaisselle.", etym: "De glie (cellules cérébrales) + lymphatique" },
  { word: "eurêka", def: "Ce qu'on crie quand on trouve soudainement la solution à un problème. Mot crié par Archimède dans son bain.", etym: "Du grec heureka, j'ai trouvé" },
  { word: "qualia", def: "La façon dont les choses nous semblent ressenties de l'intérieur. Le rouge de ta vision, la douleur que tu sens.", etym: "Du latin qualis, de quelle nature" },
];

const PREMIUM_WORDS = [
  { word: "apophtegme", def: "Une courte parole mémorable d'un personnage célèbre, souvent pleine de sagesse.", etym: "Du grec apophthegma, sentence" },
  { word: "bathyscaphe", def: "Un engin submersible capable de plonger à de très grandes profondeurs océaniques.", etym: "Du grec bathys (profond) + skaphos (bateau)" },
  { word: "chiasme", def: "Une figure de style qui inverse l'ordre des éléments dans deux propositions parallèles.", etym: "Du grec khiasmos, disposition en croix" },
  { word: "diastole", def: "La phase de relaxation du cœur pendant laquelle il se remplit de sang.", etym: "Du grec diastolê, dilatation" },
  { word: "épistémologie", def: "La branche de la philosophie qui étudie la nature et les limites de la connaissance humaine.", etym: "Du grec episteme (connaissance) + logos (discours)" },
  { word: "funambule", def: "Un acrobate qui marche et fait des exercices sur un fil tendu en hauteur.", etym: "Du latin funis (corde) + ambulare (marcher)" },
  { word: "glossolalie", def: "Le fait de parler une langue inconnue ou incompréhensible, souvent dans un contexte religieux.", etym: "Du grec glossa (langue) + lalein (parler)" },
  { word: "hégémonie", def: "La domination politique, culturelle ou militaire d'un État ou d'un groupe sur les autres.", etym: "Du grec hegemonia, commandement" },
  { word: "iconoclaste", def: "Quelqu'un qui remet en question les idées reçues et les conventions établies.", etym: "Du grec eikon (image) + klastes (briseur)" },
  { word: "jactance", def: "Une façon de parler de soi avec trop de fierté et de se vanter excessivement.", etym: "Du latin jactantia, arrogance" },
  { word: "kénose", def: "En théologie, l'acte par lequel Dieu s'est dépouillé de sa puissance divine en s'incarnant.", etym: "Du grec kenosis, vidage" },
  { word: "logorrhée", def: "Un flux de paroles excessif et incontrôlé, souvent difficile à arrêter.", etym: "Du grec logos (parole) + rhein (couler)" },
  { word: "mnémotechnique", def: "Une technique ou un procédé qui aide à mémoriser des informations plus facilement.", etym: "Du grec mneme (mémoire) + tekhne (art)" },
  { word: "néologisme", def: "Un mot nouveau créé dans une langue pour désigner une réalité nouvelle.", etym: "Du grec neos (nouveau) + logos (mot)" },
  { word: "ontologie", def: "La branche de la philosophie qui étudie la nature de l'être et de l'existence.", etym: "Du grec ontos (être) + logos (discours)" },
  { word: "palimpseste", def: "Un manuscrit dont on a effacé l'écriture pour écrire à nouveau, mais dont des traces subsistent.", etym: "Du grec palimpsestos, gratté de nouveau" },
  { word: "quaternaire", def: "La dernière période géologique, commençant il y a 2,6 millions d'années et incluant l'ère actuelle.", etym: "Du latin quaternarius, groupe de quatre" },
  { word: "réification", def: "Le fait de traiter une abstraction ou une personne comme si c'était une chose matérielle.", etym: "Du latin res (chose) + facere (faire)" },
  { word: "syllogisme", def: "Un raisonnement logique en trois étapes : deux prémisses et une conclusion qui en découle.", etym: "Du grec syllogismos, calcul" },
  { word: "tautologie", def: "Une répétition inutile de la même idée avec des mots différents, sans rien ajouter.", etym: "Du grec tauto (même) + logos (parole)" },
  { word: "ubiquité", def: "La capacité d'être présent partout en même temps ou en de nombreux endroits simultanément.", etym: "Du latin ubique, partout" },
  { word: "véridique", def: "Qui dit la vérité, qui est conforme à la réalité et aux faits réels.", etym: "Du latin veridicus, qui dit vrai" },
  { word: "xénophilie", def: "L'attrait et l'affection pour les étrangers, les cultures et les coutumes étrangères.", etym: "Du grec xenos (étranger) + philos (ami)" },
  { word: "zeugme", def: "Une figure de style qui relie un verbe à deux compléments de nature ou de sens très différents.", etym: "Du grec zeugma, lien" },
  { word: "acméisme", def: "Un mouvement poétique russe du début du XXe siècle prônant la clarté et la précision du langage.", etym: "Du grec akme, sommet" },
  { word: "bovarysme", def: "La tendance à se percevoir autrement qu'on est réellement et à idéaliser sa propre existence.", etym: "Du personnage Emma Bovary de Flaubert" },
  { word: "catharsis", def: "La purification émotionnelle que ressent le spectateur devant une œuvre tragique.", etym: "Du grec katharsis, purification" },
  { word: "doxologie", def: "Une formule liturgique de louange à Dieu, souvent chantée à la fin d'une prière.", etym: "Du grec doxa (gloire) + logos (parole)" },
  { word: "eschatologie", def: "La partie de la théologie qui traite des dernières fins de l'homme et de l'univers.", etym: "Du grec eskhatos (dernier) + logos (discours)" },
  { word: "frugalité", def: "La qualité de celui qui se contente de peu et évite les dépenses et les plaisirs excessifs.", etym: "Du latin frugalitas, sobriété" },
];

const CITATIONS = [
  { text: "Il est des souvenirs que le temps semble incapable d'effacer : le jour d'un accident, une déclaration d'amour inattendue, l'annonce d'un ***.", answer: "deuil", choices: ["deuil", "voyage", "rêve", "oubli"] },
  { text: "La lumière du soleil semble blanche, mais en réalité elle contient toutes les couleurs de l'***.", answer: "arc-en-ciel", choices: ["arc-en-ciel", "horizon", "atmosphère", "prisme"] },
  { text: "Un flamant mal nourri perdra progressivement sa couleur rose pour retrouver un plumage *** et blanchâtre.", answer: "terne", choices: ["terne", "brillant", "sombre", "doré"] },
  { text: "Le sage stoïcien concentre toute son énergie sur ce qui dépend de lui et accepte le reste avec ***.", answer: "équanimité", choices: ["équanimité", "tristesse", "colère", "résignation"] },
  { text: "Le chocolat sucré connut alors un succès *** dans les cours royales européennes.", answer: "foudroyant", choices: ["foudroyant", "modeste", "discret", "progressif"] },
  { text: "Dormir sept à neuf heures par nuit n'est donc pas un luxe mais une *** biologique.", answer: "nécessité", choices: ["nécessité", "habitude", "tradition", "recommandation"] },
  { text: "En 1917, Marcel Duchamp déposa un *** retourné comme œuvre d'art à une exposition new-yorkaise.", answer: "urinoir", choices: ["urinoir", "tableau", "miroir", "vase"] },
  { text: "Les fèves de cacao étaient si précieuses qu'elles valaient plus que l'*** dans certaines régions.", answer: "or", choices: ["or", "sel", "fer", "bois"] },
  { text: "Nous aimons penser que nos décisions sont le fruit d'une réflexion *** et méthodique.", answer: "rationnelle", choices: ["rationnelle", "rapide", "instinctive", "collective"] },
  { text: "Le bâillement est aussi *** que le rire.", answer: "contagieux", choices: ["contagieux", "bruyant", "fatigant", "agréable"] },
  { text: "La *** connaît depuis une décennie un regain d'intérêt remarquable.", answer: "philosophie", choices: ["philosophie", "médecine", "musique", "peinture"] },
  { text: "Le cerveau rejoue alors les événements de la journée, trie les informations importantes et les intègre dans la *** à long terme.", answer: "mémoire", choices: ["mémoire", "pensée", "conscience", "raison"] },
  { text: "Chaque goutte de pluie fonctionne comme un tout petit *** de verre.", answer: "prisme", choices: ["prisme", "miroir", "cristal", "diamant"] },
  { text: "Les larmes émotionnelles contiennent des *** du stress.", answer: "hormones", choices: ["hormones", "vitamines", "protéines", "minéraux"] },
  { text: "Les Mayas et les Aztèques utilisaient le cacao lors des *** religieux.", answer: "rituels", choices: ["rituels", "repas", "marchés", "voyages"] },
  { text: "Isaac Newton observa une pomme tomber dans son verger, ce qui l'amena à s'interroger sur la nature de la force qui l'attirait vers le ***.", answer: "sol", choices: ["sol", "ciel", "mur", "bas"] },
  { text: "Des créatures ***, des poissons aux dents translucides prospèrent dans les abysses.", answer: "bioluminescentes", choices: ["bioluminescentes", "transparentes", "géantes", "venimeuses"] },
  { text: "La peau se ride dans l'eau car les rides créent des *** comme les pneus d'une voiture.", answer: "rainures", choices: ["rainures", "bulles", "couches", "marques"] },
  { text: "Nous en savons plus sur la surface de la Lune que sur les fonds *** de notre propre planète.", answer: "marins", choices: ["marins", "rocheux", "glacés", "sombres"] },
  { text: "Le café est la deuxième marchandise la plus échangée dans le monde après le ***.", answer: "pétrole", choices: ["pétrole", "blé", "or", "coton"] },
  { text: "Les travaux de Rosalind Franklin furent transmis à Watson à son ***, sans sa permission.", answer: "insu", choices: ["insu", "accord", "avis", "demande"] },
  { text: "En s'appuyant sur ce cliché décisif, Watson et Crick purent élucider la structure *** de l'ADN.", answer: "hélicoïdale", choices: ["hélicoïdale", "sphérique", "plate", "cubique"] },
  { text: "Le mouvement philosophique des *** a conduit à la Révolution française.", answer: "Lumières", choices: ["Lumières", "Anciens", "Modernes", "Classiques"] },
  { text: "Léonard de Vinci était peintre, sculpteur, architecte, musicien, mathématicien, ingénieur et *** à la fois.", answer: "anatomiste", choices: ["anatomiste", "astronome", "juriste", "théologien"] },
  { text: "La popularité du stoïcisme révèle un besoin profond dans un monde saturé de stimulations et d'injonctions au bonheur ***.", answer: "immédiat", choices: ["immédiat", "durable", "collectif", "spirituel"] },
  { text: "Les fonds marins des grandes fosses abyssales restent parmi les territoires les moins *** de la Terre.", answer: "explorés", choices: ["explorés", "profonds", "connus", "habités"] },
  { text: "Le biais de confirmation nous pousse à rechercher les informations qui *** nos croyances.", answer: "corroborent", choices: ["corroborent", "contredisent", "modifient", "ignorent"] },
  { text: "La *** intestinale communique avec notre cerveau via l'axe intestin-cerveau.", answer: "flore", choices: ["flore", "bile", "graisse", "muqueuse"] },
  { text: "Notre cerveau ne dispose pas d'une horloge centrale unique, mais d'une multitude de systèmes *** distribués.", answer: "temporels", choices: ["temporels", "nerveux", "visuels", "sensoriels"] },
  { text: "Aristote distinguait deux formes de bien-être : l'hédoné, le plaisir immédiat, et l'***, le bonheur comme épanouissement.", answer: "eudaimonia", choices: ["eudaimonia", "ataraxia", "aponia", "sophia"] },
];

const PREMIUM_CITATIONS = [
  { text: "L'art est une *** qui nous permet de réaliser notre vérité.", answer: "mensonge", choices: ["mensonge", "vérité", "illusion", "réalité"] },
  { text: "La conscience est le seul endroit au monde où la *** ne peut pas entrer.", answer: "médiocrité", choices: ["médiocrité", "beauté", "vérité", "douleur"] },
  { text: "L'homme est condamné à être ***.", answer: "libre", choices: ["libre", "mortel", "seul", "heureux"] },
  { text: "Ce qui ne me tue pas me rend ***.", answer: "plus fort", choices: ["plus fort", "plus sage", "plus calme", "différent"] },
  { text: "La philosophie est un exercice pour la ***.", answer: "mort", choices: ["mort", "vie", "vérité", "raison"] },
  { text: "Le doute est le commencement de la ***.", answer: "sagesse", choices: ["sagesse", "folie", "science", "vérité"] },
  { text: "L'imagination est plus importante que la ***.", answer: "connaissance", choices: ["connaissance", "raison", "mémoire", "logique"] },
  { text: "Les mots sont la forme la plus puissante de la *** humaine.", answer: "magie", choices: ["magie", "pensée", "communication", "violence"] },
  { text: "La *** est le silence de la raison.", answer: "passion", choices: ["passion", "beauté", "folie", "création"] },
  { text: "Penser, c'est déjà vouloir une *** du monde.", answer: "réforme", choices: ["réforme", "image", "copie", "description"] },
  { text: "L'art de vivre consiste à savoir ce qu'on doit sacrifier et ce qu'on doit ***.", answer: "conserver", choices: ["conserver", "ignorer", "partager", "détruire"] },
  { text: "La *** est la forme la plus haute de l'intelligence.", answer: "simplicité", choices: ["simplicité", "complexité", "créativité", "logique"] },
  { text: "Toute grande vérité commence par être une ***.", answer: "hérésie", choices: ["hérésie", "erreur", "hypothèse", "utopie"] },
  { text: "Le propre de l'homme est de penser sans en être ***.", answer: "conscient", choices: ["conscient", "capable", "sûr", "libre"] },
  { text: "La *** est la politesse du désespoir.", answer: "ironie", choices: ["ironie", "beauté", "raison", "vertu"] },
  { text: "On ne voit bien qu'avec le cœur. L'essentiel est *** pour les yeux.", answer: "invisible", choices: ["invisible", "visible", "lointain", "caché"] },
  { text: "La liberté des uns s'arrête là où commence la *** des autres.", answer: "liberté", choices: ["liberté", "dignité", "souffrance", "volonté"] },
  { text: "Le génie, c'est 1% d'inspiration et 99% de ***.", answer: "transpiration", choices: ["transpiration", "réflexion", "persévérance", "méthode"] },
  { text: "L'enfer, c'est les ***.", answer: "autres", choices: ["autres", "vivants", "regrets", "illusions"] },
  { text: "La *** est l'art de rendre supportable l'insupportable.", answer: "philosophie", choices: ["philosophie", "religion", "musique", "poésie"] },
  { text: "Ce que nous savons est une goutte, ce que nous ignorons est un ***.", answer: "océan", choices: ["océan", "désert", "mystère", "abîme"] },
  { text: "La *** est une chose trop sérieuse pour être laissée aux militaires.", answer: "guerre", choices: ["guerre", "paix", "politique", "nation"] },
  { text: "Mieux vaut une tête bien faite qu'une tête bien ***.", answer: "pleine", choices: ["pleine", "vide", "formée", "savante"] },
  { text: "La *** est la plus haute forme de la générosité.", answer: "gratitude", choices: ["gratitude", "bonté", "sagesse", "vertu"] },
  { text: "L'éducation est l'arme la plus puissante qu'on puisse utiliser pour changer le ***.", answer: "monde", choices: ["monde", "système", "futur", "destin"] },
  { text: "Le courage n'est pas l'absence de peur, mais le jugement que *** est plus important.", answer: "autre chose", choices: ["autre chose", "la victoire", "l'honneur", "la vérité"] },
  { text: "La *** est le remède à tous les maux.", answer: "lecture", choices: ["lecture", "sagesse", "patience", "vertu"] },
  { text: "Celui qui n'a pas de mémoire risque de *** ses erreurs.", answer: "répéter", choices: ["répéter", "oublier", "corriger", "vivre"] },
  { text: "La *** commence là où finit la certitude.", answer: "pensée", choices: ["pensée", "science", "foi", "liberté"] },
  { text: "Connais-toi *** et tu connaîtras l'univers et les dieux.", answer: "toi-même", choices: ["toi-même", "par l'étude", "par l'autre", "par l'expérience"] },
];

type Letter = { char: string; id: number };

function getParisDateStr() {
  const paris = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" }));
  const y = paris.getFullYear();
  const m = String(paris.getMonth() + 1).padStart(2, "0");
  const d = String(paris.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getDayIndex(arr: any[]) {
  const paris = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" }));
  const refParis = new Date(new Date("2026-05-17T00:00:00").toLocaleString("en-US", { timeZone: "Europe/Paris" }));
  const diffDays = Math.floor((paris.getTime() - refParis.getTime()) / 86400000);
  return Math.abs(diffDays) % arr.length;
}

function shuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getAnagramme(word: string, seed: number): string {
  const letters = word.split("");
  const shuffled = shuffle(letters, seed);
  if (shuffled.join("") === word) {
    const tmp = shuffled[0];
    shuffled[0] = shuffled[shuffled.length - 1];
    shuffled[shuffled.length - 1] = tmp;
  }
  return shuffled.join("");
}

// Fallback localStorage pour les non-connectés
function getLocalKeys(date: string) {
  return {
    defKey:   `lx_def_guest_${date}`,
    anagKey:  `lx_anag_guest_${date}`,
    citKey:   `lx_cit_guest_${date}`,
    pDefKey:  `lx_pdef_guest_${date}`,
    pAnagKey: `lx_panag_guest_${date}`,
    pCitKey:  `lx_pcit_guest_${date}`,
  };
}

export default function JeuxPage() {
  const supabase = createClient();

  const [userId, setUserId]           = useState<string | null | undefined>(undefined);
  const [isPremium, setIsPremium]     = useState(false);
  const [xpGained, setXpGained]       = useState<number | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Jeux gratuits
  const [defAnswer, setDefAnswer]       = useState<string | null>(null);
  const [anagLetters, setAnagLetters]   = useState<Letter[]>([]);
  const [anagSelected, setAnagSelected] = useState<Letter[]>([]);
  const [anagResult, setAnagResult]     = useState<boolean | null>(null);
  const [citAnswer, setCitAnswer]       = useState<string | null>(null);

  // Jeux Premium
  const [pDefAnswer, setPDefAnswer]       = useState<string | null>(null);
  const [pAnagLetters, setPAnagLetters]   = useState<Letter[]>([]);
  const [pAnagSelected, setPAnagSelected] = useState<Letter[]>([]);
  const [pAnagResult, setPAnagResult]     = useState<boolean | null>(null);
  const [pCitAnswer, setPCitAnswer]       = useState<string | null>(null);

  const todayStr = getParisDateStr();
  const dayIdx   = getDayIndex(GAME_WORDS);
  const pDayIdx  = getDayIndex(PREMIUM_WORDS);

  // Calculs jeux du jour
  const shuffledForWord = shuffle([...Array(GAME_WORDS.length).keys()], 11111);
  const shuffledForDef  = shuffle([...Array(GAME_WORDS.length).keys()], 22222);
  const shuffledForAnag = shuffle([...Array(GAME_WORDS.length).keys()], 77777);
  const wordIdx = shuffledForWord[dayIdx % GAME_WORDS.length];
  let defIdx    = shuffledForDef[dayIdx % GAME_WORDS.length];
  let anagIdx   = shuffledForAnag[dayIdx % GAME_WORDS.length];
  if (defIdx === wordIdx) defIdx = (defIdx + 1) % GAME_WORDS.length;
  if (anagIdx === wordIdx || anagIdx === defIdx) anagIdx = (anagIdx + 2) % GAME_WORDS.length;
  const wordOfDay    = GAME_WORDS[wordIdx];
  const defWord      = GAME_WORDS[defIdx];
  const anagWord     = GAME_WORDS[anagIdx];
  const citation     = CITATIONS[getDayIndex(CITATIONS)];
  const anagramme    = getAnagramme(anagWord.word, dayIdx * 31337);
  const wrongChoices = GAME_WORDS.filter(w => w.word !== defWord.word).slice(0, 3).map(w => w.word);
  const defChoices   = shuffle([defWord.word, ...wrongChoices], dayIdx * 99991);

  const pShuffledForWord = shuffle([...Array(PREMIUM_WORDS.length).keys()], 44444);
  const pShuffledForDef  = shuffle([...Array(PREMIUM_WORDS.length).keys()], 55555);
  const pShuffledForAnag = shuffle([...Array(PREMIUM_WORDS.length).keys()], 88888);
  const pWordIdx = pShuffledForWord[pDayIdx % PREMIUM_WORDS.length];
  let pDefIdx    = pShuffledForDef[pDayIdx % PREMIUM_WORDS.length];
  let pAnagIdx   = pShuffledForAnag[pDayIdx % PREMIUM_WORDS.length];
  if (pDefIdx === pWordIdx) pDefIdx = (pDefIdx + 1) % PREMIUM_WORDS.length;
  if (pAnagIdx === pWordIdx || pAnagIdx === pDefIdx) pAnagIdx = (pAnagIdx + 2) % PREMIUM_WORDS.length;
  const pWordOfDay    = PREMIUM_WORDS[pWordIdx];
  const pDefWord      = PREMIUM_WORDS[pDefIdx];
  const pAnagWord     = PREMIUM_WORDS[pAnagIdx];
  const pCitation     = PREMIUM_CITATIONS[getDayIndex(PREMIUM_CITATIONS)];
  const pAnagramme    = getAnagramme(pAnagWord.word, pDayIdx * 73331);
  const pWrongChoices = PREMIUM_WORDS.filter(w => w.word !== pDefWord.word).slice(0, 3).map(w => w.word);
  const pDefChoices   = shuffle([pDefWord.word, ...pWrongChoices], pDayIdx * 11117);

  // Étape 1 : charge session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const uid = session?.user?.id ?? null;
      setUserId(uid);
      if (uid) {
        supabase.from("profiles").select("is_premium").eq("id", uid).single()
          .then(({ data }) => { if (data?.is_premium) setIsPremium(true); });
      }
    });
  }, []);

  // Étape 2 : charge état des jeux depuis Supabase ou localStorage
  useEffect(() => {
    if (userId === undefined) return;
    if (initialized) return;
    setInitialized(true);

    if (userId) {
      // Connecté → charge depuis Supabase
      supabase
        .from("game_completions")
        .select("*")
        .eq("user_id", userId)
        .eq("game_date", todayStr)
        .maybeSingle()
        .then(({ data }) => {
          if (data) {
            if (data.def_answer)  setDefAnswer(data.def_answer);
            if (data.cit_answer)  setCitAnswer(data.cit_answer);
            if (data.p_def_answer) setPDefAnswer(data.p_def_answer);
            if (data.p_cit_answer) setPCitAnswer(data.p_cit_answer);

            if (data.anag_done) {
              setAnagResult(true);
              setAnagLetters([]);
              setAnagSelected(anagWord.word.split("").map((char, i) => ({ char, id: i })));
            } else {
              setAnagLetters(anagramme.split("").map((char, i) => ({ char, id: i })));
              setAnagSelected([]);
            }

            if (data.p_anag_done) {
              setPAnagResult(true);
              setPAnagLetters([]);
              setPAnagSelected(pAnagWord.word.split("").map((char, i) => ({ char, id: i })));
            } else {
              setPAnagLetters(pAnagramme.split("").map((char, i) => ({ char, id: i })));
              setPAnagSelected([]);
            }
          } else {
            // Pas encore joué aujourd'hui
            setAnagLetters(anagramme.split("").map((char, i) => ({ char, id: i })));
            setPAnagLetters(pAnagramme.split("").map((char, i) => ({ char, id: i })));
          }
        });
    } else {
      // Non connecté → localStorage
      const keys = getLocalKeys(todayStr);
      const savedDef   = localStorage.getItem(keys.defKey);
      const savedAnag  = localStorage.getItem(keys.anagKey);
      const savedCit   = localStorage.getItem(keys.citKey);
      const savedPDef  = localStorage.getItem(keys.pDefKey);
      const savedPAnag = localStorage.getItem(keys.pAnagKey);
      const savedPCit  = localStorage.getItem(keys.pCitKey);

      if (savedDef)  setDefAnswer(savedDef);
      if (savedCit)  setCitAnswer(savedCit);
      if (savedPDef) setPDefAnswer(savedPDef);
      if (savedPCit) setPCitAnswer(savedPCit);

      if (savedAnag) {
        setAnagResult(savedAnag === "true");
        setAnagLetters([]);
        setAnagSelected(anagWord.word.split("").map((char, i) => ({ char, id: i })));
      } else {
        setAnagLetters(anagramme.split("").map((char, i) => ({ char, id: i })));
        setAnagSelected([]);
      }

      if (savedPAnag) {
        setPAnagResult(savedPAnag === "true");
        setPAnagLetters([]);
        setPAnagSelected(pAnagWord.word.split("").map((char, i) => ({ char, id: i })));
      } else {
        setPAnagLetters(pAnagramme.split("").map((char, i) => ({ char, id: i })));
        setPAnagSelected([]);
      }
    }
  }, [userId]);

  // Sauvegarde dans Supabase (upsert)
  async function saveToSupabase(updates: Record<string, any>) {
    if (!userId) return;
    await supabase.from("game_completions").upsert(
      { user_id: userId, game_date: todayStr, ...updates },
      { onConflict: "user_id,game_date" }
    );
  }

  async function addXp(amount: number) {
    if (!userId) return;
    const bonus = isPremium ? Math.round(amount * 1.5) : amount;
    const { data } = await supabase.from("profiles").select("xp").eq("id", userId).single();
    await supabase.from("profiles").update({ xp: (data?.xp ?? 0) + bonus }).eq("id", userId);
    setXpGained(bonus);
    setTimeout(() => setXpGained(null), 3000);
    window.dispatchEvent(new CustomEvent("lexistory:story-read"));
  }

  async function addXpNoBoost(amount: number) {
    if (!userId) return;
    const { data } = await supabase.from("profiles").select("xp").eq("id", userId).single();
    await supabase.from("profiles").update({ xp: (data?.xp ?? 0) + amount }).eq("id", userId);
    setXpGained(amount);
    setTimeout(() => setXpGained(null), 3000);
    window.dispatchEvent(new CustomEvent("lexistory:story-read"));
  }

  // Handlers gratuits
  function handleDefAnswer(choice: string) {
    if (defAnswer) return;
    setDefAnswer(choice);
    if (userId) saveToSupabase({ def_answer: choice });
    else localStorage.setItem(getLocalKeys(todayStr).defKey, choice);
    if (choice === defWord.word) addXp(3);
  }

  function handleAnagClick(letter: Letter) {
    if (anagResult !== null) return;
    setAnagLetters(prev => prev.filter(l => l.id !== letter.id));
    setAnagSelected(prev => [...prev, letter]);
  }
  function handleAnagDeselect(letter: Letter) {
    if (anagResult !== null) return;
    setAnagSelected(prev => prev.filter(l => l.id !== letter.id));
    setAnagLetters(prev => [...prev, letter]);
  }
  function handleAnagSubmit() {
    if (anagResult !== null || anagSelected.length === 0) return;
    const answer = anagSelected.map(l => l.char).join("");
    const correct = answer.toLowerCase() === anagWord.word.toLowerCase();
    setAnagResult(correct);
    if (userId) saveToSupabase({ anag_done: correct });
    else localStorage.setItem(getLocalKeys(todayStr).anagKey, correct.toString());
    if (correct) addXp(3);
  }

  function handleCitAnswer(choice: string) {
    if (citAnswer) return;
    setCitAnswer(choice);
    if (userId) saveToSupabase({ cit_answer: choice });
    else localStorage.setItem(getLocalKeys(todayStr).citKey, choice);
    if (choice === citation.answer) addXp(3);
  }

  // Handlers Premium
  function handlePDefAnswer(choice: string) {
    if (!isPremium || pDefAnswer) return;
    setPDefAnswer(choice);
    if (userId) saveToSupabase({ p_def_answer: choice });
    else localStorage.setItem(getLocalKeys(todayStr).pDefKey, choice);
    if (choice === pDefWord.word) addXpNoBoost(3);
  }

  function handlePAnagClick(letter: Letter) {
    if (!isPremium || pAnagResult !== null) return;
    setPAnagLetters(prev => prev.filter(l => l.id !== letter.id));
    setPAnagSelected(prev => [...prev, letter]);
  }
  function handlePAnagDeselect(letter: Letter) {
    if (!isPremium || pAnagResult !== null) return;
    setPAnagSelected(prev => prev.filter(l => l.id !== letter.id));
    setPAnagLetters(prev => [...prev, letter]);
  }
  function handlePAnagSubmit() {
    if (!isPremium || pAnagResult !== null || pAnagSelected.length === 0) return;
    const answer = pAnagSelected.map(l => l.char).join("");
    const correct = answer.toLowerCase() === pAnagWord.word.toLowerCase();
    setPAnagResult(correct);
    if (userId) saveToSupabase({ p_anag_done: correct });
    else localStorage.setItem(getLocalKeys(todayStr).pAnagKey, correct.toString());
    if (correct) addXpNoBoost(3);
  }

  function handlePCitAnswer(choice: string) {
    if (!isPremium || pCitAnswer) return;
    setPCitAnswer(choice);
    if (userId) saveToSupabase({ p_cit_answer: choice });
    else localStorage.setItem(getLocalKeys(todayStr).pCitKey, choice);
    if (choice === pCitation.answer) addXpNoBoost(3);
  }

  const citParts  = citation.text.split("***");
  const pCitParts = pCitation.text.split("***");

  if (userId === undefined) {
    return (
      <div className={styles.page} style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <div style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}>Chargement...</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>🎮 Jeux du jour</h1>
        <p className={styles.subtitle}>Renouvelés chaque jour à minuit — heure de Paris · Jour {dayIdx + 1}/30</p>
      </div>

      <div className={styles.sectionTitle}>📚 Jeux du jour</div>
      <div className={styles.grid}>

        <div className={`${styles.card} ${styles.cardWide}`}>
          <div className={styles.cardTag}>📖 Mot du jour</div>
          <div className={styles.motDuJour}>
            <div className={styles.mot}>{wordOfDay.word}</div>
            <div className={styles.motEtym}>{wordOfDay.etym}</div>
            <div className={styles.motDef}>{wordOfDay.def}</div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTag}>🔍 Définition mystère</div>
          <p className={styles.cardDesc}>Quel mot correspond à cette définition ?</p>
          <div className={styles.defBox}>{defWord.def}</div>
          <div className={styles.choices}>
            {defChoices.map(choice => (
              <button key={choice}
                className={`${styles.choiceBtn} ${defAnswer ? choice === defWord.word ? styles.correct : choice === defAnswer ? styles.wrong : styles.disabled : ""}`}
                onClick={() => handleDefAnswer(choice)} disabled={!!defAnswer}>
                {choice}
              </button>
            ))}
          </div>
          {defAnswer && (
            <div className={defAnswer === defWord.word ? styles.resultOk : styles.resultKo}>
              {defAnswer === defWord.word ? "✅ Bravo ! +3 XP" : `❌ C'était : ${defWord.word}`}
            </div>
          )}
          {!userId && <div className={styles.loginHint}>Connecte-toi pour gagner des XP !</div>}
        </div>

        <div className={styles.card}>
          <div className={styles.cardTag}>🔤 Anagramme</div>
          <p className={styles.cardDesc}>Reconstitue le mot en cliquant sur les lettres :</p>
          <div className={styles.anagHint}>{anagWord.def}</div>
          {anagResult === null ? (
            <>
              <div className={styles.anagramme}>
                {anagLetters.map(l => (
                  <span key={l.id} className={`${styles.letter} ${styles.letterClickable}`}
                    onClick={() => handleAnagClick(l)}>{l.char}</span>
                ))}
              </div>
              <div className={styles.anagAnswer}>
                {anagSelected.length === 0
                  ? <span className={styles.anagPlaceholder}>Clique sur les lettres...</span>
                  : anagSelected.map(l => (
                    <span key={l.id} className={`${styles.letter} ${styles.letterSelected}`}
                      onClick={() => handleAnagDeselect(l)}>{l.char}</span>
                  ))
                }
              </div>
              {anagSelected.length === anagramme.length && (
                <button className={styles.submitBtn} onClick={handleAnagSubmit}>Valider →</button>
              )}
            </>
          ) : (
            <div className={anagResult ? styles.resultOk : styles.resultKo}>
              {anagResult ? "✅ Bravo ! +3 XP" : `❌ C'était : ${anagWord.word}`}
              {!anagResult && (
                <div className={styles.anagramme} style={{ marginTop: 8 }}>
                  {anagWord.word.split("").map((l, i) => <span key={i} className={styles.letter}>{l}</span>)}
                </div>
              )}
            </div>
          )}
          {!userId && <div className={styles.loginHint}>Connecte-toi pour gagner des XP !</div>}
        </div>

        <div className={`${styles.card} ${styles.cardWide}`}>
          <div className={styles.cardTag}>💬 Citation du jour</div>
          <p className={styles.cardDesc}>Quel mot manque dans cette citation ?</p>
          <div className={styles.citText}>
            {citParts[0]}
            <span className={citAnswer ? citAnswer === citation.answer ? styles.citBlankCorrect : styles.citBlankWrong : styles.citBlank}>
              {citAnswer ? citation.answer : "_ _ _ _ _"}
            </span>
            {citParts[1]}
          </div>
          <div className={styles.choices}>
            {citation.choices.map(choice => (
              <button key={choice}
                className={`${styles.choiceBtn} ${citAnswer ? choice === citation.answer ? styles.correct : choice === citAnswer ? styles.wrong : styles.disabled : ""}`}
                onClick={() => handleCitAnswer(choice)} disabled={!!citAnswer}>
                {choice}
              </button>
            ))}
          </div>
          {citAnswer && (
            <div className={citAnswer === citation.answer ? styles.resultOk : styles.resultKo}>
              {citAnswer === citation.answer ? "✅ Bravo ! +3 XP" : `❌ C'était : ${citation.answer}`}
            </div>
          )}
          {!userId && <div className={styles.loginHint}>Connecte-toi pour gagner des XP !</div>}
        </div>
      </div>

      <div className={styles.sectionTitle}>
        ✨ Jeux Premium <span className={styles.premiumBadge}>Premium</span>
      </div>
      <div className={`${styles.grid} ${!isPremium ? styles.blurredSection : ""}`}>

        <div className={`${styles.card} ${styles.cardWide} ${styles.premiumCard}`}>
          <div className={styles.cardTag}>📖 Mot Premium du jour</div>
          <div className={styles.motDuJour}>
            <div className={styles.mot}>{pWordOfDay.word}</div>
            <div className={styles.motEtym}>{pWordOfDay.etym}</div>
            <div className={styles.motDef}>{pWordOfDay.def}</div>
          </div>
        </div>

        <div className={`${styles.card} ${styles.premiumCard}`}>
          <div className={styles.cardTag}>🔍 Définition Expert</div>
          <p className={styles.cardDesc}>Quel mot savant correspond à cette définition ?</p>
          <div className={styles.defBox}>{pDefWord.def}</div>
          <div className={styles.choices}>
            {pDefChoices.map(choice => (
              <button key={choice}
                className={`${styles.choiceBtn} ${pDefAnswer ? choice === pDefWord.word ? styles.correct : choice === pDefAnswer ? styles.wrong : styles.disabled : ""}`}
                onClick={() => handlePDefAnswer(choice)} disabled={!!pDefAnswer || !isPremium}>
                {choice}
              </button>
            ))}
          </div>
          {pDefAnswer && (
            <div className={pDefAnswer === pDefWord.word ? styles.resultOk : styles.resultKo}>
              {pDefAnswer === pDefWord.word ? "✅ Bravo ! +3 XP" : `❌ C'était : ${pDefWord.word}`}
            </div>
          )}
        </div>

        <div className={`${styles.card} ${styles.premiumCard}`}>
          <div className={styles.cardTag}>🔤 Anagramme Expert</div>
          <p className={styles.cardDesc}>Reconstitue ce mot difficile :</p>
          <div className={styles.anagHint}>{pAnagWord.def}</div>
          {pAnagResult === null ? (
            <>
              <div className={styles.anagramme}>
                {pAnagLetters.map(l => (
                  <span key={l.id} className={`${styles.letter} ${isPremium ? styles.letterClickable : ""}`}
                    onClick={() => handlePAnagClick(l)}>{l.char}</span>
                ))}
              </div>
              <div className={styles.anagAnswer}>
                {pAnagSelected.length === 0
                  ? <span className={styles.anagPlaceholder}>Clique sur les lettres...</span>
                  : pAnagSelected.map(l => (
                    <span key={l.id} className={`${styles.letter} ${styles.letterSelected}`}
                      onClick={() => handlePAnagDeselect(l)}>{l.char}</span>
                  ))
                }
              </div>
              {isPremium && pAnagSelected.length === pAnagramme.length && (
                <button className={styles.submitBtn} onClick={handlePAnagSubmit}>Valider →</button>
              )}
            </>
          ) : (
            <div className={pAnagResult ? styles.resultOk : styles.resultKo}>
              {pAnagResult ? "✅ Bravo ! +3 XP" : `❌ C'était : ${pAnagWord.word}`}
              {!pAnagResult && (
                <div className={styles.anagramme} style={{ marginTop: 8 }}>
                  {pAnagWord.word.split("").map((l, i) => <span key={i} className={styles.letter}>{l}</span>)}
                </div>
              )}
            </div>
          )}
        </div>

        <div className={`${styles.card} ${styles.cardWide} ${styles.premiumCard}`}>
          <div className={styles.cardTag}>💬 Citation Philosophique</div>
          <p className={styles.cardDesc}>Complète cette citation de philosophe :</p>
          <div className={styles.citText}>
            {pCitParts[0]}
            <span className={pCitAnswer ? pCitAnswer === pCitation.answer ? styles.citBlankCorrect : styles.citBlankWrong : styles.citBlank}>
              {pCitAnswer ? pCitation.answer : "_ _ _ _ _"}
            </span>
            {pCitParts[1]}
          </div>
          <div className={styles.choices}>
            {pCitation.choices.map(choice => (
              <button key={choice}
                className={`${styles.choiceBtn} ${pCitAnswer ? choice === pCitation.answer ? styles.correct : choice === pCitAnswer ? styles.wrong : styles.disabled : ""}`}
                onClick={() => handlePCitAnswer(choice)} disabled={!!pCitAnswer || !isPremium}>
                {choice}
              </button>
            ))}
          </div>
          {pCitAnswer && (
            <div className={pCitAnswer === pCitation.answer ? styles.resultOk : styles.resultKo}>
              {pCitAnswer === pCitation.answer ? "✅ Bravo ! +3 XP" : `❌ C'était : ${pCitation.answer}`}
            </div>
          )}
        </div>
      </div>

      {!isPremium && (
        <div className={styles.premiumCta}>
          <p>Débloque les jeux Premium pour +9 XP supplémentaires par jour</p>
          <a href="/profile" className={styles.premiumCtaBtn}>Passer Premium — 1,99€/mois →</a>
        </div>
      )}

      {xpGained !== null && (
        <div className={styles.xpPopup}>+{xpGained} XP ✨</div>
      )}
      <a href="/" className={styles.back}>← Retour aux histoires</a>
    </div>
  );
}
