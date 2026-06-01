"use client";
import styles from "./ClickableText.module.css";
import { lookup } from "@/lib/dictionary";

interface Props {
  text: string;
  seenWords: Set<string>;
  onWordClick: (word: string) => void;
  groupWords?: Set<string>;
}

const PUNCT = /^[«».,;:!?()'"…—–'""'\-]+|[«».,;:!?()'"…—–'""'\-]+$/g;
const CONTRACTION = /^[ldmjnstcLDMJNSTC][''']/i;

export function toKey(raw: string): string {
  return raw
    .replace(PUNCT, "")
    .replace(/[''‛ʼ]/g, "'")
    .replace(CONTRACTION, "")
    .toLowerCase();
}

export function toPhrase(raw: string): string {
  return raw
    .replace(PUNCT, "")
    .replace(/[''‛ʼ]/g, "'")
    .toLowerCase();
}

// Non-cliquable : pas de lettre dans le token (ponctuation pure, chiffres purs, symboles)
function isInert(token: string): boolean {
  return !/[a-zA-ZÀ-ÿ]/.test(token);
}

export default function ClickableText({ text, seenWords, onWordClick, groupWords }: Props) {
  // 1) Split sur espaces, 2) pour chaque token sépare ponctuation/lettres adjacentes
  const rawTokens = text.split(/(\s+)/).flatMap(token => {
    if (/^\s+$/.test(token)) return [token];
    // Sépare les séquences "mot" (lettres+chiffres+apostrophe+tiret) des séquences ponctuation
    // Le tiret entre des lettres (grand-mère) reste dans le mot — il est inclus dans les word-chars
    return token.split(
      /(?<=[A-Za-zÀ-ÿ0-9'\-])(?=[^A-Za-zÀ-ÿ0-9'\-\s])|(?<=[^A-Za-zÀ-ÿ0-9'\-\s])(?=[A-Za-zÀ-ÿ0-9'\-])/
    );
  });

  const groups: {
    display: string;
    key: string;
    isSpace: boolean;
    isGroup: boolean;
    isInert: boolean;
  }[] = [];

  let i = 0;
  while (i < rawTokens.length) {
    const token = rawTokens[i];

    if (/^\s+$/.test(token)) {
      groups.push({ display: token, key: "", isSpace: true, isGroup: false, isInert: false });
      i++;
      continue;
    }

    // Essaie de former une expression multi-mots
    let combinedKey = toPhrase(token);
    let displayCombined = token;
    let j = i + 1;
    let bestMatchKey = "";
    let bestDisplay = "";
    let bestJ = i;
    let wordCount = 1;

    while (j < rawTokens.length && wordCount < 10) {
      const nextToken = rawTokens[j];
      if (/^\s+$/.test(nextToken)) { j++; continue; }
      const space = rawTokens[j - 1]?.match(/^\s+$/) ? rawTokens[j - 1] : " ";
      wordCount++;
      combinedKey = combinedKey + " " + toPhrase(nextToken);
      displayCombined = displayCombined + space + nextToken;
      // Ne pas grouper si le résultat contient des chiffres ou de la ponctuation pure
      if (
        (lookup(combinedKey) || groupWords?.has(combinedKey)) &&
        !/\d/.test(displayCombined) &&
        !isPunctuation(nextToken)
      ) {
        bestMatchKey = combinedKey;
        bestDisplay = displayCombined;
        bestJ = j;
      }
      j++;
    }

    if (bestMatchKey) {
      groups.push({ display: bestDisplay, key: bestMatchKey, isSpace: false, isGroup: true, isInert: false });
      i = bestJ + 1;
      continue;
    }

    const key = toKey(token);
    groups.push({ display: token, key, isSpace: false, isGroup: false, isInert: isInert(token) });
    i++;
  }

  return (
    <>
      {groups.map((g, idx) => {
        if (g.isSpace) return g.display;
        // Pas de lettre → span neutre (ponctuation pure, chiffres purs, symboles)
        if (g.isInert) {
          return <span key={idx}>{g.display}</span>;
        }
        const seen = seenWords.has(g.key);
        return (
          <span
            key={idx}
            className={`${styles.word} ${seen ? styles.seen : ""} ${g.isGroup ? styles.wordGroup : ""}`}
            onClick={() => { if (/\d/.test(g.key)) return; g.key.length >= 2 && onWordClick(g.key); }}
          >
            {g.display}
          </span>
        );
      })}
    </>
  );
}
