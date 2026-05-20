// lib/xp.ts

export interface Level {
  level: number;
  name: string;
  emoji: string;
  minXp: number;
  maxXp: number;
}

export const LEVELS: Level[] = [
  { level: 1,  name: "Graine",    emoji: "🌱", minXp: 0,    maxXp: 50   },
  { level: 2,  name: "Feuilleton",emoji: "📄", minXp: 50,   maxXp: 120  },
  { level: 3,  name: "Lecteur",   emoji: "📖", minXp: 120,  maxXp: 250  },
  { level: 4,  name: "Curieux",   emoji: "🔍", minXp: 250,  maxXp: 400  },
  { level: 5,  name: "Érudit",    emoji: "🎓", minXp: 400,  maxXp: 600  },
  { level: 6,  name: "Lettré",    emoji: "🏛️", minXp: 600,  maxXp: 900  },
  { level: 7,  name: "Sage",      emoji: "⚡", minXp: 900,  maxXp: 1300 },
  { level: 8,  name: "Expert",    emoji: "🌟", minXp: 1300, maxXp: 1800 },
  { level: 9,  name: "Maître",    emoji: "🔮", minXp: 1800, maxXp: 2500 },
  { level: 10, name: "Légende",   emoji: "👑", minXp: 2500, maxXp: 9999 },
];

export function getLevel(xp: number): Level {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXp) return LEVELS[i];
  }
  return LEVELS[0];
}

export function getXpProgress(xp: number): { current: number; needed: number; pct: number } {
  const lvl = getLevel(xp);
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

// Histoires : 3 XP gratuit, 4 XP Premium (x1.5)
export function getStoryXp(isPremium: boolean): number {
  return isPremium ? 4 : 3;
}

// Jeux gratuits : toujours 3 XP, avec boost x1.5 Premium
export function getGameXp(isPremium: boolean): number {
  return isPremium ? 4 : 3;
}

// Jeux Premium exclusifs : toujours 3 XP fixe, pas de bonus x1.5
export function getPremiumGameXp(): number {
  return 3;
}