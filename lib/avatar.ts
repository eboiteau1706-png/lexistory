export const AVATAR_SEEDS = [
  "atlas",  "orion",  "lyra",  "vega",
  "nova",   "luna",   "sol",   "mars",
  "iris",   "echo",   "phoenix","titan",
  "zara",   "leo",    "aria",  "rex",
  "jade",   "sage",   "river", "storm",
] as const;

export type AvatarSeed = typeof AVATAR_SEEDS[number];

export const ANON_AVATAR_URL =
  "https://api.dicebear.com/7.x/micah/svg?seed=anonymous&hair=none&ears=attached&eyebrows=up&eyes=eyes01&mouth=smile01&baseColor=f5a623";

// Always returns a URL — anonymous avatar when no seed chosen
export const getAvatarUrl = (seed: string | null | undefined): string =>
  seed ? `https://api.dicebear.com/7.x/micah/svg?seed=${seed}` : ANON_AVATAR_URL;
