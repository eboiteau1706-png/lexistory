import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerSupabaseClient } from "@/lib/supabase-server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    if (!profile?.stripe_customer_id) {
      return NextResponse.json({ renewalDate: null, daysLeft: null });
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: profile.stripe_customer_id,
      status: "active",
      limit: 1,
    });

    if (!subscriptions.data.length) {
      return NextResponse.json({ renewalDate: null, daysLeft: null });
    }

    const sub = subscriptions.data[0];

    // Log pour débugger
    console.log("Subscription keys:", Object.keys(sub));
    console.log("current_period_end:", (sub as any).current_period_end);
    console.log("billing_cycle_anchor:", (sub as any).billing_cycle_anchor);

    // Stripe renvoie current_period_end en secondes Unix
    const raw = sub.items?.data?.[0]?.subscription
      ? null
      : (sub as any).current_period_end;

    // Fallback : cherche dans tous les endroits possibles
    const periodEndSeconds =
      (sub as any).current_period_end ||
      (sub as any).current_period?.end ||
      null;

    if (!periodEndSeconds) {
      return NextResponse.json({ renewalDate: null, daysLeft: null });
    }

    const renewalDate = new Date(periodEndSeconds * 1000);
    const now = new Date();
    const daysLeft = Math.ceil((renewalDate.getTime() - now.getTime()) / 86400000);
    const renewalDateStr = renewalDate.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Europe/Paris",
    });

    return NextResponse.json({ renewalDate: renewalDateStr, daysLeft });
  } catch (err: any) {
    console.error("Subscription error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}