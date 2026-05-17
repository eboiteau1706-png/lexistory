"use client";
import { useState, useCallback } from "react";
import WordPopup from "./WordPopup";
import ClickableText from "./ClickableText";
import styles from "./StoryCard.module.css";
import type { Story } from "@/lib/stories";

interface Props { story: Story; }

export default function StoryCard({ story }: Props) {
  const [seenWords, setSeenWords]   = useState<Set<string>>(new Set());
  const [activeWord, setActiveWord] = useState<string | null>(null);

  const handleWordClick = useCallback((word: string) => {
    setSeenWords(prev => new Set(prev).add(word));
    setActiveWord(word);
  }, []);

  const pct = Math.min(100, Math.round((seenWords.size / 15) * 100));

  return (
    <>
      <div className={styles.card}>
        {/* ── HEADER ── */}
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

        {/* ── PROGRESS ── */}
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

        {/* ── BODY ── */}
        <div className={styles.body}>
          {story.paragraphs.map((p, i) => (
            <p key={i}>
              <ClickableText
                text={p}
                seenWords={seenWords}
                onWordClick={handleWordClick}
              />
            </p>
          ))}
        </div>

        {/* ── HINT ── */}
        <div className={styles.hint}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          Clique sur <strong>n&apos;importe quel mot</strong> pour voir sa définition.
          Les mots consultés passent en <span style={{ color: "var(--green)" }}>vert</span>.
        </div>
      </div>

      {/* ── POPUP ── */}
      {activeWord && (
        <WordPopup
          word={activeWord}
          seenCount={seenWords.size}
          onClose={() => setActiveWord(null)}
        />
      )}
    </>
  );
}
