export const AVATAR_SEEDS = [
  "atlas", "orion", "lyra",  "vega",
  "nova",  "luna",  "sol",   "mars",
  "iris",  "echo",  "phoenix","titan",
  "zara",  "leo",   "aria",  "rex",
  "jade",  "sage",  "river", "storm",
] as const;

export const getAvatarUrl = (seed: string | null): string | null =>
  seed ? `https://api.dicebear.com/7.x/micah/svg?seed=${seed}` : null;
