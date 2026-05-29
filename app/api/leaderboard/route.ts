import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data } = await supabaseAdmin
    .from("profiles")
    .select("id, username, xp, is_premium, avatar_url")
    .order("xp", { ascending: false })
    .limit(200);

  return NextResponse.json({ players: data ?? [] });
}
