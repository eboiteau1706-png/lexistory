import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const DAILY_LIMIT = 3;

function getParisDate(): string {
  const d = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" }));
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

async function getUserId(token: string | null) {
  if (!token) return null;
  const { data: { user } } = await supabaseAdmin.auth.getUser(token);
  return user?.id ?? null;
}

async function isPremiumUser(userId: string): Promise<boolean> {
  const { data } = await supabaseAdmin.from("profiles").select("is_premium").eq("id", userId).single();
  return data?.is_premium === true;
}

// GET ?story_id=xxx — returns current count without modifying
export async function GET(request: NextRequest) {
  const story_id = new URL(request.url).searchParams.get("story_id");
  const token = request.headers.get("Authorization")?.replace("Bearer ", "") ?? null;
  const userId = await getUserId(token);

  if (!userId || !story_id) return NextResponse.json({ count: 0, remaining: DAILY_LIMIT });
  if (await isPremiumUser(userId)) return NextResponse.json({ count: 0, remaining: -1 }); // -1 = illimité

  const today = getParisDate();
  const { data } = await supabaseAdmin
    .from("definition_usage")
    .select("count")
    .eq("user_id", userId).eq("story_id", story_id).eq("date", today)
    .maybeSingle();

  const count = data?.count ?? 0;
  return NextResponse.json({ count, remaining: Math.max(0, DAILY_LIMIT - count) });
}

// POST { story_id } — check + increment atomically
export async function POST(request: NextRequest) {
  const { story_id } = await request.json();
  const token = request.headers.get("Authorization")?.replace("Bearer ", "") ?? null;
  const userId = await getUserId(token);

  // Non connecté ou pas de storyId → autorisé sans limite
  if (!userId || !story_id) return NextResponse.json({ allowed: true, remaining: -1 });
  if (await isPremiumUser(userId)) return NextResponse.json({ allowed: true, remaining: -1 });

  const today = getParisDate();
  const { data: existing } = await supabaseAdmin
    .from("definition_usage")
    .select("id, count")
    .eq("user_id", userId).eq("story_id", story_id).eq("date", today)
    .maybeSingle();

  const currentCount = existing?.count ?? 0;
  if (currentCount >= DAILY_LIMIT) {
    return NextResponse.json({ allowed: false, remaining: 0 });
  }

  const newCount = currentCount + 1;
  if (existing) {
    await supabaseAdmin.from("definition_usage").update({ count: newCount }).eq("id", existing.id);
  } else {
    await supabaseAdmin.from("definition_usage").insert({ user_id: userId, story_id, date: today, count: 1 });
  }

  return NextResponse.json({ allowed: true, remaining: Math.max(0, DAILY_LIMIT - newCount) });
}
