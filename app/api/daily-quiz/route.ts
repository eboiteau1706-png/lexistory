import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";
import { STORIES } from "@/lib/stories";

const ADMIN_ID = "0450c58e-35b2-47e6-9600-13db5626e96d";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function getStaticStory(date: string, level: string) {
  const levelStories = STORIES.filter(s => s.level === level);
  if (!levelStories.length) return null;
  const refMs = new Date("2026-05-17T12:00:00Z").getTime();
  const tgtMs = new Date(date + "T12:00:00Z").getTime();
  const dayOffset = Math.round((tgtMs - refMs) / 86400000);
  const idx = ((dayOffset % levelStories.length) + levelStories.length) % levelStories.length;
  return levelStories[idx];
}

async function verifyAdmin(request: NextRequest): Promise<boolean> {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return false;
  const { data: { user } } = await supabaseAdmin.auth.getUser(token);
  return user?.id === ADMIN_ID;
}

// ── GET: return cached quiz or generate via Claude ────────────────────────────
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date  = searchParams.get("date");
  const level = searchParams.get("level");

  if (!date || !level) {
    return NextResponse.json({ error: "date and level required" }, { status: 400 });
  }

  // Return cached quiz if it exists
  const { data: cached } = await supabaseAdmin
    .from("daily_quiz")
    .select("questions")
    .eq("story_date", date)
    .eq("level", level)
    .maybeSingle();

  if (cached) {
    return NextResponse.json({ questions: cached.questions, source: "cache" });
  }

  // Fetch story for this date + level (custom override first, then static)
  const { data: customStory } = await supabaseAdmin
    .from("stories_custom")
    .select("title, paragraphs")
    .eq("date", date)
    .eq("level", level)
    .maybeSingle();

  let storyText: string;

  if (customStory) {
    storyText = (Array.isArray(customStory.paragraphs) ? customStory.paragraphs : []).join("\n\n");
  } else {
    const staticStory = getStaticStory(date, level);
    if (!staticStory) {
      return NextResponse.json({ error: "story not found" }, { status: 404 });
    }
    storyText = staticStory.paragraphs.join("\n\n");
  }

  const prompt = `Génère 6 questions JSON sur cette histoire : ${storyText}

3 compréhension (type "histoire") + 3 vocabulaire sur mots difficiles (type "vocabulaire"). 4 choix, 1 correct + explication courte. Adapte la difficulté au niveau "${level}".

Format JSON uniquement, sans markdown :
{"questions":[{"type":"histoire","question":"...","choices":["...","...","...","..."],"correct_index":0,"explanation":"..."}]}

correct_index est l'index 0-3 de la bonne réponse dans choices.`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const textBlock = message.content.find(b => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json({ error: "No response from AI" }, { status: 500 });
    }

    const cleaned   = textBlock.text.replace(/```json|```/g, "").trim();
    const parsed    = JSON.parse(cleaned);
    const questions = parsed.questions;

    await supabaseAdmin
      .from("daily_quiz")
      .insert({ story_date: date, level, questions });

    return NextResponse.json({ questions, source: "generated" });
  } catch (error) {
    console.error("DAILY QUIZ ERROR:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// ── DELETE: admin only — remove a quiz from cache ─────────────────────────────
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date  = searchParams.get("date");
  const level = searchParams.get("level");

  if (!date || !level) {
    return NextResponse.json({ error: "date and level required" }, { status: 400 });
  }

  const isAdmin = await verifyAdmin(request);
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { error } = await supabaseAdmin
    .from("daily_quiz")
    .delete()
    .eq("story_date", date)
    .eq("level", level);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
