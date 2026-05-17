"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import styles from "./profile.module.css";

export default function ProfileClient({ user }: { user: User }) {
  const supabase = createClient();
  const router   = useRouter();

  const [username, setUsername]       = useState("");
  const [editing, setEditing]         = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [saving, setSaving]           = useState(false);
  const [error, setError]             = useState("");
  const [isPremium, setIsPremium]     = useState(false);
  const [wordsCount, setWordsCount]   = useState(0);
  const [storiesCount, setStoriesCount] = useState(0);
  const [streak, setStreak]           = useState(0);

  useEffect(() => {
    // Charge le profil
    supabase.from("profiles").select("username, is_premium").eq("id", user.id).single()
      .then(({ data }) => {
        if (data?.username) setUsername(data.username);
        if (data?.is_premium) setIsPremium(data.is_premium);
      });

    // Compte les mots vus
    supabase.from("words_seen").select("word", { count: "exact" }).eq("user_id", user.id)
      .then(({ count }) => setWordsCount(count ?? 0));

    // Compte les histoires lues
    supabase.from("stories_read").select("story_slug", { count: "exact" }).eq("user_id", user.id)
      .then(({ count }) => setStoriesCount(count ?? 0));

    // Calcule le streak (jours consécutifs)
    supabase.from("stories_read").select("read_at").eq("user_id", user.id).order("read_at", { ascending: false })
      .then(({ data }) => {
        if (!data || data.length === 0) { setStreak(0); return; }
        let s = 1;
        const dates = data.map(d => new Date(d.read_at).toDateString());
        const unique = [...new Set(dates)];
        for (let i = 1; i < unique.length; i++) {
          const prev = new Date(unique[i - 1]);
          const curr = new Date(unique[i]);
          const diff = (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24);
          if (diff === 1) s++;
          else break;
        }
        setStreak(s);
      });
  }, []);

  async function handleSaveUsername() {
    if (!newUsername.trim()) return;
    setSaving(true); setError("");
    const { error } = await supabase.from("profiles")
      .upsert({ id: user.id, username: newUsername.trim() });
    setSaving(false);
    if (error) {
      setError(error.message.includes("unique") ? "Ce pseudo est déjà pris !" : "Erreur, réessaie.");
    } else {
      setUsername(newUsername.trim());
      setEditing(false); setNewUsername("");
    }
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

  const initial = (username?.[0] || user.email?.[0] || "?").toUpperCase();

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.avatar}>{initial}</div>

        {/* Badge Premium */}
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

        {/* Stats réelles */}
        <div className={styles.stats}>
          <div className={styles.statBox}>
            <div className={styles.statNum}>{streak}</div>
            <div className={styles.statLabel}>Jour de série</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statNum}>{storiesCount}</div>
            <div className={styles.statLabel}>Histoires lues</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statNum}>{wordsCount}</div>
            <div className={styles.statLabel}>Mots appris</div>
          </div>
        </div>

        {/* Premium ou bouton upgrade */}
        {!isPremium && (
          <div className={styles.plan}>
            <span className={styles.planBadge}>Plan Gratuit</span>
            <button className={styles.upgradeBtn} onClick={handlePremium}>
              Passer Premium — 1,99€/mois ✨
            </button>
          </div>
        )}

        <div className={styles.actions}>
          <a href="/" className={styles.backBtn}>← Retour aux histoires</a>
          <button className={styles.logoutBtn} onClick={handleLogout}>Se déconnecter</button>
        </div>
      </div>
    </div>
  );
}
