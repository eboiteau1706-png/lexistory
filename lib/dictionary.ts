// lib/dictionary.ts
export interface Definition {
  etym:      string;
  defOrig:   string;
  defSimple: string;
}

const DICT: Record<string, Definition> = {

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
  "limbique":        { etym: "Du latin limbus, bordure", defOrig: "Relatif au système cérébral qui gère les émotions et la mémoire.", defSimple: "Une partie du cerveau qui s'occupe de nos émotions et de nos souvenirs." },
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