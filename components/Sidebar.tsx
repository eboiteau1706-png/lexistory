"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import { STORIES } from "@/lib/stories";
import type { Story } from "@/lib/stories";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const [loading, setLoading]           = useState(false);
  const [user, setUser]                 = useState<any>(null);
  const [userId, setUserId]             = useState<string | null>(null);
  const [ready, setReady]               = useState(false);
  const [isPremium, setIsPremium]       = useState(false);
  const [wordsCount, setWordsCount]     = useState(0);
  const [storiesCount, setStoriesCount] = useState(0);
  const [streak, setStreak]             = useState(0);
  const [showHistory, setShowHistory]   = useState(false);
  const supabase = createClient();
  const router   = useRouter();
  const searchParams = useSearchParams();
  const level = (searchParams.get("level") as Story["level"]) ?? "Lecteur";
  const levelEmoji: Record<Story["level"], string> = { "Curieux": "🌱", "Lecteur": "📖", "Érudit": "🎓" };

  // Calcul du jour actuel — même logique que page.tsx
  const reference    = new Date("2026-05-17T00:00:00");
  const now          = new Date();
  const diffDays     = Math.floor((now.getTime() - reference.getTime()) / (1000 * 60 * 60 * 24));
  const levelStories = STORIES.filter(s => s.level === level);
  const currentIndex = diffDays % levelStories.length;
  // Histoires disponibles = aujourd'hui + passées seulement
  const availableStories = levelStories.slice(0, currentIndex + 1).reverse();

  async function loadStats(uid: string) {
    const { data: profile } = await supabase.from("profiles").select("is_premium").eq("id", uid).single();
    if (profile?.is_premium) setIsPremium(true);

    const { count: wc } = await supabase.from("words_seen").select("word", { count: "exact" }).eq("user_id", uid);
    setWordsCount(wc ?? 0);

    const { count: sc } = await supabase.from("stories_read").select("story_slug", { count: "exact" }).eq("user_id", uid);
    setStoriesCount(sc ?? 0);

    const { data: reads } = await supabase.from("stories_read").select("read_at").eq("user_id", uid).order("read_at", { ascending: false });
    if (reads && reads.length > 0) {
      let s = 1;
      const dates = [...new Set(reads.map((d: any) => new Date(d.read_at).toDateString()))];
      for (let i = 1; i < dates.length; i++) {
        const diff = (new Date(dates[i-1]).getTime() - new Date(dates[i]).getTime()) / 86400000;
        if (diff === 1) s++; else break;
      }
      setStreak(s);
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setReady(true);
      if (session?.user) {
        setUserId(session.user.id);
        loadStats(session.user.id);
        interval = setInterval(() => loadStats(session.user.id), 30000);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setUserId(session.user.id);
        loadStats(session.user.id);
      }
    });

    const onWordSeen  = () => { if (userId) loadStats(userId); };
    const onStoryRead = () => { if (userId) loadStats(userId); };
    window.addEventListener("lexistory:word-seen", onWordSeen);
    window.addEventListener("lexistory:story-read", onStoryRead);

    return () => {
      listener.subscription.unsubscribe();
      if (interval) clearInterval(interval);
      window.removeEventListener("lexistory:word-seen", onWordSeen);
      window.removeEventListener("lexistory:story-read", onStoryRead);
    };
  }, [userId]);

  async function handlePremium() {
    if (!user) { router.push("/login"); return; }
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
          <div className={styles.card}>
            <p className={styles.cardTitle}>🔥 Ta série</p>
            <div className={styles.streakDisplay}>
              <div className={styles.streakNum}>{streak}</div>
              <div className={styles.streakSub}>jour{streak > 1 ? "s" : ""} consécutif{streak > 1 ? "s" : ""}</div>
            </div>
          </div>

          <div className={styles.card}>
            <p className={styles.cardTitle}>📊 Mes stats</p>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Mots appris</span>
              <span className={`${styles.statVal} ${styles.green}`}>{wordsCount}</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Histoires lues</span>
              <span className={styles.statVal}>{storiesCount}</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Niveau actuel</span>
              <span className={`${styles.statVal} ${styles.gold}`}>{levelEmoji[level]} {level}</span>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.loginCard}>
          <div className={styles.loginIcon}>📖</div>
          <div className={styles.loginTitle}>Suis ta progression</div>
          <div className={styles.loginText}>Connecte-toi pour voir ta série, tes stats et tes mots appris.</div>
          <button className={styles.loginBtn} onClick={() => router.push("/login")}>Se connecter</button>
        </div>
      )}

      {isPremium ? (
        <div className={styles.card}>
          <p className={styles.cardTitle}>✨ Abonné Premium</p>
          <button className={styles.historyBtn} onClick={() => setShowHistory(!showHistory)}>
            {showHistory ? "↑ Fermer" : "📅 Histoires passées"}
          </button>
          {showHistory && (
            <div className={styles.historyList}>
              {availableStories.map((s, i) => {
                const realIndex = currentIndex - i;
                const isToday = realIndex === currentIndex;
                return (
                  <button
                    key={s.slug}
                    className={`${styles.historyItem} ${isToday ? styles.historyItemActive : ""}`}
                    onClick={() => router.push(`/?level=${level}&day=${realIndex}`)}
                  >
                    <span className={styles.historyDot} />
                    <div className={styles.historyContent}>
                      <span className={styles.historyDay}>
                        {isToday ? "Aujourd'hui" : `Jour ${realIndex + 1}`}
                      </span>
                      <span className={styles.historyTitle}>{s.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className={styles.premiumCard}>
          <div className={styles.premiumTitle}>✨ Passe Premium</div>
          <div className={styles.premiumText}>Histoires illimitées, stats avancées et accès aux histoires passées.</div>
          <div className={styles.premiumPrice}>1,99€ <span>/ mois</span></div>
          <button className={styles.btnUpgrade} onClick={handlePremium} disabled={loading}>
            {loading ? "Chargement..." : "Passer Premium →"}
          </button>
        </div>
      )}

      {!isPremium && (
        <div className={styles.lockedCard}>
          <div className={styles.lockedIcon}>🔒</div>
          <div className={styles.lockedText}>
            En Premium, accède à toutes les histoires passées.
          </div>
        </div>
      )}
    </aside>
  );
}
