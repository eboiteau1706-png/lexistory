"use client";
import styles from "./ClickableText.module.css";

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

export default function ClickableText({ text, seenWords, onWordClick }: Props) {
  const tokens = text.split(/(\s+)/);

  return (
    <>
      {tokens.map((token, i) => {
        if (/^\s+$/.test(token)) return token;

        const key = toKey(token);
        const seen = seenWords.has(key);

        return (
          <span
            key={i}
            className={`${styles.word} ${seen ? styles.seen : ""}`}
            onClick={() => key.length >= 2 && onWordClick(key)}
          >
            {token}
          </span>
        );
      })}
    </>
  );
}
