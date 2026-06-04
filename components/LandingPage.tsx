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
          Une histoire courte par jour, des jeux de mots, un classement et des définitions
          pour enrichir ton vocabulaire. Gratuit, sans publicité.
        </p>
        <div className={styles.heroCtas}>
          <a href="/login" className={styles.btnPrimary}>Commencer gratuitement →</a>
          <a href="#comment-ca-marche" className={styles.btnSecondary}>En savoir plus ↓</a>
        </div>
      </section>

      {/* ── Comment ça marche ── */}
      <section id="comment-ca-marche" className={styles.section}>
        <p className={styles.sectionLabel}>Comment ça marche</p>
        <h2 className={styles.sectionTitle}>Tout ce qu&apos;il faut pour progresser</h2>
        <div className={styles.howGrid}>
          <div className={styles.howCard}>
            <div className={styles.howIcon}>📖</div>
            <div className={styles.howTitle}>Lis une histoire par jour</div>
            <p className={styles.howDesc}>
              Une nouvelle histoire renouvelée à minuit, en trois niveaux : Curieux, Lecteur et Érudit.
              Chaque histoire lue rapporte <strong>+3 XP</strong>.
            </p>
          </div>
          <div className={styles.howCard}>
            <div className={styles.howIcon}>💡</div>
            <div className={styles.howTitle}>Clique sur les mots</div>
            <p className={styles.howDesc}>
              Clique sur n&apos;importe quel mot pour obtenir sa définition complète : étymologie,
              définition officielle et explication simple.
              <span className={styles.limit}> 3 définitions / histoire / jour en gratuit — illimité en Premium.</span>
            </p>
          </div>
          <div className={styles.howCard}>
            <div className={styles.howIcon}>🎮</div>
            <div className={styles.howTitle}>4 jeux quotidiens</div>
            <p className={styles.howDesc}>
              Mot du jour, Anagramme, Définition mystère et Citation à compléter.
              Jusqu&apos;à <strong>+9 XP / jour</strong>. Les abonnés Premium débloquent 4 jeux exclusifs supplémentaires.
            </p>
          </div>
          <div className={styles.howCard}>
            <div className={styles.howIcon}>⭐</div>
            <div className={styles.howTitle}>Note les histoires</div>
            <p className={styles.howDesc}>
              Donne une note de 1 à 5 étoiles à chaque histoire. Les meilleures remontent dans
              la section &quot;Explorer par catégorie&quot;.
            </p>
          </div>
          <div className={styles.howCard}>
            <div className={styles.howIcon}>🏆</div>
            <div className={styles.howTitle}>Gagne des XP &amp; monte en rang</div>
            <p className={styles.howDesc}>
              Accumule des XP pour progresser dans les 21 rangs, de Novice à Légende.
              Maintiens ta série quotidienne pour des bonus XP supplémentaires.
            </p>
          </div>
          <div className={styles.howCard}>
            <div className={styles.howIcon}>🎭</div>
            <div className={styles.howTitle}>Profil &amp; classement</div>
            <p className={styles.howDesc}>
              Personnalise ton avatar parmi 40 designs, suis ta progression et compare-toi
              aux autres joueurs dans le classement général.
            </p>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      {/* ── Niveaux de lecture ── */}
      <section className={styles.section}>
        <p className={styles.sectionLabel}>Niveaux de lecture</p>
        <h2 className={styles.sectionTitle}>Choisis ton niveau</h2>
        <div className={styles.levelsGrid}>
          <div className={styles.levelCard}>
            <div className={styles.levelEmoji}>🌱</div>
            <div className={styles.levelName}>Curieux</div>
            <p className={styles.levelDesc}>
              Vocabulaire accessible, histoires courtes et claires.
              Idéal pour commencer ou lire rapidement.
            </p>
          </div>
          <div className={styles.levelCard}>
            <div className={styles.levelEmoji}>📖</div>
            <div className={styles.levelName}>Lecteur</div>
            <p className={styles.levelDesc}>
              Vocabulaire intermédiaire, histoires plus riches.
              Pour progresser régulièrement au quotidien.
            </p>
          </div>
          <div className={styles.levelCard}>
            <div className={styles.levelEmoji}>🎓</div>
            <div className={styles.levelName}>Érudit</div>
            <p className={styles.levelDesc}>
              Vocabulaire avancé, histoires approfondies.
              Pour les passionnés de la langue française.
            </p>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      {/* ── Les rangs ── */}
      <section className={styles.section}>
        <p className={styles.sectionLabel}>Progression</p>
        <h2 className={styles.sectionTitle}>21 rangs à débloquer</h2>
        <div className={styles.ranksRow}>
          {[
            { emoji: "📝", name: "Novice",   color: "#9ca3af" },
            { emoji: "🌱", name: "Apprenti", color: "#22c55e" },
            { emoji: "📖", name: "Lecteur",  color: "#3b82f6" },
            { emoji: "🎓", name: "Érudit",   color: "#8b5cf6" },
            { emoji: "🦉", name: "Sage",     color: "#14b8a6" },
            { emoji: "⚜️", name: "Maître",   color: "#f59e0b" },
            { emoji: "👑", name: "Légende",  color: "#ef4444" },
          ].map((rank, i, arr) => (
            <div key={rank.name} className={styles.rankItem}>
              <div className={styles.rankEmoji}>{rank.emoji}</div>
              <div className={styles.rankName} style={{ color: rank.color }}>{rank.name}</div>
              {i < arr.length - 1 && <div className={styles.rankArrow}>→</div>}
            </div>
          ))}
        </div>
        <p className={styles.rankSub}>Chaque groupe compte 3 sous-rangs (I, II, III) — soit 21 niveaux au total.</p>
      </section>

      <div className={styles.divider} />

      {/* ── Gratuit vs Premium ── */}
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
              <li>3 définitions / histoire / jour</li>
              <li>Classement et 21 rangs XP</li>
              <li>Profil avec 40 avatars</li>
              <li>Système d&apos;amis</li>
            </ul>
          </div>
          <div className={`${styles.premiumCol} ${styles.featured}`}>
            <div className={`${styles.premiumColTitle} ${styles.gold}`}>✨ Premium</div>
            <div className={styles.premiumPrice}>1,99€ <span>/ mois — sans engagement</span></div>
            <ul className={styles.premiumList}>
              <li>Tout le gratuit, plus…</li>
              <li>Définitions illimitées</li>
              <li>Accès à toutes les histoires passées</li>
              <li>4 mini-jeux exclusifs supplémentaires</li>
              <li>Stats avancées dans le profil</li>
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

    </div>
  );
}
