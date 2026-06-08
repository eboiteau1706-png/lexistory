"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { STORIES } from "@/lib/stories";
import type { Story } from "@/lib/stories";

const REFERENCE = new Date("2026-05-17T00:00:00");

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

const CATEGORY_EMOJI: Record<string, string> = {
  Sport: "🏆", Histoire: "📜", Science: "🔬", Art: "🎨",
  Gastronomie: "🍽️", Cinéma: "🎬", Musique: "🎵", Géographie: "🌍",
  Économie: "💰", Littérature: "📚", Philosophie: "🤔", Nature: "🌿",
  Technologie: "💻", Société: "👥", Psychologie: "🧠", Astronomie: "🔭",
  Biologie: "🧬", Médecine: "🏥", Architecture: "🏛️", Religion: "✨",
  Mathématiques: "📐", Politique: "🗳️",
  "Corps humain": "🫀", Culture: "🎭", Linguistique: "💬",
  Neurosciences: "🧬", Santé: "💊", Insolite: "🤯",
};
const getCatEmoji = (cat: string) => CATEGORY_EMOJI[cat] ?? "📖";

function getParisNow() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" }));
}

function getTodayISO(): string {
  const p = getParisNow();
  return `${p.getFullYear()}-${String(p.getMonth() + 1).padStart(2, "0")}-${String(p.getDate()).padStart(2, "0")}`;
}

export default function CategoryModal({ category: initialCategory, currentLevel, onClose }: Props) {
  const supabase = createClient();
  const [isPremium, setIsPremium] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(initialCategory ?? null);
  const [customStories, setCustomStories] = useState<Story[]>([]);

  useEffect(() => {
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
    supabase.from("stories_custom").select("*").then(({ data }) => {
      if (data) setCustomStories(data.map((c: any) => ({
        slug:          c.slug ?? `custom-${c.date}-${c.level}`,
        date:          c.date,
        title:         c.title,
        category:      c.category,
        level:         c.level as Story["level"],
        readTime:      c.read_time ?? "3 min de lecture",
        source:        c.source ?? "",
        paragraphs:    Array.isArray(c.paragraphs) ? c.paragraphs : [],
        avg_rating:    c.avg_rating    ?? 0,
        ratings_count: c.ratings_count ?? 0,
      })));
    });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const todayISO = getTodayISO();
  const allStories = [...STORIES, ...customStories];
  const allCategories = [...new Set(allStories.flatMap(s => s.category.split(" · ")))].sort();

  function isToday(story: Story)  { return story.date === todayISO; }
  function isFuture(story: Story) { return story.date > todayISO; }

  function getStoriesForCategory(cat: string) {
    // Déduplique par titre — si une histoire est republiquée, on garde la plus ancienne date
    const byTitle: Record<string, Story> = {};
    allStories
      .filter(s => s.category === cat || s.category.split(" · ").includes(cat))
      .filter(s => !isFuture(s))
      .forEach(s => {
        const key = s.title.trim().toLowerCase();
        if (!byTitle[key]) { byTitle[key] = s; return; }
        const existing = byTitle[key];
        const sameContent = JSON.stringify(s.paragraphs) === JSON.stringify(existing.paragraphs);
        if (sameContent) {
          if (s.date < existing.date) byTitle[key] = s; // même contenu → garder la plus ancienne
        } else {
          if (s.date > existing.date) byTitle[key] = s; // contenu modifié → garder la plus récente
        }
      });
    return Object.values(byTitle).sort((a, b) => {
      const rDiff = (b.avg_rating ?? 0) - (a.avg_rating ?? 0);
      return rDiff !== 0 ? rDiff : new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  function handleStoryClick(story: Story) {
    if (!isPremium && !isToday(story)) return;
    const dayNum = Math.floor((new Date(story.date + "T00:00:00").getTime() - REFERENCE.getTime()) / 86400000);
    window.location.href = `/?level=${story.level}&day=${dayNum}`;
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
          maxWidth: showCategoryList && !expandedCategory ? "700px" : "520px",
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
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.35rem", fontWeight: 700, color: "var(--accent)", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              {showCategoryList && expandedCategory
                ? <><button onClick={() => setExpandedCategory(null)} style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", fontSize: "0.9rem", padding: "0 4px 0 0", fontFamily: "inherit" }}>←</button> {getCatEmoji(expandedCategory)} {expandedCategory}</>
                : showCategoryList ? "📚 Catégories d'histoires" : initialCategory}
            </h2>
          </div>
          <button onClick={onClose} style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", color: "var(--text-muted)", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✕</button>
        </div>

        {/* Contenu scrollable — flex: 1 + minHeight: 0 = scroll correct */}
        <div style={{ overflowY: "auto", flex: 1, minHeight: 0, display: "flex", flexDirection: "column", gap: "8px", paddingRight: "4px" }}>
          {showCategoryList && !expandedCategory ? (
            /* ── Grille de catégories ── */
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "10px" }}>
              {allCategories.map(cat => {
                const catStories = getStoriesForCategory(cat);
                if (catStories.length === 0) return null;
                const bestRating = catStories.reduce((m, s) => Math.max(m, s.avg_rating ?? 0), 0);
                return (
                  <button key={cat}
                    onClick={() => setExpandedCategory(cat)}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px", padding: "18px 10px", borderRadius: "14px", background: "var(--surface2)", border: "1px solid var(--border)", cursor: "pointer", fontFamily: "inherit", transition: "border-color 0.15s, background 0.15s", textAlign: "center" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.background = "rgba(232,201,122,0.06)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.background = "var(--surface2)"; }}
                  >
                    <span style={{ fontSize: "32px", lineHeight: 1 }}>{getCatEmoji(cat)}</span>
                    <span style={{ fontWeight: 600, fontSize: "0.82rem", color: "var(--text)", lineHeight: 1.3 }}>{cat}</span>
                    <span style={{ fontSize: "0.68rem", color: "var(--text-dim)" }}>{catStories.length} histoire{catStories.length > 1 ? "s" : ""}</span>
                    {bestRating > 0 && <span style={{ fontSize: "0.68rem", color: "#d4a843" }}>★ {bestRating.toFixed(1)}</span>}
                  </button>
                );
              })}
            </div>
          ) : showCategoryList && expandedCategory ? (
            /* ── Liste d'histoires de la catégorie sélectionnée ── */
            <>{getStoriesForCategory(expandedCategory).map(story => {
              const today = isToday(story);
              const locked = !today && !isPremium;
              return (
                <div key={story.slug} onClick={() => handleStoryClick(story)}
                  style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", borderRadius: "12px", background: today ? "rgba(232,201,122,0.07)" : "var(--surface2)", border: `1px solid ${today ? "rgba(232,201,122,0.3)" : "var(--border)"}`, cursor: locked ? "default" : "pointer", opacity: locked ? 0.55 : 1, flexShrink: 0 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "2px 8px", borderRadius: "50px", background: today ? "rgba(232,201,122,0.18)" : "var(--surface)", border: "1px solid var(--border)", color: today ? "var(--accent)" : "var(--text-dim)" }}>
                        {LEVEL_EMOJI[story.level]} {story.level}
                      </span>
                      {today && <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--accent)", padding: "2px 8px", borderRadius: "50px", background: "rgba(232,201,122,0.12)", border: "1px solid rgba(232,201,122,0.3)" }}>Aujourd'hui ✨</span>}
                      {locked && <span style={{ fontSize: "0.68rem", color: "var(--text-dim)" }}>🔒 Premium</span>}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{ fontSize: "0.88rem", fontWeight: 600, color: locked ? "var(--text-dim)" : "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, minWidth: 0 }}>
                        {locked ? "Histoire Premium" : story.title}
                      </div>
                      <span style={{ fontSize: "13px", color: "#d4a843", flexShrink: 0 }}>
                        ★ {story.avg_rating && story.avg_rating > 0 ? story.avg_rating.toFixed(1) : "—"}
                      </span>
                    </div>
                    {!locked && <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "2px" }}>{story.readTime}</div>}
                  </div>
                  {!locked && <span style={{ color: "var(--text-dim)", fontSize: "0.85rem", flexShrink: 0 }}>→</span>}
                </div>
              );
            })}</>
          ) : !showCategoryList ? (
            /* ── Vue catégorie fournie en prop ── */
            <>{getStoriesForCategory(initialCategory!).map(story => {
              const today = isToday(story);
              const locked = !today && !isPremium;
              return (
                <div key={story.slug} onClick={() => handleStoryClick(story)}
                  style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", borderRadius: "12px", background: today ? "rgba(232,201,122,0.07)" : "var(--surface2)", border: `1px solid ${today ? "rgba(232,201,122,0.3)" : "var(--border)"}`, cursor: locked ? "default" : "pointer", opacity: locked ? 0.55 : 1, flexShrink: 0 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div key="badges" style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "2px 8px", borderRadius: "50px", background: today ? "rgba(232,201,122,0.18)" : "var(--surface)", border: "1px solid var(--border)", color: today ? "var(--accent)" : "var(--text-dim)" }}>
                        {LEVEL_EMOJI[story.level]} {story.level}
                      </span>
                      {today && <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--accent)", padding: "2px 8px", borderRadius: "50px", background: "rgba(232,201,122,0.12)", border: "1px solid rgba(232,201,122,0.3)" }}>Aujourd'hui ✨</span>}
                      {locked && <span style={{ fontSize: "0.68rem", color: "var(--text-dim)" }}>🔒 Premium</span>}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{ fontSize: "0.88rem", fontWeight: 600, color: locked ? "var(--text-dim)" : "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, minWidth: 0 }}>
                        {locked ? "Histoire Premium" : story.title}
                      </div>
                      <span style={{ fontSize: "13px", color: "#d4a843", flexShrink: 0 }}>
                        ★ {story.avg_rating && story.avg_rating > 0 ? story.avg_rating.toFixed(1) : "—"}
                      </span>
                    </div>
                    {!locked && <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "2px" }}>{story.readTime}</div>}
                  </div>
                  {!locked && <span style={{ color: "var(--text-dim)", fontSize: "0.85rem", flexShrink: 0 }}>→</span>}
                </div>
              );
            })}</>
          ) : null}
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
