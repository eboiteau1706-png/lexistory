import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const word = searchParams.get("word");

  if (!word) return NextResponse.json({ error: "Mot manquant" }, { status: 400 });

  try {
    const res = await fetch(
      `https://fr.wiktionary.org/w/api.php?action=parse&page=${encodeURIComponent(word)}&prop=wikitext&format=json&origin=*`
    );

    const data = await res.json();
    const wikitext = data.parse?.wikitext?.["*"] || "";

    if (!wikitext) return NextResponse.json({ found: false });

    // Cherche les définitions dans le wikitext (format # définition)
    const lines = wikitext.split("\n");
    const defs: string[] = [];

    for (const line of lines) {
      if (line.startsWith("# ") && !line.startsWith("## ")) {
        const clean = line
          .replace(/^# /, "")
          .replace(/\[\[([^\]|]+)\|?[^\]]*\]\]/g, "$1")
          .replace(/\{\{[^}]*\}\}/g, "")
          .replace(/'{2,3}/g, "")
          .replace(/<[^>]*>/g, "")
          .trim();
        if (clean.length > 10) defs.push(clean);
        if (defs.length >= 2) break;
      }
    }

    if (defs.length === 0) return NextResponse.json({ found: false });

    return NextResponse.json({
      found: true,
      word,
      defOrig: defs[0],
    });

  } catch (err) {
    return NextResponse.json({ found: false });
  }
}