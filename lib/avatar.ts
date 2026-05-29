export const AVATAR_SEEDS = [
  "atlas",  "orion",  "lyra",  "vega",
  "nova",   "luna",   "sol",   "mars",
  "iris",   "echo",   "phoenix","titan",
  "zara",   "leo",    "aria",  "rex",
  "jade",   "sage",   "river", "storm",
] as const;

export type AvatarSeed = typeof AVATAR_SEEDS[number];

export const ANON_AVATAR_URL =
  "https://api.dicebear.com/7.x/micah/svg?seed=anonymous";

export const getAvatarUrl = (seed: string | null | undefined): string =>
  seed ? `https://api.dicebear.com/7.x/micah/svg?seed=${seed}` : ANON_AVATAR_URL;
