// lib/dictionary.ts
export interface Definition {
  etym:      string;
  defOrig:   string;
  defSimple: string;
}

export const DICT: Record<string, Definition> = {

  "alzheimer": { etym: "Du nom du Dr Alois Alzheimer", defOrig: "Maladie neurodégénérative provoquant une perte progressive de la mémoire.", defSimple: "Une maladie du cerveau qui fait perdre la mémoire petit à petit. Elle touche surtout les personnes âgées." },
  "limbique":        { etym: "Du latin limbus, bordure", defOrig: "Relatif au système cérébral qui gère les émotions et la mémoire.", defSimple: "Une partie du cerveau qui s'occupe de nos émotions et de nos souvenirs." },
  "post-traumatiques":{ etym: "Du latin post (après) + grec trauma (blessure)", defOrig: "Relatifs aux troubles psychologiques survenant après un événement traumatisant.", defSimple: "Qui apparaît après un choc psychologique très fort. Les cauchemars répétés après un accident sont post-traumatiques." },
  "post-traumatique":{ etym: "Du latin post (après) + grec trauma (blessure)", defOrig: "Relatif aux troubles survenant après un événement traumatisant.", defSimple: "Qui survient après un choc psychologique. Le stress post-traumatique = l'anxiété qui reste longtemps après un événement terrible." },
  "grave-le":        { etym: "Du latin graphein, écrire", defOrig: "Impératif du verbe graver, suivi d'un pronom.", defSimple: "Ordre de graver quelque chose, de le marquer profondément. 'Grave-le dans ta mémoire' = souviens-t'en pour toujours." },
  "grave":           { etym: "Du latin gravis, lourd", defOrig: "Qui a de l'importance, de la profondeur ; aussi : action de graver.", defSimple: "Sérieux et important. Ou : marquer profondément. Une situation grave = une situation sérieuse." },
  "veulent":  { etym: "Du latin volere", defOrig: "Troisième personne du pluriel du présent de vouloir.", defSimple: "Ils désirent quelque chose. 'Ils veulent partir' = ils désirent partir." },
  "veut":     { etym: "Du latin volere", defOrig: "Troisième personne du singulier du présent de vouloir.", defSimple: "Il/elle désire quelque chose." },
  "veux":     { etym: "Du latin volere", defOrig: "Première et deuxième personne du présent de vouloir.", defSimple: "Je/tu désires quelque chose." },
  "avaient":  { etym: "Du latin habere", defOrig: "Troisième personne du pluriel de l'imparfait de avoir.", defSimple: "Ils possédaient quelque chose dans le passé." },
  "avait":    { etym: "Du latin habere", defOrig: "Imparfait de avoir.", defSimple: "Il/elle possédait quelque chose dans le passé." },
  "étaient":  { etym: "Du latin esse", defOrig: "Imparfait pluriel de être.", defSimple: "Ils/elles avaient une caractéristique dans le passé." },
  "était":    { etym: "Du latin esse", defOrig: "Imparfait de être.", defSimple: "Il/elle avait une caractéristique dans le passé." },
  "peuvent":  { etym: "Du latin potere", defOrig: "Troisième personne du pluriel du présent de pouvoir.", defSimple: "Ils/elles sont capables de faire quelque chose." },
  "font":     { etym: "Du latin facere", defOrig: "Troisième personne du pluriel du présent de faire.", defSimple: "Ils/elles réalisent quelque chose." },
  "vont":     { etym: "Du latin vadere", defOrig: "Troisième personne du pluriel du présent de aller.", defSimple: "Ils/elles se déplacent vers un endroit." },
  "disent":   { etym: "Du latin dicere", defOrig: "Troisième personne du pluriel du présent de dire.", defSimple: "Ils/elles expriment quelque chose." },
  "voulait":  { etym: "Du latin volere", defOrig: "Imparfait de vouloir.", defSimple: "Il/elle désirait quelque chose dans le passé." },

  // ── MOTS COMMUNS ──────────────────────────────────────────
  "sans":            { etym: "Du latin sine", defOrig: "Préposition exprimant l'absence ou la privation.", defSimple: "Qui n'a pas quelque chose. Sans sucre = pas de sucre dedans." },
  "doute":           { etym: "Du latin dubitare, hésiter", defOrig: "Incertitude de l'esprit qui hésite entre deux jugements.", defSimple: "Quand on n'est pas sûr de quelque chose. Sans doute = probablement." },
  "monde":           { etym: "Du latin mundus", defOrig: "Ensemble de tout ce qui existe ; la Terre et ses habitants.", defSimple: "La planète Terre avec tous les gens et les pays qui y vivent." },
  "nature":          { etym: "Du latin natura", defOrig: "L'ensemble du monde physique non créé par l'homme.", defSimple: "Tout ce qui existe sans que l'homme l'ait fabriqué : forêts, animaux, rivières." },
  "vraiment":        { etym: "De vrai + suffixe -ment", defOrig: "D'une manière vraie, réelle, effective.", defSimple: "Pour de vrai, pas juste pour faire semblant." },
  "souvent":         { etym: "Du latin subinde, fréquemment", defOrig: "Fréquemment, à de nombreuses reprises.", defSimple: "Beaucoup de fois. Pas tout le temps mais régulièrement." },
  "toujours":        { etym: "De tout + jours", defOrig: "En tout temps, à chaque moment, sans exception.", defSimple: "Tout le temps, sans arrêt. Le soleil se lève toujours à l'est." },
  "jamais":          { etym: "Du latin jam magis, déjà plus", defOrig: "En aucun temps, à aucun moment.", defSimple: "Zéro fois, pas une seule fois. Il n'a jamais menti = il n'a pas menti une seule fois." },
  "chaque":          { etym: "Du latin quisque, chacun", defOrig: "Tout, pris un à un, sans exception.", defSimple: "Tous, un par un. Chaque jour = tous les jours." },
  "plusieurs":       { etym: "Du latin pluralis, de plusieurs", defOrig: "Un nombre indéterminé supérieur à deux.", defSimple: "Plus d'un mais pas des centaines. Quelques. Plusieurs amis = 3, 4, 5 amis environ." },

  // ── HISTOIRE: flamant rose (Lecteur) ──────────────────────
  "flamant":         { etym: "Du latin flamant, couleur de flamme", defOrig: "Grand oiseau échassier au plumage rose, aux pattes et cou très longs.", defSimple: "Un grand oiseau avec de longues pattes roses qui vit dans les marais." },
  "emblématiques":   { etym: "Du latin emblema, ornement en relief", defOrig: "Qui constituent le symbole caractéristique d'une chose ou d'un lieu.", defSimple: "Qui représente si bien un endroit qu'on y pense automatiquement. Comme la Tour Eiffel pour Paris." },
  "humides":         { etym: "Du latin humidus", defOrig: "Qui contiennent de l'eau ou sont imprégnés de vapeur d'eau.", defSimple: "Mouillé ou plein d'eau. Comme une éponge ou l'air après la pluie." },
  "fascinant":       { etym: "Du latin fascinare, ensorceler", defOrig: "Qui exerce une attraction irrésistible et captive totalement.", defSimple: "Tellement intéressant qu'on ne peut pas s'en détacher." },
  "poussins":        { etym: "Du latin pullus, petit d'animal", defOrig: "Très jeunes oiseaux qui viennent d'éclore.", defSimple: "Bébés oiseaux tout petits et doux." },
  "alimentation":    { etym: "Du latin alimentum, nourriture", defOrig: "Ensemble des aliments consommés par un être vivant.", defSimple: "Tout ce qu'on mange et boit pour vivre." },
  "progressivement": { etym: "Du latin progressus, avancer", defOrig: "De manière graduelle, par étapes successives.", defSimple: "Petit à petit, pas d'un coup." },
  "plumage":         { etym: "Du latin pluma, plume", defOrig: "Ensemble des plumes qui recouvrent le corps d'un oiseau.", defSimple: "Toutes les plumes d'un oiseau, ses habits naturels." },
  "crustacés":       { etym: "Du latin crusta, coquille", defOrig: "Animaux aquatiques à carapace dure, comme les crabes et crevettes.", defSimple: "Des animaux avec une coquille dure qui vivent dans l'eau. Crabes, crevettes." },
  "caroténoïdes":    { etym: "Du grec carota, carotte + eïdos, forme", defOrig: "Pigments organiques naturels de couleur jaune, orange ou rouge.", defSimple: "Des colorants naturels qui donnent leur couleur aux carottes, tomates et flamants." },
  "pigments":        { etym: "Du latin pigmentum, couleur", defOrig: "Substances qui donnent leur couleur aux êtres vivants.", defSimple: "Des substances colorantes qui donnent leur couleur aux plantes et animaux." },
  "organisme":       { etym: "Du grec organon, instrument", defOrig: "Être vivant considéré dans son ensemble.", defSimple: "Le corps entier d'un être vivant avec tous ses organes." },
  "assimile":        { etym: "Du latin assimilare, rendre semblable", defOrig: "Transforme et intègre une substance pour la rendre utilisable.", defSimple: "Absorber et transformer quelque chose. Ton corps assimile la nourriture en énergie." },
  "terne":           { etym: "Du vieux français, sans éclat", defOrig: "Qui manque d'éclat, de brillance ou de vivacité.", defSimple: "Fade, sans couleur. Comme un vieux t-shirt délavé." },
  "séduction":       { etym: "Du latin seducere, emmener à part", defOrig: "Action de plaire et d'attirer par son charme.", defSimple: "Le fait de plaire à quelqu'un et de l'attirer vers soi." },
  "cosmétiques":     { etym: "Du grec kosmêtikos, qui arrange", defOrig: "Produits de soin et d'embellissement pour le corps.", defSimple: "Les produits pour être beau : rouge à lèvres, crème, shampoing." },

  // ── HISTOIRE: ciel bleu (Curieux) ─────────────────────────
  "atmosphère":      { etym: "Du grec atmos (vapeur) + sphaira (sphère)", defOrig: "Couche de gaz entourant la Terre, maintenue par la gravité.", defSimple: "L'enveloppe d'air qui entoure la Terre. L'air qu'on respire en très grande quantité." },
  "diffusion":       { etym: "Du latin diffusio, épandage", defOrig: "Phénomène par lequel des ondes sont dispersées dans toutes les directions.", defSimple: "Quand quelque chose se répand partout. Comme une odeur qui se diffuse dans la pièce." },
  "arc-en-ciel":     { etym: "De arc + en + ciel", defOrig: "Phénomène optique formant un arc aux couleurs du spectre après la pluie.", defSimple: "Le grand arc coloré dans le ciel après la pluie. Il a 7 couleurs." },
  "particules":      { etym: "Du latin particula, petite partie", defOrig: "Très petites portions de matière.", defSimple: "Des tout petits morceaux. L'air est rempli de particules invisibles." },

  // ── HISTOIRE: biais cognitifs (Érudit) ────────────────────
  "biais":           { etym: "Du vieux français biais, de travers", defOrig: "Tendance systématique à dévier de la pensée rationnelle.", defSimple: "Une erreur que notre cerveau fait sans s'en rendre compte." },
  "cognitifs":       { etym: "Du latin cognoscere, connaître", defOrig: "Relatifs aux processus mentaux de la connaissance.", defSimple: "Qui concerne la façon dont notre cerveau pense et comprend les choses." },
  "rationnelle":     { etym: "Du latin rationalis, conforme à la raison", defOrig: "Fondée sur la raison et la logique, non sur les émotions.", defSimple: "Qui suit la logique. Décision rationnelle = réfléchir avant d'agir." },
  "pernicieux":      { etym: "Du latin perniciosus, qui détruit", defOrig: "Qui cause de graves dommages de façon insidieuse et progressive.", defSimple: "Très dangereux mais de façon cachée. Comme une maladie qui s'installe sans qu'on s'en aperçoive." },
  "corroborent":     { etym: "Du latin corroborare, renforcer", defOrig: "Confirment, appuient la vérité de quelque chose.", defSimple: "Confirmer que quelque chose est vrai. Des preuves qui corroborent = des preuves qui confirment." },
  "introspection":   { etym: "Du latin introspicere, regarder à l'intérieur", defOrig: "Observation et analyse de ses propres pensées et sentiments.", defSimple: "Se regarder à l'intérieur de soi pour comprendre ce qu'on ressent vraiment." },
  "lucidité":        { etym: "Du latin luciditas, clarté", defOrig: "Qualité d'un esprit clair qui voit les choses telles qu'elles sont.", defSimple: "Voir les choses clairement, sans se mentir. Savoir regarder la vérité en face." },

  // ── HISTOIRE: chats ronronnent (Curieux) ──────────────────
  "ronronnement":    { etym: "Onomatopée imitant le bruit", defOrig: "Son continu et régulier produit par un chat en vibrant les cordes vocales.", defSimple: "Le bruit grave et doux que fait un chat quand il est content ou qu'il veut quelque chose." },
  "cordes vocales":  { etym: "Du latin chorda, corde + vocalis, vocal", defOrig: "Replis membraneux dans le larynx qui vibrent pour produire les sons.", defSimple: "Les petites cordes dans ta gorge qui vibrent quand tu parles ou chantes." },
  "vibrent":         { etym: "Du latin vibrare, agiter", defOrig: "Oscillent rapidement dans un mouvement de va-et-vient.", defSimple: "Bougent très vite dans tous les sens. Comme les cordes d'une guitare quand tu les pinces." },
  "empathie":        { etym: "Du grec empatheia, passion", defOrig: "Capacité à ressentir et comprendre les émotions d'autrui.", defSimple: "Se mettre à la place des autres et ressentir ce qu'ils ressentent." },
  "comportement":    { etym: "De comporter, du latin comportare", defOrig: "Manière d'agir et de se conduire dans diverses situations.", defSimple: "La façon dont on agit. Bon comportement = bien se conduire." },
  "intégré":         { etym: "Du latin integrare, rendre entier", defOrig: "Inclus dans un ensemble, incorporé à quelque chose.", defSimple: "Inclus dedans, qui fait partie de. Intégré dans le corps = qui est dans le corps naturellement." },

  // ── HISTOIRE: chocolat (Lecteur) ──────────────────────────
  "denrée":          { etym: "Du latin denariata, valant un denier", defOrig: "Produit alimentaire ou marchandise, surtout quand il est rare.", defSimple: "Une chose qu'on peut acheter, surtout de la nourriture. Une denrée rare = quelque chose difficile à trouver." },
  "mésoaméricaines": { etym: "Du grec mesos (milieu) + Amérique", defOrig: "Relatives aux civilisations d'Amérique centrale préhispanique.", defSimple: "Qui vient des civilisations qui vivaient en Amérique centrale avant l'arrivée des Européens." },
  "rituels":         { etym: "Du latin ritualis, relatif aux rites", defOrig: "Cérémonies religieuses ou culturelles répétées selon un ordre fixé.", defSimple: "Des cérémonies qu'on répète toujours de la même façon, souvent pour une raison religieuse." },
  "précieuses":      { etym: "Du latin pretiosus, de grand prix", defOrig: "D'une grande valeur, auxquelles on accorde beaucoup d'importance.", defSimple: "Très importantes et de grande valeur. Comme de l'or ou un souvenir de famille." },
  "foudroyant":      { etym: "Du latin fulminare, frapper de la foudre", defOrig: "Très rapide et d'une intensité extrême, comme la foudre.", defSimple: "Très rapide et puissant. Un succès foudroyant = un succès qui arrive très vite." },
  "confiseur":       { etym: "Du latin conficere, préparer", defOrig: "Artisan qui fabrique et vend des sucreries et confiseries.", defSimple: "Quelqu'un qui fabrique des bonbons, chocolats et autres douceurs." },
  "friandise":       { etym: "De friand, qui aime les bonnes choses", defOrig: "Petite chose sucrée ou délicate que l'on mange avec plaisir.", defSimple: "Un petit truc délicieux à manger. Les bonbons et le chocolat sont des friandises." },

  // ── HISTOIRE: mémoire émotionnelle (Érudit) ───────────────
  "mnésique":        { etym: "Du grec mneme, mémoire", defOrig: "Relatif à la mémoire et aux processus de mémorisation.", defSimple: "Qui concerne la mémoire. La consolidation mnésique = comment les souvenirs se fixent dans notre mémoire." },
  "consolidation":   { etym: "Du latin consolidare, rendre solide", defOrig: "Processus par lequel un souvenir est stabilisé et ancré dans la mémoire.", defSimple: "Rendre quelque chose solide et durable. La consolidation d'un souvenir = le fixer pour qu'il reste longtemps." },
  "amygdale":        { etym: "Du grec amygdalê, amande", defOrig: "Structure du cerveau limbique en forme d'amande, impliquée dans le traitement des émotions.", defSimple: "Une petite partie du cerveau en forme d'amande qui gère nos émotions, surtout la peur." },
  "évolutive":       { etym: "Du latin evolutio, déroulement", defOrig: "Relative à l'évolution biologique des espèces.", defSimple: "Qui aide les êtres vivants à survivre et à s'adapter au fil du temps." },
  "traumatiques":    { etym: "Du grec trauma, blessure", defOrig: "Relatifs à un traumatisme, événement bouleversant laissant des traces durables.", defSimple: "Qui cause un choc psychologique très fort. Un accident grave peut être traumatisant." },
  "envahissant":     { etym: "De envahir, du latin invadere", defOrig: "Qui occupe tout l'espace, qui prend toute la place.", defSimple: "Qui prend toute la place et ne laisse pas de repos. Une pensée envahissante = qu'on ne peut pas arrêter." },
  "adaptative":      { etym: "Du latin adaptare, ajuster", defOrig: "Qui permet de s'adapter à l'environnement.", defSimple: "Qui aide à s'adapter. Une réaction adaptative = une réaction qui aide à faire face à une situation." },

  // ── HISTOIRE: arc-en-ciel (Curieux juin) ──────────────────
  "prisme":          { etym: "Du grec prisma, chose sciée", defOrig: "Solide transparent qui décompose la lumière en ses couleurs constituantes.", defSimple: "Un objet en verre qui sépare la lumière en toutes ses couleurs, comme un arc-en-ciel." },
  "illusion optique":{ etym: "Du latin illusio (tromperie) + opticus (de la vue)", defOrig: "Perception visuelle qui ne correspond pas à la réalité physique.", defSimple: "Quelque chose qui trompe nos yeux. On croit voir une chose mais c'est faux en réalité." },

  // ── HISTOIRE: sommeil cerveau (Lecteur juin) ──────────────
  "glymphatique":    { etym: "De glie (cellules cérébrales) + lymphatique", defOrig: "Système d'élimination des déchets spécifique au cerveau, actif pendant le sommeil.", defSimple: "Le système de nettoyage du cerveau qui fonctionne pendant qu'on dort, comme un lave-vaisselle." },
  "métaboliques":    { etym: "Du grec metabole, changement", defOrig: "Relatifs au métabolisme, ensemble des réactions chimiques de l'organisme.", defSimple: "Qui concerne les réactions chimiques de notre corps pour produire de l'énergie." },
  "neurodégénératives":{ etym: "Du grec neuron (nerf) + latin degenerare (déchoir)", defOrig: "Maladies caractérisées par la destruction progressive des neurones.", defSimple: "Des maladies qui détruisent lentement les cellules du cerveau, comme Alzheimer." },
  "paradoxal":       { etym: "Du grec paradoxos, contraire à l'opinion", defOrig: "Qui contient une contradiction apparente, contraire à l'attente.", defSimple: "Qui semble contradictoire. Le sommeil paradoxal est paradoxal car le cerveau est très actif alors qu'on dort profondément." },
  "biologique":      { etym: "Du grec bios (vie) + logos (science)", defOrig: "Relatif à la vie et aux organismes vivants.", defSimple: "Qui appartient au vivant. Une nécessité biologique = quelque chose dont notre corps a absolument besoin." },

  // ── HISTOIRE: stoïcisme (Érudit juin) ─────────────────────
  "stoïcisme":       { etym: "Du grec Stoa, portique où enseignait Zénon", defOrig: "École philosophique antique prônant la maîtrise de soi et l'acceptation du destin.", defSimple: "Une philosophie qui apprend à rester calme et fort face aux difficultés de la vie." },
  "équanimité":      { etym: "Du latin aequanimitas, égalité d'âme", defOrig: "Sérénité, calme tranquille qui ne se laisse pas troubler par les événements.", defSimple: "Rester calme et serein quoi qu'il arrive. Comme quelqu'un qui garde son sang-froid dans les situations difficiles." },
  "fatalisme":       { etym: "Du latin fatum, destin", defOrig: "Doctrine selon laquelle tout est déterminé d'avance et qu'on ne peut rien y changer.", defSimple: "Croire que tout est décidé d'avance et qu'on ne peut rien faire. Le contraire de croire qu'on peut agir." },
  "existentielle":   { etym: "Du latin existentia, existence", defOrig: "Relative à l'existence humaine et aux grandes questions de la vie.", defSimple: "Qui concerne le sens de la vie et de notre existence. Une question existentielle = une grande question sur pourquoi on est là." },
  "injonctions":     { etym: "Du latin injunctio, ordre", defOrig: "Ordres impératifs, obligations imposées.", defSimple: "Des ordres ou des obligations qu'on nous impose. Les publicités sont des injonctions à acheter." },
  "séduisante":      { etym: "Du latin seducere, emmener à part", defOrig: "Qui attire, qui charme, qui exerce une fascination.", defSimple: "Qui attire et donne envie. Une idée séduisante = une idée qui nous attire et nous plaît." },

  // ── HISTOIRE: bâillement (Curieux) ────────────────────────
  "contagieux":      { etym: "Du latin contagiosus, qui se transmet", defOrig: "Qui se transmet facilement d'une personne à une autre.", defSimple: "Qui se passe d'une personne à l'autre. Le bâillement est contagieux comme le rire." },
  "automatiquement": { etym: "Du grec automatos, qui se meut lui-même", defOrig: "De façon automatique, sans décision consciente.", defSimple: "Sans y penser, tout seul. Ton coeur bat automatiquement sans que tu aies à y penser." },
  "chimpanzés":      { etym: "Du kikongo kivili-chimpenze", defOrig: "Grands singes d'Afrique centrale, proches parents de l'être humain.", defSimple: "Des grands singes d'Afrique qui nous ressemblent beaucoup. C'est notre plus proche cousin animal." },

  // ── HISTOIRE: Tour Eiffel (Lecteur) ───────────────────────
  "tollé":           { etym: "Du latin tolle, enlève !", defOrig: "Clameur collective de protestation ou d'indignation.", defSimple: "Quand tout le monde proteste en même temps contre quelque chose." },
  "disgracieux":     { etym: "Du latin dis (contraire) + gratia (grâce)", defOrig: "Qui manque de grâce, de beauté, de charme.", defSimple: "Pas beau, sans élégance. Le contraire de gracieux." },
  "assemblage":      { etym: "De assembler, du latin assimulare", defOrig: "Action de réunir des éléments pour former un tout.", defSimple: "Mettre ensemble des pièces pour former quelque chose. Comme assembler un meuble en kit." },
  "rivets":          { etym: "De river, fixer", defOrig: "Tiges métalliques utilisées pour assembler solidement des plaques de métal.", defSimple: "Des clous en métal spéciaux qui servent à assembler des morceaux de métal ensemble de façon très solide." },
  "payant":          { etym: "De payer, du latin pacare", defOrig: "Qui nécessite le paiement d'un droit d'entrée ou d'une somme.", defSimple: "Où il faut payer pour entrer. Un monument payant = on achète un billet pour le visiter." },

  // ── HISTOIRE: métaphores (Érudit) ─────────────────────────
  "métaphore":       { etym: "Du grec metaphora, transport", defOrig: "Figure de style qui consiste à désigner une chose par le nom d'une autre.", defSimple: "Quand on décrit quelque chose en utilisant les mots d'une autre chose. 'Il a un coeur de pierre' est une métaphore." },
  "fondatrice":      { etym: "Du latin fundare, fonder", defOrig: "Qui est à l'origine, qui constitue la base de quelque chose.", defSimple: "Qui crée quelque chose de nouveau et d'important. Une idée fondatrice = une idée qui est à l'origine de tout." },
  "schèmes":         { etym: "Du grec skêma, forme", defOrig: "Structures mentales abstraites qui organisent notre façon de penser.", defSimple: "Des modèles dans notre tête qui nous aident à comprendre le monde. Comme des moules pour nos pensées." },
  "conceptuels":     { etym: "Du latin conceptus, ce qui est conçu", defOrig: "Relatifs aux concepts, aux idées abstraites.", defSimple: "Qui concernent les idées et les concepts abstraits. Une carte conceptuelle = un schéma d'idées." },
  "stylistiques":    { etym: "Du grec stylos, colonne, style", defOrig: "Relatifs au style, à la manière d'écrire ou de s'exprimer.", defSimple: "Qui concernent la façon d'écrire ou de parler. Un choix stylistique = une façon de s'exprimer choisie pour l'effet." },
  "répertoire":      { etym: "Du latin repertorium, catalogue", defOrig: "Ensemble de choses disponibles dans un domaine.", defSimple: "Une collection de choses disponibles. Le répertoire d'un chanteur = toutes les chansons qu'il peut chanter." },

  // ── HISTOIRE: feuilles automne (Curieux) ──────────────────
  "chlorophylle":    { etym: "Du grec chloros (vert) + phyllon (feuille)", defOrig: "Pigment vert des plantes qui capte l'énergie lumineuse pour la photosynthèse.", defSimple: "La substance verte dans les feuilles qui capte la lumière du soleil pour nourrir la plante." },
  "raccourcissent":  { etym: "De raccourcir, rendre plus court", defOrig: "Deviennent plus courts, diminuent en durée.", defSimple: "Deviennent plus courts. Les jours raccourcissent en automne = il fait nuit de plus en plus tôt." },
  "masquées":        { etym: "De masquer, du latin masca, masque", defOrig: "Cachées, dissimulées derrière quelque chose.", defSimple: "Cachées derrière quelque chose. Les couleurs étaient masquées par le vert = cachées par le vert." },

  // ── HISTOIRE: ADN (Lecteur) ───────────────────────────────
  "cristallographie": { etym: "Du grec kristallos (cristal) + graphein (écrire)", defOrig: "Science qui étudie la structure des cristaux par diffraction des rayons X.", defSimple: "Une technique scientifique qui utilise des rayons pour voir la structure des molécules invisibles à l'oeil nu." },
  "hélicoïdale":     { etym: "Du grec helix (spirale) + eides (forme)", defOrig: "En forme d'hélice, de spirale.", defSimple: "En forme de spirale, comme un escalier en colimaçon ou un tire-bouchon." },
  "biologie moléculaire":{ etym: "Du grec bios + latin molecula, petite masse", defOrig: "Branche de la biologie qui étudie les processus biologiques au niveau moléculaire.", defSimple: "La science qui étudie comment fonctionne la vie au niveau des toutes petites molécules." },
  "pionnière":       { etym: "De pionnier, celui qui ouvre la voie", defOrig: "Personne qui est la première à s'aventurer dans un domaine nouveau.", defSimple: "Quelqu'un qui fait quelque chose en premier et ouvre la voie pour les autres. Comme les premiers explorateurs." },

  // ── HISTOIRE: temps subjectif (Érudit) ────────────────────
  "subjectivité":    { etym: "Du latin subjectus, soumis", defOrig: "Caractère de ce qui appartient au sujet, à son expérience personnelle.", defSimple: "Ce qui dépend de chaque personne et de son ressenti personnel. Ce n'est pas pareil pour tout le monde." },
  "perceptuels":     { etym: "Du latin perceptio, action de percevoir", defOrig: "Relatifs à la perception sensorielle et à son traitement cérébral.", defSimple: "Qui concernent la façon dont on perçoit les choses avec nos sens." },
  "rétrospective":   { etym: "Du latin retro (en arrière) + spectare (regarder)", defOrig: "Qui concerne le passé, qui regarde en arrière.", defSimple: "En regardant en arrière. Rétrospectivement = quand on regarde ce qui s'est passé après." },
  "routines":        { etym: "De route, chemin habituel", defOrig: "Habitudes répétées, manières d'agir devenues automatiques.", defSimple: "Les habitudes qu'on répète tous les jours. Se lever, se doucher, petit-déjeuner = une routine matinale." },

  // ── HISTOIRE: peau ridée (Curieux) ────────────────────────
  "réflexes":        { etym: "Du latin reflexus, renvoyé en arrière", defOrig: "Réactions involontaires et automatiques du corps à un stimulus.", defSimple: "Des réactions automatiques de ton corps. Fermer les yeux quand quelque chose s'approche est un réflexe." },
  "adaptation":      { etym: "Du latin adaptare, ajuster", defOrig: "Modification permettant à un être vivant de mieux s'adapter à son environnement.", defSimple: "Un changement pour mieux faire face à une situation. Les manchots ont des ailes adaptées pour nager." },
  "rainures":        { etym: "De raie, sillon", defOrig: "Petites gorges, sillons creusés dans une surface.", defSimple: "Des petits creux ou sillons. Les rainures d'un pneu lui permettent de mieux accrocher la route." },

  // ── HISTOIRE: Newton (Lecteur) ────────────────────────────
  "gravitation":     { etym: "Du latin gravitas, pesanteur", defOrig: "Force d'attraction mutuelle entre tous les corps ayant une masse.", defSimple: "La force qui attire tous les objets vers le bas et qui fait tourner les planètes autour du soleil." },
  "universelle":     { etym: "Du latin universalis, qui concerne tout", defOrig: "Qui concerne tout l'univers, qui s'applique partout et toujours.", defSimple: "Qui s'applique partout dans le monde. La loi universelle de la gravitation = une loi valable partout dans l'univers." },
  "anecdote":        { etym: "Du grec anekdotos, non publié", defOrig: "Court récit d'un fait curieux ou amusant.", defSimple: "Une petite histoire vraie ou amusante. 'Tu connais l'anecdote de la pomme de Newton ?'" },
  "élucider":        { etym: "Du latin elucidare, rendre clair", defOrig: "Rendre clair ce qui était obscur, résoudre un problème.", defSimple: "Trouver la solution, comprendre quelque chose de mystérieux. Élucider un mystère = le résoudre." },
  "eurêka":          { etym: "Du grec heureka, j'ai trouvé", defOrig: "Exclamation exprimant la joie d'une découverte soudaine.", defSimple: "Ce qu'on crie quand on trouve soudainement la solution à un problème. Mot crié par Archimède dans son bain." },

  // ── HISTOIRE: identité numérique (Érudit) ─────────────────
  "infosphère":      { etym: "Du latin informare + grec sphaira", defOrig: "Environnement informationnel global dans lequel les êtres sont immergés.", defSimple: "Le monde numérique et informationnel dans lequel on vit. Internet, données, écrans = l'infosphère." },
  "persistante":     { etym: "Du latin persistere, demeurer ferme", defOrig: "Qui dure, qui continue à exister malgré le temps.", defSimple: "Qui reste longtemps. Une empreinte persistante = quelque chose qui ne disparaît pas facilement." },
  "exergue":         { etym: "Du latin exergue, hors oeuvre", defOrig: "Court texte placé en tête d'un ouvrage pour en résumer l'esprit.", defSimple: "Une citation ou phrase placée au début d'un texte pour en donner le ton." },
  "portabilité":     { etym: "Du latin portare, porter", defOrig: "Droit d'obtenir ses données personnelles dans un format réutilisable.", defSimple: "Le droit de récupérer ses propres données pour les utiliser ailleurs. Comme prendre ses contacts quand on change de téléphone." },

  // ── HISTOIRE: larmes (Curieux) ────────────────────────────
  "basales":         { etym: "Du latin basis, base", defOrig: "Fondamentales, de base, permanentes.", defSimple: "De base, tout le temps présentes. Les larmes basales = celles qui gardent tes yeux humides en permanence." },
  "hormones":        { etym: "Du grec hormaein, exciter", defOrig: "Substances chimiques produites par l'organisme qui régulent diverses fonctions.", defSimple: "Des messagers chimiques que ton corps fabrique pour donner des instructions à d'autres parties du corps." },
  "substances":      { etym: "Du latin substantia, ce qui est dessous", defOrig: "Matières, corps chimiques dotés de propriétés particulières.", defSimple: "Des matières ou produits chimiques. Le sucre, le sel, l'eau sont des substances." },

  // ── HISTOIRE: café (Lecteur) ──────────────────────────────
  "effervescence":   { etym: "Du latin effervescere, bouillonner", defOrig: "Grande animation, bouillonnement d'idées et d'activités.", defSimple: "Beaucoup d'agitation et d'enthousiasme. Un lieu plein d'effervescence = où ça bouge et où il se passe des choses." },
  "intellectuelle":  { etym: "Du latin intellectualis, de l'intellect", defOrig: "Relative à l'intelligence, à la vie de l'esprit.", defSimple: "Qui concerne la réflexion et les idées. Une discussion intellectuelle = où on parle d'idées importantes." },
  "brassait":        { etym: "Du latin brachium, bras", defOrig: "Mélangeait, traitait des affaires.", defSimple: "Faisait des affaires, négociait. Brasser des affaires = faire plein de transactions commerciales." },
  "Lumières":        { etym: "Du latin lumen, lumière", defOrig: "Mouvement philosophique du XVIIIe siècle prônant la raison et le progrès.", defSimple: "Un grand mouvement d'idées au XVIIIe siècle qui défendait la liberté, la raison et les droits de l'homme." },
  "torréfié":        { etym: "Du latin torrere, dessécher par la chaleur", defOrig: "Grillé à haute température pour développer arômes et saveurs.", defSimple: "Chauffé très fort pour développer les arômes. Le café est torréfié = les grains sont grillés pour avoir leur goût." },
  "vecteur":         { etym: "Du latin vector, celui qui transporte", defOrig: "Agent de transmission ou de propagation.", defSimple: "Quelque chose qui transporte ou répand quelque chose d'autre. Un vecteur culturel = quelque chose qui répand une culture." },

  // ── HISTOIRE: conscience (Érudit) ─────────────────────────
  "qualia":          { etym: "Du latin qualis, de quelle nature", defOrig: "Qualités subjectives de l'expérience consciente, ce que ça 'fait' de percevoir.", defSimple: "La façon dont les choses nous semblent ressenties de l'intérieur. Le rouge de ta vision, la douleur que tu sens." },
  "computationnelle":{ etym: "Du latin computare, calculer", defOrig: "Relative au calcul informatique et au traitement de l'information.", defSimple: "Qui concerne les calculs d'un ordinateur. Pensée computationnelle = penser comme un ordinateur." },
  "panpsychistes":   { etym: "Du grec pan (tout) + psyche (âme)", defOrig: "Partisans de la doctrine selon laquelle la conscience est une propriété universelle.", defSimple: "Des philosophes qui pensent que la conscience existe partout dans l'univers, même dans les pierres." },
  "dualistes":       { etym: "Du latin dualis, de deux", defOrig: "Partisans d'une vision du monde fondée sur deux principes distincts.", defSimple: "Des philosophes qui pensent que le corps et l'esprit sont deux choses complètement différentes." },
  "irréductible":    { etym: "Du latin irreductibilis, qu'on ne peut réduire", defOrig: "Qui ne peut être réduit à quelque chose de plus simple.", defSimple: "Qu'on ne peut pas simplifier davantage. Une réalité irréductible = quelque chose qui ne peut pas s'expliquer plus simplement." },

  // ── HISTOIRE: rêves (Curieux) ─────────────────────────────
  "cauchemar":       { etym: "Du néerlandais mare, esprit malfaisant", defOrig: "Rêve pénible, angoissant qui perturbe le sommeil.", defSimple: "Un mauvais rêve effrayant qui te réveille parfois en sautant de peur." },
  "mélodie":         { etym: "Du grec melodia, chant", defOrig: "Suite de sons musicaux formant un air reconnaissable.", defSimple: "Un air de musique. La mélodie d'une chanson = ce qu'on fredonne et qu'on reconnaît." },
  "artistiques":     { etym: "Du latin ars, artis, art", defOrig: "Relatifs à l'art, aux oeuvres créatives.", defSimple: "Qui concerne l'art. Des créations artistiques = des peintures, musiques, sculptures." },

  // ── HISTOIRE: Renaissance (Lecteur) ──────────────────────
  "humanisme":       { etym: "Du latin humanus, humain", defOrig: "Mouvement intellectuel qui place l'être humain au centre des préoccupations.", defSimple: "Une façon de penser qui met l'être humain au centre de tout. L'humanisme valorise l'homme et ses capacités." },
  "dissèquèrent":    { etym: "Du latin dissecare, couper", defOrig: "Coupèrent méthodiquement pour étudier la structure interne.", defSimple: "Découpèrent soigneusement pour étudier l'intérieur. Les médecins de la Renaissance dissèquèrent des corps pour comprendre l'anatomie." },
  "anatomiste":      { etym: "Du grec anatomia, dissection", defOrig: "Spécialiste de l'anatomie, de la structure du corps vivant.", defSimple: "Quelqu'un qui étudie comment le corps humain est construit à l'intérieur." },
  "proportions":     { etym: "Du latin proportio, rapport entre les parties", defOrig: "Rapport harmonieux entre les différentes parties d'un ensemble.", defSimple: "Les rapports de taille entre les différentes parties. Les proportions d'un visage = la taille du nez par rapport aux yeux." },
  "fondements":      { etym: "Du latin fundamentum, base", defOrig: "Bases sur lesquelles repose quelque chose, principes essentiels.", defSimple: "Les bases, ce sur quoi tout repose. Les fondements d'une maison = ses fondations." },
  "individualisme":  { etym: "Du latin individuus, indivisible", defOrig: "Doctrine qui valorise les droits et la liberté de l'individu.", defSimple: "L'idée que chaque personne est importante et a ses propres droits. Le contraire de tout sacrifier pour le groupe." },

  // ── HISTOIRE: libre arbitre (Érudit) ──────────────────────
  "neurophysiologiste":{ etym: "Du grec neuron + physis + logos", defOrig: "Scientifique spécialisé dans l'étude du fonctionnement du système nerveux.", defSimple: "Un médecin-chercheur qui étudie comment fonctionne le cerveau et les nerfs." },
  "potentiel de préparation":{ etym: "Du latin potentialis + preparatio", defOrig: "Signal électrique cérébral qui précède un mouvement volontaire.", defSimple: "Une activité du cerveau qui commence avant même qu'on décide consciemment de bouger." },
  "causalité":       { etym: "Du latin causalitas, rapport de cause à effet", defOrig: "Relation entre une cause et son effet.", defSimple: "Le fait qu'une chose en cause une autre. La pluie est la cause de la flaque = causalité." },
  "délibérer":       { etym: "Du latin deliberare, peser", defOrig: "Réfléchir soigneusement avant de prendre une décision.", defSimple: "Réfléchir longuement avant de décider. Le jury délibère = les jurés discutent pour prendre leur décision." },
  "pénale":          { etym: "Du latin poenalis, relatif à la peine", defOrig: "Relative au droit pénal, aux crimes et délits.", defSimple: "Qui concerne les crimes et les punitions. La responsabilité pénale = être responsable devant la justice." },

  // ── HISTOIRE: musique frissons (Curieux) ──────────────────
  "dopamine":        { etym: "De dopa (acide aminé) + amine", defOrig: "Neurotransmetteur associé au plaisir et à la récompense dans le cerveau.", defSimple: "Une substance que ton cerveau fabrique quand tu fais quelque chose de plaisant. Elle te donne une sensation de bonheur." },
  "neurotransmetteur":{ etym: "Du grec neuron + latin transmittere", defOrig: "Molécule chimique qui transmet les signaux entre les neurones.", defSimple: "Un messager chimique dans le cerveau qui permet aux neurones de communiquer entre eux." },
  "fréquents":       { etym: "Du latin frequens, nombreux", defOrig: "Qui arrivent souvent, à de nombreuses reprises.", defSimple: "Qui se passe souvent. Les embouteillages sont fréquents le matin." },

  // ── HISTOIRE: abysses (Lecteur) ───────────────────────────
  "abyssales":       { etym: "Du grec abyssos, sans fond", defOrig: "Relatives aux grandes profondeurs océaniques, au-delà de 2000 mètres.", defSimple: "Des profondeurs immenses de l'océan. Les zones abyssales = les endroits les plus profonds de la mer." },
  "cartographiés":   { etym: "Du latin charta (carte) + graphein (écrire)", defOrig: "Représentés sur des cartes géographiques précises.", defSimple: "Mis sur une carte. Les fonds marins cartographiés = les parties de l'océan dont on a fait une carte." },
  "bioluminescentes":{ etym: "Du grec bios (vie) + latin lumen (lumière)", defOrig: "Capables de produire leur propre lumière par réaction chimique.", defSimple: "Qui font leur propre lumière. Comme les lucioles, certains animaux des abysses brillent dans le noir." },
  "inhospitalières": { etym: "Du latin in (sans) + hospes (hôte)", defOrig: "Qui ne permettent pas facilement la vie, hostiles.", defSimple: "Où il est difficile de vivre. Le désert et les abysses sont des environnements inhospitaliers." },
  "thérapies":       { etym: "Du grec therapeia, soin", defOrig: "Traitements médicaux visant à guérir ou améliorer un état de santé.", defSimple: "Des traitements médicaux. La kinésithérapie, la chimiothérapie sont des thérapies." },

  // ── HISTOIRE: bonheur (Érudit) ────────────────────────────
  "hédoné":          { etym: "Du grec hedone, plaisir", defOrig: "Plaisir sensible, bien-être immédiat selon la philosophie grecque.", defSimple: "Le plaisir immédiat, le fait de se sentir bien tout de suite. Manger un bon repas = hédoné." },
  "eudaimonia":      { etym: "Du grec eu (bien) + daimon (génie)", defOrig: "Bonheur comme épanouissement et vie accomplie selon Aristote.", defSimple: "Un bonheur profond qui vient d'une vie bien vécue, pas juste du plaisir immédiat. Être épanoui." },
  "utilitaristes":   { etym: "Du latin utilitas, utilité", defOrig: "Partisans de la doctrine morale qui juge les actes à leurs conséquences utiles.", defSimple: "Des philosophes qui pensent qu'une action est bonne si elle produit le maximum de bonheur pour le maximum de gens." },
  "empirique":       { etym: "Du grec empeiria, expérience", defOrig: "Fondé sur l'observation et l'expérience, non sur la théorie seule.", defSimple: "Basé sur ce qu'on observe vraiment. Une approche empirique = on teste et on observe pour savoir si c'est vrai." },
  "accomplissement": { etym: "De accomplir, du latin ad + complere", defOrig: "Fait de mener quelque chose à son terme, de réaliser ses capacités.", defSimple: "Réussir quelque chose de difficile et en être fier. L'accomplissement personnel = devenir la meilleure version de soi." },

  // ── HISTOIRE: mer salée (Curieux) ─────────────────────────
  "minéraux":        { etym: "Du latin minerale, relatif aux mines", defOrig: "Substances naturelles inorganiques présentes dans les roches et le sol.", defSimple: "Des substances naturelles qu'on trouve dans les roches. Le fer, le calcium, le sel sont des minéraux." },
  "s'évapore":       { etym: "Du latin evaporare, se transformer en vapeur", defOrig: "Se transforme en vapeur sous l'effet de la chaleur.", defSimple: "Disparaît dans l'air en devenant vapeur. L'eau s'évapore au soleil = elle devient invisible dans l'air." },
  "accumulé":        { etym: "Du latin accumulare, mettre en tas", defOrig: "Réuni en grande quantité par additions successives.", defSimple: "Rassemblé petit à petit en grande quantité. La poussière accumulée = la poussière qui s'accumule au fil du temps." },

  // ── HISTOIRE: intelligence artificielle (Lecteur) ─────────

  "désillusion":     { etym: "Du latin dis + illusio", defOrig: "Perte d'illusion, déception après un espoir déçu.", defSimple: "Quand la réalité est décevante après avoir cru quelque chose de beau. Comme découvrir que le Père Noël n'existe pas." },
  "massives":        { etym: "Du latin massa, masse", defOrig: "D'une très grande quantité ou ampleur.", defSimple: "En très grande quantité. Des données massives = des milliers de milliards d'informations." },
  "stratégie":       { etym: "Du grec strategos, général", defOrig: "Plan d'action organisé pour atteindre un objectif.", defSimple: "Un plan pour gagner ou réussir quelque chose. La stratégie d'un joueur d'échecs = comment il planifie ses coups." },
  "inédites":        { etym: "Du latin ineditus, non publié", defOrig: "Qui n'ont jamais existé ou été vues auparavant.", defSimple: "Complètement nouvelles, jamais vues avant. Des questions inédites = des questions qu'on n'avait jamais posées." },

  // ── HISTOIRE: langage pensée (Érudit) ─────────────────────
  "postule":         { etym: "Du latin postulare, demander", defOrig: "Affirme comme point de départ sans le démontrer.", defSimple: "Affirme quelque chose sans le prouver, comme point de départ. Postulat = hypothèse de base." },
  "locuteurs":       { etym: "Du latin locutor, celui qui parle", defOrig: "Personnes qui parlent une langue donnée.", defSimple: "Les personnes qui parlent une langue. Les locuteurs français = les gens qui parlent français." },
  "cardinales":      { etym: "Du latin cardinalis, principal", defOrig: "Qui indiquent les quatre points principaux de la boussole.", defSimple: "Nord, Sud, Est, Ouest. Les directions cardinales = les quatre directions principales." },

  // ── HISTOIRE: miroir (Curieux) ────────────────────────────
  "inverse":         { etym: "Du latin inversus, retourné", defOrig: "Qui est dans un ordre ou une direction contraire.", defSimple: "À l'envers, dans le sens contraire. L'inverse de gauche = droite." },
  "illusion":        { etym: "Du latin illusio, tromperie", defOrig: "Perception erronée de la réalité, fausse apparence.", defSimple: "Quelque chose qui trompe nos yeux ou notre cerveau. Un tour de magie crée une illusion." },
  "interprétons":    { etym: "Du latin interpretare, expliquer", defOrig: "Donnons un sens à, expliquons selon notre compréhension.", defSimple: "Comprendre à notre façon. On interprète un texte = on lui donne notre propre sens." },

  // ── HISTOIRE: microbes (Lecteur) ─────────────────────────
  "microbiome":      { etym: "Du grec mikros (petit) + bios (vie)", defOrig: "Ensemble des micro-organismes vivant dans un environnement particulier du corps.", defSimple: "Toutes les bactéries et microbes qui vivent dans ton corps, surtout dans l'intestin." },
  "auto-immunes":    { etym: "Du grec autos (soi-même) + latin immunis", defOrig: "Maladies où le système immunitaire attaque ses propres cellules.", defSimple: "Des maladies où ton corps se bat contre lui-même par erreur. Comme si tes soldats attaquaient ton propre château." },
  "hygiéniste":      { etym: "Du grec hygieia, santé", defOrig: "Relative à l'hygiène et à la prévention des maladies.", defSimple: "Qui concerne la propreté et la prévention des maladies. L'hypothèse hygiéniste = une théorie sur les effets de trop de propreté." },
  "stérilisés":      { etym: "Du latin sterilis, stérile", defOrig: "Débarrassés de tout micro-organisme par traitement.", defSimple: "Rendus complètement propres de tous microbes. Un bloc opératoire est stérilisé." },
  "neuropsychiatriques":{ etym: "Du grec neuron + psyche + iatros", defOrig: "Relatifs aux troubles à la fois neurologiques et psychiatriques.", defSimple: "Qui touchent à la fois le cerveau et la santé mentale. La dépression est une maladie neuropsychiatrique." },

  // ── HISTOIRE: art définition (Érudit) ─────────────────────
  "institutionnelle":{ etym: "Du latin institutio, établissement", defOrig: "Relative aux institutions, aux organisations officielles établies.", defSimple: "Qui dépend des institutions officielles. La théorie institutionnelle de l'art = l'art est ce que les institutions reconnaissent comme tel." },
  "achoppe":         { etym: "Du vieux français chopper, buter", defOrig: "Rencontre un obstacle, bute sur une difficulté.", defSimple: "Trébuche, se retrouve bloqué par une difficulté. La théorie achoppe sur des exemples = elle ne fonctionne pas pour certains cas." },
  "ressemblances de famille":{ etym: "Du latin similitudo + familia", defOrig: "Similitudes partielles entre membres d'un groupe, sans propriété commune à tous.", defSimple: "Des points communs partiels entre choses, comme dans une famille où tout le monde se ressemble un peu mais différemment." },
  "entrecroises":    { etym: "De entrecroiser, croiser plusieurs fois", defOrig: "Qui se croisent en de nombreux points, formant un réseau.", defSimple: "Qui se croisent et se mélangent. Des similitudes entrecroisées = des points communs qui se recoupent." },

// ── MOTS MANQUANTS À AJOUTER AVANT LE }; FINAL ────────────

  // Ciel bleu
  "lèves":           { etym: "Du latin levare, soulever", defOrig: "Action de diriger vers le haut.", defSimple: "Bouger vers le haut. Lever les yeux = regarder vers le haut." },
  "violet":          { etym: "Du latin viola, violette", defOrig: "Couleur obtenue par mélange de bleu et de rouge.", defSimple: "Une couleur sombre, mélange de bleu et de rouge. Comme les violettes ou les aubergines." },
  "horizon":         { etym: "Du grec horizein, limiter", defOrig: "Ligne imaginaire où le ciel et la terre semblent se rejoindre.", defSimple: "La ligne au loin où le ciel touche la terre ou la mer." },
  "sépare":          { etym: "Du latin separare, mettre à part", defOrig: "Divise en parties distinctes.", defSimple: "Diviser. Séparer les couleurs = les mettre chacune de son côté." },

  // Chats
  "gorge":           { etym: "Du latin gurges, gouffre", defOrig: "Partie interne du cou, par où passent l'air et les aliments.", defSimple: "La partie de ton cou à l'intérieur. Quand tu as mal à la gorge, c'est là que ça fait mal." },
  "signe":           { etym: "Du latin signum, marque", defOrig: "Indice, manifestation qui révèle quelque chose.", defSimple: "Une indication. Un signe de bonheur = quelque chose qui montre qu'on est heureux." },


  // Arc-en-ciel
  "rebondissent":    { etym: "De re + bondir", defOrig: "Repartent après avoir heurté une surface.", defSimple: "Repartent après avoir touché quelque chose. Comme une balle qui rebondit sur le sol." },
  "dépend":          { etym: "Du latin dependere, être suspendu", defOrig: "Est conditionné par, varie en fonction de.", defSimple: "Change selon quelque chose. Ça dépend du temps = ça change selon la météo." },
  "déplace":         { etym: "Du latin dis + placer", defOrig: "Change de position, bouge d'un endroit à un autre.", defSimple: "Bouger d'un endroit à un autre." },

  // Bâillement
  "invention":       { etym: "Du latin inventio, découverte", defOrig: "Création d'une chose nouvelle, découverte originale.", defSimple: "Quelque chose de nouveau créé par quelqu'un. Le téléphone est une invention." },
  "produire":        { etym: "Du latin producere, faire avancer", defOrig: "Créer, fabriquer, faire exister quelque chose.", defSimple: "Faire quelque chose, créer. Une usine produit des voitures." },

  // Feuilles automne
  "spectacle":       { etym: "Du latin spectaculum, ce qu'on regarde", defOrig: "Ce qui attire le regard, vision remarquable.", defSimple: "Quelque chose de beau ou d'impressionnant à regarder." },
  "renaître":        { etym: "Du latin renasci, naître à nouveau", defOrig: "Naître de nouveau, reprendre vie après une période de mort apparente.", defSimple: "Recommencer à vivre. Au printemps, les arbres renaissent après l'hiver." },

  // Peau ridée
  "abîmés":          { etym: "Du latin abyssus, gouffre", defOrig: "Endommagés, détériorés, qui ne fonctionnent plus bien.", defSimple: "Cassés ou endommagés. Des nerfs abîmés = des nerfs qui ne fonctionnent plus bien." },
  "preuve":          { etym: "Du latin proba, épreuve", defOrig: "Élément qui établit la vérité d'un fait.", defSimple: "Quelque chose qui montre que c'est vrai." },

  // Larmes
  "irrite":          { etym: "Du latin irritare, exciter", defOrig: "Provoque une sensation de brûlure ou d'inconfort.", defSimple: "Fait mal ou brûle légèrement. La fumée irrite les yeux." },
  "éliminer":        { etym: "Du latin eliminare, mettre hors du seuil", defOrig: "Faire disparaître, supprimer, expulser.", defSimple: "Faire partir quelque chose. Éliminer les déchets = les faire sortir du corps." },
  "ressentir":       { etym: "Du latin re + sentire", defOrig: "Éprouver une sensation, une émotion.", defSimple: "Sentir quelque chose à l'intérieur. Ressentir de la joie = sentir qu'on est heureux." },

  // Rêves
  "trier":           { etym: "Du latin tritare, broyer", defOrig: "Classer, séparer selon des critères.", defSimple: "Mettre de l'ordre en séparant les choses. Trier ses affaires = garder ce qui est utile." },
  "résoudre":        { etym: "Du latin resolvere, délier", defOrig: "Trouver la solution à un problème.", defSimple: "Trouver la réponse à un problème." },
  

  // Musique frissons
  "libère":          { etym: "Du latin liberare, rendre libre", defOrig: "Laisse aller, met en circulation.", defSimple: "Laisser sortir quelque chose. Le cerveau libère de la dopamine = il en envoie." },
  "inattendu":       { etym: "Du latin in + attendere", defOrig: "Qui n'était pas prévu, qui surprend.", defSimple: "Qu'on n'attendait pas. Une surprise inattendue = quelque chose qui arrive sans qu'on s'y attende." },

  // Mer salée
  "dissolvent":      { etym: "Du latin dissolvere, délier", defOrig: "Décomposent et intègrent dans un liquide.", defSimple: "Se mélangent dans l'eau pour disparaître. Le sucre se dissout dans l'eau." },
  "bloqué":          { etym: "Du néerlandais blok, obstacle", defOrig: "Retenu, empêché de sortir ou d'avancer.", defSimple: "Coincé, qui ne peut pas passer. Le sel est bloqué dans la mer = il ne peut pas en sortir." },
  "emportées":       { etym: "De emporter, prendre avec soi", defOrig: "Transportées, amenées d'un endroit à un autre.", defSimple: "Transportées par quelque chose. Les feuilles emportées par le vent." },

  // Miroir
  "obsédés":         { etym: "Du latin obsidere, assiéger", defOrig: "Occupés constamment par une idée fixe.", defSimple: "Qui ne pensent qu'à une seule chose." },

  // Chocolat
  "consommons":      { etym: "Du latin consummare, achever", defOrig: "Utilisons, mangeons ou buvons habituellement.", defSimple: "Mangeons ou utilisons. On consomme du chocolat = on en mange." },
  "cacao":           { etym: "De l'espagnol cacao, emprunté aux Mayas", defOrig: "Graine du cacaoyer, utilisée pour fabriquer le chocolat.", defSimple: "La graine d'un arbre tropical qui sert à faire le chocolat." },
 

  // Sommeil
  "passif":          { etym: "Du latin passivus, qui subit", defOrig: "Qui subit sans agir, sans réagir activement.", defSimple: "Qui ne fait rien, qui attend. Le contraire d'actif." },
  "maintenance":     { etym: "Du latin manutenere, tenir en main", defOrig: "Ensemble des opérations permettant de maintenir en bon état.", defSimple: "L'entretien pour que quelque chose continue à bien fonctionner." },

  // Tour Eiffel
  "indispensable":   { etym: "Du latin in + dispensare", defOrig: "Dont on ne peut pas se passer, absolument nécessaire.", defSimple: "Dont on a absolument besoin. L'eau est indispensable à la vie." },
  "intellectuels":   { etym: "Du latin intellectus, intelligence", defOrig: "Personnes dont l'activité principale est la réflexion.", defSimple: "Des gens qui travaillent avec leur cerveau : philosophes, écrivains, scientifiques." },

  // ADN
  "chercheurs":      { etym: "De chercher, du latin circare", defOrig: "Personnes qui font de la recherche scientifique.", defSimple: "Des scientifiques qui cherchent à découvrir de nouvelles choses." },
  "insu":            { etym: "Du latin inscitus, ignorant", defOrig: "Sans que la personne concernée le sache.", defSimple: "Sans que quelqu'un le sache. À son insu = sans qu'il soit au courant." },
  "récompensée":     { etym: "Du latin recompensare, compenser", defOrig: "Qui a reçu une récompense pour ses mérites.", defSimple: "Qui a reçu un prix pour son travail." },

  // Newton
  "formelle":        { etym: "Du latin formalis, relatif à la forme", defOrig: "Qui concerne la forme logique, les règles strictes.", defSimple: "Qui suit des règles strictes et précises. La logique formelle = les mathématiques." },

  // Café
  "contaminer":      { etym: "Du latin contaminare, souiller", defOrig: "Rendre impur, transmettre une maladie ou une pollution.", defSimple: "Rendre quelque chose dangereux. L'eau contaminée = rendue dangereuse par des microbes." },
  "révolution":      { etym: "Du latin revolutio, retour en arrière", defOrig: "Changement radical et profond dans un domaine.", defSimple: "Un grand changement qui transforme tout. La révolution française a tout changé." },

  // Renaissance
  "universel":       { etym: "Du latin universalis, qui concerne tout", defOrig: "Qui s'étend à tout ou à tous, sans exception.", defSimple: "Pour tout le monde et partout. Un génie universel = quelqu'un qui est fort dans tout." },
  "réconciliation":  { etym: "Du latin reconciliare, réunir", defOrig: "Action de remettre en bonne entente des éléments opposés.", defSimple: "Faire la paix entre deux choses qui s'opposaient." },
  

  // Abysses
  "fosses":          { etym: "Du latin fossa, creusé", defOrig: "Dépressions très profondes au fond des océans.", defSimple: "Des trous très très profonds au fond de la mer." },
  "prospèrent":      { etym: "Du latin prosperare, réussir", defOrig: "Vivent et se développent avec succès.", defSimple: "Vivent et se développent bien. Des plantes qui prospèrent = qui poussent très bien." },
  "résister":        { etym: "Du latin resistere, s'arrêter contre", defOrig: "Tenir bon face à quelque chose, ne pas céder.", defSimple: "Ne pas abandonner face à quelque chose de difficile." },

  // IA
  "surpassèrent":    { etym: "Du latin super + passare", defOrig: "Dépassèrent, furent meilleurs que.", defSimple: "Furent meilleurs que. Les machines ont surpassé les humains aux échecs." },
  "composé":         { etym: "Du latin compositus, assemblé", defOrig: "Créé en assemblant plusieurs éléments.", defSimple: "Fait de plusieurs parties assemblées." },

  // Microbes
  "allergie":        { etym: "Du grec allos (autre) + ergon (réaction)", defOrig: "Réaction excessive du système immunitaire à une substance.", defSimple: "Quand ton corps réagit trop fort à quelque chose d'inoffensif. Allergie aux chats = éternuer près des chats." },
  "secondaires":     { etym: "Du latin secundarius, de second rang", defOrig: "Qui viennent en plus, comme conséquence d'autre chose.", defSimple: "Les effets secondaires d'un médicament = les effets non voulus." },

  // Mémoire émotionnelle
  "photographique":  { etym: "Du grec photos (lumière) + graphein (écrire)", defOrig: "Avec une précision comparable à une photographie.", defSimple: "Aussi précis qu'une photo. Mémoire photographique = se souvenir exactement de tout." },
  "deuil":           { etym: "Du latin dolium, douleur", defOrig: "Période de tristesse après la perte d'un être cher.", defSimple: "La tristesse qu'on ressent quand quelqu'un qu'on aime est mort." },

  // Stoïcisme
  "boussole":        { etym: "De l'italien bussola, petite boîte", defOrig: "Instrument indiquant le nord ; au figuré, guide moral.", defSimple: "Un outil qui indique le nord. Au sens figuré : ce qui guide nos choix dans la vie." },
  "sérénité":        { etym: "Du latin serenitas, calme", defOrig: "État de calme paisible, de tranquillité d'esprit.", defSimple: "Un calme profond et paisible. Rester calme quoi qu'il arrive." },
  "revendiquent":    { etym: "Du latin re + vindicare, réclamer", defOrig: "Affirment publiquement quelque chose comme leur appartenant.", defSimple: "Affirment fièrement quelque chose. Ils revendiquent cette philosophie = ils disent fièrement qu'ils la suivent." },

  // Métaphores
  "infrastructure":  { etym: "Du latin infra (dessous) + structura", defOrig: "Ensemble des éléments de base sur lesquels repose un système.", defSimple: "Ce qui est à la base et supporte tout le reste. Les routes sont l'infrastructure d'un pays." },
  "automatiques":    { etym: "Du grec automatos, qui agit de lui-même", defOrig: "Qui se produisent sans intervention consciente.", defSimple: "Qui se font seuls, sans qu'on y pense. Respirer est automatique." },
  "interlocuteurs":  { etym: "Du latin inter + loqui, parler entre", defOrig: "Personnes qui participent à une conversation.", defSimple: "Les gens avec qui on parle. Dans une discussion, les interlocuteurs = ceux qui parlent." },
  "s'envenimée":     { etym: "Du latin venenum, poison", defOrig: "Est devenue plus grave, plus hostile.", defSimple: "Est devenue de plus en plus mauvaise. Une situation qui s'envenime = qui se dégrade." },

  // Temps subjectif
  "contracte":       { etym: "Du latin contrahere, resserrer", defOrig: "Réduit, comprime, rend plus court.", defSimple: "Rend plus court. Le temps se contracte quand on s'amuse = passe vite." },
  "horloges":        { etym: "Du grec horologion, qui dit l'heure", defOrig: "Instruments servant à mesurer et indiquer le temps.", defSimple: "Des appareils qui indiquent l'heure. Les montres sont des horloges." },
  "étonnement":      { etym: "De étonner, du latin ex + tonare", defOrig: "Surprise mêlée d'admiration face à quelque chose d'inattendu.", defSimple: "La surprise qu'on ressent face à quelque chose d'impressionnant." },

  // Identité numérique
  "cartographient":  { etym: "Du latin charta (carte) + graphein (écrire)", defOrig: "Représentent sous forme de carte, répertorient.", defSimple: "Font une carte de. Cartographier nos relations = répertorier toutes nos connexions." },
  "aspirations":     { etym: "Du latin aspirare, souffler vers", defOrig: "Désirs profonds, ambitions, ce vers quoi on tend.", defSimple: "Ce qu'on espère atteindre dans la vie. Devenir médecin peut être une aspiration." },
  "vertigineux":     { etym: "Du latin vertigo, tournoiement", defOrig: "Qui donne le vertige, d'une ampleur impressionnante.", defSimple: "Qui donne le tournis tellement c'est grand. Une question vertigineuse = qui donne le vertige." },

  // Conscience
  "fonctionnelle":   { etym: "Du latin functio, accomplissement", defOrig: "Relative aux fonctions, à ce qui marche pratiquement.", defSimple: "Qui fonctionne et sert à quelque chose. Une explication fonctionnelle = qui explique comment ça marche." },

  // Libre arbitre
  "antérieure":      { etym: "Du latin anterior, qui est devant", defOrig: "Qui précède dans le temps, qui vient avant.", defSimple: "Qui vient avant. Une décision antérieure = une décision prise avant." },
  "fragile":         { etym: "Du latin fragilis, qui se casse facilement", defOrig: "Qui peut facilement être brisé ou mis en défaut.", defSimple: "Qui peut s'effondrer facilement. Une théorie fragile = qu'on peut facilement contredire." },
 

  // Bonheur
  "millénaires":     { etym: "Du latin millenarius, de mille ans", defOrig: "Qui ont des milliers d'années.", defSimple: "Vieux de plusieurs milliers d'années. Une tradition millénaire = qui existe depuis longtemps." },
  "intuitions":      { etym: "Du latin intuitio, regard intérieur", defOrig: "Connaissances immédiates sans raisonnement apparent.", defSimple: "Des sentiments qui viennent sans réfléchir. Mon intuition me dit que c'est faux = je le sens." },
  "maximiser":       { etym: "Du latin maximus, le plus grand", defOrig: "Porter à son maximum.", defSimple: "Rendre le plus grand possible. Maximiser ses profits = gagner le plus d'argent possible." },

  // Art définition
  "urinoir":         { etym: "Du latin urina, urine", defOrig: "Dispositif sanitaire ; ici l'oeuvre provocatrice de Duchamp.", defSimple: "Un objet de salle de bain que Duchamp a présenté comme une oeuvre d'art pour provoquer." },
  "circulaire":      { etym: "Du latin circularis, en cercle", defOrig: "Qui tourne en rond, qui revient à son point de départ.", defSimple: "Qui tourne en rond sans vraiment expliquer. Un raisonnement circulaire = qui utilise sa conclusion pour se justifier." },
  "aptitude":        { etym: "Du latin aptitudo, convenance", defOrig: "Capacité naturelle à faire quelque chose.", defSimple: "La capacité à faire quelque chose. Aptitude au sport = être naturellement doué." },

  // Langage pensée
  "empiriques":      { etym: "Du grec empeiria, expérience", defOrig: "Fondés sur l'observation et l'expérience concrète.", defSimple: "Basés sur ce qu'on observe vraiment. Des recherches empiriques = basées sur des expériences réelles." },
  "marginalisée":    { etym: "Du latin marginalis, de la marge", defOrig: "Mise à l'écart, reléguée en périphérie.", defSimple: "Mise de côté, ignorée. Une idée marginalisée = que personne ne prenait au sérieux." },
  "automatismes":    { etym: "Du grec automatos, qui agit seul", defOrig: "Comportements devenus automatiques par habitude.", defSimple: "Des actions qu'on fait sans y penser. Conduire est devenu un automatisme." },
  "découper":        { etym: "De couper en morceaux", defOrig: "Diviser en parties distinctes.", defSimple: "Couper en morceaux ou catégories. Découper la réalité = diviser le monde en catégories." },

// ── PETITS MOTS COURANTS ──────────────────────────────────

  // Articles
  "le":      { etym: "Du latin ille", defOrig: "Article défini masculin singulier.", defSimple: "Mot qui désigne quelque chose de précis. 'Le chat' = un chat précis qu'on connaît." },
  "la":      { etym: "Du latin illa", defOrig: "Article défini féminin singulier.", defSimple: "Mot qui désigne quelque chose de précis au féminin. 'La maison' = une maison précise." },
  "les":     { etym: "Du latin illos/illas", defOrig: "Article défini pluriel.", defSimple: "Mot qui désigne plusieurs choses précises. 'Les enfants' = des enfants précis." },
  "un":      { etym: "Du latin unum", defOrig: "Article indéfini masculin singulier.", defSimple: "Mot qui désigne quelque chose sans préciser lequel. 'Un chien' = n'importe quel chien." },
  "une":     { etym: "Du latin unam", defOrig: "Article indéfini féminin singulier.", defSimple: "Mot qui désigne quelque chose sans préciser lequel. 'Une fleur' = n'importe quelle fleur." },
  "des":     { etym: "Du latin de + illos", defOrig: "Article indéfini pluriel ou partitif.", defSimple: "Mot qui désigne plusieurs choses sans préciser lesquelles. 'Des pommes' = plusieurs pommes." },
  "du":      { etym: "Contraction de de + le", defOrig: "Article partitif masculin ou contraction de 'de le'.", defSimple: "Mot qui désigne une partie de quelque chose. 'Du pain' = une partie du pain." },

  // Pronoms
  "il":      { etym: "Du latin ille", defOrig: "Pronom personnel masculin de la troisième personne du singulier.", defSimple: "Mot qui remplace un homme ou un animal mâle dont on parle. 'Il court' = l'homme/l'animal court." },
  "elle":    { etym: "Du latin illa", defOrig: "Pronom personnel féminin de la troisième personne du singulier.", defSimple: "Mot qui remplace une femme ou un animal femelle dont on parle." },
  "ils":     { etym: "Du latin illi", defOrig: "Pronom personnel masculin pluriel de la troisième personne.", defSimple: "Mot qui remplace plusieurs personnes ou choses dont on parle." },
  "elles":   { etym: "Du latin illae", defOrig: "Pronom personnel féminin pluriel de la troisième personne.", defSimple: "Mot qui remplace plusieurs femmes ou choses féminines dont on parle." },
  "nous":    { etym: "Du latin nos", defOrig: "Pronom personnel de la première personne du pluriel.", defSimple: "Mot qui désigne moi et d'autres personnes ensemble. 'Nous mangeons' = moi et les autres." },
  "vous":    { etym: "Du latin vos", defOrig: "Pronom personnel de la deuxième personne du pluriel ou de politesse.", defSimple: "Mot qui désigne plusieurs personnes à qui on parle, ou une personne qu'on vouvoie." },
  "je":      { etym: "Du latin ego", defOrig: "Pronom personnel de la première personne du singulier.", defSimple: "Mot qui désigne la personne qui parle. 'Je mange' = moi, je mange." },
  "tu":      { etym: "Du latin tu", defOrig: "Pronom personnel de la deuxième personne du singulier.", defSimple: "Mot qui désigne la personne à qui on parle. 'Tu cours' = toi, tu cours." },
  "on":      { etym: "Du latin homo, homme", defOrig: "Pronom indéfini désignant une personne ou un groupe indéterminé.", defSimple: "Mot qui désigne les gens en général ou nous. 'On mange' = nous mangeons ou les gens mangent." },
  "ce":      { etym: "Du latin ecce hoc", defOrig: "Pronom ou adjectif démonstratif désignant quelque chose de proche.", defSimple: "Mot qui montre quelque chose. 'Ce livre' = ce livre-ci, celui dont on parle." },
  "se":      { etym: "Du latin se", defOrig: "Pronom réfléchi de la troisième personne.", defSimple: "Mot qui indique que l'action revient sur la même personne. 'Il se lave' = il se lave lui-même." },
  "lui":     { etym: "Du latin illi", defOrig: "Pronom personnel masculin de la troisième personne.", defSimple: "Mot qui remplace un homme. 'Je lui parle' = je parle à cet homme." },
  "y":       { etym: "Du latin ibi, là", defOrig: "Pronom adverbial désignant un lieu ou remplaçant un complément.", defSimple: "Mot qui remplace un endroit ou une chose. 'J'y vais' = je vais là-bas." },
  "en":      { etym: "Du latin inde, de là", defOrig: "Pronom ou préposition indiquant l'origine, la matière, la quantité.", defSimple: "Mot qui remplace une chose ou indique d'où on vient. 'J'en veux' = je veux de cela." },

  // Conjonctions et mots de liaison
  "et":      { etym: "Du latin et", defOrig: "Conjonction de coordination qui unit deux éléments.", defSimple: "Mot qui relie deux choses. 'Le chat et le chien' = les deux ensemble." },
  "ou":      { etym: "Du latin aut", defOrig: "Conjonction de coordination qui exprime une alternative.", defSimple: "Mot qui propose un choix. 'Chat ou chien ?' = l'un ou l'autre." },
  "mais":    { etym: "Du latin magis, davantage", defOrig: "Conjonction de coordination qui exprime une opposition.", defSimple: "Mot qui marque un contraste. 'Il est gentil mais timide' = gentil, cependant timide." },
  "donc":    { etym: "Du latin dumque", defOrig: "Conjonction de coordination qui exprime une conséquence.", defSimple: "Mot qui indique une conclusion. 'Il pleut, donc je prends un parapluie.'" },
  "car":     { etym: "Du latin quare, pourquoi", defOrig: "Conjonction de coordination qui exprime la cause.", defSimple: "Mot qui explique pourquoi. 'Je mange car j'ai faim' = parce que j'ai faim." },
  "que":     { etym: "Du latin quod", defOrig: "Conjonction de subordination ou pronom relatif.", defSimple: "Mot de liaison très courant. 'Je sais que tu viens' = je sais cela : tu viens." },
  "qui":     { etym: "Du latin qui", defOrig: "Pronom relatif ou interrogatif désignant une personne.", defSimple: "Mot qui pose une question sur une personne ou qui relie deux phrases. 'L'homme qui court.'" },
  "quand":   { etym: "Du latin quando", defOrig: "Conjonction ou adverbe exprimant le temps.", defSimple: "Mot qui indique le moment. 'Quand il pleut' = au moment où il pleut." },
  "comme":   { etym: "Du latin quomodo", defOrig: "Conjonction ou adverbe exprimant la comparaison ou la cause.", defSimple: "Mot qui compare. 'Doux comme du miel' = aussi doux que du miel." },
  "si":      { etym: "Du latin si", defOrig: "Conjonction exprimant la condition.", defSimple: "Mot qui exprime une condition. 'Si tu viens, on mange' = à condition que tu viennes." },
  "ni":      { etym: "Du latin nec", defOrig: "Conjonction de coordination négative.", defSimple: "Mot négatif qui relie deux choses. 'Ni chaud ni froid' = pas chaud et pas froid non plus." },
  "dont":    { etym: "Du latin de + unde", defOrig: "Pronom relatif exprimant l'appartenance ou l'origine.", defSimple: "Mot qui relie et indique l'appartenance. 'Le livre dont je parle' = le livre de lequel je parle." },
  "où":      { etym: "Du latin ubi, où", defOrig: "Pronom relatif ou adverbe interrogatif de lieu.", defSimple: "Mot qui indique un endroit. 'La ville où je vis' = la ville dans laquelle je vis." },

  // Prépositions
  "dans":    { etym: "Du latin de + intus, dedans", defOrig: "Préposition indiquant la position à l'intérieur de quelque chose.", defSimple: "Mot qui indique qu'on est à l'intérieur. 'Dans la maison' = à l'intérieur de la maison." },
  "sur":     { etym: "Du latin super, au-dessus", defOrig: "Préposition indiquant la position au-dessus ou à la surface.", defSimple: "Mot qui indique qu'on est au-dessus. 'Sur la table' = posé sur la table." },
  "sous":    { etym: "Du latin subtus, en dessous", defOrig: "Préposition indiquant la position en dessous.", defSimple: "Mot qui indique qu'on est en dessous. 'Sous le lit' = en dessous du lit." },
  "avec":    { etym: "Du latin apud + hoc", defOrig: "Préposition indiquant la compagnie ou le moyen.", defSimple: "Mot qui indique qu'on est ensemble ou qu'on utilise quelque chose. 'Avec des amis.'" },
  "pour":    { etym: "Du latin pro", defOrig: "Préposition indiquant le but, la destination ou la durée.", defSimple: "Mot qui indique le but. 'Pour toi' = destiné à toi. 'Pour manger' = dans le but de manger." },
  "par":     { etym: "Du latin per, à travers", defOrig: "Préposition indiquant le moyen, la cause ou le passage.", defSimple: "Mot qui indique comment. 'Par le train' = en utilisant le train." },
  "entre":   { etym: "Du latin inter", defOrig: "Préposition indiquant une position intermédiaire.", defSimple: "Mot qui indique qu'on est au milieu. 'Entre deux chaises' = au milieu des deux chaises." },
  "vers":    { etym: "Du latin versus, tourné vers", defOrig: "Préposition indiquant la direction ou l'approximation.", defSimple: "Mot qui indique une direction. 'Vers la mer' = dans la direction de la mer." },
  "chez":    { etym: "Du latin casa, maison", defOrig: "Préposition indiquant le domicile ou l'établissement de quelqu'un.", defSimple: "Mot qui indique qu'on est à la maison de quelqu'un. 'Chez moi' = à ma maison." },
  "après":   { etym: "Du latin ad + pressum", defOrig: "Préposition ou adverbe indiquant ce qui vient ensuite.", defSimple: "Mot qui indique ce qui vient en second. 'Après le repas' = quand le repas est fini." },
  "avant":   { etym: "Du latin ab + ante", defOrig: "Préposition ou adverbe indiquant ce qui précède.", defSimple: "Mot qui indique ce qui vient en premier. 'Avant le repas' = avant que le repas commence." },
  "depuis":  { etym: "Du latin de + ex + post", defOrig: "Préposition indiquant le point de départ dans le temps ou l'espace.", defSimple: "Mot qui indique depuis quand. 'Depuis lundi' = à partir de lundi jusqu'à maintenant." },
  "jusqu":   { etym: "Du latin de + usque", defOrig: "Préposition indiquant la limite dans le temps ou l'espace.", defSimple: "Mot qui indique une limite. 'Jusqu'à minuit' = pas après minuit." },
  "pendant":  { etym: "Du latin pendere, être suspendu", defOrig: "Préposition indiquant la durée d'une action.", defSimple: "Mot qui indique combien de temps. 'Pendant deux heures' = durant deux heures." },
  "selon":   { etym: "Du latin secundum, suivant", defOrig: "Préposition indiquant la conformité à quelque chose.", defSimple: "Mot qui indique un point de vue. 'Selon moi' = d'après mon opinion." },
  "contre":  { etym: "Du latin contra, en face de", defOrig: "Préposition ou adverbe indiquant l'opposition ou le contact.", defSimple: "Mot qui indique l'opposition. 'Contre le mur' = appuyé sur le mur. 'Contre lui' = en opposition à lui." },
  "malgré":  { etym: "Du latin male + gratum", defOrig: "Préposition indiquant l'opposition, la concession.", defSimple: "Mot qui indique qu'on fait quelque chose quand même. 'Malgré la pluie' = même s'il pleut." },

  // Adverbes courants
  "aussi":   { etym: "Du latin aliud + sic", defOrig: "Adverbe exprimant l'addition ou la comparaison.", defSimple: "Mot qui indique qu'on ajoute quelque chose. 'Moi aussi' = pareil que toi." },
  "très":    { etym: "Du latin trans, au-delà", defOrig: "Adverbe d'intensité modifiant un adjectif ou un autre adverbe.", defSimple: "Mot qui renforce quelque chose. 'Très grand' = vraiment beaucoup grand." },
  "plus":    { etym: "Du latin plus", defOrig: "Adverbe comparatif indiquant une quantité supérieure.", defSimple: "Mot qui indique davantage. 'Plus grand' = davantage grand. 'En plus' = en ajout." },
  "moins":   { etym: "Du latin minus", defOrig: "Adverbe comparatif indiquant une quantité inférieure.", defSimple: "Mot qui indique en moindre quantité. 'Moins grand' = pas aussi grand." },
  "bien":    { etym: "Du latin bene", defOrig: "Adverbe indiquant la qualité ou renforçant une affirmation.", defSimple: "Mot qui indique que c'est de bonne qualité. 'Il mange bien' = il mange correctement." },
  "mal":     { etym: "Du latin male", defOrig: "Adverbe indiquant une mauvaise qualité ou une difficulté.", defSimple: "Mot qui indique que c'est de mauvaise qualité. 'Il chante mal' = il chante de façon mauvaise." },
  "peu":     { etym: "Du latin paucum", defOrig: "Adverbe indiquant une petite quantité.", defSimple: "Mot qui indique une petite quantité. 'Un peu de sucre' = une petite quantité de sucre." },
  "trop":    { etym: "Du germanique throp, tas", defOrig: "Adverbe indiquant un excès.", defSimple: "Mot qui indique qu'il y en a trop. 'Trop chaud' = plus chaud que ce qu'on veut." },
  "déjà":    { etym: "Du latin de + jam, dès maintenant", defOrig: "Adverbe indiquant qu'une action s'est produite avant le moment présent.", defSimple: "Mot qui indique que c'est fait. 'J'ai déjà mangé' = j'ai mangé avant maintenant." },
  "encore":  { etym: "Du latin hanc + horam, cette heure", defOrig: "Adverbe indiquant la répétition, la continuation ou l'addition.", defSimple: "Mot qui indique que ça continue. 'Encore faim' = toujours faim. 'Encore une fois' = une fois de plus." },
  "alors":   { etym: "Du latin ad + illam + horam", defOrig: "Adverbe ou conjonction indiquant le temps ou la conséquence.", defSimple: "Mot qui indique ce qui suit. 'Alors il est parti' = à ce moment-là, il est parti." },
  "ainsi":   { etym: "Du latin ad + sic, de cette façon", defOrig: "Adverbe indiquant la manière ou la conséquence.", defSimple: "Mot qui indique comment. 'Ainsi font les choses' = c'est comme ça que les choses se passent." },
  "pourtant":{ etym: "Du latin pro + tantum", defOrig: "Adverbe exprimant une opposition, une concession.", defSimple: "Mot qui marque une surprise ou un contraste. 'Il est gentil, pourtant il crie' = malgré sa gentillesse, il crie." },
  "cependant":{ etym: "Du latin per + pendant", defOrig: "Adverbe ou conjonction exprimant une opposition.", defSimple: "Mot qui indique une opposition. 'Il fait beau, cependant il fait froid' = malgré le soleil, il fait froid." },
  "parfois": { etym: "Du latin per + fois", defOrig: "Adverbe indiquant une fréquence irrégulière.", defSimple: "Mot qui indique que ça arrive de temps en temps. 'Parfois il pleut' = il pleut de temps en temps." },
  "peut-être":{ etym: "Du latin potest + esse", defOrig: "Locution adverbiale exprimant l'incertitude.", defSimple: "Mot qui indique qu'on n'est pas sûr. 'Peut-être demain' = il est possible que ce soit demain." },

  // Verbes courants
  "est":     { etym: "Du latin est, il est", defOrig: "Troisième personne du singulier du présent de l'indicatif du verbe être.", defSimple: "Le verbe 'être' conjugué. 'Il est grand' = il a la caractéristique d'être grand." },
  "sont":    { etym: "Du latin sunt", defOrig: "Troisième personne du pluriel du présent de l'indicatif du verbe être.", defSimple: "Le verbe 'être' au pluriel. 'Ils sont grands' = ils ont la caractéristique d'être grands." },
  "avoir":   { etym: "Du latin habere", defOrig: "Verbe auxiliaire et verbe de possession.", defSimple: "Verbe qui indique qu'on possède quelque chose. 'Avoir un chat' = posséder un chat." },
  "faire":   { etym: "Du latin facere", defOrig: "Verbe exprimant l'action, la fabrication ou la réalisation.", defSimple: "Verbe qui indique qu'on réalise quelque chose. 'Faire un gâteau' = préparer un gâteau." },
  "aller":   { etym: "Du latin ambulare, marcher", defOrig: "Verbe exprimant le déplacement vers un lieu.", defSimple: "Verbe qui indique qu'on se déplace. 'Aller à l'école' = se rendre à l'école." },
  "venir":   { etym: "Du latin venire", defOrig: "Verbe exprimant le mouvement vers le locuteur.", defSimple: "Verbe qui indique qu'on arrive vers quelqu'un. 'Viens ici' = déplace-toi vers moi." },
  "voir":    { etym: "Du latin videre", defOrig: "Verbe exprimant la perception visuelle.", defSimple: "Verbe qui indique qu'on perçoit avec les yeux. 'Je vois un oiseau' = mes yeux perçoivent un oiseau." },
  "savoir":  { etym: "Du latin sapere, avoir du goût", defOrig: "Verbe exprimant la connaissance ou la capacité.", defSimple: "Verbe qui indique qu'on connaît quelque chose. 'Je sais nager' = je connais comment nager." },
  "pouvoir": { etym: "Du latin potere, être puissant", defOrig: "Verbe modal exprimant la capacité, la permission ou la possibilité.", defSimple: "Verbe qui indique qu'on est capable. 'Je peux courir' = j'ai la capacité de courir." },
  "vouloir": { etym: "Du latin volere, vouloir", defOrig: "Verbe exprimant le désir ou la volonté.", defSimple: "Verbe qui indique qu'on désire quelque chose. 'Je veux du pain' = je désire du pain." },
  "dire":    { etym: "Du latin dicere", defOrig: "Verbe exprimant la parole ou l'énonciation.", defSimple: "Verbe qui indique qu'on parle. 'Il dit bonjour' = il prononce le mot bonjour." },
  "prendre": { etym: "Du latin prehendere, saisir", defOrig: "Verbe exprimant l'action de saisir ou d'adopter quelque chose.", defSimple: "Verbe qui indique qu'on attrape ou choisit quelque chose. 'Prendre un livre' = attraper un livre." },
  "donner":  { etym: "Du latin donare", defOrig: "Verbe exprimant l'action de remettre quelque chose à quelqu'un.", defSimple: "Verbe qui indique qu'on offre quelque chose. 'Donner un cadeau' = offrir un cadeau." },
  "trouver": { etym: "Du latin tropare, composer", defOrig: "Verbe exprimant la découverte ou l'opinion.", defSimple: "Verbe qui indique qu'on découvre ou qu'on pense. 'Je trouve ça beau' = je pense que c'est beau." },
  "mettre":  { etym: "Du latin mittere, envoyer", defOrig: "Verbe exprimant l'action de placer quelque chose quelque part.", defSimple: "Verbe qui indique qu'on place quelque chose. 'Mettre sur la table' = placer sur la table." },
  "passer":  { etym: "Du latin passare, marcher", defOrig: "Verbe exprimant le mouvement, l'écoulement du temps ou la transmission.", defSimple: "Verbe qui indique qu'on traverse ou que le temps s'écoule. 'Le temps passe' = le temps s'écoule." },
  "rendre":  { etym: "Du latin reddere, redonner", defOrig: "Verbe exprimant la restitution ou la transformation.", defSimple: "Verbe qui indique qu'on redonne ou transforme. 'Rendre service' = aider. 'Rendre heureux' = faire devenir heureux." },
  "tenir":   { etym: "Du latin tenere, tenir", defOrig: "Verbe exprimant le fait de maintenir ou de posséder.", defSimple: "Verbe qui indique qu'on maintient dans la main ou qu'on garde. 'Tenir un stylo' = garder le stylo dans la main." },
  "porter":  { etym: "Du latin portare, transporter", defOrig: "Verbe exprimant le transport ou le fait de revêtir.", defSimple: "Verbe qui indique qu'on transporte ou qu'on porte des vêtements. 'Porter un sac' = transporter un sac." },
  "montrer": { etym: "Du latin monstrare, indiquer", defOrig: "Verbe exprimant l'action de faire voir ou d'indiquer.", defSimple: "Verbe qui indique qu'on fait voir quelque chose. 'Montre-moi' = fais-moi voir." },
  "permettre":{ etym: "Du latin permittere, laisser passer", defOrig: "Verbe exprimant l'autorisation ou la possibilité.", defSimple: "Verbe qui indique qu'on autorise. 'Permettre de sortir' = autoriser à sortir." },
  "sembler": { etym: "Du latin simulare, imiter", defOrig: "Verbe exprimant l'apparence ou l'impression.", defSimple: "Verbe qui indique qu'on a l'air de quelque chose. 'Il semble fatigué' = il a l'air fatigué." },
  "devenir": { etym: "Du latin devenire, arriver", defOrig: "Verbe exprimant un changement d'état.", defSimple: "Verbe qui indique qu'on change. 'Devenir grand' = grandir, passer de petit à grand." },
  "rester":  { etym: "Du latin restare, demeurer", defOrig: "Verbe exprimant la permanence dans un lieu ou un état.", defSimple: "Verbe qui indique qu'on ne bouge pas ou qu'on continue pareil. 'Rester calme' = continuer à être calme." },
  "paraître":{ etym: "Du latin parescere, apparaître", defOrig: "Verbe exprimant l'apparence ou la publication.", defSimple: "Verbe qui indique qu'on a l'air de quelque chose. 'Il paraît fatigué' = il a l'air fatigué." },
  "deux":    { etym: "Du latin duos", defOrig: "Nombre entier entre un et trois.", defSimple: "Le chiffre 2. Un de plus que un, un de moins que trois." },
  "aujourd'hui": { etym: "Du latin ad + hoc + de + hoc + die, en ce jour", defOrig: "Adverbe désignant le jour présent, la journée actuelle.", defSimple: "Le jour où on est maintenant. Pas hier, pas demain — maintenant, ce jour-ci." },
  "trois":       { etym: "Du latin tres", defOrig: "Nombre entier entre deux et quatre.", defSimple: "Le chiffre 3." },
  "quatre":      { etym: "Du latin quattuor", defOrig: "Nombre entier entre trois et cinq.", defSimple: "Le chiffre 4." },
  "cinq":        { etym: "Du latin quinque", defOrig: "Nombre entier entre quatre et six.", defSimple: "Le chiffre 5." },
  "six":         { etym: "Du latin sex", defOrig: "Nombre entier entre cinq et sept.", defSimple: "Le chiffre 6." },
  "sept":        { etym: "Du latin septem", defOrig: "Nombre entier entre six et huit.", defSimple: "Le chiffre 7." },
  "huit":        { etym: "Du latin octo", defOrig: "Nombre entier entre sept et neuf.", defSimple: "Le chiffre 8." },
  "neuf":        { etym: "Du latin novem", defOrig: "Nombre entier entre huit et dix.", defSimple: "Le chiffre 9." },
  "dix":         { etym: "Du latin decem", defOrig: "Nombre entier entre neuf et onze.", defSimple: "Le chiffre 10." },

  "de":      { etym: "Du latin de", defOrig: "Préposition indiquant l'appartenance, l'origine, la matière ou la cause.", defSimple: "Mot très courant qui relie deux mots. 'La maison de Paul' = la maison qui appartient à Paul." },
  "à":       { etym: "Du latin ad", defOrig: "Préposition indiquant le lieu, le temps, le but ou l'appartenance.", defSimple: "Mot qui indique où on va ou à qui appartient quelque chose. 'Aller à Paris' = se rendre à Paris." },
  "ne":      { etym: "Du latin non", defOrig: "Adverbe de négation utilisé avec 'pas', 'plus', 'jamais'.", defSimple: "Mot qui sert à faire une phrase négative. 'Je ne sais pas' = je ne sais pas." },
  "pas":     { etym: "Du latin passus, pas", defOrig: "Adverbe de négation utilisé avec 'ne'.", defSimple: "Mot qui exprime la négation. 'Je ne veux pas' = refus de vouloir quelque chose." },

// Tous les mots manquants des 3 histoires du jour 3
// À ajouter dans lib/dictionary.ts juste avant le }; final

  "accepte":       { etym: "Du latin acceptare, recevoir", defOrig: "Consent à recevoir ou à admettre quelque chose.", defSimple: "Dire oui à quelque chose. Accepter un cadeau = vouloir bien le recevoir." },
  "actes":         { etym: "Du latin actus, action", defOrig: "Actions accomplies, comportements concrets.", defSimple: "Les choses qu'on fait. Nos actes = ce qu'on fait concrètement." },
  "actif":         { etym: "Du latin activus, qui agit", defOrig: "Qui est en action, qui fonctionne intensément.", defSimple: "Qui bouge et travaille. Être actif = faire des choses, ne pas rester immobile." },
  "anticiper":     { etym: "Du latin anticipare, prendre d'avance", defOrig: "Prévoir et se préparer à ce qui va arriver.", defSimple: "Penser à l'avance à ce qui va se passer pour s'y préparer." },
  "appel":         { etym: "Du latin appellare, s'adresser à", defOrig: "Action d'appeler, invitation à agir.", defSimple: "Une invitation à faire quelque chose. Un appel à l'action = une invitation à agir." },
  "associées":     { etym: "Du latin associare, unir", defOrig: "Reliées, liées à quelque chose d'autre.", defSimple: "Liées ensemble. Des protéines associées à une maladie = qu'on trouve souvent avec cette maladie." },
  "atteindre":     { etym: "Du latin attingere, toucher", defOrig: "Parvenir à un endroit ou à un objectif.", defSimple: "Arriver à quelque chose. Atteindre un but = y arriver." },
  "beau":          { etym: "Du latin bellus, joli", defOrig: "Qui est agréable à voir, qui plaît aux sens.", defSimple: "Qui plaît à regarder. Un beau tableau = un tableau qui nous plaît à voir." },
  "bel":           { etym: "Du latin bellus, joli", defOrig: "Forme de beau devant une voyelle.", defSimple: "Même chose que beau. Un bel arc = un arc beau à voir." },
  "besoin":        { etym: "Du germanique bisunni, nécessité", defOrig: "Nécessité, manque de quelque chose d'indispensable.", defSimple: "Quelque chose dont on a besoin pour vivre ou fonctionner. Le besoin de dormir = on ne peut pas s'en passer." },
  "bonheur":       { etym: "De bon + heur, chance", defOrig: "État de satisfaction complète, de plénitude.", defSimple: "Se sentir bien et content de vivre. Le bonheur = quand tout va bien et qu'on est heureux." },
  "cerveau":       { etym: "Du latin cerebellum, petite cervelle", defOrig: "Organe principal du système nerveux central, siège de la pensée.", defSimple: "L'organe dans ta tête qui contrôle tout : la pensée, les émotions, les mouvements." },
  "ciel":          { etym: "Du latin caelum", defOrig: "Espace visible au-dessus de la Terre.", defSimple: "Ce qu'on voit en levant les yeux : le bleu, les nuages, les étoiles." },
  "coloré":        { etym: "Du latin coloratus", defOrig: "Qui a des couleurs vives et variées.", defSimple: "Plein de couleurs. Un arc-en-ciel est très coloré." },
  "concentre":     { etym: "Du latin concentrare, rassembler au centre", defOrig: "Rassemble, focalise en un point.", defSimple: "Mettre toute son attention ou énergie sur quelque chose." },
  "conserve":      { etym: "Du latin conservare, garder", defOrig: "Garde intact, maintient en bon état.", defSimple: "Garder quelque chose intact. Conserver de la nourriture = l'empêcher de se gâter." },
  "contraire":     { etym: "Du latin contrarius, opposé", defOrig: "Qui s'oppose, qui est à l'opposé.", defSimple: "Le contraire de quelque chose = ce qui est à l'opposé. Le contraire de chaud = froid." },
  "corps":         { etym: "Du latin corpus", defOrig: "L'ensemble physique d'un être vivant.", defSimple: "Tout ce qui constitue notre partie physique : bras, jambes, tête, organes." },
  "déchets":       { etym: "Du latin dis + cadere, tomber", defOrig: "Résidus inutiles produits par un organisme ou une activité.", defSimple: "Ce qui reste et qu'on jette. Les déchets du corps = les substances inutiles que le corps doit éliminer." },
  "désirs":        { etym: "Du latin desiderare, regretter l'absence", defOrig: "Envies, aspirations vers quelque chose qu'on veut obtenir.", defSimple: "Ce qu'on veut avoir ou faire. Nos désirs = ce dont on a envie." },
  "domaine":       { etym: "Du latin dominium, propriété", defOrig: "Secteur, champ d'activité ou d'influence.", defSimple: "Un domaine = un secteur ou une zone. Le domaine de la médecine = tout ce qui concerne la médecine." },
  "dormir":        { etym: "Du latin dormire", defOrig: "Être dans un état de repos avec perte de conscience.", defSimple: "Se reposer en fermant les yeux et en perdant conscience. On dort la nuit." },
  "dos":           { etym: "Du latin dorsum", defOrig: "Partie postérieure du corps humain, de la nuque aux fesses.", defSimple: "La partie derrière du corps, entre les épaules et la taille." },
  "durant":        { etym: "Du latin durare, durer", defOrig: "Pendant la durée de, au cours de.", defSimple: "Pendant. Durant la nuit = pendant la nuit." },
  "effectuer":     { etym: "Du latin effectuare, accomplir", defOrig: "Réaliser, accomplir une action.", defSimple: "Faire quelque chose. Effectuer une tâche = accomplir une tâche." },
  "empire":        { etym: "Du latin imperium, commandement", defOrig: "Vaste ensemble de territoires gouvernés par un seul souverain.", defSimple: "Un très grand territoire dirigé par un seul chef puissant. L'empire romain était immense." },
  "énergie":       { etym: "Du grec energeia, force en action", defOrig: "Force, capacité à agir et à produire un effort.", defSimple: "La force qui permet d'agir. Avoir de l'énergie = se sentir fort et capable de faire des choses." },
  "événements":    { etym: "Du latin eventus, ce qui arrive", defOrig: "Faits qui se produisent, choses qui arrivent.", defSimple: "Des choses qui se passent. Les événements de la journée = tout ce qui s'est passé dans la journée." },
  "exact":         { etym: "Du latin exactus, accompli", defOrig: "Qui est parfaitement juste, précis, sans erreur.", defSimple: "Parfaitement précis. L'endroit exact = l'endroit précis, pas à côté." },
  "existe":        { etym: "Du latin existere, se manifester", defOrig: "A une existence réelle, est présent dans la réalité.", defSimple: "Est réel, est là. Les licornes n'existent pas = elles ne sont pas réelles." },
  "extérieurs":    { etym: "Du latin exterior, qui est dehors", defOrig: "Qui sont hors de nous, dans le monde qui nous entoure.", defSimple: "Ce qui est dehors, autour de nous. Les événements extérieurs = ce qui se passe dans le monde." },
  "fait":          { etym: "Du latin factum, ce qui est fait", defOrig: "Événement, réalité concrète ; aussi : troisième personne de faire.", defSimple: "Quelque chose de réel. Un fait = quelque chose qui s'est vraiment passé." },
  "fonctionne":    { etym: "Du latin functio, accomplissement", defOrig: "Marche correctement, remplit son rôle.", defSimple: "Marche bien. Une machine qui fonctionne = qui marche bien." },
  "fondamental":   { etym: "Du latin fundamentalis, de la base", defOrig: "Qui est à la base, essentiel, primordial.", defSimple: "Très important, à la base de tout. Un principe fondamental = une règle de base essentielle." },
  "force":         { etym: "Du latin fortia, courage", defOrig: "Puissance physique ou morale, intensité d'une action.", defSimple: "La puissance. La force d'un argument = sa capacité à convaincre." },
  "forme":         { etym: "Du latin forma, apparence", defOrig: "Apparence extérieure, façon dont quelque chose se présente.", defSimple: "L'apparence de quelque chose. La forme d'un arc = comment il est dessiné." },
  "gouvernait":    { etym: "Du latin gubernare, diriger", defOrig: "Dirigeait, administrait un État ou un territoire.", defSimple: "Dirigeait un pays. Le roi gouvernait = il prenait les décisions pour son pays." },
  "heure":         { etym: "Du latin hora", defOrig: "Unité de temps égale à 60 minutes.", defSimple: "Une unité de temps. Une heure = 60 minutes." },
  "immédiat":      { etym: "Du latin immediatus, sans intermédiaire", defOrig: "Qui se produit sans délai, tout de suite.", defSimple: "Qui arrive tout de suite. Un bonheur immédiat = qui arrive maintenant, pas après." },
  "informations":  { etym: "Du latin informatio, mise en forme", defOrig: "Données, éléments de connaissance communiqués.", defSimple: "Des données ou des nouvelles. Les informations de la journée = ce qui s'est passé." },
  "intérieure":    { etym: "Du latin interior, qui est dedans", defOrig: "Qui est à l'intérieur, dans le for interne.", defSimple: "Qui est à l'intérieur. La paix intérieure = se sentir calme à l'intérieur de soi." },
  "joue":          { etym: "Du latin jocare, plaisanter", defOrig: "Jouer ; aussi : joue (partie du visage).", defSimple: "Ici : jouer un rôle = avoir une importance. Le sommeil joue un rôle = il est important." },
  "journée":       { etym: "Du latin diurnata, espace d'un jour", defOrig: "Espace de temps correspondant à une journée complète.", defSimple: "Un jour entier, du matin au soir." },
  "long":          { etym: "Du latin longus", defOrig: "Qui a une grande étendue dans le temps ou l'espace.", defSimple: "Qui dure longtemps ou qui est étiré. Longtemps = pendant beaucoup de temps." },
  "longtemps":     { etym: "Du latin longum tempus", defOrig: "Pendant une longue durée.", defSimple: "Pendant beaucoup de temps. Attendre longtemps = attendre beaucoup." },
  "lucide":        { etym: "Du latin lucidus, clair", defOrig: "Qui voit les choses clairement, avec clarté d'esprit.", defSimple: "Qui comprend clairement la réalité. Être lucide = voir les choses telles qu'elles sont vraiment." },
  "lumière":       { etym: "Du latin lumen, luminis", defOrig: "Rayonnement visible permettant de voir les objets.", defSimple: "Ce qui éclaire et permet de voir. La lumière du soleil = les rayons qui éclairent la Terre." },
  "luxe":          { etym: "Du latin luxus, excès", defOrig: "Ce qui est superflu, raffiné et coûteux.", defSimple: "Quelque chose de très confortable mais pas obligatoire. Un luxe = ce qui est beau mais cher et pas nécessaire." },
  "maladies":      { etym: "Du latin male habitus, en mauvais état", defOrig: "Altérations de la santé, troubles du fonctionnement de l'organisme.", defSimple: "Quand le corps ne fonctionne pas bien. Les maladies = les rhumes, cancers, infections..." },
  "matin":         { etym: "Du latin matutinum", defOrig: "Partie de la journée entre le lever du soleil et midi.", defSimple: "Le début de la journée. Le matin = quand on se réveille jusqu'à midi." },
  "mémoire":       { etym: "Du latin memoria", defOrig: "Faculté de conserver et de rappeler des expériences passées.", defSimple: "La capacité de se souvenir. Avoir une bonne mémoire = se rappeler facilement les choses." },
  "modernes":      { etym: "Du latin modernus, récent", defOrig: "Qui appartiennent à l'époque actuelle, contemporains.", defSimple: "D'aujourd'hui, actuels. Les neurosciences modernes = la science du cerveau telle qu'elle est aujourd'hui." },
  "moments":       { etym: "Du latin momentum, mouvement", defOrig: "Instants, périodes de temps courtes.", defSimple: "Des instants ou des périodes. Les beaux moments = les instants agréables." },
  "neurosciences": { etym: "Du grec neuron + latin scientia", defOrig: "Sciences qui étudient le système nerveux et le cerveau.", defSimple: "Les sciences qui étudient le cerveau et comment il fonctionne." },
  "nombreux":      { etym: "Du latin numerosus", defOrig: "En grand nombre, abondants.", defSimple: "En grande quantité. Nombreux sont ceux qui... = beaucoup de personnes..." },
  "non":           { etym: "Du latin non", defOrig: "Adverbe de négation ou réponse négative.", defSimple: "Le contraire de oui. Non merci = je refuse poliment." },
  "nos":           { etym: "Du latin nostros", defOrig: "Adjectif possessif de la première personne du pluriel.", defSimple: "Ce qui appartient à nous. Nos amis = les amis qui sont à nous." },
  "notre":         { etym: "Du latin nostrum", defOrig: "Adjectif possessif de la première personne du pluriel au singulier.", defSimple: "Ce qui nous appartient. Notre maison = la maison qui est à nous." },
  "nuit":          { etym: "Du latin noctem", defOrig: "Période d'obscurité entre le coucher et le lever du soleil.", defSimple: "La partie sombre de la journée, quand il fait noir et qu'on dort." },
  "offre":         { etym: "Du latin offerre, présenter", defOrig: "Présente, propose quelque chose.", defSimple: "Donner ou proposer quelque chose. La nature nous offre = la nature nous donne." },
  "paix":          { etym: "Du latin pax, pacis", defOrig: "Absence de conflit, état de calme et de tranquillité.", defSimple: "Le calme et l'absence de guerre ou de conflit. La paix intérieure = se sentir calme." },
  "perdue":        { etym: "Du latin perdita, détruite", defOrig: "Qui n'est plus là, gaspillée, dont on est privé.", defSimple: "Qui n'existe plus ou qu'on ne peut plus récupérer. Une heure perdue = une heure gaspillée." },
  "petit":         { etym: "Du latin pittitus, petit oiseau", defOrig: "De faible dimension, de taille réduite.", defSimple: "Qui n'est pas grand. Un petit chien = un chien de petite taille." },
  "philosophie":   { etym: "Du grec philosophia, amour de la sagesse", defOrig: "Réflexion sur les grandes questions de l'existence et de la connaissance.", defSimple: "La réflexion sur les grandes questions de la vie : pourquoi sommes-nous là ? Qu'est-ce que la vérité ?" },
  "popularité":    { etym: "Du latin popularitas, faveur du peuple", defOrig: "Fait d'être aimé et connu par beaucoup de personnes.", defSimple: "Le fait que beaucoup de gens aiment ou connaissent quelque chose. La popularité d'une chanson = combien de gens l'aiment." },
  "premier":       { etym: "Du latin primarius, principal", defOrig: "Qui vient avant tous les autres, qui est au début.", defSimple: "Le numéro un, celui qui vient avant les autres." },
  "prenait":       { etym: "Du latin prehendere, saisir", defOrig: "Imparfait de prendre : saisissait, consacrait.", defSimple: "Prenait quelque chose dans le passé. Il prenait le temps = il consacrait du temps." },
  "principe":      { etym: "Du latin principium, commencement", defOrig: "Règle fondamentale, vérité première servant de base.", defSimple: "Une règle de base. Le principe de la physique = la règle fondamentale." },
  "promesse":      { etym: "Du latin promissa, ce qu'on a promis", defOrig: "Engagement de faire quelque chose, espoir que quelque chose se réalisera.", defSimple: "Ce qu'on promet de faire. Tenir sa promesse = faire ce qu'on a dit qu'on ferait." },
  "protéines":     { etym: "Du grec proteios, qui est au premier rang", defOrig: "Molécules biologiques essentielles à la structure et au fonctionnement des cellules.", defSimple: "De grandes molécules dont le corps a besoin. La viande et les oeufs sont riches en protéines." },
  "radicale":      { etym: "Du latin radicalis, qui tient à la racine", defOrig: "Qui va jusqu'à la racine des choses, fondamentale et complète.", defSimple: "Très forte et profonde, qui change tout. Une distinction radicale = une différence très nette et importante." },
  "radicalement":  { etym: "Du latin radicalis", defOrig: "De façon radicale, complètement, fondamentalement.", defSimple: "Complètement, de fond en comble. Radicalement différent = totalement différent." },
  "raison":        { etym: "Du latin ratio, calcul", defOrig: "Faculté de penser logiquement ; aussi : motif, cause.", defSimple: "La capacité de réfléchir logiquement. Agir avec raison = réfléchir avant d'agir." },
  "réalité":       { etym: "Du latin realitas, ce qui est réel", defOrig: "Ce qui existe vraiment, le monde tel qu'il est.", defSimple: "Ce qui est vrai et existe vraiment. La réalité = ce qui se passe vraiment, pas ce qu'on imagine." },
  "redouter":      { etym: "Du latin re + dubitare", defOrig: "Craindre fortement, avoir peur de quelque chose.", defSimple: "Avoir très peur de quelque chose. Redouter l'échec = avoir très peur d'échouer." },
  "remarquable":   { etym: "Du latin re + marcare, noter", defOrig: "Qui mérite d'être remarqué, exceptionnel.", defSimple: "Qui sort de l'ordinaire, impressionnant. Un résultat remarquable = un résultat exceptionnel." },
  "repos":         { etym: "Du latin repausare, se reposer", defOrig: "Cessation de l'activité pour récupérer ses forces.", defSimple: "Se reposer, ne plus bouger pour récupérer. Le repos après le sport = arrêter pour récupérer." },
  "repose":        { etym: "Du latin repausare", defOrig: "Est basé sur, a pour fondement.", defSimple: "Est basé sur quelque chose. Le stoïcisme repose sur une distinction = il est basé sur cette différence." },
  "représente":    { etym: "Du latin repraesentare, rendre présent", defOrig: "Symbolise, équivaut à quelque chose.", defSimple: "Correspond à. Une heure perdue représente = une heure perdue correspond à..." },
  "reviennent":    { etym: "Du latin re + venire", defOrig: "Retournent vers leur point de départ.", defSimple: "Retournent vers toi. Les couleurs reviennent vers toi = elles repartent dans ta direction." },
  "rêvons":        { etym: "Du vieux français resver", defOrig: "Première personne du pluriel du présent de rêver.", defSimple: "Nous faisons des rêves. Pendant qu'on rêve = pendant le sommeil quand des images apparaissent." },
  "révèle":        { etym: "Du latin revelare, ôter le voile", defOrig: "Montre, fait apparaître ce qui était caché.", defSimple: "Montre quelque chose de caché. Révéler un secret = dire quelque chose qu'on ne savait pas." },
  "rôle":          { etym: "Du latin rotulus, rouleau", defOrig: "Fonction, importance dans un ensemble.", defSimple: "L'importance qu'on a dans quelque chose. Le rôle du sommeil = ce à quoi sert le sommeil." },
  "sage":          { etym: "Du latin sapidus, qui a du goût", defOrig: "Personne qui possède une grande sagesse et maîtrise de soi.", defSimple: "Quelqu'un de très sage et calme qui comprend la vie. Un sage = quelqu'un qui a beaucoup de sagesse." },
  "second":        { etym: "Du latin secundus, qui suit", defOrig: "Qui vient en deuxième position.", defSimple: "Le deuxième. Le second domaine = le deuxième domaine." },
  "ses":           { etym: "Du latin suas", defOrig: "Adjectif possessif de la troisième personne du singulier au pluriel.", defSimple: "Ce qui lui appartient à lui/elle. Ses amis = les amis qui sont les siens." },
  "simple":        { etym: "Du latin simplex, d'un seul pli", defOrig: "Qui n'est pas compliqué, facile à comprendre.", defSimple: "Pas compliqué. Une explication simple = une explication facile à comprendre." },
  "siècle":        { etym: "Du latin saeculum, génération", defOrig: "Période de cent années.", defSimple: "Cent ans. Le XXe siècle = les années 1900-2000." },
  "siècles":       { etym: "Du latin saecula", defOrig: "Pluriel de siècle, plusieurs centaines d'années.", defSimple: "Plusieurs périodes de cent ans. Depuis des siècles = depuis très longtemps." },
  "sommeil":       { etym: "Du latin somniculus, petit sommeil", defOrig: "État de repos naturel et périodique de l'organisme.", defSimple: "Quand on dort. Le sommeil = le fait de dormir chaque nuit." },
  "son":           { etym: "Du latin suum", defOrig: "Adjectif possessif de la troisième personne du singulier.", defSimple: "Ce qui lui appartient. Son livre = le livre qui lui appartient." },
  "sportifs":      { etym: "De sport, de l'anglais", defOrig: "Personnes qui pratiquent un sport de façon régulière ou professionnelle.", defSimple: "Des personnes qui font du sport. Les sportifs de haut niveau = les champions." },
  "stoïcien":      { etym: "Du grec stoikos, du portique", defOrig: "Adepte du stoïcisme, qui pratique cette philosophie.", defSimple: "Quelqu'un qui suit la philosophie stoïcienne. Un sage stoïcien = quelqu'un qui vit selon les principes du stoïcisme." },
  "surprises":     { etym: "Du latin super + prendere", defOrig: "Événements inattendus qui étonnent.", defSimple: "Des choses inattendues et agréables. Les surprises de la nature = les belles choses qu'on ne s'attendait pas à voir." },
  "système":       { etym: "Du grec systema, ensemble organisé", defOrig: "Ensemble organisé d'éléments qui fonctionnent ensemble.", defSimple: "Un ensemble de parties qui fonctionnent ensemble. Le système solaire = le soleil et toutes ses planètes." },
  "temps":         { etym: "Du latin tempus", defOrig: "Durée, succession des instants ; aussi : météo.", defSimple: "La durée qui passe. Le temps = les secondes, minutes, heures qui s'écoulent." },
  "terme":         { etym: "Du latin terminus, limite", defOrig: "Limite dans le temps, fin ; aussi : mot, expression.", defSimple: "La fin ou un mot précis. À long terme = dans le futur, pas maintenant." },
  "toi":           { etym: "Du latin te", defOrig: "Pronom personnel tonique de la deuxième personne du singulier.", defSimple: "La personne à qui on parle. Toi = tu, la personne en face." },
  "tout":          { etym: "Du latin totus", defOrig: "La totalité, l'ensemble sans exception.", defSimple: "La totalité. Tout le monde = chaque personne. Tout = la totalité des choses." },
  "toute":         { etym: "Du latin tota", defOrig: "Féminin de tout, la totalité au féminin.", defSimple: "La totalité au féminin. Toute la journée = la journée entière." },
  "toutes":        { etym: "Du latin totas", defOrig: "Pluriel féminin de tout.", defSimple: "La totalité au pluriel féminin. Toutes les couleurs = chaque couleur." },
  "vaste":         { etym: "Du latin vastus, immense", defOrig: "Très grand, d'une grande étendue.", defSimple: "Très grand. Un vaste empire = un empire immense qui couvre beaucoup de territoire." },
  "verre":         { etym: "Du latin vitrum", defOrig: "Matière transparente et dure ; aussi : récipient.", defSimple: "Une matière transparente et dure. Un prisme de verre = un objet en verre qui décompose la lumière." },
  "vision":        { etym: "Du latin visio, action de voir", defOrig: "Manière de voir et de concevoir les choses.", defSimple: "La façon de voir les choses. Notre vision du monde = comment on comprend et conçoit le monde." },
  "véritable":     { etym: "Du latin veritabilis, vrai", defOrig: "Authentique, réel, qui mérite vraiment son nom.", defSimple: "Vraiment réel, authentique. Un véritable ami = un vrai ami, pas juste quelqu'un qu'on connaît." },

// Mots manquants — histoires du 3 juin (Tour Eiffel, Bâillement, Métaphores)
// À coller dans lib/dictionary.ts juste avant le }; final

  "abstraites":     { etym: "Du latin abstractus, tiré de", defOrig: "Qui n'existent que dans l'esprit, sans réalité concrète.", defSimple: "Des idées qui n'ont pas de forme physique. La liberté, l'amour sont des choses abstraites." },
  "accueille":      { etym: "Du latin ad + colligere, rassembler", defOrig: "Reçoit des personnes, les héberge.", defSimple: "Reçoit des gens. La Tour Eiffel accueille des visiteurs = elle reçoit des gens." },
  "aide":           { etym: "Du latin adjutare, assister", defOrig: "Apporte une assistance, un soutien.", defSimple: "Donner un coup de main. Aide quelqu'un = l'assiste." },
  "amis":           { etym: "Du latin amicus, qui aime", defOrig: "Personnes avec qui on a des liens d'amitié.", defSimple: "Les gens qu'on aime bien et avec qui on passe du temps." },
  "an":             { etym: "Du latin annus", defOrig: "Période de douze mois.", defSimple: "Une année. Il a dix ans = il a vécu dix années." },
  "animaux":        { etym: "Du latin animalia, êtres vivants", defOrig: "Êtres vivants non végétaux, capables de se mouvoir.", defSimple: "Les chats, chiens, lions, oiseaux... tout ce qui vit et bouge mais n'est pas une plante." },
  "ans":            { etym: "Du latin annos", defOrig: "Pluriel d'an, unité de mesure du temps.", defSimple: "Plusieurs années. Il a vingt ans = il est né il y a vingt années." },
  "antenne":        { etym: "Du latin antenna, vergue de navire", defOrig: "Dispositif servant à émettre ou recevoir des ondes radio.", defSimple: "Un équipement qui envoie ou reçoit des signaux radio ou télé." },
  "appréhender":    { etym: "Du latin apprehendere, saisir", defOrig: "Saisir par l'intelligence, comprendre.", defSimple: "Comprendre quelque chose de complexe. Appréhender une idée = la comprendre." },
  "appuyer":        { etym: "Du latin appodiare, s'appuyer", defOrig: "Exercer une pression sur quelque chose.", defSimple: "Presser sur quelque chose. Appuyer sur un bouton = le presser pour l'activer." },
  "artistes":       { etym: "Du latin ars, artis, art", defOrig: "Personnes qui pratiquent un art, créent des œuvres.", defSimple: "Les peintres, musiciens, sculpteurs... tous ceux qui créent des œuvres." },
  "assemblées":     { etym: "Du latin assimulare, rassembler", defOrig: "Réunies, mises ensemble pour former un tout.", defSimple: "Mises ensemble. Les pièces assemblées = les morceaux mis ensemble pour former l'objet." },
  "au":             { etym: "Contraction de à + le", defOrig: "Préposition contractée, contraction de 'à le'.", defSimple: "Contraction de 'à' et 'le'. 'Au marché' = à le marché." },
  "autres":         { etym: "Du latin alterum, l'autre", defOrig: "Personnes ou choses différentes de celles mentionnées.", defSimple: "Des personnes ou choses différentes. Les autres = ceux qui ne sont pas nous." },
  "avons":          { etym: "Du latin habemus", defOrig: "Première personne du pluriel du présent de avoir.", defSimple: "Nous possédons quelque chose. Nous avons un chat = nous possédons un chat." },
  "bat":            { etym: "Du latin battuere, frapper", defOrig: "Frappe ; aussi : troisième personne de battre.", defSimple: "Troisième personne de battre. Ça bat de l'aile = ça ne va pas très bien." },
  "beaucoup":       { etym: "De beau + coup", defOrig: "En grande quantité, en grand nombre.", defSimple: "En grande quantité. Beaucoup de gens = un grand nombre de personnes." },
  "bouton":         { etym: "Du vieux français boter, pousser", defOrig: "Petit dispositif qu'on presse pour déclencher quelque chose.", defSimple: "Un petit truc qu'on presse. Le bouton d'une sonnette = ce sur quoi on appuie pour sonner." },
  "bâille":         { etym: "Du latin badare, ouvrir la bouche", defOrig: "Ouvre involontairement la bouche en inspirant profondément.", defSimple: "Ouvre grand la bouche sans faire exprès, souvent quand on est fatigué." },
  "bâillement":     { etym: "Du latin badare, ouvrir la bouche", defOrig: "Action de bâiller, ouverture involontaire de la bouche.", defSimple: "Le fait d'ouvrir grand la bouche quand on est fatigué ou qu'on voit quelqu'un d'autre le faire." },
  "bâillent":       { etym: "Du latin badare", defOrig: "Troisième personne du pluriel de bâiller.", defSimple: "Ils ouvrent grand la bouche. Les chimpanzés bâillent = ils ouvrent la bouche comme nous." },
  "bâiller":        { etym: "Du latin badare, ouvrir la bouche", defOrig: "Ouvrir involontairement la bouche en inspirant longuement.", defSimple: "Ouvrir grand la bouche sans faire exprès. On bâille quand on est fatigué." },
  "bébés":          { etym: "Onomatopée de l'enfant qui babille", defOrig: "Très jeunes enfants, nourrissons.", defSimple: "Des tout petits enfants qui viennent de naître." },
  "certains":       { etym: "Du latin certanus, assuré", defOrig: "Quelques-uns, un nombre indéterminé parmi d'autres.", defSimple: "Quelques-uns parmi d'autres. Certains aiment le chocolat = pas tout le monde mais quelques personnes." },
  "ces":            { etym: "Du latin ecce istos", defOrig: "Adjectif démonstratif pluriel.", defSimple: "Mot qui montre plusieurs choses. Ces livres = ces livres-là, ceux dont on parle." },
  "cette":          { etym: "Du latin ecce istam", defOrig: "Adjectif démonstratif féminin singulier.", defSimple: "Mot qui montre une chose féminine. Cette maison = cette maison-là." },
  "chiens":         { etym: "Du latin canis", defOrig: "Mammifères domestiques, meilleurs amis de l'homme.", defSimple: "Les animaux domestiques qui aboient. Le chien est le meilleur ami de l'homme." },
  "choix":          { etym: "Du vieux français choisir", defOrig: "Action de choisir entre plusieurs possibilités.", defSimple: "Quand on doit décider entre plusieurs options. Faire un choix = prendre une décision." },
  "chose":          { etym: "Du latin causa, cause", defOrig: "Objet, fait ou idée dont on parle sans le nommer précisément.", defSimple: "Un objet ou une idée qu'on ne nomme pas précisément. 'Cette chose' = cet objet dont je parle." },
  "collective":     { etym: "Du latin collectivus, rassemblé", defOrig: "Qui appartient à un groupe, qui concerne tous ensemble.", defSimple: "Qui appartient à tout le monde ensemble. Une décision collective = prise par le groupe." },
  "communications": { etym: "Du latin communicatio, mise en commun", defOrig: "Échanges d'informations, transmissions de messages.", defSimple: "Les moyens d'envoyer des messages. Téléphone, internet sont des moyens de communication." },
  "comprendre":     { etym: "Du latin comprehendere, saisir", defOrig: "Saisir le sens de quelque chose par l'intelligence.", defSimple: "Saisir ce que quelque chose veut dire. Comprendre une leçon = en saisir le sens." },
  "concept":        { etym: "Du latin conceptus, idée conçue", defOrig: "Idée abstraite et générale qui sert à comprendre et classer.", defSimple: "Une idée abstraite et générale. Le concept de liberté = l'idée générale de ce qu'est la liberté." },
  "conception":     { etym: "Du latin conceptio, action de concevoir", defOrig: "Façon de concevoir, de comprendre quelque chose.", defSimple: "La façon de voir et de comprendre quelque chose. Ma conception du bonheur = comment je comprends ce qu'est le bonheur." },
  "conceptualisé":  { etym: "Du latin conceptus, idée", defOrig: "Compris et représenté sous forme de concept abstrait.", defSimple: "Transformé en concept, en idée abstraite. Le temps conceptualisé comme un fleuve = on le pense comme un fleuve." },
  "connectés":      { etym: "Du latin connectere, lier ensemble", defOrig: "Reliés, en lien les uns avec les autres.", defSimple: "Reliés ensemble. Connectés les uns aux autres = qui ont un lien entre eux." },
  "conscience":     { etym: "Du latin conscientia, connaissance intérieure", defOrig: "Sentiment qu'a l'être humain de sa propre existence.", defSimple: "Le fait d'être conscient, d'avoir des pensées et de se savoir vivant." },
  "considérer":     { etym: "Du latin considerare, examiner attentivement", defOrig: "Envisager, examiner attentivement, penser que.", defSimple: "Penser que quelque chose est d'une certaine façon. Considérer quelqu'un comme un ami = le voir comme un ami." },
  "construite":     { etym: "Du latin constructa, bâtie", defOrig: "Bâtie, érigée, édifiée.", defSimple: "Bâtie, fabriquée. La tour a été construite = on l'a bâtie." },
  "copie":          { etym: "Du latin copia, abondance puis reproduction", defOrig: "Reproduit à l'identique, imite.", defSimple: "Fait pareil que quelqu'un d'autre. Le cerveau copie = il imite ce qu'il voit." },
  "coup":           { etym: "Du latin colpus, choc", defOrig: "Choc, frappe ; aussi : action rapide.", defSimple: "Une action rapide. D'un coup = soudainement, en une seule fois." },
  "criblé":         { etym: "Du latin cribellum, petit crible", defOrig: "Percé de nombreux trous.", defSimple: "Plein de trous. Criblé de trous = avec beaucoup de trous dedans." },
  "culture":        { etym: "Du latin cultura, soin", defOrig: "Ensemble des croyances, arts, coutumes d'une société.", defSimple: "Tout ce qu'un groupe de personnes partage : langue, traditions, arts, façons de vivre." },
  "cultures":       { etym: "Du latin cultura, pluriel", defOrig: "Ensembles des traditions et valeurs de différentes sociétés.", defSimple: "Les différentes façons de vivre et de penser de différents peuples." },
  "dame":           { etym: "Du latin domina, maîtresse", defOrig: "Femme adulte respectée ; titre honorifique.", defSimple: "Une femme. La dame de fer = surnom de la Tour Eiffel." },
  "devint":         { etym: "Du latin devenire, arriver", defOrig: "Passé simple de devenir, changea d'état.", defSimple: "Passa à un autre état. Elle devint indispensable = elle commença à être indispensable." },
  "difficile":      { etym: "Du latin difficilis, malaisé", defOrig: "Qui nécessite un effort, qui n'est pas facile.", defSimple: "Pas facile. Un exercice difficile = qui demande beaucoup d'effort." },
  "différentes":    { etym: "Du latin differens, qui diffère", defOrig: "Qui ne sont pas pareilles, qui ont des caractéristiques distinctes.", defSimple: "Pas pareilles. Des choses différentes = des choses qui ne se ressemblent pas." },
  "discours":       { etym: "Du latin discursus, course en tous sens", defOrig: "Ensemble de paroles ou d'écrits exprimant une pensée.", defSimple: "Un texte ou des paroles organisés. Un discours politique = un texte qu'un homme politique prononce." },
  "discussion":     { etym: "Du latin discussio, examen", defOrig: "Échange de points de vue, débat entre personnes.", defSimple: "Une conversation où on échange des idées. Une discussion = quand on parle d'un sujet ensemble." },
  "disons":         { etym: "Du latin dicimus", defOrig: "Première personne du pluriel du présent de dire.", defSimple: "Nous disons. Quand on dit quelque chose = quand on le prononce." },
  "disponible":     { etym: "Du latin disponere, disposer", defOrig: "Dont on peut disposer, qu'on peut utiliser.", defSimple: "Qu'on peut utiliser. Un outil disponible = un outil qu'on peut prendre et utiliser." },
  "débats":         { etym: "Du latin de + battuere, frapper en retour", defOrig: "Discussions animées où s'affrontent des points de vue opposés.", defSimple: "Des discussions où les gens ne sont pas d'accord. Un débat politique = une discussion sur des idées opposées." },
  "déclencha":      { etym: "Du latin de + clenche, loquet", defOrig: "Fit commencer, provoqua.", defSimple: "Fit commencer quelque chose. Ça a déclenché une réaction = ça a provoqué une réaction." },
  "défi":           { etym: "Du latin diffidare, se méfier", defOrig: "Tâche difficile qui nécessite du courage ou de l'habileté.", defSimple: "Un challenge, quelque chose de difficile à réussir. Relever un défi = accepter et réussir un challenge." },
  "démontée":       { etym: "Du latin de + montare, monter", defOrig: "Démantelée, séparée en ses parties constituantes.", defSimple: "Démantelée, désassemblée. Une tour démontée = une tour dont on enlève tous les morceaux." },
  "dépense":        { etym: "Du latin dispensa, distribution", defOrig: "Utilise de l'argent, consomme.", defSimple: "Utilise de l'argent. On dépense son argent = on l'utilise pour acheter des choses." },
  "embellissement": { etym: "De embellir, rendre beau", defOrig: "Action de rendre plus beau, ornement ajouté.", defSimple: "Quelque chose qu'on ajoute pour rendre plus beau. Un embellissement = une décoration." },
  "entrer":         { etym: "Du latin intrare, aller à l'intérieur", defOrig: "Aller à l'intérieur, pénétrer dans un lieu.", defSimple: "Aller à l'intérieur. Entrer dans une maison = passer la porte pour être dedans." },
  "entrouvrir":     { etym: "Du latin intro + aperire", defOrig: "Ouvrir à moitié, légèrement.", defSimple: "Ouvrir un petit peu. Entrouvrir une fenêtre = l'ouvrir légèrement." },
  "envenimée":      { etym: "Du latin venenum, poison", defOrig: "Devenue plus grave, plus hostile, empoisonnée.", defSimple: "Devenue de plus en plus mauvaise. Une situation envenimée = qui s'est dégradée." },
  "fabriquées":     { etym: "Du latin fabricare, construire", defOrig: "Produites, manufacturées dans une usine.", defSimple: "Faites en usine. Les pièces fabriquées = les morceaux produits en usine." },
  "facilement":     { etym: "Du latin facilis, aisé + suffixe -ment", defOrig: "Sans difficulté, avec aisance.", defSimple: "Sans effort. Faire quelque chose facilement = sans difficulté." },
  "faisant":        { etym: "Du latin faciendo", defOrig: "En train de faire, participe présent de faire.", defSimple: "Pendant qu'on fait. En faisant cela = pendant qu'on fait cette action." },
  "façon":          { etym: "Du latin factio, action de faire", defOrig: "Manière de faire quelque chose.", defSimple: "La manière de faire. Une façon de parler = comment on parle." },
  "fenêtre":        { etym: "Du latin fenestra", defOrig: "Ouverture dans un mur pour laisser entrer la lumière.", defSimple: "L'ouverture dans un mur avec du verre qui laisse entrer la lumière." },
  "fer":            { etym: "Du latin ferrum", defOrig: "Métal gris très résistant ; au figuré, qui est dur et solide.", defSimple: "Un métal solide et gris. La dame de fer = surnom de la Tour Eiffel car elle est en métal." },
  "figures":        { etym: "Du latin figura, forme", defOrig: "Formes, représentations ; en rhétorique, procédés stylistiques.", defSimple: "Des formes ou des façons de parler. Figures de style = des façons spéciales d'écrire comme les métaphores." },
  "fil":            { etym: "Du latin filum, fil", defOrig: "Long brin de matière souple ; au figuré, transmission.", defSimple: "Un brin long et fin. Un fil électrique = le câble qui transporte l'électricité." },
  "fleuve":         { etym: "Du latin fluvius, cours d'eau", defOrig: "Grand cours d'eau qui se jette dans la mer.", defSimple: "Un très grand cours d'eau. La Seine et le Rhône sont des fleuves." },
  "fondamentales":  { etym: "Du latin fundamentalis, de la base", defOrig: "Qui sont à la base, essentielles.", defSimple: "Qui sont à la base de tout. Des différences fondamentales = des différences très importantes." },
  "frais":          { etym: "Du germanique frisk, frais", defOrig: "D'une température légèrement froide et agréable.", defSimple: "Légèrement froid et agréable. L'air frais = l'air un peu froid et pur." },
  "français":       { etym: "Du latin franciscus, des Francs", defOrig: "Relatif à la France ou à la langue française.", defSimple: "Qui vient de France ou qui concerne la langue française." },
  "furent":         { etym: "Du latin fuerunt", defOrig: "Passé simple pluriel de être.", defSimple: "Ils étaient, au passé. Les pièces furent fabriquées = on les a fabriquées." },
  "fut":            { etym: "Du latin fuit", defOrig: "Passé simple singulier de être.", defSimple: "Il/elle était, au passé. La tour fut construite = on l'a construite." },
  "gaspille":       { etym: "Du vieux français gaspiller", defOrig: "Utilise de façon excessive ou inutile.", defSimple: "Utiliser de façon inutile. Gaspiller l'eau = en utiliser plus que nécessaire." },
  "guerre":         { etym: "Du germanique werra, discorde", defOrig: "Conflit armé entre États ou groupes.", defSimple: "Un conflit armé entre pays ou groupes. La Première Guerre mondiale = la grande guerre 1914-1918." },
  "honneur":        { etym: "Du latin honor, estime", defOrig: "Estime due à quelqu'un pour ses qualités morales.", defSimple: "La réputation et le respect qu'on mérite. Avoir de l'honneur = être digne d'estime." },
  "idée":           { etym: "Du grec idea, forme", defOrig: "Représentation intellectuelle, pensée abstraite.", defSimple: "Une pensée, quelque chose qu'on a dans la tête. Une bonne idée = une pensée utile." },
  "implicite":      { etym: "Du latin implicitus, enveloppé", defOrig: "Qui est contenu dans quelque chose sans être exprimé clairement.", defSimple: "Qui n'est pas dit clairement mais sous-entendu. Un accord implicite = un accord qu'on comprend sans le dire." },
  "influence":      { etym: "Du latin influere, couler dans", defOrig: "Action qu'une chose exerce sur une autre.", defSimple: "L'effet qu'une chose a sur une autre. L'influence de la musique sur l'humeur = comment la musique change notre humeur." },
  "initialement":   { etym: "Du latin initialis, du début", defOrig: "Au départ, à l'origine, dans un premier temps.", defSimple: "Au début. Initialement prévu = prévu au départ." },
  "insolubles":     { etym: "Du latin insolubilis, qu'on ne peut défaire", defOrig: "Qui ne peuvent pas être résolus.", defSimple: "Qu'on ne peut pas résoudre. Des problèmes insolubles = des problèmes sans solution." },
  "issus":          { etym: "Du latin exitus, sorti", defOrig: "Qui proviennent de, qui ont leur origine dans.", defSimple: "Qui viennent de. Issus du monde physique = qui viennent du monde réel." },
  "jours":          { etym: "Du latin diurnus, du jour", defOrig: "Pluriel de jour, périodes de 24 heures.", defSimple: "Plusieurs périodes de 24 heures. Deux jours = 48 heures." },
  "lampadaire":     { etym: "Du latin lampas, lampe + aire", defOrig: "Grand appareil d'éclairage sur pied installé dans la rue.", defSimple: "Un grand poteau avec une lampe qui éclaire les rues la nuit." },
  "langage":        { etym: "Du latin lingua, langue", defOrig: "Système de signes permettant la communication.", defSimple: "La façon d'utiliser les mots pour communiquer. Le langage = comment on parle et écrit." },
  "leur":           { etym: "Du latin illorum", defOrig: "Adjectif possessif de la troisième personne du pluriel.", defSimple: "Ce qui appartient à eux. Leur maison = la maison qui leur appartient." },
  "leurs":          { etym: "Du latin illorum", defOrig: "Pluriel de leur, adjectif possessif.", defSimple: "Ce qui appartient à eux, au pluriel. Leurs amis = les amis qui leur appartiennent." },
  "lions":          { etym: "Du latin leo, leonis", defOrig: "Grands félins d'Afrique, symboles de force et royauté.", defSimple: "De grands animaux sauvages d'Afrique avec une crinière. Le roi des animaux." },
  "maman":          { etym: "Mot enfantin pour mère", defOrig: "Terme affectueux pour désigner sa mère.", defSimple: "La maman = la mère, celle qui a donné naissance." },
  "manière":        { etym: "Du latin manuaria, relative à la main", defOrig: "Façon de faire, d'agir ou de se comporter.", defSimple: "La façon de faire quelque chose. De quelle manière = comment." },
  "maîtres":        { etym: "Du latin magister, celui qui commande", defOrig: "Personnes qui ont autorité sur d'autres ; propriétaires d'animaux.", defSimple: "Les propriétaires d'animaux. Les maîtres des chiens = les personnes à qui appartiennent les chiens." },
  "militaires":     { etym: "Du latin militaris, du soldat", defOrig: "Relatifs à l'armée, à la défense nationale.", defSimple: "Qui concernent l'armée. Les communications militaires = les messages envoyés entre soldats." },
  "millions":       { etym: "Du latin mille, mille", defOrig: "Mille fois mille, 1 000 000.", defSimple: "Un très grand nombre. Six millions de visiteurs = 6 000 000 personnes." },
  "mobilisons":     { etym: "Du latin mobilis, mobile", defOrig: "Faisons appel à, utilisons.", defSimple: "Utilisons, faisons appel à. Nous mobilisons nos connaissances = nous les utilisons." },
  "modes":          { etym: "Du latin modus, manière", defOrig: "Façons d'être ou de faire.", defSimple: "Des façons de faire. Des modes de pensée = des façons de penser." },
  "mois":           { etym: "Du latin mensis", defOrig: "Chacune des douze divisions de l'année.", defSimple: "Une des 12 parties de l'année. Janvier, février sont des mois." },
  "mondiale":       { etym: "Du latin mundus, monde", defOrig: "Qui concerne le monde entier.", defSimple: "Qui touche le monde entier. La Première Guerre mondiale = une guerre dans le monde entier." },
  "monument":       { etym: "Du latin monumentum, souvenir", defOrig: "Ouvrage architectural remarquable ou d'intérêt historique.", defSimple: "Un grand bâtiment ou structure important. La Tour Eiffel est un monument célèbre." },
  "métalliques":    { etym: "Du latin metallicus, du métal", defOrig: "Faites de métal, en métal.", defSimple: "En métal. Des pièces métalliques = des morceaux en métal." },
  "même":           { etym: "Du latin metipsimus", defOrig: "Identique, pareil ; aussi : renforcement.", defSimple: "Pareil, identique. Le même livre = le livre identique. Même les bébés = y compris les bébés." },
  "navigue":        { etym: "Du latin navigare, voyager sur l'eau", defOrig: "Voyage sur l'eau ou dans les airs ; se déplace.", defSimple: "Voyage sur l'eau. Un bateau navigue = il avance sur l'eau." },
  "ont":            { etym: "Du latin habent", defOrig: "Troisième personne du pluriel du présent de avoir.", defSimple: "Ils possèdent. Ils ont une maison = ils possèdent une maison." },
  "ordinaires":     { etym: "Du latin ordinarius, conforme à l'ordre", defOrig: "Habituels, courants, qui n'ont rien d'exceptionnel.", defSimple: "Habituels, normaux. Des métaphores ordinaires = des métaphores qu'on utilise tous les jours." },
  "ornements":      { etym: "Du latin ornamentum, parure", defOrig: "Éléments décoratifs ajoutés pour embellir.", defSimple: "Des décorations. Un ornement = quelque chose qu'on ajoute pour que ce soit plus beau." },
  "parlent":        { etym: "Du latin parabolare", defOrig: "Troisième personne du pluriel de parler.", defSimple: "Ils disent des choses. Ils ne parlent pas de la même chose = ils évoquent des sujets différents." },
  "parmi":          { etym: "Du latin per + medium", defOrig: "Au milieu de, dans un groupe de.", defSimple: "Au milieu de. Parmi les visiteurs = dans le groupe des visiteurs." },
  "pensent":        { etym: "Du latin pensant", defOrig: "Troisième personne du pluriel de penser.", defSimple: "Ils réfléchissent. Les scientifiques pensent = c'est ce que les scientifiques croient." },
  "pensée":         { etym: "Du latin pensata, ce qu'on a pesé", defOrig: "Activité de l'esprit, réflexion ; idée produite par l'esprit.", defSimple: "Ce qui se passe dans notre tête quand on réfléchit. Une pensée = une idée." },
  "personnes":      { etym: "Du latin persona, masque de théâtre", defOrig: "Êtres humains considérés individuellement.", defSimple: "Des gens, des êtres humains. Plusieurs personnes = plusieurs individus." },
  "physique":       { etym: "Du grec physikos, de la nature", defOrig: "Relatif au corps, à la matière et aux forces naturelles.", defSimple: "Qui concerne le corps ou la matière. Le monde physique = le monde réel qu'on peut toucher." },
  "pièces":         { etym: "Du latin pecia, morceau", defOrig: "Éléments constitutifs d'un ensemble, parties d'un mécanisme.", defSimple: "Les morceaux qui composent quelque chose. Les pièces d'un puzzle = les morceaux du puzzle." },
  "place":          { etym: "Du latin platea, large rue", defOrig: "Espace, lieu ; position dans un endroit.", defSimple: "Un endroit, un espace. Sur place = à l'endroit même où on travaille." },
  "plutôt":         { etym: "Du latin plus + tôt", defOrig: "De préférence, ou davantage.", defSimple: "De préférence. Plutôt cela = je préfère cela." },
  "pourquoi":       { etym: "Du latin pro + quod", defOrig: "Pour quelle raison, dans quel but.", defSimple: "La question qui demande la raison. Pourquoi tu pleures = quelle est la raison de tes pleurs." },
  "poètes":         { etym: "Du grec poietes, créateur", defOrig: "Auteurs qui écrivent de la poésie.", defSimple: "Des artistes qui écrivent des poèmes. Victor Hugo et Rimbaud étaient des poètes." },
  "première":       { etym: "Du latin primaria, principale", defOrig: "Féminin de premier, qui vient avant tout.", defSimple: "Féminin de premier. La première fois = la fois qui vient avant toutes les autres." },
  "profondément":   { etym: "Du latin profunde + ment", defOrig: "D'une façon profonde, intense.", defSimple: "Très fort, en profondeur. Profondément endormi = très profondément dans le sommeil." },
  "prévue":         { etym: "Du latin praevidere, voir d'avance", defOrig: "Planifiée, envisagée à l'avance.", defSimple: "Planifiée d'avance. Prévue pour être démontée = on avait prévu de la démonter." },
  "publiés":        { etym: "Du latin publicare, rendre public", defOrig: "Rendus publics, édités et diffusés.", defSimple: "Mis à la disposition du public. Un livre publié = un livre qu'on peut acheter et lire." },
  "qualifièrent":   { etym: "Du latin qualificare, donner une qualité", defOrig: "Désignèrent par un terme, caractérisèrent.", defSimple: "Appelèrent d'une certaine façon. Ils la qualifièrent de disgracieuse = ils l'ont appelée disgracieuse." },
  "quelqu'un":      { etym: "Du latin quisquam unum", defOrig: "Une personne indéterminée.", defSimple: "Une personne dont on ne précise pas le nom. Quelqu'un frappe = une personne, on ne sait pas qui." },
  "question":       { etym: "Du latin quaestio, recherche", defOrig: "Demande d'information, problème à résoudre.", defSimple: "Quelque chose qu'on demande pour avoir une réponse. Poser une question = demander quelque chose." },
  "quotidienne":    { etym: "Du latin quotidianus, de chaque jour", defOrig: "De chaque jour, qui se passe tous les jours.", defSimple: "De tous les jours. La vie quotidienne = ce qu'on fait chaque jour." },
  "rattrapé":       { etym: "Du latin re + ad + trappe", defOrig: "Regagné, récupéré ce qu'on avait perdu.", defSimple: "Récupéré. Rattrapé son honneur = regagné sa réputation." },
  "regardant":      { etym: "Du latin regarder, regarder de nouveau", defOrig: "En train de regarder, participe présent de regarder.", defSimple: "En train de regarder. En regardant = pendant qu'on regarde." },
  "relation":       { etym: "Du latin relatio, récit", defOrig: "Lien entre deux personnes ou deux choses.", defSimple: "Un lien entre des personnes. Une relation amicale = un lien d'amitié." },
  "releva":         { etym: "Du latin re + levare, soulever", defOrig: "Accepta et accomplit avec succès.", defSimple: "Accepta et réussit. Il releva le défi = il a accepté et réussi la tâche difficile." },
  "remis":          { etym: "Du latin remissus, renvoyé", defOrig: "Redonné, soumis à nouveau à l'examen.", defSimple: "Remis en question = questionné à nouveau, douté de nouveau." },
  "ressource":      { etym: "Du latin resurgere, se relever", defOrig: "Moyen dont on peut disposer.", defSimple: "Quelque chose dont on peut se servir. Les ressources naturelles = ce que la nature nous offre." },
  "rire":           { etym: "Du latin ridere", defOrig: "Manifestation joyeuse par des sons et des mouvements du visage.", defSimple: "Ce qu'on fait quand quelque chose est drôle. Le rire est contagieux = quand quelqu'un rit, on rit aussi." },
  "réalités":       { etym: "Du latin realitas, au pluriel", defOrig: "Ce qui existe vraiment, les choses concrètes.", defSimple: "Les choses qui existent vraiment. Les réalités de la vie = ce qui est vraiment vrai." },
  "réservées":      { etym: "Du latin reservare, garder", defOrig: "Destinées exclusivement à quelqu'un ou quelque chose.", defSimple: "Gardées pour. Réservées aux poètes = uniquement pour les poètes." },
  "réveiller":      { etym: "Du latin re + vigilare, veiller", defOrig: "Faire cesser le sommeil, redonner de l'énergie.", defSimple: "Arrêter de dormir. Se réveiller = sortir du sommeil." },
  "réveillé":       { etym: "Du latin re + vigilatus", defOrig: "Qui a cessé de dormir, qui est en état de veille.", defSimple: "Qui ne dort plus. Rester réveillé = ne pas dormir." },
  "scientifiques":  { etym: "Du latin scientificus, qui fait de la science", defOrig: "Personnes qui pratiquent les sciences, qui étudient le monde.", defSimple: "Des gens qui étudient et font des expériences pour comprendre comment le monde fonctionne." },
  "semblent":       { etym: "Du latin similant", defOrig: "Ont l'air de, paraissent.", defSimple: "Ont l'air. Ils semblent fatigués = ils ont l'air fatigués." },
  "sensibles":      { etym: "Du latin sensibilis, qui peut être senti", defOrig: "Qui perçoivent facilement les impressions, les émotions.", defSimple: "Qui ressentent fort les émotions. Une personne sensible = qui est touchée facilement." },
  "serait":         { etym: "Du latin esset", defOrig: "Conditionnel présent de être.", defSimple: "Serait = ce que ce serait si c'était le cas. La métaphore serait = la métaphore pourrait être." },
  "seulement":      { etym: "Du latin solum + ment", defOrig: "Uniquement, rien de plus.", defSimple: "Uniquement. Seulement deux ans = pas plus de deux ans." },
  "silencieuse":    { etym: "Du latin silentium, silence", defOrig: "Qui se fait sans bruit, sans paroles.", defSimple: "Sans bruit. Une façon silencieuse = sans paroles, sans son." },
  "sommet":         { etym: "Du latin summitas, point le plus haut", defOrig: "Point le plus élevé d'une montagne ou d'un bâtiment.", defSimple: "Le point le plus haut. Le sommet de la tour = tout en haut de la tour." },
  "structurelles":  { etym: "Du latin structura, construction", defOrig: "Relatives à la structure, à l'organisation fondamentale.", defSimple: "Qui concernent la structure de base. Des métaphores structurelles = qui organisent notre façon de penser." },
  "style":          { etym: "Du latin stilus, poinçon pour écrire", defOrig: "Manière particulière d'écrire ou de s'exprimer.", defSimple: "La façon personnelle d'écrire ou de parler. Avoir du style = s'exprimer d'une façon distinctive." },
  "suppositoire":   { etym: "Du latin suppositorium, mis en dessous", defOrig: "Médicament en forme de cône introduit dans le rectum.", defSimple: "Un médicament de forme conique. Utilisé ici comme insulte pour décrire la Tour Eiffel." },
  "tendance":       { etym: "Du latin tendentia, direction", defOrig: "Inclination naturelle vers quelque chose.", defSimple: "L'habitude naturelle de faire quelque chose. Avoir tendance à = faire souvent quelque chose naturellement." },
  "ton":            { etym: "Du latin tuum", defOrig: "Adjectif possessif de la deuxième personne du singulier.", defSimple: "Ce qui t'appartient. Ton livre = le livre qui t'appartient." },
  "tour":           { etym: "Du latin turris, tour", defOrig: "Construction verticale de grande hauteur.", defSimple: "Un grand bâtiment très haut et étroit. La Tour Eiffel = la grande structure métallique de Paris." },
  "travaux":        { etym: "Du latin tripalium, instrument de torture", defOrig: "Ensemble des recherches et productions d'un auteur.", defSimple: "Les recherches ou études faites. Les travaux d'un scientifique = ses recherches." },
  "traversé":       { etym: "Du latin transversare, passer à travers", defOrig: "Passé à travers, parcouru d'un bout à l'autre.", defSimple: "Passé à travers. Une idée qui traverse l'esprit = qui passe rapidement dans la tête." },
  "trous":          { etym: "Du latin traucum, perforation", defOrig: "Ouvertures, perforations dans une surface.", defSimple: "Des ouvertures dans quelque chose. Criblé de trous = avec plein d'ouvertures dedans." },
  "télégraphie":    { etym: "Du grec tele (loin) + graphein (écrire)", defOrig: "Système de communication à distance par signaux électriques.", defSimple: "Un ancien système pour envoyer des messages à distance par signaux électriques." },
  "uns":            { etym: "Du latin unus", defOrig: "Certains, quelques-uns.", defSimple: "Quelques-uns. Les uns et les autres = tout le monde. Connectés les uns aux autres = reliés entre eux." },
  "usine":          { etym: "Du latin officina, atelier", defOrig: "Établissement industriel où l'on fabrique des produits.", defSimple: "Un grand bâtiment où on fabrique des produits en grande quantité." },
  "utilisent":      { etym: "Du latin utilizare", defOrig: "Se servent de, emploient.", defSimple: "Se servent de quelque chose. Ils utilisent une métaphore = ils emploient une métaphore." },
  "ventre":         { etym: "Du latin venter", defOrig: "Partie du corps contenant les organes digestifs.", defSimple: "Le milieu du corps, là où se trouvent les organes digestifs. Dans le ventre de la maman = avant de naître." },
  "vie":            { etym: "Du latin vita", defOrig: "Existence des êtres vivants ; ensemble des activités humaines.", defSimple: "L'existence. La vie quotidienne = ce qu'on fait tous les jours pendant qu'on est vivant." },
  "vingt":          { etym: "Du latin viginti", defOrig: "Nombre entier égal à deux fois dix.", defSimple: "Le chiffre 20. Vingt ans = deux fois dix années." },
  "visiteurs":      { etym: "Du latin visitare, aller voir", defOrig: "Personnes qui visitent un lieu, des touristes.", defSimple: "Les gens qui viennent voir un endroit. Les visiteurs de la Tour Eiffel = les touristes qui la visitent." },
  "visité":         { etym: "Du latin visitatum", defOrig: "Que les gens vont voir, qui reçoit des touristes.", defSimple: "Que beaucoup de gens viennent voir. Le monument le plus visité = celui qui reçoit le plus de touristes." },
  "vois":           { etym: "Du latin vides", defOrig: "Deuxième personne du singulier du présent de voir.", defSimple: "Tu perçois avec les yeux. Tu vois quelqu'un bâiller = tu observes quelqu'un qui bâille." },
  "voyant":         { etym: "Du latin videns", defOrig: "En train de voir, participe présent de voir.", defSimple: "Pendant qu'on regarde. En voyant quelqu'un = pendant qu'on regarde cette personne." },
  "émotions":       { etym: "Du latin emotio, mouvement de l'âme", defOrig: "États affectifs vifs, sentiments intenses.", defSimple: "Les sentiments forts comme la joie, la peur, la tristesse ou l'amour." },
  "être":           { etym: "Du latin esse", defOrig: "Exister ; verbe auxiliaire fondamental.", defSimple: "Exister. Être vivant = avoir la vie. Aussi le verbe de base : être grand, être heureux." },

// Mots à ajouter dans lib/dictionary.ts avant le }; final
// Histoires : Subjectivité du temps, Découverte ADN, Feuilles automne — Jour 4

  // ── NOMS PROPRES — biographies ────────────────────────────
  "james watson":    { etym: "Nom propre", defOrig: "Biologiste américain (1928-), co-découvreur de la structure de l'ADN.", defSimple: "Scientifique américain né en 1928. Il a découvert avec Francis Crick la structure en double hélice de l'ADN en 1953, grâce notamment aux travaux de Rosalind Franklin. Prix Nobel de médecine 1962." },
  "watson":          { etym: "Nom propre", defOrig: "James Watson (1928-), biologiste américain, Prix Nobel de médecine 1962.", defSimple: "Biologiste américain (né en 1928) qui a co-découvert la structure de l'ADN avec Crick en 1953. Prix Nobel de médecine 1962." },
  "francis crick":   { etym: "Nom propre", defOrig: "Biologiste britannique (1916-2004), co-découvreur de la structure de l'ADN.", defSimple: "Scientifique britannique (1916-2004). Il a découvert avec James Watson la structure en double hélice de l'ADN. Prix Nobel de médecine 1962." },
  "crick":           { etym: "Nom propre", defOrig: "Francis Crick (1916-2004), biologiste britannique, Prix Nobel de médecine 1962.", defSimple: "Biologiste britannique (1916-2004) qui a co-découvert la structure de l'ADN avec Watson. Prix Nobel de médecine 1962." },
  "rosalind franklin":{ etym: "Nom propre", defOrig: "Chimiste et cristallographe britannique (1920-1958), pionnière dans la découverte de l'ADN.", defSimple: "Scientifique britannique (1920-1958). Elle a produit la Photo 51, image cruciale qui a permis de découvrir la structure de l'ADN, mais n'a jamais été récompensée par le Nobel car elle est morte avant 1962." },
  "rosalind":        { etym: "Nom propre", defOrig: "Rosalind Franklin (1920-1958), cristallographe britannique.", defSimple: "Rosalind Franklin (1920-1958), scientifique britannique dont les travaux sur l'ADN ont été utilisés sans sa permission. Pionnière injustement oubliée de la biologie moléculaire." },
  "franklin":        { etym: "Nom propre", defOrig: "Rosalind Franklin (1920-1958), cristallographe britannique pionnière.", defSimple: "Ici, désigne Rosalind Franklin (1920-1958), scientifique britannique pionnière de la biologie moléculaire dont les travaux sur l'ADN ont été décisifs mais peu reconnus de son vivant." },
  "maurice wilkins": { etym: "Nom propre", defOrig: "Biophysicien britannique (1916-2004), Prix Nobel de médecine 1962.", defSimple: "Scientifique britannique (1916-2004). Collègue de Rosalind Franklin, il a partagé le Prix Nobel de médecine 1962 avec Watson et Crick pour la découverte de la structure de l'ADN." },
  "wilkins":         { etym: "Nom propre", defOrig: "Maurice Wilkins (1916-2004), biophysicien britannique, Prix Nobel 1962.", defSimple: "Maurice Wilkins (1916-2004), scientifique britannique qui a partagé le Nobel 1962 avec Watson et Crick pour la découverte de la structure de l'ADN." },

  // ── BIOLOGIE MOLÉCULAIRE ──────────────────────────────────
  "adn":             { etym: "Sigle de Acide DésoxyriboNucléique", defOrig: "Molécule portant l'information génétique de tous les êtres vivants.", defSimple: "La molécule qui contient toutes les instructions génétiques de ton corps. Comme un manuel de construction pour chaque cellule." },
  "désoxyribonucléique": { etym: "Du grec deoxy (sans oxygène) + ribose + nucléique", defOrig: "Qualifie l'acide nucléique porteur de l'information génétique.", defSimple: "Adjectif qui désigne l'ADN. L'acide désoxyribonucléique = la molécule qui contient les gènes." },
  "nucléotides":     { etym: "Du latin nucleus, noyau + ides", defOrig: "Unités de base constituant l'ADN et l'ARN.", defSimple: "Les petites briques qui forment l'ADN. Chaque nucléotide est composé d'un sucre, d'un phosphate et d'une base azotée." },
  "bases azotées":   { etym: "Du latin basis + azote", defOrig: "Composants de l'ADN : adénine, thymine, guanine, cytosine.", defSimple: "Les 4 lettres du code génétique : adénine (A), thymine (T), guanine (G) et cytosine (C). Leur ordre forme les instructions génétiques." },
  "adénine":         { etym: "Du grec adên, glande", defOrig: "Base azotée de l'ADN qui se lie toujours à la thymine.", defSimple: "L'une des 4 bases de l'ADN, représentée par la lettre A. Elle se lie toujours avec la thymine (T)." },
  "thymine":         { etym: "Du grec thymos, thym", defOrig: "Base azotée de l'ADN qui se lie toujours à l'adénine.", defSimple: "L'une des 4 bases de l'ADN, représentée par la lettre T. Elle se lie toujours avec l'adénine (A)." },
  "guanine":         { etym: "Du quechua huanu, fiente d'oiseau", defOrig: "Base azotée de l'ADN qui se lie toujours à la cytosine.", defSimple: "L'une des 4 bases de l'ADN, représentée par la lettre G. Elle se lie toujours avec la cytosine (C)." },
  "cytosine":        { etym: "Du grec kytos, cellule", defOrig: "Base azotée de l'ADN qui se lie toujours à la guanine.", defSimple: "L'une des 4 bases de l'ADN, représentée par la lettre C. Elle se lie toujours avec la guanine (G)." },
  "complémentarité": { etym: "Du latin complementum, complément", defOrig: "Propriété des bases de l'ADN qui se lient par paires spécifiques.", defSimple: "Dans l'ADN, chaque base s'associe toujours à la même : A avec T, G avec C. C'est la complémentarité qui donne à l'ADN sa forme en double hélice." },
  "diffraction":     { etym: "Du latin diffractus, brisé", defOrig: "Déviation des ondes (lumière, rayons X) au contact d'un obstacle.", defSimple: "Le phénomène où les rayons X sont déviés par une molécule, créant un motif qui permet aux scientifiques de deviner la structure de la molécule." },
  "génétique":       { etym: "Du grec genesis, origine", defOrig: "Science qui étudie les gènes et l'hérédité.", defSimple: "La science des gènes — qui étudie comment les caractéristiques se transmettent de parent à enfant." },
  "acide nucléique": { etym: "Du latin acidus + nucleus", defOrig: "Macromolécule biologique (ADN ou ARN) portant l'information génétique.", defSimple: "Grande molécule qui stocke et transmet l'information génétique. L'ADN et l'ARN sont des acides nucléiques." },
  "double hélice":   { etym: "Du latin duplus + grec helix, spirale", defOrig: "Structure en spirale à deux brins de la molécule d'ADN.", defSimple: "La forme en spirale à deux brins de l'ADN, comme un escalier en colimaçon. Watson et Crick ont découvert cette structure en 1953." },
  "photo51":         { etym: "Nom propre scientifique", defOrig: "Célèbre image de diffraction aux rayons X de l'ADN prise par Rosalind Franklin en 1952.", defSimple: "L'image décisive prise par Rosalind Franklin en 1952 qui a permis de découvrir la structure en double hélice de l'ADN. Elle a été transmise à Watson sans sa permission." },
  "cambridge":       { etym: "Nom propre, ville d'Angleterre", defOrig: "Ville universitaire d'Angleterre, siège de l'université de Cambridge.", defSimple: "Ville anglaise célèbre pour son université, l'une des plus prestigieuses au monde. C'est là que Watson et Crick ont découvert la structure de l'ADN." },
  "prix nobel":      { etym: "Du nom d'Alfred Nobel (1833-1896)", defOrig: "Récompense scientifique et culturelle internationale la plus prestigieuse.", defSimple: "La récompense la plus importante au monde pour les scientifiques, écrivains et artisans de paix. Créée par Alfred Nobel, inventeur de la dynamite." },
  "rover":           { etym: "De l'anglais rover, explorateur", defOrig: "Robot d'exploration planétaire télécommandé depuis la Terre.", defSimple: "Un robot envoyé sur une autre planète pour explorer. Le rover Franklin a été envoyé sur Mars en hommage à Rosalind Franklin." },
  "martien":         { etym: "Du latin Martius, relatif à Mars", defOrig: "Relatif à la planète Mars.", defSimple: "Qui concerne la planète Mars. Un rover martien = un robot envoyé explorer Mars." },

  // ── TEMPS ET PERCEPTION ───────────────────────────────────
  "perception":      { etym: "Du latin perceptio, action de percevoir", defOrig: "Représentation que l'esprit se fait du monde à partir des sensations.", defSimple: "La façon dont on perçoit et interprète ce qui nous entoure. Notre perception du temps peut être différente de la réalité." },
  "ennui":           { etym: "Du latin in odio, en haine", defOrig: "État d'une personne qui s'ennuie, manque d'intérêt ou d'occupation.", defSimple: "Le sentiment de vide quand rien n'est intéressant. Quand on s'ennuie, le temps semble passer très lentement." },
  "dilate":          { etym: "Du latin dilatare, élargir", defOrig: "Rend plus grand, allonge une durée perçue.", defSimple: "Rend plus grand ou plus long. L'ennui dilate le temps = quand on s'ennuie, le temps semble s'étirer." },
  "méditation":      { etym: "Du latin meditatio, réflexion", defOrig: "Pratique de concentration mentale visant le calme intérieur.", defSimple: "Une pratique où on se concentre sur le moment présent pour calmer l'esprit. La méditation peut changer notre perception du temps." },
  "rétrospectivement": { etym: "Du latin retro (en arrière) + spectare (regarder)", defOrig: "En regardant vers le passé, après coup.", defSimple: "En regardant en arrière. Rétrospectivement, les vacances semblent courtes = quand on y repense après." },
  "décennies":       { etym: "Du latin decennium, période de dix ans", defOrig: "Périodes de dix années.", defSimple: "Des périodes de dix ans. Une décennie = 10 ans. Les décennies filent vite quand on vieillit." },
  "enfance":         { etym: "Du latin infantia, période sans parole", defOrig: "Période de la vie entre la naissance et l'adolescence.", defSimple: "La période de la vie de la naissance jusqu'à environ 12 ans. Les souvenirs d'enfance semblent souvent très longs." },
  "pleinement":      { etym: "Du latin plenus, plein", defOrig: "De façon complète, totale, sans restriction.", defSimple: "Complètement, totalement. Vivre pleinement = profiter de chaque instant sans rien retenir." },
  "émotionnel":      { etym: "Du latin emotio, mouvement de l'âme", defOrig: "Relatif aux émotions, aux sentiments.", defSimple: "Qui concerne les émotions. Un souvenir émotionnel = un souvenir lié à un sentiment fort." },
  "philosophes":     { etym: "Du grec philosophos, ami de la sagesse", defOrig: "Personnes qui étudient les grandes questions de l'existence.", defSimple: "Des penseurs qui réfléchissent aux grandes questions : pourquoi vivons-nous ? Qu'est-ce que la liberté ? Comment être heureux ?" },
  "vécue":           { etym: "Du latin vivere, vivre", defOrig: "Qui a été réellement expérimentée, ressentie.", defSimple: "Qui a été réellement expérimentée. Une vie pleinement vécue = une vie dont on profite vraiment." },
  "voyage":          { etym: "Du latin viaticum, provision de route", defOrig: "Déplacement vers un lieu éloigné.", defSimple: "Aller dans un endroit loin de chez soi. Le voyage ralentit le temps car on découvre des choses nouvelles." },
  "intense":         { etym: "Du latin intensus, tendu", defOrig: "D'une grande force, d'une grande intensité.", defSimple: "Très fort, très puissant. Un moment intense = un moment qu'on vit très fort." },
  "attention":       { etym: "Du latin attentio, application de l'esprit", defOrig: "Concentration de l'esprit sur quelque chose.", defSimple: "Le fait de se concentrer sur quelque chose. Notre attention influence notre perception du temps." },

  // ── FEUILLES ET AUTOMNE ───────────────────────────────────
  "feuilles":        { etym: "Du latin folia, feuilles", defOrig: "Organes aplatis et verts des plantes, assurant la photosynthèse.", defSimple: "Les parties plates et vertes des plantes. Les feuilles captent la lumière du soleil pour nourrir l'arbre." },
  "automne":         { etym: "Du latin autumnus", defOrig: "Saison entre l'été et l'hiver, caractérisée par la chute des feuilles.", defSimple: "La saison entre l'été et l'hiver. En automne les feuilles changent de couleur et tombent." },
  "forêts":          { etym: "Du latin forestis, forêt", defOrig: "Grandes étendues couvertes d'arbres.", defSimple: "De grandes zones couvertes d'arbres. En automne, les forêts se colorent de rouge, orange et jaune." },
  "tableaux":        { etym: "Du latin tabula, planche", defOrig: "Peintures sur toile ou bois ; aussi : scènes visuelles remarquables.", defSimple: "Des œuvres d'art peintes. En automne les forêts ressemblent à de beaux tableaux colorés." },
  "arbres":          { etym: "Du latin arbor", defOrig: "Végétaux ligneux de grande taille avec un tronc et des branches.", defSimple: "Les grandes plantes avec un tronc, des branches et des feuilles. En automne ils perdent leurs feuilles pour économiser leur énergie." },
  "photosynthèse":   { etym: "Du grec photos (lumière) + synthesis (assemblage)", defOrig: "Processus par lequel les plantes fabriquent leur nourriture grâce à la lumière.", defSimple: "La façon dont les plantes fabriquent leur nourriture. Elles utilisent la lumière du soleil, l'eau et le CO2 pour créer du sucre." },
  "chloroplastes":   { etym: "Du grec chloros (vert) + plastos (formé)", defOrig: "Organites des cellules végétales contenant la chlorophylle.", defSimple: "Les petites usines à l'intérieur des feuilles qui font la photosynthèse. Ils contiennent la chlorophylle verte." },
  "anthocyanes":     { etym: "Du grec anthos (fleur) + kyanos (bleu)", defOrig: "Pigments rouges et violets présents dans certains végétaux.", defSimple: "Des pigments rouges et violets dans les plantes. En automne ils donnent les couleurs rouges aux feuilles." },
  "tannins":         { etym: "Du gaulois tann, chêne", defOrig: "Composés phénoliques végétaux donnant un goût amer.", defSimple: "Des substances dans les plantes qui donnent un goût amer. En automne ils donnent les couleurs brunes aux feuilles qui tombent." },
  "hiver":           { etym: "Du latin hibernum, froid de l'hiver", defOrig: "Saison la plus froide de l'année.", defSimple: "La saison la plus froide, entre l'automne et le printemps. Les arbres perdent leurs feuilles pour survivre à l'hiver." },
  "printemps":       { etym: "Du latin primo tempore, premier temps", defOrig: "Saison entre l'hiver et l'été, caractérisée par le renouveau de la végétation.", defSimple: "La saison après l'hiver où tout revit. Les arbres refont leurs feuilles et les fleurs s'épanouissent." },
  "peinture":        { etym: "Du latin pictura, action de peindre", defOrig: "Art de représenter des images sur une surface avec des couleurs.", defSimple: "L'art de créer des images avec des couleurs. Les forêts d'automne ressemblent à de magnifiques peintures." },
  "biologie":        { etym: "Du grec bios (vie) + logos (science)", defOrig: "Science qui étudie les êtres vivants.", defSimple: "La science qui étudie tout ce qui est vivant : plantes, animaux, microbes, cellules." },
  "moléculaire":     { etym: "Du latin molecula, petite masse", defOrig: "Relatif aux molécules, aux structures microscopiques.", defSimple: "Qui concerne les molécules. La biologie moléculaire étudie comment les molécules fonctionnent dans les êtres vivants." },
  "médecine":        { etym: "Du latin medicina, art de guérir", defOrig: "Science et art de prévenir et guérir les maladies.", defSimple: "La science qui soigne les maladies. Le Prix Nobel de médecine récompense les plus grandes découvertes médicales." },
  "double":          { etym: "Du latin duplus, deux fois plus", defOrig: "Qui est en deux exemplaires, composé de deux éléments.", defSimple: "Qui est en deux. La double hélice de l'ADN = une spirale formée de deux brins entrelacés." },
  "inégalités":      { etym: "Du latin inaequalitas, manque d'égalité", defOrig: "Différences de traitement injustes entre les personnes.", defSimple: "Les différences injustes entre les personnes. Rosalind Franklin a souffert des inégalités entre hommes et femmes dans la science." },
  "discriminations": { etym: "Du latin discriminatio, séparation", defOrig: "Traitements inégaux et injustes envers certaines personnes.", defSimple: "Le fait de traiter quelqu'un différemment et injustement à cause de son sexe, sa race ou sa religion." },
  "acide":           { etym: "Du latin acidus, aigre", defOrig: "Substance chimique ayant un pH inférieur à 7.", defSimple: "Une substance chimique. L'acide désoxyribonucléique (ADN) est une molécule qui contient les instructions génétiques." },
  "prix":            { etym: "Du latin pretium, valeur", defOrig: "Récompense, distinction accordée pour un mérite.", defSimple: "Une récompense donnée pour reconnaître quelque chose d'exceptionnel. Le Prix Nobel est la plus grande distinction scientifique." },
  "adultes":         { etym: "Du latin adultus, qui a grandi", defOrig: "Personnes ayant atteint leur développement complet.", defSimple: "Les personnes qui ont terminé leur croissance. Les adultes perçoivent souvent le temps comme passant plus vite que les enfants." },

// À ajouter dans lib/dictionary.ts avant le }; final
// Biographies de tous les noms propres des histoires LexiStory

  // ── JOUR 1 ────────────────────────────────────────────────
  "hernán cortés":     { etym: "Nom propre", defOrig: "Conquistador espagnol (1485-1547), conquérant du Mexique aztèque.", defSimple: "Explorateur et soldat espagnol (1485-1547). Il a conquis l'empire aztèque au Mexique et rapporté le cacao en Europe, permettant l'invention du chocolat tel qu'on le connaît." },
  "cortés":            { etym: "Nom propre", defOrig: "Hernán Cortés (1485-1547), conquistador espagnol.", defSimple: "Hernán Cortés (1485-1547), soldat espagnol qui a conquis l'empire aztèque et introduit le cacao en Europe." },

  // ── JOUR 2 ────────────────────────────────────────────────
  "zénon de kition":   { etym: "Nom propre", defOrig: "Philosophe grec (334-262 av. J.-C.), fondateur du stoïcisme.", defSimple: "Philosophe grec (334-262 av. J.-C.). Il a fondé le stoïcisme à Athènes, une philosophie qui enseigne à rester calme face aux épreuves et à se concentrer sur ce qui dépend de nous." },
  "zénon":             { etym: "Nom propre", defOrig: "Zénon de Kition (334-262 av. J.-C.), fondateur du stoïcisme.", defSimple: "Zénon de Kition (334-262 av. J.-C.), philosophe grec fondateur du stoïcisme. Il enseignait dans un portique (Stoa) à Athènes." },
  "marc aurèle":       { etym: "Nom propre", defOrig: "Empereur romain et philosophe stoïcien (121-180 apr. J.-C.).", defSimple: "Empereur romain (121-180) et grand philosophe stoïcien. Il gouvernait le plus vaste empire du monde tout en méditant chaque matin sur ses Pensées pour moi-même, un classique de la philosophie." },
  "aurèle":            { etym: "Nom propre", defOrig: "Marc Aurèle (121-180), empereur romain et philosophe stoïcien.", defSimple: "Marc Aurèle (121-180), empereur romain et philosophe stoïcien, auteur des célèbres Pensées pour moi-même." },

  // ── JOUR 3 ────────────────────────────────────────────────
  "gustave eiffel":    { etym: "Nom propre", defOrig: "Ingénieur français (1832-1923), constructeur de la Tour Eiffel.", defSimple: "Ingénieur français (1832-1923). Il a conçu et construit la Tour Eiffel en 1889 pour l'Exposition universelle de Paris. Son tour, d'abord moquée, est devenue le symbole de la France." },
  "eiffel":            { etym: "Nom propre", defOrig: "Gustave Eiffel (1832-1923), ingénieur français.", defSimple: "Gustave Eiffel (1832-1923), ingénieur français qui a construit la célèbre Tour Eiffel à Paris en 1889." },
  "george lakoff":     { etym: "Nom propre", defOrig: "Linguiste américain (1941-), spécialiste des métaphores conceptuelles.", defSimple: "Linguiste américain (né en 1941). Avec Mark Johnson, il a montré que notre pensée est fondamentalement métaphorique — nous utilisons des images pour penser des idées abstraites." },
  "lakoff":            { etym: "Nom propre", defOrig: "George Lakoff (1941-), linguiste américain.", defSimple: "George Lakoff (né en 1941), linguiste américain qui a révolutionné notre compréhension du langage en montrant que les métaphores structurent notre pensée." },
  "mark johnson":      { etym: "Nom propre", defOrig: "Philosophe américain (1949-), co-auteur des Métaphores dans la vie quotidienne.", defSimple: "Philosophe américain (né en 1949). Avec George Lakoff, il a co-écrit Les Métaphores dans la vie quotidienne (1980), ouvrage fondamental sur le rôle des métaphores dans notre pensée." },

  // ── JOUR 5 ────────────────────────────────────────────────
  "isaac newton":      { etym: "Nom propre", defOrig: "Physicien et mathématicien britannique (1643-1727), père de la mécanique classique.", defSimple: "Scientifique britannique (1643-1727), l'un des plus grands génies de l'histoire. Il a découvert la loi de la gravitation universelle, inventé le calcul infinitésimal et expliqué les lois du mouvement." },
  "newton":            { etym: "Nom propre", defOrig: "Isaac Newton (1643-1727), physicien britannique.", defSimple: "Isaac Newton (1643-1727), physicien et mathématicien britannique. Il a découvert la gravitation universelle, souvent racontée avec l'anecdote de la pomme tombant dans son verger." },
  "luciano floridi":   { etym: "Nom propre", defOrig: "Philosophe italien (1964-), spécialiste de la philosophie de l'information.", defSimple: "Philosophe italien (né en 1964). Il a développé le concept d'infosphère pour décrire notre environnement numérique et réfléchit aux questions éthiques posées par l'intelligence artificielle." },
  "floridi":           { etym: "Nom propre", defOrig: "Luciano Floridi (1964-), philosophe de l'information.", defSimple: "Luciano Floridi (né en 1964), philosophe italien spécialiste de l'éthique numérique et de la philosophie de l'information." },

  // ── JOUR 6 ────────────────────────────────────────────────
  "david chalmers":    { etym: "Nom propre", defOrig: "Philosophe australien (1966-), spécialiste de la philosophie de l'esprit.", defSimple: "Philosophe australien (né en 1966). Il a formulé le 'problème difficile de la conscience' : pourquoi y a-t-il une expérience subjective ? C'est l'une des grandes questions non résolues de la philosophie." },
  "chalmers":          { etym: "Nom propre", defOrig: "David Chalmers (1966-), philosophe australien.", defSimple: "David Chalmers (né en 1966), philosophe australien célèbre pour avoir formulé le problème difficile de la conscience." },
  "voltaire":          { etym: "Nom propre", defOrig: "Écrivain et philosophe français (1694-1778), figure des Lumières.", defSimple: "Écrivain et philosophe français (1694-1778). Grande figure des Lumières, il a défendu la liberté d'expression et combattu l'intolérance religieuse. Il fréquentait le Café de Procope à Paris." },
  "rousseau":          { etym: "Nom propre", defOrig: "Jean-Jacques Rousseau, philosophe genevois (1712-1778).", defSimple: "Philosophe et écrivain genevois (1712-1778). Ses idées sur la liberté et l'égalité ont fortement influencé la Révolution française. Il fréquentait les cafés parisiens des Lumières." },
  "benjamin franklin": { etym: "Nom propre", defOrig: "Homme d'État et scientifique américain (1706-1790).", defSimple: "Américain (1706-1790), à la fois scientifique, inventeur et homme politique. Il a découvert la nature électrique de la foudre grâce à son célèbre cerf-volant, et fut l'un des pères fondateurs des États-Unis." },

  // ── JOUR 7 ────────────────────────────────────────────────
  "paul mccartney":    { etym: "Nom propre", defOrig: "Musicien britannique (1942-), membre des Beatles.", defSimple: "Musicien britannique (né en 1942), membre des Beatles. Il a composé la mélodie de Yesterday en rêve — l'une des chansons les plus reprises de l'histoire de la musique." },
  "mccartney":         { etym: "Nom propre", defOrig: "Paul McCartney (1942-), musicien des Beatles.", defSimple: "Paul McCartney (né en 1942), musicien britannique des Beatles. Il a composé Yesterday en se réveillant d'un rêve." },
  "léonard de vinci":  { etym: "Nom propre", defOrig: "Artiste et savant italien de la Renaissance (1452-1519).", defSimple: "Génie de la Renaissance italienne (1452-1519). Peintre (La Joconde), sculpteur, architecte, ingénieur et scientifique, il est l'exemple parfait de l'homme universel de la Renaissance." },
  "vinci":             { etym: "Nom propre", defOrig: "Léonard de Vinci (1452-1519), génie de la Renaissance.", defSimple: "Léonard de Vinci (1452-1519), génie italien de la Renaissance. Peintre de La Joconde et de La Cène, il était aussi ingénieur, anatomiste et inventeur." },
  "benjamin libet":    { etym: "Nom propre", defOrig: "Neurophysiologiste américain (1916-2007), pionnier des études sur le libre arbitre.", defSimple: "Scientifique américain (1916-2007). Son expérience de 1983 a montré que l'activité cérébrale précède notre conscience de vouloir agir, remettant en question l'existence du libre arbitre." },
  "libet":             { etym: "Nom propre", defOrig: "Benjamin Libet (1916-2007), neurophysiologiste américain.", defSimple: "Benjamin Libet (1916-2007), scientifique américain dont l'expérience sur le libre arbitre a bouleversé la philosophie et les neurosciences." },
  "daniel dennett":    { etym: "Nom propre", defOrig: "Philosophe américain (1942-2024), spécialiste de la conscience et de l'évolution.", defSimple: "Philosophe américain (1942-2024). Il a défendu l'idée que la conscience et le libre arbitre sont compatibles avec une vision matérialiste du monde. L'un des grands philosophes de l'esprit du XXe siècle." },
  "dennett":           { etym: "Nom propre", defOrig: "Daniel Dennett (1942-2024), philosophe américain.", defSimple: "Daniel Dennett (1942-2024), philosophe américain spécialiste de la conscience et du libre arbitre." },

  // ── JOUR 8 ────────────────────────────────────────────────
  "jacques piccard":   { etym: "Nom propre", defOrig: "Océanographe suisse (1922-2008), explorateur des grandes profondeurs.", defSimple: "Océanographe suisse (1922-2008). Avec Don Walsh, il a été le premier humain à atteindre le fond de la Fosse des Mariannes en 1960, à presque 11 000 mètres de profondeur." },
  "piccard":           { etym: "Nom propre", defOrig: "Jacques Piccard (1922-2008), océanographe suisse.", defSimple: "Jacques Piccard (1922-2008), océanographe suisse. Il a plongé jusqu'au fond de la Fosse des Mariannes en 1960 avec Don Walsh." },
  "don walsh":         { etym: "Nom propre", defOrig: "Officier de marine américain (1931-), explorateur des grandes profondeurs.", defSimple: "Officier de marine américain (né en 1931). Avec Jacques Piccard, il a été le premier à atteindre le point le plus profond de l'océan en 1960 — la Fosse des Mariannes." },
  "walsh":             { etym: "Nom propre", defOrig: "Don Walsh (1931-), officier de marine américain.", defSimple: "Don Walsh (né en 1931), officier américain qui a plongé avec Jacques Piccard jusqu'au fond de la Fosse des Mariannes en 1960." },
  "aristote":          { etym: "Nom propre", defOrig: "Philosophe grec (384-322 av. J.-C.), élève de Platon.", defSimple: "Philosophe grec (384-322 av. J.-C.), l'un des plus grands penseurs de l'histoire. Élève de Platon et précepteur d'Alexandre le Grand, il a écrit sur presque tous les sujets : éthique, politique, biologie, logique." },
  "jeremy bentham":    { etym: "Nom propre", defOrig: "Philosophe britannique (1748-1832), fondateur de l'utilitarisme.", defSimple: "Philosophe britannique (1748-1832), fondateur de l'utilitarisme — la théorie selon laquelle il faut maximiser le bonheur du plus grand nombre." },
  "bentham":           { etym: "Nom propre", defOrig: "Jeremy Bentham (1748-1832), philosophe utilitariste britannique.", defSimple: "Jeremy Bentham (1748-1832), philosophe britannique fondateur de l'utilitarisme, théorie morale qui vise à maximiser le bonheur collectif." },
  "john stuart mill":  { etym: "Nom propre", defOrig: "Philosophe et économiste britannique (1806-1873).", defSimple: "Philosophe britannique (1806-1873). Il a développé l'utilitarisme de Bentham en distinguant les plaisirs supérieurs (intellectuels) des plaisirs inférieurs. Défenseur de la liberté individuelle." },
  "stuart mill":       { etym: "Nom propre", defOrig: "John Stuart Mill (1806-1873), philosophe britannique.", defSimple: "John Stuart Mill (1806-1873), philosophe britannique qui a affiné l'utilitarisme et défendu les libertés individuelles." },
  "martin seligman":   { etym: "Nom propre", defOrig: "Psychologue américain (1942-), fondateur de la psychologie positive.", defSimple: "Psychologue américain (né en 1942), fondateur de la psychologie positive. Il étudie scientifiquement le bonheur et l'épanouissement humain, montrant que le bonheur durable vient de l'engagement et du sens donné à la vie." },
  "seligman":          { etym: "Nom propre", defOrig: "Martin Seligman (1942-), psychologue américain.", defSimple: "Martin Seligman (né en 1942), psychologue américain fondateur de la psychologie positive, qui étudie scientifiquement les conditions du bonheur." },

  // ── JOUR 9 ────────────────────────────────────────────────
  "alan turing":       { etym: "Nom propre", defOrig: "Mathématicien britannique (1912-1954), père de l'informatique.", defSimple: "Mathématicien britannique (1912-1954), considéré comme le père de l'informatique et de l'intelligence artificielle. Il a posé la question 'Les machines peuvent-elles penser ?' et créé le test de Turing." },
  "turing":            { etym: "Nom propre", defOrig: "Alan Turing (1912-1954), mathématicien britannique, père de l'IA.", defSimple: "Alan Turing (1912-1954), mathématicien britannique fondateur de l'informatique. Il a aussi déchiffré les codes nazis pendant la Seconde Guerre mondiale, sauvant des millions de vies." },
  "yann lecun":        { etym: "Nom propre", defOrig: "Informaticien français (1960-), pionnier du deep learning.", defSimple: "Informaticien français (né en 1960), directeur de la recherche en IA chez Meta. Il a développé les réseaux de neurones convolutifs, technologie fondamentale pour la reconnaissance d'images et le deep learning." },
  "lecun":             { etym: "Nom propre", defOrig: "Yann LeCun (1960-), informaticien français, pionnier du deep learning.", defSimple: "Yann LeCun (né en 1960), informaticien français et pionnier du deep learning, récompensé par le Prix Turing en 2018." },
  "lera boroditsky":   { etym: "Nom propre", defOrig: "Psychologue américaine (1976-), spécialiste du langage et de la cognition.", defSimple: "Psychologue américaine (née en 1976). Elle a montré que la langue qu'on parle influence notre façon de percevoir le temps, l'espace et les couleurs — popularisant l'hypothèse Sapir-Whorf." },
  "boroditsky":        { etym: "Nom propre", defOrig: "Lera Boroditsky (1976-), psychologue spécialiste du langage.", defSimple: "Lera Boroditsky (née en 1976), psychologue américaine qui étudie comment les langues différentes façonnent notre perception du monde." },

  // ── JOUR 10 ────────────────────────────────────────────────
  "marcel duchamp":    { etym: "Nom propre", defOrig: "Artiste franco-américain (1887-1968), figure du mouvement Dada.", defSimple: "Artiste français (1887-1968), l'un des artistes les plus influents du XXe siècle. Il a révolutionné l'art avec ses ready-mades — des objets ordinaires transformés en œuvres d'art, comme son célèbre urinoir retourné." },
  "duchamp":           { etym: "Nom propre", defOrig: "Marcel Duchamp (1887-1968), artiste franco-américain.", defSimple: "Marcel Duchamp (1887-1968), artiste franco-américain qui a bouleversé la définition de l'art avec ses ready-mades, dont le célèbre urinoir exposé comme œuvre d'art en 1917." },
  "george dickie":     { etym: "Nom propre", defOrig: "Philosophe américain (1926-2020), théoricien de l'art institutionnel.", defSimple: "Philosophe américain (1926-2020). Il a développé la théorie institutionnelle de l'art : l'art est ce que le 'monde de l'art' (musées, galeries, critiques) reconnaît comme tel." },
  "dickie":            { etym: "Nom propre", defOrig: "George Dickie (1926-2020), philosophe américain.", defSimple: "George Dickie (1926-2020), philosophe américain connu pour sa théorie institutionnelle de l'art." },
  "ludwig wittgenstein":{ etym: "Nom propre", defOrig: "Philosophe autrichien (1889-1951), l'un des plus influents du XXe siècle.", defSimple: "Philosophe autrichien (1889-1951), l'un des plus grands philosophes du XXe siècle. Il a étudié le langage et ses limites, montrant que beaucoup de problèmes philosophiques viennent d'une mauvaise utilisation des mots." },
  "wittgenstein":      { etym: "Nom propre", defOrig: "Ludwig Wittgenstein (1889-1951), philosophe autrichien.", defSimple: "Ludwig Wittgenstein (1889-1951), philosophe autrichien qui a profondément influencé la philosophie du langage avec ses concepts de 'jeux de langage' et 'ressemblances de famille'." },

  // À ajouter dans lib/dictionary.ts avant le }; final
// Définitions des lieux mentionnés dans les histoires LexiStory

  // ── VILLES ────────────────────────────────────────────────
  "paris":             { etym: "Du latin Lutetia Parisiorum, ville des Parisii", defOrig: "Capitale de la France, sur les rives de la Seine.", defSimple: "La capitale de la France, ville de 2 millions d'habitants. Connue pour la Tour Eiffel, le Louvre, Notre-Dame et son rôle central dans l'histoire européenne." },
  "athènes":           { etym: "Du grec Athenai, ville d'Athéna", defOrig: "Capitale de la Grèce, berceau de la démocratie et de la philosophie occidentale.", defSimple: "Capitale de la Grèce et berceau de la démocratie. C'est là que Socrate, Platon et Aristote ont philosophé, et que Zénon a fondé le stoïcisme." },
  "londres":           { etym: "Du latin Londinium", defOrig: "Capitale du Royaume-Uni, plus grande ville d'Europe occidentale.", defSimple: "Capitale du Royaume-Uni. Grande métropole mondiale, elle abrite notamment le Lloyd's, les musées britanniques et l'Université de Cambridge est à proximité." },
  "vienne":            { etym: "Du latin Vindobona", defOrig: "Capitale de l'Autriche, ancienne capitale de l'empire austro-hongrois.", defSimple: "Capitale de l'Autriche, grande capitale culturelle européenne. Ses cafés étaient des lieux d'effervescence intellectuelle aux XVIIIe et XIXe siècles." },
  "new york":          { etym: "Du nom du duc d'York, futur Jacques II d'Angleterre", defOrig: "Plus grande ville des États-Unis, capitale économique et culturelle mondiale.", defSimple: "La plus grande ville des États-Unis. Centre culturel et économique mondial, c'est là que Marcel Duchamp a exposé son célèbre urinoir en 1917." },
  "florence":          { etym: "Du latin Florentia, ville de fleurs", defOrig: "Ville italienne, berceau de la Renaissance artistique et intellectuelle.", defSimple: "Ville italienne et berceau de la Renaissance. C'est là que Léonard de Vinci, Michel-Ange et Botticelli ont créé leurs chefs-d'œuvre au XVe siècle." },
  "woolsthorpe":       { etym: "Nom propre, village anglais du Lincolnshire", defOrig: "Village anglais où Isaac Newton est né et a développé ses théories sur la gravitation.", defSimple: "Petit village d'Angleterre où Newton est né et a passé du temps pendant la Grande Peste. C'est dans le verger de Woolsthorpe Manor qu'il aurait observé la fameuse pomme tomber." },

  // ── RÉGIONS ET LIEUX GÉOGRAPHIQUES ───────────────────────
  "silicon valley":    { etym: "De l'anglais silicon (silicium) + valley (vallée)", defOrig: "Région de Californie concentrant les plus grandes entreprises technologiques mondiales.", defSimple: "Région de Californie (États-Unis) où sont nées les plus grandes entreprises tech : Apple, Google, Meta, Tesla... C'est le centre mondial de l'innovation numérique." },
  "fosse des mariannes": { etym: "Du nom des îles Mariannes", defOrig: "Point le plus profond des océans, situé dans l'océan Pacifique, à presque 11 000 mètres de profondeur.", defSimple: "L'endroit le plus profond de la Terre, dans l'océan Pacifique. À presque 11 000 mètres de profondeur, c'est là que Jacques Piccard et Don Walsh ont plongé en 1960." },
  "mésoamérique":      { etym: "Du grec mesos (milieu) + Amérique", defOrig: "Région historique et culturelle s'étendant du Mexique central à l'Amérique centrale.", defSimple: "Région qui comprend le Mexique et l'Amérique centrale, berceau des civilisations mayas et aztèques qui utilisaient le cacao comme monnaie sacrée." },
  "mexique":           { etym: "Du nahuatl Mexihco, lieu de Mexitli", defOrig: "Pays d'Amérique centrale, berceau des civilisations mayas et aztèques.", defSimple: "Grand pays d'Amérique du Nord, berceau des civilisations mayas et aztèques. C'est de là que vient le cacao, rapporté en Europe par Hernán Cortés au XVIe siècle." },
  "amazonie":          { etym: "Du fleuve Amazone, du grec Amazones", defOrig: "Région d'Amérique du Sud couverte par la forêt amazonienne, la plus grande forêt tropicale du monde.", defSimple: "Immense région d'Amérique du Sud couverte par la plus grande forêt tropicale du monde. Les Piraha y vivent, un peuple dont la langue n'a pas de mots pour les grands nombres." },
  "australie":         { etym: "Du latin australis, du sud", defOrig: "Continent et pays de l'hémisphère sud, entre océan Indien et Pacifique.", defSimple: "Grand pays de l'hémisphère sud. Les Guugu Yimithirr, peuple aborigène d'Australie, utilisent uniquement les points cardinaux pour se repérer, développant un sens de l'orientation exceptionnel." },

  // ── LIEUX HISTORIQUES ET CULTURELS ───────────────────────
  "café de procope":   { etym: "Du nom de Francesco Procopio dei Coltelli, fondateur", defOrig: "Plus ancien café de Paris, ouvert en 1686, lieu de rencontre des philosophes des Lumières.", defSimple: "Le plus vieux café de Paris, ouvert en 1686. Voltaire, Rousseau et Benjamin Franklin y débattaient des idées qui ont mené à la Révolution française." },
  "lloyd's de londres":{ etym: "Du nom d'Edward Lloyd, propriétaire du café d'origine", defOrig: "Célèbre marché d'assurances britannique, né dans un café londonien au XVIIe siècle.", defSimple: "La plus célèbre compagnie d'assurances au monde, fondée dans un café de Londres au XVIIe siècle. Un exemple parfait de l'influence des cafés sur l'histoire économique." },
  "stoa":              { etym: "Du grec stoa, portique", defOrig: "Portique d'Athènes où Zénon de Kition enseignait, donnant son nom au stoïcisme.", defSimple: "Un portique couvert à Athènes où Zénon enseignait sa philosophie. C'est de ce lieu que vient le mot 'stoïcisme' — les philosophes du portique." },
  "exposition universelle": { etym: "Du latin expositionem + universalis", defOrig: "Grande manifestation internationale présentant les réalisations industrielles et culturelles des nations.", defSimple: "Grande fête internationale où les pays du monde entier présentent leurs innovations. La Tour Eiffel a été construite pour l'Exposition universelle de Paris en 1889." },

  // ── PAYS ET CONTINENTS ───────────────────────────────────
  "europe":            { etym: "Du grec Europê, peut-être de euros (large) + ops (visage)", defOrig: "Continent à l'ouest de l'Asie, berceau de la civilisation occidentale.", defSimple: "Le continent à l'ouest de l'Eurasie. Berceau de la démocratie grecque, de l'empire romain, de la Renaissance et des Lumières qui ont façonné le monde moderne." },
  "grèce":             { etym: "Du latin Graecia", defOrig: "Pays du sud-est de l'Europe, berceau de la philosophie et de la démocratie occidentale.", defSimple: "Pays méditerranéen et berceau de la philosophie. Socrate, Platon, Aristote et Zénon y ont vécu et pensé les fondements de la pensée occidentale." },
  "italie":            { etym: "Du latin Italia", defOrig: "Pays d'Europe du Sud, berceau de la Renaissance et de l'empire romain.", defSimple: "Pays du sud de l'Europe, berceau de la Renaissance. C'est là que Léonard de Vinci, Michel-Ange et Botticelli ont créé leurs œuvres immortelles." },
  "états-unis":        { etym: "Traduction de United States of America", defOrig: "Pays d'Amérique du Nord, première puissance mondiale.", defSimple: "Grand pays d'Amérique du Nord et première puissance mondiale. Berceau de nombreuses innovations technologiques, dont la Silicon Valley et l'intelligence artificielle." },
  "angleterre":        { etym: "Du latin Anglia, pays des Angles", defOrig: "Partie principale du Royaume-Uni, au nord-ouest de l'Europe.", defSimple: "Pays du nord-ouest de l'Europe. Berceau de la révolution industrielle, de Newton, Darwin et des Beatles. Cambridge et Oxford y sont les universités les plus prestigieuses." },
  "japon":             { etym: "Du chinois Riben, origine du soleil", defOrig: "Archipel d'Asie de l'Est, grande puissance économique et culturelle.", defSimple: "Pays insulaire d'Asie composé de milliers d'îles. Grande puissance technologique et culturelle, connu pour ses traditions millénaires et son innovation moderne." },

// À coller dans lib/dictionary.ts avant le }; final
// Histoires du 5 juin : Peau ridée, Newton, Identité numérique

  // ── PEAU RIDÉE ────────────────────────────────────────────
  "peau":            { etym: "Du latin pellis, peau", defOrig: "Enveloppe externe du corps des vertébrés.", defSimple: "La couche qui recouvre tout ton corps. Elle te protège de l'extérieur." },
  "rides":           { etym: "Du germanique wrinkle", defOrig: "Plis ou sillons qui se forment sur la peau.", defSimple: "Des petits plis sur la peau. Les rides dans l'eau = les petits sillons qui apparaissent sur les doigts." },
  "ridés":           { etym: "De rider, former des rides", defOrig: "Qui présentent des rides, des plis.", defSimple: "Plissés, avec des petits sillons. Tes doigts ridés dans le bain = avec des petits plis." },
  "orteils":         { etym: "Du latin articulus, articulation", defOrig: "Doigts du pied.", defSimple: "Les cinq doigts de chaque pied. Les orteils ridés = les doigts de pied plissés après le bain." },
  "doigts":          { etym: "Du latin digitus", defOrig: "Appendices articulés au bout des mains.", defSimple: "Les cinq prolongements au bout de la main. On les utilise pour tenir, toucher, compter." },
  "bain":            { etym: "Du latin balneum, bain", defOrig: "Action de plonger le corps dans l'eau pour se laver.", defSimple: "Se laver dans une baignoire pleine d'eau. Le bain = quand on trempe dans l'eau chaude." },
  "piscine":         { etym: "Du latin piscina, vivier à poissons", defOrig: "Bassin artificiel rempli d'eau pour nager.", defSimple: "Un grand bassin d'eau pour nager. La piscine municipale = celle qu'on partage avec tout le monde." },
  "pommier":         { etym: "Du latin pomarium, verger", defOrig: "Arbre fruitier qui produit des pommes.", defSimple: "L'arbre qui fait pousser des pommes. Newton aurait vu une pomme tomber d'un pommier." },
  "verger":          { etym: "Du latin viridarium, lieu vert", defOrig: "Terrain planté d'arbres fruitiers.", defSimple: "Un jardin plein d'arbres qui font des fruits. Newton avait un verger avec des pommiers." },
  "pneus":           { etym: "Du grec pneuma, souffle", defOrig: "Enveloppes en caoutchouc des roues d'un véhicule.", defSimple: "Les parties en caoutchouc autour des roues d'une voiture. Ils ont des rainures pour mieux accrocher la route." },
  "mouillés":        { etym: "Du latin molliare, rendre mou", defOrig: "Imprégnés d'eau, humides.", defSimple: "Trempés dans l'eau, humides. Des objets mouillés = des objets couverts d'eau." },
  "volontairement":  { etym: "Du latin voluntarius + ment", defOrig: "De façon intentionnelle, avec la volonté.", defSimple: "Exprès, en le voulant. Le corps crée des rides volontairement = il le fait intentionnellement." },
  "commandent":      { etym: "Du latin commandare, ordonner", defOrig: "Donnent des ordres, dirigent.", defSimple: "Donnent les ordres. Les nerfs commandent = les nerfs donnent l'ordre de faire quelque chose." },
  "absorbait":       { etym: "Du latin absorbere, avaler", defOrig: "Buvait, s'imprégnait d'un liquide.", defSimple: "Prenait et gardait le liquide. La peau absorbait l'eau = elle prenait l'eau en elle." },
  "gonflait":        { etym: "Du latin conflare, souffler ensemble", defOrig: "Augmentait de volume sous l'effet d'un liquide.", defSimple: "Devenait plus gros. La peau gonflait = elle grossissait en prenant l'eau." },
  "nerfs":           { etym: "Du latin nervus, tendon", defOrig: "Filaments qui transmettent les signaux entre le cerveau et le corps.", defSimple: "Les fils qui relient le cerveau au reste du corps et transmettent les messages." },
  "nerveux":         { etym: "Du latin nervosus, plein de nerfs", defOrig: "Relatif aux nerfs et au système nerveux.", defSimple: "Qui concerne les nerfs. Le système nerveux = l'ensemble des nerfs qui relient le cerveau au corps." },
  "système nerveux": { etym: "Du latin systema + nervosus", defOrig: "Ensemble des nerfs et du cerveau qui coordonnent les fonctions du corps.", defSimple: "L'ensemble du cerveau et de tous les nerfs du corps. C'est le système de communication interne du corps." },
  "accrocher":       { etym: "Du vieux français croc, crochet", defOrig: "S'attacher, adhérer à une surface.", defSimple: "S'agripper à quelque chose. S'accrocher aux objets mouillés = mieux tenir les objets glissants." },

  // ── NEWTON ────────────────────────────────────────────────
  "pomme":           { etym: "Du latin poma, fruits", defOrig: "Fruit du pommier, rond et sucré.", defSimple: "Le fruit rouge ou vert du pommier. Newton aurait vu une pomme tomber dans son verger." },
  "soudainement":    { etym: "Du latin subitaneus + ment", defOrig: "De façon soudaine, brusquement, sans prévenir.", defSimple: "D'un coup, sans prévenir. Découvrir soudainement = trouver quelque chose de façon inattendue." },
  "soudain":         { etym: "Du latin subitaneus, brusque", defOrig: "Qui se produit brusquement, sans préparation.", defSimple: "Qui arrive d'un coup. Un mouvement soudain = un mouvement rapide et inattendu." },
  "nuancés":         { etym: "Du latin nuance, teinte", defOrig: "Plus complexes qu'ils n'y paraissent, avec des détails subtils.", defSimple: "Plus compliqués que ça en a l'air. Les détails sont nuancés = c'est plus complexe que la simple version." },
  "révélation":      { etym: "Du latin revelatio, action de révéler", defOrig: "Découverte soudaine et importante.", defSimple: "Une grande découverte soudaine. Une révélation = comprendre quelque chose d'important d'un coup." },
  "instantanée":     { etym: "Du latin instantaneus, du moment", defOrig: "Qui se produit en un instant, très rapidement.", defSimple: "Qui arrive immédiatement. Une révélation instantanée = une découverte qui arrive tout de suite." },
  "équations":       { etym: "Du latin aequatio, égalisation", defOrig: "Expressions mathématiques reliant des quantités inconnues.", defSimple: "Des formules mathématiques avec des inconnues. Les équations de Newton = ses formules sur la gravité." },
  "correspondants":  { etym: "Du latin correspondere, répondre à", defOrig: "Personnes avec qui on échange des lettres.", defSimple: "Des gens avec qui on échange des lettres. Les correspondants scientifiques = des scientifiques avec qui Newton échangeait." },
  "méthodique":      { etym: "Du grec methodos, voie à suivre", defOrig: "Qui suit une méthode organisée et rigoureuse.", defSimple: "Organisé et rigoureux. Un travail méthodique = fait étape par étape avec soin." },
  "humble":          { etym: "Du latin humilis, bas", defOrig: "Modeste, sans prétention.", defSimple: "Modeste, sans se vanter. La réalité humble = la vraie histoire, moins glamour que la légende." },
  "illustre":        { etym: "Du latin illustrare, éclairer", defOrig: "Montre de façon concrète, donne un exemple de.", defSimple: "Montre un exemple concret. L'anecdote illustre = elle montre clairement quelque chose." },
  "mythe":           { etym: "Du grec mythos, récit", defOrig: "Récit légendaire, histoire embellie qui déforme la réalité.", defSimple: "Une histoire souvent répétée mais inexacte ou embellie. Le mythe de la pomme = la version simplifiée et inexacte." },
  "légende":         { etym: "Du latin legenda, ce qui doit être lu", defOrig: "Récit traditionnel mêlant histoire et fiction.", defSimple: "Une histoire transmise et embellie. La légende de Newton = la version romantique de sa découverte." },
  "principia mathematica": { etym: "Du latin principia (principes) + mathematica (mathématiques)", defOrig: "Ouvrage fondamental de Newton publié en 1687, exposant ses lois du mouvement et de la gravitation.", defSimple: "Le grand livre de Newton publié en 1687. Il y explique la gravitation universelle et les lois du mouvement. L'une des œuvres scientifiques les plus importantes de l'histoire." },
  "verger de woolsthorpe": { etym: "Nom propre", defOrig: "Domaine familial de Newton dans le Lincolnshire, où il aurait observé la fameuse pomme.", defSimple: "La propriété familiale de Newton en Angleterre. C'est là qu'il aurait vu tomber la pomme qui l'a conduit à réfléchir sur la gravité." },

  // ── IDENTITÉ NUMÉRIQUE ────────────────────────────────────
  "smartphones":     { etym: "De l'anglais smart (intelligent) + phone (téléphone)", defOrig: "Téléphones portables dotés de fonctions avancées et d'un accès à internet.", defSimple: "Les téléphones intelligents qu'on utilise aujourd'hui. Ils enregistrent nos déplacements, photos, messages..." },
  "applications":    { etym: "Du latin applicatio, action d'appliquer", defOrig: "Programmes informatiques conçus pour des fonctions spécifiques.", defSimple: "Les applis sur ton téléphone ou ordinateur. Instagram, Maps, WhatsApp sont des applications." },
  "réseaux sociaux": { etym: "Du latin retis (filet) + socialis (de la société)", defOrig: "Plateformes numériques permettant de créer et partager du contenu avec d'autres utilisateurs.", defSimple: "Les sites et applis où on partage sa vie avec des gens. Instagram, TikTok, Facebook sont des réseaux sociaux." },
  "numérique":       { etym: "Du latin numericus, des nombres", defOrig: "Relatif aux technologies informatiques et à internet.", defSimple: "Qui est en lien avec l'informatique et internet. Le monde numérique = tout ce qui est sur internet et les écrans." },
  "double numérique":{ etym: "Du latin duplus + numericus", defOrig: "Représentation virtuelle d'une personne construite à partir de ses données en ligne.", defSimple: "La version numérique de toi qui existe sur internet. Toutes tes données, photos, habitudes créent un double de toi en ligne." },
  "données":         { etym: "Du latin data, choses données", defOrig: "Informations collectées et stockées par des systèmes informatiques.", defSimple: "Les informations qu'on génère sur internet. Tes données = tes photos, messages, localisation, achats en ligne." },
  "internet":        { etym: "De l'anglais inter (entre) + network (réseau)", defOrig: "Réseau mondial de communication informatique.", defSimple: "Le grand réseau mondial qui relie tous les ordinateurs. On y trouve le web, les emails, les réseaux sociaux." },
  "empreinte":       { etym: "Du latin imprimere, imprimer", defOrig: "Trace laissée par quelque chose ou quelqu'un.", defSimple: "Une trace qu'on laisse. Empreinte numérique = les traces qu'on laisse sur internet à chaque clic." },
  "immergés":        { etym: "Du latin immergere, plonger dans", defOrig: "Plongés dans, totalement entourés par.", defSimple: "Complètement entourés par. Immergés dans internet = tellement dedans qu'on n'en sort plus." },
  "estompe":         { etym: "Du latin exstompare, effacer", defOrig: "S'efface progressivement, devient moins net.", defSimple: "Disparaît progressivement. La frontière s'estompe = la limite devient de moins en moins claire." },
  "frontière":       { etym: "Du latin frons, front", defOrig: "Limite entre deux territoires ou deux domaines.", defSimple: "La limite entre deux choses. La frontière entre réel et numérique = la limite qui sépare le monde réel du monde en ligne." },
  "libertés":        { etym: "Du latin libertas, état de l'homme libre", defOrig: "Droits fondamentaux des individus à agir selon leur volonté.", defSimple: "Les droits qu'on a de faire ce qu'on veut. Les libertés individuelles = les droits de chaque personne." },
  "individuelles":   { etym: "Du latin individualis, de l'individu", defOrig: "Qui appartiennent à chaque individu en particulier.", defSimple: "Propres à chaque personne. Les libertés individuelles = les droits de chaque individu." },
  "interrogations":  { etym: "Du latin interrogatio, question", defOrig: "Questions qu'on se pose, doutes à résoudre.", defSimple: "Des questions importantes qu'on se pose. Ces interrogations = ces grandes questions sans réponse claire." },
  "transformation":  { etym: "Du latin transformatio, changement de forme", defOrig: "Changement profond de nature ou de forme.", defSimple: "Un grand changement. La transformation numérique = le grand changement apporté par internet dans notre vie." },
  "droit à l'oubli": { etym: "Du latin directum + oblivisci", defOrig: "Droit légal de faire supprimer ses informations personnelles d'internet.", defSimple: "Le droit de demander à ce que tes informations soient effacées d'internet. En Europe, ce droit existe légalement." },
  "volonté":         { etym: "Du latin voluntas, ce qu'on veut", defOrig: "Capacité de décider et d'agir selon ses propres choix.", defSimple: "La force de vouloir quelque chose et de le faire. Agir selon sa volonté = faire ce qu'on a décidé." },
  "consciente":      { etym: "Du latin conscientia, connaissance intérieure", defOrig: "Dont on a conscience, dont on est aware.", defSimple: "Dont on est conscient, qu'on sait. Une volonté consciente = une décision qu'on prend en sachant ce qu'on fait." },
  "représentation":  { etym: "Du latin repraesentatio, action de rendre présent", defOrig: "Image, description qui évoque quelque chose.", defSimple: "Une image ou description de quelque chose. La représentation numérique de toi = l'image que tes données donnent de toi." },
  "informationnel":  { etym: "Du latin informatio + nel", defOrig: "Relatif à l'information et à ses flux.", defSimple: "Qui concerne l'information. L'environnement informationnel = le monde de l'information dans lequel on vit." },
  "éthiques":        { etym: "Du grec ethikos, relatif aux mœurs", defOrig: "Relatifs à la morale et aux règles de conduite.", defSimple: "Qui concernent ce qui est juste ou injuste. Les questions éthiques = les questions sur ce qu'il faut faire." },
  "déplacements":    { etym: "Du latin dis + placer", defOrig: "Mouvements d'un endroit à un autre.", defSimple: "Quand on va d'un endroit à un autre. Nos déplacements = tous les trajets qu'on fait." },
  "habitudes":       { etym: "Du latin habitus, manière d'être", defOrig: "Comportements répétés devenus automatiques.", defSimple: "Ce qu'on fait régulièrement sans y penser. Les habitudes d'achat = ce qu'on achète souvent." },
  "comportements":   { etym: "De comporter, du latin comportare", defOrig: "Manières d'agir et de se conduire.", defSimple: "La façon dont on agit. Nos comportements = tout ce qu'on fait au quotidien." },
  "enregistrent":    { etym: "Du latin in + registrum", defOrig: "Mémorisent, sauvegardent des informations.", defSimple: "Gardent en mémoire. Les téléphones enregistrent = ils mémorisent tout ce qu'on fait." },
  "traces":          { etym: "Du latin tractus, tracé", defOrig: "Marques laissées par quelque chose.", defSimple: "Des marques qu'on laisse. Les traces numériques = les marques qu'on laisse sur internet." },
  "connectons":      { etym: "Du latin connectere, lier ensemble", defOrig: "Établissons une connexion avec quelque chose.", defSimple: "On se relie à quelque chose. On se connecte à internet = on accède à internet." },
  "revendiquer":     { etym: "Du latin re + vindicare, réclamer", defOrig: "Réclamer quelque chose comme un droit.", defSimple: "Demander quelque chose comme un droit. Revendiquer un droit = dire qu'on a ce droit et le réclamer." },
  "définira":        { etym: "Du latin definire, délimiter", defOrig: "Déterminera, fixera les contours de quelque chose.", defSimple: "Déterminera. La réponse définira = la réponse fixera comment ça sera dans le futur." },
  "collectif":       { etym: "Du latin collectivus, rassemblé", defOrig: "Qui appartient à un groupe, commun à tous.", defSimple: "Qui concerne tout le groupe. Une réponse collective = une réponse donnée par tout le monde ensemble." },
  "urgentes":        { etym: "Du latin urgens, pressant", defOrig: "Qui nécessitent une réponse ou une action rapide.", defSimple: "Qui demandent une réponse tout de suite. Des questions urgentes = des questions auxquelles il faut répondre vite." },
  "possède":         { etym: "Du latin possidere, tenir en son pouvoir", defOrig: "A en sa propriété, appartient à.", defSimple: "A comme propriété. Qui possède nos données = à qui appartiennent nos informations." },
  "reflètent":       { etym: "Du latin reflectere, renvoyer", defOrig: "Montrent, donnent une image de quelque chose.", defSimple: "Montrent une image. Les données reflètent = les données montrent ce qu'on fait." },

  // Jour 6 — À coller dans lib/dictionary.ts avant le }; final

  "caféine":           { etym: "De café + suffixe chimique -ine", defOrig: "Alcaloïde stimulant présent dans le café, le thé et certaines boissons, agissant sur le système nerveux central.", defSimple: "La substance dans le café qui te réveille et te donne de l'énergie." },
  "alcaloïde":         { etym: "De l'arabe al-qaly (soude) + grec eïdos (forme)", defOrig: "Composé organique azoté d'origine végétale, aux effets physiologiques puissants sur l'organisme.", defSimple: "Une substance chimique naturelle produite par les plantes qui a un effet fort sur le corps humain." },
  "torréfaction":      { etym: "Du latin torrefacere, faire griller", defOrig: "Procédé de chauffage à haute température des grains de café pour développer leurs arômes.", defSimple: "L'action de griller les grains de café pour leur donner leur goût et leur couleur." },
  "arabica":           { etym: "Du latin scientifique Coffea arabica, café d'Arabie", defOrig: "Variété de caféier originaire d'Éthiopie, produisant un café doux et aromatique, la plus cultivée au monde.", defSimple: "Le type de café le plus courant, avec un goût doux et parfumé." },
  "robusta":           { etym: "Du latin robustus, fort, solide", defOrig: "Variété de caféier à la saveur plus forte et amère que l'arabica, avec une teneur en caféine plus élevée.", defSimple: "Un type de café plus fort et plus amer que l'arabica, avec plus de caféine." },
  "expresso":          { etym: "De l'italien espresso, exprès, pressé", defOrig: "Café obtenu par passage forcé d'eau chaude sous pression à travers du café finement moulu.", defSimple: "Un café court et fort préparé sous pression, concentré en arômes." },
  "diurétique":        { etym: "Du grec diouretikos, qui fait uriner", defOrig: "Substance qui augmente la production d'urine en stimulant les reins.", defSimple: "Quelque chose qui te fait aller plus souvent aux toilettes en augmentant la production d'urine." },
  "adénosine":         { etym: "De adénine + -ose (sucre) + -ine", defOrig: "Molécule produite par le cerveau qui s'accumule pendant l'éveil et provoque la somnolence.", defSimple: "Une substance que ton cerveau fabrique quand tu es réveillé et qui te donne envie de dormir." },
  "cortisol":          { etym: "Du latin cortex (écorce) + stérol", defOrig: "Hormone du stress sécrétée par les glandes surrénales, régulant de nombreuses fonctions physiologiques.", defSimple: "L'hormone du stress dans ton corps, qui te met en état d'alerte." },
  "arôme":             { etym: "Du grec aroma, parfum, épice", defOrig: "Ensemble des molécules volatiles qui donnent à une substance son odeur et sa saveur caractéristiques.", defSimple: "L'odeur et le goût particulier d'un aliment ou d'une boisson." },
  "percolation":       { etym: "Du latin percolare, filtrer", defOrig: "Passage lent d'un liquide à travers un filtre ou une substance poreuse pour en extraire les composés solubles.", defSimple: "Quand l'eau traverse lentement le café moulu pour en extraire le goût." },
  "stimulant":         { etym: "Du latin stimulare, piquer, aiguillonner", defOrig: "Substance qui augmente temporairement l'activité du système nerveux central, améliorant la vigilance.", defSimple: "Quelque chose qui donne un coup de boost à ton cerveau et te rend plus alerte." },
  "dépendance":        { etym: "Du latin dependere, être suspendu à", defOrig: "État dans lequel un organisme a besoin d'une substance pour fonctionner normalement, avec sevrage en son absence.", defSimple: "Quand ton corps ne peut plus se passer de quelque chose sans ressentir des effets désagréables." },
  "sevrage":           { etym: "De sevrer, priver du sein", defOrig: "Processus d'arrêt progressif ou brutal d'une substance créant une dépendance, accompagné de symptômes.", defSimple: "Les effets désagréables que ressent le corps quand on arrête brusquement une substance dont on dépendait." },
  "antioxydant":       { etym: "Du grec anti (contre) + oxydant", defOrig: "Molécule qui neutralise les radicaux libres, protégeant les cellules contre le stress oxydatif.", defSimple: "Une substance qui protège tes cellules contre le vieillissement et les dommages." },
  "infusion":          { etym: "Du latin infusio, action de verser dans", defOrig: "Extraction des principes actifs d'une substance végétale par immersion dans un liquide chaud.", defSimple: "Faire tremper une plante ou du café dans de l'eau chaude pour en extraire les saveurs." },

  "lacrymal":          { etym: "Du latin lacrima, larme", defOrig: "Qui se rapporte aux larmes et aux glandes qui les produisent.", defSimple: "Tout ce qui concerne les larmes — les glandes lacrymales produisent les larmes." },
  "lacrymale":         { etym: "Du latin lacrima, larme", defOrig: "Qui se rapporte aux larmes et aux glandes productrices de larmes.", defSimple: "Qui concerne les larmes." },
  "prolactine":        { etym: "Du latin pro (pour) + lac (lait)", defOrig: "Hormone sécrétée par l'hypophyse, impliquée dans la lactation et la régulation émotionnelle.", defSimple: "Une hormone du cerveau qui joue un rôle dans les larmes émotionnelles et l'allaitement." },
  "enképhaline":       { etym: "Du grec enkephalos, cerveau", defOrig: "Neuropeptide opioïde naturel produit par le cerveau, ayant un effet analgésique et régulateur de l'humeur.", defSimple: "Un analgésique naturel fabriqué par le cerveau qui soulage la douleur et améliore l'humeur." },
  "larmoyant":         { etym: "De larmoyer, pleurer", defOrig: "Qui pleure facilement ou inspire les pleurs ; qui a tendance à l'attendrissement excessif.", defSimple: "Qui pleure souvent ou facilement, ou qui donne envie de pleurer." },
  "neurone miroir":    { etym: "Du grec neuron (nerf) + latin mirror (refléter)", defOrig: "Neurone qui s'active aussi bien lors de l'exécution d'une action que lors de son observation chez autrui.", defSimple: "Des cellules du cerveau qui s'allument quand tu fais quelque chose ET quand tu vois quelqu'un d'autre le faire." },
  "ocytocine":         { etym: "Du grec okytokos, accouchement rapide", defOrig: "Hormone peptidique produite par l'hypothalamus, favorisant les liens sociaux et la confiance.", defSimple: "L'hormone du lien social et de la confiance, souvent appelée l'hormone de l'amour." },
  "système limbique":  { etym: "Du latin limbus, bordure", defOrig: "Ensemble de structures cérébrales impliquées dans la régulation des émotions, de la mémoire et du comportement.", defSimple: "La partie du cerveau qui gère tes émotions et tes souvenirs." },
  "inhibition":        { etym: "Du latin inhibere, retenir", defOrig: "Processus de blocage ou de suppression d'une réaction physiologique ou psychologique.", defSimple: "Le fait de retenir ou bloquer une réaction naturelle, comme retenir ses larmes." },

  "physicalisme":      { etym: "Du grec physikos, naturel", defOrig: "Doctrine philosophique selon laquelle tout ce qui existe, y compris la conscience, est de nature physique.", defSimple: "La théorie que tout dans l'univers, même nos pensées, est fait de matière physique." },
  "dualisme":          { etym: "Du latin dualis, double", defOrig: "Doctrine affirmant que le corps et l'esprit sont deux substances distinctes et irréductibles l'une à l'autre.", defSimple: "L'idée que le corps et l'esprit sont deux choses complètement différentes et séparées." },
  "matérialisme":      { etym: "Du latin materia, matière", defOrig: "Position philosophique selon laquelle seule la matière existe et que l'esprit en est un produit.", defSimple: "La théorie que tout est fait de matière, et que même nos pensées sont produites par notre cerveau physique." },
  "émergence":         { etym: "Du latin emergere, surgir", defOrig: "Apparition de propriétés nouvelles et irréductibles dans un système complexe, absentes de ses composants isolés.", defSimple: "Quand un ensemble de choses simples donne naissance à quelque chose de complexe qu'aucune pièce seule ne pourrait créer." },
  "corrélat neuronal": { etym: "Du latin correlatus + neuron (nerf)", defOrig: "Activité cérébrale minimale suffisante pour produire un état de conscience particulier.", defSimple: "L'activité du cerveau qui correspond à une expérience consciente précise." },
  "panpsychisme":      { etym: "Du grec pan (tout) + psyche (âme)", defOrig: "Doctrine selon laquelle la conscience ou l'expérience subjective est une propriété fondamentale de toute matière.", defSimple: "L'idée que tout dans l'univers, même les atomes, aurait une forme de conscience ou d'expérience intérieure." },
  "épiphénomène":      { etym: "Du grec epi (sur) + phainomenon (ce qui apparaît)", defOrig: "Phénomène secondaire accompagnant un phénomène principal sans en être la cause ni avoir d'effet causal.", defSimple: "Quelque chose qui existe en parallèle d'autre chose sans vraiment influencer quoi que ce soit." },
  "intentionnalité":   { etym: "Du latin intentio, tension vers", defOrig: "Propriété des états mentaux d'être dirigés vers un objet ou un contenu, d'être 'à propos' de quelque chose.", defSimple: "La capacité de l'esprit à être tourné vers quelque chose — quand tu penses, tu penses toujours à quelque chose." },
  "réductionnisme":    { etym: "Du latin reducere, ramener en arrière", defOrig: "Approche consistant à expliquer un phénomène complexe en le ramenant à ses composants les plus élémentaires.", defSimple: "Expliquer quelque chose de complexe en le décomposant en parties plus simples." },
  "philosophie de l'esprit": { etym: "Du grec philosophia + latin spiritus", defOrig: "Branche de la philosophie qui étudie la nature de l'esprit, des états mentaux et de leur rapport au corps.", defSimple: "La partie de la philosophie qui cherche à comprendre ce qu'est l'esprit et comment il est lié au cerveau." },
  "cognition":         { etym: "Du latin cognitio, connaissance", defOrig: "Ensemble des processus mentaux impliqués dans l'acquisition, le traitement et l'utilisation des connaissances.", defSimple: "Tout ce que fait ton cerveau pour penser, apprendre, mémoriser et comprendre." },
  
// Jour 7 — À coller dans lib/dictionary.ts avant le }; final
// Histoires : Rêves (Curieux), Renaissance (Lecteur), Libre arbitre (Érudit)

  // ── RÊVES ─────────────────────────────────────────────────
  "inconscient":       { etym: "Du latin in (sans) + conscientia (connaissance)", defOrig: "Partie du psychisme échappant à la conscience, influençant pensées et comportements.", defSimple: "La partie cachée de ton cerveau dont tu n'es pas conscient. L'inconscient agit sans qu'on s'en rende compte." },
  "rêve lucide":       { etym: "Du latin lucidus (clair) + rêve", defOrig: "État de sommeil dans lequel le rêveur est conscient qu'il rêve et peut parfois contrôler son rêve.", defSimple: "Quand tu sais que tu rêves pendant que tu rêves. Certaines personnes peuvent même contrôler ce qui se passe dans leur rêve." },
  "sigmund freud":     { etym: "Nom propre", defOrig: "Neurologue autrichien (1856-1939), fondateur de la psychanalyse.", defSimple: "Médecin autrichien (1856-1939), fondateur de la psychanalyse. Il pensait que les rêves révèlent nos désirs cachés et notre inconscient. Son livre L'Interprétation des rêves (1900) est fondateur." },
  "freud":             { etym: "Nom propre", defOrig: "Sigmund Freud (1856-1939), fondateur de la psychanalyse.", defSimple: "Sigmund Freud (1856-1939), médecin autrichien qui a fondé la psychanalyse et théorisé l'inconscient. Il voyait les rêves comme la voie royale vers l'inconscient." },
  "robert stickgold":  { etym: "Nom propre", defOrig: "Neuroscientifique américain (1947-), spécialiste du sommeil et de la mémoire.", defSimple: "Neuroscientifique américain (né en 1947) à Harvard. Il a montré que les rêves jouent un rôle essentiel dans la consolidation des souvenirs et l'apprentissage." },
  "stickgold":         { etym: "Nom propre", defOrig: "Robert Stickgold (1947-), neuroscientifique spécialiste du sommeil.", defSimple: "Robert Stickgold (né en 1947), chercheur américain à Harvard qui étudie comment le sommeil et les rêves consolident la mémoire." },
  "onirique":          { etym: "Du grec oneiros, rêve", defOrig: "Relatif aux rêves, qui a la qualité ou l'aspect d'un rêve.", defSimple: "Qui ressemble à un rêve. Une atmosphère onirique = une atmosphère irréelle comme dans un rêve." },
  "onirisme":          { etym: "Du grec oneiros, rêve", defOrig: "État mental caractérisé par des hallucinations et des visions semblables à des rêves.", defSimple: "Un état où on voit des images comme dans un rêve, même éveillé. Proche de la rêverie intense." },
  "hallucination":     { etym: "Du latin hallucinari, divaguer", defOrig: "Perception d'un objet inexistant, comme si c'était réel.", defSimple: "Voir, entendre ou ressentir quelque chose qui n'existe pas vraiment. Comme voir des choses qui ne sont pas là." },
  "souvenir":          { etym: "Du latin subvenire, venir à l'esprit", defOrig: "Représentation mentale d'un événement passé.", defSimple: "Le fait de se rappeler quelque chose du passé. Un beau souvenir = quelque chose de plaisant qu'on a vécu." },
  "créativité":        { etym: "Du latin creatio, action de créer", defOrig: "Capacité à produire des idées nouvelles et originales.", defSimple: "La capacité d'inventer des choses nouvelles. La créativité = imaginer ce qui n'existe pas encore." },
  "mémoriser":         { etym: "Du latin memoria, mémoire", defOrig: "Fixer dans la mémoire, retenir durablement.", defSimple: "Apprendre par cœur pour s'en souvenir. Mémoriser une leçon = la garder dans sa mémoire." },
  "yesterday":         { etym: "Mot anglais signifiant hier", defOrig: "Célèbre chanson des Beatles composée par Paul McCartney en 1965, née d'un rêve.", defSimple: "La chanson la plus reprise de l'histoire de la musique, composée par Paul McCartney des Beatles. Il en a trouvé la mélodie en rêve en 1965. Le titre signifie 'hier' en anglais." },
  "psychanalyse":      { etym: "Du grec psyche (âme) + analyein (décomposer)", defOrig: "Méthode thérapeutique fondée par Freud, explorant l'inconscient par l'analyse des rêves et associations.", defSimple: "Une méthode pour comprendre les problèmes psychologiques en explorant l'inconscient. Inventée par Freud, elle utilise les rêves pour comprendre nos désirs cachés." },
  "phases du sommeil": { etym: "Du grec phasis + latin somnus", defOrig: "Cycles successifs du sommeil alternant entre sommeil lent et sommeil paradoxal.", defSimple: "Les différentes étapes du sommeil. La nuit, on passe par plusieurs phases : sommeil léger, sommeil profond et sommeil paradoxal (où on rêve)." },
  "rêveur":            { etym: "De rêver + suffixe -eur", defOrig: "Personne qui rêve beaucoup ou qui est perdue dans ses pensées.", defSimple: "Quelqu'un qui rêve beaucoup ou qui passe son temps dans ses pensées. Un grand rêveur = quelqu'un très imaginatif." },

  // ── RENAISSANCE ──────────────────────────────────────────
  "renaissance":       { etym: "Du latin re (à nouveau) + nasci (naître)", defOrig: "Mouvement culturel européen des XIVe-XVIe siècles, marqué par le renouveau des arts et de la pensée.", defSimple: "Un grand mouvement artistique et intellectuel en Europe entre le XIVe et XVIe siècle. Les artistes et penseurs redécouvrent l'Antiquité grecque et romaine et placent l'homme au centre du monde." },
  "moyen âge":         { etym: "Du latin medium aevum, âge du milieu", defOrig: "Période historique européenne entre la chute de Rome (476) et la Renaissance (fin XVe siècle).", defSimple: "Période de l'histoire entre l'Antiquité et la Renaissance, environ de l'an 500 à 1500. Une époque où l'art et la pensée étaient surtout au service de la religion." },
  "cités-états":       { etym: "Du latin civitas (cité) + status (état)", defOrig: "Entités politiques autonomes organisées autour d'une ville, comme Florence ou Venise à la Renaissance.", defSimple: "De petits territoires dirigés par une seule ville, comme Florence ou Venise en Italie. Chaque cité-état avait son propre gouvernement et était souvent en rivalité avec ses voisines." },
  "vitruve":           { etym: "Nom propre, architecte romain du Ier siècle av. J.-C.", defOrig: "Architecte romain (Ier siècle av. J.-C.), auteur du traité De architectura, référence de la Renaissance.", defSimple: "Architecte romain qui a vécu au Ier siècle avant J.-C. Il a écrit un traité d'architecture très influent. Léonard de Vinci s'est inspiré de ses théories sur les proportions idéales du corps humain." },
  "homme de vitruve":  { etym: "Du nom de l'architecte romain Vitruve", defOrig: "Dessin célèbre de Léonard de Vinci représentant un homme aux proportions idéales, inscrit dans un cercle et un carré.", defSimple: "Le célèbre dessin de Léonard de Vinci montrant un homme avec les bras et jambes écartés, inscrit dans un cercle. Il représente les proportions parfaites du corps humain selon les idées de Vitruve." },
  "mécène":            { etym: "Du nom de Mécène, ministre d'Auguste", defOrig: "Riche protecteur qui finance des artistes ou des œuvres culturelles.", defSimple: "Une personne riche qui finance des artistes. À la Renaissance, les mécènes comme les Médicis permettaient aux artistes de créer sans se soucier de l'argent." },
  "portrait":          { etym: "Du latin protrahere, tirer en avant", defOrig: "Représentation artistique d'une personne, mettant en valeur ses traits caractéristiques.", defSimple: "Un tableau ou une photo qui représente le visage et l'apparence d'une personne. La Joconde de Léonard de Vinci est le portrait le plus célèbre du monde." },
  "sculpture":         { etym: "Du latin sculptura, action de tailler", defOrig: "Art de modeler ou de tailler des formes en trois dimensions dans la matière.", defSimple: "L'art de créer des œuvres en 3D en taillant de la pierre, du bois ou de l'argile. Michel-Ange était un sculpteur génial." },
  "architecture":      { etym: "Du grec arkhitekton, maître constructeur", defOrig: "Art et technique de concevoir et construire des bâtiments.", defSimple: "L'art de concevoir et construire des bâtiments. Un architecte dessine les plans des maisons, temples et monuments." },
  "perspective":       { etym: "Du latin perspicere, voir à travers", defOrig: "Technique artistique représentant la profondeur et la distance sur une surface plane.", defSimple: "La technique artistique qui donne l'illusion de profondeur dans un tableau. Les artistes de la Renaissance l'ont perfectionnée pour que les peintures semblent réelles." },
  "botticelli":        { etym: "Nom propre, peintre florentin", defOrig: "Peintre florentin (1445-1510), figure majeure de la Renaissance, connu pour La Naissance de Vénus.", defSimple: "Grand peintre italien de la Renaissance (1445-1510). Il a peint La Naissance de Vénus et Le Printemps, deux des tableaux les plus célèbres du monde." },
  "michel-ange":       { etym: "Nom propre, artiste italien de la Renaissance", defOrig: "Artiste de la Renaissance (1475-1564), sculpteur, peintre et architecte, auteur de la Chapelle Sixtine.", defSimple: "Génie de la Renaissance italienne (1475-1564). Sculpteur du David, peintre de la Chapelle Sixtine et architecte. L'un des plus grands artistes de tous les temps." },
  "platon":            { etym: "Nom propre, philosophe grec", defOrig: "Philosophe grec (428-348 av. J.-C.), élève de Socrate et maître d'Aristote.", defSimple: "Grand philosophe grec (428-348 av. J.-C.), élève de Socrate et maître d'Aristote. Ses dialogues philosophiques ont profondément influencé la pensée occidentale. À la Renaissance, ses idées ont été redécouvertes avec enthousiasme." },
  "antiquité":         { etym: "Du latin antiquitas, ancienneté", defOrig: "Période historique des civilisations grecques et romaines, avant le Moyen Âge.", defSimple: "L'époque des Grecs et des Romains anciens, avant l'an 500. La Renaissance a redécouvert et admiré les œuvres et idées de l'Antiquité." },
  "rupture":           { etym: "Du latin ruptura, cassure", defOrig: "Cassure, changement profond et brutal avec ce qui précédait.", defSimple: "Un grand changement qui rompt avec le passé. La Renaissance représente une rupture avec le Moyen Âge." },
  "divin":             { etym: "Du latin divinus, de Dieu", defOrig: "Relatif à Dieu ou aux dieux, d'une nature supérieure.", defSimple: "Qui appartient à Dieu ou qui est d'une qualité extraordinaire. Au Moyen Âge, l'art était surtout au service du divin." },
  "siècles xiv-xvi":  { etym: "Numéros de siècles", defOrig: "Du XIVe au XVIe siècle, soit de 1300 à 1600, période de la Renaissance européenne.", defSimple: "Les années 1300 à 1600, période de la Renaissance. Trois siècles où l'Europe a connu un bouleversement artistique, scientifique et philosophique." },

  // ── LIBRE ARBITRE ─────────────────────────────────────────
  "libre arbitre":     { etym: "Du latin liber (libre) + arbitrium (jugement)", defOrig: "Capacité supposée de choisir librement ses actes, indépendamment de toute contrainte.", defSimple: "La capacité de faire des choix vraiment libres. Le libre arbitre = l'idée qu'on peut décider par soi-même sans être déterminé par autre chose." },
  "déterminisme":      { etym: "Du latin determinare, fixer les limites", defOrig: "Doctrine selon laquelle tout événement est la conséquence nécessaire de causes antérieures.", defSimple: "L'idée que tout ce qui se passe est causé par ce qui précède. Si le déterminisme est vrai, nos décisions sont déjà fixées par nos neurones avant qu'on en soit conscient." },
  "compatibilisme":    { etym: "Du latin compatibilis + isme", defOrig: "Position philosophique qui soutient que le libre arbitre et le déterminisme peuvent coexister.", defSimple: "L'idée que le libre arbitre et le déterminisme peuvent être vrais en même temps. On peut être déterminé ET libre si la liberté consiste à agir selon ses valeurs." },
  "responsabilité":    { etym: "Du latin responsus + abilitas", defOrig: "Obligation de répondre de ses actes et d'en accepter les conséquences.", defSimple: "Le fait d'être responsable de ce qu'on fait. Si tu casses quelque chose, tu en es responsable." },
  "juridique":         { etym: "Du latin juridicus, relatif au droit", defOrig: "Relatif au droit, aux lois et à la justice.", defSimple: "Qui concerne la loi et la justice. Une notion juridique = un concept du droit." },
  "poignet":           { etym: "Du latin pugnus, poing", defOrig: "Articulation entre la main et l'avant-bras.", defSimple: "La partie du corps entre la main et le bras. Dans l'expérience de Libet, les participants devaient fléchir leur poignet quand ils le souhaitaient." },
  "préméditation":     { etym: "Du latin praemeditari, réfléchir d'avance", defOrig: "Fait de planifier un acte intentionnel avant de l'accomplir.", defSimple: "Avoir prévu à l'avance de faire quelque chose. Un crime avec préméditation = planifié avant de le commettre." },
  "délibération":      { etym: "Du latin deliberatio, pesée des arguments", defOrig: "Réflexion approfondie avant de prendre une décision.", defSimple: "Le fait de réfléchir longuement avant de décider. La délibération = peser le pour et le contre avant de choisir." },
  "hasard":            { etym: "De l'arabe az-zahr, dé à jouer", defOrig: "Événement imprévisible qui ne suit aucune règle causale.", defSimple: "Ce qui arrive sans raison ni cause. Si nos actions étaient dues au hasard pur, ce ne serait pas du libre arbitre non plus." },
  "moral":             { etym: "Du latin moralis, relatif aux mœurs", defOrig: "Relatif aux règles de conduite, au bien et au mal.", defSimple: "Qui concerne ce qui est bien ou mal. Un problème moral = une question sur ce qu'il faut faire." },
  "neurones":          { etym: "Du grec neuron, nerf", defOrig: "Cellules nerveuses constituant le système nerveux et le cerveau.", defSimple: "Les cellules du cerveau qui transmettent l'information. Notre cerveau contient environ 86 milliards de neurones." },
  "potentiel":         { etym: "Du latin potentialis, possible", defOrig: "Tension électrique ; ou : capacité à se réaliser.", defSimple: "Un signal électrique ou une capacité. Le potentiel de préparation = le signal électrique dans le cerveau avant un mouvement." },
  "vertigi":           { etym: "Du latin vertigo, tournoiement", defOrig: "Sensation de tournoiement, d'instabilité.", defSimple: "La sensation que tout tourne. Au sens figuré : une idée vertigineuse donne le vertige tellement elle est grande." },
  "peser":             { etym: "Du latin pensare, soupeser", defOrig: "Évaluer, considérer avec attention.", defSimple: "Réfléchir à l'importance de quelque chose. Peser des arguments = évaluer les pour et les contre." },


  // ── MOTS SUPPLÉMENTAIRES ─────────────────────────────────
  "précepteur":        { etym: "Du latin praeceptor, celui qui instruit", defOrig: "Personne chargée de l'éducation privée d'un enfant.", defSimple: "Un professeur particulier qui s'occupe de l'éducation d'un enfant chez lui. Aristote était le précepteur d'Alexandre le Grand." },
  "alexandre le grand": { etym: "Nom propre", defOrig: "Roi de Macédoine (356-323 av. J.-C.), élève d'Aristote, conquérant d'un immense empire.", defSimple: "Roi macédonien (356-323 av. J.-C.) et l'un des plus grands conquérants de l'histoire. Élève d'Aristote, il a construit un empire s'étendant de la Grèce jusqu'à l'Inde." },
  "chapelle sixtine":  { etym: "Du nom du pape Sixte IV qui l'a commandée", defOrig: "Chapelle du Vatican dont le plafond a été peint par Michel-Ange entre 1508 et 1512.", defSimple: "La chapelle du Vatican dont Michel-Ange a peint le plafond. Un chef-d'œuvre absolu de la Renaissance avec la célèbre scène de la Création d'Adam." },
  "joconde":           { etym: "Du nom de Lisa Gherardini, épouse de Francesco del Giocondo", defOrig: "Portrait peint par Léonard de Vinci (1503-1519), le tableau le plus célèbre du monde.", defSimple: "Le tableau le plus célèbre du monde, peint par Léonard de Vinci. Portrait d'une femme au sourire mystérieux, il est exposé au Louvre à Paris." },
  "médicis":           { etym: "Nom propre, famille florentine", defOrig: "Puissante famille florentine (XVe-XVIe siècles), grands mécènes de la Renaissance.", defSimple: "Famille de banquiers florentins très puissante qui a financé de nombreux artistes de la Renaissance. Sans les Médicis, Botticelli et Michel-Ange auraient eu du mal à créer leurs œuvres." },
  "psychologie":       { etym: "Du grec psyche (âme) + logos (science)", defOrig: "Science qui étudie les processus mentaux et le comportement humain.", defSimple: "La science qui étudie comment on pense, ressent et se comporte. La psychologie du sommeil étudie comment le cerveau fonctionne quand on dort." },
  "cervelet":          { etym: "Du latin cerebellum, petite cervelle", defOrig: "Partie du cerveau impliquée dans la coordination motrice et l'équilibre.", defSimple: "Une partie du cerveau qui contrôle nos mouvements et notre équilibre. Il joue un rôle dans les mouvements automatiques comme marcher." },
  "hippocampe":        { etym: "Du grec hippos (cheval) + kampos (monstre marin)", defOrig: "Structure cérébrale en forme de cheval de mer, essentielle à la mémoire.", defSimple: "Une structure du cerveau en forme de cheval de mer. Il est essentiel pour former de nouveaux souvenirs et pour les rêves." },
  "conscience morale": { etym: "Du latin conscientia + moralis", defOrig: "Faculté qui permet à l'individu de distinguer le bien du mal.", defSimple: "La petite voix intérieure qui te dit si quelque chose est juste ou non. La conscience morale = savoir distinguer le bien du mal." },
  "époque":            { etym: "Du grec epokhe, arrêt, point fixe", defOrig: "Période historique caractérisée par des traits distinctifs.", defSimple: "Une période de l'histoire avec ses caractéristiques propres. L'époque de la Renaissance = les années 1300-1600 en Europe." },
  "nocturne":          { etym: "Du latin nocturnalis, de la nuit", defOrig: "Qui se produit ou qui est actif pendant la nuit.", defSimple: "Qui se passe la nuit. Une créature nocturne = un animal qui vit la nuit. Les rêves sont des phénomènes nocturnes." },
  "subconscient":      { etym: "Du latin sub (sous) + conscientia", defOrig: "Niveau de conscience intermédiaire entre le conscient et l'inconscient.", defSimple: "La partie de notre esprit entre ce dont on est conscient et l'inconscient. Nos habitudes et réflexes viennent souvent du subconscient." },

};

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, "");
}

// Pre-built map: normalized key \u2192 original dict key (O(1) lookups)
const NORM_MAP: Record<string, string> = {};
for (const key of Object.keys(DICT)) {
  NORM_MAP[normalize(key)] = key;
}

function dictLookup(word: string): Definition | null {
  if (DICT[word]) return DICT[word];
  const key = NORM_MAP[normalize(word)];
  return key ? DICT[key] : null;
}

// Generates inflected-form candidates to try when direct lookup fails.
// All candidates are checked against the dict, so false positives are harmless.
function generateCandidates(word: string): string[] {
  const cands: string[] = [];
  const add = (stem: string, suf: string) => { if (stem.length >= 2) cands.push(stem + suf); };

  // \u2500\u2500 Adjectifs \u2500\u2500
  if (word.endsWith('ales'))  add(word.slice(0,-4), 'al');   // fondamentales \u2192 fondamental
  if (word.endsWith('aux'))   add(word.slice(0,-3), 'al');   // fondamentaux \u2192 fondamental
  if (word.endsWith('ale'))   add(word.slice(0,-3), 'al');   // fondamentale \u2192 fondamental
  if (word.endsWith('elles')) add(word.slice(0,-5), 'el');   // formelles \u2192 formel
  if (word.endsWith('elle'))  add(word.slice(0,-4), 'el');   // formelle \u2192 formel
  if (word.endsWith('ives'))  add(word.slice(0,-4), 'if');   // actives \u2192 actif
  if (word.endsWith('ive'))   add(word.slice(0,-3), 'if');   // active \u2192 actif
  if (word.endsWith('euses')) add(word.slice(0,-5), 'eux');  // heureuses \u2192 heureux
  if (word.endsWith('euse'))  add(word.slice(0,-4), 'eux');  // heureuse \u2192 heureux
  if (word.endsWith('i\u00e8res')) add(word.slice(0,-5), 'ier');  // premi\u00e8res \u2192 premier
  if (word.endsWith('i\u00e8re'))  add(word.slice(0,-4), 'ier');  // premi\u00e8re \u2192 premier
  if (word.endsWith('\u00e8res'))  add(word.slice(0,-4), 'er');   // l\u00e9g\u00e8res \u2192 l\u00e9ger
  if (word.endsWith('\u00e8re'))   add(word.slice(0,-3), 'er');   // l\u00e9g\u00e8re \u2192 l\u00e9ger
  // pluriel/f\u00e9minin simples (conservative: stem \u2265 3 chars)
  if (word.length > 4 && word.endsWith('es')) cands.push(word.slice(0,-2));
  if (word.length > 3 && word.endsWith('s'))  cands.push(word.slice(0,-1));

  // \u2500\u2500 Verbes 1er groupe (-er) \u2500\u2500
  for (const suf of ['aient','eront','erait','erez','erai','ons','ent','ais','ait','ez'] as const) {
    if (word.endsWith(suf)) add(word.slice(0, -suf.length), 'er');
  }
  // Participe pass\u00e9 -\u00e9 \u2192 -er
  for (const suf of ['\u00e9es','\u00e9e','\u00e9s','\u00e9'] as const) {
    if (word.endsWith(suf)) add(word.slice(0, -suf.length), 'er');
  }

  // \u2500\u2500 Verbes 2e groupe (-ir, type finir) \u2500\u2500
  for (const suf of ['issaient','issons','issez','issent','issait','issais'] as const) {
    if (word.endsWith(suf)) add(word.slice(0, -suf.length), 'ir');
  }

  // \u2500\u2500 Verbes 3e groupe (-re, type vendre) \u2500\u2500
  // Strat\u00e9gie: strip ending \u2192 stem + "re"  (vendez \u2192 vend \u2192 vendre)
  for (const suf of ['aient','ent','ons','ais','ait','ez','us','s','u'] as const) {
    if (word.endsWith(suf)) add(word.slice(0, -suf.length), 're');
  }

  return cands;
}

export function lookup(word: string): Definition | null {
  const direct = dictLookup(word);
  if (direct) return direct;
  for (const candidate of generateCandidates(word)) {
    const found = dictLookup(candidate);
    if (found) return found;
  }
  return null;
}