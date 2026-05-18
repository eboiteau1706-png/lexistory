"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase";
import WordPopup from "./WordPopup";
import ClickableText from "./ClickableText";
import styles from "./StoryCard.module.css";
import type { Story } from "@/lib/stories";

interface Props { story: Story; }

export default function StoryCard({ story }: Props) {
  const [seenWords, setSeenWords]   = useState<Set<string>>(new Set());
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [userId, setUserId]         = useState<string | null>(null);
  const storyReadRef                = useRef(false);
  const supabase = createClient();

  // Reset quand l'histoire change
  useEffect(() => {
    setSeenWords(new Set());
    setActiveWord(null);
    storyReadRef.current = false;
  }, [story.slug]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) setUserId(session.user.id);
    });
  }, []);

  // Marque l'histoire comme lue après 5 secondes
  useEffect(() => {
    if (!userId || !story.slug || storyReadRef.current) return;
    const timer = setTimeout(async () => {
      if (storyReadRef.current) return;
      storyReadRef.current = true;
      const { data } = await supabase
        .from("stories_read")
        .select("id")
        .eq("user_id", userId)
        .eq("story_slug", story.slug)
        .single();
      if (!data) {
        await supabase.from("stories_read").insert({
          user_id: userId,
          story_slug: story.slug,
          story_level: story.level,
        });
        // Signal pour rafraîchir les stats
        window.dispatchEvent(new CustomEvent("lexistory:story-read"));
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [userId, story.slug]);

  // Clic sur un mot → popup + sauvegarde immédiate + signal stats
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

  // Barre de progression par histoire
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

      {activeWord && (
      {activeWord && (
        <WordPopup word={activeWord} seenCount={seenWords.size} onClose={() => setActiveWord(null)} />
      )}
    </>
  );
}
