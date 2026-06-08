import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: { user } } = await supabaseAdmin.auth.getUser(token);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { entries } = await req.json();
  if (!Array.isArray(entries) || entries.length === 0)
    return NextResponse.json({ inserted: 0 });

  // Récupère toutes les lignes existantes pour cet utilisateur
  const { data: existing } = await supabaseAdmin
    .from("quiz_completions")
    .select("quiz_date, level")
    .eq("user_id", user.id);

  const existingKeys = new Set((existing ?? []).map((r: any) => `${r.level}_${r.quiz_date}`));

  let inserted = 0;
  const errors: string[] = [];
  for (const e of entries) {
    if (typeof e.score !== "number" || !e.quiz_date || !e.level) continue;
    if (existingKeys.has(`${e.level}_${e.quiz_date}`)) continue;
    const { error } = await supabaseAdmin.from("quiz_completions").insert({
      user_id:   user.id,
      quiz_date: e.quiz_date,
      level:     e.level,
      score:     e.score,
      xp_earned: e.xp_earned ?? 0,
      answers:   Array.isArray(e.answers) ? e.answers : [],
    });
    if (error) errors.push(`${e.level}/${e.quiz_date}: ${error.message}`);
    else inserted++;
  }

  return NextResponse.json({ inserted, errors: errors.length > 0 ? errors : undefined });
}
