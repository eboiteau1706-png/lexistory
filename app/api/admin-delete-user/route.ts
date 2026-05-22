import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_ID = "0450c58e-35b2-47e6-9600-13db5626e96d";

export async function POST(req: NextRequest) {
  const { userId, requesterId } = await req.json();
  if (requesterId !== ADMIN_ID) return NextResponse.json({ error: "Non autorisé" }, { status: 403 });

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  await supabaseAdmin.from("words_seen").delete().eq("user_id", userId);
  await supabaseAdmin.from("stories_read").delete().eq("user_id", userId);
  await supabaseAdmin.from("game_completions").delete().eq("user_id", userId);
  await supabaseAdmin.from("profiles").delete().eq("id", userId);
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}