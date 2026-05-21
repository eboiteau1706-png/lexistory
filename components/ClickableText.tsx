"use client";
import styles from "./ClickableText.module.css";
import { lookup } from "@/lib/dictionary";

interface Props {
  text: string;
  seenWords: Set<string>;
  onWordClick: (word: string) => void;
}

function toKey(raw: string): string {
  return raw
    .replace(/^[«».,;:!?()'"\u2026\u2014\u2013\u2019\u201c\u201d'\-]+|[«».,;:!?()'"\u2026\u2014\u2013\u2019\u201c\u201d'\-]+$/g, "")
    .replace(/^[ldmjnstcLDMJNSTC][''\u2019]/i, "")
    .toLowerCase();
}

function isCapitalized(token: string): boolean {
  const clean = token.replace(/^[«».,;:!?()'"\u2026\u2014\u2013\u2019\u201c\u201d'\-]+/, "");
  return /^[A-ZÀÂÉÈÊËÎÏÔÙÛÜÇ]/.test(clean);
}

// Particules qui peuvent faire partie d'un nom propre composé
const PARTICLES = new Set(["de", "du", "des", "le", "la", "les", "von", "van", "den", "der", "di", "da", "del"]);

function cleanToken(token: string): string {
  return token.replace(/^[«».,;:!?()'"\u2026\u2014\u2013\u2019\u201c\u201d'\-]+|[«».,;:!?()'"\u2026\u2014\u2013\u2019\u201c\u201d'\-]+$/g, "");
}

export default function ClickableText({ text, seenWords, onWordClick }: Props) {
  const rawTokens = text.split(/(\s+)/);

  const groups: { display: string; key: string; isSpace: boolean }[] = [];

  let i = 0;
  while (i < rawTokens.length) {
    const token = rawTokens[i];

    if (/^\s+$/.test(token)) {
      groups.push({ display: token, key: "", isSpace: true });
      i++;
      continue;
    }

    const cleanTok = cleanToken(token);

    // Si mot avec majuscule, essaie de former un nom propre composé
    if (isCapitalized(token) && cleanTok.length >= 2) {
      let combined = cleanTok;
      let displayCombined = token;
      let j = i + 1;
      let bestMatch = "";
      let bestDisplay = "";
      let bestJ = i;

      while (j < rawTokens.length && j < i + 10) {
        const nextToken = rawTokens[j];

        // Saute les espaces
        if (/^\s+$/.test(nextToken)) {
          j++;
          continue;
        }

        const nextClean = cleanToken(nextToken);
        const nextLower = nextClean.toLowerCase();
        const space = rawTokens[j-1]?.match(/^\s+$/) ? rawTokens[j-1] : " ";

        // Accepte : mot capitalisé OU particule (de, von, van...)
        if (!isCapitalized(nextToken) && !PARTICLES.has(nextLower)) break;

        combined = combined + " " + nextClean;
        displayCombined = displayCombined + space + nextToken;

        const combinedKey = combined.toLowerCase();
        if (lookup(combinedKey)) {
          bestMatch = combinedKey;
          bestDisplay = displayCombined;
          bestJ = j;
        }
        j++;
      }

      if (bestMatch) {
        const seen = seenWords.has(bestMatch);
        groups.push({ display: bestDisplay, key: bestMatch, isSpace: false });
        i = bestJ + 1;
        continue;
      }
    }

    const key = toKey(token);
    groups.push({ display: token, key, isSpace: false });
    i++;
  }

  return (
    <>
      {groups.map((g, idx) => {
        if (g.isSpace) return g.display;
        const seen = seenWords.has(g.key);
        return (
          <span
            key={idx}
            className={`${styles.word} ${seen ? styles.seen : ""}`}
            onClick={() => g.key.length >= 2 && onWordClick(g.key)}
          >
            {g.display}
          </span>
        );
      })}
    </>
  );
}
