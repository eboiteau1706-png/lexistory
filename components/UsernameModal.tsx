"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { AVATAR_SEEDS, getAvatarUrl } from "@/lib/avatar";
import styles from "./UsernameModal.module.css";

export default function UsernameModal() {
  const pathname = usePathname();
  const [show, setShow]                 = useState(false);
  const [username, setUsername]         = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<string>(AVATAR_SEEDS[0]);
  const [saving, setSaving]             = useState(false);
  const [error, setError]               = useState("");
  const supabase = createClient();

  useEffect(() => {
    if (pathname === "/compte-confirme" || pathname === "/login") return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) return;
      supabase.from("profiles").select("username").eq("id", session.user.id).single()
        .then(({ data }) => {
          if (!data?.username) setShow(true);
        });
    });
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [show]);

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
      .upsert({ id: session.user.id, username: username.trim(), avatar_url: selectedAvatar });
    setSaving(false);
    if (error) {
      setError(error.message.includes("unique") ? "Ce pseudo est déjà pris !" : "Erreur, réessaie.");
    } else {
      setShow(false);
    }
  }

  if (!show) return null;

  return (
    <div className={styles.overlay} style={{ zIndex: 500 }}>
      <div className={styles.modal}>
        <div className={styles.emoji}>👋</div>
        <h2 className={styles.title}>Bienvenue sur LexiStory !</h2>
        <p className={styles.subtitle}>Choisis ton avatar et ton pseudo.</p>

        {/* Avatar sélectionné en grand */}
        <div className={styles.avatarPreview}>
          <img src={getAvatarUrl(selectedAvatar)!} alt="avatar" className={styles.avatarPreviewImg} />
        </div>

        {/* Grille de sélection */}
        <div className={styles.avatarGrid}>
          {AVATAR_SEEDS.map(seed => (
            <button
              key={seed}
              className={`${styles.avatarItem} ${selectedAvatar === seed ? styles.avatarSelected : ""}`}
              onClick={() => setSelectedAvatar(seed)}
              type="button"
            >
              <img src={getAvatarUrl(seed)!} alt={seed} />
            </button>
          ))}
        </div>

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
          {saving ? "Sauvegarde..." : "C'est parti →"}
        </button>
      </div>
    </div>
  );
}
