import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_ID = "0450c58e-35b2-47e6-9600-13db5626e96d";

export async function POST(req: NextRequest) {
  const { userId, requesterId } = await req.json();
  if (requesterId !== ADMIN_ID) return NextResponse.json({ error: "Non autorisé" }, { status: 403 });

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  await supabaseAdmin.from("words_seen").delete().eq("user_id", userId);
  await supabaseAdmin.from("stories_read").delete().eq("user_id", userId);
  await supabaseAdmin.from("game_completions").delete().eq("user_id", userId);
  await supabaseAdmin.from("profiles").delete().eq("id", userId);
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

    // Récupère le stripe_customer_id avant de supprimer le profil
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    // Annule l'abonnement Stripe si il existe
    if (profile?.stripe_customer_id) {
      try {
        const subscriptions = await stripe.subscriptions.list({
          customer: profile.stripe_customer_id,
          status: "active",
          limit: 1,
        });
        if (subscriptions.data.length) {
          await stripe.subscriptions.cancel(subscriptions.data[0].id);
        }
      } catch (stripeErr: any) {
        console.error("Stripe cancel error:", stripeErr.message);
        // On continue quand même la suppression du compte
      }
    }

    // Supprime toutes les données
    await supabaseAdmin.from("words_seen").delete().eq("user_id", user.id);
    await supabaseAdmin.from("stories_read").delete().eq("user_id", user.id);
    await supabaseAdmin.from("friendships").delete().or(`user_id.eq.${user.id},friend_id.eq.${user.id}`);
    await supabaseAdmin.from("profiles").delete().eq("id", user.id);

// Libère l'email original avant suppression
await supabaseAdmin.auth.admin.updateUserById(user.id, {
  email: `deleted_${user.id}@deleted.lexistory`,
});

// Supprime le compte Auth
await supabaseAdmin.auth.admin.deleteUser(user.id);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}