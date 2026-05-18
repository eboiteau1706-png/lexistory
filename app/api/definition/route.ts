import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const word = searchParams.get("word");

  if (!word) return NextResponse.json({ error: "Mot manquant" }, { status: 400 });

  try {
    const res = await fetch(
      `https://fr.wiktionary.org/w/api.php?action=query&titles=${encodeURIComponent(word)}&prop=extracts&exintro=true&explaintext=true&format=json&origin=*`,
      { headers: { "Accept": "application/json" } }
    );

    const data = await res.json();
    const pages = data.query?.pages;
    if (!pages) return NextResponse.json({ found: false });

    const page = Object.values(pages)[0] as any;
    if (!page || page.missing !== undefined) {
      return NextResponse.json({ found: false });
    }

    // Extrait la première définition du texte
    const text = page.extract || "";
    const lines = text.split("\n").filter((l: string) => l.trim().length > 20);
    const defOrig = lines[0] || "";

    if (!defOrig) return NextResponse.json({ found: false });

    return NextResponse.json({ found: true, word, defOrig });

  } catch (err) {
    return NextResponse.json({ found: false });
  }
}