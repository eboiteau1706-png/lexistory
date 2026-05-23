"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { STORIES } from "@/lib/stories";
import type { Story } from "@/lib/stories";

interface Props {
  category: string;
  currentLevel: Story["level"];
  onClose: () => void;
}

const LEVEL_EMOJI: Record<string, string> = {
  "Curieux": "🌱",
  "Lecteur": "📖",
  "Érudit": "🎓",
};

function getDayIndex(levelStories: Story[]) {
  const reference = new Date("2026-05-17T00:00:00");
  const paris = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" }));
  const diffDays = Math.floor((paris.getTime() - reference.getTime()) / 86400000);
  return Math.abs(diffDays) % levelStories.length;
}

function getTodaySlug(level: Story["level"]) {
  const levelStories = STORIES.filter(s => s.level === level);
  const idx = getDayIndex(levelStories);
  return levelStories[idx]?.slug ?? "";
}

const TODAY_SLUGS = {
  "Curieux": getTodaySlug("Curieux"),
  "Lecteur": getTodaySlug("Lecteur"),
  "Érudit":  getTodaySlug("Érudit"),
};

export default function CategoryModal({ category, currentLevel, onClose }: Props) {
  const supabase = createClient();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        supabase.from("profiles").select("is_premium").eq("id", session.user.id).single()
          .then(({ data }) => { if (data?.is_premium) setIsPremium(true); });
      }
    });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Histoires de cette catégorie (correspondance partielle)
  const categoryStories = STORIES
    .filter(s => s.category === category || s.category.split(" · ").some(c => category.split(" · ").includes(c)))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  function isToday(story: Story) {
    return TODAY_SLUGS[story.level] === story.slug;
  }

  function handleStoryClick(story: Story) {
    const locked = !isToday(story) && !isPremium;
    if (locked) return;
    const levelStories = STORIES.filter(s => s.level === story.level);
    const dayIdx = levelStories.findIndex(s => s.slug === story.slug);
    window.location.href = `/?level=${story.level}&day=${dayIdx}`;
    onClose();
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  }

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 250, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", padding: "24px" }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "20px", padding: "28px 24px", maxWidth: "500px", width: "100%", maxHeight: "82vh", display: "flex", flexDirection: "column", gap: "16px" }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-dim)", marginBottom: "4px" }}>Catégorie</div>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.35rem", fontWeight: 700, color: "var(--accent)", margin: 0 }}>{category}</h2>
            <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", marginTop: "4px" }}>
              {categoryStories.length} histoire{categoryStories.length > 1 ? "s" : ""}
            </div>
          </div>
          <button onClick={onClose} style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", color: "var(--text-muted)", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✕</button>
        </div>

        {/* Liste */}
        <div style={{ overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px", paddingRight: "2px" }}>
          {categoryStories.map(story => {
            const today = isToday(story);
            const locked = !today && !isPremium;

            return (
              <div
                key={story.slug}
                onClick={() => handleStoryClick(story)}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "12px 14px", borderRadius: "12px",
                  background: today ? "rgba(232,201,122,0.07)" : "var(--surface2)",
                  border: `1px solid ${today ? "rgba(232,201,122,0.3)" : "var(--border)"}`,
                  cursor: locked ? "default" : "pointer",
                  opacity: locked ? 0.55 : 1,
                  transition: "all 0.15s",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "2px 8px", borderRadius: "50px", background: today ? "rgba(232,201,122,0.18)" : "var(--surface)", border: "1px solid var(--border)", color: today ? "var(--accent)" : "var(--text-dim)", whiteSpace: "nowrap" }}>
                      {LEVEL_EMOJI[story.level]} {story.level}
                    </span>
                    {today && (
                      <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--accent)", padding: "2px 8px", borderRadius: "50px", background: "rgba(232,201,122,0.12)", border: "1px solid rgba(232,201,122,0.3)", whiteSpace: "nowrap" }}>
                        Aujourd'hui ✨
                      </span>
                    )}
                    {locked && (
                      <span style={{ fontSize: "0.68rem", color: "var(--text-dim)", whiteSpace: "nowrap" }}>🔒 Premium</span>
                    )}
                  </div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 600, color: locked ? "var(--text-dim)" : "var(--text)", marginBottom: "3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {story.title}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>
                    {formatDate(story.date)} · {story.readTime}
                  </div>
                </div>
                {!locked && (
                  <span style={{ color: "var(--text-dim)", fontSize: "0.85rem", flexShrink: 0 }}>→</span>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Premium si pas premium */}
        {!isPremium && (
          <div style={{ padding: "12px 14px", borderRadius: "12px", background: "linear-gradient(135deg, #1e1a0e, #2a2210)", border: "1px solid rgba(232,201,122,0.25)", fontSize: "0.82rem", color: "var(--text-muted)", textAlign: "center", lineHeight: 1.5 }}>
            🔒 Les histoires passées sont réservées aux membres{" "}
            <a href="/profile" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 700 }}>Premium</a>
          </div>
        )}
      </div>
    </div>
  );
}
