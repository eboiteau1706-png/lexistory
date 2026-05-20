"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import styles from "../login/login.module.css";

export default function ResetPasswordPage() {
  const supabase = createClient();
  const router   = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [done, setDone]         = useState(false);

  async function handleReset() {
    if (!password || !confirm) return;
    if (password.length < 6) { setError("Le mot de passe doit faire au moins 6 caractères."); return; }
    if (password !== confirm) { setError("Les mots de passe ne correspondent pas."); return; }
    setLoading(true); setError("");
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) setError("Erreur, réessaie.");
    else setDone(true);
  }

  if (done) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.logo}>Lexi<span>Story</span></div>
          <div className={styles.sentIcon}>✅</div>
          <h1 className={styles.title}>Mot de passe modifié !</h1>
          <p className={styles.subtitle}>Tu peux maintenant te connecter avec ton nouveau mot de passe.</p>
          <a href="/login" className={styles.btnPrimary} style={{ textDecoration: "none", textAlign: "center", display: "block" }}>
            Se connecter →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>Lexi<span>Story</span></div>
        <h1 className={styles.title}>Nouveau mot de passe</h1>
        <p className={styles.subtitle}>Choisis un nouveau mot de passe pour ton compte.</p>
        <input
          className={styles.input}
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Confirme le mot de passe"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleReset()}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button
          className={styles.btnPrimary}
          onClick={handleReset}
          disabled={loading || !password || !confirm}
        >
          {loading ? "Chargement..." : "Modifier mon mot de passe"}
        </button>
      </div>
    </div>
  );
}
