"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { getLevel, getXpProgress, LEVELS } from "@/lib/xp";
import type { User } from "@supabase/supabase-js";
import styles from "./profile.module.css";

export default function ProfileClient({ user }: { user: User }) {
  const supabase = createClient();
  const router   = useRouter();

  const [username, setUsername]             = useState("");
  const [editing, setEditing]               = useState(false);
  const [newUsername, setNewUsername]       = useState("");
  const [saving, setSaving]                 = useState(false);
  const [error, setError]                   = useState("");
  const [isPremium, setIsPremium]           = useState(false);
  const [xp, setXp]                         = useState(0);
  const [wordsCount, setWordsCount]         = useState(0);
  const [storiesCount, setStoriesCount]     = useState(0);
  const [streak, setStreak]                 = useState(0);
  const [streakRecord, setStreakRecord]     = useState(0);
  const [xpThisWeek, setXpThisWeek]         = useState(0);
  const [completionRate, setCompletionRate] = useState(0);
  const [myRank, setMyRank]                 = useState<number | null>(null);
  const [topWords, setTopWords]             = useState<string[]>([]);
  const [levelBreakdown, setLevelBreakdown] = useState<Record<string, number>>({});

  useEffect(() => {
    supabase.from("profiles").select("username, is_premium, xp").eq("id", user.id).single()
      .then(({ data }) => {
        if (data?.username) setUsername(data.username);
        if (data?.is_premium) setIsPremium(data.is_premium);
        setXp(data?.xp ?? 0);
      });

    supabase.from("words_seen").select("word", { count: "exact" }).eq("user_id", user.id).order("seen_at", { ascending: false })
      .then(({ count, data }) => {
        setWordsCount(count ?? 0);
        if (data) setTopWords(data.slice(0, 8).map((d: any) => d.word));
      });

    supabase.from("stories_read").select("story_slug, story_level, read_at", { count: "exact" }).eq("user_id", user.id)
      .then(({ count, data }) => {
        setStoriesCount(count ?? 0);
        if (data) {
          const breakdown: Record<string, number> = {};
          data.forEach((d: any) => { breakdown[d.story_level] = (breakdown[d.story_level] || 0) + 1; });
          setLevelBreakdown(breakdown);
        }
      });

    // Streak actuel + record
    supabase.from("stories_read").select("read_at").eq("user_id", user.id).order("read_at", { ascending: false })
      .then(({ data }) => {
        if (!data || data.length === 0) return;
        const dates = [...new Set(data.map((d: any) => new Date(d.read_at).toDateString()))];

        // Streak actuel
        let s = 1;
        for (let i = 1; i < dates.length; i++) {
          const diff = (new Date(dates[i-1]).getTime() - new Date(dates[i]).getTime()) / 86400000;
          if (diff === 1) s++; else break;
        }
        setStreak(s);

        // Streak record (max streak jamais atteint)
        let maxStreak = 1;
        let currentStreak = 1;
        for (let i = 1; i < dates.length; i++) {
          const diff = (new Date(dates[i-1]).getTime() - new Date(dates[i]).getTime()) / 86400000;
          if (diff === 1) {
            currentStreak++;
            if (currentStreak > maxStreak) maxStreak = currentStreak;
          } else {
            currentStreak = 1;
          }
        }
        setStreakRecord(Math.max(maxStreak, s));

        // XP cette semaine (7 derniers jours)
        const oneWeekAgo = new Date(Date.now() - 7 * 86400000);
        const recentStories = data.filter((d: any) => new Date(d.read_at) > oneWeekAgo);
        setXpThisWeek(recentStories.length * 10);

        // Taux de complétion (stories_read / histoires disponibles × 100)
        if (data.length > 0 && s > 0) {
          setCompletionRate(Math.min(100, Math.round((data.length / Math.max(s, 1)) * 100)));
        }
      });

    // Rang dans le classement
    supabase.from("profiles").select("id", { count: "exact" }).gt("xp", 0).then(async ({ count }) => {
      if (!count) return;
      const { data: profile } = await supabase.from("profiles").select("xp").eq("id", user.id).single();
      const { count: above } = await supabase.from("profiles").select("id", { count: "exact" }).gt("xp", profile?.xp ?? 0);
      setMyRank((above ?? 0) + 1);
    });
  }, []);

  async function handleSaveUsername() {
    if (!newUsername.trim()) return;
    if (!/^[a-zA-Z0-9_-]{2,20}$/.test(newUsername.trim())) {
      setError("Pseudo invalide. Lettres, chiffres, - ou _ uniquement.");
      return;
    }
    setSaving(true); setError("");
    const { error } = await supabase.from("profiles").upsert({ id: user.id, username: newUsername.trim() });
    setSaving(false);
    if (error) setError(error.message.includes("unique") ? "Ce pseudo est déjà pris !" : "Erreur, réessaie.");
    else { setUsername(newUsername.trim()); setEditing(false); setNewUsername(""); }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/"); router.refresh();
  }

  async function handlePremium() {
    const res  = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  const initial   = (username?.[0] || user.email?.[0] || "?").toUpperCase();
  const level     = getLevel(xp);
  const { current, needed, pct } = getXpProgress(xp);
  const nextLevel = LEVELS.find(l => l.level === level.level + 1);
  const levelEmoji: Record<string, string> = { "Curieux": "🌱", "Lecteur": "📖", "Érudit": "🎓" };
  const maxStories = Math.max(...Object.values(levelBreakdown), 1);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.avatar}>{initial}</div>
        {isPremium && <div className={styles.premiumBadge}>✨ Premium</div>}

        {/* Pseudo */}
        {editing ? (
          <div className={styles.editWrap}>
            <input className={styles.input} placeholder="Choisis un pseudo..." value={newUsername}
              onChange={e => setNewUsername(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSaveUsername()} autoFocus maxLength={20} />
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.editBtns}>
              <button className={styles.btnCancel} onClick={() => { setEditing(false); setError(""); }}>Annuler</button>
              <button className={styles.btnSave} onClick={handleSaveUsername} disabled={saving}>
                {saving ? "Sauvegarde..." : "Valider"}
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.nameWrap}>
            <div className={styles.displayName}>{username || "Pas encore de pseudo"}</div>
            <button className={styles.editBtn} onClick={() => { setEditing(true); setNewUsername(username); }}>
              ✏️ {username ? "Changer" : "Choisir un pseudo"}
            </button>
          </div>
        )}

        <div className={styles.since}>
          Membre depuis le {new Date(user.created_at).toLocaleDateString("fr-FR", {
            day: "numeric", month: "long", year: "numeric",
          })}
        </div>

        {/* Niveau XP */}
        <div className={styles.xpCard}>
          <div className={styles.xpHeader}>
            <div className={styles.xpLevel}>{level.emoji} Niveau {level.level} — {level.name}</div>
            <div className={styles.xpTotal}>{xp} XP{isPremium ? " ✨" : ""}</div>
          </div>
          <div className={styles.xpBarWrap}>
            <div className={styles.xpBarFill} style={{ width: `${pct}%` }} />
          </div>
          <div className={styles.xpFooter}>
            <span>{current} / {needed} XP</span>
            {nextLevel && <span>Prochain : {nextLevel.emoji} {nextLevel.name}</span>}
            {!nextLevel && <span>👑 Niveau maximum !</span>}
          </div>
          {isPremium && (
            <div className={styles.xpBoost}>⚡ Boost Premium x1.5 actif</div>
          )}
        </div>

        {/* Stats de base */}
        <div className={styles.stats}>
          <div className={styles.statBox}>
            <div className={styles.statNum}>{streak}</div>
            <div className={styles.statLabel}>🔥 Série</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statNum}>{storiesCount}</div>
            <div className={styles.statLabel}>📖 Histoires</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statNum}>{wordsCount}</div>
            <div className={styles.statLabel}>✨ Mots</div>
          </div>
        </div>

        {/* Stats avancées Premium */}
        <div className={`${styles.advancedStats} ${!isPremium ? styles.blurred : ""}`}>
          <div className={styles.advancedTitle}>
            📊 Stats détaillées
            {!isPremium && <span className={styles.premiumTag}>Premium</span>}
          </div>

          {/* Rang + Record streak */}
          <div className={styles.statGrid}>
            <div className={styles.statGridBox}>
              <div className={styles.statGridNum}>#{myRank ?? "—"}</div>
              <div className={styles.statGridLabel}>🏆 Classement</div>
            </div>
            <div className={styles.statGridBox}>
              <div className={styles.statGridNum}>{streakRecord}j</div>
              <div className={styles.statGridLabel}>🔥 Record série</div>
            </div>
            <div className={styles.statGridBox}>
              <div className={styles.statGridNum}>+{xpThisWeek}</div>
              <div className={styles.statGridLabel}>⚡ XP cette semaine</div>
            </div>
            <div className={styles.statGridBox}>
              <div className={styles.statGridNum}>{completionRate}%</div>
              <div className={styles.statGridLabel}>✅ Assiduité</div>
            </div>
          </div>

          {/* Histoires par niveau */}
          <div className={styles.breakdown}>
            <div className={styles.breakdownTitle}>Histoires lues par niveau</div>
            {["Curieux", "Lecteur", "Érudit"].map(lvl => (
              <div key={lvl} className={styles.breakdownRow}>
                <span className={styles.breakdownLabel}>{levelEmoji[lvl]} {lvl}</span>
                <div className={styles.barWrap}>
                  <div className={styles.bar} style={{ width: `${((levelBreakdown[lvl] || 0) / maxStories) * 100}%` }} />
                </div>
                <span className={styles.breakdownVal}>{levelBreakdown[lvl] || 0}</span>
              </div>
            ))}
          </div>

          {/* Derniers mots */}
          {topWords.length > 0 && (
            <div className={styles.topWords}>
              <div className={styles.breakdownTitle}>Derniers mots consultés</div>
              <div className={styles.wordChips}>
                {topWords.map(w => <span key={w} className={styles.wordChip}>{w}</span>)}
              </div>
            </div>
          )}
        </div>

        {!isPremium && (
          <div className={styles.plan}>
            <span className={styles.planBadge}>Plan Gratuit</span>
            <button className={styles.upgradeBtn} onClick={handlePremium}>
              Passer Premium — 1,99€/mois ✨
            </button>
          </div>
        )}

        <div className={styles.linksRow}>
          <a href="/classement" className={styles.linkBtn}>🏆 Classement →</a>
          <a href="/rangs" className={styles.linkBtn}>⭐ Rangs & XP →</a>
        </div>

        <div className={styles.actions}>
          <a href="/" className={styles.backBtn}>← Retour aux histoires</a>
          <button className={styles.logoutBtn} onClick={handleLogout}>Se déconnecter</button>
        </div>
      </div>
    </div>
  );
}
