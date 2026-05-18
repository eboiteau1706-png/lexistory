import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const word = searchParams.get("word");

  if (!word) return NextResponse.json({ error: "Mot manquant" }, { status: 400 });

  try {
    // Appel au Wiktionnaire français
    const res = await fetch(
      `https://fr.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(word.toLowerCase())}`,
      { headers: { "Accept": "application/json" } }
    );

    if (!res.ok) {
      return NextResponse.json({ found: false }, { status: 200 });
    }

    const data = await res.json();

    // Extrait la première définition française
    const frSection = data.fr;
    if (!frSection || frSection.length === 0) {
      return NextResponse.json({ found: false }, { status: 200 });
    }

    // Cherche la première définition avec du texte
    let defOrig = "";
    let partOfSpeech = "";

    for (const section of frSection) {
      partOfSpeech = section.partOfSpeech || "";
      if (section.definitions && section.definitions.length > 0) {
        const firstDef = section.definitions[0];
        // Nettoie le HTML de la définition
        defOrig = firstDef.definition
          .replace(/<[^>]*>/g, "")
          .replace(/\s+/g, " ")
          .trim();
        if (defOrig.length > 10) break;
      }
    }

    if (!defOrig) {
      return NextResponse.json({ found: false }, { status: 200 });
    }

    return NextResponse.json({
      found: true,
      word,
      defOrig,
      partOfSpeech,
      etym: "", // Wiktionnaire ne donne pas toujours l'étymologie facilement
      defSimple: "", // Pas de version simplifiée disponible
    });

  } catch (err) {
    return NextResponse.json({ found: false }, { status: 200 });
  }
}