import Nav from "@/components/Nav";
import StoryCard from "@/components/StoryCard";
import Sidebar from "@/components/Sidebar";
import { getTodayStory } from "@/lib/stories";

export default function Home() {
  const story = getTodayStory();

  return (
    <main className="main">
      <p className="date-label">
        {new Date().toLocaleDateString("fr-FR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      <div className="layout">
        <StoryCard story={story} />
        <Sidebar />
      </div>
    </main>
  );
}
