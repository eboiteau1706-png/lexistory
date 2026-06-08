"use client";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase";

const ADMIN_ID = "0450c58e-35b2-47e6-9600-13db5626e96d";
const LEVELS   = ["Curieux", "Lecteur", "Érudit"] as const;

function getNavDate(offset: number): string {
  const paris = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" }));
  paris.setDate(paris.getDate() + offset);
  return `${paris.getFullYear()}-${String(paris.getMonth() + 1).padStart(2, "0")}-${String(paris.getDate()).padStart(2, "0")}`;
}

function formatDateFr(dateStr: string) {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("fr-FR", {
    weekday: "short", day: "numeric", month: "long",
  });
}

interface Props {
  onQuizChanged?: () => void;
}

export default function AdminQuizPanel({ onQuizChanged }: Props) {
  const supabase = createClient();

  const [isAdmin, setIsAdmin]       = useState(false);
  const [token, setToken]           = useState<string | null>(null);
  const [navOffset, setNavOffset]   = useState(0);
  const [level, setLevel]           = useState<string>("Curieux");
  const [quizExists, setQuizExists] = useState<boolean | null>(null);
  const [msg, setMsg]               = useState("");
  const [loading, setLoading]       = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.id === ADMIN_ID) {
        setIsAdmin(true);
        setToken(session.access_token);
      }
    });
  }, []);

  const checkExists = useCallback(async () => {
    const date = getNavDate(navOffset);
    setQuizExists(null);
    const { data } = await supabase
      .from("daily_quiz")
      .select("id")
      .eq("story_date", date)
      .eq("level", level)
      .maybeSingle();
    setQuizExists(!!data);
  }, [navOffset, level]);

  useEffect(() => {
    if (isAdmin) checkExists();
  }, [isAdmin, checkExists]);

  async function handleGenerate() {
    setLoading(true);
    setMsg("Génération…");
    const date = getNavDate(navOffset);
    try {
      const res  = await fetch(`/api/daily-quiz?date=${date}&level=${encodeURIComponent(level)}`,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMsg("✅ Quiz généré !");
      setQuizExists(true);
      onQuizChanged?.();
    } catch (e) {
      setMsg("❌ " + (e instanceof Error ? e.message : "Erreur"));
    }
    setLoading(false);
  }

  async function handleDelete() {
    if (!confirm(`Supprimer le quiz ${level} du ${formatDateFr(getNavDate(navOffset))} ?`)) return;
    setLoading(true);
    setMsg("Suppression…");
    const date = getNavDate(navOffset);
    try {
      const res  = await fetch(`/api/daily-quiz?date=${date}&level=${encodeURIComponent(level)}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMsg("🗑 Quiz supprimé");
      setQuizExists(false);
      onQuizChanged?.();
    } catch (e) {
      setMsg("❌ " + (e instanceof Error ? e.message : "Erreur"));
    }
    setLoading(false);
  }

  async function handleRegenerate() {
    setLoading(true);
    setMsg("Suppression…");
    const date = getNavDate(navOffset);
    try {
      await fetch(`/api/daily-quiz?date=${date}&level=${encodeURIComponent(level)}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setMsg("Régénération…");
      const res  = await fetch(`/api/daily-quiz?date=${date}&level=${encodeURIComponent(level)}`,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMsg("✅ Quiz régénéré !");
      setQuizExists(true);
      onQuizChanged?.();
    } catch (e) {
      setMsg("❌ " + (e instanceof Error ? e.message : "Erreur"));
    }
    setLoading(false);
  }

  if (!isAdmin) return null;

  const navDate = getNavDate(navOffset);

  const navBtn: React.CSSProperties = {
    background: "rgba(212,168,67,0.08)",
    border: "1px solid rgba(212,168,67,0.28)",
    borderRadius: "7px",
    color: "rgba(212,168,67,0.85)",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: "0.78rem",
    padding: "5px 12px",
    transition: "all 0.15s",
  };

  return (
    <div style={{
      border: "1.5px dashed rgba(212,168,67,0.5)",
      borderRadius: "14px",
      padding: "14px 16px",
      marginBottom: "20px",
      background: "rgba(212,168,67,0.03)",
    }}>
      <div style={{
        fontSize: "0.65rem", fontWeight: 700, color: "rgba(212,168,67,0.55)",
        textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "12px",
      }}>
        🔧 Admin — Quiz du jour
      </div>

      {/* ── Navigation jours ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px", flexWrap: "wrap" }}>
        <button style={navBtn} onClick={() => setNavOffset(v => v - 1)}>←</button>
        <span style={{
          fontSize: "0.78rem", color: "rgba(212,168,67,0.9)", padding: "3px 12px",
          background: "rgba(212,168,67,0.1)", borderRadius: "50px",
          border: "1px solid rgba(212,168,67,0.22)",
        }}>
          {navOffset === 0 ? "Aujourd'hui" : navOffset > 0 ? `J+${navOffset}` : `J${navOffset}`}
          &nbsp;·&nbsp;{formatDateFr(navDate)}
        </span>
        <button style={navBtn} onClick={() => setNavOffset(v => v + 1)}>→</button>
        {navOffset !== 0 && (
          <button style={{ ...navBtn, fontSize: "0.7rem", padding: "4px 8px" }} onClick={() => setNavOffset(0)}>
            ↩ Auj.
          </button>
        )}
      </div>

      {/* ── Sélecteur niveau ── */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "12px", flexWrap: "wrap", alignItems: "center" }}>
        {LEVELS.map(l => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            style={{
              ...navBtn,
              background: level === l ? "rgba(212,168,67,0.18)" : "rgba(212,168,67,0.04)",
              border: `1px solid ${level === l ? "rgba(212,168,67,0.6)" : "rgba(212,168,67,0.2)"}`,
              color: level === l ? "rgba(212,168,67,1)" : "rgba(212,168,67,0.5)",
              fontWeight: level === l ? 700 : 400,
            }}
          >
            {l}
          </button>
        ))}
        <span style={{
          fontSize: "0.75rem", marginLeft: "4px",
          color: quizExists === null ? "rgba(212,168,67,0.35)"
               : quizExists ? "#22c55e"
               : "#e88080",
        }}>
          {quizExists === null ? "…" : quizExists ? "✓ Quiz en base" : "✗ Aucun quiz"}
        </span>
      </div>

      {/* ── Boutons action ── */}
      <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
        {!quizExists && quizExists !== null && (
          <button
            disabled={loading}
            style={{ ...navBtn, border: "1px solid rgba(34,197,94,0.45)", color: "#6ee7a0", background: "rgba(34,197,94,0.07)" }}
            onClick={handleGenerate}
          >
            {loading ? "…" : "⚡ Générer"}
          </button>
        )}
        {quizExists && (
          <>
            <button
              disabled={loading}
              style={{ ...navBtn, border: "1px solid rgba(96,165,250,0.45)", color: "#93c5fd", background: "rgba(59,130,246,0.07)" }}
              onClick={handleRegenerate}
            >
              {loading ? "…" : "↺ Modifier"}
            </button>
            <button
              disabled={loading}
              style={{ ...navBtn, border: "1px solid rgba(232,128,128,0.45)", color: "#f9a8a8", background: "rgba(232,128,128,0.07)" }}
              onClick={handleDelete}
            >
              {loading ? "…" : "🗑 Supprimer"}
            </button>
          </>
        )}
      </div>

      {msg && (
        <div style={{
          marginTop: "8px", fontSize: "0.78rem",
          color: msg.startsWith("✅") ? "#6ee7a0"
               : msg.startsWith("🗑") ? "rgba(212,168,67,0.7)"
               : msg.startsWith("❌") ? "#f9a8a8"
               : "rgba(212,168,67,0.6)",
        }}>
          {msg}
        </div>
      )}
    </div>
  );
}
