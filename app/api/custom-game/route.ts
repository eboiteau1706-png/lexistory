// app/api/custom-game/route.ts
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  if (!date) return NextResponse.json({ game: null });

  const { data } = await supabaseAdmin
    .from("games_custom")
    .select("*")
    .eq("game_date", date)
    .maybeSingle();

  return NextResponse.json({ game: data ?? null });
}