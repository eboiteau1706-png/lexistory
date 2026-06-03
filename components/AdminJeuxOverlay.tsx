"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";

const ADMIN_ID = "0450c58e-35b2-47e6-9600-13db5626e96d";

const inp: React.CSSProperties = {
  width: "100%", background: "var(--surface2)", border: "1px solid rgba(212,168,67,0.4)",
  borderRadius: "6px", padding: "6px 10px", color: "var(--text)", fontFamily: "inherit",
  fontSize: "0.85rem", boxSizing: "border-box", marginBottom: "6px",
};

function shuffleChoices(correct: string, wrongs: string[]): string[] {
  const all = [correct, ...wrongs.filter(Boolean)].filter(Boolean);
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all;
}

function getNavDate(offset: number): string {
  const paris = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" }));
  paris.setDate(paris.getDate() + offset);
  return `${paris.getFullYear()}-${String(paris.getMonth()+1).padStart(2,"0")}-${String(paris.getDate()).padStart(2,"0")}`;
}

function formatDateFr(dateStr: string) {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "long" });
}

const emptyGame = (): Record<string, string> => ({
  word_of_day: "", word_of_day_def: "", word_of_day_etym: "",
  def_word: "", def_word_def: "", def_wrong1: "", def_wrong2: "", def_wrong3: "",
  anag_word: "", anag_word_def: "",
  cit_text: "", cit_answer: "", cit_wrong1: "", cit_wrong2: "", cit_wrong3: "",
  p_word_of_day: "", p_word_of_day_def: "", p_word_of_day_etym: "",
  p_def_word: "", p_def_word_def: "", p_def_wrong1: "", p_def_wrong2: "", p_def_wrong3: "",
  p_anag_word: "", p_anag_word_def: "",
  p_cit_text: "", p_cit_answer: "", p_cit_wrong1: "", p_cit_wrong2: "", p_cit_wrong3: "",
});

export default function AdminJeuxOverlay() {
  const supabase = createClient();
  const [isAdmin, setIsAdmin]   = useState(false);
  const [token, setToken]       = useState<string | null>(null);
  const [navOffset, setNavOffset] = useState(0); // 0=today, 1=tomorrow, etc.

  const [gameModal, setGameModal]   = useState(false);
  const [gameLoading, setGameLoading] = useState(false);
  const [gameSaving, setGameSaving]   = useState(false);
  const [gameMsg, setGameMsg]         = useState("");
  const [gameTab, setGameTab]         = useState<"edit"|"preview">("edit");
  const [game, setGame]               = useState<Record<string, string>>(emptyGame());

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.id === ADMIN_ID) { setIsAdmin(true); setToken(session.access_token); }
    });
  }, []);

  if (!isAdmin) return null;

  const navDate = getNavDate(navOffset);

  async function openGameModal() {
    setGameLoading(true); setGameModal(true); setGameMsg(""); setGameTab("edit");
    try {
      const res  = await fetch(`/api/effective-game?date=${navDate}`);
      const json = await res.json();
      const g    = json.game;
      if (g) {
        setGame({
          word_of_day: g.word_of_day??"", word_of_day_def: g.word_of_day_def??"", word_of_day_etym: g.word_of_day_etym??"",
          def_word: g.def_word??"", def_word_def: g.def_word_def??"",
          ...(() => { const ws=[g.def_choice1,g.def_choice2,g.def_choice3,g.def_choice4].filter((c:string)=>c&&c!==g.def_word); return {def_wrong1:ws[0]??"",def_wrong2:ws[1]??"",def_wrong3:ws[2]??""}; })(),
          anag_word: g.anag_word??"", anag_word_def: g.anag_word_def??"",
          cit_text: g.cit_text??"", cit_answer: g.cit_answer??"",
          ...(() => { const ws=[g.cit_choice1,g.cit_choice2,g.cit_choice3,g.cit_choice4].filter((c:string)=>c&&c!==g.cit_answer); return {cit_wrong1:ws[0]??"",cit_wrong2:ws[1]??"",cit_wrong3:ws[2]??""}; })(),
          p_word_of_day: g.p_word_of_day??"", p_word_of_day_def: g.p_word_of_day_def??"", p_word_of_day_etym: g.p_word_of_day_etym??"",
          p_def_word: g.p_def_word??"", p_def_word_def: g.p_def_word_def??"",
          ...(() => { const ws=[g.p_def_choice1,g.p_def_choice2,g.p_def_choice3,g.p_def_choice4].filter((c:string)=>c&&c!==g.p_def_word); return {p_def_wrong1:ws[0]??"",p_def_wrong2:ws[1]??"",p_def_wrong3:ws[2]??""}; })(),
          p_anag_word: g.p_anag_word??"", p_anag_word_def: g.p_anag_word_def??"",
          p_cit_text: g.p_cit_text??"", p_cit_answer: g.p_cit_answer??"",
          ...(() => { const ws=[g.p_cit_choice1,g.p_cit_choice2,g.p_cit_choice3,g.p_cit_choice4].filter((c:string)=>c&&c!==g.p_cit_answer); return {p_cit_wrong1:ws[0]??"",p_cit_wrong2:ws[1]??"",p_cit_wrong3:ws[2]??""}; })(),
        });
      } else { setGame(emptyGame()); }
    } catch { setGame(emptyGame()); }
    setGameLoading(false);
  }

  async function saveGame() {
    setGameSaving(true); setGameMsg("");
    const dc  = shuffleChoices(game.def_word,    [game.def_wrong1,   game.def_wrong2,   game.def_wrong3]);
    const cc  = shuffleChoices(game.cit_answer,  [game.cit_wrong1,   game.cit_wrong2,   game.cit_wrong3]);
    const pdc = shuffleChoices(game.p_def_word,  [game.p_def_wrong1, game.p_def_wrong2, game.p_def_wrong3]);
    const pcc = shuffleChoices(game.p_cit_answer,[game.p_cit_wrong1, game.p_cit_wrong2, game.p_cit_wrong3]);
    const payload: any = { game_date: navDate, ...game,
      def_choice1: dc[0]??"", def_choice2: dc[1]??"", def_choice3: dc[2]??"", def_choice4: dc[3]??"",
      cit_choice1: cc[0]??"", cit_choice2: cc[1]??"", cit_choice3: cc[2]??"", cit_choice4: cc[3]??"",
      p_def_choice1: pdc[0]??"", p_def_choice2: pdc[1]??"", p_def_choice3: pdc[2]??"", p_def_choice4: pdc[3]??"",
      p_cit_choice1: pcc[0]??"", p_cit_choice2: pcc[1]??"", p_cit_choice3: pcc[2]??"", p_cit_choice4: pcc[3]??"",
    };
    ["def_wrong1","def_wrong2","def_wrong3","cit_wrong1","cit_wrong2","cit_wrong3",
     "p_def_wrong1","p_def_wrong2","p_def_wrong3","p_cit_wrong1","p_cit_wrong2","p_cit_wrong3"]
      .forEach(k => delete payload[k]);
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

  const navBtn: React.CSSProperties = {
    background: "rgba(212,168,67,0.08)", border: "1px solid rgba(212,168,67,0.25)",
    borderRadius: "6px", color: "rgba(212,168,67,0.8)", cursor: "pointer",
    fontFamily: "inherit", fontSize: "0.75rem", padding: "3px 10px",
  };

  return (
    <>
      {/* ── Barre navigation admin ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px", opacity: 0.85, flexWrap: "wrap" }}>
        <button style={navBtn} onClick={() => setNavOffset(v => v - 1)}>← J-1</button>
        {navOffset !== 0 ? (
          <span style={{ fontSize: "0.7rem", background: "rgba(212,168,67,0.12)", border: "1px solid rgba(212,168,67,0.3)", borderRadius: "50px", padding: "2px 8px", color: "rgba(212,168,67,0.8)" }}>
            {navOffset > 0 ? `J+${navOffset}` : `J${navOffset}`} · {formatDateFr(navDate)}
          </span>
        ) : (
          <span style={{ fontSize: "0.7rem", color: "rgba(212,168,67,0.5)" }}>Aujourd'hui · {formatDateFr(navDate)}</span>
        )}
        <button style={navBtn} onClick={() => setNavOffset(v => v + 1)}>J+1 →</button>
        {navOffset !== 0 && (
          <button style={{ ...navBtn, fontSize: "0.7rem" }} onClick={() => setNavOffset(0)}>↩ Revenir</button>
        )}
        <div style={{ flex: 1 }} />
        <button style={{ ...navBtn, border: "1px solid rgba(212,168,67,0.4)" }} onClick={openGameModal}>
          ✏️ Éditer ce jeu
        </button>
      </div>

      {/* ── Modale édition jeu (identique AdminOverlay) ── */}
      {gameModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <div style={{ background: "var(--surface)", border: "1.5px dashed rgba(212,168,67,0.5)", borderRadius: "16px", padding: "24px", maxWidth: "800px", width: "100%", maxHeight: "90vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexShrink: 0 }}>
              <div style={{ fontFamily: "var(--font-playfair)", fontSize: "1rem", fontWeight: 700, color: "var(--accent)" }}>🎮 Jeux du {formatDateFr(navDate)}</div>
              <div style={{ display: "flex", gap: "4px" }}>
                {(["edit","preview"] as const).map(t => (
                  <button key={t} onClick={() => setGameTab(t)} style={{ padding: "4px 12px", borderRadius: "6px", border: `1px solid ${gameTab===t?"rgba(212,168,67,0.5)":"var(--border)"}`, background: gameTab===t?"rgba(212,168,67,0.1)":"none", color: gameTab===t?"var(--accent)":"var(--text-dim)", cursor: "pointer", fontFamily: "inherit", fontSize: "0.78rem" }}>
                    {t==="edit"?"✏️ Éditer":"👁 Prévisualiser"}
                  </button>
                ))}
                <button onClick={() => setGameModal(false)} style={{ ...navBtn, padding: "4px 10px", marginLeft: "8px" }}>✕</button>
              </div>
            </div>

            {gameLoading ? (
              <div style={{ textAlign: "center", padding: "24px", color: "var(--text-dim)" }}>Chargement…</div>
            ) : gameTab === "preview" ? (
              <div style={{ overflowY: "auto", flex: 1, paddingRight: "4px", display: "flex", flexDirection: "column", gap: "14px" }}>
                {game.word_of_day && <div style={{ background: "var(--surface2)", borderRadius: "10px", padding: "12px 14px" }}><div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: "6px" }}>📖 Mot du jour</div><div style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--accent)" }}>{game.word_of_day}</div>{game.word_of_day_etym&&<div style={{ fontSize: "0.72rem", color: "var(--text-dim)", fontStyle: "italic" }}>{game.word_of_day_etym}</div>}{game.word_of_day_def&&<div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "4px" }}>{game.word_of_day_def}</div>}</div>}
                {game.def_word && <div style={{ background: "var(--surface2)", borderRadius: "10px", padding: "12px 14px" }}><div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: "6px" }}>🔍 Définition mystère</div><div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "8px" }}>{game.def_word_def}</div><div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>{shuffleChoices(game.def_word,[game.def_wrong1,game.def_wrong2,game.def_wrong3]).map((c,i)=><span key={i} style={{ padding: "4px 10px", borderRadius: "6px", background: c===game.def_word?"rgba(34,197,94,0.15)":"var(--surface)", border: `1px solid ${c===game.def_word?"#22c55e":"var(--border)"}`, color: c===game.def_word?"#22c55e":"var(--text-muted)", fontSize: "0.82rem" }}>{c}{c===game.def_word?" ✓":""}</span>)}</div></div>}
                {game.anag_word && <div style={{ background: "var(--surface2)", borderRadius: "10px", padding: "12px 14px" }}><div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: "6px" }}>🔤 Anagramme</div><div style={{ fontFamily: "monospace", fontSize: "1.1rem", letterSpacing: "4px", color: "var(--accent)" }}>{game.anag_word.split("").sort(()=>Math.random()-0.5).join(" ")}</div><div style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "4px" }}>→ {game.anag_word}</div></div>}
                {game.cit_text && <div style={{ background: "var(--surface2)", borderRadius: "10px", padding: "12px 14px" }}><div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: "6px" }}>💬 Citation</div><div style={{ fontSize: "0.88rem", color: "var(--text-muted)", fontStyle: "italic", marginBottom: "8px" }}>"{game.cit_text.replace("***","___")}"</div><div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>{shuffleChoices(game.cit_answer,[game.cit_wrong1,game.cit_wrong2,game.cit_wrong3]).map((c,i)=><span key={i} style={{ padding: "4px 10px", borderRadius: "6px", background: c===game.cit_answer?"rgba(34,197,94,0.15)":"var(--surface)", border: `1px solid ${c===game.cit_answer?"#22c55e":"var(--border)"}`, color: c===game.cit_answer?"#22c55e":"var(--text-muted)", fontSize: "0.82rem" }}>{c}{c===game.cit_answer?" ✓":""}</span>)}</div></div>}
              </div>
            ) : (
              <div style={{ overflowY: "auto", flex: 1, paddingRight: "4px" }}>
                {[["📖 Mot du jour",["word_of_day:Mot","word_of_day_def:Définition simple","word_of_day_etym:Étymologie"]],["🔤 Anagramme",["anag_word:Mot à anagrammer","anag_word_def:Définition indice"]],["✨ Mot Premium",["p_word_of_day:Mot","p_word_of_day_def:Définition simple","p_word_of_day_etym:Étymologie"]],["✨ Anagramme Premium",["p_anag_word:Mot","p_anag_word_def:Définition indice"]]].map(([section,fields])=>(
                  <div key={section as string} style={{ marginBottom: "12px" }}><div style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(212,168,67,0.8)", marginBottom: "4px" }}>{section as string}</div>{(fields as string[]).map(f=>{const[key,ph]=f.split(":");return<input key={key} style={inp} placeholder={ph} value={game[key]??""} onChange={e=>setGame(g=>({...g,[key]:e.target.value}))}/>;})}</div>
                ))}
                {[
                  {title:"🔍 Définition mystère",fields:["def_word:Mot à trouver","def_word_def:Définition à afficher"],wrongs:["def_wrong1","def_wrong2","def_wrong3"],answer:"def_word"},
                  {title:"💬 Citation (***=mot manquant)",fields:["cit_text:Texte avec ***","cit_answer:✓ Réponse correcte"],wrongs:["cit_wrong1","cit_wrong2","cit_wrong3"],answer:"cit_answer"},
                  {title:"✨ Définition mystère Premium",fields:["p_def_word:Mot à trouver","p_def_word_def:Définition à afficher"],wrongs:["p_def_wrong1","p_def_wrong2","p_def_wrong3"],answer:"p_def_word"},
                  {title:"✨ Citation Premium",fields:["p_cit_text:Texte avec ***","p_cit_answer:✓ Réponse correcte"],wrongs:["p_cit_wrong1","p_cit_wrong2","p_cit_wrong3"],answer:"p_cit_answer"},
                ].map(sec=>(
                  <div key={sec.title} style={{ marginBottom: "14px", padding: "10px 12px", background: "rgba(0,0,0,0.15)", borderRadius: "8px" }}>
                    <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(212,168,67,0.8)", marginBottom: "6px" }}>{sec.title}</div>
                    {sec.fields.map(f=>{const[key,ph]=f.split(":");const isC=ph.startsWith("✓");return isC?(<div key={key}><div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#22c55e", marginBottom: "3px" }}>✓ Bonne réponse</div><div style={{ position: "relative" }}><input style={{ ...inp, background: "rgba(34,197,94,0.15)", border: "2px solid #22c55e", color: "#86efac", paddingRight: "32px" }} placeholder="La bonne réponse" value={game[key]??""} onChange={e=>setGame(g=>({...g,[key]:e.target.value}))}/><span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "#22c55e", fontWeight: 700, fontSize: "0.9rem", pointerEvents: "none" }}>✓</span></div></div>):(<input key={key} style={inp} placeholder={ph} value={game[key]??""} onChange={e=>setGame(g=>({...g,[key]:e.target.value}))}/>);})}
                    <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", margin: "4px 0 2px" }}>Mauvais choix (seront mélangés) :</div>
                    {sec.wrongs.map((k,i)=><input key={k} style={{ ...inp, marginBottom: i<2?"6px":undefined }} placeholder={`Mauvais choix ${i+1}`} value={game[k]??""} onChange={e=>setGame(g=>({...g,[k]:e.target.value}))}/>)}
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "12px", flexShrink: 0, borderTop: "1px solid var(--border)", paddingTop: "12px" }}>
              <button onClick={() => setGameModal(false)} style={{ padding: "7px 16px", borderRadius: "8px", background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text-muted)", fontFamily: "inherit", cursor: "pointer", fontSize: "0.85rem" }}>Annuler</button>
              <button onClick={saveGame} disabled={gameSaving} style={{ padding: "7px 18px", borderRadius: "8px", background: "var(--accent)", border: "none", color: "var(--bg)", fontFamily: "inherit", fontWeight: 700, cursor: "pointer", fontSize: "0.85rem" }}>
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
