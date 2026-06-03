import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { STORIES } from "@/lib/stories";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function getStaticStory(date: string, level: string) {
  const levelStories = STORIES.filter(s => s.level === level);
  if (!levelStories.length) return null;
  // Days since reference 2026-05-17, using noon UTC to avoid DST edge cases
  const refMs = new Date("2026-05-17T12:00:00Z").getTime();
  const tgtMs = new Date(date + "T12:00:00Z").getTime();
  const dayOffset = Math.round((tgtMs - refMs) / 86400000);
  const idx = ((dayOffset % levelStories.length) + levelStories.length) % levelStories.length;
  return levelStories[idx];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date  = searchParams.get("date");
  const level = searchParams.get("level");
  if (!date || !level) return NextResponse.json({ error: "date and level required" }, { status: 400 });

  // Custom override wins
  const { data: custom } = await supabaseAdmin
    .from("stories_custom")
    .select("*")
    .eq("date", date)
    .eq("level", level)
    .maybeSingle();

  if (custom) {
    return NextResponse.json({
      story: {
        title:      custom.title      ?? "",
        category:   custom.category   ?? "",
        source:     custom.source     ?? "",
        readTime:   custom.read_time  ?? "3 min de lecture",
        paragraphs: Array.isArray(custom.paragraphs) ? custom.paragraphs : [""],
      },
      hasCustom: true,
    });
  }

  // Fallback to static rotation
  const staticStory = getStaticStory(date, level);
  if (!staticStory) return NextResponse.json({ error: "level not found" }, { status: 404 });

  return NextResponse.json({
    story: {
      title:      staticStory.title,
      category:   staticStory.category,
      source:     staticStory.source,
      readTime:   staticStory.readTime,
      paragraphs: staticStory.paragraphs,
    },
    hasCustom: false,
  });
}
