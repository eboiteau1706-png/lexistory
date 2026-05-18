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

/* Niveau XP dans la Nav */
.levelBadge {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 6px 14px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent);
  cursor: default;
  min-width: 100px;
}

.xpBar {
  height: 3px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
}

.xpFill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent2), var(--accent));
  border-radius: 2px;
  transition: width 0.5s ease;
}

/* Popup XP dans StoryCard */
.xpPopup {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, var(--accent2), var(--accent));
  color: var(--bg);
  padding: 10px 24px;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 700;
  z-index: 200;
  animation: popupIn 0.3s ease, popupOut 0.3s ease 2.7s forwards;
  box-shadow: 0 4px 20px rgba(232,201,122,0.3);
}

@keyframes popupIn {
  from { opacity: 0; transform: translateX(-50%) translateY(20px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}
@keyframes popupOut {
  from { opacity: 1; }
  to   { opacity: 0; }
}