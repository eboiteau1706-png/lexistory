import { NextRequest, NextResponse } from "next/server";

async function fetchWikt(word: string) {
  const res = await fetch(
    `https://fr.wiktionary.org/w/api.php?action=parse&page=${encodeURIComponent(word)}&prop=wikitext&format=json&origin=*`
  );
  const data = await res.json();
  const wikitext = data.parse?.wikitext?.["*"] || "";
  if (!wikitext) return null;

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
      if (defs.length >= 1) break;
    }
  }

  return defs.length > 0 ? defs[0] : null;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const word = searchParams.get("word");
  if (!word) return NextResponse.json({ error: "Mot manquant" }, { status: 400 });

  try {
    // Essai 1 : mot exact en minuscules
    let defOrig = await fetchWikt(word.toLowerCase());

    // Essai 2 : retire le 's' final (pluriel → singulier)
    if (!defOrig && word.endsWith("s")) {
      defOrig = await fetchWikt(word.slice(0, -1).toLowerCase());
    }

    // Essai 3 : retire 'nt' final (conjugaison → infinitif approximatif)
    if (!defOrig && word.endsWith("nt")) {
      defOrig = await fetchWikt(word.slice(0, -2).toLowerCase());
    }

    if (!defOrig) return NextResponse.json({ found: false });

    return NextResponse.json({ found: true, word, defOrig });

  } catch (err) {
    return NextResponse.json({ found: false });
  }
}