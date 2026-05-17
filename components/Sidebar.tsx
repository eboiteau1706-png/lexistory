"use client";
import { useState } from "react";
import styles from "./Sidebar.module.css";

const STREAK = 1;
const STORIES_READ = 1;
const LEVEL = "Intermédiaire";

export default function Sidebar() {
  const [loading, setLoading] = useState(false);

  async function handlePremium() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (e) {
      alert("Erreur, réessaie.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <aside className={styles.sidebar}>
      {/* Streak */}
      <div className={styles.card}>
        <p className={styles.cardTitle}>🔥 Ta série</p>
        <div className={styles.streakDisplay}>
          <div className={styles.streakNum}>{STREAK}</div>
          <div className={styles.streakSub}>jour consécutif</div>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.card}>
        <p className={styles.cardTitle}>📊 Mes stats</p>
        <div className={styles.statRow}>
          <span className={styles.statLabel}>Histoires lues</span>
          <span className={styles.statVal}>{STORIES_READ}</span>
        </div>
        <div className={styles.statRow}>
          <span className={styles.statLabel}>Niveau actuel</span>
          <span className={`${styles.statVal} ${styles.gold}`}>{LEVEL}</span>
        </div>
      </div>

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
