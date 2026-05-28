"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";

interface Props {
  storyId: string;
  initialAvg?: number;
  initialCount?: number;
}

export default function StoryRating({ storyId, initialAvg = 0, initialCount = 0 }: Props) {
  const supabase   = createClient();
  const [avg, setAvg]           = useState(initialAvg);
  const [count, setCount]       = useState(initialCount);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hovered, setHovered]   = useState<number | null>(null);
  const [session, setSession]   = useState<any>(null);
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
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
    setLoading(true);
    try {
      const res = await fetch("/api/rate-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ story_id: storyId, rating: star }),
      });
      const data = await res.json();
      if (data.success) {
        setUserRating(star);
        setAvg(data.avg_rating);
        setCount(data.ratings_count);
      }
    } catch {}
    setLoading(false);
  }

  const display = hovered ?? userRating ?? 0;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "4px 0 14px", flexWrap: "wrap" }}>
      <div style={{ display: "flex", gap: "3px" }}>
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            onClick={() => session ? handleRate(star) : undefined}
            onMouseEnter={() => session ? setHovered(star) : undefined}
            onMouseLeave={() => setHovered(null)}
            disabled={loading}
            title={session ? `${star}/5` : "Connecte-toi pour noter"}
            style={{
              background: "none", border: "none", padding: "2px",
              fontSize: "1.25rem", lineHeight: 1,
              cursor: session ? "pointer" : "default",
              color: star <= display ? "#d4a843" : "#444",
              transform: hovered === star ? "scale(1.25)" : "scale(1)",
              transition: "color 0.1s, transform 0.1s",
            }}
          >★</button>
        ))}
      </div>

      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
        {count > 0
          ? <>{avg.toFixed(1)} ★ ({count} vote{count > 1 ? "s" : ""})</>
          : <span style={{ color: "var(--text-dim)", fontStyle: "italic" }}>Aucun vote</span>}
      </span>

      {!session && (
        <span style={{ fontSize: "0.7rem", color: "var(--text-dim)", fontStyle: "italic" }}>
          · Connecte-toi pour noter
        </span>
      )}
    </div>
  );
}
