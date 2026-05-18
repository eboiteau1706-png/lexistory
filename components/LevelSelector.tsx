"use client";
import { useRouter } from "next/navigation";
import styles from "./LevelSelector.module.css";
import type { Story } from "@/lib/stories";

const LEVELS: { value: Story["level"]; emoji: string; desc: string }[] = [
  { value: "Curieux",  emoji: "🌱", desc: "Vocabulaire simple" },
  { value: "Lecteur",  emoji: "📖", desc: "Vocabulaire intermédiaire" },
  { value: "Érudit",   emoji: "🎓", desc: "Vocabulaire avancé" },
];

export default function LevelSelector({ current }: { current: Story["level"] }) {
  const router = useRouter();

  return (
    <div className={styles.wrap}>
      {LEVELS.map((l) => (
        <button
          key={l.value}
          className={`${styles.btn} ${current === l.value ? styles.active : ""}`}
          onClick={() => router.push(`/?level=${l.value}`)}
        >
          <span className={styles.emoji}>{l.emoji}</span>
          <span className={styles.label}>{l.value}</span>
          <span className={styles.desc}>{l.desc}</span>
        </button>
      ))}
    </div>
  );
}