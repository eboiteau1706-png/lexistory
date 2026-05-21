// lib/dictionary.ts
export interface Definition {
  etym:      string;
  defOrig:   string;
  defSimple: string;
}

const DICT: Record<string, Definition> = {

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

};

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, "");
}

export function lookup(word: string): Definition | null {
  if (DICT[word]) return DICT[word];
  const norm = normalize(word);
  for (const key of Object.keys(DICT)) {
    if (normalize(key) === norm) return DICT[key];
  }
  return null;
}