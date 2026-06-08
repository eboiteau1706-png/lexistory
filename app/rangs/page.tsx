import styles from "./rangs.module.css";
import { LEVELS } from "@/lib/xp";

export const metadata = {
  title: "Rangs & XP — LexiStory",
  description: "Découvre le système de rangs et d'XP de LexiStory.",
};

export default function Rangs() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>🏆 Rangs & Progression</h1>
        <p className={styles.subtitle}>
          Lis des histoires chaque jour pour gagner de l&apos;XP et monter en rang !
        </p>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Comment gagner de l&apos;XP ?</h2>
          <div className={styles.xpRules}>
            <div className={styles.xpRule}>
              <span className={styles.xpIcon}>📖</span>
              <div>
                <div className={styles.xpRuleName}>Lire une histoire</div>
                <div className={styles.xpRuleVal}>+5 XP (gratuit et Premium)</div>
                <div className={styles.xpRuleNote}>3 histoires disponibles par jour — jusqu&apos;à +15 XP/jour</div>
              </div>
            </div>
            <div className={styles.xpRule}>
              <span className={styles.xpIcon}>🎮</span>
              <div>
                <div className={styles.xpRuleName}>Mini-jeux du jour</div>
                <div className={styles.xpRuleVal}>+4 XP si réussi · +2 XP si raté</div>
                <div className={styles.xpRuleNote}>Définition mystère, anagramme, citation — entre +6 et +12 XP/jour</div>
              </div>
            </div>
            <div className={styles.xpRule}>
              <span className={styles.xpIcon}>🧠</span>
              <div>
                <div className={styles.xpRuleName}>Quiz du jour</div>
                <div className={styles.xpRuleVal}>+2 XP si réussi · +1 XP si raté</div>
                <div className={styles.xpRuleNote}>6 questions par niveau (histoire + vocabulaire) — jusqu&apos;à +12 XP/niveau</div>
              </div>
            </div>
            <div className={styles.xpRule}>
              <span className={styles.xpIcon}>🔥</span>
              <div>
                <div className={styles.xpRuleName}>Streak 3 jours</div>
                <div className={styles.xpRuleVal}>+10 XP</div>
              </div>
            </div>
            <div className={styles.xpRule}>
              <span className={styles.xpIcon}>🔥</span>
              <div>
                <div className={styles.xpRuleName}>Streak 5 jours</div>
                <div className={styles.xpRuleVal}>+15 XP</div>
              </div>
            </div>
            <div className={styles.xpRule}>
              <span className={styles.xpIcon}>🔥</span>
              <div>
                <div className={styles.xpRuleName}>Streak 10 jours</div>
                <div className={styles.xpRuleVal}>+25 XP</div>
              </div>
            </div>
            <div className={styles.xpRule}>
              <span className={styles.xpIcon}>🔥</span>
              <div>
                <div className={styles.xpRuleName}>Streak 30 jours</div>
                <div className={styles.xpRuleVal}>+50 XP</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>XP gagnable par jour</h2>
          <div className={styles.xpRules}>
            <div className={styles.xpRule}>
              <span className={styles.xpIcon}>📅</span>
              <div>
                <div className={styles.xpRuleName}>Sans streak</div>
                <div className={styles.xpRuleVal}>~39 XP/jour max</div>
                <div className={styles.xpRuleNote}>15 XP histoires + 6–12 XP jeux + 12 XP quiz (1 niveau, tout réussi)</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Les 21 rangs</h2>
          <div className={styles.levels}>
            {LEVELS.map((lvl, i) => (
              <div key={lvl.level} className={styles.levelRow}
                style={{ borderColor: lvl.tier === "I" ? lvl.color + "44" : "var(--border)", background: lvl.tier === "I" ? lvl.color + "0d" : "var(--surface2)" }}>
                <div className={styles.levelNum} style={{ color: lvl.color, fontWeight: lvl.tier === "I" ? 700 : 500 }}>
                  {lvl.tier === "I" ? (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontSize: "1.1rem" }}>{lvl.emoji}</span>
                      <span>{lvl.name}</span>
                    </span>
                  ) : (
                    <span style={{ paddingLeft: "28px" }}>{lvl.name}</span>
                  )}
                </div>
                <div className={styles.levelXp} style={{ color: lvl.color + "cc" }}>
                  {lvl.minXp} – {i < LEVELS.length - 1 ? lvl.maxXp - 1 : "∞"} XP
                </div>
              </div>
            ))}
          </div>
        </div>

        <a href="/profile" className={styles.back}>← Voir mon profil</a>
      </div>
    </div>
  );
}
