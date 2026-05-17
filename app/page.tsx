import StoryCard from "@/components/StoryCard";
import Sidebar from "@/components/Sidebar";
import LevelSelector from "@/components/LevelSelector";
import DateLabel from "@/components/DateLabel";
import { STORIES } from "@/lib/stories";
import type { Story } from "@/lib/stories";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const params = await searchParams;
  const level = (params.level as Story["level"]) ?? "Lecteur";

  const story =
    [...STORIES].reverse().find((s) => s.level === level) ??
    STORIES[STORIES.length - 1];

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