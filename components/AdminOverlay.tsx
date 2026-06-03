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
    def_wrong1: "", def_wrong2: "", def_wrong3: "",
    anag_word: "", anag_word_def: "",
    cit_text: "", cit_answer: "",
    cit_wrong1: "", cit_wrong2: "", cit_wrong3: "",
    p_word_of_day: "", p_word_of_day_def: "", p_word_of_day_etym: "",
    p_def_word: "", p_def_word_def: "",
    p_def_wrong1: "", p_def_wrong2: "", p_def_wrong3: "",
    p_anag_word: "", p_anag_word_def: "",
    p_cit_text: "", p_cit_answer: "",
    p_cit_wrong1: "", p_cit_wrong2: "", p_cit_wrong3: "",
  });
  const [game, setGame] = useState<Record<string, string>>(emptyGame());
  const [gameTab, setGameTab] = useState<"edit" | "preview">("edit");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.id === ADMIN_ID) {
        setIsAdmin(true);
        setToken(session.access_token);
      }
    });
  }, []);

  if (!isAdmin) return null;

  const STORY_CATEGORIES = [
    "Sport","Histoire","Science","Art","Gastronomie","Cinéma","Musique",
    "Géographie","Économie","Littérature","Philosophie","Nature","Technologie","Société",
    "Insolite","Psychologie","Architecture",
  ];

  function getTodayDate(): string {
    const paris = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" }));
    return `${paris.getFullYear()}-${String(paris.getMonth()+1).padStart(2,"0")}-${String(paris.getDate()).padStart(2,"0")}`;
  }

  // Ouvre l'édition — charge l'histoire effective (override Supabase ou rotation statique)
  async function handleOpenEdit() {
    setMsg("");
    try {
      const res = await fetch(`/api/effective-story?date=${date}&level=${encodeURIComponent(level)}`);
      const data = await res.json();
      if (data.story) {
        setTitle(data.story.title);
        setCategory(data.story.category);
        setSource(data.story.source);
        setReadTime(data.story.readTime);
        setParagraphs(data.story.paragraphs.length ? data.story.paragraphs : [""]);
      } else {
        setTitle(""); setCategory(""); setSource(""); setReadTime("3 min de lecture"); setParagraphs([""]);
      }
    } catch {
      setTitle(""); setCategory(""); setSource(""); setReadTime("3 min de lecture"); setParagraphs([""]);
    }
    setEditing(true);
  }

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
          // Wrong choices = toutes les choices qui ne sont pas le mot correct
          ...(() => { const ws = [g.def_choice1,g.def_choice2,g.def_choice3,g.def_choice4].filter((c:string)=>c&&c!==g.def_word); return { def_wrong1: ws[0]??"", def_wrong2: ws[1]??"", def_wrong3: ws[2]??"" }; })(),
          anag_word:      g.anag_word      ?? "", anag_word_def:    g.anag_word_def    ?? "",
          cit_text:       g.cit_text       ?? "", cit_answer:       g.cit_answer       ?? "",
          ...(() => { const ws = [g.cit_choice1,g.cit_choice2,g.cit_choice3,g.cit_choice4].filter((c:string)=>c&&c!==g.cit_answer); return { cit_wrong1: ws[0]??"", cit_wrong2: ws[1]??"", cit_wrong3: ws[2]??"" }; })(),
          p_word_of_day:  g.p_word_of_day  ?? "", p_word_of_day_def: g.p_word_of_day_def ?? "", p_word_of_day_etym: g.p_word_of_day_etym ?? "",
          p_def_word:     g.p_def_word     ?? "", p_def_word_def:   g.p_def_word_def   ?? "",
          ...(() => { const ws = [g.p_def_choice1,g.p_def_choice2,g.p_def_choice3,g.p_def_choice4].filter((c:string)=>c&&c!==g.p_def_word); return { p_def_wrong1: ws[0]??"", p_def_wrong2: ws[1]??"", p_def_wrong3: ws[2]??"" }; })(),
          p_anag_word:    g.p_anag_word    ?? "", p_anag_word_def:  g.p_anag_word_def  ?? "",
          p_cit_text:     g.p_cit_text     ?? "", p_cit_answer:     g.p_cit_answer     ?? "",
          ...(() => { const ws = [g.p_cit_choice1,g.p_cit_choice2,g.p_cit_choice3,g.p_cit_choice4].filter((c:string)=>c&&c!==g.p_cit_answer); return { p_cit_wrong1: ws[0]??"", p_cit_wrong2: ws[1]??"", p_cit_wrong3: ws[2]??"" }; })(),
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
    // Build shuffled choices (correct mixed with wrongs randomly)
    const dc  = shuffleChoices(game.def_word,    [game.def_wrong1,   game.def_wrong2,   game.def_wrong3]);
    const cc  = shuffleChoices(game.cit_answer,  [game.cit_wrong1,   game.cit_wrong2,   game.cit_wrong3]);
    const pdc = shuffleChoices(game.p_def_word,  [game.p_def_wrong1, game.p_def_wrong2, game.p_def_wrong3]);
    const pcc = shuffleChoices(game.p_cit_answer,[game.p_cit_wrong1, game.p_cit_wrong2, game.p_cit_wrong3]);
    const payload = {
      game_date: getGameDate(),
      ...game,
      def_choice1: dc[0]??"", def_choice2: dc[1]??"", def_choice3: dc[2]??"", def_choice4: dc[3]??"",
      cit_choice1: cc[0]??"", cit_choice2: cc[1]??"", cit_choice3: cc[2]??"", cit_choice4: cc[3]??"",
      p_def_choice1: pdc[0]??"", p_def_choice2: pdc[1]??"", p_def_choice3: pdc[2]??"", p_def_choice4: pdc[3]??"",
      p_cit_choice1: pcc[0]??"", p_cit_choice2: pcc[1]??"", p_cit_choice3: pcc[2]??"", p_cit_choice4: pcc[3]??"",
    };
    // Remove helper wrong fields (not in DB schema)
    ["def_wrong1","def_wrong2","def_wrong3","cit_wrong1","cit_wrong2","cit_wrong3",
     "p_def_wrong1","p_def_wrong2","p_def_wrong3","p_cit_wrong1","p_cit_wrong2","p_cit_wrong3"]
      .forEach(k => delete (payload as any)[k]);
    const res = await fetch("/api/admin-game", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    const d = await res.json();
    setGameSaving(false);
    if (d.error) { setGameMsg("❌ " + d.error); return; }
    setGameMsg("✅ Jeu sauvegardé !"); setTimeout(() => setGameModal(false), 800);
  }

  function shuffleChoices(correct: string, wrongs: string[]): string[] {
    const all = [correct, ...wrongs.filter(Boolean)].filter(Boolean);
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return all;
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
        <button style={editBtn} onClick={() => { if (editing) { setEditing(false); setMsg(""); } else { handleOpenEdit(); } }}>
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
          <select style={inp} value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">— Sélectionner —</option>
            {STORY_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
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
          <div style={{ display: "flex", gap: "8px", marginTop: "4px", flexWrap: "wrap" }}>
            <button onClick={saveStory} disabled={saving}
              style={{ padding: "8px 18px", borderRadius: "8px", background: "var(--accent)", border: "none", color: "var(--bg)", fontFamily: "inherit", fontWeight: 700, cursor: "pointer", fontSize: "0.85rem" }}>
              {saving ? "Sauvegarde…" : "💾 Sauvegarder"}
            </button>
            <button onClick={() => { setEditing(false); setMsg(""); }}
              style={{ padding: "8px 14px", borderRadius: "8px", background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text-muted)", fontFamily: "inherit", cursor: "pointer", fontSize: "0.85rem" }}>
              ✕ Annuler
            </button>
            <button onClick={() => { setTitle(""); setCategory(""); setSource(""); setReadTime("3 min de lecture"); setParagraphs([""]); setMsg(""); }}
              style={{ padding: "8px 14px", borderRadius: "8px", background: "var(--surface2)", border: "1px solid #e07070", color: "#e07070", fontFamily: "inherit", cursor: "pointer", fontSize: "0.85rem" }}>
              🗑 Tout effacer
            </button>
            <button onClick={handleOpenEdit}
              style={{ padding: "8px 14px", borderRadius: "8px", background: "var(--surface2)", border: "1px solid rgba(212,168,67,0.4)", color: "rgba(212,168,67,0.9)", fontFamily: "inherit", cursor: "pointer", fontSize: "0.85rem" }}>
              ↩ Remettre l'original
            </button>
          </div>
          {msg && <div style={{ marginTop: "8px", fontSize: "0.82rem", color: msg.startsWith("✅") ? "var(--green)" : "#e07070" }}>{msg}</div>}
          {/* ── Référence : histoire actuellement affichée ── */}
          <div style={{ marginTop: "16px", borderTop: "1px solid rgba(212,168,67,0.15)", paddingTop: "12px" }}>
            <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: "rgba(212,168,67,0.45)", marginBottom: "8px" }}>
              📖 Histoire actuellement affichée (référence)
            </div>
            <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "4px" }}>{story.title}</div>
            <div style={{ fontSize: "0.7rem", color: "rgba(212,168,67,0.5)", marginBottom: "8px", fontStyle: "italic" }}>{story.category} · {story.readTime}</div>
            {story.paragraphs.slice(0, 2).map((p, i) => (
              <p key={i} style={{ fontSize: "0.75rem", color: "var(--text-dim)", lineHeight: 1.5, margin: "0 0 4px", fontStyle: "italic" }}>
                {p.length > 200 ? p.substring(0, 200) + "…" : p}
              </p>
            ))}
            {story.paragraphs.length > 2 && (
              <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", fontStyle: "italic", marginTop: "2px" }}>
                … ({story.paragraphs.length - 2} paragraphe{story.paragraphs.length - 2 > 1 ? "s" : ""} de plus)
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Modale édition jeu ── */}
      {gameModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <div
            style={{ background: "var(--surface)", border: "1.5px dashed rgba(212,168,67,0.5)", borderRadius: "16px", padding: "24px", maxWidth: "800px", width: "100%", maxHeight: "90vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexShrink: 0 }}>
              <div style={{ fontFamily: "var(--font-playfair)", fontSize: "1rem", fontWeight: 700, color: "var(--accent)" }}>🎮 Jeux du {formatDateFr(getGameDate())}</div>
              {/* Tabs */}
              <div style={{ display: "flex", gap: "4px" }}>
                {(["edit","preview"] as const).map(t => (
                  <button key={t} onClick={() => setGameTab(t)} style={{ padding: "4px 12px", borderRadius: "6px", border: `1px solid ${gameTab===t?"rgba(212,168,67,0.5)":"var(--border)"}`, background: gameTab===t?"rgba(212,168,67,0.1)":"none", color: gameTab===t?"var(--accent)":"var(--text-dim)", cursor: "pointer", fontFamily: "inherit", fontSize: "0.78rem" }}>
                    {t==="edit"?"✏️ Éditer":"👁 Prévisualiser"}
                  </button>
                ))}
              </div>
            </div>

            {gameLoading ? (
              <div style={{ textAlign: "center", padding: "24px", color: "var(--text-dim)" }}>Chargement…</div>
            ) : gameTab === "preview" ? (
              /* ── Onglet Prévisualisation ── */
              <div style={{ overflowY: "auto", flex: 1, paddingRight: "4px", display: "flex", flexDirection: "column", gap: "14px" }}>
                {/* ── GRATUIT ── */}
                <div style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", color: "var(--text-dim)", paddingBottom: "5px", borderBottom: "1px solid var(--border)" }}>GRATUIT</div>
                {game.word_of_day && (
                  <div style={{ background: "var(--surface2)", borderRadius: "10px", padding: "12px 14px" }}>
                    <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: "6px" }}>🔤 Mot du jour</div>
                    <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--accent)" }}>{game.word_of_day}</div>
                    {game.word_of_day_etym && <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", fontStyle: "italic" }}>{game.word_of_day_etym}</div>}
                    {game.word_of_day_def && <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "4px" }}>{game.word_of_day_def}</div>}
                  </div>
                )}
                {game.anag_word && (
                  <div style={{ background: "var(--surface2)", borderRadius: "10px", padding: "12px 14px" }}>
                    <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: "6px" }}>🔡 Anagramme</div>
                    <div style={{ fontSize: "0.82rem", color: "var(--text-dim)", marginBottom: "4px" }}>{game.anag_word_def}</div>
                    <div style={{ fontFamily: "monospace", fontSize: "1.1rem", letterSpacing: "4px", color: "var(--accent)" }}>{game.anag_word.split("").sort(()=>Math.random()-0.5).join(" ")}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "4px" }}>→ réponse : <strong>{game.anag_word}</strong></div>
                  </div>
                )}
                {game.def_word && (
                  <div style={{ background: "var(--surface2)", borderRadius: "10px", padding: "12px 14px" }}>
                    <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: "6px" }}>🔵 Définition mystère</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "8px" }}>{game.def_word_def}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {shuffleChoices(game.def_word, [game.def_wrong1, game.def_wrong2, game.def_wrong3]).map((c,i) => (
                        <span key={i} style={{ padding: "4px 10px", borderRadius: "6px", background: c===game.def_word?"rgba(34,197,94,0.15)":"var(--surface)", border: `1px solid ${c===game.def_word?"#22c55e":"var(--border)"}`, color: c===game.def_word?"#22c55e":"var(--text-muted)", fontSize: "0.82rem" }}>{c}{c===game.def_word?" ✓":""}</span>
                      ))}
                    </div>
                  </div>
                )}
                {game.cit_text && (
                  <div style={{ background: "var(--surface2)", borderRadius: "10px", padding: "12px 14px" }}>
                    <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: "6px" }}>💬 Citation</div>
                    <div style={{ fontSize: "0.88rem", color: "var(--text-muted)", fontStyle: "italic", marginBottom: "8px" }}>"{game.cit_text.replace("***", "___")}"</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {shuffleChoices(game.cit_answer, [game.cit_wrong1, game.cit_wrong2, game.cit_wrong3]).map((c,i) => (
                        <span key={i} style={{ padding: "4px 10px", borderRadius: "6px", background: c===game.cit_answer?"rgba(34,197,94,0.15)":"var(--surface)", border: `1px solid ${c===game.cit_answer?"#22c55e":"var(--border)"}`, color: c===game.cit_answer?"#22c55e":"var(--text-muted)", fontSize: "0.82rem" }}>{c}{c===game.cit_answer?" ✓":""}</span>
                      ))}
                    </div>
                  </div>
                )}
                {/* ── PREMIUM ✨ — toujours affichées ── */}
                <div style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", color: "rgba(212,168,67,0.65)", paddingBottom: "5px", borderBottom: "1px solid rgba(212,168,67,0.25)", marginTop: "4px" }}>PREMIUM ✨</div>
                <div style={{ background: "rgba(212,168,67,0.05)", border: "1px solid rgba(212,168,67,0.2)", borderRadius: "10px", padding: "12px 14px" }}>
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "rgba(212,168,67,0.7)", textTransform: "uppercase", marginBottom: "6px" }}>✨ Mot Premium</div>
                  {game.p_word_of_day ? (<>
                    <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--accent)" }}>{game.p_word_of_day}</div>
                    {game.p_word_of_day_etym && <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", fontStyle: "italic" }}>{game.p_word_of_day_etym}</div>}
                    {game.p_word_of_day_def && <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "4px" }}>{game.p_word_of_day_def}</div>}
                  </>) : <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", fontStyle: "italic" }}>(vide)</div>}
                </div>
                <div style={{ background: "rgba(212,168,67,0.05)", border: "1px solid rgba(212,168,67,0.2)", borderRadius: "10px", padding: "12px 14px" }}>
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "rgba(212,168,67,0.7)", textTransform: "uppercase", marginBottom: "6px" }}>✨ Anagramme Premium</div>
                  {game.p_anag_word ? (<>
                    <div style={{ fontSize: "0.82rem", color: "var(--text-dim)", marginBottom: "4px" }}>{game.p_anag_word_def}</div>
                    <div style={{ fontFamily: "monospace", fontSize: "1.1rem", letterSpacing: "4px", color: "var(--accent)" }}>{game.p_anag_word.split("").sort(()=>Math.random()-0.5).join(" ")}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "4px" }}>→ réponse : <strong>{game.p_anag_word}</strong></div>
                  </>) : <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", fontStyle: "italic" }}>(vide)</div>}
                </div>
                <div style={{ background: "rgba(212,168,67,0.05)", border: "1px solid rgba(212,168,67,0.2)", borderRadius: "10px", padding: "12px 14px" }}>
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "rgba(212,168,67,0.7)", textTransform: "uppercase", marginBottom: "6px" }}>✨ Définition mystère Premium</div>
                  {game.p_def_word ? (<>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "8px" }}>{game.p_def_word_def}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {shuffleChoices(game.p_def_word, [game.p_def_wrong1, game.p_def_wrong2, game.p_def_wrong3]).map((c,i) => (
                        <span key={i} style={{ padding: "4px 10px", borderRadius: "6px", background: c===game.p_def_word?"rgba(34,197,94,0.15)":"var(--surface)", border: `1px solid ${c===game.p_def_word?"#22c55e":"var(--border)"}`, color: c===game.p_def_word?"#22c55e":"var(--text-muted)", fontSize: "0.82rem" }}>{c}{c===game.p_def_word?" ✓":""}</span>
                      ))}
                    </div>
                  </>) : <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", fontStyle: "italic" }}>(vide)</div>}
                </div>
                <div style={{ background: "rgba(212,168,67,0.05)", border: "1px solid rgba(212,168,67,0.2)", borderRadius: "10px", padding: "12px 14px" }}>
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "rgba(212,168,67,0.7)", textTransform: "uppercase", marginBottom: "6px" }}>✨ Citation Premium</div>
                  {game.p_cit_text ? (<>
                    <div style={{ fontSize: "0.88rem", color: "var(--text-muted)", fontStyle: "italic", marginBottom: "8px" }}>"{game.p_cit_text.replace("***", "___")}"</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {shuffleChoices(game.p_cit_answer, [game.p_cit_wrong1, game.p_cit_wrong2, game.p_cit_wrong3]).map((c,i) => (
                        <span key={i} style={{ padding: "4px 10px", borderRadius: "6px", background: c===game.p_cit_answer?"rgba(34,197,94,0.15)":"var(--surface)", border: `1px solid ${c===game.p_cit_answer?"#22c55e":"var(--border)"}`, color: c===game.p_cit_answer?"#22c55e":"var(--text-muted)", fontSize: "0.82rem" }}>{c}{c===game.p_cit_answer?" ✓":""}</span>
                      ))}
                    </div>
                  </>) : <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", fontStyle: "italic" }}>(vide)</div>}
                </div>
              </div>
            ) : (
              /* ── Onglet Édition ── */
              <div style={{ overflowY: "auto", flex: 1, paddingRight: "4px" }}>
                {/* ── GRATUIT ── */}
                <div style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", color: "var(--text-dim)", marginBottom: "10px", paddingBottom: "5px", borderBottom: "1px solid var(--border)" }}>GRATUIT</div>
                {[
                  ["🔤 Mot du jour", ["word_of_day:Mot", "word_of_day_etym:Étymologie", "word_of_day_def:Définition simple"]],
                  ["🔡 Anagramme", ["anag_word:Mot à anagrammer", "anag_word_def:Définition indice"]],
                ].map(([section, fields]) => (
                  <div key={section as string} style={{ marginBottom: "12px" }}>
                    <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(212,168,67,0.8)", marginBottom: "4px" }}>{section as string}</div>
                    {(fields as string[]).map(f => {
                      const [key, placeholder] = f.split(":");
                      return <input key={key} style={inp} placeholder={placeholder} value={game[key]??""} onChange={e=>setGame(g=>({...g,[key]:e.target.value}))} />;
                    })}
                  </div>
                ))}
                {[
                  { title: "🔵 Définition mystère", fields: ["def_word:Mot à trouver","def_word_def:Définition à afficher"], correct: "def_word", wrongs: ["def_wrong1","def_wrong2","def_wrong3"] },
                  { title: "💬 Citation (*** = mot manquant)", fields: ["cit_text:Texte avec ***","cit_answer:✓ Réponse correcte"], correct: "cit_answer", wrongs: ["cit_wrong1","cit_wrong2","cit_wrong3"] },
                ].map(sec => (
                  <div key={sec.title} style={{ marginBottom: "14px", padding: "10px 12px", background: "rgba(0,0,0,0.15)", borderRadius: "8px" }}>
                    <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(212,168,67,0.8)", marginBottom: "6px" }}>{sec.title}</div>
                    {sec.fields.map(f => {
                      const [key, placeholder] = f.split(":");
                      const isCorrectField = placeholder.startsWith("✓");
                      if (isCorrectField) return (
                        <div key={key}>
                          <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#22c55e", marginBottom: "3px" }}>✓ Bonne réponse</div>
                          <div style={{ position: "relative" }}>
                            <input style={{ ...inp, background: "rgba(34,197,94,0.15)", border: "2px solid #22c55e", color: "#86efac", paddingRight: "32px" }}
                              placeholder="La bonne réponse" value={game[key]??""} onChange={e=>setGame(g=>({...g,[key]:e.target.value}))} />
                            <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "#22c55e", fontWeight: 700, fontSize: "0.9rem", pointerEvents: "none" }}>✓</span>
                          </div>
                        </div>
                      );
                      return (
                        <input key={key} style={inp}
                          placeholder={placeholder} value={game[key]??""} onChange={e=>setGame(g=>({...g,[key]:e.target.value}))} />
                      );
                    })}
                    <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", margin: "4px 0 2px" }}>Mauvais choix (seront mélangés avec la bonne réponse) :</div>
                    {sec.wrongs.map((k,i) => (
                      <input key={k} style={{ ...inp, marginBottom: i<2?"6px":undefined }} placeholder={`Mauvais choix ${i+1}`} value={game[k]??""} onChange={e=>setGame(g=>({...g,[k]:e.target.value}))} />
                    ))}
                  </div>
                ))}
                {/* ── PREMIUM ── */}
                <div style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", color: "rgba(212,168,67,0.65)", margin: "6px 0 10px", paddingBottom: "5px", borderBottom: "1px solid rgba(212,168,67,0.25)" }}>PREMIUM ✨</div>
                {[
                  ["✨ Mot Premium", ["p_word_of_day:Mot", "p_word_of_day_etym:Étymologie", "p_word_of_day_def:Définition simple"]],
                  ["✨ Anagramme Premium", ["p_anag_word:Mot", "p_anag_word_def:Définition indice"]],
                ].map(([section, fields]) => (
                  <div key={section as string} style={{ marginBottom: "12px" }}>
                    <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(212,168,67,0.8)", marginBottom: "4px" }}>{section as string}</div>
                    {(fields as string[]).map(f => {
                      const [key, placeholder] = f.split(":");
                      return <input key={key} style={inp} placeholder={placeholder} value={game[key]??""} onChange={e=>setGame(g=>({...g,[key]:e.target.value}))} />;
                    })}
                  </div>
                ))}
                {[
                  { title: "✨ Définition mystère Premium", fields: ["p_def_word:Mot à trouver","p_def_word_def:Définition à afficher"], correct: "p_def_word", wrongs: ["p_def_wrong1","p_def_wrong2","p_def_wrong3"] },
                  { title: "✨ Citation Premium", fields: ["p_cit_text:Texte avec ***","p_cit_answer:✓ Réponse correcte"], correct: "p_cit_answer", wrongs: ["p_cit_wrong1","p_cit_wrong2","p_cit_wrong3"] },
                ].map(sec => (
                  <div key={sec.title} style={{ marginBottom: "14px", padding: "10px 12px", background: "rgba(212,168,67,0.06)", border: "1px solid rgba(212,168,67,0.15)", borderRadius: "8px" }}>
                    <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(212,168,67,0.8)", marginBottom: "6px" }}>{sec.title}</div>
                    {sec.fields.map(f => {
                      const [key, placeholder] = f.split(":");
                      const isCorrectField = placeholder.startsWith("✓");
                      if (isCorrectField) return (
                        <div key={key}>
                          <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#22c55e", marginBottom: "3px" }}>✓ Bonne réponse</div>
                          <div style={{ position: "relative" }}>
                            <input style={{ ...inp, background: "rgba(34,197,94,0.15)", border: "2px solid #22c55e", color: "#86efac", paddingRight: "32px" }}
                              placeholder="La bonne réponse" value={game[key]??""} onChange={e=>setGame(g=>({...g,[key]:e.target.value}))} />
                            <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "#22c55e", fontWeight: 700, fontSize: "0.9rem", pointerEvents: "none" }}>✓</span>
                          </div>
                        </div>
                      );
                      return (
                        <input key={key} style={inp}
                          placeholder={placeholder} value={game[key]??""} onChange={e=>setGame(g=>({...g,[key]:e.target.value}))} />
                      );
                    })}
                    <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", margin: "4px 0 2px" }}>Mauvais choix (seront mélangés avec la bonne réponse) :</div>
                    {sec.wrongs.map((k,i) => (
                      <input key={k} style={{ ...inp, marginBottom: i<2?"6px":undefined }} placeholder={`Mauvais choix ${i+1}`} value={game[k]??""} onChange={e=>setGame(g=>({...g,[k]:e.target.value}))} />
                    ))}
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
