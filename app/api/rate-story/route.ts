import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { story_id, rating } = await request.json();

    if (!story_id || typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const token = request.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: { user } } = await supabaseAdmin.auth.getUser(token);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Upsert user rating
    await supabaseAdmin
      .from("story_ratings")
      .upsert({ user_id: user.id, story_id, rating }, { onConflict: "user_id,story_id" });

    // Recalculate avg and count from all ratings for this story
    const { data: all } = await supabaseAdmin
      .from("story_ratings")
      .select("rating")
      .eq("story_id", story_id);

    const count = all?.length ?? 0;
    const avg = count > 0
      ? parseFloat((all!.reduce((s, r) => s + r.rating, 0) / count).toFixed(2))
      : 0;

    // Update stories_custom aggregates
    await supabaseAdmin
      .from("stories_custom")
      .update({ avg_rating: avg, ratings_count: count })
      .eq("slug", story_id);

    return NextResponse.json({ success: true, avg_rating: avg, ratings_count: count });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
