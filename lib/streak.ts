import type { SupabaseClient } from "@supabase/supabase-js";

export function toParisDateISO(d: Date): string {
  const p = new Date(d.toLocaleString("en-US", { timeZone: "Europe/Paris" }));
  return `${p.getFullYear()}-${String(p.getMonth() + 1).padStart(2, "0")}-${String(p.getDate()).padStart(2, "0")}`;
}

/**
 * Récupère, pour un utilisateur, l'ensemble des jours (Paris, format YYYY-MM-DD)
 * où il a été actif : lecture d'une histoire, clic sur une définition, ou
 * partie jouée. Retourné trié du plus récent au plus ancien.
 */
export async function getActiveDates(supabase: SupabaseClient, userId: string): Promise<string[]> {
  const since = new Date(Date.now() - 60 * 86400000);
  const sinceISO = since.toISOString();
  const sinceDateStr = toParisDateISO(since);

  const [{ data: reads }, { data: words }, { data: games }] = await Promise.all([
    supabase.from("stories_read").select("read_at").eq("user_id", userId).gte("read_at", sinceISO),
    supabase.from("words_seen").select("seen_at").eq("user_id", userId).gte("seen_at", sinceISO),
    supabase.from("game_completions").select("game_date").eq("user_id", userId).gte("game_date", sinceDateStr),
  ]);

  const set = new Set<string>();
  (reads ?? []).forEach((r: any) => set.add(toParisDateISO(new Date(r.read_at))));
  (words ?? []).forEach((w: any) => set.add(toParisDateISO(new Date(w.seen_at))));
  (games ?? []).forEach((g: any) => set.add(g.game_date));

  return [...set].sort().reverse();
}

/** Série de jours consécutifs en cours (aujourd'hui ou hier inclus). `datesDesc` triées du plus récent au plus ancien. */
export function computeStreak(datesDesc: string[]): number {
  if (datesDesc.length === 0) return 0;
  const today = toParisDateISO(new Date());
  const yesterday = toParisDateISO(new Date(Date.now() - 86400000));
  if (datesDesc[0] !== today && datesDesc[0] !== yesterday) return 0;
  let s = 1;
  for (let i = 1; i < datesDesc.length; i++) {
    const diff = (new Date(datesDesc[i - 1]).getTime() - new Date(datesDesc[i]).getTime()) / 86400000;
    if (Math.round(diff) === 1) s++; else break;
  }
  return s;
}

/** Plus longue série de jours consécutifs présente dans l'historique fourni. */
export function computeStreakRecord(datesDesc: string[]): number {
  if (datesDesc.length === 0) return 0;
  let max = 1, cur = 1;
  for (let i = 1; i < datesDesc.length; i++) {
    const diff = (new Date(datesDesc[i - 1]).getTime() - new Date(datesDesc[i]).getTime()) / 86400000;
    if (Math.round(diff) === 1) { cur++; if (cur > max) max = cur; }
    else cur = 1;
  }
  return max;
}
