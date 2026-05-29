"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { getLevel, getXpProgress } from "@/lib/xp";
import { getAvatarUrl } from "@/lib/avatar";
import styles from "../../profile/profile.module.css";

export default function ProfilPublicPage() {
  const params  = useParams();
  const username = decodeURIComponent(params.username as string);
  const supabase = createClient();

  const [profile, setProfile]           = useState<any>(null);
  const [wordsCount, setWordsCount]     = useState(0);
  const [storiesCount, setStoriesCount] = useState(0);
  const [streak, setStreak]             = useState(0);
  const [loading, setLoading]           = useState(true);
  const [notFound, setNotFound]         = useState(false);
  const [notAllowed, setNotAllowed]     = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const myId = session?.user?.id;

      // Charge le profil cible
      const { data: target } = await supabase
        .from("profiles")
        .select("id, username, xp, is_premium, avatar_url")
        .eq("username", username)
        .single();

      if (!target) { setNotFound(true); setLoading(false); return; }

      // Vérifie si c'est soi-même
      if (myId === target.id) {
        window.location.href = "/profile";
        return;
      }

      // Vérifie si ami
      if (myId) {
        const { data: friendship } = await supabase
          .from("friendships")
          .select("id")
          .or(`and(user_id.eq.${myId},friend_id.eq.${target.id}),and(user_id.eq.${target.id},friend_id.eq.${myId})`)
          .eq("status", "accepted")
          .single();

        if (!friendship) { setNotAllowed(true); setLoading(false); return; }
      } else {
        setNotAllowed(true); setLoading(false); return;
      }

      setProfile(target);

      const { count: wc } = await supabase.from("words_seen").select("word", { count: "exact" }).eq("user_id", target.id);
      setWordsCount(wc ?? 0);

      const { count: sc } = await supabase.from("stories_read").select("story_slug", { count: "exact" }).eq("user_id", target.id);
      setStoriesCount(sc ?? 0);

      const { data: reads } = await supabase.from("stories_read").select("read_at").eq("user_id", target.id).order("read_at", { ascending: false });
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
    };

    load();
  }, [username]);

  if (loading) return (
    <div style={{ padding: "120px 24px", textAlign: "center", color: "var(--text-dim)" }}>
      Chargement...
    </div>
  );

  if (notFound) return (
    <div style={{ padding: "120px 24px", textAlign: "center", display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
      <p style={{ color: "var(--text-dim)" }}>Joueur introuvable.</p>
      <a href="/classement" style={{ color: "var(--accent)" }}>← Retour au classement</a>
    </div>
  );

  if (notAllowed) return (
    <div style={{ padding: "120px 24px", textAlign: "center", display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
      <p style={{ color: "var(--text-dim)", fontSize: "1.5rem" }}>🔒</p>
      <p style={{ color: "var(--text-muted)" }}>Tu dois être ami avec ce joueur pour voir son profil.</p>
      <a href="/amis" style={{ color: "var(--accent)" }}>Gérer mes amis →</a>
    </div>
  );

  const level = getLevel(profile.xp);
  const { current, needed, pct } = getXpProgress(profile.xp);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.avatar}>
          <img src={getAvatarUrl(profile.avatar_url)} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        {profile.is_premium && <div className={styles.premiumBadge}>✨ Premium</div>}

        <div className={styles.nameWrap}>
          <div className={styles.displayName}>{profile.username}</div>
        </div>

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
