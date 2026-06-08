// lib/xp.ts — seuils v4

export interface Level {
  level:  number;
  group:  string;
  tier:   string;
  name:   string;
  emoji:  string;
  minXp:  number;
  maxXp:  number;  // exclusive upper bound (displays as maxXp-1)
  color:  string;
}

export const LEVELS: Level[] = [
  // Novice — gris
  { level:  1, group: "Novice",   tier: "I",   name: "Novice I",     emoji: "📝", minXp:    0, maxXp:   30, color: "#9ca3af" },
  { level:  2, group: "Novice",   tier: "II",  name: "Novice II",    emoji: "📝", minXp:   30, maxXp:   70, color: "#9ca3af" },
  { level:  3, group: "Novice",   tier: "III", name: "Novice III",   emoji: "📝", minXp:   70, maxXp:  130, color: "#9ca3af" },
  // Apprenti — vert
  { level:  4, group: "Apprenti", tier: "I",   name: "Apprenti I",   emoji: "🌱", minXp:  130, maxXp:  200, color: "#22c55e" },
  { level:  5, group: "Apprenti", tier: "II",  name: "Apprenti II",  emoji: "🌱", minXp:  200, maxXp:  290, color: "#22c55e" },
  { level:  6, group: "Apprenti", tier: "III", name: "Apprenti III", emoji: "🌱", minXp:  290, maxXp:  400, color: "#22c55e" },
  // Lecteur — bleu
  { level:  7, group: "Lecteur",  tier: "I",   name: "Lecteur I",    emoji: "📖", minXp:  400, maxXp:  540, color: "#3b82f6" },
  { level:  8, group: "Lecteur",  tier: "II",  name: "Lecteur II",   emoji: "📖", minXp:  540, maxXp:  710, color: "#3b82f6" },
  { level:  9, group: "Lecteur",  tier: "III", name: "Lecteur III",  emoji: "📖", minXp:  710, maxXp:  910, color: "#3b82f6" },
  // Érudit — violet
  { level: 10, group: "Érudit",   tier: "I",   name: "Érudit I",     emoji: "🎓", minXp:  910, maxXp: 1150, color: "#8b5cf6" },
  { level: 11, group: "Érudit",   tier: "II",  name: "Érudit II",    emoji: "🎓", minXp: 1150, maxXp: 1440, color: "#8b5cf6" },
  { level: 12, group: "Érudit",   tier: "III", name: "Érudit III",   emoji: "🎓", minXp: 1440, maxXp: 1770, color: "#8b5cf6" },
  // Sage — cyan
  { level: 13, group: "Sage",     tier: "I",   name: "Sage I",       emoji: "🦉", minXp: 1770, maxXp: 2150, color: "#14b8a6" },
  { level: 14, group: "Sage",     tier: "II",  name: "Sage II",      emoji: "🦉", minXp: 2150, maxXp: 2580, color: "#14b8a6" },
  { level: 15, group: "Sage",     tier: "III", name: "Sage III",     emoji: "🦉", minXp: 2580, maxXp: 3060, color: "#14b8a6" },
  // Maître — or
  { level: 16, group: "Maître",   tier: "I",   name: "Maître I",     emoji: "⚜️", minXp: 3060, maxXp: 3600, color: "#f59e0b" },
  { level: 17, group: "Maître",   tier: "II",  name: "Maître II",    emoji: "⚜️", minXp: 3600, maxXp: 4200, color: "#f59e0b" },
  { level: 18, group: "Maître",   tier: "III", name: "Maître III",   emoji: "⚜️", minXp: 4200, maxXp: 4900, color: "#f59e0b" },
  // Légende — rouge
  { level: 19, group: "Légende",  tier: "I",   name: "Légende I",    emoji: "👑", minXp: 4900, maxXp: 5700, color: "#ef4444" },
  { level: 20, group: "Légende",  tier: "II",  name: "Légende II",   emoji: "👑", minXp: 5700, maxXp: 6600, color: "#ef4444" },
  { level: 21, group: "Légende",  tier: "III", name: "Légende III",  emoji: "👑", minXp: 6600, maxXp: 9999, color: "#ef4444" },
];

export function getLevel(xp: number): Level {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXp) return LEVELS[i];
  }
  return LEVELS[0];
}

export function getXpProgress(xp: number): { current: number; needed: number; pct: number } {
  const lvl = getLevel(xp);
  if (lvl.level === 21) {
    const current = xp - lvl.minXp;
    return { current, needed: 0, pct: 100 };
  }
  const current = xp - lvl.minXp;
  const needed  = lvl.maxXp - lvl.minXp;
  const pct     = Math.min(100, Math.round((current / needed) * 100));
  return { current, needed, pct };
}

export function getStreakBonus(streak: number): number {
  if (streak >= 30) return 50;
  if (streak >= 10) return 25;
  if (streak >= 5)  return 15;
  if (streak >= 3)  return 10;
  return 0;
}

export function getStoryXp(): number   { return 5; }
export function getGameXp(): number    { return 4; }
export function getPremiumGameXp(): number { return 0; }
export function getQuizXpCorrect(): number { return 2; }
export function getQuizXpWrong(): number   { return 1; }
