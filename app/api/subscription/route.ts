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

    // Cherche la date de fin dans tous les champs possibles
    const periodEndSeconds =
      sub.current_period_end ||
      sub.billing_cycle_anchor ||
      sub.next_pending_invoice_item_invoice ||
      null;

    // Si toujours pas trouvé, cherche dans les items
    const itemPeriodEnd = sub.items?.data?.[0]?.current_period_end || null;
    const finalEnd = periodEndSeconds || itemPeriodEnd;

    if (!finalEnd) {
      // Dernier recours : billing_cycle_anchor + 1 mois
      const anchor = sub.billing_cycle_anchor;
      if (anchor) {
        const anchorDate = new Date(anchor * 1000);
        const now = new Date();
        // Trouve le prochain billing_cycle_anchor
        anchorDate.setFullYear(now.getFullYear());
        anchorDate.setMonth(now.getMonth() + (anchorDate < now ? 1 : 0));
        const daysLeft = Math.ceil((anchorDate.getTime() - now.getTime()) / 86400000);
        const renewalDateStr = anchorDate.toLocaleDateString("fr-FR", {
          day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris",
        });
        return NextResponse.json({ renewalDate: renewalDateStr, daysLeft });
      }
      return NextResponse.json({ renewalDate: null, daysLeft: null });
    }

    const renewalDate = new Date(Number(finalEnd) * 1000);
    const now = new Date();
    const daysLeft = Math.ceil((renewalDate.getTime() - now.getTime()) / 86400000);
    const renewalDateStr = renewalDate.toLocaleDateString("fr-FR", {
      day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris",
    });

    return NextResponse.json({ renewalDate: renewalDateStr, daysLeft });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}