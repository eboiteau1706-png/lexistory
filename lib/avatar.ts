export const AVATAR_SEEDS = [
  "adventurer:felix",   "adventurer:luna",   "adventurer:nova",   "adventurer:zara",
  "adventurer:max",     "adventurer:sofia",  "adventurer:leo",    "adventurer:mia",
  "bottts:alpha",       "bottts:gamma",      "bottts:omega",      "bottts:zeta",
  "bottts:delta",       "bottts:sigma",      "bottts:theta",      "bottts:lambda",
  "pixel-art:hero",     "pixel-art:wizard",  "pixel-art:knight",  "pixel-art:ninja",
  "pixel-art:warrior",  "pixel-art:mage",    "pixel-art:archer",  "pixel-art:rogue",
  "fun-emoji:smile",    "fun-emoji:wink",    "fun-emoji:cool",    "fun-emoji:star",
  "fun-emoji:heart",    "fun-emoji:fire",    "fun-emoji:thunder", "fun-emoji:moon",
  "micah:atlas",        "micah:orion",       "micah:phoenix",     "micah:titan",
  "micah:lyra",         "micah:nova",        "micah:iris",        "micah:echo",
] as const;

export const getAvatarUrl = (value: string | null): string | null => {
  if (!value) return null;
  if (value.includes(":")) {
    const [style, seed] = value.split(":");
    return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`;
  }
  return `https://api.dicebear.com/7.x/micah/svg?seed=${value}`;
};
