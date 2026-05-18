import { NextRequest, NextResponse } from "next/server";

async function fetchWikt(word: string): Promise<string | null> {
  try {
    const url = `https://fr.wiktionary.org/w/api.php?action=query&titles=${encodeURIComponent(word)}&prop=revisions&rvprop=content&format=json&formatversion=2`;
    const res = await fetch(url, {
      headers: { "User-Agent": "LexiStory/1.0 (contact: e.boiteau1706@gmail.com)" },
      next: { revalidate: 3600 }
    });
    if (!res.ok) return null;
    const data = await res.json();
    const page = data.query?.pages?.[0];
    if (!page || page.missing) return null;

    const content = page.revisions?.[0]?.content || "";
    const lines = content.split("\n");

    for (const line of lines) {
      if (line.startsWith("# ") && !line.startsWith("## ")) {
        const clean = line
          .replace(/^# /, "")
          .replace(/\[\[([^\]|]+)\|?[^\]]*\]\]/g, "$1")
          .replace(/\{\{[^}]*\}\}/g, "")
          .replace(/'{2,3}/g, "")
          .replace(/<[^>]*>/g, "")
          .trim();
        if (clean.length > 8) {
          if (clean.toLowerCase().includes("chiffre romain")) continue;
          if (clean.toLowerCase().includes("lettre") && clean.length < 50) continue;
          if (clean.toLowerCase().includes("alphabet")) continue;
          return clean;
        }
      }
    }
    return null;
  } catch { return null; }
}

function extractBaseWord(def: string): string | null {
  const patterns = [
    /pluriel de [«"']?(\w+)[»"']?/i,
    /f[ée]minin(?:\s+pluriel)? de [«"']?(\w+)[»"']?/i,
    /action de [«"']?(\w+)[»"']?/i,
    /participe (?:pass[ée]|pr[ée]sent) de [«"']?(\w+)[»"']?/i,
    /personne .+ de [«"']?(\w+)[»"']?/i,
    /forme .+ (?:du verbe|de) [«"']?(\w+)[»"']?/i,
    /du verbe [«"']?(\w+)[»"']?/i,
  ];
  for (const p of patterns) {
    const m = def.match(p);
    if (m?.[1]) return m[1];
  }
  return null;
}

function getVariants(word: string): string[] {
  const w = word.toLowerCase();
  const variants = [w];

  if (w.endsWith("eulent")) variants.push(w.slice(0, -6) + "oir");
  if (w.endsWith("ulent"))  variants.push(w.slice(0, -5) + "oir");
  if (w.endsWith("ient"))   variants.push(w.slice(0, -4) + "ir", w.slice(0, -4) + "enir");
  if (w.endsWith("vent"))   variants.push(w.slice(0, -4) + "ir");
  if (w.endsWith("ont"))    variants.push(w.slice(0, -3) + "ir", w.slice(0, -3) + "re");
  if (w.endsWith("aient")) variants.push(w.slice(0, -5) + "er", w.slice(0, -5) + "re");
  if (w.endsWith("ons"))   variants.push(w.slice(0, -3) + "er");
  if (w.endsWith("ez"))    variants.push(w.slice(0, -2) + "er");
  if (w.endsWith("ait"))   variants.push(w.slice(0, -3) + "er", w.slice(0, -3) + "re");
  if (w.endsWith("ant"))   variants.push(w.slice(0, -3) + "er", w.slice(0, -3) + "re");
  if (w.endsWith("ent"))   variants.push(w.slice(0, -3) + "er", w.slice(0, -3) + "re");
  if (w.endsWith("és"))    variants.push(w.slice(0, -2) + "er", w.slice(0, -1));
  if (w.endsWith("ées"))   variants.push(w.slice(0, -3) + "er");
  if (w.endsWith("ée"))    variants.push(w.slice(0, -2) + "er");
  if (w.endsWith("ué"))    variants.push(w.slice(0, -2) + "uer");
  if (w.endsWith("ié"))    variants.push(w.slice(0, -2) + "ier");
  if (w.endsWith("aux"))   variants.push(w.slice(0, -3) + "al");
  if (w.endsWith("eaux"))  variants.push(w.slice(0, -4) + "eau");
  if (w.endsWith("s") && w.length > 3) variants.push(w.slice(0, -1));
  if (w.endsWith("x") && w.length > 3) variants.push(w.slice(0, -1));
  if (w.endsWith("ves"))   variants.push(w.slice(0, -3) + "f");
  if (w.endsWith("ve"))    variants.push(w.slice(0, -2) + "f");
  if (w.endsWith("nne"))   variants.push(w.slice(0, -2));
  if (w.endsWith("nnes"))  variants.push(w.slice(0, -3));

  return [...new Set(variants)].filter(v => v.length > 2);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const word = searchParams.get("word");
  if (!word) return NextResponse.json({ error: "Mot manquant" }, { status: 400 });

  try {
    const variants = getVariants(word);

    for (const variant of variants) {
      let def = await fetchWikt(variant);
      if (!def) continue;

      for (let i = 0; i < 3; i++) {
        const base = extractBaseWord(def);
        if (!base) break;
        const baseDef = await fetchWikt(base);
        if (baseDef) def = baseDef;
        else break;
      }

      if (extractBaseWord(def)) continue;

      return NextResponse.json({ found: true, word, defOrig: def });
    }

    return NextResponse.json({ found: false });
  } catch {
    return NextResponse.json({ found: false });
  }
}