"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { lookup } from "@/lib/dictionary";
import styles from "./WordPopup.module.css";

interface Props {
  word: string;
  seenCount: number;
  onClose: () => void;
}

interface WiktDef {
  found: boolean;
  defOrig?: string;
  partOfSpeech?: string;
  etym?: string;
}

interface Sense {
  label: string;
  etym: string;
  defOrig: string;
  defSimple: string;
}

interface CustomDef {
  word: string;
  is_group: boolean;
  senses: Sense[];
  story_origin: string;
}

export default function WordPopup({ word, seenCount, onClose }: Props) {
  const supabase = createClient();
  const localDef = lookup(word);
  const [wiktDef, setWiktDef]         = useState<WiktDef | null>(null);
  const [customDef, setCustomDef]     = useState<CustomDef | null>(null);
  const [loading, setLoading]         = useState(false);
  const [userId, setUserId]           = useState<string | null>(null);
  const [isFav, setIsFav]             = useState(false);
  const [favLoading, setFavLoading]   = useState(false);
  const [activeSense, setActiveSense] = useState(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const uid = session?.user?.id ?? null;
      setUserId(uid);
      if (uid) {
        supabase.from("word_favorites").select("id").eq("user_id", uid).eq("word", word.toLowerCase()).maybeSingle()
          .then(({ data }) => setIsFav(!!data));
      }
    });
  }, [word]);

  // Cherche dans definitions_custom Supabase
  useEffect(() => {
    setCustomDef(null);
    setActiveSense(0);
    supabase.from("definitions_custom").select("*")
      .eq("word", word.toLowerCase().trim()).maybeSingle()
      .then(({ data }) => { if (data) setCustomDef(data); });
  }, [word]);

  // Cherche sur Wiktionnaire si pas de déf locale ni custom
  useEffect(() => {
    if (localDef || customDef) return;
    setLoading(true);
    setWiktDef(null);
    fetch(`/api/definition?word=${encodeURIComponent(word)}`)
      .then(r => r.json())
      .then(data => { setWiktDef(data); setLoading(false); })
      .catch(() => { setWiktDef({ found: false }); setLoading(false); });
  }, [word, localDef, customDef]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Priorité : Supabase custom > dico local > Wiktionnaire
  const hasCustom = !!customDef && customDef.senses?.length > 0;
  const hasLocal  = !!localDef;

  const defOrig   = hasCustom ? customDef!.senses[activeSense]?.defOrig   : localDef?.defOrig   || wiktDef?.defOrig   || "";
  const defSimple = hasCustom ? customDef!.senses[activeSense]?.defSimple : localDef?.defSimple || "";
  const etym      = hasCustom ? customDef!.senses[activeSense]?.etym      : localDef?.etym      || "";

  const multipleSenses = hasCustom && customDef!.senses.length > 1;

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

        {/* Onglets des sens si plusieurs */}
        {multipleSenses && (
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" }}>
            {customDef!.senses.map((s, i) => (
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
            <div className={styles.shimmerBox} />
            <div className={styles.shimmerBox} style={{ height: "48px" }} />
          </div>
        ) : defOrig ? (
          <>
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
            {!hasCustom && !hasLocal && wiktDef?.found && (
              <div className={styles.source}>Source : Wiktionnaire</div>
            )}
          </>
        ) : (
          <>
            <div className={styles.section}>
              <div className={styles.label}>Définition</div>
              <div className={styles.defOrig}>Ce mot n&apos;est pas encore dans notre dictionnaire.</div>
            </div>
            <div className={styles.section}>
              <div className={styles.label}>En clair 💡</div>
              <div className={styles.defSimple}>Nous ajoutons de nouveaux mots régulièrement ! 📚</div>
            </div>
          </>
        )}

        <div className={styles.footer}>
          <span className={styles.count}>Tu as consulté <strong>{seenCount}</strong> mot(s)</span>
          <button className={styles.btnGotIt} onClick={onClose}>Compris ! 👍</button>
        </div>
      </div>
    </div>
  );
}
