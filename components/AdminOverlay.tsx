"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import type { Story } from "@/lib/stories";

const ADMIN_ID = "0450c58e-35b2-47e6-9600-13db5626e96d";

interface Props {
  story: Story;
  date: string;
  level: string;
  dayOffset: number;
  todayOffset: number;
}

const inp: React.CSSProperties = {
  width: "100%", background: "var(--surface2)", border: "1px solid rgba(212,168,67,0.4)",
  borderRadius: "6px", padding: "6px 10px", color: "var(--text)", fontFamily: "inherit",
  fontSize: "0.85rem", boxSizing: "border-box", marginBottom: "6px",
};
const lbl: React.CSSProperties = {
  fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px",
  color: "rgba(212,168,67,0.7)", marginBottom: "3px", display: "block",
};

export default function AdminOverlay({ story, date, level, dayOffset, todayOffset }: Props) {
  const supabase = createClient();
  const router   = useRouter();
  const [isAdmin, setIsAdmin]     = useState(false);
  const [token, setToken]         = useState<string | null>(null);
  const [editing, setEditing]     = useState(false);
  const [saving, setSaving]       = useState(false);
  const [msg, setMsg]             = useState("");
  const [gameModal, setGameModal] = useState(false);
  const [gameLoading, setGameLoading] = useState(false);
  const [gameSaving, setGameSaving]   = useState(false);
  const [gameMsg, setGameMsg]         = useState("");

  // Story form
  const [title, setTitle]           = useState(story.title);
  const [category, setCategory]     = useState(story.category);
  const [source, setSource]         = useState(story.source ?? "");
  const [readTime, setReadTime]     = useState(story.readTime);
  const [paragraphs, setParagraphs] = useState<string[]>(story.paragraphs.length ? story.paragraphs : [""]);

  // Tous les champs de games_custom (libres + premium)
  const emptyGame = (): Record<string, string> => ({
    word_of_day: "", word_of_day_def: "", word_of_day_etym: "",
    def_word: "", def_word_def: "",
    def_choice1: "", def_choice2: "", def_choice3: "", def_choice4: "",
    anag_word: "", anag_word_def: "",
    cit_text: "", cit_answer: "",
    cit_choice1: "", cit_choice2: "", cit_choice3: "", cit_choice4: "",
    p_word_of_day: "", p_word_of_day_def: "", p_word_of_day_etym: "",
    p_def_word: "", p_def_word_def: "",
    p_def_choice1: "", p_def_choice2: "", p_def_choice3: "", p_def_choice4: "",
    p_anag_word: "", p_anag_word_def: "",
    p_cit_text: "", p_cit_answer: "",
    p_cit_choice1: "", p_cit_choice2: "", p_cit_choice3: "", p_cit_choice4: "",
  });
  const [game, setGame] = useState<Record<string, string>>(emptyGame());

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.id === ADMIN_ID) {
        setIsAdmin(true);
        setToken(session.access_token);
      }
    });
  }, []);

  if (!isAdmin) return null;

  const formatDateFr = (dateStr: string) => {
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  };

  const isFuture  = dayOffset > todayOffset;
  const dayDiff   = dayOffset - todayOffset;
  const prevDay   = dayOffset - 1;
  const nextDay   = dayOffset + 1;

  async function saveStory() {
    setSaving(true); setMsg("");
    const res = await fetch("/api/admin-story", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ date, level, title, category, source, readTime, paragraphs }),
    });
    const d = await res.json();
    setSaving(false);
    if (d.error) { setMsg("❌ " + d.error); return; }
    setMsg("✅ Sauvegardé !"); setEditing(false); router.refresh();
  }

  // Même logique que getParisDateStr() dans app/jeux/page.tsx — date heure Paris
  function getGameDate(): string {
    const paris = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" }));
    const diff  = dayOffset - todayOffset;
    paris.setDate(paris.getDate() + diff);
    const y = paris.getFullYear();
    const m = String(paris.getMonth() + 1).padStart(2, "0");
    const d = String(paris.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  async function openGameModal() {
    setGameLoading(true); setGameModal(true); setGameMsg("");
    const gameDate = getGameDate();
    console.log("[AdminOverlay] fetching effective game for date:", gameDate);
    try {
      // /api/effective-game returns static fallback merged with games_custom override
      const res  = await fetch(`/api/effective-game?date=${gameDate}`);
      const json = await res.json();
      const g    = json.game;
      // ── LOGS EXPLICITES ─────────────────────────────────────────────────
      console.log("[AdminOverlay] jeux normaux:", {
        word_of_day: g?.word_of_day, def_word: g?.def_word, anag_word: g?.anag_word, cit_text: g?.cit_text,
      }, "erreur:", json.error ?? null);
      console.log("[AdminOverlay] jeux premium:", {
        p_word_of_day: g?.p_word_of_day, p_def_word: g?.p_def_word, p_anag_word: g?.p_anag_word, p_cit_text: g?.p_cit_text,
      }, "erreur:", json.error ?? null);
      console.log("[AdminOverlay] row complet:", g);
      // ────────────────────────────────────────────────────────────────────
      if (g) {
        setGame({
          word_of_day:    g.word_of_day    ?? "", word_of_day_def:  g.word_of_day_def  ?? "", word_of_day_etym: g.word_of_day_etym ?? "",
          def_word:       g.def_word       ?? "", def_word_def:     g.def_word_def     ?? "",
          def_choice1:    g.def_choice1    ?? "", def_choice2:      g.def_choice2      ?? "", def_choice3: g.def_choice3 ?? "", def_choice4: g.def_choice4 ?? "",
          anag_word:      g.anag_word      ?? "", anag_word_def:    g.anag_word_def    ?? "",
          cit_text:       g.cit_text       ?? "", cit_answer:       g.cit_answer       ?? "",
          cit_choice1:    g.cit_choice1    ?? "", cit_choice2:      g.cit_choice2      ?? "", cit_choice3: g.cit_choice3 ?? "", cit_choice4: g.cit_choice4 ?? "",
          p_word_of_day:  g.p_word_of_day  ?? "", p_word_of_day_def: g.p_word_of_day_def ?? "", p_word_of_day_etym: g.p_word_of_day_etym ?? "",
          p_def_word:     g.p_def_word     ?? "", p_def_word_def:   g.p_def_word_def   ?? "",
          p_def_choice1:  g.p_def_choice1  ?? "", p_def_choice2:    g.p_def_choice2    ?? "", p_def_choice3: g.p_def_choice3 ?? "", p_def_choice4: g.p_def_choice4 ?? "",
          p_anag_word:    g.p_anag_word    ?? "", p_anag_word_def:  g.p_anag_word_def  ?? "",
          p_cit_text:     g.p_cit_text     ?? "", p_cit_answer:     g.p_cit_answer     ?? "",
          p_cit_choice1:  g.p_cit_choice1  ?? "", p_cit_choice2:    g.p_cit_choice2    ?? "", p_cit_choice3: g.p_cit_choice3 ?? "", p_cit_choice4: g.p_cit_choice4 ?? "",
        });
      } else {
        setGame(emptyGame());
        console.log("[AdminOverlay] AUCUN JEU trouvé pour la date:", gameDate, "— vérifie que games_custom a bien une ligne avec game_date =", gameDate);
      }
    } catch (e) {
      console.error("[AdminOverlay] fetch error:", e);
    }
    setGameLoading(false);
  }

  async function saveGame() {
    setGameSaving(true); setGameMsg("");
    const res = await fetch("/api/admin-game", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ game_date: getGameDate(), ...game }),
    });
    const d = await res.json();
    setGameSaving(false);
    if (d.error) { setGameMsg("❌ " + d.error); return; }
    setGameMsg("✅ Jeu sauvegardé !"); setTimeout(() => setGameModal(false), 800);
  }

  const navBtn: React.CSSProperties = {
    background: "rgba(212,168,67,0.08)", border: "1px solid rgba(212,168,67,0.25)",
    borderRadius: "6px", color: "rgba(212,168,67,0.8)", cursor: "pointer",
    fontFamily: "inherit", fontSize: "0.75rem", padding: "3px 10px",
  };
  const editBtn: React.CSSProperties = {
    background: "rgba(212,168,67,0.08)", border: "1px solid rgba(212,168,67,0.3)",
    borderRadius: "6px", color: "rgba(212,168,67,0.9)", cursor: "pointer",
    fontFamily: "inherit", fontSize: "0.75rem", padding: "3px 8px",
  };

  return (
    <>
      {/* ── Barre de navigation admin ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px", opacity: 0.85 }}>
        <button style={navBtn} onClick={() => router.push(`/?level=${level}&day=${prevDay}`)}>← J-1</button>
        {isFuture ? (
          <span style={{ fontSize: "0.7rem", background: "rgba(212,168,67,0.12)", border: "1px solid rgba(212,168,67,0.3)", borderRadius: "50px", padding: "2px 8px", color: "rgba(212,168,67,0.8)" }}>
            Prévisualisation — J+{dayDiff}
          </span>
        ) : (
          <span style={{ fontSize: "0.7rem", color: "rgba(212,168,67,0.5)" }}>Aujourd'hui</span>
        )}
        <button style={navBtn} onClick={() => router.push(`/?level=${level}&day=${nextDay}`)}>J+1 →</button>
        {dayOffset !== todayOffset && (
          <button style={{ ...navBtn, marginLeft: "4px", fontSize: "0.7rem" }} onClick={() => router.push(`/?level=${level}`)}>↩ Revenir</button>
        )}
        <div style={{ flex: 1 }} />
        <button style={editBtn} onClick={() => { setEditing(e => !e); setMsg(""); }}>
          {editing ? "✕ Fermer" : "✏️ Éditer histoire"}
        </button>
        <button style={editBtn} onClick={openGameModal}>🎮 Éditer jeu</button>
      </div>

      {/* ── Formulaire édition histoire ── */}
      {editing && (
        <div style={{ border: "1.5px dashed rgba(212,168,67,0.5)", borderRadius: "12px", padding: "16px", marginBottom: "12px", background: "rgba(212,168,67,0.03)" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(212,168,67,0.7)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.8px" }}>
            ✏️ Édition — {date} — {level}
          </div>
          <label style={lbl}>Titre</label>
          <input style={inp} value={title} onChange={e => setTitle(e.target.value)} />
          <label style={lbl}>Catégorie</label>
          <input style={inp} value={category} onChange={e => setCategory(e.target.value)} />
          <label style={lbl}>Source</label>
          <input style={inp} value={source} onChange={e => setSource(e.target.value)} />
          <label style={lbl}>Temps de lecture</label>
          <input style={{ ...inp, width: "180px" }} value={readTime} onChange={e => setReadTime(e.target.value)} />
          <label style={{ ...lbl, marginTop: "8px" }}>Paragraphes</label>
          {paragraphs.map((p, i) => (
            <div key={i} style={{ display: "flex", gap: "6px", marginBottom: "6px" }}>
              <textarea
                style={{ ...inp, marginBottom: 0, minHeight: "70px", resize: "vertical", flex: 1 }}
                value={p}
                onChange={e => { const next = [...paragraphs]; next[i] = e.target.value; setParagraphs(next); }}
              />
              <button onClick={() => setParagraphs(prev => prev.filter((_, j) => j !== i))}
                style={{ alignSelf: "flex-start", background: "none", border: "1px solid #e07070", color: "#e07070", borderRadius: "6px", padding: "4px 8px", cursor: "pointer", fontSize: "0.75rem" }}>✕</button>
            </div>
          ))}
          <button onClick={() => setParagraphs(prev => [...prev, ""])}
            style={{ ...editBtn, marginBottom: "12px", fontSize: "0.75rem" }}>+ Paragraphe</button>
          <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
            <button onClick={saveStory} disabled={saving}
              style={{ padding: "8px 18px", borderRadius: "8px", background: "var(--accent)", border: "none", color: "var(--bg)", fontFamily: "inherit", fontWeight: 700, cursor: "pointer", fontSize: "0.85rem" }}>
              {saving ? "Sauvegarde…" : "💾 Sauvegarder"}
            </button>
            <button onClick={() => { setEditing(false); setMsg(""); }}
              style={{ padding: "8px 14px", borderRadius: "8px", background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text-muted)", fontFamily: "inherit", cursor: "pointer", fontSize: "0.85rem" }}>
              ✕ Annuler
            </button>
          </div>
          {msg && <div style={{ marginTop: "8px", fontSize: "0.82rem", color: msg.startsWith("✅") ? "var(--green)" : "#e07070" }}>{msg}</div>}
        </div>
      )}

      {/* ── Modale édition jeu ── */}
      {gameModal && (
        <div onClick={() => setGameModal(false)}
          style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background: "var(--surface)", border: "1.5px dashed rgba(212,168,67,0.5)", borderRadius: "16px", padding: "24px", maxWidth: "520px", width: "100%", maxHeight: "80vh", display: "flex", flexDirection: "column", gap: "0", overflow: "hidden" }}>
            <div style={{ fontFamily: "var(--font-playfair)", fontSize: "1rem", fontWeight: 700, color: "var(--accent)", marginBottom: "12px", flexShrink: 0 }}>🎮 Jeux du {formatDateFr(getGameDate())}</div>
            {gameLoading ? (
              <div style={{ textAlign: "center", padding: "24px", color: "var(--text-dim)" }}>Chargement…</div>
            ) : (
              <div style={{ overflowY: "auto", flex: 1, paddingRight: "4px" }}>
                {[
                  ["📖 Mot du jour", ["word_of_day:Mot", "word_of_day_def:Définition simple", "word_of_day_etym:Étymologie"]],
                  ["🔍 Définition mystère", ["def_word:Mot à trouver", "def_word_def:Définition à afficher", "def_choice1:Choix 1 (correct)", "def_choice2:Choix 2", "def_choice3:Choix 3", "def_choice4:Choix 4"]],
                  ["🔤 Anagramme", ["anag_word:Mot à anagrammer", "anag_word_def:Définition indice"]],
                  ["💬 Citation (*** = mot manquant)", ["cit_text:Texte avec ***", "cit_answer:Réponse correcte", "cit_choice1:Choix 1 (correct)", "cit_choice2:Choix 2", "cit_choice3:Choix 3", "cit_choice4:Choix 4"]],
                  ["✨ Mot Premium", ["p_word_of_day:Mot", "p_word_of_day_def:Définition simple", "p_word_of_day_etym:Étymologie"]],
                  ["✨ Définition mystère Premium", ["p_def_word:Mot à trouver", "p_def_word_def:Définition à afficher", "p_def_choice1:Choix 1 (correct)", "p_def_choice2:Choix 2", "p_def_choice3:Choix 3", "p_def_choice4:Choix 4"]],
                  ["✨ Anagramme Premium", ["p_anag_word:Mot", "p_anag_word_def:Définition indice"]],
                  ["✨ Citation Premium", ["p_cit_text:Texte avec ***", "p_cit_answer:Réponse correcte", "p_cit_choice1:Choix 1 (correct)", "p_cit_choice2:Choix 2", "p_cit_choice3:Choix 3", "p_cit_choice4:Choix 4"]],
                ].map(([section, fields]) => (
                  <div key={section as string} style={{ marginBottom: "12px" }}>
                    <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(212,168,67,0.8)", marginBottom: "4px" }}>{section as string}</div>
                    {(fields as string[]).map(f => {
                      const [key, placeholder] = f.split(":");
                      const isCorrect = placeholder.includes("correct");
                      return (
                        <div key={key} style={{ position: "relative" }}>
                          {isCorrect && (
                            <span style={{ position: "absolute", top: "50%", right: "8px", transform: "translateY(-50%)", fontSize: "0.7rem", fontWeight: 700, color: "#22c55e", pointerEvents: "none" }}>✓ Correct</span>
                          )}
                          <input style={{ ...inp, paddingRight: isCorrect ? "70px" : undefined, borderColor: isCorrect ? "rgba(34,197,94,0.4)" : undefined }}
                            placeholder={placeholder}
                            value={game[key] ?? ""}
                            onChange={e => setGame(g => ({ ...g, [key]: e.target.value }))} />
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "12px", flexShrink: 0, borderTop: "1px solid var(--border)", paddingTop: "12px" }}>
              <button onClick={() => setGameModal(false)}
                style={{ padding: "7px 16px", borderRadius: "8px", background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text-muted)", fontFamily: "inherit", cursor: "pointer", fontSize: "0.85rem" }}>Annuler</button>
              <button onClick={saveGame} disabled={gameSaving}
                style={{ padding: "7px 18px", borderRadius: "8px", background: "var(--accent)", border: "none", color: "var(--bg)", fontFamily: "inherit", fontWeight: 700, cursor: "pointer", fontSize: "0.85rem" }}>
                {gameSaving ? "Sauvegarde…" : "💾 Sauvegarder"}
              </button>
            </div>
            {gameMsg && <div style={{ marginTop: "6px", fontSize: "0.8rem", color: gameMsg.startsWith("✅") ? "var(--green)" : "#e07070", textAlign: "right" }}>{gameMsg}</div>}
          </div>
        </div>
      )}
    </>
  );
}
