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

function normalize(str: string): string {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, "");
}

export default function WordPopup({ word, seenCount, onClose }: Props) {
  const supabase = createClient();
  const localDef = lookup(word);
  const [wiktDef, setWiktDef]       = useState<WiktDef | null>(null);
  const [loading, setLoading]       = useState(false);
  const [userId, setUserId]         = useState<string | null>(null);
  const [isFav, setIsFav]           = useState(false);
  const [favLoading, setFavLoading] = useState(false);

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

  useEffect(() => {
    if (localDef) return;
    setLoading(true);
    setWiktDef(null);
    fetch(`/api/definition?word=${encodeURIComponent(word)}`)
      .then(r => r.json())
      .then(data => { setWiktDef(data); setLoading(false); })
      .catch(() => { setWiktDef({ found: false }); setLoading(false); });
  }, [word, localDef]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  async function toggleFav() {
    if (!userId) return;
    setFavLoading(true);
    const wordKey = word.toLowerCase();
    if (isFav) {
      await supabase.from("word_favorites").delete().eq("user_id", userId).eq("word", wordKey);
      setIsFav(false);
    } else {
      await supabase.from("word_favorites").upsert({ user_id: userId, word: wordKey }, { onConflict: "user_id,word" });
      setIsFav(true);
    }
    setFavLoading(false);
  }

  const defOrig   = localDef?.defOrig   || wiktDef?.defOrig   || "";
  const defSimple = localDef?.defSimple || "";
  const etym      = localDef?.etym      || "";

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.popup}>
        <button className={styles.close} onClick={onClose}>✕</button>

        <div className={styles.wordRow}>
          <div className={styles.word}>{word}</div>
          {userId && (
            <button
              className={styles.favBtn}
              onClick={toggleFav}
              disabled={favLoading}
              data-active={isFav}
              title={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
              ⭐
            </button>
          )}
        </div>

        {userId && (
          <div className={`${styles.favHint} ${isFav ? styles.favHintActive : ""}`}>
            {isFav ? "⭐ Favori ajouté — retrouve-le dans ton profil" : "Clique sur ⭐ pour mettre en favori"}
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
            {!localDef && wiktDef?.found && (
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
          <span className={styles.count}>
            Tu as consulté <strong>{seenCount}</strong> mot(s)
          </span>
          <button className={styles.btnGotIt} onClick={onClose}>Compris ! 👍</button>
        </div>
      </div>
    </div>
  );
}
