"use client";
import { useEffect } from "react";
import { lookup } from "@/lib/dictionary";
import styles from "./WordPopup.module.css";

interface Props {
  word: string;
  seenCount: number;
  onClose: () => void;
}

export default function WordPopup({ word, seenCount, onClose }: Props) {
  const def = lookup(word);

  // Fermer avec Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.popup}>
        <button className={styles.close} onClick={onClose}>✕</button>

        <div className={styles.word}>{word}</div>

        {def ? (
          <>
            <div className={styles.etym}>{def.etym}</div>

            <div className={styles.section}>
              <div className={styles.label}>Définition officielle</div>
              <div className={styles.defOrig}>{def.defOrig}</div>
            </div>

            <div className={styles.section}>
              <div className={styles.label}>En clair 💡</div>
              <div className={styles.defSimple}>{def.defSimple}</div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.etym}> </div>
            <div className={styles.section}>
              <div className={styles.label}>Définition officielle</div>
              <div className={styles.defOrig}>Ce mot n&apos;est pas encore dans notre dictionnaire.</div>
            </div>
            <div className={styles.section}>
              <div className={styles.label}>En clair 💡</div>
              <div className={styles.defSimple}>Nous ajoutons de nouveaux mots chaque jour ! 📚</div>
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
