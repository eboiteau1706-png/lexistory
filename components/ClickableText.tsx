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

function cleanToken(token: string): string {
  return token.replace(/^[«».,;:!?()'"\u2026\u2014\u2013\u2019\u201c\u201d'\-]+|[«».,;:!?()'"\u2026\u2014\u2013\u2019\u201c\u201d'\-]+$/g, "");
}

export default function ClickableText({ text, seenWords, onWordClick }: Props) {
  // Sépare en tokens (mots + espaces)
  const rawTokens = text.split(/(\s+)/);

  // Regroupe les noms propres consécutifs (ex: "Francis Crick" → un seul token)
  const groups: { display: string; key: string; isSpace: boolean }[] = [];

  let i = 0;
  while (i < rawTokens.length) {
    const token = rawTokens[i];

    // Espaces → on les garde tels quels
    if (/^\s+$/.test(token)) {
      groups.push({ display: token, key: "", isSpace: true });
      i++;
      continue;
    }

    const cleanTok = cleanToken(token);

    // Vérifie si c'est un mot avec majuscule ET si en combinant avec le suivant on a une entrée dans le dico
    if (isCapitalized(token) && cleanTok.length >= 2) {
      // Essaie de former un nom composé avec les mots suivants
      let combined = cleanTok;
      let displayCombined = token;
      let j = i + 1;
      let bestMatch = "";
      let bestDisplay = "";
      let bestJ = i;

      // Cherche jusqu'à 3 mots suivants
      while (j < rawTokens.length && j < i + 6) {
        const nextToken = rawTokens[j];
        if (/^\s+$/.test(nextToken)) {
          j++;
          continue;
        }
        const nextClean = cleanToken(nextToken);
        if (!isCapitalized(nextToken)) break;

        combined = combined + " " + nextClean;
        displayCombined = displayCombined + (rawTokens[j-1]?.match(/^\s+$/) ? rawTokens[j-1] : " ") + nextToken;

        // Vérifie si cette combinaison est dans le dictionnaire
        const combinedKey = combined.toLowerCase();
        if (lookup(combinedKey)) {
          bestMatch = combinedKey;
          bestDisplay = displayCombined;
          bestJ = j;
        }
        j++;
      }

      if (bestMatch) {
        // On a trouvé un nom composé dans le dico
        const seen = seenWords.has(bestMatch);
        groups.push({ display: bestDisplay, key: bestMatch, isSpace: false });
        // Avance jusqu'après le dernier mot du nom composé
        i = bestJ + 1;
        continue;
      }
    }

    // Mot normal
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
