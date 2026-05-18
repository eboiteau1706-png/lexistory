"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function LoginPage() {
  const supabase = createClient();
  const router   = useRouter();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode]         = useState<"magic" | "password" | "signup">("magic");
  const [sent, setSent]         = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/api/auth-callback` },
    });
  }

  async function handleMagicLink() {
    if (!email) return;
    setLoading(true); setError("");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/api/auth-callback` },
    });
    setLoading(false);
    if (error) setError("Erreur, vérifie ton adresse email.");
    else setSent(true);
  }

  async function handlePassword() {
    if (!email || !password) return;
    setLoading(true); setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError("Email ou mot de passe incorrect.");
    else { router.push("/"); router.refresh(); }
  }

  async function handleSignup() {
    if (!email || !password) return;
    if (password.length < 6) { setError("Le mot de passe doit faire au moins 6 caractères."); return; }
    setLoading(true); setError("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/api/auth-callback` },
    });
    setLoading(false);
    if (error) setError("Erreur lors de l'inscription.");
    else setSent(true);
  }

  if (sent) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.logo}>Lexi<span>Story</span></div>
          <div className={styles.sentIcon}>📬</div>
          <h1 className={styles.title}>Vérifie tes emails !</h1>
          <p className={styles.subtitle}>
            {mode === "signup"
              ? "Un lien de confirmation a été envoyé à ton adresse email."
              : "Un lien de connexion a été envoyé à ton adresse email."}
          </p>
          <p className={styles.hint}>
            💡 Ouvre le mail sur <strong>le même appareil</strong> que celui où tu veux te connecter.
          </p>
          <button className={styles.btnSecondary} onClick={() => setSent(false)}>← Retour</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>Lexi<span>Story</span></div>
        <h1 className={styles.title}>
          {mode === "signup" ? "Créer un compte" : "Connexion"}
        </h1>

        {/* Google */}
        <button className={styles.googleBtn} onClick={handleGoogle}>
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continuer avec Google
        </button>

        <div className={styles.divider}><span>ou</span></div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${mode === "magic" ? styles.tabActive : ""}`}
            onClick={() => { setMode("magic"); setError(""); }}
          >
            Lien magique
          </button>
          <button
            className={`${styles.tab} ${mode === "password" ? styles.tabActive : ""}`}
            onClick={() => { setMode("password"); setError(""); }}
          >
            Mot de passe
          </button>
          <button
            className={`${styles.tab} ${mode === "signup" ? styles.tabActive : ""}`}
            onClick={() => { setMode("signup"); setError(""); }}
          >
            S&apos;inscrire
          </button>
        </div>

        <input
          className={styles.input}
          type="email"
          placeholder="ton@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === "Enter" && (mode === "magic" ? handleMagicLink() : mode === "password" ? handlePassword() : handleSignup())}
        />

        {(mode === "password" || mode === "signup") && (
          <input
            className={styles.input}
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && (mode === "password" ? handlePassword() : handleSignup())}
          />
        )}

        {error && <p className={styles.error}>{error}</p>}

        <button
          className={styles.btnPrimary}
          onClick={mode === "magic" ? handleMagicLink : mode === "password" ? handlePassword : handleSignup}
          disabled={loading || !email || ((mode === "password" || mode === "signup") && !password)}
        >
          {loading ? "Chargement..." :
           mode === "magic" ? "Recevoir un lien de connexion 📧" :
           mode === "password" ? "Se connecter" :
           "Créer mon compte"}
        </button>

        {mode === "magic" && (
          <p className={styles.magicHint}>
            💡 Ouvre le mail sur <strong>le même appareil</strong> que celui-ci pour te connecter directement ici.
          </p>
        )}

        {mode === "magic" && (
  <p className={styles.footer}>
    Pas de mot de passe — on t&apos;envoie un lien magique par email.
  </p>
)}
      </div>
    </div>
  );
}
