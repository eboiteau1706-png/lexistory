import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── Données statiques (identiques à app/jeux/page.tsx) ──────────────────────
const GAME_WORDS = [
  { word: "amygdale",        def: "Petite partie du cerveau en forme d'amande qui gère nos émotions, surtout la peur.",                etym: "Du grec amygdalê, amande" },
  { word: "empathie",        def: "Se mettre à la place des autres et ressentir ce qu'ils ressentent.",                                etym: "Du grec empatheia, passion" },
  { word: "biais",           def: "Une erreur que notre cerveau fait sans s'en rendre compte.",                                        etym: "Du vieux français biais, de travers" },
  { word: "lucidité",        def: "Voir les choses clairement, sans se mentir. Savoir regarder la vérité en face.",                    etym: "Du latin luciditas, clarté" },
  { word: "dopamine",        def: "Une substance que ton cerveau fabrique quand tu fais quelque chose de plaisant.",                   etym: "De dopa (acide aminé) + amine" },
  { word: "chlorophylle",    def: "La substance verte dans les feuilles qui capte la lumière du soleil pour nourrir la plante.",       etym: "Du grec chloros (vert) + phyllon (feuille)" },
  { word: "atmosphère",      def: "L'enveloppe d'air qui entoure la Terre. L'air qu'on respire en très grande quantité.",             etym: "Du grec atmos (vapeur) + sphaira (sphère)" },
  { word: "introspection",   def: "Se regarder à l'intérieur de soi pour comprendre ce qu'on ressent vraiment.",                      etym: "Du latin introspicere, regarder à l'intérieur" },
  { word: "stoïcisme",       def: "Une philosophie qui apprend à rester calme et fort face aux difficultés de la vie.",                etym: "Du grec Stoa, portique où enseignait Zénon" },
  { word: "équanimité",      def: "Rester calme et serein quoi qu'il arrive.",                                                         etym: "Du latin aequanimitas, égalité d'âme" },
  { word: "métaphore",       def: "Quand on décrit quelque chose en utilisant les mots d'une autre chose.",                            etym: "Du grec metaphora, transport" },
  { word: "gravitation",     def: "La force qui attire tous les objets vers le bas et qui fait tourner les planètes autour du soleil.", etym: "Du latin gravitas, pesanteur" },
  { word: "neurotransmetteur", def: "Un messager chimique dans le cerveau qui permet aux neurones de communiquer entre eux.",          etym: "Du grec neuron + latin transmittere" },
  { word: "microbiome",      def: "Toutes les bactéries et microbes qui vivent dans ton corps, surtout dans l'intestin.",              etym: "Du grec mikros (petit) + bios (vie)" },
  { word: "séduction",       def: "Le fait de plaire à quelqu'un et de l'attirer vers soi.",                                          etym: "Du latin seducere, emmener à part" },
  { word: "consolidation",   def: "Rendre quelque chose solide et durable. La consolidation d'un souvenir = le fixer pour qu'il reste longtemps.", etym: "Du latin consolidare, rendre solide" },
  { word: "paradoxal",       def: "Qui semble contradictoire. Le sommeil paradoxal est paradoxal car le cerveau est très actif alors qu'on dort.", etym: "Du grec paradoxos, contraire à l'opinion" },
  { word: "effervescence",   def: "Beaucoup d'agitation et d'enthousiasme. Un lieu plein d'effervescence = où ça bouge.",             etym: "Du latin effervescere, bouillonner" },
  { word: "humanisme",       def: "Une façon de penser qui met l'être humain au centre de tout.",                                      etym: "Du latin humanus, humain" },
  { word: "causalité",       def: "Le fait qu'une chose en cause une autre. La pluie est la cause de la flaque.",                     etym: "Du latin causalitas, rapport de cause à effet" },
  { word: "flamant",         def: "Un grand oiseau avec de longues pattes roses qui vit dans les marais.",                             etym: "Du latin flamant, couleur de flamme" },
  { word: "pigments",        def: "Des substances colorantes qui donnent leur couleur aux plantes et animaux.",                        etym: "Du latin pigmentum, couleur" },
  { word: "diffusion",       def: "Quand quelque chose se répand partout. Comme une odeur qui se diffuse dans la pièce.",              etym: "Du latin diffusio, épandage" },
  { word: "abyssales",       def: "Des profondeurs immenses de l'océan, les endroits les plus profonds de la mer.",                    etym: "Du grec abyssos, sans fond" },
  { word: "eudaimonia",      def: "Un bonheur profond qui vient d'une vie bien vécue, pas juste du plaisir immédiat.",                etym: "Du grec eu (bien) + daimon (génie)" },
  { word: "mnésique",        def: "Qui concerne la mémoire. La consolidation mnésique = comment les souvenirs se fixent dans notre mémoire.", etym: "Du grec mneme, mémoire" },
  { word: "caroténoïdes",    def: "Des colorants naturels qui donnent leur couleur aux carottes, tomates et flamants.",               etym: "Du grec carota, carotte + eïdos, forme" },
  { word: "glymphatique",    def: "Le système de nettoyage du cerveau qui fonctionne pendant qu'on dort, comme un lave-vaisselle.",   etym: "De glie (cellules cérébrales) + lymphatique" },
  { word: "eurêka",          def: "Ce qu'on crie quand on trouve soudainement la solution à un problème. Mot crié par Archimède dans son bain.", etym: "Du grec heureka, j'ai trouvé" },
  { word: "qualia",          def: "La façon dont les choses nous semblent ressenties de l'intérieur. Le rouge de ta vision, la douleur que tu sens.", etym: "Du latin qualis, de quelle nature" },
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

const PREMIUM_WORDS = [
  { word: "apophtegme",    def: "Une courte parole mémorable d'un personnage célèbre, souvent pleine de sagesse.",                   etym: "Du grec apophthegma, sentence" },
  { word: "bathyscaphe",   def: "Un engin submersible capable de plonger à de très grandes profondeurs océaniques.",                  etym: "Du grec bathys (profond) + skaphos (bateau)" },
  { word: "chiasme",       def: "Une figure de style qui inverse l'ordre des éléments dans deux propositions parallèles.",             etym: "Du grec khiasmos, disposition en croix" },
  { word: "diastole",      def: "La phase de relaxation du cœur pendant laquelle il se remplit de sang.",                             etym: "Du grec diastolê, dilatation" },
  { word: "épistémologie", def: "La branche de la philosophie qui étudie la nature et les limites de la connaissance humaine.",        etym: "Du grec episteme (connaissance) + logos (discours)" },
  { word: "funambule",     def: "Un acrobate qui marche et fait des exercices sur un fil tendu en hauteur.",                           etym: "Du latin funis (corde) + ambulare (marcher)" },
  { word: "glossolalie",   def: "Le fait de parler une langue inconnue ou incompréhensible, souvent dans un contexte religieux.",      etym: "Du grec glossa (langue) + lalein (parler)" },
  { word: "hégémonie",     def: "La domination politique, culturelle ou militaire d'un État ou d'un groupe sur les autres.",           etym: "Du grec hegemonia, commandement" },
  { word: "iconoclaste",   def: "Quelqu'un qui remet en question les idées reçues et les conventions établies.",                       etym: "Du grec eikon (image) + klastes (briseur)" },
  { word: "jactance",      def: "Une façon de parler de soi avec trop de fierté et de se vanter excessivement.",                      etym: "Du latin jactantia, arrogance" },
  { word: "kénose",        def: "En théologie, l'acte par lequel Dieu s'est dépouillé de sa puissance divine en s'incarnant.",        etym: "Du grec kenosis, vidage" },
  { word: "logorrhée",     def: "Un flux de paroles excessif et incontrôlé, souvent difficile à arrêter.",                            etym: "Du grec logos (parole) + rhein (couler)" },
  { word: "mnémotechnique", def: "Une technique ou un procédé qui aide à mémoriser des informations plus facilement.",                etym: "Du grec mneme (mémoire) + tekhne (art)" },
  { word: "néologisme",    def: "Un mot nouveau créé dans une langue pour désigner une réalité nouvelle.",                             etym: "Du grec neos (nouveau) + logos (mot)" },
  { word: "ontologie",     def: "La branche de la philosophie qui étudie la nature de l'être et de l'existence.",                     etym: "Du grec ontos (être) + logos (discours)" },
  { word: "palimpseste",   def: "Un manuscrit dont on a effacé l'écriture pour écrire à nouveau, mais dont des traces subsistent.",   etym: "Du grec palimpsestos, gratté de nouveau" },
  { word: "quaternaire",   def: "La dernière période géologique, commençant il y a 2,6 millions d'années et incluant l'ère actuelle.", etym: "Du latin quaternarius, groupe de quatre" },
  { word: "réification",   def: "Le fait de traiter une abstraction ou une personne comme si c'était une chose matérielle.",           etym: "Du latin res (chose) + facere (faire)" },
  { word: "syllogisme",    def: "Un raisonnement logique en trois étapes : deux prémisses et une conclusion qui en découle.",          etym: "Du grec syllogismos, calcul" },
  { word: "tautologie",    def: "Une répétition inutile de la même idée avec des mots différents, sans rien ajouter.",                etym: "Du grec tauto (même) + logos (parole)" },
  { word: "ubiquité",      def: "La capacité d'être présent partout en même temps ou en de nombreux endroits simultanément.",          etym: "Du latin ubique, partout" },
  { word: "véridique",     def: "Qui dit la vérité, qui est conforme à la réalité et aux faits réels.",                               etym: "Du latin veridicus, qui dit vrai" },
  { word: "xénophilie",    def: "L'attrait et l'affection pour les étrangers, les cultures et les coutumes étrangères.",               etym: "Du grec xenos (étranger) + philos (ami)" },
  { word: "zeugme",        def: "Une figure de style qui relie un verbe à deux compléments de nature ou de sens très différents.",     etym: "Du grec zeugma, lien" },
  { word: "acméisme",      def: "Un mouvement poétique russe du début du XXe siècle prônant la clarté et la précision du langage.",   etym: "Du grec akme, sommet" },
  { word: "bovarysme",     def: "La tendance à se percevoir autrement qu'on est réellement et à idéaliser sa propre existence.",       etym: "Du personnage Emma Bovary de Flaubert" },
  { word: "catharsis",     def: "La purification émotionnelle que ressent le spectateur devant une œuvre tragique.",                   etym: "Du grec katharsis, purification" },
  { word: "doxologie",     def: "Une formule liturgique de louange à Dieu, souvent chantée à la fin d'une prière.",                   etym: "Du grec doxa (gloire) + logos (parole)" },
  { word: "eschatologie",  def: "La partie de la théologie qui traite des dernières fins de l'homme et de l'univers.",                 etym: "Du grec eskhatos (dernier) + logos (discours)" },
  { word: "frugalité",     def: "La qualité de celui qui se contente de peu et évite les dépenses et les plaisirs excessifs.",         etym: "Du latin frugalitas, sobriété" },
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

// ── Helpers (identiques à jeux/page.tsx) ─────────────────────────────────────
function getDayIndex(arr: any[], dateStr: string): number {
  const paris = new Date(new Date(dateStr + "T12:00:00").toLocaleString("en-US", { timeZone: "Europe/Paris" }));
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

export async function GET(request: NextRequest) {
  const date = new URL(request.url).searchParams.get("date");
  if (!date) return NextResponse.json({ error: "date required" }, { status: 400 });

  // Fetch custom override from Supabase
  const { data: cg } = await supabaseAdmin
    .from("games_custom")
    .select("*")
    .eq("game_date", date)
    .maybeSingle();

  // ── Free game indices (seeds 11111/22222/77777 — identiques à jeux/page.tsx) ─
  const dayIdx = getDayIndex(GAME_WORDS, date);
  const citIdx = getDayIndex(CITATIONS, date);
  const shuffledForWord = shuffle([...Array(GAME_WORDS.length).keys()], 11111);
  const shuffledForDef  = shuffle([...Array(GAME_WORDS.length).keys()], 22222);
  const shuffledForAnag = shuffle([...Array(GAME_WORDS.length).keys()], 77777);
  const wordIdx = shuffledForWord[dayIdx % GAME_WORDS.length];
  let defIdx    = shuffledForDef[dayIdx % GAME_WORDS.length];
  let anagIdx   = shuffledForAnag[dayIdx % GAME_WORDS.length];
  if (defIdx === wordIdx) defIdx = (defIdx + 1) % GAME_WORDS.length;
  if (anagIdx === wordIdx || anagIdx === defIdx) anagIdx = (anagIdx + 2) % GAME_WORDS.length;

  const staticWord  = GAME_WORDS[wordIdx];
  const staticDef   = GAME_WORDS[defIdx];
  const staticAnag  = GAME_WORDS[anagIdx];
  const staticCit   = CITATIONS[citIdx];
  const wrongChoices       = GAME_WORDS.filter(w => w.word !== staticDef.word).slice(0, 3).map(w => w.word);
  const defChoicesFallback = shuffle([staticDef.word, ...wrongChoices], dayIdx * 99991);

  // ── Premium game indices (seeds 44444/55555/88888 — identiques à jeux/page.tsx) ─
  const pDayIdx = getDayIndex(PREMIUM_WORDS, date);
  const pCitIdx = getDayIndex(PREMIUM_CITATIONS, date);
  const pShuffledForWord = shuffle([...Array(PREMIUM_WORDS.length).keys()], 44444);
  const pShuffledForDef  = shuffle([...Array(PREMIUM_WORDS.length).keys()], 55555);
  const pShuffledForAnag = shuffle([...Array(PREMIUM_WORDS.length).keys()], 88888);
  const pWordIdx = pShuffledForWord[pDayIdx % PREMIUM_WORDS.length];
  let pDefIdx    = pShuffledForDef[pDayIdx % PREMIUM_WORDS.length];
  let pAnagIdx   = pShuffledForAnag[pDayIdx % PREMIUM_WORDS.length];
  if (pDefIdx === pWordIdx) pDefIdx = (pDefIdx + 1) % PREMIUM_WORDS.length;
  if (pAnagIdx === pWordIdx || pAnagIdx === pDefIdx) pAnagIdx = (pAnagIdx + 2) % PREMIUM_WORDS.length;

  const pStaticWord  = PREMIUM_WORDS[pWordIdx];
  const pStaticDef   = PREMIUM_WORDS[pDefIdx];
  const pStaticAnag  = PREMIUM_WORDS[pAnagIdx];
  const pStaticCit   = PREMIUM_CITATIONS[pCitIdx];
  const pWrongChoices       = PREMIUM_WORDS.filter(w => w.word !== pStaticDef.word).slice(0, 3).map(w => w.word);
  const pDefChoicesFallback = shuffle([pStaticDef.word, ...pWrongChoices], pDayIdx * 11117);

  // Effective game = custom override when set, static fallback otherwise
  const effective = {
    // Free games
    word_of_day:      (cg?.word_of_day      || "") || staticWord.word,
    word_of_day_def:  (cg?.word_of_day_def  || "") || staticWord.def,
    word_of_day_etym: (cg?.word_of_day_etym || "") || staticWord.etym,
    def_word:         (cg?.def_word         || "") || staticDef.word,
    def_word_def:     (cg?.def_word_def     || "") || staticDef.def,
    def_choice1:      (cg?.def_choice1      || "") || defChoicesFallback[0] || "",
    def_choice2:      (cg?.def_choice2      || "") || defChoicesFallback[1] || "",
    def_choice3:      (cg?.def_choice3      || "") || defChoicesFallback[2] || "",
    def_choice4:      (cg?.def_choice4      || "") || defChoicesFallback[3] || "",
    anag_word:        (cg?.anag_word        || "") || staticAnag.word,
    anag_word_def:    (cg?.anag_word_def    || "") || staticAnag.def,
    cit_text:         (cg?.cit_text         || "") || staticCit.text,
    cit_answer:       (cg?.cit_answer       || "") || staticCit.answer,
    cit_choice1:      (cg?.cit_choice1      || "") || (staticCit.choices[0] || ""),
    cit_choice2:      (cg?.cit_choice2      || "") || (staticCit.choices[1] || ""),
    cit_choice3:      (cg?.cit_choice3      || "") || (staticCit.choices[2] || ""),
    cit_choice4:      (cg?.cit_choice4      || "") || (staticCit.choices[3] || ""),
    // Premium games — même logique
    p_word_of_day:      (cg?.p_word_of_day      || "") || pStaticWord.word,
    p_word_of_day_def:  (cg?.p_word_of_day_def  || "") || pStaticWord.def,
    p_word_of_day_etym: (cg?.p_word_of_day_etym || "") || pStaticWord.etym,
    p_def_word:         (cg?.p_def_word         || "") || pStaticDef.word,
    p_def_word_def:     (cg?.p_def_word_def     || "") || pStaticDef.def,
    p_def_choice1:      (cg?.p_def_choice1      || "") || pDefChoicesFallback[0] || "",
    p_def_choice2:      (cg?.p_def_choice2      || "") || pDefChoicesFallback[1] || "",
    p_def_choice3:      (cg?.p_def_choice3      || "") || pDefChoicesFallback[2] || "",
    p_def_choice4:      (cg?.p_def_choice4      || "") || pDefChoicesFallback[3] || "",
    p_anag_word:        (cg?.p_anag_word        || "") || pStaticAnag.word,
    p_anag_word_def:    (cg?.p_anag_word_def    || "") || pStaticAnag.def,
    p_cit_text:         (cg?.p_cit_text         || "") || pStaticCit.text,
    p_cit_answer:       (cg?.p_cit_answer       || "") || pStaticCit.answer,
    p_cit_choice1:      (cg?.p_cit_choice1      || "") || (pStaticCit.choices[0] || ""),
    p_cit_choice2:      (cg?.p_cit_choice2      || "") || (pStaticCit.choices[1] || ""),
    p_cit_choice3:      (cg?.p_cit_choice3      || "") || (pStaticCit.choices[2] || ""),
    p_cit_choice4:      (cg?.p_cit_choice4      || "") || (pStaticCit.choices[3] || ""),
  };

  return NextResponse.json({ game: effective, hasCustom: !!cg });
}
