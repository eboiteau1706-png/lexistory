import styles from "./apropos.module.css";

export const metadata = {
  title: "À propos — LexiStory",
  description: "L'histoire de LexiStory, le site qui t'aide à apprendre le vocabulaire français en lisant.",
};

export default function APropos() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>

        <div className={styles.logo}>Lexi<span>Story</span></div>

        <h1 className={styles.title}>L&apos;histoire de LexiStory</h1>

        <div className={styles.story}>
          <p>
            LexiStory est né d&apos;une idée simple : apprendre de nouveaux mots ne devrait pas ressembler à une corvée scolaire. Une histoire courte, quelques minutes par jour, et la curiosité fait le reste.
          </p>
          <p>
            Le site a été créé par <strong>Enzo Boiteau</strong>, depuis Osny, en France. L&apos;objectif était de créer un outil que même quelqu&apos;un qui n&apos;aime pas lire aurait envie d&apos;utiliser chaque matin.
          </p>
          <p>
            Chaque jour, trois nouvelles histoires sont disponibles — une pour chaque niveau. On clique sur un mot qu&apos;on ne connaît pas, et on obtient sa définition officielle, une explication simple, et même son étymologie. Pas de mémorisation forcée, juste de la lecture.
          </p>
        </div>

        <div className={styles.values}>
          <div className={styles.value}>
            <div className={styles.valueIcon}>🌱</div>
            <div className={styles.valueName}>Simple</div>
            <div className={styles.valueDesc}>3 minutes par jour, pas plus. L&apos;apprentissage qui s&apos;intègre dans ta vie.</div>
          </div>
          <div className={styles.value}>
            <div className={styles.valueIcon}>📖</div>
            <div className={styles.valueName}>Curieux</div>
            <div className={styles.valueDesc}>Des histoires vraies sur la science, l&apos;histoire, la nature et la philosophie.</div>
          </div>
          <div className={styles.value}>
            <div className={styles.valueIcon}>🎯</div>
            <div className={styles.valueName}>Adapté</div>
            <div className={styles.valueDesc}>Trois niveaux : Curieux, Lecteur, Érudit. Pour chaque âge et chaque niveau.</div>
          </div>
        </div>

        <div className={styles.contact}>
          <p>Une question, une suggestion ?</p>
          <a href="/support" className={styles.contactBtn}>Contacte-nous →</a>
        </div>

        <a href="/" className={styles.back}>← Retour à l&apos;accueil</a>
      </div>
    </div>
  );
}
