"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import styles from "./UsernameModal.module.css";

export default function UsernameModal() {
  const [show, setShow]         = useState(false);
  const [username, setUsername] = useState("");
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState("");
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) return;
      supabase.from("profiles").select("username").eq("id", session.user.id).single()
        .then(({ data }) => {
          if (!data?.username) setShow(true);
        });
    });
  }, []);

 async function handleSave() {
  if (!username.trim()) return;
  if (!/^[a-zA-Z0-9_-]{2,20}$/.test(username.trim())) {
    setError("Pseudo invalide. Lettres, chiffres, - ou _ uniquement.");
    return;
  }
  setSaving(true); setError("");
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;
    const { error } = await supabase.from("profiles")
      .upsert({ id: session.user.id, username: username.trim() });
    setSaving(false);
    if (error) {
      setError(error.message.includes("unique") ? "Ce pseudo est déjà pris !" : "Erreur, réessaie.");
    } else {
      setShow(false);
    }
  }

  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.emoji}>👋</div>
        <h2 className={styles.title}>Bienvenue sur LexiStory !</h2>
        <p className={styles.subtitle}>Choisis un pseudo pour apparaître dans le classement.</p>
        <input
          className={styles.input}
          placeholder="Ton pseudo..."
          value={username}
          onChange={e => setUsername(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSave()}
          maxLength={20}
          autoFocus
        />
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.btn} onClick={handleSave} disabled={saving || !username.trim()}>
          {saving ? "Sauvegarde..." : "Choisir ce pseudo →"}
        </button>
      </div>
    </div>
  );
}
