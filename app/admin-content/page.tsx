"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import styles from "../admin/admin.module.css";
import { STORIES } from "@/lib/stories";

const ADMIN_ID = "0450c58e-35b2-47e6-9600-13db5626e96d";

// Génère toutes les dates de aujourd'hui jusqu'au 31/12/2026
function generateDates() {
  const dates: string[] = [];
  const start = new Date("2026-05-17");
  const end = new Date("2026-12-31");
  const cur = new Date(start);
  while (cur <= end) {
    dates.push(cur.toISOString().slice(0, 10));
    cur.setDate(cur.getDate() + 1);
  }
  return dates;
}

const ALL_DATES = generateDates();
const LEVELS = ["Curieux", "Lecteur", "Érudit"] as const;

interface StoryForm {
  title: string;
  category: string;
  readTime: string;
  source: string;
  paragraphs: string[];
}

interface GameForm {
  word_of_day: string; word_of_day_def: string; word_of_day_etym: string;
  def_word: string; def_word_def: string;
  def_choice1: string; def_choice2: string; def_choice3: string; def_choice4: string;
  anag_word: string; anag_word_def: string;
  cit_text: string; cit_answer: string;
  cit_choice1: string; cit_choice2: string; cit_choice3: string; cit_choice4: string;
  p_word_of_day: string; p_word_of_day_def: string; p_word_of_day_etym: string;
  p_def_word: string; p_def_word_def: string;
  p_def_choice1: string; p_def_choice2: string; p_def_choice3: string; p_def_choice4: string;
  p_anag_word: string; p_anag_word_def: string;
  p_cit_text: string; p_cit_answer: string;
  p_cit_choice1: string; p_cit_choice2: string; p_cit_choice3: string; p_cit_choice4: string;
}

const emptyStory = (): StoryForm => ({
  title: "", category: "", readTime: "3 min de lecture", source: "", paragraphs: ["", "", "", ""]
});

const emptyGame = (): GameForm => ({
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

export default function AdminStoriesGames() {
  const supabase = createClient();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState<"stories" | "games">("stories");

  // Stories
  const [expandedDate, setExpandedDate] = useState<string | null>(null);
  const [expandedLevel, setExpandedLevel] = useState<string | null>(null);
  const [storyForms, setStoryForms] = useState<Record<string, StoryForm>>({});
  const [storySaving, setStorySaving] = useState(false);
  const [storyMsg, setStoryMsg] = useState("");
  const [existingStories, setExistingStories] = useState<Record<string, boolean>>({});

  // Games
  const [expandedGameDate, setExpandedGameDate] = useState<string | null>(null);
  const [gameForm, setGameForm] = useState<GameForm>(emptyGame());
  const [gameSaving, setGameSaving] = useState(false);
  const [gameMsg, setGameMsg] = useState("");
  const [existingGames, setExistingGames] = useState<Record<string, boolean>>({});

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.id !== ADMIN_ID) { router.push("/"); return; }
      setAuthorized(true);
      loadExistingStories();
      loadExistingGames();
    });
  }, []);

  async function loadExistingStories() {
    const { data } = await supabase.from("stories_custom").select("date, level");
    if (data) {
      const map: Record<string, boolean> = {};
      data.forEach((s: any) => { map[`${s.date}_${s.level}`] = true; });
      setExistingStories(map);
    }
  }

  async function loadExistingGames() {
    const { data } = await supabase.from("games_custom").select("game_date");
    if (data) {
      const map: Record<string, boolean> = {};
      data.forEach((g: any) => { map[g.game_date] = true; });
      setExistingGames(map);
    }
  }

  async function openStory(date: string, level: string) {
  const key = `${date}_${level}`;
  if (expandedDate === date && expandedLevel === level) {
    setExpandedDate(null); setExpandedLevel(null); return;
  }
  setExpandedDate(date); setExpandedLevel(level); setStoryMsg("");

  const { data } = await supabase.from("stories_custom").select("*").eq("date", date).eq("level", level).maybeSingle();
  if (data) {
    setStoryForms(prev => ({ ...prev, [key]: {
      title: data.title ?? "",
      category: data.category ?? "",
      readTime: data.read_time ?? "3 min de lecture",
      source: data.source ?? "",
      paragraphs: Array.isArray(data.paragraphs) ? data.paragraphs : ["", "", "", ""],
    }}));
  } else {
    // Pré-remplit UNIQUEMENT si l'histoire du code n'a pas encore été vue avant
    const ref = new Date("2026-05-17T00:00:00");
    const paris = new Date(new Date(date + "T12:00:00").toLocaleString("en-US", { timeZone: "Europe/Paris" }));
    const diffDays = Math.floor((paris.getTime() - ref.getTime()) / 86400000);
    const levelStories = STORIES.filter((st: any) => st.level === level);
    const idx = Math.abs(diffDays) % levelStories.length;

    // Si l'index dépasse le nombre d'histoires uniques, pas de pré-remplissage
    if (diffDays >= levelStories.length) {
      setStoryForms(prev => ({ ...prev, [key]: emptyStory() }));
    } else {
      const codeStory = levelStories[idx];
      setStoryForms(prev => ({ ...prev, [key]: {
        title: codeStory?.title ?? "",
        category: codeStory?.category ?? "",
        readTime: codeStory?.readTime ?? "3 min de lecture",
        source: codeStory?.source ?? "",
        paragraphs: codeStory?.paragraphs ?? ["", "", "", ""],
      }}));
    }
  }
}

  async function saveStory(date: string, level: string) {
    const key = `${date}_${level}`;
    const form = storyForms[key];
    if (!form || !form.title.trim()) { setStoryMsg("❌ Le titre est obligatoire."); return; }
    setStorySaving(true); setStoryMsg("");
    const paras = form.paragraphs.filter(p => p.trim());
    const slug = `custom-${date}-${level.toLowerCase()}`;
    const { error } = await supabase.from("stories_custom").upsert({
      date, level, slug, title: form.title.trim(),
      category: form.category.trim() || "Divers",
      read_time: form.readTime.trim(),
      source: form.source.trim(),
      paragraphs: paras,
    }, { onConflict: "date,level" });
    if (error) setStoryMsg("❌ " + error.message);
    else { setStoryMsg("✅ Histoire sauvegardée !"); loadExistingStories(); }
    setStorySaving(false);
  }

  async function deleteStory(date: string, level: string) {
    if (!confirm(`Supprimer l'histoire ${level} du ${date} ?`)) return;
    await supabase.from("stories_custom").delete().eq("date", date).eq("level", level);
    loadExistingStories();
    setExpandedDate(null); setExpandedLevel(null);
  }

  async function openGame(date: string) {
    if (expandedGameDate === date) { setExpandedGameDate(null); return; }
    setExpandedGameDate(date); setGameMsg("");
    const { data } = await supabase.from("games_custom").select("*").eq("game_date", date).maybeSingle();
    if (data) {
      setGameForm({
        word_of_day: data.word_of_day ?? "", word_of_day_def: data.word_of_day_def ?? "", word_of_day_etym: data.word_of_day_etym ?? "",
        def_word: data.def_word ?? "", def_word_def: data.def_word_def ?? "",
        def_choice1: data.def_choice1 ?? "", def_choice2: data.def_choice2 ?? "", def_choice3: data.def_choice3 ?? "", def_choice4: data.def_choice4 ?? "",
        anag_word: data.anag_word ?? "", anag_word_def: data.anag_word_def ?? "",
        cit_text: data.cit_text ?? "", cit_answer: data.cit_answer ?? "",
        cit_choice1: data.cit_choice1 ?? "", cit_choice2: data.cit_choice2 ?? "", cit_choice3: data.cit_choice3 ?? "", cit_choice4: data.cit_choice4 ?? "",
        p_word_of_day: data.p_word_of_day ?? "", p_word_of_day_def: data.p_word_of_day_def ?? "", p_word_of_day_etym: data.p_word_of_day_etym ?? "",
        p_def_word: data.p_def_word ?? "", p_def_word_def: data.p_def_word_def ?? "",
        p_def_choice1: data.p_def_choice1 ?? "", p_def_choice2: data.p_def_choice2 ?? "", p_def_choice3: data.p_def_choice3 ?? "", p_def_choice4: data.p_def_choice4 ?? "",
        p_anag_word: data.p_anag_word ?? "", p_anag_word_def: data.p_anag_word_def ?? "",
        p_cit_text: data.p_cit_text ?? "", p_cit_answer: data.p_cit_answer ?? "",
        p_cit_choice1: data.p_cit_choice1 ?? "", p_cit_choice2: data.p_cit_choice2 ?? "", p_cit_choice3: data.p_cit_choice3 ?? "", p_cit_choice4: data.p_cit_choice4 ?? "",
      });
    } else {
      setGameForm(emptyGame());
    }
  }

  async function saveGame(date: string) {
    setGameSaving(true); setGameMsg("");
    const { error } = await supabase.from("games_custom").upsert({
      game_date: date, ...gameForm
    }, { onConflict: "game_date" });
    if (error) setGameMsg("❌ " + error.message);
    else { setGameMsg("✅ Jeux sauvegardés !"); loadExistingGames(); }
    setGameSaving(false);
  }

  async function deleteGame(date: string) {
    if (!confirm(`Supprimer les jeux du ${date} ?`)) return;
    await supabase.from("games_custom").delete().eq("game_date", date);
    loadExistingGames(); setExpandedGameDate(null);
  }

  function updateStoryForm(date: string, level: string, field: keyof StoryForm, value: any) {
    const key = `${date}_${level}`;
    setStoryForms(prev => ({ ...prev, [key]: { ...(prev[key] ?? emptyStory()), [field]: value } }));
  }

  function updateParagraph(date: string, level: string, idx: number, value: string) {
    const key = `${date}_${level}`;
    const paras = [...(storyForms[key]?.paragraphs ?? ["", "", "", ""])];
    paras[idx] = value;
    setStoryForms(prev => ({ ...prev, [key]: { ...(prev[key] ?? emptyStory()), paragraphs: paras } }));
  }

  function addParagraph(date: string, level: string) {
    const key = `${date}_${level}`;
    const paras = [...(storyForms[key]?.paragraphs ?? []), ""];
    setStoryForms(prev => ({ ...prev, [key]: { ...(prev[key] ?? emptyStory()), paragraphs: paras } }));
  }

  function removeParagraph(date: string, level: string, idx: number) {
    const key = `${date}_${level}`;
    const paras = (storyForms[key]?.paragraphs ?? []).filter((_, i) => i !== idx);
    setStoryForms(prev => ({ ...prev, [key]: { ...(prev[key] ?? emptyStory()), paragraphs: paras } }));
  }

  function formatDateFr(d: string) {
    return new Date(d + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "long" });
  }

  const inp: React.CSSProperties = { width: "100%", padding: "8px 10px", borderRadius: "8px", background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text)", fontFamily: "inherit", fontSize: "0.85rem", marginBottom: "8px" };
  const lbl: React.CSSProperties = { fontSize: "0.72rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px", display: "block" };
  const section: React.CSSProperties = { background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "10px", padding: "14px", marginBottom: "10px" };
  const sectionTitle: React.CSSProperties = { fontSize: "0.78rem", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "10px" };

  if (!authorized) return null;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>⚙️ Admin — Contenu</h1>
        <a href="/admin" className={styles.backBtn}>← Admin général</a>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${activeTab === "stories" ? styles.tabActive : ""}`} onClick={() => setActiveTab("stories")}>📖 Histoires</button>
        <button className={`${styles.tab} ${activeTab === "games" ? styles.tabActive : ""}`} onClick={() => setActiveTab("games")}>🎮 Jeux</button>
      </div>

      {/* ── HISTOIRES ── */}
      {activeTab === "stories" && (
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <p style={{ fontSize: "0.82rem", color: "var(--text-dim)", marginBottom: "16px" }}>
            Les histoires que tu crées ici remplacent automatiquement celles du code pour la date et le niveau choisis.
          </p>
          {ALL_DATES.map(date => (
            <div key={date} style={{ marginBottom: "6px" }}>
              {/* Header date */}
              <button
                onClick={() => { setExpandedDate(expandedDate === date && !expandedLevel ? null : date); setExpandedLevel(null); }}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "10px", cursor: "pointer", color: "var(--text)", fontFamily: "inherit" }}
              >
                <span style={{ fontWeight: 600, fontSize: "0.88rem" }}>{formatDateFr(date)}</span>
                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  {LEVELS.map(lvl => existingStories[`${date}_${lvl}`] && (
                    <span key={lvl} style={{ fontSize: "0.65rem", padding: "2px 6px", borderRadius: "50px", background: "rgba(232,201,122,0.2)", color: "var(--accent)", border: "1px solid rgba(232,201,122,0.3)" }}>{lvl}</span>
                  ))}
                  <span style={{ color: "var(--text-dim)", fontSize: "0.85rem" }}>{expandedDate === date ? "↑" : "→"}</span>
                </div>
              </button>

              {/* Niveaux */}
              {expandedDate === date && (
                <div style={{ padding: "8px 0 0 12px", display: "flex", gap: "8px" }}>
                  {LEVELS.map(lvl => (
                    <button key={lvl} onClick={() => openStory(date, lvl)}
                      style={{ padding: "6px 14px", borderRadius: "8px", border: `1px solid ${expandedLevel === lvl ? "var(--accent)" : "var(--border)"}`, background: expandedLevel === lvl ? "rgba(232,201,122,0.1)" : "var(--surface)", color: expandedLevel === lvl ? "var(--accent)" : "var(--text-muted)", cursor: "pointer", fontFamily: "inherit", fontSize: "0.82rem", fontWeight: 600 }}>
                      {existingStories[`${date}_${lvl}`] ? "✅ " : ""}{lvl}
                    </button>
                  ))}
                </div>
              )}

              {/* Formulaire histoire */}
              {expandedDate === date && expandedLevel && (
                <div style={{ margin: "10px 0 0 12px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px" }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text)", marginBottom: "14px" }}>
                    ✏️ Histoire — {expandedLevel} — {formatDateFr(date)}
                  </div>

                  {storyMsg && <div style={{ marginBottom: "10px", fontSize: "0.82rem", color: storyMsg.startsWith("✅") ? "var(--green)" : "#e07070" }}>{storyMsg}</div>}

                  <div style={section}>
                    <div style={sectionTitle}>Informations</div>
                    <label style={lbl}>Titre *</label>
                    <input style={inp} value={storyForms[`${date}_${expandedLevel}`]?.title ?? ""} onChange={e => updateStoryForm(date, expandedLevel!, "title", e.target.value)} placeholder="Titre de l'histoire..." />
                    <label style={lbl}>Catégorie</label>
                    <input style={inp} value={storyForms[`${date}_${expandedLevel}`]?.category ?? ""} onChange={e => updateStoryForm(date, expandedLevel!, "category", e.target.value)} placeholder="Science, Histoire, Philosophie..." />
                    <label style={lbl}>Temps de lecture</label>
                    <input style={inp} value={storyForms[`${date}_${expandedLevel}`]?.readTime ?? ""} onChange={e => updateStoryForm(date, expandedLevel!, "readTime", e.target.value)} placeholder="3 min de lecture" />
                    <label style={lbl}>Source</label>
                    <input style={inp} value={storyForms[`${date}_${expandedLevel}`]?.source ?? ""} onChange={e => updateStoryForm(date, expandedLevel!, "source", e.target.value)} placeholder="D'après..." />
                  </div>

                  <div style={section}>
                    <div style={sectionTitle}>Paragraphes</div>
                    {(storyForms[`${date}_${expandedLevel}`]?.paragraphs ?? []).map((p, i) => (
                      <div key={i} style={{ marginBottom: "8px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                          <label style={{ ...lbl, marginBottom: 0 }}>Paragraphe {i + 1}</label>
                          <button onClick={() => removeParagraph(date, expandedLevel!, i)} style={{ background: "none", border: "none", color: "#e07070", cursor: "pointer", fontSize: "0.75rem" }}>✕ Supprimer</button>
                        </div>
                        <textarea style={{ ...inp, minHeight: "80px", resize: "vertical", marginBottom: 0 }} value={p} onChange={e => updateParagraph(date, expandedLevel!, i, e.target.value)} placeholder={`Texte du paragraphe ${i + 1}...`} />
                      </div>
                    ))}
                    <button onClick={() => addParagraph(date, expandedLevel!)} style={{ padding: "6px 14px", borderRadius: "8px", background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text-muted)", cursor: "pointer", fontFamily: "inherit", fontSize: "0.82rem" }}>
                      + Ajouter un paragraphe
                    </button>
                  </div>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => saveStory(date, expandedLevel!)} disabled={storySaving} style={{ flex: 1, padding: "10px", borderRadius: "10px", background: "var(--accent)", border: "none", color: "var(--bg)", fontFamily: "inherit", fontSize: "0.88rem", fontWeight: 700, cursor: "pointer" }}>
                      {storySaving ? "Sauvegarde..." : "💾 Sauvegarder"}
                    </button>
                    {existingStories[`${date}_${expandedLevel}`] && (
                      <button onClick={() => deleteStory(date, expandedLevel!)} style={{ padding: "10px 16px", borderRadius: "10px", background: "none", border: "1px solid #e07070", color: "#e07070", cursor: "pointer", fontFamily: "inherit", fontSize: "0.88rem" }}>
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── JEUX ── */}
      {activeTab === "games" && (
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <p style={{ fontSize: "0.82rem", color: "var(--text-dim)", marginBottom: "16px" }}>
            Les jeux que tu prépares ici remplacent ceux du code pour le jour choisi. Pour la citation, écris *** à l'endroit du mot manquant.
          </p>
          {ALL_DATES.map(date => (
            <div key={date} style={{ marginBottom: "6px" }}>
              <button
                onClick={() => openGame(date)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "10px", cursor: "pointer", color: "var(--text)", fontFamily: "inherit" }}
              >
                <span style={{ fontWeight: 600, fontSize: "0.88rem" }}>{formatDateFr(date)}</span>
                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  {existingGames[date] && <span style={{ fontSize: "0.65rem", padding: "2px 6px", borderRadius: "50px", background: "rgba(232,201,122,0.2)", color: "var(--accent)", border: "1px solid rgba(232,201,122,0.3)" }}>✅ Configuré</span>}
                  <span style={{ color: "var(--text-dim)", fontSize: "0.85rem" }}>{expandedGameDate === date ? "↑" : "→"}</span>
                </div>
              </button>

              {expandedGameDate === date && (
                <div style={{ margin: "10px 0 0 0", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px" }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text)", marginBottom: "14px" }}>🎮 Jeux du {formatDateFr(date)}</div>
                  {gameMsg && <div style={{ marginBottom: "10px", fontSize: "0.82rem", color: gameMsg.startsWith("✅") ? "var(--green)" : "#e07070" }}>{gameMsg}</div>}

                  {/* GRATUIT */}
                  <div style={{ ...section, borderColor: "var(--border)" }}>
                    <div style={sectionTitle}>📚 Jeux gratuits</div>

                    <div style={{ marginBottom: "12px" }}>
                      <div style={{ ...lbl, color: "var(--accent)" }}>📖 Mot du jour</div>
                      <input style={inp} placeholder="Mot" value={gameForm.word_of_day} onChange={e => setGameForm(p => ({ ...p, word_of_day: e.target.value }))} />
                      <input style={inp} placeholder="Définition simple" value={gameForm.word_of_day_def} onChange={e => setGameForm(p => ({ ...p, word_of_day_def: e.target.value }))} />
                      <input style={inp} placeholder="Étymologie" value={gameForm.word_of_day_etym} onChange={e => setGameForm(p => ({ ...p, word_of_day_etym: e.target.value }))} />
                    </div>

                    <div style={{ marginBottom: "12px" }}>
                      <div style={{ ...lbl, color: "var(--accent)" }}>🔍 Définition mystère</div>
                      <input style={inp} placeholder="Mot à trouver" value={gameForm.def_word} onChange={e => setGameForm(p => ({ ...p, def_word: e.target.value }))} />
                      <input style={inp} placeholder="Définition à afficher" value={gameForm.def_word_def} onChange={e => setGameForm(p => ({ ...p, def_word_def: e.target.value }))} />
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                        <input style={{ ...inp, marginBottom: 0 }} placeholder="Choix 1 (correct)" value={gameForm.def_choice1} onChange={e => setGameForm(p => ({ ...p, def_choice1: e.target.value }))} />
                        <input style={{ ...inp, marginBottom: 0 }} placeholder="Choix 2" value={gameForm.def_choice2} onChange={e => setGameForm(p => ({ ...p, def_choice2: e.target.value }))} />
                        <input style={{ ...inp, marginBottom: 0 }} placeholder="Choix 3" value={gameForm.def_choice3} onChange={e => setGameForm(p => ({ ...p, def_choice3: e.target.value }))} />
                        <input style={{ ...inp, marginBottom: 0 }} placeholder="Choix 4" value={gameForm.def_choice4} onChange={e => setGameForm(p => ({ ...p, def_choice4: e.target.value }))} />
                      </div>
                    </div>

                    <div style={{ marginBottom: "12px" }}>
                      <div style={{ ...lbl, color: "var(--accent)" }}>🔤 Anagramme</div>
                      <input style={inp} placeholder="Mot à anagrammer" value={gameForm.anag_word} onChange={e => setGameForm(p => ({ ...p, anag_word: e.target.value }))} />
                      <input style={inp} placeholder="Définition indice" value={gameForm.anag_word_def} onChange={e => setGameForm(p => ({ ...p, anag_word_def: e.target.value }))} />
                    </div>

                    <div>
                      <div style={{ ...lbl, color: "var(--accent)" }}>💬 Citation (écris *** pour le mot manquant)</div>
                      <textarea style={{ ...inp, minHeight: "60px", resize: "vertical" }} placeholder="Texte avec *** à la place du mot manquant" value={gameForm.cit_text} onChange={e => setGameForm(p => ({ ...p, cit_text: e.target.value }))} />
                      <input style={inp} placeholder="Réponse correcte" value={gameForm.cit_answer} onChange={e => setGameForm(p => ({ ...p, cit_answer: e.target.value }))} />
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                        <input style={{ ...inp, marginBottom: 0 }} placeholder="Choix 1 (correct)" value={gameForm.cit_choice1} onChange={e => setGameForm(p => ({ ...p, cit_choice1: e.target.value }))} />
                        <input style={{ ...inp, marginBottom: 0 }} placeholder="Choix 2" value={gameForm.cit_choice2} onChange={e => setGameForm(p => ({ ...p, cit_choice2: e.target.value }))} />
                        <input style={{ ...inp, marginBottom: 0 }} placeholder="Choix 3" value={gameForm.cit_choice3} onChange={e => setGameForm(p => ({ ...p, cit_choice3: e.target.value }))} />
                        <input style={{ ...inp, marginBottom: 0 }} placeholder="Choix 4" value={gameForm.cit_choice4} onChange={e => setGameForm(p => ({ ...p, cit_choice4: e.target.value }))} />
                      </div>
                    </div>
                  </div>

                  {/* PREMIUM */}
                  <div style={{ ...section, borderColor: "rgba(232,201,122,0.3)", background: "linear-gradient(135deg, rgba(30,26,14,0.5), rgba(42,34,16,0.5))" }}>
                    <div style={{ ...sectionTitle, color: "var(--accent)" }}>✨ Jeux Premium</div>

                    <div style={{ marginBottom: "12px" }}>
                      <div style={{ ...lbl, color: "var(--accent)" }}>📖 Mot Premium du jour</div>
                      <input style={inp} placeholder="Mot" value={gameForm.p_word_of_day} onChange={e => setGameForm(p => ({ ...p, p_word_of_day: e.target.value }))} />
                      <input style={inp} placeholder="Définition simple" value={gameForm.p_word_of_day_def} onChange={e => setGameForm(p => ({ ...p, p_word_of_day_def: e.target.value }))} />
                      <input style={inp} placeholder="Étymologie" value={gameForm.p_word_of_day_etym} onChange={e => setGameForm(p => ({ ...p, p_word_of_day_etym: e.target.value }))} />
                    </div>

                    <div style={{ marginBottom: "12px" }}>
                      <div style={{ ...lbl, color: "var(--accent)" }}>🔍 Définition Expert</div>
                      <input style={inp} placeholder="Mot à trouver" value={gameForm.p_def_word} onChange={e => setGameForm(p => ({ ...p, p_def_word: e.target.value }))} />
                      <input style={inp} placeholder="Définition à afficher" value={gameForm.p_def_word_def} onChange={e => setGameForm(p => ({ ...p, p_def_word_def: e.target.value }))} />
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                        <input style={{ ...inp, marginBottom: 0 }} placeholder="Choix 1 (correct)" value={gameForm.p_def_choice1} onChange={e => setGameForm(p => ({ ...p, p_def_choice1: e.target.value }))} />
                        <input style={{ ...inp, marginBottom: 0 }} placeholder="Choix 2" value={gameForm.p_def_choice2} onChange={e => setGameForm(p => ({ ...p, p_def_choice2: e.target.value }))} />
                        <input style={{ ...inp, marginBottom: 0 }} placeholder="Choix 3" value={gameForm.p_def_choice3} onChange={e => setGameForm(p => ({ ...p, p_def_choice3: e.target.value }))} />
                        <input style={{ ...inp, marginBottom: 0 }} placeholder="Choix 4" value={gameForm.p_def_choice4} onChange={e => setGameForm(p => ({ ...p, p_def_choice4: e.target.value }))} />
                      </div>
                    </div>

                    <div style={{ marginBottom: "12px" }}>
                      <div style={{ ...lbl, color: "var(--accent)" }}>🔤 Anagramme Expert</div>
                      <input style={inp} placeholder="Mot à anagrammer" value={gameForm.p_anag_word} onChange={e => setGameForm(p => ({ ...p, p_anag_word: e.target.value }))} />
                      <input style={inp} placeholder="Définition indice" value={gameForm.p_anag_word_def} onChange={e => setGameForm(p => ({ ...p, p_anag_word_def: e.target.value }))} />
                    </div>

                    <div>
                      <div style={{ ...lbl, color: "var(--accent)" }}>💬 Citation Philosophique (*** pour le mot manquant)</div>
                      <textarea style={{ ...inp, minHeight: "60px", resize: "vertical" }} placeholder="Texte avec ***" value={gameForm.p_cit_text} onChange={e => setGameForm(p => ({ ...p, p_cit_text: e.target.value }))} />
                      <input style={inp} placeholder="Réponse correcte" value={gameForm.p_cit_answer} onChange={e => setGameForm(p => ({ ...p, p_cit_answer: e.target.value }))} />
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                        <input style={{ ...inp, marginBottom: 0 }} placeholder="Choix 1 (correct)" value={gameForm.p_cit_choice1} onChange={e => setGameForm(p => ({ ...p, p_cit_choice1: e.target.value }))} />
                        <input style={{ ...inp, marginBottom: 0 }} placeholder="Choix 2" value={gameForm.p_cit_choice2} onChange={e => setGameForm(p => ({ ...p, p_cit_choice2: e.target.value }))} />
                        <input style={{ ...inp, marginBottom: 0 }} placeholder="Choix 3" value={gameForm.p_cit_choice3} onChange={e => setGameForm(p => ({ ...p, p_cit_choice3: e.target.value }))} />
                        <input style={{ ...inp, marginBottom: 0 }} placeholder="Choix 4" value={gameForm.p_cit_choice4} onChange={e => setGameForm(p => ({ ...p, p_cit_choice4: e.target.value }))} />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => saveGame(date)} disabled={gameSaving} style={{ flex: 1, padding: "10px", borderRadius: "10px", background: "var(--accent)", border: "none", color: "var(--bg)", fontFamily: "inherit", fontSize: "0.88rem", fontWeight: 700, cursor: "pointer" }}>
                      {gameSaving ? "Sauvegarde..." : "💾 Sauvegarder"}
                    </button>
                    {existingGames[date] && (
                      <button onClick={() => deleteGame(date)} style={{ padding: "10px 16px", borderRadius: "10px", background: "none", border: "1px solid #e07070", color: "#e07070", cursor: "pointer", fontFamily: "inherit", fontSize: "0.88rem" }}>
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
