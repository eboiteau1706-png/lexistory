import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig  = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: "Webhook invalide" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const customerEmail = session.customer_details?.email;
    const customerId    = session.customer as string;

    if (customerEmail) {
      // Trouve l'user par email et met is_premium à true
      const { data: users } = await supabase.auth.admin.listUsers();
      const user = users?.users?.find(u => u.email === customerEmail);
      if (user) {
        await supabase
          .from("profiles")
          .upsert({ id: user.id, is_premium: true, stripe_customer_id: customerId });
      }
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as any;
    const customerId = sub.customer as string;
    await supabase
      .from("profiles")
      .update({ is_premium: false })
      .eq("stripe_customer_id", customerId);
  }

  return NextResponse.json({ received: true });
}