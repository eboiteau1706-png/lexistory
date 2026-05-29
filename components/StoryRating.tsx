"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";

interface Props {
  storyId: string;
  initialAvg?: number;
  initialCount?: number;
}

export default function StoryRating({ storyId, initialAvg = 0, initialCount = 0 }: Props) {
  const supabase = createClient();
  const [avg, setAvg]               = useState(initialAvg);
  const [count, setCount]           = useState(initialCount);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hovered, setHovered]       = useState<number | null>(null);
  const [clicked, setClicked]       = useState<number | null>(null);
  const [session, setSession]       = useState<any>(null);
  const [loading, setLoading]       = useState(false);

  useEffect(() => {
    setUserRating(null);
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      if (s?.user?.id) {
        supabase.from("story_ratings")
          .select("rating")
          .eq("user_id", s.user.id)
          .eq("story_id", storyId)
          .maybeSingle()
          .then(({ data }) => { if (data) setUserRating(data.rating); });
      }
    });
  }, [storyId]);

  async function handleRate(star: number) {
    if (!session || loading) return;
    setClicked(star);
    setTimeout(() => setClicked(null), 200);
    setLoading(true);
    try {
      const res = await fetch("/api/rate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${session.access_token}` },
        body: JSON.stringify({ story_id: storyId, rating: star }),
      });
      const data = await res.json();
      if (data.success) { setUserRating(star); setAvg(data.avg_rating); setCount(data.ratings_count); }
    } catch {}
    setLoading(false);
  }

  const display = hovered ?? userRating ?? 0;

  return (
    <>
      <style>{`@keyframes starPop{0%,100%{transform:scale(1)}50%{transform:scale(1.3)}}`}</style>

      {/* Séparateur haut */}
      <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.08)", margin: "0 0 12px" }} />

      <div style={{ margin: "0 auto 12px", textAlign: "center" }}>
        {/* Étoiles */}
        <div style={{ display: "inline-flex", gap: "6px", marginBottom: "8px" }}>
          {[1, 2, 3, 4, 5].map(star => {
            const active = star <= display;
            return (
              <button
                key={star}
                onClick={() => session ? handleRate(star) : undefined}
                onMouseEnter={() => session ? setHovered(star) : undefined}
                onMouseLeave={() => setHovered(null)}
                disabled={loading}
                title={session ? `${star}/5` : "Connecte-toi pour noter"}
                style={{
                  background: "none", border: "none", padding: 0,
                  fontSize: "32px", lineHeight: 1,
                  cursor: session ? "pointer" : "default",
                  color: active ? "#d4a843" : "#3a3a3a",
                  filter: active ? "drop-shadow(0 0 4px rgba(212,168,67,0.6))" : "none",
                  transition: "color 0.15s, filter 0.15s",
                  animation: clicked === star ? "starPop 0.2s ease" : "none",
                }}
              >★</button>
            );
          })}
        </div>

        {/* Note + votes */}
        <div style={{ fontSize: "13px", color: "#888" }}>
          {count > 0 ? (
            <span>{avg.toFixed(1)} ★ &nbsp;•&nbsp; {count} vote{count > 1 ? "s" : ""}</span>
          ) : (
            <span style={{ color: "#555", fontStyle: "italic" }}>
              {session ? "Sois le premier à noter !" : "Connecte-toi pour noter"}
            </span>
          )}
        </div>
      </div>

      {/* Séparateur bas */}
      <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.08)", margin: "0 0 16px" }} />
    </>
  );
}
