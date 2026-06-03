"use client";
import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { createClient } from "@/lib/supabase";
import { getStoryXp, getStreakBonus } from "@/lib/xp";
import WordPopup from "./WordPopup";
import ClickableText, { toPhrase } from "./ClickableText";
import StoryRating from "./StoryRating";
import { lookup } from "@/lib/dictionary";
import CategoryModal from "./CategoryModal";
import styles from "./StoryCard.module.css";
import type { Story } from "@/lib/stories";

interface Props { story: Story; }

const ADMIN_ID = "0450c58e-35b2-47e6-9600-13db5626e96d";
interface WGroup { id: string; story_id: string; group_text: string; words: string[]; }

function getProgressKey(slug: string, userId: string | null) {
  return `lx_progress_${userId ?? "guest"}_${slug}`;
}

function toParisDateStr(date: Date): string {
  const d = new Date(date.toLocaleString("en-US", { timeZone: "Europe/Paris" }));
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function StoryCard({ story }: Props) {
  const [seenWords, setSeenWords]               = useState<Set<string>>(new Set());
  const [activeWord, setActiveWord]             = useState<string | null>(null);
  const [userId, setUserId]                     = useState<string | null>(null);
  const [isPremium, setIsPremium]               = useState(false);
  const [xpGained, setXpGained]                 = useState<number | null>(null);
  const [readPct, setReadPct]                   = useState(0);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [defsRemaining, setDefsRemaining]       = useState<number | null>(null);
  const [showInfo, setShowInfo]                 = useState(false);
  const [showCategory, setShowCategory]         = useState(false);
  const [groupWords, setGroupWords]             = useState<Set<string>>(new Set());
  const [isAdmin, setIsAdmin]                   = useState(false);
  const [wordGroupsList, setWordGroupsList]     = useState<WGroup[]>([]);
  const [ctxMenu, setCtxMenu]                   = useState<{x:number;y:number;sel:string}|null>(null);
  const [defModal, setDefModal]                 = useState<{word:string;etym:string;defOrig:string;defSimple:string}|null>(null);
  const [defSaving, setDefSaving]               = useState(false);
  const [toast, setToast]                       = useState<string|null>(null);
  const doneRef        = useRef(false);
  const intervalRef    = useRef<NodeJS.Timeout | null>(null);
  const userReadyRef   = useRef(false); // true only when the logged-in user's own timer reached 100
  const pausedRef      = useRef(false);
  const supabase       = createClient();

  useEffect(() => {
    supabase.from("definitions_custom").select("word").eq("is_group", true)
      .then(({ data }) => {
        if (data) setGroupWords(new Set(data.map((d: any) =>
          (d.word as string).trim().split(/\s+/).map(toPhrase).join(" ")
        )));
      });
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserId(session.user.id);
        setIsAdmin(session.user.id === ADMIN_ID);
        supabase.from("profiles").select("is_premium").eq("id", session.user.id).single()
          .then(({ data }) => { if (data?.is_premium) setIsPremium(true); });
      }
    });
  }, []);

  // Re-fetch def count whenever the story or user changes
  useEffect(() => {
    if (!userId || isPremium) return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) return;
      fetch(`/api/def-usage?story_id=${story.slug}`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      }).then(r => r.json()).then(d => { if (d.remaining >= 0) setDefsRemaining(d.remaining); });
    });
  }, [story.slug, userId, isPremium]);

  // Load word groups for this story
  const loadWordGroups = async () => {
    const r = await fetch(`/api/word-groups?story_id=${story.slug}`);
    const d = await r.json();
    if (Array.isArray(d.groups)) setWordGroupsList(d.groups);
  };

  useEffect(() => { loadWordGroups(); }, [story.slug]);

  // Pause timer when tab is hidden
  useEffect(() => {
    const onVisibility = () => { pausedRef.current = document.hidden; };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    setSeenWords(new Set());
    setActiveWord(null);
    setXpGained(null);
    setAlreadyCompleted(false);
    setDefsRemaining(null);
    doneRef.current = false;
    userReadyRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const savedRaw = parseInt(localStorage.getItem(getProgressKey(story.slug, userId)) ?? "0");
    const savedPct = isNaN(savedRaw) ? 0 : savedRaw;
    setReadPct(savedPct);

    if (!userId) {
      if (savedPct < 100) {
        intervalRef.current = setInterval(() => {
          if (pausedRef.current) return;
          setReadPct(prev => {
            const next = prev >= 100 ? 100 : prev + 1;
            localStorage.setItem(getProgressKey(story.slug, null), String(next));
            if (next >= 100 && intervalRef.current) clearInterval(intervalRef.current);
            return next;
          });
        }, 600);
      }
      return;
    }

    const currentSlug = story.slug;

    supabase.from("stories_read").select("id")
      .eq("user_id", userId)
      .eq("story_slug", currentSlug)
      .maybeSingle()
      .then(({ data }) => {
        if (currentSlug !== story.slug) return;

        if (data) {
          setAlreadyCompleted(true);
          setReadPct(100);
          doneRef.current = true;
          localStorage.removeItem(getProgressKey(story.slug, userId));
          return;
        } else if (savedPct >= 100) {
          localStorage.removeItem(getProgressKey(story.slug, userId));
          setReadPct(0);
          intervalRef.current = setInterval(() => {
            if (pausedRef.current) return;
            setReadPct(prev => {
              const next = prev >= 100 ? 100 : prev + 1;
              localStorage.setItem(getProgressKey(story.slug, userId), String(next));
              if (next >= 100) { userReadyRef.current = true; if (intervalRef.current) clearInterval(intervalRef.current); }
              return next;
            });
          }, 600);
        } else if (savedPct < 100) {
          intervalRef.current = setInterval(() => {
            if (pausedRef.current) return;
            setReadPct(prev => {
              const next = prev >= 100 ? 100 : prev + 1;
              localStorage.setItem(getProgressKey(story.slug, userId), String(next));
              if (next >= 100) { userReadyRef.current = true; if (intervalRef.current) clearInterval(intervalRef.current); }
              return next;
            });
          }, 600);
        }
      });

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [story.slug, userId]);

  useEffect(() => {
    if (readPct < 100 || !userId || doneRef.current || alreadyCompleted || !userReadyRef.current) return;
    doneRef.current = true;

    const markRead = async () => {
      const { data: existing } = await supabase
        .from("stories_read").select("id")
        .eq("user_id", userId).eq("story_slug", story.slug).maybeSingle();

      if (existing) { setAlreadyCompleted(true); return; }

      await supabase.from("stories_read").insert({
        user_id: userId,
        story_slug: story.slug,
        story_level: story.level,
      });
      await supabase.from("profiles").update({ last_active_at: new Date().toISOString() }).eq("id", userId);

      localStorage.removeItem(getProgressKey(story.slug, userId));

      const { data: reads } = await supabase
        .from("stories_read").select("read_at")
        .eq("user_id", userId).order("read_at", { ascending: false });

      let streak = 1;
      if (reads && reads.length > 1) {
        const dates = [...new Set(reads.map((d: any) => toParisDateStr(new Date(d.read_at))))];
        const todayParis = toParisDateStr(new Date());
        const yesterdayParis = toParisDateStr(new Date(Date.now() - 86400000));

        if (dates[0] !== todayParis && dates[0] !== yesterdayParis) {
          streak = 1;
        } else {
          for (let i = 1; i < dates.length; i++) {
            const d1 = new Date(dates[i-1]);
            const d2 = new Date(dates[i]);
            const diff = (d1.getTime() - d2.getTime()) / 86400000;
            if (Math.round(diff) === 1) streak++; else break;
          }
        }
      }

      const todayParis = toParisDateStr(new Date());
      const readsTodayCount = reads
        ? reads.filter((d: any) => toParisDateStr(new Date(d.read_at)) === todayParis).length
        : 0;
      const isFirstTodayRead = readsTodayCount <= 1;

      const storyXp = getStoryXp(isPremium);

      function getStreakPalier(s: number) {
        if (s >= 30) return 30;
        if (s >= 10) return 10;
        if (s >= 5) return 5;
        if (s >= 3) return 3;
        return 0;
      }
      const palierHier = getStreakPalier(streak - 1);
      const palierAujourdhui = getStreakPalier(streak);
      const nouveauPalier = palierAujourdhui > palierHier;
      const bonusXp = (isFirstTodayRead && nouveauPalier) ? getStreakBonus(streak, isPremium) : 0;
      const totalXp = storyXp + bonusXp;

      const { data: profile } = await supabase
        .from("profiles").select("xp").eq("id", userId).single();
      const currentXp = profile?.xp ?? 0;
      await supabase.from("profiles").update({ xp: currentXp + totalXp }).eq("id", userId);

      setAlreadyCompleted(true);
      setXpGained(totalXp);
      setTimeout(() => setXpGained(null), 3000);
      window.dispatchEvent(new CustomEvent("lexistory:story-read"));
    };

    markRead();
  }, [readPct, userId, story.slug, isPremium]);

  const handleWordClick = useCallback(async (word: string) => {
    // If this word belongs to a word group, use the group text instead
    const group = wordGroupsList.find(g =>
      g.words.some(w => w.toLowerCase() === word.toLowerCase())
    );
    const effectiveWord = group ? group.group_text.toLowerCase() : word;

    setSeenWords(prev => {
      const next = new Set(prev);
      if (effectiveWord.includes(" ")) effectiveWord.split(/\s+/).forEach(part => next.delete(part));
      next.add(effectiveWord);
      return next;
    });
    setActiveWord(effectiveWord);
    if (userId) {
      await supabase.from("words_seen").upsert(
        { user_id: userId, word: effectiveWord },
        { onConflict: "user_id,word" }
      );
      window.dispatchEvent(new CustomEvent("lexistory:word-seen"));
    }
  }, [userId, wordGroupsList]);

  // ── Admin helpers ─────────────────────────────────────────────────────────
  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  async function getToken(): Promise<string | null> {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token ?? null;
  }

  function handleContextMenu(e: React.MouseEvent) {
    if (!isAdmin) return;
    const sel = window.getSelection()?.toString().trim() ?? "";
    if (sel.length < 2) return;
    e.preventDefault();
    setCtxMenu({ x: e.clientX, y: e.clientY, sel });
  }

  async function adminAddGroup(sel: string) {
    const words = sel.toLowerCase().split(/\s+/).filter(Boolean);
    const token = await getToken();
    await fetch("/api/word-groups", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ story_id: story.slug, group_text: sel, words }),
    });
    await loadWordGroups();
    setCtxMenu(null);
    showToast("Groupe ajouté ✓");
  }

  async function adminRemoveGroup(sel: string) {
    const grp = wordGroupsList.find(g => g.group_text.toLowerCase() === sel.toLowerCase());
    if (!grp) { setCtxMenu(null); showToast("Ce groupe n'existe pas"); return; }
    const token = await getToken();
    await fetch("/api/word-groups", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id: grp.id }),
    });
    await loadWordGroups();
    setCtxMenu(null);
    showToast("Groupe supprimé ✓");
  }

  async function openDefModal(sel: string) {
    const wordKey = sel.toLowerCase();
    const local = lookup(wordKey);
    let etym = local?.etym ?? "";
    let defOrig = local?.defOrig ?? "";
    let defSimple = local?.defSimple ?? "";
    const { data: custom } = await supabase
      .from("definitions_custom").select("senses").eq("word", wordKey).maybeSingle();
    if (custom?.senses?.[0]) {
      etym     = custom.senses[0].etym     || etym;
      defOrig  = custom.senses[0].defOrig  || defOrig;
      defSimple = custom.senses[0].defSimple || defSimple;
    }
    setCtxMenu(null);
    setDefModal({ word: sel, etym, defOrig, defSimple });
  }

  async function saveDefinition() {
    if (!defModal) return;
    setDefSaving(true);
    await supabase.from("definitions_custom").upsert({
      word: defModal.word.toLowerCase(),
      is_group: false,
      senses: [{ label: "", etym: defModal.etym, defOrig: defModal.defOrig, defSimple: defModal.defSimple }],
      story_origin: story.slug,
    }, { onConflict: "word" });
    setDefSaving(false);
    setDefModal(null);
    showToast("Définition enregistrée ✓");
  }

  // Merge definitions_custom groups + per-story word_groups into one set for ClickableText
  const allGroupWords = useMemo(() => {
    const merged = new Set(groupWords);
    wordGroupsList.forEach(g => {
      const normalized = g.group_text.trim().split(/\s+/).map(toPhrase).filter(Boolean).join(" ");
      merged.add(normalized);
    });
    return merged;
  }, [groupWords, wordGroupsList]);

  const displayPct = alreadyCompleted ? 100 : readPct;

  return (
    <>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.meta}>
            <span
              className={styles.tag}
              onClick={() => setShowCategory(true)}
              style={{ cursor: "pointer" }}
              title="Voir toutes les histoires de cette catégorie"
            >
              {story.category}
            </span>
            <h1 className={styles.title}>{story.title}</h1>
            <p className={styles.readTime}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {story.readTime} · Clique sur n&apos;importe quel mot
              <span
                onClick={() => setShowInfo(true)}
                style={{ cursor: "pointer", opacity: 0.6, fontSize: "0.85rem", marginLeft: "6px" }}
              >
                ℹ️
              </span>
            </p>
          </div>
          <span className={styles.levelPill}>{story.level}</span>
        </div>

        <div className={styles.progressWrap}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${displayPct}%`,
                background: alreadyCompleted ? "var(--green)" : undefined,
              }}
            />
          </div>
          <div className={styles.progressLabel}>
            <span>
              {seenWords.size === 0 ? "0 mot consulté"
               : seenWords.size === 1 ? "1 mot consulté"
               : `${seenWords.size} mots consultés`}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {defsRemaining !== null && (
                <span style={{ fontSize: "0.72rem", color: defsRemaining === 0 ? "#e07070" : "var(--text-dim)", fontStyle: "italic" }}>
                  🔍 {defsRemaining}/3
                </span>
              )}
              {alreadyCompleted
                ? <span style={{ color: "var(--green)", fontWeight: 700 }}>✅ Complétée</span>
                : <span>{readPct}%</span>
              }
            </span>
          </div>
        </div>

        <StoryRating key={story.slug} storyId={story.slug} initialAvg={story.avg_rating ?? 0} initialCount={story.ratings_count ?? 0} />

        <div className={styles.body} onContextMenu={handleContextMenu}>
          {story.paragraphs.map((p, i) => (
            <p key={i}>
              <ClickableText text={p} seenWords={seenWords} onWordClick={handleWordClick} groupWords={allGroupWords} />
            </p>
          ))}
        </div>

        <div className={styles.source}>
          📚 {story.source}
        </div>

        <div className={styles.hint}>
          💡 Clique sur un mot pour voir sa définition — les mots consultés passent en{" "}
          <span style={{ color: "var(--green)", fontWeight: 600 }}>vert</span>.
        </div>
      </div>

      {xpGained !== null && (
        <div className={styles.xpPopup}>
          +{xpGained} XP ✨{isPremium ? " (x1.5 Premium)" : ""}
        </div>
      )}

      {showInfo && (
        <div
          onClick={() => setShowInfo(false)}
          style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", padding: "24px" }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "28px", maxWidth: "360px", width: "100%" }}
          >
            <div style={{ fontSize: "1.8rem", marginBottom: "12px" }}>ℹ️</div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: "1.7" }}>
              LexiStory s&apos;améliore chaque jour ! Si une définition est manquante, incorrecte, ou si un nom propre n&apos;est pas reconnu, c&apos;est normal — notre dictionnaire est en constante évolution. Merci de votre compréhension 😊
            </p>
            <button
              style={{ marginTop: "16px", width: "100%", padding: "10px", borderRadius: "10px", background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text-muted)", cursor: "pointer", fontFamily: "inherit", fontSize: "0.88rem" }}
              onClick={() => setShowInfo(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {activeWord && (
        <WordPopup word={activeWord} seenCount={seenWords.size} storyId={story.slug}
          onDefUsed={n => setDefsRemaining(n)}
          onClose={() => setActiveWord(null)} />
      )}

      {/* ── Admin context menu ── */}
      {ctxMenu && (
        <div onClick={() => setCtxMenu(null)} style={{ position: "fixed", inset: 0, zIndex: 500 }}>
          <div
            onClick={e => e.stopPropagation()}
            style={{ position: "fixed", left: ctxMenu.x, top: ctxMenu.y, zIndex: 501, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "6px 0", minWidth: "200px", boxShadow: "0 8px 24px rgba(0,0,0,0.4)", fontSize: "0.85rem" }}
          >
            <div style={{ padding: "3px 10px 6px", fontSize: "0.7rem", color: "var(--text-dim)", borderBottom: "1px solid var(--border)", marginBottom: "4px", fontStyle: "italic" }}>
              « {ctxMenu.sel.length > 30 ? ctxMenu.sel.slice(0, 30) + "…" : ctxMenu.sel} »
            </div>
            {[
              { icon: "📚", label: "Définir comme groupe", fn: () => adminAddGroup(ctxMenu.sel) },
              { icon: "✂️", label: "Séparer les mots",    fn: () => adminRemoveGroup(ctxMenu.sel) },
              { icon: "✏️", label: "Modifier la définition", fn: () => openDefModal(ctxMenu.sel) },
            ].map(({ icon, label, fn }) => (
              <button key={label} onClick={fn} style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 14px", background: "none", border: "none", color: "var(--text)", cursor: "pointer", fontFamily: "inherit", fontSize: "0.85rem" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--surface2)")}
                onMouseLeave={e => (e.currentTarget.style.background = "none")}>
                {icon} {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Admin definition modal ── */}
      {defModal && (
        <div onClick={() => setDefModal(null)} style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px", maxWidth: "460px", width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 700, color: "var(--accent)" }}>
              ✏️ {defModal.word}
            </div>
            {(["etym", "defOrig", "defSimple"] as const).map((field) => (
              <div key={field}>
                <label style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.8px", color: "var(--text-dim)", display: "block", marginBottom: "4px" }}>
                  {field === "etym" ? "Étymologie" : field === "defOrig" ? "Définition officielle" : "Définition simplifiée"}
                </label>
                <textarea
                  value={defModal[field]}
                  onChange={e => setDefModal(prev => prev ? { ...prev, [field]: e.target.value } : prev)}
                  rows={field === "etym" ? 2 : 3}
                  style={{ width: "100%", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "8px", padding: "8px 10px", color: "var(--text)", fontFamily: "inherit", fontSize: "0.85rem", resize: "vertical", boxSizing: "border-box" }}
                />
              </div>
            ))}
            <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "4px" }}>
              <button onClick={() => setDefModal(null)} style={{ padding: "8px 18px", borderRadius: "8px", background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text-muted)", cursor: "pointer", fontFamily: "inherit" }}>Annuler</button>
              <button onClick={saveDefinition} disabled={defSaving} style={{ padding: "8px 18px", borderRadius: "8px", background: "var(--accent)", border: "none", color: "var(--bg)", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                {defSaving ? "Sauvegarde…" : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ── */}
      {toast && (
        <div style={{ position: "fixed", bottom: "28px", left: "50%", transform: "translateX(-50%)", zIndex: 600, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "50px", padding: "10px 20px", fontSize: "0.85rem", color: "var(--text)", boxShadow: "0 4px 16px rgba(0,0,0,0.3)", pointerEvents: "none" }}>
          {toast}
        </div>
      )}

      {showCategory && (
        <CategoryModal
          category={story.category}
          currentLevel={story.level}
          onClose={() => setShowCategory(false)}
        />
      )}
    </>
  );
}
