"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase";
import { getStoryXp, getStreakBonus } from "@/lib/xp";
import WordPopup from "./WordPopup";
import ClickableText from "./ClickableText";
import styles from "./StoryCard.module.css";
import type { Story } from "@/lib/stories";

interface Props { story: Story; }

export default function StoryCard({ story }: Props) {
  const [seenWords, setSeenWords]               = useState<Set<string>>(new Set());
  const [activeWord, setActiveWord]             = useState<string | null>(null);
  const [userId, setUserId]                     = useState<string | null>(null);
  const [isPremium, setIsPremium]               = useState(false);
  const [xpGained, setXpGained]                 = useState<number | null>(null);
  const [readPct, setReadPct]                   = useState(0);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [showInfo, setShowInfo]                 = useState(false);
  const doneRef     = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const supabase = createClient();

  // Reset complet quand l'histoire change
  useEffect(() => {
    setSeenWords(new Set());
    setActiveWord(null);
    setXpGained(null);
    setReadPct(0);
    setAlreadyCompleted(false);
    doneRef.current = false;

    if (!userId) return;

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setReadPct(prev => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 100;
        }
        return prev + 1;
      });
    }, 600);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [story.slug, userId]);

  // Chargement session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserId(session.user.id);
        supabase.from("profiles").select("is_premium").eq("id", session.user.id).single()
          .then(({ data }) => { if (data?.is_premium) setIsPremium(true); });
      }
    });
  }, []);

  // Vérifie si déjà complétée
  useEffect(() => {
    if (!userId) return;
    setAlreadyCompleted(false);
    doneRef.current = false;
    supabase.from("stories_read")
      .select("id")
      .eq("user_id", userId)
      .eq("story_slug", story.slug)
      .single()
      .then(({ data }) => {
        if (data) {
          setAlreadyCompleted(true);
          doneRef.current = true;
        }
      });
  }, [userId, story.slug]);

  // Quand barre = 100% → marque comme lue + XP
  useEffect(() => {
    if (readPct < 100 || !userId || doneRef.current) return;
    doneRef.current = true;

    const markRead = async () => {
      const { data: existing } = await supabase
        .from("stories_read").select("id")
        .eq("user_id", userId).eq("story_slug", story.slug).single();

      if (existing) { setAlreadyCompleted(true); return; }

      await supabase.from("stories_read").insert({
        user_id: userId,
        story_slug: story.slug,
        story_level: story.level,
      });

      const { data: reads } = await supabase
        .from("stories_read").select("read_at")
        .eq("user_id", userId).order("read_at", { ascending: false });

      let streak = 1;
      if (reads && reads.length > 1) {
        const dates = [...new Set(reads.map((d: any) => new Date(d.read_at).toDateString()))];
        for (let i = 1; i < dates.length; i++) {
          const diff = (new Date(dates[i-1]).getTime() - new Date(dates[i]).getTime()) / 86400000;
          if (diff === 1) streak++; else break;
        }
      }

      const storyXp = getStoryXp(isPremium);
      const bonusXp = getStreakBonus(streak, isPremium);
      const totalXp = storyXp + bonusXp;

      const { data: profile } = await supabase
        .from("profiles").select("xp").eq("id", userId).single();
      const currentXp = profile?.xp ?? 0;
      await supabase.from("profiles").update({ xp: currentXp + totalXp }).eq("id", userId);

      setAlreadyCompleted(true);
      setXpGained(totalXp);
      setTimeout(() => setXpGained(null), 3000);
      window.dispatchEvent(new CustomEvent("lexistory:story-read"));
    };

    markRead();
  }, [readPct, userId, story.slug, isPremium]);

  const handleWordClick = useCallback(async (word: string) => {
    setSeenWords(prev => new Set(prev).add(word));
    setActiveWord(word);
    if (userId) {
      await supabase.from("words_seen").upsert(
        { user_id: userId, word },
        { onConflict: "user_id,word" }
      );
      window.dispatchEvent(new CustomEvent("lexistory:word-seen"));
    }
  }, [userId]);

  const displayPct = alreadyCompleted ? 100 : readPct;

  return (
    <>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.tag}>{story.category}</span>
            <h1 className={styles.title}>{story.title}</h1>
            <p className={styles.readTime}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {story.readTime} · Clique sur n&apos;importe quel mot
              <span
                onClick={() => setShowInfo(true)}
                style={{ cursor: "pointer", opacity: 0.6, fontSize: "0.85rem", marginLeft: "6px" }}
              >
                ℹ️
              </span>
            </p>
          </div>
          <span className={styles.levelPill}>{story.level}</span>
        </div>

        <div className={styles.progressWrap}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${displayPct}%`,
                background: alreadyCompleted ? "var(--green)" : undefined,
              }}
            />
          </div>
          <div className={styles.progressLabel}>
            <span>
              {seenWords.size === 0 ? "0 mot consulté"
               : seenWords.size === 1 ? "1 mot consulté"
               : `${seenWords.size} mots consultés`}
            </span>
            {alreadyCompleted
              ? <span style={{ color: "var(--green)", fontWeight: 700 }}>✅ Complétée</span>
              : <span>{readPct}%</span>
            }
          </div>
        </div>

        <div className={styles.body}>
          {story.paragraphs.map((p, i) => (
            <p key={i}>
              <ClickableText text={p} seenWords={seenWords} onWordClick={handleWordClick} />
            </p>
          ))}
        </div>

        <div className={styles.hint}>
          💡 Clique sur un mot pour voir sa définition — les mots consultés passent en{" "}
          <span style={{ color: "var(--green)", fontWeight: 600 }}>vert</span>.
        </div>
      </div>

      {/* Popup XP */}
      {xpGained !== null && (
        <div className={styles.xpPopup}>
          +{xpGained} XP ✨{isPremium ? " (x1.5 Premium)" : ""}
        </div>
      )}

      {/* Popup info dictionnaire */}
      {showInfo && (
        <div
          onClick={() => setShowInfo(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 300,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
            padding: "24px",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "28px",
              maxWidth: "360px",
              width: "100%",
            }}
          >
            <div style={{ fontSize: "1.8rem", marginBottom: "12px" }}>ℹ️</div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: "1.7" }}>
              LexiStory s&apos;améliore chaque jour ! Si une définition est manquante, incorrecte, ou si un nom propre n&apos;est pas reconnu, c&apos;est normal — notre dictionnaire est en constante évolution. Merci de votre compréhension 😊
            </p>
            <button
              style={{
                marginTop: "16px", width: "100%", padding: "10px",
                borderRadius: "10px", background: "var(--surface2)",
                border: "1px solid var(--border)", color: "var(--text-muted)",
                cursor: "pointer", fontFamily: "inherit", fontSize: "0.88rem",
              }}
              onClick={() => setShowInfo(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Popup définition mot */}
      {activeWord && (
        <WordPopup word={activeWord} seenCount={seenWords.size} onClose={() => setActiveWord(null)} />
      )}
    </>
  );
}
