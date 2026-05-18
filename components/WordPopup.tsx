"use client";
import { useEffect, useState } from "react";
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

export default function WordPopup({ word, seenCount, onClose }: Props) {
  const localDef = lookup(word);
  const [wiktDef, setWiktDef]     = useState<WiktDef | null>(null);
  const [loading, setLoading]     = useState(false);

  // Si pas dans le dico local, cherche sur Wiktionnaire
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

  const defOrig   = localDef?.defOrig   || wiktDef?.defOrig   || "";
  const defSimple = localDef?.defSimple || "";
  const etym      = localDef?.etym      || "";

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.popup}>
        <button className={styles.close} onClick={onClose}>✕</button>

        <div className={styles.word}>{word}</div>
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
              <div className={styles.defOrig}>
                Ce mot n&apos;est pas encore dans notre dictionnaire.
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.label}>En clair 💡</div>
              <div className={styles.defSimple}>
                Nous ajoutons de nouveaux mots régulièrement ! 📚
              </div>
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