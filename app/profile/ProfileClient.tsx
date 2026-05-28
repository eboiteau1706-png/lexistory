"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { getLevel, getXpProgress, LEVELS } from "@/lib/xp";
import { lookup } from "@/lib/dictionary";
import type { User } from "@supabase/supabase-js";
import styles from "./profile.module.css";

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

  // Avatar
  const [avatarUrl, setAvatarUrl]         = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarError, setAvatarError]     = useState("");
  const avatarInputRef = useRef<HTMLInputElement>(null);

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

    supabase.auth.refreshSession().then(() => {
      supabase.auth.getSession().then(({ data }) => {
        if (data.session?.user?.email) setCurrentEmail(data.session.user.email);
      });
    });

    supabase.from("profiles").select("username, is_premium, xp, stripe_customer_id, avatar_url").eq("id", user.id).single()
      .then(({ data }) => {
        if (data?.username) setUsername(data.username);
        if (data?.is_premium) setIsPremium(data.is_premium);
        setXp(data?.xp ?? 0);
        setStripeCustomerId(data?.stripe_customer_id ?? null);
        if (data?.avatar_url) setAvatarUrl(data.avatar_url);
        if (data?.stripe_customer_id) {
          fetch("/api/subscription").then(r => r.json()).then(d => {
            if (d.renewalDate) setRenewalDate(d.renewalDate);
            if (d.daysLeft) setDaysLeft(d.daysLeft);
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
        setXpThisWeek(recentStories.length * 3);
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
    const { error } = await supabase.from("profiles").upsert({ id: user.id, username: newUsername.trim() });
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
      else alert("Erreur, réessaie ou contacte e.boiteau1706@gmail.com");
    } catch { alert("Erreur, réessaie."); }
    finally { setCancelling(false); }
  }

  async function handleDeleteAccount() {
    setDeleting(true);
    try {
      const res = await fetch("/api/delete-account", { method: "POST" });
      const data = await res.json();
      if (data.success) { await supabase.auth.signOut(); router.push("/"); }
      else alert("Erreur lors de la suppression. Contacte-nous à e.boiteau1706@gmail.com");
    } catch { alert("Erreur lors de la suppression."); }
    finally { setDeleting(false); }
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { setAvatarError("Image trop grande (max 2 Mo)"); return; }
    setAvatarError("");
    setUploadingAvatar(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const fd = new FormData();
      fd.append("file", file);
      const res  = await fetch("/api/upload-avatar", {
        method: "POST",
        headers: { Authorization: `Bearer ${session?.access_token}` },
        body: fd,
      });
      const data = await res.json();
      if (data.avatar_url) setAvatarUrl(data.avatar_url);
      else setAvatarError(data.error ?? "Erreur lors de l'upload");
    } catch { setAvatarError("Erreur lors de l'upload"); }
    setUploadingAvatar(false);
    e.target.value = "";
  }

  const initial    = (username?.[0] || currentEmail?.[0] || "?").toUpperCase();
  const level      = getLevel(xp);
  const { current, needed, pct } = getXpProgress(xp);
  const nextLevel  = LEVELS.find(l => l.level === level.level + 1);
  const levelEmoji: Record<string, string> = { "Curieux": "🌱", "Lecteur": "📖", "Érudit": "🎓" };
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
        <div className={styles.avatarWrap} onClick={() => avatarInputRef.current?.click()} title="Changer l'avatar">
          <div className={styles.avatar}>
            {avatarUrl
              ? <img src={avatarUrl} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : initial}
          </div>
          {uploadingAvatar
            ? <div className={styles.avatarSpinner}>⏳</div>
            : <div className={styles.avatarOverlay}>✏️</div>}
        </div>
        <input ref={avatarInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />
        {avatarError && <p style={{ color: "#e07070", fontSize: "0.75rem", margin: "0 0 6px", textAlign: "center" }}>{avatarError}</p>}
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
            {!editingEmail && user.app_metadata?.provider !== "google" && (
              <button className={styles.editBtn} onClick={() => { setEditingEmail(true); setEmailSent(false); setEmailError(""); setEmailUpdated(false); }}>Changer</button>
            )}
          </div>
          {user.app_metadata?.provider === "google" && (
            <p style={{ fontSize: "0.78rem", color: "var(--text-dim)", fontStyle: "italic", marginTop: "4px" }}>🔗 Connecté via Google — email non modifiable</p>
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
            <div className={styles.xpLevel}>{level.emoji} Niveau {level.level} — {level.name}</div>
            <div className={styles.xpTotal}>{xp} XP{isPremium ? " ✨" : ""}</div>
          </div>
          <div className={styles.xpBarWrap}><div className={styles.xpBarFill} style={{ width: `${pct}%` }} /></div>
          <div className={styles.xpFooter}>
            <span>{current} / {needed} XP</span>
            {nextLevel ? <span>Prochain : {nextLevel.emoji} {nextLevel.name}</span> : <span>👑 Niveau maximum !</span>}
          </div>
          {isPremium && <div className={styles.xpBoost}>⚡ Boost Premium x1.5 actif</div>}
        </div>

        <div className={styles.stats}>
          <div className={styles.statBox}><div className={styles.statNum}>{streak}</div><div className={styles.statLabel}>🔥 Série</div></div>
          <div className={styles.statBox}><div className={styles.statNum}>{storiesCount}</div><div className={styles.statLabel}>📖 Histoires</div></div>
          <div className={styles.statBox}><div className={styles.statNum}>{wordsCount}</div><div className={styles.statLabel}>✨ Mots</div></div>
        </div>

        <div className={`${styles.advancedStats} ${!isPremium ? styles.blurred : ""}`}>
          <div className={styles.advancedTitle}>
            📊 Stats détaillées
            {!isPremium && <span className={styles.premiumTag}>Premium</span>}
          </div>
          <div className={styles.statGrid}>
            <div className={styles.statGridBox}><div className={styles.statGridNum}>#{myRank ?? "—"}</div><div className={styles.statGridLabel}>🏆 Classement</div></div>
            <div className={styles.statGridBox}><div className={styles.statGridNum}>{streakRecord}j</div><div className={styles.statGridLabel}>🔥 Record série</div></div>
            <div className={styles.statGridBox}><div className={styles.statGridNum}>+{xpThisWeek}</div><div className={styles.statGridLabel}>⚡ XP cette semaine</div></div>
            <div className={styles.statGridBox}><div className={styles.statGridNum}>{completionRate}%</div><div className={styles.statGridLabel}>✅ Assiduité</div></div>
          </div>
          <div className={styles.breakdown}>
            <div className={styles.breakdownTitle}>Histoires lues par niveau</div>
            {["Curieux", "Lecteur", "Érudit"].map(lvl => (
              <div key={lvl} className={styles.breakdownRow}>
                <span className={styles.breakdownLabel}>{levelEmoji[lvl]} {lvl}</span>
                <div className={styles.barWrap}><div className={styles.bar} style={{ width: `${((levelBreakdown[lvl] || 0) / maxStories) * 100}%` }} /></div>
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
        ) : (
          <div className={styles.plan}>
            <span className={styles.planBadge}>Plan Gratuit</span>
            <button className={styles.upgradeBtn} onClick={handlePremium}>Passer Premium — 1,99€/mois ✨</button>
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
