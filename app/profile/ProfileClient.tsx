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
  const [stripeCustomerId, setStripeCustomerId] = useState<string | null>(null);
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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting]             = useState(false);
  const [portalLoading, setPortalLoading]   = useState(false);

  useEffect(() => {
    supabase.from("profiles").select("username, is_premium, xp, stripe_customer_id").eq("id", user.id).single()
      .then(({ data }) => {
        if (data?.username) setUsername(data.username);
        if (data?.is_premium) setIsPremium(data.is_premium);
        setXp(data?.xp ?? 0);
        setStripeCustomerId(data?.stripe_customer_id ?? null);
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

    supabase.from("stories_read").select("read_at").eq("user_id", user.id).order("read_at", { ascending: false })
      .then(({ data }) => {
        if (!data || data.length === 0) return;
        const dates = [...new Set(data.map((d: any) => new Date(d.read_at).toDateString()))];

        let s = 1;
        for (let i = 1; i < dates.length; i++) {
          const diff = (new Date(dates[i-1]).getTime() - new Date(dates[i]).getTime()) / 86400000;
          if (diff === 1) s++; else break;
        }
        setStreak(s);

        let maxStreak = 1;
        let currentStreak = 1;
        for (let i = 1; i < dates.length; i++) {
          const diff = (new Date(dates[i-1]).getTime() - new Date(dates[i]).getTime()) / 86400000;
          if (diff === 1) { currentStreak++; if (currentStreak > maxStreak) maxStreak = currentStreak; }
          else { currentStreak = 1; }
        }
        setStreakRecord(Math.max(maxStreak, s));

        const oneWeekAgo = new Date(Date.now() - 7 * 86400000);
        const recentStories = data.filter((d: any) => new Date(d.read_at) > oneWeekAgo);
        setXpThisWeek(recentStories.length * 10);

        if (data.length > 0 && s > 0) {
          setCompletionRate(Math.min(100, Math.round((data.length / Math.max(s, 1)) * 100)));
        }
      });

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

  async function handlePortal() {
    setPortalLoading(true);
    try {
      const res  = await fetch("/api/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Erreur, réessaie.");
    } catch { alert("Erreur, réessaie."); }
    finally { setPortalLoading(false); }
  }

async function handleDeleteAccount() {
  setDeleting(true);
  try {
    const res = await fetch("/api/delete-account", { method: "POST" });
    const data = await res.json();
    if (data.success) {
      await supabase.auth.signOut();
      router.push("/");
    } else {
      alert("Erreur lors de la suppression. Contacte-nous à contact@lexistory.fr");
    }
  } catch {
    alert("Erreur lors de la suppression. Contacte-nous à contact@lexistory.fr");
  }
  finally { setDeleting(false); }
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
          {isPremium && <div className={styles.xpBoost}>⚡ Boost Premium x1.5 actif</div>}
        </div>

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

        <div className={`${styles.advancedStats} ${!isPremium ? styles.blurred : ""}`}>
          <div className={styles.advancedTitle}>
            📊 Stats détaillées
            {!isPremium && <span className={styles.premiumTag}>Premium</span>}
          </div>
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
          {topWords.length > 0 && (
            <div className={styles.topWords}>
              <div className={styles.breakdownTitle}>Derniers mots consultés</div>
              <div className={styles.wordChips}>
                {topWords.map(w => <span key={w} className={styles.wordChip}>{w}</span>)}
              </div>
            </div>
          )}
        </div>

        {/* Gestion abonnement */}
        {isPremium && stripeCustomerId ? (
          <button className={styles.portalBtn} onClick={handlePortal} disabled={portalLoading}>
            {portalLoading ? "Chargement..." : "⚙️ Gérer mon abonnement"}
          </button>
        ) : isPremium && !stripeCustomerId ? (
          <div className={styles.portalInfo}>
            Pour résilier, contacte-nous à <a href="mailto:contact@lexistory.fr">contact@lexistory.fr</a>
          </div>
        ) : (
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

        <div className={styles.dangerZone}>
          <p className={styles.dangerTitle}>Zone de danger</p>
          <button className={styles.deleteBtn} onClick={() => setShowDeleteConfirm(true)}>
            Supprimer mon compte
          </button>
        </div>
      </div>

      {showDeleteConfirm && (
        <div
          onClick={() => setShowDeleteConfirm(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 300,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
            padding: "24px",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "var(--surface)",
              border: "1px solid #e07070",
              borderRadius: "16px",
              padding: "28px",
              maxWidth: "360px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <div style={{ fontSize: "1.8rem" }}>⚠️</div>
            <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 700, color: "var(--text)" }}>
              Supprimer mon compte ?
            </p>
            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
              Cette action est irréversible. Toutes tes données seront supprimées : progression, mots appris, histoires lues, amis.
              {isPremium && stripeCustomerId && " Résilie d'abord ton abonnement depuis 'Gérer mon abonnement'."}
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                style={{
                  flex: 1, padding: "10px", borderRadius: "10px",
                  background: "var(--surface2)", border: "1px solid var(--border)",
                  color: "var(--text-muted)", cursor: "pointer", fontFamily: "inherit", fontSize: "0.88rem",
                }}
                onClick={() => setShowDeleteConfirm(false)}
              >
                Annuler
              </button>
              <button
                style={{
                  flex: 1, padding: "10px", borderRadius: "10px",
                  background: "#e07070", border: "none",
                  color: "white", cursor: "pointer", fontFamily: "inherit",
                  fontSize: "0.88rem", fontWeight: 700,
                  opacity: deleting ? 0.6 : 1,
                }}
                onClick={handleDeleteAccount}
                disabled={deleting}
              >
                {deleting ? "Suppression..." : "Supprimer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
