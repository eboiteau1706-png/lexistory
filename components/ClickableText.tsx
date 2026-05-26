"use client";
import styles from "./ClickableText.module.css";
import { lookup } from "@/lib/dictionary";

interface Props {
  text: string;
  seenWords: Set<string>;
  onWordClick: (word: string) => void;
  groupWords?: Set<string>;
}

const PUNCT = /^[«».,;:!?()'"…—–’“”'\-]+|[«».,;:!?()'"…—–’“”'\-]+$/g;
const CONTRACTION = /^[ldmjnstcLDMJNSTC]['’']/i;

export function toKey(raw: string): string {
  return raw
    .replace(PUNCT, "")
    .replace(/[''‛ʼ]/g, "'")
    .replace(CONTRACTION, "")
    .toLowerCase();
}

// Like toKey but preserves contractions — used for multi-word group keys so
// "piraha d'amazonie" stays "piraha d'amazonie" instead of "piraha amazonie".
export function toPhrase(raw: string): string {
  return raw
    .replace(PUNCT, "")
    .replace(/[''‛ʼ]/g, "'")
    .toLowerCase();
}

export default function ClickableText({ text, seenWords, onWordClick, groupWords }: Props) {
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

    // Essaie de former une expression multi-mots (jusqu'à 4 mots) pour tout token
    let combinedKey = toPhrase(token);
    let displayCombined = token;
    let j = i + 1;
    let bestMatchKey = "";
    let bestDisplay = "";
    let bestJ = i;
    let wordCount = 1;

    while (j < rawTokens.length && wordCount < 4) {
      const nextToken = rawTokens[j];
      if (/^\s+$/.test(nextToken)) { j++; continue; }
      const space = rawTokens[j - 1]?.match(/^\s+$/) ? rawTokens[j - 1] : " ";
      wordCount++;
      combinedKey = combinedKey + " " + toPhrase(nextToken);
      displayCombined = displayCombined + space + nextToken;
      if (lookup(combinedKey) || groupWords?.has(combinedKey)) {
        bestMatchKey = combinedKey;
        bestDisplay = displayCombined;
        bestJ = j;
      }
      j++;
    }

    if (bestMatchKey) {
      groups.push({ display: bestDisplay, key: bestMatchKey, isSpace: false });
      i = bestJ + 1;
      continue;
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
