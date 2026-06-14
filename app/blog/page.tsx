import styles from "./blog.module.css";

export const metadata = {
  title: "Blog — LexiStory",
  description: "Conseils et idées pour enrichir ton vocabulaire français : astuces de mémorisation, et pourquoi apprendre avec des histoires vraies fonctionne mieux.",
};

export default function Blog() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.logo}>Lexi<span>Story</span></div>
        <h1 className={styles.title}>Le blog LexiStory</h1>
        <p className={styles.subtitle}>
          Des conseils simples pour progresser en français, et les idées qui guident
          la façon dont LexiStory est construit.
        </p>
      </div>

      <div className={styles.articles}>

        <article className={styles.article}>
          <p className={styles.articleLabel}>Méthode</p>
          <h2 className={styles.articleTitle}>5 astuces pour enrichir son vocabulaire français</h2>
          <div className={styles.articleBody}>
            <p>
              Apprendre du vocabulaire ne se résume pas à mémoriser des listes de mots.
              Voici cinq habitudes simples, validées par la recherche en acquisition du
              langage, pour enrichir durablement ton vocabulaire français.
            </p>
            <h3>1. Lis un peu chaque jour</h3>
            <p>
              La régularité bat l&apos;intensité. Lire dix minutes par jour expose ton cerveau
              à des centaines de mots en contexte chaque semaine, bien plus efficacement
              qu&apos;une session de révision de deux heures le dimanche. Choisis des textes
              courts et variés — articles, histoires, actualités — adaptés à ton niveau,
              pour rester dans une zone stimulante : ni trop facile, ni trop difficile.
            </p>
            <h3>2. Apprends les mots dans leur contexte</h3>
            <p>
              Un mot isolé est vite oublié ; un mot rencontré dans une phrase, avec un sens
              et une émotion, laisse une trace bien plus durable. Quand tu croises un mot
              inconnu, résiste à l&apos;envie de sauter directement au dictionnaire : essaie
              d&apos;abord de deviner son sens grâce au contexte, puis vérifie. Cette démarche
              active renforce la mémorisation.
            </p>
            <h3>3. Réutilise activement les nouveaux mots</h3>
            <p>
              La lecture seule ne suffit pas : il faut aussi produire. Essaie de réemployer
              un mot appris la veille dans une phrase, à l&apos;écrit ou à l&apos;oral, dans les
              jours qui suivent. Plus tu manipules un mot, plus son réseau de connexions
              mentales s&apos;enrichit, et plus il devient facile à retrouver au bon moment.
            </p>
            <h3>4. Varie les sujets et les styles</h3>
            <p>
              Le vocabulaire change énormément selon les domaines : la science, l&apos;histoire,
              la cuisine ou la psychologie n&apos;utilisent pas les mêmes mots. En variant les
              thèmes de lecture, tu couvres un spectre beaucoup plus large du français et tu
              évites de te limiter à un vocabulaire de niche.
            </p>
            <h3>5. Révise à intervalles espacés</h3>
            <p>
              Revoir un mot juste après l&apos;avoir appris, puis le lendemain, puis une semaine
              plus tard, multiplie les chances qu&apos;il reste en mémoire à long terme. C&apos;est
              le principe de la répétition espacée : quelques secondes de révision régulière
              valent mieux qu&apos;une longue session ponctuelle vite oubliée.
            </p>
            <p>
              <strong>C&apos;est exactement le principe sur lequel repose LexiStory</strong> :
              une histoire courte chaque jour, des mots cliquables expliqués en contexte, et
              des jeux quotidiens pour réviser sans effort. Idéal pour intégrer ces cinq
              astuces sans même y penser.
            </p>
          </div>
        </article>

        <article className={styles.article}>
          <p className={styles.articleLabel}>Pédagogie</p>
          <h2 className={styles.articleTitle}>Pourquoi apprendre avec des histoires vraies est plus efficace</h2>
          <div className={styles.articleBody}>
            <p>
              Pourquoi certains mots restent gravés dans la mémoire après une seule lecture,
              alors que d&apos;autres s&apos;effacent malgré des heures de révision ? La réponse
              tient en grande partie à la façon dont l&apos;information est présentée : sous
              forme d&apos;histoire, et si possible, vraie.
            </p>
            <h3>Le contexte donne du sens</h3>
            <p>
              Notre cerveau retient mieux l&apos;information lorsqu&apos;elle est reliée à d&apos;autres
              informations. Un mot de vocabulaire rencontré dans le récit d&apos;une découverte
              scientifique ou d&apos;un événement historique s&apos;attache immédiatement à une
              scène, une cause et une conséquence. Cette toile de relations sert d&apos;ancrage :
              pour retrouver le mot, il suffit de se souvenir de l&apos;histoire.
            </p>
            <h3>La curiosité stimule la mémoire</h3>
            <p>
              Les faits vrais surprenants — pourquoi le ciel est bleu, comment un biais
              cognitif nous trompe — déclenchent une forme de curiosité qui active les
              circuits de récompense du cerveau. Des études en neurosciences montrent que
              cet état de curiosité améliore l&apos;encodage et la rétention des informations
              associées, y compris le vocabulaire qui les accompagne.
            </p>
            <h3>Les émotions ancrent les souvenirs</h3>
            <p>
              Une histoire, même courte, suscite une réaction émotionnelle : étonnement,
              indignation, admiration. Cette charge émotionnelle agit comme un signal
              d&apos;importance pour le cerveau, qui priorise la consolidation du souvenir
              associé. Un mot appris pendant un moment d&apos;émotion, même légère, a
              statistiquement plus de chances d&apos;être retenu.
            </p>
            <h3>Un vocabulaire vivant et réutilisable</h3>
            <p>
              Les listes de mots hors contexte enseignent souvent un usage artificiel. Dans
              une histoire, un mot apparaît dans son emploi naturel : la bonne préposition,
              le bon registre, la bonne nuance. Tu apprends donc directement à utiliser le
              mot, pas seulement à le reconnaître.
            </p>
            <p>
              C&apos;est cette logique qui guide chaque histoire publiée sur LexiStory : des
              faits réels, racontés simplement, avec des mots cliquables expliqués en
              contexte. Une manière naturelle d&apos;apprendre, qui transforme chaque lecture
              en petite découverte — et chaque mot nouveau en souvenir durable.
            </p>
          </div>
          <div className={styles.cta}>
            <a href="/login" className={styles.ctaBtn}>Découvrir l&apos;histoire du jour →</a>
          </div>
        </article>

      </div>

      <a href="/" className={styles.back}>← Retour à l&apos;accueil</a>
    </div>
  );
}
