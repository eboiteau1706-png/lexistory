import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ADMIN_ID = "0450c58e-35b2-47e6-9600-13db5626e96d";

async function getUid(request: NextRequest): Promise<string | null> {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return null;
  const { data: { user } } = await supabaseAdmin.auth.getUser(token);
  return user?.id ?? null;
}

// GET ?story_id=xxx
export async function GET(request: NextRequest) {
  const story_id = new URL(request.url).searchParams.get("story_id");
  if (!story_id) return NextResponse.json({ words: [] });
  const { data } = await supabaseAdmin
    .from("disabled_words").select("word_key").eq("story_id", story_id);
  return NextResponse.json({ words: data?.map((d: any) => d.word_key) ?? [] });
}

// POST { story_id, word_key }
export async function POST(request: NextRequest) {
  const uid = await getUid(request);
  if (uid !== ADMIN_ID) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { story_id, word_key } = await request.json();
  const { error } = await supabaseAdmin
    .from("disabled_words")
    .upsert({ story_id, word_key }, { onConflict: "story_id,word_key" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

// DELETE { story_id, word_key }
export async function DELETE(request: NextRequest) {
  const uid = await getUid(request);
  if (uid !== ADMIN_ID) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { story_id, word_key } = await request.json();
  await supabaseAdmin.from("disabled_words").delete()
    .eq("story_id", story_id).eq("word_key", word_key);
  return NextResponse.json({ success: true });
}
