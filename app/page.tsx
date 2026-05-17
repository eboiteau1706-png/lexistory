import Nav from "@/components/Nav";
import StoryCard from "@/components/StoryCard";
import Sidebar from "@/components/Sidebar";
import LevelSelector from "@/components/LevelSelector";
import { STORIES } from "@/lib/stories";
import type { Story } from "@/lib/stories";

export default function Home({
  searchParams,
}: {
  searchParams: { level?: string };
}) {
  const level = (searchParams.level as Story["level"]) ?? "Lecteur";

  // Trouve l'histoire du niveau demandé
  const story =
    [...STORIES].reverse().find((s) => s.level === level) ??
    STORIES[STORIES.length - 1];

  const date = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="main">
      <p className="date-label">{date}</p>

      <LevelSelector current={level} />

      <div className="layout">
        <StoryCard story={story} />
        <Sidebar />
      </div>
    </main>
  );
}
