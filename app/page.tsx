import StoryCard from "@/components/StoryCard";
import Sidebar from "@/components/Sidebar";
import LevelSelector from "@/components/LevelSelector";
import DateLabel from "@/components/DateLabel";
import { STORIES } from "@/lib/stories";
import { createClient } from "@supabase/supabase-js";
import type { Story } from "@/lib/stories";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ level?: string; day?: string }>;
}) {
  const params = await searchParams;
  const level  = (params.level as Story["level"]) ?? "Lecteur";
  const dayParam = params.day ? parseInt(params.day) : null;

  const levelStories = STORIES.filter(s => s.level === level);
  const reference    = new Date("2026-05-17T00:00:00");
  const parisNow     = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" }));
  const diffDays     = Math.floor((parisNow.getTime() - reference.getTime()) / (1000 * 60 * 60 * 24));
  const todayIndex   = diffDays % levelStories.length;
  const index        = dayParam !== null ? dayParam % levelStories.length : todayIndex;

  // Date Paris du jour demandé
  const targetDate = new Date(reference.getTime() + (dayParam ?? diffDays) * 86400000);
  const targetDateStr = new Date(targetDate.toLocaleString("en-US", { timeZone: "Europe/Paris" }))
    .toISOString().slice(0, 10);

  // Cherche d'abord dans stories_custom
  let story: Story | null = null;
  try {
    const { data: custom } = await supabaseAdmin
      .from("stories_custom")
      .select("*")
      .eq("date", targetDateStr)
      .eq("level", level)
      .maybeSingle();

    if (custom) {
      story = {
        slug: custom.slug ?? `custom-${targetDateStr}-${level}`,
        date: custom.date,
        title: custom.title,
        category: custom.category,
        level: custom.level as Story["level"],
        readTime: custom.read_time ?? "3 min de lecture",
        source: custom.source ?? "",
        paragraphs: Array.isArray(custom.paragraphs) ? custom.paragraphs : [],
      };
    }
  } catch {}

  // Fallback vers le code si pas de custom
  if (!story) {
    story = levelStories[index] ?? levelStories[0];
  }

  return (
    <main className="main">
      <DateLabel />
      <LevelSelector current={level} />
      <div className="layout">
        <StoryCard story={story} />
        <Sidebar />
      </div>
    </main>
  );
}
