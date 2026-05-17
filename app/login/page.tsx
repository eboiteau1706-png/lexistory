"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase";
import styles from "./login.module.css";

export default function LoginPage() {
  const [email, setEmail]     = useState("");
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  async function handleMagicLink() {
    if (!email) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/api/auth-callback` },
    });
    setLoading(false);
    if (!error) setSent(true);
    else alert("Erreur : " + error.message);
  }

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/api/auth-callback` },
    });
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>Lexi<span>Story</span></div>
        <h1 className={styles.title}>Connexion</h1>

        {sent ? (
          <div className={styles.sent}>
            <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>📬</div>
            <p>Lien envoyé à <strong>{email}</strong></p>
            <p style={{ marginTop: "8px", color: "var(--text-dim)", fontSize: "0.85rem" }}>
              Vérifie tes spams si tu ne le vois pas.
            </p>
          </div>
        ) : (
          <>
            <button className={styles.googleBtn} onClick={handleGoogle}>
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"/>
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.6 26.8 36 24 36c-5.2 0-9.6-2.9-11.3-7.1l-6.5 5C9.7 39.7 16.3 44 24 44z"/>
                <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.8l6.2 5.2C41 35.8 44 30.3 44 24c0-1.3-.1-2.7-.4-4z"/>
              </svg>
              Continuer avec Google
            </button>

            <div className={styles.divider}><span>ou</span></div>

            <input
              className={styles.input}
              type="email"
              placeholder="ton@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleMagicLink()}
            />
            <button
              className={styles.btn}
              onClick={handleMagicLink}
              disabled={loading || !email}
            >
              {loading ? "Envoi..." : "Recevoir un lien de connexion ✉️"}
            </button>

            <p className={styles.hint}>
              Pas de mot de passe — on t&apos;envoie un lien magique par email.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
