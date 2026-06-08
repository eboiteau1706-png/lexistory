import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const targetId = req.nextUrl.searchParams.get("userId");
  if (!targetId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

  // Vérifie que le demandeur est authentifié et ami avec la cible
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: { user } } = await supabaseAdmin.auth.getUser(token);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Soi-même ou ami
  if (user.id !== targetId) {
    const { data: friendship } = await supabaseAdmin.from("friendships")
      .select("id").eq("status", "accepted")
      .or(`and(user_id.eq.${user.id},friend_id.eq.${targetId}),and(user_id.eq.${targetId},friend_id.eq.${user.id})`)
      .single();
    if (!friendship) return NextResponse.json({ error: "Not friends" }, { status: 403 });
  }

  const { data } = await supabaseAdmin
    .from("quiz_completions")
    .select("level, score, quiz_date")
    .eq("user_id", targetId);

  return NextResponse.json({ data: data ?? [] });
}
