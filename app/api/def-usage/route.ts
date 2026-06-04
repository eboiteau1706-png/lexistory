import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function getParisDate(): string {
  const d = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" }));
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Quota selon rang (seuils XP v3)
function getQuotaByXp(xp: number): number {
  if (xp >= 2500) return 8; // Légende I–III
  if (xp >= 900)  return 5; // Sage I → Maître III
  if (xp >= 250)  return 4; // Lecteur I → Érudit III
  return 3;                  // Novice I → Apprenti III
}

async function getUserId(token: string | null) {
  if (!token) return null;
  const { data: { user } } = await supabaseAdmin.auth.getUser(token);
  return user?.id ?? null;
}

async function getUserProfile(userId: string): Promise<{ isPremium: boolean; xp: number }> {
  const { data } = await supabaseAdmin.from("profiles").select("is_premium, xp").eq("id", userId).single();
  return { isPremium: data?.is_premium ?? false, xp: data?.xp ?? 0 };
}

// GET ?story_id=xxx — returns current count without modifying
export async function GET(request: NextRequest) {
  const story_id = new URL(request.url).searchParams.get("story_id");
  const token = request.headers.get("Authorization")?.replace("Bearer ", "") ?? null;
  const userId = await getUserId(token);

  if (!userId || !story_id) return NextResponse.json({ count: 0, remaining: 3, quota: 3 });
  const { isPremium, xp } = await getUserProfile(userId);
  if (isPremium) return NextResponse.json({ count: 0, remaining: -1, quota: -1 });

  const quota = getQuotaByXp(xp);
  const today = getParisDate();
  const { data } = await supabaseAdmin
    .from("definition_usage")
    .select("count")
    .eq("user_id", userId).eq("story_id", story_id).eq("date", today)
    .maybeSingle();

  const count = data?.count ?? 0;
  return NextResponse.json({ count, remaining: Math.max(0, quota - count), quota });
}

// POST { story_id } — check + increment atomically
export async function POST(request: NextRequest) {
  const { story_id } = await request.json();
  const token = request.headers.get("Authorization")?.replace("Bearer ", "") ?? null;
  const userId = await getUserId(token);

  if (!userId || !story_id) return NextResponse.json({ allowed: true, remaining: -1, quota: -1 });
  const { isPremium, xp } = await getUserProfile(userId);
  if (isPremium) return NextResponse.json({ allowed: true, remaining: -1, quota: -1 });

  const quota = getQuotaByXp(xp);
  const today = getParisDate();
  const { data: existing } = await supabaseAdmin
    .from("definition_usage")
    .select("id, count")
    .eq("user_id", userId).eq("story_id", story_id).eq("date", today)
    .maybeSingle();

  const currentCount = existing?.count ?? 0;
  if (currentCount >= quota) {
    return NextResponse.json({ allowed: false, remaining: 0, quota });
  }

  const newCount = currentCount + 1;
  if (existing) {
    await supabaseAdmin.from("definition_usage").update({ count: newCount }).eq("id", existing.id);
  } else {
    await supabaseAdmin.from("definition_usage").insert({ user_id: userId, story_id, date: today, count: 1 });
  }

  return NextResponse.json({ allowed: true, remaining: Math.max(0, quota - newCount), quota });
}
