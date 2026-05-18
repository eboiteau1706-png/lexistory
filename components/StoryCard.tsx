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
  const [seenWords, setSeenWords]   = useState<Set<string>>(new Set());
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [userId, setUserId]         = useState<string | null>(null);
  const [isPremium, setIsPremium]   = useState(false);
  const [xpGained, setXpGained]     = useState<number | null>(null);
  const storyReadRef                = useRef(false);
  const supabase = createClient();

  useEffect(() => {
    setSeenWords(new Set());
    setActiveWord(null);
    storyReadRef.current = false;
    setXpGained(null);
  }, [story.slug]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserId(session.user.id);
        supabase.from("profiles").select("is_premium").eq("id", session.user.id).single()
          .then(({ data }) => { if (data?.is_premium) setIsPremium(true); });
      }
    });
  }, []);

  useEffect(() => {
    if (!userId || !story.slug || storyReadRef.current) return;
    const timer = setTimeout(async () => {
      if (storyReadRef.current) return;
      storyReadRef.current = true;

      // Vérifie si déjà lue
      const { data: existing } = await supabase
        .from("stories_read")
        .select("id")
        .eq("user_id", userId)
        .eq("story_slug", story.slug)
        .single();

      if (existing) return; // Déjà lue, pas d'XP

      // Insère l'histoire lue
      await supabase.from("stories_read").insert({
        user_id: userId,
        story_slug: story.slug,
        story_level: story.level,
      });

      // Calcule le streak APRÈS l'insert
      const { data: reads } = await supabase
        .from("stories_read")
        .select("read_at")
        .eq("user_id", userId)
        .order("read_at", { ascending: false });

      // Streak minimum = 1 (la lecture qu'on vient de faire)
      let streak = 1;
      if (reads && reads.length > 1) {
        const dates = [...new Set(reads.map((d: any) => new Date(d.read_at).toDateString()))];
        for (let i = 1; i < dates.length; i++) {
          const diff = (new Date(dates[i-1]).getTime() - new Date(dates[i]).getTime()) / 86400000;
          if (diff === 1) streak++; else break;
        }
      }

      // Calcule l'XP
      const storyXp = getStoryXp(isPremium);
      const bonusXp = getStreakBonus(streak, isPremium);
      const totalXp = storyXp + bonusXp;

      // Récupère l'XP actuel et met à jour
      const { data: profile } = await supabase
        .from("profiles")
        .select("xp")
        .eq("id", userId)
        .single();

      const currentXp = profile?.xp ?? 0;
      await supabase
        .from("profiles")
        .update({ xp: currentXp + totalXp })
        .eq("id", userId);

      setXpGained(totalXp);
      setTimeout(() => setXpGained(null), 3000);
      window.dispatchEvent(new CustomEvent("lexistory:story-read"));

    }, 10000);
    return () => clearTimeout(timer);
  }, [userId, story.slug, isPremium]);

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

  const totalWords = story.paragraphs.join(" ").split(/\s+/).length;
  const pct = Math.min(100, Math.round((seenWords.size / Math.max(totalWords * 0.3, 10)) * 100));

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
            </p>
          </div>
          <span className={styles.levelPill}>{story.level}</span>
        </div>

        <div className={styles.progressWrap}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${pct}%` }} />
          </div>
          <div className={styles.progressLabel}>
            <span>
              {seenWords.size === 0 ? "0 mot consulté"
               : seenWords.size === 1 ? "1 mot consulté"
               : `${seenWords.size} mots consultés`}
            </span>
            <span>{pct}%</span>
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

      {xpGained !== null && (
        <div className={styles.xpPopup}>
          +{xpGained} XP ✨{isPremium ? " (x1.5 Premium)" : ""}
        </div>
      )}

      {activeWord && (
        <WordPopup word={activeWord} seenCount={seenWords.size} onClose={() => setActiveWord(null)} />
      )}
    </>
  );
}
