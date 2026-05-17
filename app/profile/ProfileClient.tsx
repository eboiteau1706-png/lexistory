"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import styles from "./profile.module.css";

export default function ProfileClient({ user }: { user: User }) {
  const supabase = createClient();
  const router   = useRouter();

  const [username, setUsername]   = useState("");
  const [editing, setEditing]     = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [saving, setSaving]       = useState(false);
  const [error, setError]         = useState("");

  // Charge le pseudo depuis Supabase
  useEffect(() => {
    supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        if (data?.username) setUsername(data.username);
      });
  }, []);

  async function handleSaveUsername() {
    if (!newUsername.trim()) return;
    setSaving(true);
    setError("");
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, username: newUsername.trim() });
    setSaving(false);
    if (error) {
      setError(error.message.includes("unique") ? "Ce pseudo est déjà pris !" : "Erreur, réessaie.");
    } else {
      setUsername(newUsername.trim());
      setEditing(false);
      setNewUsername("");
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  async function handlePremium() {
    const res  = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  const displayName = username || user.email?.[0]?.toUpperCase() || "?";
  const initial     = (username?.[0] || user.email?.[0] || "?").toUpperCase();

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        <div className={styles.avatar}>{initial}</div>

        {/* Pseudo ou email */}
        {editing ? (
          <div className={styles.editWrap}>
            <input
              className={styles.input}
              placeholder="Choisis un pseudo..."
              value={newUsername}
              onChange={e => setNewUsername(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSaveUsername()}
              autoFocus
              maxLength={20}
            />
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.editBtns}>
              <button className={styles.btnCancel} onClick={() => { setEditing(false); setError(""); }}>
                Annuler
              </button>
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

        <div className={styles.stats}>
          <div className={styles.statBox}>
            <div className={styles.statNum}>1</div>
            <div className={styles.statLabel}>Jour de série</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statNum}>1</div>
            <div className={styles.statLabel}>Histoire lue</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statNum}>0</div>
            <div className={styles.statLabel}>Mots appris</div>
          </div>
        </div>

        <div className={styles.plan}>
          <span className={styles.planBadge}>Plan Gratuit</span>
          <button className={styles.upgradeBtn} onClick={handlePremium}>
            Passer Premium — 1,99€/mois ✨
          </button>
        </div>

        <div className={styles.actions}>
          <a href="/" className={styles.backBtn}>← Retour aux histoires</a>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Se déconnecter
          </button>
        </div>

      </div>
    </div>
  );
}
