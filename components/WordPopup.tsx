"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { lookup } from "@/lib/dictionary";
import styles from "./WordPopup.module.css";

interface Props {
  word: string;
  seenCount: number;
  storyId?: string;
  onClose: () => void;
}

interface Sense {
  label: string;
  etym: string;
  defOrig: string;
  defSimple: string;
}

type Source = "dictionnaire" | "cache" | "api" | "limit" | "limit_free" | null;

const LEADING_PUNCT = /^[.,;:!?«»”””’’’’()\[\]\s]+/g;
const TRAILING_PUNCT = /[.,;:!?«»”””’’’’()\[\]\s]+$/g;
const ARTICLE_CONTRACTION = /^(l[‘’’]|d[‘’’])\s*/i;
const ARTICLE_WORD = /^(les?\s+|la\s+|un[e]?\s+|des?\s+|du\s+|de\s+la\s+|de\s+)/i;

function normalizeToKey(raw: string): string | null {
  let key = raw
    .replace(LEADING_PUNCT, "")
    .replace(TRAILING_PUNCT, "")
    .toLowerCase()
    .replace(ARTICLE_CONTRACTION, "")
    .replace(ARTICLE_WORD, "")
    .trim();

  if (key.length < 2) return null;
  if (key.split(/\s+/).length > 6) return null;
  if (/^[\d%.,\-/\s]+$/.test(key)) return null;
  return key;
}

function normalize(str: string): string {
  return str.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z]/g, "");
}

function getVariants(word: string): string[] {
  const w = word.toLowerCase().trim();
  const variants = new Set<string>([w]);
  if (w.endsWith("es")) variants.add(w.slice(0, -2));
  if (w.endsWith("s") || w.endsWith("x")) variants.add(w.slice(0, -1));
  if (w.endsWith("e")) variants.add(w.slice(0, -1));
  if (w.endsWith("aux")) variants.add(w.slice(0, -3) + "al");
  variants.add(normalize(w));
  variants.add(w.replace(/[‘’‛ʼ]/g, "'"));
  variants.add(w.replace(/[‘’‛ʼ']/g, "’"));
  return [...variants];
}


export default function WordPopup({ word, seenCount, storyId, onClose }: Props) {
  const supabase = createClient();
  const [source, setSource]         = useState<Source>(null);
  const [senses, setSenses]         = useState<Sense[]>([]);
  const [activeSense, setActiveSense] = useState(0);
  const [loading, setLoading]       = useState(false);
  const [userId, setUserId]         = useState<string | null>(null);
  const [isFav, setIsFav]           = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  const key = normalizeToKey(word) ?? word.toLowerCase().trim();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const uid = session?.user?.id ?? null;
      setUserId(uid);
      if (uid) {
        supabase.from("word_favorites").select("id")
          .eq("user_id", uid).eq("word", word.toLowerCase()).maybeSingle()
          .then(({ data }) => setIsFav(!!data));
      }
    });
  }, [word]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    if (!key || key.length < 2) return;
    if (/^\d+$/.test(key)) { onClose(); return; }

    setSource(null);
    setSenses([]);
    setActiveSense(0);
    setLoading(true);

    const run = async () => {
      // ── Étape 1a : dictionnaire statique local ──────────────────────────
      const local = lookup(key);
      if (local) {
        setSenses([{ label: "", etym: local.etym, defOrig: local.defOrig, defSimple: local.defSimple }]);
        setSource("dictionnaire");
        setLoading(false);
        return;
      }

      // ── Étape 1b : definitions_custom Supabase ──────────────────────────
      const variants = getVariants(key);
      const { data: custom } = await supabase
        .from("definitions_custom").select("*")
        .in("word", variants).limit(1);

      if (custom && custom.length > 0 && custom[0].senses?.length > 0) {
        setSenses(custom[0].senses.map((s: any) => ({
          label:    s.label    ?? "",
          etym:     s.etym     ?? "",
          defOrig:  s.defOrig  ?? "",
          defSimple: s.defSimple ?? "",
        })));
        setSource("dictionnaire");
        setLoading(false);
        return;
      }

      // ── Étape 2 : POST /api/definition ─────────────────────────────────
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (session?.access_token) headers["Authorization"] = `Bearer ${session.access_token}`;

        const res = await fetch("/api/definition", {
          method: "POST",
          headers,
          body: JSON.stringify({ raw: word, key, story_id: storyId }),
        });
        const data = await res.json();
        setSource(data.source ?? null);

        if (data.result && data.source !== "limit" && data.source !== "limit_free") {
          const etym = data.result.etymologie ?? "";
          setSenses(
            (data.result.sens ?? []).map((s: any) => ({
              label:    s.label      ?? "",
              etym,
              defOrig:  s.officielle ?? "",
              defSimple: s.simplifiee ?? "",
            }))
          );
        }
      } catch {
        setSource(null);
      }
      setLoading(false);
    };

    run();
  }, [word, key]);

  const currentSense  = senses[activeSense];
  const defOrig       = currentSense?.defOrig   ?? "";
  const defSimple     = currentSense?.defSimple ?? "";
  const etym          = currentSense?.etym      ?? "";
  const multipleSenses = senses.length > 1;


  async function toggleFav() {
    if (!userId) return;
    setFavLoading(true);
    const wordKey = word.toLowerCase();
    if (isFav) {
      await supabase.from("word_favorites").delete().eq("user_id", userId).eq("word", wordKey);
      setIsFav(false);
    } else {
      await supabase.from("word_favorites").upsert(
        { user_id: userId, word: wordKey, def_orig: defOrig || null },
        { onConflict: "user_id,word" }
      );
      setIsFav(true);
    }
    setFavLoading(false);
  }

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.popup}>
        <button className={styles.close} onClick={onClose}>✕</button>

        <div className={styles.wordRow}>
          <div className={styles.word}>{word}</div>
          {userId && (
            <button className={styles.favBtn} onClick={toggleFav} disabled={favLoading} data-active={isFav} title={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}>⭐</button>
          )}
        </div>

        {userId && (
          <div className={`${styles.favHint} ${isFav ? styles.favHintActive : ""}`}>
            {isFav ? "⭐ Favori ajouté — retrouve-le dans ton profil" : "Clique sur ⭐ pour mettre en favori"}
          </div>
        )}

        {multipleSenses && (
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" }}>
            {senses.map((s, i) => (
              <button key={i} onClick={() => setActiveSense(i)}
                style={{ padding: "4px 12px", borderRadius: "20px", border: `1px solid ${activeSense === i ? "var(--accent)" : "var(--border)"}`, background: activeSense === i ? "rgba(232,201,122,0.15)" : "var(--surface2)", color: activeSense === i ? "var(--accent)" : "var(--text-muted)", cursor: "pointer", fontFamily: "inherit", fontSize: "0.75rem", fontWeight: activeSense === i ? 700 : 400 }}>
                {s.label || `Sens ${i + 1}`}
              </button>
            ))}
          </div>
        )}

        {etym && <div className={styles.etym}>{etym}</div>}

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.bookWrap}>
              <div className={styles.spine} />
              <div className={styles.coverLeft} />
              <div className={styles.coverRight} />
              <div className={`${styles.page} ${styles.page1}`} />
              <div className={`${styles.page} ${styles.page2}`} />
              <div className={`${styles.page} ${styles.page3}`} />
            </div>
            <p className={styles.loadingText}>Claude feuillette les définitions…</p>
          </div>
        ) : source === "limit_free" ? (
          <div className={styles.contentFadeIn}>
            <div className={styles.section}>
              <div className={styles.defOrig} style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                Tu as atteint ta limite de 3 définitions pour cette histoire aujourd&apos;hui.<br />
                Passe au Premium pour un accès illimité !
              </div>
            </div>
            <a href="/profile" style={{ display: "block", marginTop: "12px", padding: "10px 20px", borderRadius: "50px", background: "var(--accent)", color: "var(--bg)", fontFamily: "inherit", fontSize: "0.88rem", fontWeight: 700, textAlign: "center", textDecoration: "none", transition: "opacity 0.2s" }}>
              ✨ Découvrir le Premium
            </a>
          </div>
        ) : source === "limit" ? (
          <div className={styles.contentFadeIn}>
            <div className={styles.section}>
              <div className={styles.defOrig} style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
                Budget mensuel atteint.{" "}
                <a href={`https://fr.wiktionary.org/wiki/${encodeURIComponent(key)}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
                  Voir sur Wiktionnaire →
                </a>
              </div>
            </div>
          </div>
        ) : defOrig ? (
          <div className={styles.contentFadeIn}>
            <div className={styles.section}>
              <div className={styles.label}>Définition</div>
              <div className={styles.defOrig}>{defOrig}</div>
            </div>
            {defSimple && (
              <div className={styles.section}>
                <div className={styles.label}>En clair 💡</div>
                <div className={styles.defSimple}>{defSimple}</div>
              </div>
            )}
          </div>
        ) : !loading && source !== null ? (
          <div className={styles.contentFadeIn}>
            <div className={styles.section}>
              <div className={styles.label}>Définition</div>
              <div className={styles.defOrig}>Ce mot n&apos;est pas encore dans notre dictionnaire.</div>
            </div>
            <div className={styles.section}>
              <div className={styles.label}>En clair 💡</div>
              <div className={styles.defSimple}>Nous ajoutons de nouveaux mots régulièrement ! 📚</div>
            </div>
          </div>
        ) : null}

        <div className={styles.footer}>
          <span className={styles.count}>Tu as consulté <strong>{seenCount}</strong> mot(s)</span>
          <button className={styles.btnGotIt} onClick={onClose}>Compris ! 👍</button>
        </div>
      </div>
    </div>
  );
}
