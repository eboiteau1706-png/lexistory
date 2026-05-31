import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function getParisDate(): string {
  const d = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" }));
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export async function POST(request: NextRequest) {
  try {
    const { raw, key, story_id }: { raw: string; key: string; story_id?: string } = await request.json();

    // A) Cache lookup
    const { data: cached } = await supabaseAdmin
      .from("definitions_cache")
      .select("result")
      .eq("word_key", key)
      .maybeSingle();

    if (cached) {
      return NextResponse.json({ source: "cache", result: cached.result });
    }

    // B) Auth — identify user and premium status
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");
    let userId: string | null = null;
    let isPremium = false;

    if (token) {
      const { data: { user } } = await supabaseAdmin.auth.getUser(token);
      if (user) {
        userId = user.id;
        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("is_premium")
          .eq("id", user.id)
          .single();
        isPremium = profile?.is_premium ?? false;
      }
    }

    // C) Free user limit is now handled by WordPopup via /api/def-usage before any lookup

    // D) Monthly usage cap
    const month = new Date().toISOString().slice(0, 7);

    const { data: usage } = await supabaseAdmin
      .from("api_usage")
      .select("call_count")
      .eq("month", month)
      .maybeSingle();

    if (!usage) {
      await supabaseAdmin
        .from("api_usage")
        .insert({ month, call_count: 0 });
    } else if (usage.call_count >= 500) {
      return NextResponse.json({ source: "limit", result: null });
    }

    // E) Anthropic API call
    const prompt = `Tu es un dictionnaire intelligent intégré dans une application de lecture française.
L'utilisateur a sélectionné : ${raw} (forme normalisée : ${key})
Analyse intelligemment : si nom propre → biographie courte, si mot conjugué → ramène à l'infinitif, si pluriel → ramène au singulier, si groupe de mots → traite comme une unité, si plusieurs sens → liste tous les sens.
Fournis : étymologie si disponible (une seule fois), pour chaque sens : définition officielle courte + définition simplifiée accessible à un enfant de 10 ans.
Réponds UNIQUEMENT en JSON valide sans markdown ni backticks.
Format : { forme_base: string, type: string, etymologie: string, sens: [{ label: string, officielle: string, simplifiee: string }] }`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json({ error: "No text response" }, { status: 500 });
    }

    const cleaned = textBlock.text.replace(/```json|```/g, "").trim();
    const result = JSON.parse(cleaned);

    // F) Save to cache
    await supabaseAdmin
      .from("definitions_cache")
      .insert({ word_key: key, raw, result });

    // G) Increment monthly call count
    await supabaseAdmin
      .from("api_usage")
      .upsert(
        { month, call_count: (usage?.call_count ?? 0) + 1 },
        { onConflict: "month" }
      );

    // H) Increment handled by WordPopup via /api/def-usage

    // I) Return result
    return NextResponse.json({ source: "api", result });
  } catch (error) {
    console.error("DEFINITION ROUTE ERROR:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
