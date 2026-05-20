import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerSupabaseClient } from "@/lib/supabase-server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Récupère le stripe_customer_id existant si possible
    let customerId: string | undefined;
    let customerEmail: string | undefined;

    if (user) {
      customerEmail = user.email;
      const { data: profile } = await supabase
        .from("profiles")
        .select("stripe_customer_id")
        .eq("id", user.id)
        .single();
      if (profile?.stripe_customer_id) {
        customerId = profile.stripe_customer_id;
      }
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      // Pré-remplit l'email ET lie au customer existant si possible
      ...(customerId ? { customer: customerId } : {}),
      ...(customerEmail && !customerId ? { customer_email: customerEmail } : {}),
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe error:", err?.message);
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}