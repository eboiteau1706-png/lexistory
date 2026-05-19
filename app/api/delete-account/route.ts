import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "@/lib/supabase-server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

    // Supprime toutes les données
    await supabaseAdmin.from("words_seen").delete().eq("user_id", user.id);
    await supabaseAdmin.from("stories_read").delete().eq("user_id", user.id);
    await supabaseAdmin.from("friendships").delete().or(`user_id.eq.${user.id},friend_id.eq.${user.id}`);
    await supabaseAdmin.from("profiles").delete().eq("id", user.id);

    // Supprime le compte Auth
    await supabaseAdmin.auth.admin.deleteUser(user.id);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}