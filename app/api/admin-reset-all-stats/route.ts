import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ADMIN_ID = "0450c58e-35b2-47e6-9600-13db5626e96d";

export async function POST(request: NextRequest) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { data: { user } } = await supabaseAdmin.auth.getUser(token);
  if (user?.id !== ADMIN_ID) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  // Supprimer toutes les données d'activité sauf l'admin
  const simpleTables = ["stories_read","words_seen","word_favorites","definition_usage","game_completions","story_ratings","story_reports"];
  for (const table of simpleTables) {
    await supabaseAdmin.from(table).delete().neq("user_id", ADMIN_ID);
  }
  await supabaseAdmin.from("friendships").delete().neq("user_id", ADMIN_ID);

  // Reset XP pour tous sauf admin
  await supabaseAdmin.from("profiles").update({ xp: 0 }).neq("id", ADMIN_ID);

  return NextResponse.json({ success: true });
}
