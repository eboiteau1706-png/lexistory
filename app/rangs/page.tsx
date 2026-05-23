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
                <div className={styles.xpRuleVal}>+3 XP <span className={styles.premium}>(+4 XP Premium)</span></div>
                <div className={styles.xpRuleNote}>3 histoires disponibles par jour — jusqu&apos;à +9 XP/jour</div>
              </div>
            </div>
            <div className={styles.xpRule}>
              <span className={styles.xpIcon}>🎮</span>
              <div>
                <div className={styles.xpRuleName}>Mini-jeux du jour</div>
                <div className={styles.xpRuleVal}>+3 XP par jeu réussi <span className={styles.premium}>(+4 XP Premium)</span></div>
                <div className={styles.xpRuleNote}>Définition mystère, anagramme, citation — jusqu&apos;à +9 XP/jour</div>
              </div>
            </div>
            <div className={styles.xpRule}>
              <span className={styles.xpIcon}>🎮✨</span>
              <div>
                <div className={styles.xpRuleName}>Mini-jeux Premium exclusifs</div>
                <div className={styles.xpRuleVal}><span className={styles.premium}>+3 XP par jeu réussi (Premium)</span></div>
                <div className={styles.xpRuleNote}>4 jeux exclusifs supplémentaires — jusqu&apos;à +9 XP/jour</div>
              </div>
            </div>
            <div className={styles.xpRule}>
              <span className={styles.xpIcon}>🔥</span>
              <div>
                <div className={styles.xpRuleName}>Streak 3 jours</div>
                <div className={styles.xpRuleVal}>+10 XP <span className={styles.premium}>(+15 XP Premium)</span></div>
              </div>
            </div>
            <div className={styles.xpRule}>
              <span className={styles.xpIcon}>🔥</span>
              <div>
                <div className={styles.xpRuleName}>Streak 5 jours</div>
                <div className={styles.xpRuleVal}>+15 XP <span className={styles.premium}>(+22 XP Premium)</span></div>
              </div>
            </div>
            <div className={styles.xpRule}>
              <span className={styles.xpIcon}>🔥</span>
              <div>
                <div className={styles.xpRuleName}>Streak 10 jours</div>
                <div className={styles.xpRuleVal}>+25 XP <span className={styles.premium}>(+37 XP Premium)</span></div>
              </div>
            </div>
            <div className={styles.xpRule}>
              <span className={styles.xpIcon}>🔥</span>
              <div>
                <div className={styles.xpRuleName}>Streak 30 jours</div>
                <div className={styles.xpRuleVal}>+50 XP <span className={styles.premium}>(+75 XP Premium)</span></div>
              </div>
            </div>
            <div className={`${styles.xpRule} ${styles.xpRulePremium}`}>
              <span className={styles.xpIcon}>✨</span>
              <div>
                <div className={styles.xpRuleName}>Boost Premium</div>
                <div className={styles.xpRuleVal}>x1,5 sur histoires, jeux gratuits et streak</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>XP gagnable par jour</h2>
          <div className={styles.xpRules}>
            <div className={styles.xpRule}>
              <span className={styles.xpIcon}>🆓</span>
              <div>
                <div className={styles.xpRuleName}>Gratuit (sans streak)</div>
                <div className={styles.xpRuleVal}>~18 XP/jour max</div>
                <div className={styles.xpRuleNote}>9 XP histoires + 9 XP jeux</div>
              </div>
            </div>
            <div className={`${styles.xpRule} ${styles.xpRulePremium}`}>
              <span className={styles.xpIcon}>✨</span>
              <div>
                <div className={styles.xpRuleName}>Premium (sans streak)</div>
                <div className={styles.xpRuleVal}>~36 XP/jour max</div>
                <div className={styles.xpRuleNote}>12 XP histoires + 15 XP jeux + 9 XP jeux Premium</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Les 10 rangs</h2>
          <div className={styles.levels}>
            {LEVELS.map((lvl, i) => (
              <div key={lvl.level} className={styles.levelRow}>
                <div className={styles.levelNum}>Niv. {lvl.level}</div>
                <div className={styles.levelEmoji}>{lvl.emoji}</div>
                <div className={styles.levelName}>{lvl.name}</div>
                <div className={styles.levelXp}>
                  {lvl.minXp} XP
                  {i < LEVELS.length - 1 && <span className={styles.levelXpMax}> → {lvl.maxXp} XP</span>}
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
