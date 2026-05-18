import { NextRequest, NextResponse } from "next/server";

async function fetchWikt(word: string): Promise<string | null> {
  const res = await fetch(
    `https://fr.wiktionary.org/w/api.php?action=parse&page=${encodeURIComponent(word)}&prop=wikitext&format=json&origin=*`
  );
  const data = await res.json();
  const wikitext = data.parse?.wikitext?.["*"] || "";
  if (!wikitext) return null;

  const lines = wikitext.split("\n");
  for (const line of lines) {
    if (line.startsWith("# ") && !line.startsWith("## ")) {
      const clean = line
        .replace(/^# /, "")
        .replace(/\[\[([^\]|]+)\|?[^\]]*\]\]/g, "$1")
        .replace(/\{\{[^}]*\}\}/g, "")
        .replace(/'{2,3}/g, "")
        .replace(/<[^>]*>/g, "")
        .trim();
      if (clean.length > 10) return clean;
    }
  }
  return null;
}

function extractRedirect(def: string): string | null {
  // "Pluriel de X" → retourne X
  const pluriel = def.match(/^[Pp]luriel de [«"]?(\w+)[»"]?/);
  if (pluriel) return pluriel[1];
  // "Féminin de X"
  const feminin = def.match(/^[Ff]éminin de [«"]?(\w+)[»"]?/);
  if (feminin) return feminin[1];
  // "Action de X"
  const action = def.match(/^[Aa]ction de [«"]?(\w+)[»"]?/);
  if (action) return action[1];
  // "Participe passé de X"
  const participe = def.match(/^[Pp]articipe (?:passé|présent) de [«"]?(\w+)[»"]?/);
  if (participe) return participe[1];
  // "Première/Deuxième/Troisième personne de X"
  const personne = def.match(/^[A-Za-z]+ personne .+ de [«"]?(\w+)[»"]?/);
  if (personne) return personne[1];
  return null;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const word = searchParams.get("word");
  if (!word) return NextResponse.json({ error: "Mot manquant" }, { status: 400 });

  try {
    // Essai 1 : mot exact
    let defOrig = await fetchWikt(word.toLowerCase());

    // Si c'est une redirection (pluriel, conjugaison...) → cherche le mot de base
    if (defOrig) {
      const redirect = extractRedirect(defOrig);
      if (redirect) {
        const baseDef = await fetchWikt(redirect.toLowerCase());
        if (baseDef) defOrig = baseDef;
      }
    }

    // Essai 2 : retire le 's' final (pluriel)
    if (!defOrig && word.endsWith("s")) {
      defOrig = await fetchWikt(word.slice(0, -1).toLowerCase());
    }

    // Essai 3 : retire 'ent' final (conjugaison)
    if (!defOrig && word.endsWith("ent")) {
      defOrig = await fetchWikt(word.slice(0, -3).toLowerCase());
    }

    if (!defOrig) return NextResponse.json({ found: false });

    return NextResponse.json({ found: true, word, defOrig });

  } catch (err) {
    return NextResponse.json({ found: false });
  }
}