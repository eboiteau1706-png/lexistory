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

  const { userId } = await request.json();
  if (!userId) return NextResponse.json({ error: "userId manquant" }, { status: 400 });

  // Supprimer toutes les données du joueur
  const tables = [
    "stories_read",
    "words_seen",
    "word_favorites",
    "definition_usage",
    "game_completions",
    "story_ratings",
    "friendships",
    "story_reports",
  ];

  for (const table of tables) {
    const col = table === "friendships" ? null : "user_id";
    if (col) {
      await supabaseAdmin.from(table).delete().eq(col, userId);
    } else {
      await supabaseAdmin.from("friendships").delete().or(`user_id.eq.${userId},friend_id.eq.${userId}`);
    }
  }

  // Réinitialiser le profil (pseudo, avatar, XP, premium)
  await supabaseAdmin.from("profiles").update({
    username: null,
    avatar_url: null,
    xp: 0,
    is_premium: false,
    stripe_customer_id: null,
  }).eq("id", userId);

  return NextResponse.json({ success: true });
}
