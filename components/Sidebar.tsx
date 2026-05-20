"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import { STORIES } from "@/lib/stories";
import { getLevel, getXpProgress } from "@/lib/xp";
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
  const [xp, setXp]                     = useState(0);
  const [showHistory, setShowHistory]   = useState(false);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const supabase = createClient();
  const router   = useRouter();
  const searchParams = useSearchParams();
  const level = (searchParams.get("level") as Story["level"]) ?? "Lecteur";

  const reference    = new Date("2026-05-17T00:00:00");
  const parisNow     = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" }));
  const diffDays     = Math.floor((parisNow.getTime() - reference.getTime()) / (1000 * 60 * 60 * 24));
  const levelStories = STORIES.filter(s => s.level === level);
  const currentIndex = diffDays % levelStories.length;
  const availableStories = levelStories.slice(0, currentIndex + 1).reverse();

  async function loadStats(uid: string) {
    const { data: profile } = await supabase.from("profiles").select("is_premium, xp").eq("id", uid).single();
    if (profile?.is_premium) setIsPremium(true);
    setXp(profile?.xp ?? 0);

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

    const onWordSeen = () => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) loadStats(session.user.id);
      });
    };
    const onStoryRead = () => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) loadStats(session.user.id);
      });
    };
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

  function handleLockedStoryClick() {
    setShowPremiumPopup(true);
  }

  const lvl  = getLevel(xp);
  const { pct, current, needed } = getXpProgress(xp);

  if (!ready) return null;

  return (
    <>
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
              <div className={styles.statRow} style={{ cursor: "pointer" }} onClick={() => router.push("/rangs")}>
                <span className={styles.statLabel}>Niveau actuel</span>
                <span className={`${styles.statVal} ${styles.gold}`}>{lvl.emoji} {lvl.name}</span>
              </div>
              <div className={styles.xpBarSidebar}>
                <div className={styles.xpBarFillSidebar} style={{ width: `${pct}%` }} />
              </div>
              <div className={styles.xpLabelSidebar}>{xp} XP · {current}/{needed}</div>
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

        {/* Histoires passées — visible pour tous, cliquable seulement Premium */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>
            📅 Histoires passées
            {!isPremium && <span className={styles.premiumTag}>Premium</span>}
          </p>
          <button
            className={styles.historyBtn}
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? "↑ Fermer" : "Voir les histoires →"}
          </button>

          {showHistory && (
            <div className={`${styles.historyList} ${!isPremium ? styles.historyListBlurred : ""}`}>
              {availableStories.map((s, i) => {
                const realIndex = currentIndex - i;
                const isToday = realIndex === currentIndex;
                return (
                  <button
                    key={s.slug}
                    className={`${styles.historyItem} ${isToday ? styles.historyItemActive : ""} ${!isPremium && !isToday ? styles.historyItemLocked : ""}`}
                    onClick={() => {
                      if (!isPremium && !isToday) {
                        handleLockedStoryClick();
                        return;
                      }
                      router.push(`/?level=${level}&day=${realIndex}`);
                    }}
                  >
                    <span className={styles.historyDot} />
                    <div className={styles.historyContent}>
                      <span className={styles.historyDay}>
                        {isToday ? "Aujourd'hui" : `Jour ${realIndex + 1}`}
                      </span>
                      <span className={styles.historyTitle}>{s.title}</span>
                    </div>
                    {!isPremium && !isToday && <span className={styles.lockIcon}>🔒</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {!isPremium && (
          <div className={styles.premiumCard}>
            <div className={styles.premiumTitle}>✨ Passe Premium</div>
            <div className={styles.premiumText}>Histoires illimitées, stats avancées et accès aux histoires passées.</div>
            <div className={styles.premiumPrice}>1,99€ <span>/ mois</span></div>
            <button className={styles.btnUpgrade} onClick={handlePremium} disabled={loading}>
              {loading ? "Chargement..." : "Passer Premium →"}
            </button>
          </div>
        )}
      </aside>

      {/* Popup Premium si clic sur histoire verrouillée */}
      {showPremiumPopup && (
        <div
          onClick={() => setShowPremiumPopup(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 300,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
            padding: "24px",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "var(--surface)",
              border: "1px solid rgba(232,201,122,0.3)",
              borderRadius: "16px",
              padding: "28px",
              maxWidth: "340px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2rem" }}>✨</div>
            <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 700, color: "var(--text)" }}>
              Fonctionnalité Premium
            </p>
            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
              Accède à toutes les histoires passées avec LexiStory Premium.
            </p>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--accent)" }}>
              1,99€ / mois — sans engagement
            </div>
            <button
              style={{
                width: "100%", padding: "12px", borderRadius: "10px",
                background: "var(--accent)", border: "none",
                color: "var(--bg)", fontFamily: "inherit",
                fontSize: "0.95rem", fontWeight: 700, cursor: "pointer",
              }}
              onClick={() => { setShowPremiumPopup(false); handlePremium(); }}
              disabled={loading}
            >
              {loading ? "Chargement..." : "Passer Premium →"}
            </button>
            <button
              style={{
                background: "none", border: "none", color: "var(--text-dim)",
                fontFamily: "inherit", fontSize: "0.82rem", cursor: "pointer",
              }}
              onClick={() => setShowPremiumPopup(false)}
            >
              Plus tard
            </button>
          </div>
        </div>
      )}
    </>
  );
}
