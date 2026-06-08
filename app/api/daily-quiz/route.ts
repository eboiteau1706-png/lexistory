import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";
import { STORIES } from "@/lib/stories";

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

  let storyTitle: string;
  let storyText: string;

  if (customStory) {
    storyTitle = customStory.title ?? "";
    storyText  = (Array.isArray(customStory.paragraphs) ? customStory.paragraphs : []).join("\n\n");
  } else {
    const staticStory = getStaticStory(date, level);
    if (!staticStory) {
      return NextResponse.json({ error: "story not found" }, { status: 404 });
    }
    storyTitle = staticStory.title;
    storyText  = staticStory.paragraphs.join("\n\n");
  }

  const levelHints: Record<string, string> = {
    Curieux:  "simple, accessibles à un enfant de 10 ans",
    Lecteur:  "intermédiaires, pour un lecteur régulier",
    Érudit:   "avancées, pour un lecteur cultivé",
  };

  const prompt = `Tu génères un quiz pédagogique en français pour une application de lecture.

Histoire : "${storyTitle}"
Niveau : ${level} (questions ${levelHints[level] ?? "adaptées au niveau"})
Texte :
${storyText}

Génère exactement 6 questions :
- 3 questions de COMPRÉHENSION du texte (idées principales, faits, causes et effets décrits dans le texte)
- 3 questions de VOCABULAIRE (sur des mots ou expressions présents dans le texte)

Règles :
- Chaque question a exactement 4 choix distincts
- Les mauvaises réponses sont plausibles mais clairement incorrectes pour quelqu'un qui a lu le texte
- L'explication est une phrase courte justifiant la bonne réponse
- La valeur de "answer" doit être identique à l'un des éléments de "choices"

Réponds UNIQUEMENT en JSON valide sans markdown ni backticks :
{"questions":[{"type":"comprehension","question":"...","choices":["...","...","...","..."],"answer":"...","explanation":"..."}]}`;

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

    const cleaned  = textBlock.text.replace(/```json|```/g, "").trim();
    const parsed   = JSON.parse(cleaned);
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
