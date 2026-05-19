"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { getLevel, getXpProgress } from "@/lib/xp";
import styles from "../profile/profile.module.css";

export default function ProfilPublicPage({ params }: { params: { username: string } }) {
  const supabase = createClient();
  const [profile, setProfile]     = useState<any>(null);
  const [wordsCount, setWordsCount] = useState(0);
  const [storiesCount, setStoriesCount] = useState(0);
  const [streak, setStreak]       = useState(0);
  const [loading, setLoading]     = useState(true);
  const [notFound, setNotFound]   = useState(false);

  useEffect(() => {
    const username = decodeURIComponent(params.username);

    supabase.from("profiles").select("id, username, xp, is_premium").eq("username", username).single()
      .then(async ({ data }) => {
        if (!data) { setNotFound(true); setLoading(false); return; }
        setProfile(data);

        const { count: wc } = await supabase.from("words_seen").select("word", { count: "exact" }).eq("user_id", data.id);
        setWordsCount(wc ?? 0);

        const { count: sc } = await supabase.from("stories_read").select("story_slug", { count: "exact" }).eq("user_id", data.id);
        setStoriesCount(sc ?? 0);

        const { data: reads } = await supabase.from("stories_read").select("read_at").eq("user_id", data.id).order("read_at", { ascending: false });
        if (reads && reads.length > 0) {
          let s = 1;
          const dates = [...new Set(reads.map((d: any) => new Date(d.read_at).toDateString()))];
          for (let i = 1; i < dates.length; i++) {
            const diff = (new Date(dates[i-1]).getTime() - new Date(dates[i]).getTime()) / 86400000;
            if (diff === 1) s++; else break;
          }
          setStreak(s);
        }
        setLoading(false);
      });
  }, [params.username]);

  if (loading) return <div style={{ padding: "120px 24px", textAlign: "center", color: "var(--text-dim)" }}>Chargement...</div>;
  if (notFound) return (
    <div style={{ padding: "120px 24px", textAlign: "center" }}>
      <p style={{ color: "var(--text-dim)" }}>Joueur introuvable.</p>
      <a href="/classement" style={{ color: "var(--accent)" }}>← Retour au classement</a>
    </div>
  );

  const level = getLevel(profile.xp);
  const { current, needed, pct } = getXpProgress(profile.xp);
  const initial = (profile.username?.[0] || "?").toUpperCase();

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.avatar}>{initial}</div>
        {profile.is_premium && <div className={styles.premiumBadge}>✨ Premium</div>}

        <div className={styles.nameWrap}>
          <div className={styles.displayName}>{profile.username}</div>
        </div>

        {/* XP */}
        <div className={styles.xpCard}>
          <div className={styles.xpHeader}>
            <div className={styles.xpLevel}>{level.emoji} Niveau {level.level} — {level.name}</div>
            <div className={styles.xpTotal}>{profile.xp} XP</div>
          </div>
          <div className={styles.xpBarWrap}>
            <div className={styles.xpBarFill} style={{ width: `${pct}%` }} />
          </div>
          <div className={styles.xpFooter}>
            <span>{current} / {needed} XP</span>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.statBox}>
            <div className={styles.statNum}>{streak}</div>
            <div className={styles.statLabel}>🔥 Série</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statNum}>{storiesCount}</div>
            <div className={styles.statLabel}>📖 Histoires</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statNum}>{wordsCount}</div>
            <div className={styles.statLabel}>✨ Mots</div>
          </div>
        </div>

        <a href="/classement" className={styles.backBtn}>← Retour au classement</a>
      </div>
    </div>
  );
}
