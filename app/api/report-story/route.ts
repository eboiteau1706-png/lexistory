import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { storySlug, storyTitle, storyLevel, reportType, message, username } = await request.json();

    if (!storySlug || !reportType) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
    }

    await supabaseAdmin.from("story_reports").insert({
      story_slug: storySlug,
      story_title: storyTitle,
      story_level: storyLevel,
      report_type: reportType,
      message: message || null,
      username: username || null,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
