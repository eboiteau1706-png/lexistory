import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroLogo}>
          <img src="/favicon.png" alt="LexiStory" className={styles.heroLogoImg} />
          <span className={styles.heroLogoText}>Lexi<span>Story</span></span>
        </div>
        <h1 className={styles.heroTitle}>
          Apprends le français en lisant des{" "}
          <em>histoires fascinantes</em>
        </h1>
        <p className={styles.heroSub}>
          Quiz, jeux de mots, classement et définitions pour enrichir ton vocabulaire chaque jour.
          Une histoire courte par jour, gratuite, sans publicité.
        </p>
        <div className={styles.heroCtas}>
          <a href="/login" className={styles.btnPrimary}>Commencer gratuitement →</a>
          <a href="#fonctionnalites" className={styles.btnSecondary}>En savoir plus ↓</a>
        </div>
      </section>

      {/* ── Fonctionnalités ── */}
      <section id="fonctionnalites" className={styles.section}>
        <p className={styles.sectionLabel}>Fonctionnalités</p>
        <h2 className={styles.sectionTitle}>Tout ce qu&apos;il faut pour progresser</h2>
        <div className={styles.grid3}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>📖</div>
            <div className={styles.cardTitle}>Histoires culturelles</div>
            <p className={styles.cardDesc}>
              Une nouvelle histoire chaque jour renouvelée à minuit. Trois niveaux disponibles :
              Curieux, Lecteur et Érudit. Clique sur n&apos;importe quel mot pour obtenir sa définition.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🎮</div>
            <div className={styles.cardTitle}>Jeux du jour</div>
            <p className={styles.cardDesc}>
              Quatre mini-jeux quotidiens pour ancrer le vocabulaire : Mot du jour, Anagramme,
              Définition mystère et Citation à compléter. Gagne jusqu&apos;à +9 XP par jour !
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🏆</div>
            <div className={styles.cardTitle}>Classement & XP</div>
            <p className={styles.cardDesc}>
              Gagne des XP en lisant et en jouant. Monte dans les 21 rangs, de Novice à Légende.
              Maintiens ta série quotidienne pour des bonus XP supplémentaires.
            </p>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      {/* ── Niveaux ── */}
      <section className={styles.section}>
        <p className={styles.sectionLabel}>Niveaux de lecture</p>
        <h2 className={styles.sectionTitle}>Choisis ton niveau</h2>
        <div className={styles.levelsGrid}>
          <div className={styles.levelCard}>
            <div className={styles.levelEmoji}>🌱</div>
            <div className={styles.levelName}>Curieux</div>
            <p className={styles.levelDesc}>
              Histoires courtes avec un vocabulaire accessible. Idéal pour commencer ou pour
              une lecture rapide et agréable.
            </p>
          </div>
          <div className={styles.levelCard}>
            <div className={styles.levelEmoji}>📖</div>
            <div className={styles.levelName}>Lecteur</div>
            <p className={styles.levelDesc}>
              Histoires de niveau intermédiaire avec un vocabulaire plus riche. Pour ceux qui
              veulent progresser régulièrement.
            </p>
          </div>
          <div className={styles.levelCard}>
            <div className={styles.levelEmoji}>🎓</div>
            <div className={styles.levelName}>Érudit</div>
            <p className={styles.levelDesc}>
              Histoires avancées avec un vocabulaire élaboré. Pour les passionnés de langue
              française qui visent l&apos;excellence.
            </p>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      {/* ── Premium ── */}
      <section className={`${styles.section} ${styles.premiumSection}`}>
        <p className={styles.sectionLabel}>Tarifs</p>
        <h2 className={styles.sectionTitle}>Gratuit ou Premium ?</h2>
        <div className={styles.premiumGrid}>
          <div className={styles.premiumCol}>
            <div className={styles.premiumColTitle}>Gratuit</div>
            <div className={styles.premiumPrice}>0€ <span>/ pour toujours</span></div>
            <ul className={styles.premiumList}>
              <li>1 histoire par jour par niveau</li>
              <li>4 mini-jeux quotidiens</li>
              <li>3 définitions par histoire</li>
              <li>Classement et rangs XP</li>
              <li>Profil et avatar personnalisé</li>
            </ul>
          </div>
          <div className={`${styles.premiumCol} ${styles.featured}`}>
            <div className={`${styles.premiumColTitle} ${styles.gold}`}>✨ Premium</div>
            <div className={styles.premiumPrice}>1,99€ <span>/ mois — sans engagement</span></div>
            <ul className={styles.premiumList}>
              <li>Tout le gratuit, plus…</li>
              <li>Définitions illimitées</li>
              <li>Accès à toutes les histoires passées</li>
              <li>Boost XP ×1,5 sur toutes les activités</li>
              <li>4 mini-jeux exclusifs supplémentaires</li>
            </ul>
          </div>
        </div>
        <div className={styles.premiumCta}>
          <a href="/login" className={styles.btnPrimary}>Commencer gratuitement →</a>
        </div>
      </section>

      <div className={styles.divider} />

      {/* ── CTA final ── */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Prêt à enrichir ton français ?</h2>
        <p className={styles.ctaSub}>
          Rejoins des milliers de lecteurs qui progressent chaque jour avec LexiStory.
        </p>
        <a href="/login" className={styles.btnPrimary}>Rejoindre Lexi Story →</a>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <a href="/cgu" className={styles.footerLink}>CGU</a>
        <a href="/confidentialite" className={styles.footerLink}>Confidentialité</a>
        <a href="/mentions-legales" className={styles.footerLink}>Mentions légales</a>
        <a href="mailto:contact@lexistory.fr" className={styles.footerLink}>Contact</a>
      </footer>

    </div>
  );
}
