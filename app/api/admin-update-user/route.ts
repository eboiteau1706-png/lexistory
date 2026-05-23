// app/api/admin-update-user/route.ts
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_ID = "0450c58e-35b2-47e6-9600-13db5626e96d";

export async function POST(req: NextRequest) {
  const { userId, requesterId, updates } = await req.json();
  if (requesterId !== ADMIN_ID) return NextResponse.json({ error: "Non autorisé" }, { status: 403 });

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabaseAdmin.from("profiles").update(updates).eq("id", userId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}