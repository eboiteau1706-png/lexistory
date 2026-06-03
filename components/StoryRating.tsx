"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";

const ADMIN_ID = "0450c58e-35b2-47e6-9600-13db5626e96d";

interface Props {
  storyId: string;
  initialAvg?: number;
  initialCount?: number;
}

interface Voter { username: string | null; rating: number; created_at: string; }

export default function StoryRating({ storyId, initialAvg = 0, initialCount = 0 }: Props) {
  const supabase = createClient();
  const [avg, setAvg]               = useState(initialAvg);
  const [count, setCount]           = useState(initialCount);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hovered, setHovered]       = useState<number | null>(null);
  const [clicked, setClicked]       = useState<number | null>(null);
  const [session, setSession]       = useState<any>(null);
  const [isAdmin, setIsAdmin]       = useState(false);
  const [loading, setLoading]       = useState(false);
  const [showVoters, setShowVoters] = useState(false);
  const [voters, setVoters]         = useState<Voter[]>([]);
  const [votersLoading, setVotersLoading] = useState(false);

  useEffect(() => {
    setUserRating(null);
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setIsAdmin(s?.user?.id === ADMIN_ID);
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

  async function openVoters() {
    setShowVoters(true);
    setVotersLoading(true);

    // Étape 1 : fetch ratings
    const { data: ratings, error } = await supabase
      .from("story_ratings")
      .select("rating, created_at, user_id")
      .eq("story_id", storyId)
      .order("created_at", { ascending: false });

    console.log("[VotersModal] story_id:", storyId, "result:", ratings, "error:", error);

    if (ratings && ratings.length > 0) {
      // Étape 2 : fetch profiles pour chaque user_id (évite la dépendance à la FK PostgREST)
      const userIds = ratings.map((r: any) => r.user_id);
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, username, avatar_url")
        .in("id", userIds);

      const profileMap: Record<string, any> = Object.fromEntries(
        (profiles ?? []).map((p: any) => [p.id, p])
      );

      setVoters(ratings.map((r: any) => ({
        username: profileMap[r.user_id]?.username ?? "Anonyme",
        rating: r.rating,
        created_at: r.created_at,
      })));
    } else {
      setVoters([]);
    }
    setVotersLoading(false);
  }

  const display = hovered ?? userRating ?? 0;
  const stars = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);

  return (
    <>
      <style>{`@keyframes starPop{0%,100%{transform:scale(1)}50%{transform:scale(1.3)}}`}</style>

      <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.08)", margin: "0 0 12px" }} />

      <div style={{ margin: "0 auto 12px", textAlign: "center" }}>
        {/* Étoiles */}
        <div style={{ display: "inline-flex", gap: "6px", marginBottom: "8px" }}>
          {[1, 2, 3, 4, 5].map(star => {
            const active = star <= display;
            return (
              <button key={star}
                onClick={() => session ? handleRate(star) : undefined}
                onMouseEnter={() => session ? setHovered(star) : undefined}
                onMouseLeave={() => setHovered(null)}
                disabled={loading}
                title={session ? `${star}/5` : "Connecte-toi pour noter"}
                style={{ background: "none", border: "none", padding: 0, fontSize: "32px", lineHeight: 1,
                  cursor: session ? "pointer" : "default",
                  color: active ? "#d4a843" : "#3a3a3a",
                  filter: active ? "drop-shadow(0 0 4px rgba(212,168,67,0.6))" : "none",
                  transition: "color 0.15s, filter 0.15s",
                  animation: clicked === star ? "starPop 0.2s ease" : "none",
                }}>★</button>
            );
          })}
        </div>

        {/* Phrase explicative */}
        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", textAlign: "center", fontStyle: "italic", marginTop: "4px", marginBottom: "4px" }}>
          Ta note aide à trier les histoires dans Explorer par catégorie.
        </div>

        {/* Note */}
        <div style={{ fontSize: "13px", color: "#888" }}>
          {count > 0 ? (
            isAdmin ? (
              <span>
                {avg.toFixed(1)} ★ &nbsp;•&nbsp;{" "}
                <button onClick={openVoters}
                  style={{ background: "none", border: "none", color: "#d4a843", cursor: "pointer", fontFamily: "inherit", fontSize: "13px", textDecoration: "underline", padding: 0 }}>
                  {count} vote{count > 1 ? "s" : ""}
                </button>
              </span>
            ) : (
              <span>{avg.toFixed(1)} ★</span>
            )
          ) : (
            <span style={{ color: "#555", fontStyle: "italic" }}>
              {session ? "Sois le premier à noter !" : "Connecte-toi pour noter"}
            </span>
          )}
        </div>
      </div>

      <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.08)", margin: "0 0 16px" }} />

      {/* Modale liste des votants (admin only) */}
      {showVoters && (
        <div onClick={() => setShowVoters(false)}
          style={{ position: "fixed", inset: 0, zIndex: 600, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px", maxWidth: "420px", width: "100%", maxHeight: "70vh", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexShrink: 0 }}>
              <div style={{ fontFamily: "var(--font-playfair)", fontSize: "1rem", fontWeight: 700, color: "var(--accent)" }}>
                ★ Votes — {avg.toFixed(1)} / 5
              </div>
              <button onClick={() => setShowVoters(false)}
                style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", fontSize: "1.2rem", padding: "0 4px" }}>✕</button>
            </div>
            {votersLoading ? (
              <div style={{ textAlign: "center", color: "var(--text-dim)", padding: "24px" }}>Chargement…</div>
            ) : voters.length === 0 ? (
              <div style={{ textAlign: "center", color: "var(--text-dim)", padding: "16px", fontStyle: "italic" }}>Aucun vote pour l'instant.</div>
            ) : (
              <div style={{ overflowY: "auto", flex: 1 }}>
                {voters.map((v, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                    <div>
                      <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text)" }}>{v.username}</div>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>
                        {new Date(v.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                      </div>
                    </div>
                    <div style={{ color: "#d4a843", fontSize: "1rem", letterSpacing: "1px" }}>{stars(v.rating)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
