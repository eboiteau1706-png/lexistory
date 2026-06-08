"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { getLevel, getXpProgress, LEVELS } from "@/lib/xp";
import { lookup } from "@/lib/dictionary";
import type { User } from "@supabase/supabase-js";
import styles from "./profile.module.css";
import { AVATAR_SEEDS, getAvatarUrl } from "@/lib/avatar";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import WordPopup from "@/components/WordPopup";

interface FavWord {
  word: string;
  def_orig: string | null;
}

export default function ProfileClient({ user }: { user: User }) {
  const supabase = createClient();
  const router   = useRouter();

  const [username, setUsername]                 = useState("");
  const [editing, setEditing]                   = useState(false);
  const [newUsername, setNewUsername]           = useState("");
  const [saving, setSaving]                     = useState(false);
  const [error, setError]                       = useState("");
  const [isPremium, setIsPremium]               = useState(false);
  const [stripeCustomerId, setStripeCustomerId] = useState<string | null>(null);
  const [xp, setXp]                             = useState(0);
  const [wordsCount, setWordsCount]             = useState(0);
  const [storiesCount, setStoriesCount]         = useState(0);
  const [streak, setStreak]                     = useState(0);
  const [streakRecord, setStreakRecord]         = useState(0);
  const [xpThisWeek, setXpThisWeek]             = useState(0);
  const [completionRate, setCompletionRate]     = useState(0);
  const [myRank, setMyRank]                     = useState<number | null>(null);
  const [topWords, setTopWords]                 = useState<string[]>([]);
  const [levelBreakdown, setLevelBreakdown]     = useState<Record<string, number>>({});
  const [activityData, setActivityData]         = useState<{ date: string; xp: number }[]>([]);
  const [gamesCount, setGamesCount]             = useState(0);
  const [bestDay, setBestDay]                   = useState<{ date: string; xp: number } | null>(null);
  const [quizLevelStats, setQuizLevelStats] = useState<Record<string, { count: number; totalScore: number }>>({});
  const [clickedWord, setClickedWord]           = useState<string | null>(null);
  const [statsLoading, setStatsLoading]         = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [deleting, setDeleting]                 = useState(false);
  const [cancelling, setCancelling]             = useState(false);
  const [cancelDone, setCancelDone]             = useState(false);
  const [renewalDate, setRenewalDate]           = useState<string | null>(null);
  const [daysLeft, setDaysLeft]                 = useState<number | null>(null);
  const [cancelAtPeriodEnd, setCancelAtPeriodEnd] = useState(false);

  // Favoris
  const [favorites, setFavorites] = useState<FavWord[]>([]);
  const [favPopup, setFavPopup]   = useState<FavWord | null>(null);

  // Avatar (séparé des autres données profil)
  const [avatarSeed, setAvatarSeed]       = useState<string | null>(null);
  const [showAvatarGrid, setShowAvatarGrid] = useState(false);
  const [pendingSeed, setPendingSeed]     = useState<string | null>(null);
  const [savingAvatar, setSavingAvatar]   = useState(false);

  // Email
  const [currentEmail, setCurrentEmail]   = useState(user.email ?? "");
  const [editingEmail, setEditingEmail]   = useState(false);
  const [newEmail, setNewEmail]           = useState("");
  const [emailSaving, setEmailSaving]     = useState(false);
  const [emailError, setEmailError]       = useState("");
  const [emailSent, setEmailSent]         = useState(false);
  const [emailUpdated, setEmailUpdated]   = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("emailUpdated")) {
      setEmailUpdated(true);
      window.history.replaceState({}, "", "/profile");
      window.location.reload();
    }

    // Refresh session FIRST, then load profile so RLS (auth.uid() = id) passes
    supabase.auth.refreshSession().then(async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session?.user?.email) setCurrentEmail(sessionData.session.user.email);

      const { data } = await supabase
        .from("profiles")
        .select("username, is_premium, xp, stripe_customer_id, avatar_url")
        .eq("id", user.id)
        .single();

      if (data?.username)         setUsername(data.username);
      setIsPremium(data?.is_premium === true);
      setXp(data?.xp ?? 0);
      setStripeCustomerId(data?.stripe_customer_id ?? null);
      setAvatarSeed(data?.avatar_url ?? null);
      if (data?.stripe_customer_id) {
        fetch("/api/subscription").then(r => r.json()).then(d => {
          if (d.renewalDate)      setRenewalDate(d.renewalDate);
          if (d.daysLeft)         setDaysLeft(d.daysLeft);
          if (d.cancelAtPeriodEnd) setCancelAtPeriodEnd(true);
        });
      }
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
        let maxStreak = 1, currentStreak = 1;
        for (let i = 1; i < dates.length; i++) {
          const diff = (new Date(dates[i-1]).getTime() - new Date(dates[i]).getTime()) / 86400000;
          if (diff === 1) { currentStreak++; if (currentStreak > maxStreak) maxStreak = currentStreak; }
          else { currentStreak = 1; }
        }
        setStreakRecord(Math.max(maxStreak, s));
        const oneWeekAgo = new Date(Date.now() - 7 * 86400000);
        const recentStories = data.filter((d: any) => new Date(d.read_at) > oneWeekAgo);
        setXpThisWeek(recentStories.length * 5);
        if (data.length > 0 && s > 0) setCompletionRate(Math.min(100, Math.round((data.length / Math.max(s, 1)) * 100)));
      });

    supabase.from("profiles").select("id", { count: "exact" }).gt("xp", 0).then(async ({ count }) => {
      if (!count) return;
      const { data: profile } = await supabase.from("profiles").select("xp").eq("id", user.id).single();
      const { count: above } = await supabase.from("profiles").select("id", { count: "exact" }).gt("xp", profile?.xp ?? 0);
      setMyRank((above ?? 0) + 1);
    });

    supabase.from("word_favorites").select("word, def_orig").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setFavorites(data.map((d: any) => ({ word: d.word, def_orig: d.def_orig ?? null })));
      });

    // ── Stats avancées premium ─────────────────────────────────────────────
    const thirtyDaysAgo = new Date(Date.now() - 30 * 86400_000).toISOString();
    supabase.from("stories_read").select("read_at").eq("user_id", user.id)
      .gte("read_at", thirtyDaysAgo).order("read_at", { ascending: true })
      .then(({ data: reads }) => {
        if (!reads) return;
        const byDate: Record<string, number> = {};
        reads.forEach((r: any) => {
          const d = r.read_at.slice(0, 10);
          byDate[d] = (byDate[d] ?? 0) + 5;
        });
        const sorted = Object.entries(byDate).map(([date, xp]) => ({ date, xp })).sort((a, b) => a.date.localeCompare(b.date));
        setActivityData(sorted);
        if (sorted.length > 0) {
          const best = sorted.reduce((m, c) => c.xp > m.xp ? c : m);
          setBestDay(best);
        }
        setStatsLoading(false);
      });

    supabase.from("game_completions").select("id", { count: "exact", head: true }).eq("user_id", user.id)
      .then(({ count }) => setGamesCount(count ?? 0));

    // ── Quiz stats : localStorage (pre-fix) + DB, merged ──────────────────────
    const localQuizMap: Record<string, { level: string; score: number }> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key?.startsWith("lx_quiz_") || key.startsWith("lx_quiz_prog_")) continue;
      const m = key.match(/^lx_quiz_(.+)_(\d{4}-\d{2}-\d{2})$/);
      if (!m) continue;
      const [, lvl, date] = m;
      if (!["Curieux", "Lecteur", "Érudit"].includes(lvl)) continue;
      try {
        const saved = localStorage.getItem(key);
        if (!saved) continue;
        const parsed = JSON.parse(saved);
        if (typeof parsed.score === "number") localQuizMap[`${lvl}_${date}`] = { level: lvl, score: parsed.score };
      } catch {}
    }
    supabase.from("quiz_completions").select("level, score, quiz_date").eq("user_id", user.id)
      .then(({ data: dbRows }) => {
        const merged: Record<string, { level: string; score: number }> = { ...localQuizMap };
        if (dbRows) {
          for (const row of dbRows) merged[`${row.level}_${row.quiz_date}`] = { level: row.level, score: row.score };
        }
        const stats: Record<string, { count: number; totalScore: number }> = {};
        for (const { level: lvl, score } of Object.values(merged)) {
          if (!stats[lvl]) stats[lvl] = { count: 0, totalScore: 0 };
          stats[lvl].count++;
          stats[lvl].totalScore += score;
        }
        setQuizLevelStats(stats);
      });
  }, []);

  async function removeFav(word: string) {
    await supabase.from("word_favorites").delete().eq("user_id", user.id).eq("word", word);
    setFavorites(prev => prev.filter(f => f.word !== word));
    if (favPopup?.word === word) setFavPopup(null);
  }

  async function handleSaveUsername() {
    if (!newUsername.trim()) return;
    if (!/^[a-zA-Z0-9_-]{2,20}$/.test(newUsername.trim())) { setError("Pseudo invalide. Lettres, chiffres, - ou _ uniquement."); return; }
    setSaving(true); setError("");
    const { error } = await supabase.from("profiles").update({ username: newUsername.trim() }).eq("id", user.id);
    setSaving(false);
    if (error) setError(error.message.includes("unique") ? "Ce pseudo est déjà pris !" : "Erreur, réessaie.");
    else { setUsername(newUsername.trim()); setEditing(false); setNewUsername(""); }
  }

  async function handleSaveEmail() {
    if (!newEmail.trim()) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail.trim())) { setEmailError("Email invalide."); return; }
    if (newEmail.trim() === currentEmail) { setEmailError("C'est déjà ton adresse email."); return; }
    setEmailSaving(true); setEmailError("");
    const { error } = await supabase.auth.updateUser({ email: newEmail.trim() });
    setEmailSaving(false);
    if (error) {
      if (error.message.includes("already")) setEmailError("Cette adresse email est déjà utilisée.");
      else setEmailError("Erreur, réessaie.");
    } else { setEmailSent(true); setEditingEmail(false); setNewEmail(""); }
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

  async function handleCancelSubscription() {
    setCancelling(true);
    try {
      const res = await fetch("/api/portal", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ cancel: true }) });
      const data = await res.json();
      if (data.success) { setCancelDone(true); setShowCancelConfirm(false); }
      else alert("Erreur, réessaie ou contacte lexistory.fr@gmail.com");
    } catch { alert("Erreur, réessaie."); }
    finally { setCancelling(false); }
  }

  async function handleDeleteAccount() {
    setDeleting(true);
    try {
      const res = await fetch("/api/delete-account", { method: "POST" });
      const data = await res.json();
      if (data.success) { await supabase.auth.signOut(); router.push("/"); }
      else alert("Erreur lors de la suppression. Contacte-nous à lexistory.fr@gmail.com");
    } catch { alert("Erreur lors de la suppression."); }
    finally { setDeleting(false); }
  }

  async function handleSaveAvatar() {
    if (!pendingSeed || !user?.id) return;
    setSavingAvatar(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      await fetch("/api/save-avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token}` },
        body: JSON.stringify({ seed: pendingSeed }),
      });
      setAvatarSeed(pendingSeed);
    } catch {}
    setShowAvatarGrid(false);
    setSavingAvatar(false);
  }

  const initial    = (username?.[0] || currentEmail?.[0] || "?").toUpperCase();
  const level      = getLevel(xp);
  const { current, needed, pct } = getXpProgress(xp);
  const nextLevel  = LEVELS.find(l => l.level === level.level + 1);
  const levelEmoji: Record<string, string> = { "Curieux": "🌱", "Lecteur": "📖", "Érudit": "🎓" };
  const quizCount      = Object.values(quizLevelStats).reduce((s, v) => s + v.count, 0);
  const quizTotalScore = Object.values(quizLevelStats).reduce((s, v) => s + v.totalScore, 0);
  const maxStories = Math.max(...Object.values(levelBreakdown), 1);
  const isLifetime = isPremium && !stripeCustomerId;
  const isCancelled = cancelAtPeriodEnd || cancelDone;

  // Définition du mot favori : dico local en priorité, sinon def_orig stockée
  const favLocalDef = favPopup ? lookup(favPopup.word.toLowerCase()) : null;
  const favDefOrig  = favLocalDef?.defOrig  || favPopup?.def_orig || "";
  const favDefSimple = favLocalDef?.defSimple || "";
  const favEtym     = favLocalDef?.etym || "";

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.avatar}>
          {getAvatarUrl(avatarSeed)
            ? <img src={getAvatarUrl(avatarSeed)!} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
            : initial}
        </div>
        <button className={styles.btnEditAvatar} onClick={() => { setPendingSeed(avatarSeed); setShowAvatarGrid(true); }}>
          Changer d&apos;avatar
        </button>

        {showAvatarGrid && (
          <div onClick={() => setShowAvatarGrid(false)} style={{ position: "fixed", inset: 0, zIndex: 400, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
            <div onClick={e => e.stopPropagation()} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "20px", maxWidth: "420px", width: "100%", display: "flex", flexDirection: "column", overflow: "hidden", maxHeight: "90vh" }}>
              {/* Titre sticky */}
              <div style={{ padding: "20px 24px 12px", fontFamily: "var(--font-playfair), serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--accent)", textAlign: "center", flexShrink: 0, borderBottom: "1px solid var(--border)" }}>
                Choisis ton avatar
              </div>
              {/* Zone scrollable */}
              <div style={{ overflowY: "auto", padding: "16px 24px", flex: 1 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", justifyContent: "center", justifyItems: "center", width: "100%" }}>
                  {AVATAR_SEEDS.map(seed => (
                    <button key={seed} onClick={() => setPendingSeed(seed)}
                      style={{ background: "none", border: `3px solid ${pendingSeed === seed ? "#d4a843" : "transparent"}`, borderRadius: "50%", padding: "2px", cursor: "pointer", transition: "border-color 0.15s" }}>
                      <img src={getAvatarUrl(seed)!} alt={seed} style={{ width: 80, height: 80, borderRadius: "50%", display: "block" }} />
                    </button>
                  ))}
                </div>
              </div>
              {/* Boutons sticky */}
              <div style={{ padding: "12px 24px 20px", display: "flex", gap: "8px", justifyContent: "center", flexShrink: 0, borderTop: "1px solid var(--border)" }}>
                <button onClick={() => setShowAvatarGrid(false)} style={{ padding: "8px 20px", borderRadius: "50px", background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text-muted)", fontFamily: "inherit", fontSize: "0.85rem", cursor: "pointer" }}>Annuler</button>
                <button onClick={handleSaveAvatar} disabled={savingAvatar || !pendingSeed} style={{ padding: "8px 20px", borderRadius: "50px", background: "var(--accent)", border: "none", color: "var(--bg)", fontFamily: "inherit", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer", opacity: !pendingSeed ? 0.5 : 1 }}>
                  {savingAvatar ? "Sauvegarde…" : "Confirmer"}
                </button>
              </div>
            </div>
          </div>
        )}

        {isPremium && (
          <div className={`${styles.premiumBadge} ${isLifetime ? styles.premiumBadgeLifetime : ""}`}>
            {isLifetime ? "✨ Premium à vie" : isCancelled ? "⏳ Premium (résilié)" : "✨ Premium"}
          </div>
        )}

        {editing ? (
          <div className={styles.editWrap}>
            <input className={styles.input} placeholder="Choisis un pseudo..." value={newUsername}
              onChange={e => setNewUsername(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSaveUsername()} autoFocus maxLength={20} />
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.editBtns}>
              <button className={styles.btnCancel} onClick={() => { setEditing(false); setError(""); }}>Annuler</button>
              <button className={styles.btnSave} onClick={handleSaveUsername} disabled={saving}>{saving ? "Sauvegarde..." : "Valider"}</button>
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

        <div className={styles.emailSection}>
          <div className={styles.emailRow}>
            <span className={styles.emailLabel}>📧 {currentEmail}</span>
            {!editingEmail && !(user.app_metadata?.provider === "google" || (user.app_metadata?.providers as string[] | undefined)?.includes("google") || user.identities?.some((i: any) => i.provider === "google")) && (
              <button className={styles.editBtn} onClick={() => { setEditingEmail(true); setEmailSent(false); setEmailError(""); setEmailUpdated(false); }}>Changer</button>
            )}
          </div>
          {(user.app_metadata?.provider === "google" || (user.app_metadata?.providers as string[] | undefined)?.includes("google") || user.identities?.some((i: any) => i.provider === "google")) && (
            <p style={{ fontSize: "0.78rem", color: "var(--text-dim)", fontStyle: "italic", marginTop: "4px" }}>🔗 Connecté via Google — impossible de modifier l&apos;adresse email</p>
          )}
          {emailUpdated && <p style={{ fontSize: "0.8rem", color: "var(--green)", margin: "4px 0 0" }}>✅ Adresse email mise à jour avec succès !</p>}
          {emailSent && !emailUpdated && <p style={{ fontSize: "0.8rem", color: "var(--accent)", margin: "4px 0 0" }}>📬 Un lien de confirmation a été envoyé à ta nouvelle adresse.</p>}
          {editingEmail && (
            <div className={styles.editWrap} style={{ marginTop: 8 }}>
              <input className={styles.input} type="email" placeholder="nouvelle@adresse.com"
                value={newEmail} onChange={e => setNewEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSaveEmail()} autoFocus />
              {emailError && <p className={styles.error}>{emailError}</p>}
              <div className={styles.editBtns}>
                <button className={styles.btnCancel} onClick={() => { setEditingEmail(false); setEmailError(""); setNewEmail(""); }}>Annuler</button>
                <button className={styles.btnSave} onClick={handleSaveEmail} disabled={emailSaving || !newEmail}>{emailSaving ? "Envoi..." : "Envoyer le lien"}</button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.since}>
          Membre depuis le {new Date(user.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
        </div>

        <div className={styles.xpCard}>
          <div className={styles.xpHeader}>
            <div className={styles.xpLevel}>{level.emoji} {level.name}</div>
            <div className={styles.xpTotal}>{xp} XP{isPremium ? " ✨" : ""}</div>
          </div>
          <div className={styles.xpBarWrap}>
            <div className={styles.xpBarFill} style={{ width: `${pct}%`, background: level.color }} />
          </div>
          <div className={styles.xpFooter}>
            {level.level < 21
              ? <span>{current} / {needed} XP vers {nextLevel?.name}</span>
              : <span>👑 Rang maximum atteint — {current} XP au-delà</span>}
          </div>
          {isPremium && <div className={styles.xpBoost}>⚡ Boost Premium x1.5 actif</div>}
        </div>

        <div className={styles.stats}>
          <div className={styles.statBox}><div className={styles.statNum}>{streak}</div><div className={styles.statLabel}>🔥 Série</div></div>
          <div className={styles.statBox}><div className={styles.statNum}>{storiesCount}</div><div className={styles.statLabel}>📖 Histoires</div></div>
          <div className={styles.statBox}><div className={styles.statNum}>{wordsCount}</div><div className={styles.statLabel}>✨ Mots</div></div>
          <div className={styles.statBox}><div className={styles.statNum}>{quizCount}</div><div className={styles.statLabel}>🧠 Quiz</div></div>
        </div>

        {/* ── Quiz du jour — stats par niveau (visible à tous) ── */}
        <div style={{ margin: "8px 0", padding: "14px 16px", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "14px" }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: "var(--text-dim)", marginBottom: "10px" }}>
            🧠 Quiz du jour — par niveau
          </div>
          {(["Curieux", "Lecteur", "Érudit"] as const).map((lvl, i) => {
            const stats = quizLevelStats[lvl] ?? { count: 0, totalScore: 0 };
            const avg   = stats.count > 0 ? (stats.totalScore / stats.count).toFixed(1) : null;
            return (
              <div key={lvl} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: i < 2 ? "1px solid var(--border)" : "none" }}>
                <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{levelEmoji[lvl]} {lvl}</span>
                <span>
                  {avg
                    ? <><strong style={{ fontFamily: "var(--font-playfair), serif", fontSize: "0.95rem", color: "var(--accent)" }}>{avg}/6</strong><span style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginLeft: "6px" }}>moy. · {stats.count} quiz</span></>
                    : <span style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>—</span>}
                </span>
              </div>
            );
          })}
        </div>

        {!isPremium ? (
          <div style={{ margin: "8px 0", padding: "28px 20px", background: "rgba(232,201,122,0.05)", border: "1px solid rgba(232,201,122,0.2)", borderRadius: "14px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "10px" }}>
            <div style={{ fontSize: "2rem" }}>🔒</div>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)" }}>Stats avancées disponibles avec Premium</div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>Courbe XP 30j, assiduité, meilleur jour, mots consultés</p>
            <a href="/profile" style={{ marginTop: "4px", padding: "8px 20px", borderRadius: "10px", background: "var(--accent)", color: "var(--bg)", fontWeight: 700, textDecoration: "none", fontSize: "0.88rem" }}>Découvrir Premium →</a>
          </div>
        ) : (
        <div className={styles.advancedStats}>
          <div className={styles.advancedTitle}>
            📊 Stats détaillées
          </div>

          {/* ── Grille de stats ── */}
          <div className={styles.statGrid}>
            <div className={styles.statGridBox}><div className={styles.statGridNum}>#{myRank ?? "—"}</div><div className={styles.statGridLabel}>🏆 Classement</div></div>
            <div className={styles.statGridBox}><div className={styles.statGridNum}>{streakRecord}j</div><div className={styles.statGridLabel}>🔥 Record série</div></div>
            <div className={styles.statGridBox}><div className={styles.statGridNum}>+{xpThisWeek}</div><div className={styles.statGridLabel}>⚡ XP cette semaine</div></div>
            <div className={styles.statGridBox}><div className={styles.statGridNum}>{completionRate}%</div><div className={styles.statGridLabel}>✅ Assiduité</div></div>
            <div className={styles.statGridBox}><div className={styles.statGridNum}>{gamesCount}</div><div className={styles.statGridLabel}>🎮 Jeux joués</div></div>
            <div className={styles.statGridBox}>
              <div className={styles.statGridNum} style={{ fontSize: "0.85rem" }}>{bestDay ? bestDay.date.slice(5) : "—"}</div>
              <div className={styles.statGridLabel}>📅 Meilleur jour</div>
            </div>
            <div className={styles.statGridBox}>
              <div className={styles.statGridNum} style={{ fontSize: quizCount > 0 ? "1.1rem" : undefined }}>
                {quizCount > 0 ? `${(quizTotalScore / quizCount).toFixed(1)}/6` : "—"}
              </div>
              <div className={styles.statGridLabel}>🎯 Score moyen quiz</div>
            </div>
            <div className={styles.statGridBox}>
              <div className={styles.statGridNum}>{quizCount > 0 ? quizTotalScore : "—"}</div>
              <div className={styles.statGridLabel}>⭐ Bonnes réponses</div>
            </div>
          </div>

          {/* ── Courbe d'activité ── */}
          <div style={{ marginTop: "16px" }}>
            <div className={styles.breakdownTitle}>Activité XP — 30 derniers jours</div>
            {statsLoading ? (
              <div style={{ height: "80px", background: "var(--surface2)", borderRadius: "8px", animation: "shimmer 1.4s infinite", backgroundSize: "200% 100%", backgroundImage: "linear-gradient(90deg,var(--surface2) 25%,var(--border) 50%,var(--surface2) 75%)" }} />
            ) : activityData.length > 0 ? (
              <ResponsiveContainer width="100%" height={90}>
                <LineChart data={activityData} margin={{ top: 4, right: 4, bottom: 0, left: -30 }}>
                  <XAxis dataKey="date" tick={{ fontSize: 9, fill: "var(--text-dim)" }} tickFormatter={v => v.slice(5)} interval="preserveStartEnd" />
                  <Tooltip
                    contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "0.78rem" }}
                    labelStyle={{ color: "var(--text-dim)" }}
                    itemStyle={{ color: "#d4a843" }}
                    formatter={(v) => [`${v} XP`, ""]}
                    labelFormatter={(l) => String(l)}
                  />
                  <Line type="monotone" dataKey="xp" stroke="#d4a843" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ fontSize: "0.8rem", color: "var(--text-dim)", padding: "16px 0", textAlign: "center" }}>Aucune activité sur 30 jours</div>
            )}
          </div>

          {/* ── Répartition par niveau ── */}
          <div className={styles.breakdown} style={{ marginTop: "12px" }}>
            <div className={styles.breakdownTitle}>Histoires lues par niveau</div>
            {["Curieux", "Lecteur", "Érudit"].map(lvl => (
              <div key={lvl} className={styles.breakdownRow}>
                <span className={styles.breakdownLabel}>{levelEmoji[lvl]} {lvl}</span>
                <div className={styles.barWrap}><div className={styles.bar} style={{ width: `${((levelBreakdown[lvl] || 0) / maxStories) * 100}%` }} /></div>
                <span className={styles.breakdownVal}>{levelBreakdown[lvl] || 0}</span>
              </div>
            ))}
          </div>

          {/* ── Derniers mots cliquables ── */}
          {topWords.length > 0 && (
            <div className={styles.topWords}>
              <div className={styles.breakdownTitle}>Derniers mots consultés (cliquez pour la définition)</div>
              <div className={styles.wordChips}>
                {topWords.map(w => (
                  <button key={w} className={styles.wordChip}
                    onClick={() => setClickedWord(w)}
                    style={{ cursor: "pointer", background: "none", border: "1px solid var(--border)", borderRadius: "50px", padding: "3px 10px", fontFamily: "inherit", fontSize: "0.8rem", color: "var(--text-muted)", transition: "border-color 0.15s, color 0.15s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}>
                    {w}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        )}

        {/* WordPopup pour les mots cliqués dans les stats */}
        {clickedWord && (
          <WordPopup word={clickedWord} seenCount={0} onClose={() => setClickedWord(null)} />
        )}

        {/* ── MOTS FAVORIS ── */}
        <div className={styles.favSection}>
          <div className={styles.favTitle}>⭐ Mots favoris ({favorites.length})</div>
          {favorites.length === 0 ? (
            <p className={styles.favEmpty}>Clique sur ⭐ dans une définition pour sauvegarder un mot ici.</p>
          ) : (
            <div className={styles.favChips}>
              {favorites.map(f => (
                <button key={f.word} className={styles.favChip} onClick={() => setFavPopup(favPopup?.word === f.word ? null : f)}>
                  ⭐ {f.word}
                </button>
              ))}
            </div>
          )}
        </div>

        {isPremium && stripeCustomerId ? (
          <div className={styles.subscriptionBox}>
            <div className={styles.subscriptionInfo}><span>{isCancelled ? "⏳ Abonnement résilié" : "✨ Premium actif"}</span></div>
            {renewalDate && (
              <div className={styles.renewalDate}>
                {isCancelled
                  ? `Accès jusqu'au ${renewalDate} — ${daysLeft} jour${daysLeft !== 1 ? "s" : ""} restant${daysLeft !== 1 ? "s" : ""}`
                  : `Renouvellement le ${renewalDate} — ${daysLeft} jour${daysLeft !== 1 ? "s" : ""} restant${daysLeft !== 1 ? "s" : ""}`}
              </div>
            )}
            {!isCancelled && <button className={styles.cancelBtn} onClick={() => setShowCancelConfirm(true)}>Résilier mon abonnement</button>}
          </div>
        ) : isPremium && !stripeCustomerId ? (
          <div className={styles.portalInfo}>🎁 Tu bénéficies du Premium à vie — offert par LexiStory !</div>
        ) : null}

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
          <button className={styles.deleteBtn} onClick={() => setShowDeleteConfirm(true)}>Supprimer mon compte</button>
        </div>
      </div>

      {/* ── POPUP MOT FAVORI ── */}
      {favPopup && (
        <div style={{ position: "fixed", inset: 0, zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", padding: "24px" }}
          onClick={() => setFavPopup(null)}>
          <div onClick={e => e.stopPropagation()} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px", maxWidth: "380px", width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1.3rem", fontWeight: 700, color: "var(--accent)" }}>{favPopup.word}</span>
              <button onClick={() => setFavPopup(null)} style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", fontSize: "1rem" }}>✕</button>
            </div>
            {favEtym && <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontStyle: "italic" }}>{favEtym}</div>}
            {favDefOrig ? (
              <>
                <div>
                  <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: "var(--text-dim)", marginBottom: "4px" }}>Définition</div>
                  <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, padding: "10px 14px", background: "var(--surface2)", borderRadius: "10px", borderLeft: "3px solid var(--border)" }}>{favDefOrig}</div>
                </div>
                {favDefSimple && (
                  <div>
                    <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: "var(--text-dim)", marginBottom: "4px" }}>En clair 💡</div>
                    <div style={{ fontSize: "0.88rem", color: "var(--text)", lineHeight: 1.6, padding: "10px 14px", background: "rgba(232,201,122,0.06)", borderRadius: "10px", borderLeft: "3px solid var(--accent)" }}>{favDefSimple}</div>
                  </div>
                )}
              </>
            ) : (
              <div style={{ fontSize: "0.88rem", color: "var(--text-dim)", fontStyle: "italic" }}>Définition non disponible.</div>
            )}
            <button onClick={() => removeFav(favPopup.word)} style={{ marginTop: "4px", padding: "8px", borderRadius: "9px", background: "rgba(232,80,80,0.1)", border: "1px solid rgba(232,80,80,0.2)", color: "#e88080", cursor: "pointer", fontFamily: "inherit", fontSize: "0.82rem" }}>
              🗑️ Retirer des favoris
            </button>
          </div>
        </div>
      )}

      {showCancelConfirm && (
        <div onClick={() => setShowCancelConfirm(false)} style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", padding: "24px" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "28px", maxWidth: "360px", width: "100%", display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ fontSize: "1.8rem" }}>⚠️</div>
            <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 700, color: "var(--text)" }}>Résilier mon abonnement ?</p>
            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.6 }}>Tu garderas ton accès Premium jusqu'au {renewalDate ?? "fin de la période en cours"}. Après cette date, tu repasseras en compte gratuit.</p>
            <div style={{ display: "flex", gap: "8px" }}>
              <button style={{ flex: 1, padding: "10px", borderRadius: "10px", background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text-muted)", cursor: "pointer", fontFamily: "inherit", fontSize: "0.88rem" }} onClick={() => setShowCancelConfirm(false)}>Annuler</button>
              <button style={{ flex: 1, padding: "10px", borderRadius: "10px", background: "#e07070", border: "none", color: "white", cursor: "pointer", fontFamily: "inherit", fontSize: "0.88rem", fontWeight: 700, opacity: cancelling ? 0.6 : 1 }} onClick={handleCancelSubscription} disabled={cancelling}>{cancelling ? "Résiliation..." : "Confirmer"}</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div onClick={() => setShowDeleteConfirm(false)} style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", padding: "24px" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "var(--surface)", border: "1px solid #e07070", borderRadius: "16px", padding: "28px", maxWidth: "360px", width: "100%", display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ fontSize: "1.8rem" }}>⚠️</div>
            <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 700, color: "var(--text)" }}>Supprimer mon compte ?</p>
            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.6 }}>Cette action est irréversible. Toutes tes données seront supprimées.{isPremium && stripeCustomerId && !isCancelled && " Résilie d'abord ton abonnement."}</p>
            <div style={{ display: "flex", gap: "8px" }}>
              <button style={{ flex: 1, padding: "10px", borderRadius: "10px", background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text-muted)", cursor: "pointer", fontFamily: "inherit", fontSize: "0.88rem" }} onClick={() => setShowDeleteConfirm(false)}>Annuler</button>
              <button style={{ flex: 1, padding: "10px", borderRadius: "10px", background: "#e07070", border: "none", color: "white", cursor: "pointer", fontFamily: "inherit", fontSize: "0.88rem", fontWeight: 700, opacity: deleting ? 0.6 : 1 }} onClick={handleDeleteAccount} disabled={deleting}>{deleting ? "Suppression..." : "Supprimer"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
