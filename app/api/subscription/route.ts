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

    const sub = subscriptions.data[0] as any;

    // current_period_end uniquement — pas de fallback qui cause des bugs
    const periodEndSeconds =
      sub.current_period_end ||
      sub.items?.data?.[0]?.current_period_end ||
      null;

    if (!periodEndSeconds) {
      return NextResponse.json({ renewalDate: null, daysLeft: null });
    }

    const renewalDate = new Date(Number(periodEndSeconds) * 1000);
    const nowParis = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" }));
const daysLeft = Math.floor((renewalDate.getTime() - nowParis.getTime()) / 86400000);
    const renewalDateStr = renewalDate.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Europe/Paris",
    });

    return NextResponse.json({ renewalDate: renewalDateStr, daysLeft,  cancelAtPeriodEnd: sub.cancel_at_period_end ?? false, });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
  
}