import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
const ADMIN_ID = "0450c58e-35b2-47e6-9600-13db5626e96d";

export async function POST(request: NextRequest) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data: { user } } = await supabaseAdmin.auth.getUser(token);
  if (user?.id !== ADMIN_ID) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { date, level, title, category, source, readTime, paragraphs } = await request.json();

  const { error } = await supabaseAdmin.from("stories_custom").upsert({
    date, level,
    slug: `custom-${date}-${(level as string).toLowerCase()}`,
    title: title?.trim() || "",
    category: category?.trim() || "Divers",
    source: source?.trim() || "",
    read_time: readTime?.trim() || "3 min de lecture",
    paragraphs: Array.isArray(paragraphs) ? paragraphs.filter((p: string) => p.trim()) : [],
  }, { onConflict: "date,level" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
