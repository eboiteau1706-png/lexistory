import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return <ProfileClient user={user} />;
}
