export const AVATAR_SEEDS = [
  "adventurer:felix",  "adventurer:luna",   "adventurer:nova",   "adventurer:zara",
  "bottts:alpha",      "bottts:gamma",      "bottts:omega",      "bottts:zeta",
  "pixel-art:hero",    "pixel-art:wizard",  "pixel-art:knight",  "pixel-art:ninja",
  "fun-emoji:smile",   "fun-emoji:wink",    "fun-emoji:cool",    "fun-emoji:star",
  "micah:atlas",       "micah:orion",       "micah:phoenix",     "micah:titan",
] as const;

export const getAvatarUrl = (value: string | null): string | null => {
  if (!value) return null;
  if (value.includes(":")) {
    const [style, seed] = value.split(":");
    return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`;
  }
  return `https://api.dicebear.com/7.x/micah/svg?seed=${value}`;
};
