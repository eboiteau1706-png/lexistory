// lib/xp.ts — seuils v2 (Novice→Légende, 21 sous-rangs)

export interface Level {
  level:  number;   // 1-21
  group:  string;   // "Novice", "Apprenti", etc.
  tier:   string;   // "I", "II", "III"
  name:   string;   // "Novice I"
  emoji:  string;
  minXp:  number;
  maxXp:  number;
  color:  string;   // couleur de la barre de progression
}

export const LEVELS: Level[] = [
  // Novice — gris
  { level:  1, group: "Novice",   tier: "I",   name: "Novice I",    emoji: "📝", minXp:    0, maxXp:   50, color: "#9ca3af" },
  { level:  2, group: "Novice",   tier: "II",  name: "Novice II",   emoji: "📝", minXp:   50, maxXp:  100, color: "#9ca3af" },
  { level:  3, group: "Novice",   tier: "III", name: "Novice III",  emoji: "📝", minXp:  100, maxXp:  150, color: "#9ca3af" },
  // Apprenti — vert
  { level:  4, group: "Apprenti", tier: "I",   name: "Apprenti I",  emoji: "🌱", minXp:  150, maxXp:  250, color: "#22c55e" },
  { level:  5, group: "Apprenti", tier: "II",  name: "Apprenti II", emoji: "🌱", minXp:  250, maxXp:  325, color: "#22c55e" },
  { level:  6, group: "Apprenti", tier: "III", name: "Apprenti III",emoji: "🌱", minXp:  325, maxXp:  400, color: "#22c55e" },
  // Lecteur — bleu
  { level:  7, group: "Lecteur",  tier: "I",   name: "Lecteur I",   emoji: "📖", minXp:  400, maxXp:  550, color: "#3b82f6" },
  { level:  8, group: "Lecteur",  tier: "II",  name: "Lecteur II",  emoji: "📖", minXp:  550, maxXp:  650, color: "#3b82f6" },
  { level:  9, group: "Lecteur",  tier: "III", name: "Lecteur III", emoji: "📖", minXp:  650, maxXp:  750, color: "#3b82f6" },
  // Érudit — violet
  { level: 10, group: "Érudit",   tier: "I",   name: "Érudit I",    emoji: "🎓", minXp:  750, maxXp:  950, color: "#8b5cf6" },
  { level: 11, group: "Érudit",   tier: "II",  name: "Érudit II",   emoji: "🎓", minXp:  950, maxXp: 1100, color: "#8b5cf6" },
  { level: 12, group: "Érudit",   tier: "III", name: "Érudit III",  emoji: "🎓", minXp: 1100, maxXp: 1200, color: "#8b5cf6" },
  // Sage — cyan
  { level: 13, group: "Sage",     tier: "I",   name: "Sage I",      emoji: "🦉", minXp: 1200, maxXp: 1500, color: "#14b8a6" },
  { level: 14, group: "Sage",     tier: "II",  name: "Sage II",     emoji: "🦉", minXp: 1500, maxXp: 1650, color: "#14b8a6" },
  { level: 15, group: "Sage",     tier: "III", name: "Sage III",    emoji: "🦉", minXp: 1650, maxXp: 1800, color: "#14b8a6" },
  // Maître — or
  { level: 16, group: "Maître",   tier: "I",   name: "Maître I",    emoji: "⚜️", minXp: 1800, maxXp: 2100, color: "#f59e0b" },
  { level: 17, group: "Maître",   tier: "II",  name: "Maître II",   emoji: "⚜️", minXp: 2100, maxXp: 2300, color: "#f59e0b" },
  { level: 18, group: "Maître",   tier: "III", name: "Maître III",  emoji: "⚜️", minXp: 2300, maxXp: 2500, color: "#f59e0b" },
  // Légende — rouge/cramoisi
  { level: 19, group: "Légende",  tier: "I",   name: "Légende I",   emoji: "👑", minXp: 2500, maxXp: 3000, color: "#ef4444" },
  { level: 20, group: "Légende",  tier: "II",  name: "Légende II",  emoji: "👑", minXp: 3000, maxXp: 3500, color: "#ef4444" },
  { level: 21, group: "Légende",  tier: "III", name: "Légende III", emoji: "👑", minXp: 3500, maxXp: 9999, color: "#ef4444" },
];

export function getLevel(xp: number): Level {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXp) return LEVELS[i];
  }
  return LEVELS[0];
}

export function getXpProgress(xp: number): { current: number; needed: number; pct: number } {
  const lvl = getLevel(xp);
  // Dernier sous-rang : progression ouverte
  if (lvl.level === 21) {
    const current = xp - lvl.minXp;
    return { current, needed: 0, pct: 100 };
  }
  const current = xp - lvl.minXp;
  const needed  = lvl.maxXp - lvl.minXp;
  const pct     = Math.min(100, Math.round((current / needed) * 100));
  return { current, needed, pct };
}

export function getStreakBonus(streak: number, isPremium: boolean): number {
  let bonus = 0;
  if (streak >= 30) bonus = 50;
  else if (streak >= 10) bonus = 25;
  else if (streak >= 5)  bonus = 15;
  else if (streak >= 3)  bonus = 10;
  return isPremium ? Math.round(bonus * 1.5) : bonus;
}

export function getStoryXp(isPremium: boolean): number {
  return isPremium ? 4 : 3;
}

export function getGameXp(isPremium: boolean): number {
  return isPremium ? 4 : 3;
}

export function getPremiumGameXp(): number {
  return 3;
}
