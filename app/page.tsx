import StoryCard from "@/components/StoryCard";
import Sidebar from "@/components/Sidebar";
import LevelSelector from "@/components/LevelSelector";
import DateLabel from "@/components/DateLabel";
import { STORIES } from "@/lib/stories";
import type { Story } from "@/lib/stories";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ level?: string; day?: string }>;
}) {
  const params = await searchParams;
  const level  = (params.level as Story["level"]) ?? "Lecteur";
  const dayParam = params.day ? parseInt(params.day) : null;

  const levelStories = STORIES.filter(s => s.level === level);
  const reference    = new Date("2026-05-17");
  const today        = new Date();
  const diffDays     = Math.floor((today.getTime() - reference.getTime()) / (1000 * 60 * 60 * 24));
  const todayIndex   = diffDays % levelStories.length;

  // Si un jour spécifique est demandé (Premium), utilise cet index
  const index = dayParam !== null ? dayParam % levelStories.length : todayIndex;
  const story = levelStories[index] ?? levelStories[0];

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
