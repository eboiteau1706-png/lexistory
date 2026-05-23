"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { STORIES } from "@/lib/stories";
import type { Story } from "@/lib/stories";

interface Props {
  category?: string;
  currentLevel?: Story["level"];
  onClose: () => void;
}

const LEVEL_EMOJI: Record<string, string> = {
  "Curieux": "🌱",
  "Lecteur": "📖",
  "Érudit":  "🎓",
};

function getParisNow() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" }));
}

function getDayIndex(levelStories: Story[]) {
  const reference = new Date("2026-05-17T00:00:00");
  const paris = getParisNow();
  const diffDays = Math.floor((paris.getTime() - reference.getTime()) / 86400000);
  return Math.abs(diffDays) % levelStories.length;
}

function getTodaySlug(level: Story["level"]) {
  const levelStories = STORIES.filter(s => s.level === level);
  return levelStories[getDayIndex(levelStories)]?.slug ?? "";
}

const TODAY_SLUGS = {
  "Curieux": getTodaySlug("Curieux"),
  "Lecteur": getTodaySlug("Lecteur"),
  "Érudit":  getTodaySlug("Érudit"),
};

const ALL_CATEGORIES = [...new Set(
  STORIES.flatMap(s => s.category.split(" · "))
)].sort();

function isFuture(story: Story) {
  const levelStories = STORIES.filter(s => s.level === story.level);
  const todayIdx = getDayIndex(levelStories);
  const storyIdx = levelStories.findIndex(s => s.slug === story.slug);
  return storyIdx > todayIdx;
}

function isToday(story: Story) {
  return TODAY_SLUGS[story.level] === story.slug;
}

export default function CategoryModal({ category: initialCategory, currentLevel, onClose }: Props) {
  const supabase = createClient();
  const [isPremium, setIsPremium] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(initialCategory ?? null);

  useEffect(() => {
    // Bloque le scroll de la page en arrière-plan
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

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

  function getStoriesForCategory(cat: string) {
    return STORIES
      .filter(s => s.category === cat || s.category.split(" · ").includes(cat))
      .filter(s => !isFuture(s))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  function handleStoryClick(story: Story) {
    if (!isPremium && !isToday(story)) return;
    const levelStories = STORIES.filter(s => s.level === story.level);
    const dayIdx = levelStories.findIndex(s => s.slug === story.slug);
    window.location.href = `/?level=${story.level}&day=${dayIdx}`;
    onClose();
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  }

  const showCategoryList = !initialCategory;

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 250, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", padding: "24px" }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "20px",
          padding: "28px 24px",
          maxWidth: "520px",
          width: "100%",
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          overflow: "hidden", // ← important
        }}
      >
        {/* Header — fixe */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-dim)", marginBottom: "4px" }}>
              {showCategoryList ? "Explorer" : "Catégorie"}
            </div>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.35rem", fontWeight: 700, color: "var(--accent)", margin: 0 }}>
              {showCategoryList ? "📚 Catégories d'histoires" : initialCategory}
            </h2>
          </div>
          <button onClick={onClose} style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", color: "var(--text-muted)", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✕</button>
        </div>

        {/* Contenu scrollable — flex: 1 + minHeight: 0 = scroll correct */}
        <div style={{ overflowY: "auto", flex: 1, minHeight: 0, display: "flex", flexDirection: "column", gap: "8px", paddingRight: "4px" }}>
          {showCategoryList ? (
            ALL_CATEGORIES.map(cat => {
              const catStories = getStoriesForCategory(cat);
              if (catStories.length === 0) return null;
              const isOpen = expandedCategory === cat;

              return (
                <div key={cat} style={{ borderRadius: "12px", border: "1px solid var(--border)", overflow: "hidden", flexShrink: 0 }}>
                  <button
                    onClick={() => setExpandedCategory(isOpen ? null : cat)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: isOpen ? "rgba(232,201,122,0.07)" : "var(--surface2)", border: "none", cursor: "pointer", color: "var(--text)", fontFamily: "inherit" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontWeight: 600, fontSize: "0.92rem" }}>{cat}</span>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-dim)", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "50px", padding: "1px 8px" }}>
                        {catStories.length} histoire{catStories.length > 1 ? "s" : ""}
                      </span>
                    </div>
                    <span style={{ color: "var(--text-dim)", fontSize: "0.85rem", display: "inline-block", transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>→</span>
                  </button>

                  {isOpen && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)" }}>
                      {catStories.map(story => {
                        const today = isToday(story);
                        const locked = !today && !isPremium;
                        return (
                          <div
                            key={story.slug}
                            onClick={() => handleStoryClick(story)}
                            style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", background: today ? "rgba(232,201,122,0.06)" : "var(--surface)", cursor: locked ? "default" : "pointer", opacity: locked ? 0.55 : 1 }}
                          >
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px", flexWrap: "wrap" }}>
                                <span style={{ fontSize: "0.68rem", color: "var(--text-dim)" }}>{LEVEL_EMOJI[story.level]} {story.level}</span>
                                {today && <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--accent)", padding: "1px 6px", borderRadius: "50px", background: "rgba(232,201,122,0.15)", border: "1px solid rgba(232,201,122,0.3)" }}>Aujourd'hui</span>}
                                {locked && <span style={{ fontSize: "0.65rem", color: "var(--text-dim)" }}>🔒</span>}
                              </div>
                              <div style={{ fontSize: "0.85rem", fontWeight: 600, color: locked ? "var(--text-dim)" : "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {locked ? "Histoire Premium" : story.title}
                              </div>
                              {!locked && <div style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>{formatDate(story.date)}</div>}
                            </div>
                            {!locked && <span style={{ color: "var(--text-dim)", fontSize: "0.8rem", flexShrink: 0 }}>→</span>}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            getStoriesForCategory(initialCategory!).map(story => {
              const today = isToday(story);
              const locked = !today && !isPremium;
              return (
                <div
                  key={story.slug}
                  onClick={() => handleStoryClick(story)}
                  style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", borderRadius: "12px", background: today ? "rgba(232,201,122,0.07)" : "var(--surface2)", border: `1px solid ${today ? "rgba(232,201,122,0.3)" : "var(--border)"}`, cursor: locked ? "default" : "pointer", opacity: locked ? 0.55 : 1, flexShrink: 0 }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "2px 8px", borderRadius: "50px", background: today ? "rgba(232,201,122,0.18)" : "var(--surface)", border: "1px solid var(--border)", color: today ? "var(--accent)" : "var(--text-dim)" }}>
                        {LEVEL_EMOJI[story.level]} {story.level}
                      </span>
                      {today && <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--accent)", padding: "2px 8px", borderRadius: "50px", background: "rgba(232,201,122,0.12)", border: "1px solid rgba(232,201,122,0.3)" }}>Aujourd'hui ✨</span>}
                      {locked && <span style={{ fontSize: "0.68rem", color: "var(--text-dim)" }}>🔒 Premium</span>}
                    </div>
                    <div style={{ fontSize: "0.88rem", fontWeight: 600, color: locked ? "var(--text-dim)" : "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {locked ? "Histoire Premium" : story.title}
                    </div>
                    {!locked && <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "2px" }}>{formatDate(story.date)} · {story.readTime}</div>}
                  </div>
                  {!locked && <span style={{ color: "var(--text-dim)", fontSize: "0.85rem", flexShrink: 0 }}>→</span>}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Premium — fixe */}
        {!isPremium && (
          <div style={{ padding: "12px 14px", borderRadius: "12px", background: "linear-gradient(135deg, #1e1a0e, #2a2210)", border: "1px solid rgba(232,201,122,0.25)", fontSize: "0.82rem", color: "var(--text-muted)", textAlign: "center", lineHeight: 1.5, flexShrink: 0 }}>
            🔒 Les histoires passées sont réservées aux membres{" "}
            <a href="/profile" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 700 }}>Premium</a>
          </div>
        )}
      </div>
    </div>
  );
}
