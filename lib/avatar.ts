export const AVATAR_SEEDS = [
  "apollo", "zeus", "athena", "hermes",
  "ares", "hera", "poseidon", "artemis",
  "hephaestus", "demeter", "dionysus", "persephone",
] as const;

export type AvatarSeed = typeof AVATAR_SEEDS[number];

export const getAvatarUrl = (seed: string | null | undefined): string | null =>
  seed ? `https://api.dicebear.com/7.x/micah/svg?seed=${seed}` : null;
