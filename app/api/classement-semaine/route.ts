import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  // Monday 00:00 Paris → UTC
  const utcNow   = new Date();
  const parisNow = new Date(utcNow.toLocaleString("en-US", { timeZone: "Europe/Paris" }));
  const parisOffsetMs   = parisNow.getTime() - utcNow.getTime();
  const daysSinceMonday = parisNow.getDay() === 0 ? 6 : parisNow.getDay() - 1;

  const mondayLocal = new Date(
    parisNow.getFullYear(),
    parisNow.getMonth(),
    parisNow.getDate() - daysSinceMonday
  );
  const mondayUTC     = new Date(mondayLocal.getTime() - parisOffsetMs);
  const mondayDateStr = `${mondayLocal.getFullYear()}-${String(mondayLocal.getMonth() + 1).padStart(2, "0")}-${String(mondayLocal.getDate()).padStart(2, "0")}`;

  const [storiesRes, quizRes, gamesRes, profilesRes] = await Promise.all([
    supabaseAdmin.from("stories_read")
      .select("user_id")
      .gte("read_at", mondayUTC.toISOString()),
    supabaseAdmin.from("quiz_completions")
      .select("user_id, xp_earned")
      .gte("quiz_date", mondayDateStr),
    supabaseAdmin.from("game_completions")
      .select("user_id, def_answer, anag_done, cit_answer")
      .gte("game_date", mondayDateStr),
    supabaseAdmin.from("profiles")
      .select("id, username, xp, is_premium, avatar_url")
      .not("username", "is", null),
  ]);

  const xpMap: Record<string, number> = {};

  for (const s of storiesRes.data ?? [])
    xpMap[s.user_id] = (xpMap[s.user_id] ?? 0) + 5;

  for (const q of quizRes.data ?? [])
    xpMap[q.user_id] = (xpMap[q.user_id] ?? 0) + q.xp_earned;

  for (const g of gamesRes.data ?? []) {
    let gXp = 0;
    if (g.def_answer !== null)       gXp += 3; // 2 ou 4 selon réponse, on prend la moyenne
    if (g.anag_done === true)        gXp += 4;
    else if (g.anag_done === false)  gXp += 2;
    if (g.cit_answer !== null)       gXp += 3;
    if (gXp > 0) xpMap[g.user_id] = (xpMap[g.user_id] ?? 0) + gXp;
  }

  const byId = Object.fromEntries((profilesRes.data ?? []).map((p: any) => [p.id, p]));

  const players = Object.entries(xpMap)
    .filter(([id]) => byId[id])
    .map(([id, weeklyXp]) => ({ ...byId[id], weeklyXp }))
    .sort((a: any, b: any) => b.weeklyXp - a.weeklyXp)
    .slice(0, 200);

  return NextResponse.json({ players, mondayDate: mondayDateStr });
}
