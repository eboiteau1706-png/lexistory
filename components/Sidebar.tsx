"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import styles from "./Sidebar.module.css";
import { useSearchParams } from "next/navigation";
import type { Story } from "@/lib/stories";

export default function Sidebar() {
  const [loading, setLoading] = useState(false);
  const [user, setUser]       = useState<any>(null);
  const [ready, setReady]     = useState(false);
  const supabase = createClient();
  const router   = useRouter();

  const searchParams = useSearchParams();
  const level = (searchParams.get("level") as Story["level"]) ?? "Lecteur";
  const levelEmoji: Record<Story["level"], string> = {
  "Curieux": "🌱", "Lecteur": "📖", "Érudit": "🎓",
};

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setReady(true);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function handlePremium() {
    setLoading(true);
    try {
      const res  = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch { alert("Erreur, réessaie."); }
    finally { setLoading(false); }
  }

  if (!ready) return null;

  return (
    <aside className={styles.sidebar}>

      {user ? (
        <>
          {/* Streak */}
          <div className={styles.card}>
            <p className={styles.cardTitle}>🔥 Ta série</p>
            <div className={styles.streakDisplay}>
              <div className={styles.streakNum}>1</div>
              <div className={styles.streakSub}>jour consécutif</div>
            </div>
          </div>

          {/* Stats */}
          <div className={styles.card}>
            <p className={styles.cardTitle}>📊 Mes stats</p>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Histoires lues</span>
              <span className={styles.statVal}>1</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Niveau actuel</span>
              <span className={`${styles.statVal} ${styles.gold}`}>
                {levelEmoji[level]} {level}
              </span>
            </div>
          </div>
        </>
      ) : (
        /* Non connecté */
        <div className={styles.loginCard}>
          <div className={styles.loginIcon}>📖</div>
          <div className={styles.loginTitle}>Suis ta progression</div>
          <div className={styles.loginText}>
            Connecte-toi pour voir ta série, tes stats et tes mots appris.
          </div>
          <button
            className={styles.loginBtn}
            onClick={() => router.push("/login")}
          >
            Se connecter
          </button>
        </div>
      )}

      {/* Premium */}
      <div className={styles.premiumCard}>
        <div className={styles.premiumTitle}>✨ Passe Premium</div>
        <div className={styles.premiumText}>
          Histoires illimitées, stats avancées et quiz personnalisés.
        </div>
        <div className={styles.premiumPrice}>
          1,99€ <span>/ mois</span>
        </div>
        <button
          className={styles.btnUpgrade}
          onClick={handlePremium}
          disabled={loading}
        >
          {loading ? "Chargement..." : "Passer Premium →"}
        </button>
      </div>

      {/* Locked */}
      <div className={styles.lockedCard}>
        <div className={styles.lockedIcon}>🔒</div>
        <div className={styles.lockedText}>
          L&apos;histoire de demain sera disponible à minuit.<br /><br />
          En Premium, accède à toutes les histoires passées.
        </div>
      </div>

    </aside>
  );
}
