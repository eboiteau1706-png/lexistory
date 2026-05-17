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

  // ══════════════════════════════════════════════════════
  // HISTOIRES EXISTANTES
  // ══════════════════════════════════════════════════════
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
  {
    slug: "biais-cognitifs",
    date: "2026-05-19",
    title: "Les biais cognitifs, ces illusions qui gouvernent nos décisions",
    category: "Psychologie",
    level: "Érudit",
    readTime: "4 min de lecture",
    paragraphs: [
      "Nous aimons penser que nos décisions sont le fruit d'une réflexion rationnelle et méthodique. Pourtant, la psychologie cognitive a démontré depuis plusieurs décennies que notre cerveau est constamment soumis à des biais, ces raccourcis mentaux qui altèrent notre jugement à notre insu.",
      "Le biais de confirmation en est l'exemple le plus pernicieux : nous avons naturellement tendance à rechercher, interpréter et mémoriser les informations qui corroborent nos croyances préexistantes, tout en ignorant celles qui les contredisent.",
      "L'effet de halo constitue un autre biais particulièrement influent. Lorsque nous percevons une qualité positive chez une personne, nous lui attribuons spontanément d'autres vertus sans aucune justification rationnelle.",
      "Comprendre ces biais ne suffit malheureusement pas à s'en affranchir. La lucidité consiste alors non pas à les éliminer, mais à les reconnaître au moment où ils opèrent — un effort d'introspection permanent.",
    ],
  },

  // ══════════════════════════════════════════════════════
  // JUIN 2026
  // ══════════════════════════════════════════════════════

  // JOUR 1 — 1er juin
  {
    slug: "pourquoi-chats-ronronnent",
    date: "2026-06-01",
    title: "Pourquoi les chats ronronnent-ils ?",
    category: "Nature",
    level: "Curieux",
    readTime: "2 min de lecture",
    paragraphs: [
      "Quand tu caresses ton chat et qu'il ferme les yeux en faisant ce drôle de bruit dans sa gorge, tu te demandes sûrement ce que ça veut dire. Ce bruit, c'est le ronronnement, et il cache plein de secrets !",
      "Les chats ronronnent en faisant vibrer leurs cordes vocales très vite, environ 25 fois par seconde. Ce n'est pas seulement un signe de bonheur. Les chats ronronnent aussi quand ils ont peur, mal ou quand ils veulent demander quelque chose.",
      "Les scientifiques ont découvert quelque chose d'incroyable : les vibrations du ronronnement aident les os des chats à se réparer plus vite ! C'est comme si les chats avaient leur propre médicament intégré.",
      "Alors quand ton chat ronronne sur toi, il ne te dit pas juste qu'il est content. Il te soigne peut-être aussi un peu !",
    ],
  },
  {
    slug: "invention-chocolat",
    date: "2026-06-01",
    title: "L'histoire surprenante du chocolat",
    category: "Histoire",
    level: "Lecteur",
    readTime: "3 min de lecture",
    paragraphs: [
      "Le chocolat que nous consommons aujourd'hui n'a presque rien à voir avec la boisson amère et épicée qu'appréciaient les Mayas et les Aztèques il y a plus de trois mille ans. Cette transformation est le fruit d'une longue histoire de conquêtes et d'innovations.",
      "Pour les civilisations mésoaméricaines, le cacao était une denrée sacrée, utilisée lors des rituels religieux et même comme monnaie d'échange. Les fèves de cacao étaient si précieuses qu'elles valaient plus que l'or dans certaines régions.",
      "C'est Hernán Cortés qui rapporta le cacao en Europe au XVIe siècle. Les Espagnols, qui trouvaient la boisson trop amère, eurent l'idée d'y ajouter du sucre et de la vanille. Le chocolat sucré connut alors un succès foudroyant dans les cours royales européennes.",
      "Il faudra attendre 1847 pour qu'un confiseur anglais invente le premier chocolat solide. En moins de deux siècles, cette friandise est devenue l'une des plus consommées au monde, générant aujourd'hui plus de cent milliards d'euros de chiffre d'affaires annuel.",
    ],
  },
  {
    slug: "memoire-emotionnelle",
    date: "2026-06-01",
    title: "Pourquoi certains souvenirs restent gravés pour toujours",
    category: "Neurosciences",
    level: "Érudit",
    readTime: "4 min de lecture",
    paragraphs: [
      "Il est des souvenirs que le temps semble incapable d'effacer : le jour d'un accident, une déclaration d'amour inattendue, l'annonce d'un deuil. Ces événements restent gravés avec une précision photographique, tandis que des journées entières s'évaporent sans laisser de trace.",
      "Ce phénomène s'explique par le rôle de l'amygdale, cette petite structure en forme d'amande nichée au cœur du cerveau limbique. Lors d'une expérience émotionnellement intense, l'amygdale envoie un signal au reste du cerveau pour lui dire, en substance : 'Ce moment est important, grave-le soigneusement.'",
      "Cette consolidation mnésique renforcée par l'émotion a une valeur évolutive évidente : mémoriser les situations de danger ou de récompense exceptionnelle permettait à nos ancêtres d'adapter leur comportement pour survivre.",
      "Paradoxalement, cette même mécanique est à l'origine des troubles post-traumatiques, où un souvenir particulièrement intense se rejoue en boucle, envahissant la conscience bien au-delà de toute utilité adaptative. La mémoire émotionnelle, conçue pour nous protéger, peut ainsi devenir une prison.",
    ],
  },

  // JOUR 2 — 2 juin
  {
    slug: "pourquoi-arc-en-ciel",
    date: "2026-06-02",
    title: "Comment se forme un arc-en-ciel ?",
    category: "Science",
    level: "Curieux",
    readTime: "2 min de lecture",
    paragraphs: [
      "L'arc-en-ciel est l'une des plus belles surprises que la nature nous offre. Mais pourquoi apparaît-il toujours après la pluie et jamais quand il fait beau ?",
      "Chaque goutte de pluie fonctionne comme un tout petit prisme de verre. Quand la lumière du soleil entre dans la goutte, elle se sépare en toutes ses couleurs : rouge, orange, jaune, vert, bleu, indigo et violet.",
      "Pour voir un arc-en-ciel, tu dois toujours avoir le soleil dans le dos. Les couleurs rebondissent à l'intérieur des gouttes et reviennent vers toi sous forme de bel arc coloré dans le ciel.",
      "Tu ne pourras jamais atteindre un arc-en-ciel parce qu'il se déplace avec toi ! C'est une illusion optique qui dépend de l'endroit exact où tu te trouves.",
    ],
  },
  {
    slug: "sommeil-cerveau",
    date: "2026-06-02",
    title: "Ce que ton cerveau fait quand tu dors",
    category: "Science · Santé",
    level: "Lecteur",
    readTime: "3 min de lecture",
    paragraphs: [
      "Pendant longtemps, le sommeil a été considéré comme un simple repos passif. Les neurosciences modernes ont radicalement changé cette vision : la nuit, notre cerveau est en réalité plus actif que dans bien des moments de la journée.",
      "Durant le sommeil profond, le cerveau procède à un véritable nettoyage. Le système glymphatique s'active et élimine les déchets métaboliques accumulés pendant la journée, dont des protéines associées aux maladies neurodégénératives comme Alzheimer.",
      "Le sommeil paradoxal, celui pendant lequel nous rêvons, joue un rôle crucial dans la consolidation des souvenirs. Le cerveau rejoue alors les événements de la journée, trie les informations importantes et les intègre dans la mémoire à long terme.",
      "Dormir sept à neuf heures par nuit n'est donc pas un luxe mais une nécessité biologique. Chaque heure de sommeil perdue représente une maintenance que le cerveau n'a pas pu effectuer.",
    ],
  },
  {
    slug: "stoicisme-moderne",
    date: "2026-06-02",
    title: "Le stoïcisme, une sagesse antique pour le monde contemporain",
    category: "Philosophie",
    level: "Érudit",
    readTime: "4 min de lecture",
    paragraphs: [
      "Fondé à Athènes par Zénon de Kition au IIIe siècle avant notre ère, le stoïcisme connaît depuis une décennie un regain d'intérêt remarquable. Des dirigeants de la Silicon Valley aux sportifs de haut niveau, nombreux sont ceux qui revendiquent cette philosophie comme boussole existentielle.",
      "Le principe fondamental du stoïcisme repose sur une distinction radicale : il existe ce qui dépend de nous — nos jugements, nos désirs, nos actes — et ce qui n'en dépend pas — le corps, la réputation, les possessions, les événements extérieurs. Le sage stoïcien concentre toute son énergie sur le premier domaine et accepte le second avec équanimité.",
      "Cette doctrine, loin d'être un fatalisme passif, est au contraire un appel à l'action lucide. Marc Aurèle, qui gouvernait le plus vaste empire du monde, prenait chaque matin le temps de méditer sur les obstacles de la journée à venir, non pour les redouter, mais pour les anticiper avec sérénité.",
      "La popularité contemporaine du stoïcisme révèle peut-être un besoin profond : dans un monde saturé de stimulations et d'injonctions au bonheur immédiat, la promesse d'une paix intérieure accessible par l'effort de la raison conserve une force séduisante intacte depuis vingt-trois siècles.",
    ],
  },

  // JOUR 3 — 3 juin
  {
    slug: "pourquoi-baillons",
    date: "2026-06-03",
    title: "Pourquoi est-ce qu'on bâille ?",
    category: "Corps humain",
    level: "Curieux",
    readTime: "2 min de lecture",
    paragraphs: [
      "Tout le monde bâille, même les bébés dans le ventre de leur maman et les animaux comme les chiens et les lions. Mais sais-tu vraiment pourquoi tu bâilles ?",
      "Les scientifiques pensent que le bâillement aide ton cerveau à rester bien réveillé en faisant entrer beaucoup d'air frais d'un coup. C'est comme appuyer sur un bouton pour se réveiller !",
      "Le bâillement est aussi contagieux que le rire. Quand tu vois quelqu'un bâiller, ton cerveau copie automatiquement ce comportement. C'est un signe d'empathie : les personnes qui bâillent facilement en voyant les autres sont souvent plus sensibles aux émotions des autres.",
      "Les chimpanzés aussi bâillent en voyant leurs amis bâiller. Et les chiens peuvent bâiller en regardant leurs maîtres ! C'est une façon silencieuse de dire qu'on est connectés les uns aux autres.",
    ],
  },
  {
    slug: "tour-eiffel-histoire",
    date: "2026-06-03",
    title: "La Tour Eiffel, de la honte au symbole",
    category: "Histoire",
    level: "Lecteur",
    readTime: "3 min de lecture",
    paragraphs: [
      "Difficile d'imaginer Paris sans la Tour Eiffel. Et pourtant, lorsqu'elle fut construite en 1889 pour l'Exposition universelle, elle déclencha un tollé sans précédent parmi les intellectuels et artistes parisiens, qui la qualifièrent de 'lampadaire disgracieux' ou de 'suppositoire criblé de trous'.",
      "Gustave Eiffel releva le défi en seulement deux ans, deux mois et cinq jours, avec une précision d'assemblage remarquable pour l'époque. Les 18 038 pièces métalliques furent fabriquées en usine et assemblées sur place, grâce à 2,5 millions de rivets.",
      "Initialement prévue pour être démontée après vingt ans, la tour fut sauvée par l'installation d'une antenne de télégraphie sans fil à son sommet. Elle devint ainsi indispensable aux communications militaires pendant la Première Guerre mondiale.",
      "Aujourd'hui, la Tour Eiffel accueille plus de six millions de visiteurs par an, ce qui en fait le monument payant le plus visité au monde. La 'dame de fer' a bien rattrapé son honneur.",
    ],
  },
  {
    slug: "langage-metaphores",
    date: "2026-06-03",
    title: "Pourquoi notre pensée est fondamentalement métaphorique",
    category: "Linguistique · Philosophie",
    level: "Érudit",
    readTime: "4 min de lecture",
    paragraphs: [
      "Nous avons tendance à considérer les métaphores comme des ornements du discours, des figures de style réservées aux poètes. Les travaux de George Lakoff et Mark Johnson, publiés en 1980 dans 'Les Métaphores dans la vie quotidienne', ont radicalement remis en question cette conception : la métaphore serait non pas un embellissement du langage mais son infrastructure même.",
      "Lorsque nous disons qu'une discussion 's'est envenimée', qu'une idée nous a 'traversé l'esprit', ou qu'une relation 'bat de l'aile', nous mobilisons des schèmes conceptuels issus du monde physique pour appréhender des réalités abstraites. Ces métaphores structurelles ne sont pas des choix stylistiques mais des modes de pensée automatiques.",
      "La culture influence profondément le répertoire métaphorique disponible. En français, 'le temps, c'est de l'argent' — on le dépense, on l'investit, on le gaspille. Dans d'autres cultures, le temps est conceptualisé comme un fleuve sur lequel on navigue, ou comme une ressource collective plutôt qu'individuelle.",
      "Prendre conscience de nos métaphores ordinaires, c'est entrouvrir une fenêtre sur notre manière implicite d'organiser le monde. C'est aussi comprendre pourquoi certains débats semblent insolubles : deux interlocuteurs qui utilisent des métaphores fondamentales différentes pour le même concept ne parlent, en réalité, pas de la même chose.",
    ],
  },

  // JOUR 4 — 4 juin
  {
    slug: "pourquoi-feuilles-changent",
    date: "2026-06-04",
    title: "Pourquoi les feuilles changent de couleur en automne ?",
    category: "Nature",
    level: "Curieux",
    readTime: "2 min de lecture",
    paragraphs: [
      "En automne, les forêts se transforment en tableaux de peinture avec leurs feuilles rouges, oranges et jaunes. Mais pourquoi ce changement de couleur se produit-il ?",
      "Pendant l'été, les feuilles sont vertes grâce à la chlorophylle, une substance qui capte la lumière du soleil pour fabriquer la nourriture de l'arbre. Mais quand les jours raccourcissent et que le froid arrive, les arbres se préparent pour l'hiver.",
      "L'arbre coupe l'alimentation de ses feuilles. La chlorophylle verte disparaît et laisse apparaître d'autres pigments qui étaient cachés dessous : des jaunes, des oranges et des rouges. Ces couleurs étaient là depuis le début, juste masquées par le vert !",
      "Après ce beau spectacle de couleurs, les feuilles tombent. L'arbre entre alors en sommeil pour économiser son énergie pendant l'hiver, avant de renaître au printemps.",
    ],
  },
  {
    slug: "adn-decouverte",
    date: "2026-06-04",
    title: "La découverte de l'ADN, une course contre la montre",
    category: "Science · Histoire",
    level: "Lecteur",
    readTime: "3 min de lecture",
    paragraphs: [
      "En 1953, deux jeunes chercheurs de Cambridge, James Watson et Francis Crick, publièrent l'une des découvertes les plus importantes du XXe siècle : la structure en double hélice de l'ADN. Mais derrière cette avancée historique se cache une histoire bien moins glorieuse.",
      "Une chercheuse britannique, Rosalind Franklin, avait produit grâce à ses travaux de cristallographie une image d'une précision extraordinaire de l'ADN, connue sous le nom de 'Photo 51'. Cette image fut transmise à Watson à son insu, sans la permission de Franklin.",
      "En s'appuyant sur ce cliché décisif, Watson et Crick purent élucider la structure hélicoïdale de l'ADN et publier leurs résultats. Ils reçurent le Prix Nobel de médecine en 1962, avec Maurice Wilkins, le collègue de Franklin. Cette dernière, décédée en 1958, ne put jamais être récompensée.",
      "L'histoire de Rosalind Franklin illustre les inégalités qui régnaient dans le monde scientifique du XXe siècle. Elle est aujourd'hui reconnue comme une pionnière de la biologie moléculaire, et son nom a été donné à un rover martien européen.",
    ],
  },
  {
    slug: "temps-perception",
    date: "2026-06-04",
    title: "La subjectivité du temps : pourquoi les heures n'ont pas toutes la même durée",
    category: "Neurosciences · Philosophie",
    level: "Érudit",
    readTime: "4 min de lecture",
    paragraphs: [
      "L'ennui dilate le temps, la passion le contracte. Cette expérience universelle soulève une question fondamentale : le temps que nous vivons est-il le même que le temps que mesurent les horloges ? Les neurosciences contemporaines apportent des éléments de réponse fascinants.",
      "Notre cerveau ne dispose pas d'une horloge centrale unique, mais d'une multitude de systèmes temporels distribués. La perception du temps dépend étroitement du niveau d'attention, de l'état émotionnel et de la quantité d'informations traitées. Lors d'un événement intense ou nouveau, le cerveau enregistre davantage de détails, ce qui donne rétrospectivement l'impression que cet épisode a duré plus longtemps.",
      "Ce phénomène explique pourquoi les années d'enfance semblent si longues dans le souvenir, alors que les décennies adultes paraissent s'accélérer. L'enfant découvre sans cesse des choses nouvelles, chaque journée est riche en premières fois. L'adulte, fonctionnant sur des routines bien rodées, traite moins d'informations inédites : le temps passe sans laisser de traces.",
      "Des pratiques comme la méditation ou le voyage en territoire inconnu permettent de ralentir subjectivement le temps en restaurant la capacité d'étonnement. Il s'agirait, selon certains philosophes, d'une des voies d'accès les plus directes à ce que nous appelons, faute de mieux, une vie pleinement vécue.",
    ],
  },

  // JOUR 5 — 5 juin
  {
    slug: "pourquoi-peau-rides",
    date: "2026-06-05",
    title: "Pourquoi la peau se ride dans l'eau ?",
    category: "Corps humain",
    level: "Curieux",
    readTime: "2 min de lecture",
    paragraphs: [
      "Quand tu restes longtemps dans le bain ou la piscine, tes doigts et tes orteils deviennent tout ridés, comme des raisins secs. Mais pourquoi est-ce que ça arrive ?",
      "Pendant longtemps, les scientifiques pensaient que la peau absorbait l'eau et gonflait, ce qui créait des rides. Mais ce n'est pas la vraie raison !",
      "En réalité, c'est ton système nerveux qui crée ces rides volontairement. Les rides créent des rainures comme les pneus d'une voiture, pour mieux s'accrocher aux objets mouillés. C'est une super adaptation !",
      "Des expériences ont montré que les personnes dont les nerfs des doigts sont abîmés ne font pas de rides dans l'eau. Preuve que ce sont bien les nerfs qui commandent ce changement, et non l'eau elle-même.",
    ],
  },
  {
    slug: "gravite-newton",
    date: "2026-06-05",
    title: "Newton et la pomme : mythe ou réalité ?",
    category: "Science · Histoire",
    level: "Lecteur",
    readTime: "3 min de lecture",
    paragraphs: [
      "L'image est célèbre : Isaac Newton, assis sous un pommier, reçoit une pomme sur la tête et découvre soudainement la loi de la gravitation universelle. Bonne nouvelle : il y a bien une pomme dans cette histoire. Mauvaise nouvelle : les détails sont un peu plus nuancés.",
      "Newton lui-même a raconté cette anecdote à plusieurs reprises, mais il n'a jamais dit que la pomme lui était tombée sur la tête. Il affirmait simplement avoir vu une pomme tomber dans son verger de Woolsthorpe Manor en 1666, ce qui l'avait conduit à s'interroger sur la nature de la force qui l'attirait vers le sol.",
      "Cette observation n'a pas conduit à une révélation instantanée. Newton travailla pendant vingt ans à développer sa théorie, résolvant des équations complexes et consultant de nombreux correspondants scientifiques avant de publier ses 'Principia Mathematica' en 1687.",
      "Le mythe de la pomme illustre un biais très humain : nous préférons les histoires d'eurêka soudain à la réalité plus humble d'un travail patient et méthodique. La vraie histoire de Newton est pourtant bien plus impressionnante que la légende.",
    ],
  },
  {
    slug: "identite-numerique",
    date: "2026-06-05",
    title: "L'identité à l'ère numérique : sommes-nous nos données ?",
    category: "Philosophie · Technologie",
    level: "Érudit",
    readTime: "4 min de lecture",
    paragraphs: [
      "Nos smartphones enregistrent nos déplacements, nos applications connaissent nos habitudes d'achat, nos réseaux sociaux cartographient nos relations et nos centres d'intérêt. L'ensemble de ces traces constitue ce que les chercheurs appellent notre 'double numérique' — une représentation de nous-mêmes qui existe indépendamment de notre volonté consciente.",
      "La question philosophique qui émerge de cette réalité est vertigineuse : dans quelle mesure ce double numérique nous représente-t-il réellement ? Les données que nous produisons reflètent nos comportements, mais pas nécessairement nos valeurs, nos aspirations ou notre vie intérieure. Elles capturent ce que nous faisons, rarement ce que nous sommes.",
      "Le philosophe Luciano Floridi propose le concept d'infosphère pour désigner cet environnement informationnel dans lequel nous sommes désormais immergés. Selon lui, la frontière entre en ligne et hors ligne s'estompe progressivement : nous ne nous connectons plus à internet, nous vivons dans internet.",
      "Cette transformation pose des questions éthiques urgentes : qui possède notre double numérique ? Peut-on revendiquer un droit à l'oubli dans un monde où chaque interaction laisse une empreinte persistante ? La réponse collective à ces interrogations définira en grande partie la nature des libertés individuelles au XXIe siècle.",
    ],
  },

  // JOUR 6 — 6 juin
  {
    slug: "pourquoi-larmes",
    date: "2026-06-06",
    title: "Pourquoi pleure-t-on ?",
    category: "Corps humain",
    level: "Curieux",
    readTime: "2 min de lecture",
    paragraphs: [
      "Les larmes, c'est mystérieux. On pleure quand on est triste, mais aussi quand on est très heureux, quand on rit trop fort, ou quand on coupe des oignons. Comment ça marche ?",
      "Il existe trois types de larmes. Les larmes basales humilifient tes yeux en permanence pour les protéger. Les larmes réflexes apparaissent quand quelque chose irrite tes yeux, comme la fumée ou les oignons. Et les larmes émotionnelles, elles, viennent du coeur.",
      "Les larmes émotionnelles sont spéciales : elles contiennent des hormones du stress. Pleurer aide ton corps à éliminer ces substances et te fait du bien. C'est pour ça qu'on se sent souvent mieux après avoir pleuré un bon coup !",
      "Les humains sont les seuls animaux qui pleurent pour leurs émotions. C'est une façon très puissante de communiquer avec les autres : quand tu vois quelqu'un pleurer, tu ressens immédiatement de l'empathie pour lui.",
    ],
  },
  {
    slug: "cafe-histoire",
    date: "2026-06-06",
    title: "Le café, le breuvage qui a changé l'histoire",
    category: "Histoire · Culture",
    level: "Lecteur",
    readTime: "3 min de lecture",
    paragraphs: [
      "Avant l'invention du café, la majorité des Européens commençaient leur journée avec de la bière ou du vin — les seules boissons considérées comme sûres, l'eau étant souvent contaminée. L'arrivée du café au XVIIe siècle a donc représenté bien plus qu'une nouvelle boisson : c'était une révolution culturelle.",
      "Les cafés londoniens, parisiens et viennois devinrent des lieux d'effervescence intellectuelle où toutes les classes sociales pouvaient se mêler pour le prix d'une tasse. On y lisait les journaux, on y débattait de politique, on y brassait des affaires. Lloyd's de Londres, la célèbre compagnie d'assurances, est née d'un café.",
      "En France, le Café de Procope, ouvert en 1686, accueillit Voltaire, Rousseau et Benjamin Franklin. Certains historiens considèrent que les idéaux des Lumières, qui ont conduit à la Révolution française, se sont en grande partie forgés autour de tasses de café.",
      "Aujourd'hui, le café est la deuxième marchandise la plus échangée dans le monde après le pétrole. Deux milliards de tasses sont consommées chaque jour, faisant de ce grain torréfié l'un des vecteurs culturels les plus puissants de l'histoire humaine.",
    ],
  },
  {
    slug: "conscience-philosophie",
    date: "2026-06-06",
    title: "Le problème difficile de la conscience",
    category: "Philosophie · Neurosciences",
    level: "Érudit",
    readTime: "4 min de lecture",
    paragraphs: [
      "En 1995, le philosophe australien David Chalmers introduisit une distinction devenue fondamentale dans le débat sur la conscience. Il sépara les 'problèmes faciles' — expliquer comment le cerveau traite l'information, intègre les perceptions, régule le comportement — du 'problème difficile' : expliquer pourquoi et comment ces processus physiques donnent naissance à une expérience subjective.",
      "Pourquoi y a-t-il 'quelque chose que ça fait' d'être moi, de voir le rouge, d'entendre de la musique, de ressentir de la douleur ? Cette dimension qualitative de l'expérience, que les philosophes appellent qualia, résiste à toute explication purement fonctionnelle ou computationnelle.",
      "Trois grandes familles de réponses s'affrontent. Les matérialistes soutiennent que la conscience est entièrement réductible aux processus cérébraux, même si nous n'en comprenons pas encore les mécanismes. Les dualistes défendent l'idée d'une réalité mentale irréductible à la matière. Les panpsychistes, dont Chalmers lui-même se rapproche, suggèrent que la conscience est une propriété fondamentale de l'univers, présente à tous les niveaux de complexité.",
      "Ce débat n'est pas purement académique : il détermine la façon dont nous concevons l'intelligence artificielle, les droits des animaux, et même la nature de ce que nous appelons la mort. Si la conscience n'est pas entièrement produite par le cerveau, qu'advient-il d'elle quand celui-ci cesse de fonctionner ?",
    ],
  },

  // JOUR 7 — 7 juin
  {
    slug: "pourquoi-sommeil-reves",
    date: "2026-06-07",
    title: "Pourquoi fait-on des rêves ?",
    category: "Corps humain",
    level: "Curieux",
    readTime: "2 min de lecture",
    paragraphs: [
      "Chaque nuit, tu pars en voyage dans un monde inventé par ton cerveau. Des fois c'est super, des fois c'est un cauchemar. Mais pourquoi est-ce qu'on rêve ?",
      "Les scientifiques pensent que rêver aide ton cerveau à trier les souvenirs de la journée. C'est comme si ton cerveau faisait du rangement pendant la nuit, gardant les choses importantes et jetant ce qui ne sert à rien.",
      "Les rêves peuvent aussi t'aider à résoudre des problèmes. Beaucoup de grandes inventions et créations artistiques sont venues de rêves ! Paul McCartney a composé la mélodie de la chanson Yesterday en rêvant.",
      "On rêve tous, même si certains ne s'en souviennent pas. On oublie la plupart de nos rêves dans les cinq minutes après le réveil. Si tu veux te souvenir de tes rêves, écris-les tout de suite en te réveillant !",
    ],
  },
  {
    slug: "renaissance-art",
    date: "2026-06-07",
    title: "La Renaissance, quand l'homme se découvrit au centre du monde",
    category: "Histoire · Art",
    level: "Lecteur",
    readTime: "3 min de lecture",
    paragraphs: [
      "Entre le XIVe et le XVIe siècle, l'Europe occidentale connut une transformation culturelle sans précédent. La Renaissance, qui naquit dans les cités-États italiennes avant de se répandre à travers le continent, représenta une rupture fondamentale avec la vision médiévale du monde.",
      "Au Moyen Âge, l'art et la pensée étaient principalement au service de Dieu. La Renaissance plaça l'être humain au centre des préoccupations — c'est ce qu'on appelle l'humanisme. Les artistes étudièrent le corps humain, dissèquèrent des cadavres, observèrent la nature avec une curiosité nouvelle et scientifique.",
      "Des génies comme Léonard de Vinci illustrent parfaitement cet esprit universel : peintre, sculpteur, architecte, musicien, mathématicien, ingénieur et anatomiste à la fois. Son Homme de Vitruve, dessin montrant les proportions idéales du corps humain, symbolise cette réconciliation entre l'art et la science.",
      "La Renaissance a posé les fondements du monde moderne : la pensée critique, la méthode scientifique, l'individualisme et la conception de l'art comme expression personnelle plutôt que comme service divin. Cinq siècles plus tard, ces valeurs restent au coeur de notre civilisation.",
    ],
  },
  {
    slug: "libre-arbitre",
    date: "2026-06-07",
    title: "Le libre arbitre existe-t-il vraiment ?",
    category: "Philosophie · Neurosciences",
    level: "Érudit",
    readTime: "4 min de lecture",
    paragraphs: [
      "En 1983, le neurophysiologiste Benjamin Libet réalisa une expérience qui allait troubler durablement notre conception de la volonté humaine. En demandant à des sujets de fléchir leur poignet quand ils le souhaitaient tout en notant l'heure précise de leur décision consciente, il découvrit que l'activité cérébrale précédant le mouvement — le 'potentiel de préparation' — démarrait environ 550 millisecondes avant que les sujets aient conscience de vouloir bouger.",
      "La conclusion semblait vertigineuse : nos décisions conscientes seraient le reflet d'une activité cérébrale inconsciente antérieure, non sa cause. Nous ne choisirions pas vraiment — nous nous raconterions simplement l'histoire d'un choix après coup.",
      "Cette interprétation a été vivement contestée. Daniel Dennett et d'autres philosophes font remarquer que le libre arbitre n'exige pas que nos décisions échappent à toute causalité physique — ce serait du pur hasard, non de la liberté. La liberté consisterait plutôt dans la capacité à délibérer, à peser des raisons, à agir en accord avec nos valeurs.",
      "L'enjeu de ce débat dépasse la philosophie abstraite : si le libre arbitre est une illusion, la notion de responsabilité pénale, qui suppose qu'un individu aurait pu agir autrement, devient philosophiquement fragile. Nos systèmes juridiques et moraux reposent sur une hypothèse que les neurosciences contemporaines peinent à confirmer.",
    ],
  },

  // JOUR 8 — 8 juin
  {
    slug: "pourquoi-musique-frissons",
    date: "2026-06-08",
    title: "Pourquoi la musique nous donne des frissons ?",
    category: "Science · Musique",
    level: "Curieux",
    readTime: "2 min de lecture",
    paragraphs: [
      "Tu écoutes ta chanson préférée et soudain, tu as des frissons dans le dos et les bras. Ce phénomène a un nom scientifique : la chair de poule musicale. Et elle est vraiment fascinante !",
      "Quand tu entends de la musique qui te touche, ton cerveau libère de la dopamine, une substance chimique qui te fait te sentir très bien. C'est la même substance qui se libère quand tu manges quelque chose de délicieux !",
      "Environ 65% des personnes ressentent ces frissons musicaux. Les chercheurs ont découvert que les personnes qui les ressentent ont souvent des cerveaux plus connectés entre la zone des émotions et la zone qui traite les sons.",
      "Les frissons musicaux sont plus fréquents quand la musique fait quelque chose d'inattendu : une note surprise, un changement soudain, ou quand les paroles te touchent personnellement. Ton cerveau adore être surpris !",
    ],
  },
  {
    slug: "ocean-profond",
    date: "2026-06-08",
    title: "Les abysses, le dernier grand mystère de la Terre",
    category: "Nature · Science",
    level: "Lecteur",
    readTime: "3 min de lecture",
    paragraphs: [
      "Nous en savons plus sur la surface de la Lune que sur les fonds marins de notre propre planète. Seulement 20% des océans ont été cartographiés avec précision, et les grandes fosses abyssales restent parmi les territoires les moins explorés de la Terre.",
      "Dans ces zones situées au-delà de 6 000 mètres de profondeur, les conditions sont extrêmes : pression écrasante, température proche de zéro, obscurité totale. Pourtant, la vie s'y est adaptée de façon spectaculaire. Des créatures bioluminescentes, des poissons aux dents translucides et des organismes capables de survivre sans la moindre lumière y prospèrent.",
      "En 1960, Jacques Piccard et Don Walsh furent les premiers humains à atteindre le fond de la Fosse des Mariannes, à presque 11 000 mètres de profondeur. Ils y observèrent, à leur grande surprise, des poissons plats, prouvant que la vie pouvait survivre dans les conditions les plus inhospitalières imaginables.",
      "L'exploration des abysses pourrait révolutionner la médecine et la biologie. Les organismes qui y vivent ont développé des mécanismes uniques pour résister à des conditions extrêmes, mécanismes qui pourraient inspirer de nouveaux traitements contre le cancer ou des matériaux révolutionnaires.",
    ],
  },
  {
    slug: "bonheur-philosophie",
    date: "2026-06-08",
    title: "Qu'est-ce que le bonheur ? Les grandes réponses philosophiques",
    category: "Philosophie",
    level: "Érudit",
    readTime: "4 min de lecture",
    paragraphs: [
      "Aucune question n'a mobilisé autant de penseurs au fil des siècles que celle du bonheur. Et pourtant, deux millénaires et demi après les premières grandes réflexions grecques, les philosophes continuent de s'affronter sur sa nature même.",
      "Aristote distinguait deux formes de bien-être : l'hédoné, le plaisir immédiat, et l'eudaimonia, terme souvent traduit par 'bonheur' mais qui désigne plutôt une forme d'épanouissement ou de vie accomplie. Pour lui, le bonheur n'est pas un état mais une activité — celle de vivre en accord avec l'excellence dont on est capable.",
      "Les utilitaristes comme Jeremy Bentham et John Stuart Mill proposèrent au XIXe siècle une approche radicalement différente : le bonheur se réduit au plaisir et à l'absence de souffrance, et la morale consiste à maximiser la somme totale de bonheur dans le monde, quelle que soit la manière d'y parvenir.",
      "La psychologie positive contemporaine, incarnée par Martin Seligman, a tenté de donner une base empirique à ces débats millénaires. Ses travaux suggèrent que le bonheur durable repose moins sur le plaisir immédiat que sur l'engagement, les relations significatives, le sens donné à l'existence et l'accomplissement personnel — rejoignant ainsi, par des voies détournées, les intuitions d'Aristote.",
    ],
  },

  // JOUR 9 — 9 juin
  {
    slug: "pourquoi-ocean-sale",
    date: "2026-06-09",
    title: "Pourquoi la mer est-elle salée ?",
    category: "Nature · Science",
    level: "Curieux",
    readTime: "2 min de lecture",
    paragraphs: [
      "Tu as sûrement avalé de l'eau de mer par accident et tu sais que c'est vraiment très salé ! Mais d'où vient tout ce sel ?",
      "Depuis des millions d'années, les pluies tombent sur les rochers et les montagnes. L'eau de pluie est légèrement acide et dissout petit à petit les minéraux et le sel des roches. Ces substances sont emportées par les rivières jusqu'à la mer.",
      "Dans la mer, l'eau s'évapore sous l'effet du soleil et remonte dans l'atmosphère pour former des nuages. Mais le sel, lui, reste dans la mer ! Après des millions d'années, tout ce sel accumulé rend la mer de plus en plus salée.",
      "Les lacs d'eau douce ont eux aussi des rivières qui y apportent du sel, mais ils ont aussi une rivière qui repart et qui emporte le sel avec elle. La mer, elle, n'a pas de sortie : le sel reste bloqué à l'intérieur.",
    ],
  },
  {
    slug: "intelligence-artificielle-histoire",
    date: "2026-06-09",
    title: "L'intelligence artificielle, de la fiction à la réalité",
    category: "Technologie · Histoire",
    level: "Lecteur",
    readTime: "3 min de lecture",
    paragraphs: [
      "L'intelligence artificielle n'est pas une invention du XXIe siècle. Dès 1950, le mathématicien Alan Turing posait la question fondatrice : 'Les machines peuvent-elles penser ?' Il proposa même un test — le test de Turing — pour évaluer si une machine peut exhiber une intelligence indiscernable de celle d'un humain.",
      "Les premières décennies furent marquées par un optimisme excessif, suivi de périodes de désillusion appelées 'hivers de l'IA', lorsque les chercheurs réalisèrent que leurs ambitions dépassaient largement leurs capacités techniques. Résoudre un problème de logique formelle était à la portée des machines, mais comprendre le langage naturel ou reconnaître un visage s'avérait infiniment plus complexe.",
      "Le tournant décisif vint dans les années 2010 avec l'émergence du 'deep learning', des réseaux de neurones artificiels capables d'apprendre à partir de quantités massives de données. En quelques années, ces systèmes surpassèrent les humains dans des domaines aussi variés que la reconnaissance d'images, la traduction et les jeux de stratégie.",
      "Aujourd'hui, des systèmes comme les grands modèles de langage sont capables de tenir des conversations complexes, d'écrire du code ou de composer de la musique. Le rêve de Turing s'est partiellement réalisé, ouvrant des questions éthiques inédites sur la place de l'humain dans un monde où les machines apprennent à penser.",
    ],
  },
  {
    slug: "langage-pensee",
    date: "2026-06-09",
    title: "Le langage façonne-t-il notre façon de penser ?",
    category: "Linguistique · Philosophie",
    level: "Érudit",
    readTime: "4 min de lecture",
    paragraphs: [
      "L'hypothèse de Sapir-Whorf, formulée dans les années 1930, postule que la langue que nous parlons influence fondamentalement notre façon de percevoir et de conceptualiser le monde. Cette idée, longtemps marginalisée dans les milieux académiques, connaît aujourd'hui un regain d'intérêt grâce à des recherches empiriques solides.",
      "Les travaux de Lera Boroditsky, psychologue à l'Université de Californie, ont montré que les locuteurs de langues différentes conceptualisent le temps, l'espace et la couleur de manières distinctes. Les Guugu Yimithirr d'Australie, qui utilisent exclusivement des directions cardinales plutôt que des références relatives comme 'gauche' ou 'droite', développent un sens de l'orientation remarquable. Les Piraha d'Amazonie, dont la langue ne possède pas de termes pour les nombres au-delà de 'peu' et 'beaucoup', ont des difficultés caractéristiques avec les tâches de comptage précis.",
      "Ces observations ne signifient pas que nous sommes prisonniers de notre langue — la version forte de l'hypothèse Sapir-Whorf a été réfutée. Mais elles suggèrent que la langue influence nos habitudes de pensée, nos automatismes perceptuels et la facilité avec laquelle nous traitons certains types d'informations.",
      "Cette conclusion a des implications pratiques considérables : apprendre une nouvelle langue ne consiste pas seulement à acquérir un nouveau code de communication, mais à développer une nouvelle façon d'habiter le monde, d'autres façons de découper la réalité, d'autres catégories pour penser le temps, les relations et la causalité.",
    ],
  },

  // JOUR 10 — 10 juin
  {
    slug: "pourquoi-miroir-inverse",
    date: "2026-06-10",
    title: "Pourquoi le miroir inverse gauche et droite, mais pas haut et bas ?",
    category: "Science",
    level: "Curieux",
    readTime: "2 min de lecture",
    paragraphs: [
      "Regarde-toi dans un miroir et lève ta main droite. Dans le miroir, la personne en face lève sa main... gauche ! Le miroir inverse gauche et droite. Mais quand tu sautes, ton reflet saute aussi vers le haut, pas vers le bas. Bizarre, non ?",
      "En réalité, le miroir n'inverse pas gauche et droite ! Il inverse avant et arrière. Si tu fais face à un miroir, ta tête reste en haut dans le reflet et tes pieds en bas. Mais ton côté avant devient le côté arrière du reflet.",
      "L'illusion vient de toi ! Ton cerveau imagine que le reflet est une autre personne qui te fait face. Et si une vraie personne te faisait face et levait sa main droite, tu verrais ta gauche. Alors ton cerveau interprète le reflet de la même façon.",
      "Si tu posais cette question à un dauphin ou à un chimpanzé, ils auraient probablement du mal à comprendre le problème. Cette confusion est uniquement humaine, car nous sommes obsédés par la différence gauche-droite dans notre façon de comprendre le monde !",
    ],
  },
  {
    slug: "microbes-amis",
    date: "2026-06-10",
    title: "Les microbes, nos meilleurs ennemis",
    category: "Science · Santé",
    level: "Lecteur",
    readTime: "3 min de lecture",
    paragraphs: [
      "Nous transportons sur et dans notre corps environ 38 000 milliards de bactéries — soit autant, voire plus, que le nombre de cellules humaines qui nous constituent. Cette réalité, découverte relativement récemment, a transformé notre compréhension de la santé et de la maladie.",
      "Le microbiome intestinal, cette communauté de micro-organismes qui peuple notre tube digestif, est impliqué dans des fonctions bien au-delà de la simple digestion. Il influence notre système immunitaire, produit des vitamines essentielles, et communique avec notre cerveau via ce qu'on appelle l'axe intestin-cerveau. Des perturbations du microbiome ont été associées à des maladies aussi variées que l'obésité, les allergies, la dépression et l'autisme.",
      "Pendant des décennies, l'hygiène a été synonyme d'élimination de tous les germes. Nous commençons à comprendre que cette guerre totale contre les microbes a des effets secondaires indésirables. L'hypothèse hygiéniste suggère que le manque d'exposition aux microbes dans l'enfance, lié à nos environnements de plus en plus stérilisés, contribue à l'explosion des maladies auto-immunes dans les pays développés.",
      "La médecine du futur exploitera probablement ces découvertes : des thérapies par transplantation du microbiome sont déjà utilisées pour traiter certaines infections intestinales sévères, et des recherches prometteuses explorent leur potentiel contre des maladies neuropsychiatriques.",
    ],
  },
  {
    slug: "art-definition",
    date: "2026-06-10",
    title: "Qu'est-ce que l'art ? Une question sans réponse définitive",
    category: "Philosophie · Art",
    level: "Érudit",
    readTime: "4 min de lecture",
    paragraphs: [
      "En 1917, Marcel Duchamp déposa un urinoir retourné, signé 'R. Mutt', comme oeuvre d'art à une exposition new-yorkaise. Ce geste, connu sous le nom de 'Fontaine', inaugura un siècle de remises en question radicales : si n'importe quel objet du quotidien peut être de l'art, qu'est-ce qui définit l'art ?",
      "Les théoriciens ont proposé de nombreuses réponses. La théorie institutionnelle, défendue par George Dickie, soutient que l'art est ce que le 'monde de l'art' — les musées, les galeries, les critiques, les collectionneurs — décide de reconnaître comme tel. Cette définition a le mérite de rendre compte de la pratique réelle, mais elle semble circulaire et dépendante du pouvoir culturel.",
      "D'autres approches privilégient l'intention de l'artiste, la capacité de l'oeuvre à susciter une expérience esthétique particulière, ou son aptitude à exprimer et communiquer des états émotionnels complexes. Chacune de ces théories rend compte d'une dimension réelle de l'art tout en achopp sur des contre-exemples embarrassants.",
      "Peut-être la question 'Qu'est-ce que l'art ?' est-elle mal posée. Le philosophe Ludwig Wittgenstein suggérait que certains concepts fonctionnent non par une propriété commune à toutes leurs instances, mais par des 'ressemblances de famille' — un réseau de similarités partielles et entrecroisées. L'art serait peut-être l'un de ces concepts essentiellement ouverts, dont la richesse tient précisément à son irréductibilité à une définition fermée.",
    ],
  },
];

export function getTodayStory(level: Story["level"] = "Lecteur"): Story {
  const today = new Date().toISOString().split("T")[0];
  const story = STORIES.find((s) => s.date === today && s.level === level);
  const fallback = [...STORIES].reverse().find((s) => s.level === level);
  return story ?? fallback ?? STORIES[STORIES.length - 1];
}

export function getStoryBySlug(slug: string): Story | undefined {
  return STORIES.find((s) => s.slug === slug);
}