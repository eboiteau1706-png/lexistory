import { NextRequest, NextResponse } from "next/server";

async function fetchWikt(word: string): Promise<string | null> {
  try {
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
          .replace(/\(.*?\)/g, "")
          .trim();
        if (clean.length > 8) return clean;
      }
    }
    return null;
  } catch { return null; }
}

function extractBaseWord(def: string): string | null {
  const patterns = [
    /^[Pp]luriel de [«"]?(\w+)[»"]?/,
    /^[Ff]éminin de [«"]?(\w+)[»"]?/,
    /^[Ff]éminin pluriel de [«"]?(\w+)[»"]?/,
    /^[Aa]ction de [«"]?(\w+)[»"]?/,
    /^[Pp]articipe (?:passé|présent) de [«"]?(\w+)[»"]?/,
    /^[A-Za-z]+ personne .+ de [«"]?(\w+)[»"]?/,
    /^[Ff]orme .+ du verbe [«"]?(\w+)[»"]?/,
    /^[Ii]nfinitif [«"]?(\w+)[»"]?/,
  ];
  for (const p of patterns) {
    const m = def.match(p);
    if (m) return m[1];
  }
  return null;
}

function getVariants(word: string): string[] {
  const w = word.toLowerCase();
  const variants = [w];

  // Retire les terminaisons de conjugaison courantes
  if (w.endsWith("ent"))   variants.push(w.slice(0, -3) + "er", w.slice(0, -3) + "re");
  if (w.endsWith("aient")) variants.push(w.slice(0, -5) + "er");
  if (w.endsWith("ons"))   variants.push(w.slice(0, -3) + "er");
  if (w.endsWith("ez"))    variants.push(w.slice(0, -2) + "er");
  if (w.endsWith("ait"))   variants.push(w.slice(0, -3) + "er", w.slice(0, -3) + "re");
  if (w.endsWith("ant"))   variants.push(w.slice(0, -3) + "er", w.slice(0, -3) + "re");
  if (w.endsWith("és"))    variants.push(w.slice(0, -2) + "er", w.slice(0, -1));
  if (w.endsWith("ées"))   variants.push(w.slice(0, -3) + "er");
  if (w.endsWith("ée"))    variants.push(w.slice(0, -2) + "er");
  if (w.endsWith("ué"))    variants.push(w.slice(0, -2) + "uer");
  if (w.endsWith("ié"))    variants.push(w.slice(0, -2) + "ier");

  // Pluriels
  if (w.endsWith("aux"))   variants.push(w.slice(0, -3) + "al");
  if (w.endsWith("eaux"))  variants.push(w.slice(0, -4) + "eau");
  if (w.endsWith("s"))     variants.push(w.slice(0, -1));
  if (w.endsWith("x"))     variants.push(w.slice(0, -1));

  // Féminins
  if (w.endsWith("ves"))   variants.push(w.slice(0, -3) + "f");
  if (w.endsWith("ve"))    variants.push(w.slice(0, -2) + "f");
  if (w.endsWith("nne"))   variants.push(w.slice(0, -2));
  if (w.endsWith("nnes"))  variants.push(w.slice(0, -3));

  return [...new Set(variants)];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const word = searchParams.get("word");
  if (!word) return NextResponse.json({ error: "Mot manquant" }, { status: 400 });

  try {
    const variants = getVariants(word);

    for (const variant of variants) {
      let def = await fetchWikt(variant);
      if (def) {
        const base = extractBaseWord(def);
        if (base) {
          const baseDef = await fetchWikt(base);
          if (baseDef) def = baseDef;
        }
        return NextResponse.json({ found: true, word, defOrig: def });
      }
    }

    return NextResponse.json({ found: false });
  } catch {
    return NextResponse.json({ found: false });
  }
}