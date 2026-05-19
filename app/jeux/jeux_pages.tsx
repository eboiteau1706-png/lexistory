"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import styles from "./jeux.module.css";

// Mots du dictionnaire local disponibles pour les jeux
const GAME_WORDS = [
  { word: "amygdale", def: "Petite partie du cerveau en forme d'amande qui gère nos émotions, surtout la peur.", etym: "Du grec amygdalê, amande" },
  { word: "empathie", def: "Se mettre à la place des autres et ressentir ce qu'ils ressentent.", etym: "Du grec empatheia, passion" },
  { word: "biais", def: "Une erreur que notre cerveau fait sans s'en rendre compte.", etym: "Du vieux français biais, de travers" },
  { word: "lucidité", def: "Voir les choses clairement, sans se mentir. Savoir regarder la vérité en face.", etym: "Du latin luciditas, clarté" },
  { word: "dopamine", def: "Une substance que ton cerveau fabrique quand tu fais quelque chose de plaisant.", etym: "De dopa (acide aminé) + amine" },
  { word: "chlorophylle", def: "La substance verte dans les feuilles qui capte la lumière du soleil pour nourrir la plante.", etym: "Du grec chloros (vert) + phyllon (feuille)" },
  { word: "atmosphère", def: "L'enveloppe d'air qui entoure la Terre. L'air qu'on respire en très grande quantité.", etym: "Du grec atmos (vapeur) + sphaira (sphère)" },
  { word: "introspection", def: "Se regarder à l'intérieur de soi pour comprendre ce qu'on ressent vraiment.", etym: "Du latin introspicere, regarder à l'intérieur" },
  { word: "stoïcisme", def: "Une philosophie qui apprend à rester calme et fort face aux difficultés de la vie.", etym: "Du grec Stoa, portique où enseignait Zénon" },
  { word: "équanimité", def: "Rester calme et serein quoi qu'il arrive.", etym: "Du latin aequanimitas, égalité d'âme" },
  { word: "métaphore", def: "Quand on décrit quelque chose en utilisant les mots d'une autre chose.", etym: "Du grec metaphora, transport" },
  { word: "gravitation", def: "La force qui attire tous les objets vers le bas et qui fait tourner les planètes autour du soleil.", etym: "Du latin gravitas, pesanteur" },
  { word: "neurotransmetteur", def: "Un messager chimique dans le cerveau qui permet aux neurones de communiquer entre eux.", etym: "Du grec neuron + latin transmittere" },
  { word: "microbiome", def: "Toutes les bactéries et microbes qui vivent dans ton corps, surtout dans l'intestin.", etym: "Du grec mikros (petit) + bios (vie)" },
  { word: "séduction", def: "Le fait de plaire à quelqu'un et de l'attirer vers soi.", etym: "Du latin seducere, emmener à part" },
  { word: "consolidation", def: "Rendre quelque chose solide et durable. La consolidation d'un souvenir = le fixer pour qu'il reste longtemps.", etym: "Du latin consolidare, rendre solide" },
  { word: "paradoxal", def: "Qui semble contradictoire. Le sommeil paradoxal est paradoxal car le cerveau est très actif alors qu'on dort.", etym: "Du grec paradoxos, contraire à l'opinion" },
  { word: "effervescence", def: "Beaucoup d'agitation et d'enthousiasme. Un lieu plein d'effervescence = où ça bouge.", etym: "Du latin effervescere, bouillonner" },
  { word: "humanisme", def: "Une façon de penser qui met l'être humain au centre de tout.", etym: "Du latin humanus, humain" },
  { word: "causalité", def: "Le fait qu'une chose en cause une autre. La pluie est la cause de la flaque.", etym: "Du latin causalitas, rapport de cause à effet" },
  { word: "flamant", def: "Un grand oiseau avec de longues pattes roses qui vit dans les marais.", etym: "Du latin flamant, couleur de flamme" },
  { word: "pigments", def: "Des substances colorantes qui donnent leur couleur aux plantes et animaux.", etym: "Du latin pigmentum, couleur" },
  { word: "diffusion", def: "Quand quelque chose se répand partout. Comme une odeur qui se diffuse dans la pièce.", etym: "Du latin diffusio, épandage" },
  { word: "abyssales", def: "Des profondeurs immenses de l'océan, les endroits les plus profonds de la mer.", etym: "Du grec abyssos, sans fond" },
  { word: "eudaimonia", def: "Un bonheur profond qui vient d'une vie bien vécue, pas juste du plaisir immédiat.", etym: "Du grec eu (bien) + daimon (génie)" },
];

// Citations tirées des histoires
const CITATIONS = [
  { text: "Il est des souvenirs que le temps semble incapable d'effacer : le jour d'un accident, une déclaration d'amour inattendue, l'annonce d'un ***.", answer: "deuil", choices: ["deuil", "voyage", "rêve", "oubli"] },
  { text: "La lumière du soleil semble blanche, mais en réalité elle contient toutes les couleurs de l'***.", answer: "arc-en-ciel", choices: ["arc-en-ciel", "horizon", "atmosphère", "prisme"] },
  { text: "Un flamant mal nourri perdra progressivement sa couleur rose pour retrouver un plumage *** et blanchâtre.", answer: "terne", choices: ["terne", "brillant", "sombre", "doré"] },
  { text: "Le sage stoïcien concentre toute son énergie sur ce qui dépend de lui et accepte le reste avec ***.", answer: "équanimité", choices: ["équanimité", "tristesse", "colère", "résignation"] },
  { text: "Notre cerveau ne dispose pas d'une horloge centrale unique, mais d'une multitude de systèmes *** distribués.", answer: "temporels", choices: ["temporels", "nerveux", "visuels", "sensoriels"] },
  { text: "Le chocolat sucré connut alors un succès *** dans les cours royales européennes.", answer: "foudroyant", choices: ["foudroyant", "modeste", "discret", "progressif"] },
  { text: "Dormir sept à neuf heures par nuit n'est donc pas un luxe mais une *** biologique.", answer: "nécessité", choices: ["nécessité", "habitude", "tradition", "recommandation"] },
  { text: "En 1917, Marcel Duchamp déposa un *** retourné comme œuvre d'art.", answer: "urinoir", choices: ["urinoir", "tableau", "miroir", "vase"] },
];

function getDayIndex(arr: any[]) {
  const ref = new Date("2026-05-17");
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" }));
  const diff = Math.floor((now.getTime() - ref.getTime()) / 86400000);
  return diff % arr.length;
}

function shuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getAnagramme(word: string, seed: number): string {
  const letters = word.split("");
  const shuffled = shuffle(letters, seed);
  if (shuffled.join("") === word) {
    const tmp = shuffled[0];
    shuffled[0] = shuffled[shuffled.length - 1];
    shuffled[shuffled.length - 1] = tmp;
  }
  return shuffled.join("");
}

export default function JeuxPage() {
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState(false);

  // États des jeux
  const [defAnswer, setDefAnswer]     = useState<string | null>(null);
  const [anagAnswer, setAnagAnswer]   = useState("");
  const [anagResult, setAnagResult]   = useState<boolean | null>(null);
  const [citAnswer, setCitAnswer]     = useState<string | null>(null);
  const [xpGained, setXpGained]       = useState<number | null>(null);

  const dayIdx = getDayIndex(GAME_WORDS);
  const wordOfDay = GAME_WORDS[dayIdx];
  const defWord = GAME_WORDS[(dayIdx + 1) % GAME_WORDS.length];
  const anagWord = GAME_WORDS[(dayIdx + 2) % GAME_WORDS.length];
  const citation = CITATIONS[getDayIndex(CITATIONS)];

  const anagramme = getAnagramme(anagWord.word, dayIdx * 31337);

  // Mauvaises réponses pour définition mystère
  const wrongChoices = GAME_WORDS
    .filter(w => w.word !== defWord.word)
    .slice(0, 3)
    .map(w => w.word);
  const defChoices = shuffle([defWord.word, ...wrongChoices], dayIdx * 99991);

  // Clés localStorage
  const todayKey = new Date().toISOString().slice(0, 10);
  const defKey   = `lx_def_${todayKey}`;
  const anagKey  = `lx_anag_${todayKey}`;
  const citKey   = `lx_cit_${todayKey}`;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserId(session.user.id);
        supabase.from("profiles").select("is_premium").eq("id", session.user.id).single()
          .then(({ data }) => { if (data?.is_premium) setIsPremium(true); });
      }
    });
    // Charge états sauvegardés
    const savedDef  = localStorage.getItem(defKey);
    const savedAnag = localStorage.getItem(anagKey);
    const savedCit  = localStorage.getItem(citKey);
    if (savedDef)  setDefAnswer(savedDef);
    if (savedAnag) { setAnagResult(savedAnag === "true"); setAnagAnswer(anagWord.word); }
    if (savedCit)  setCitAnswer(savedCit);
  }, []);

  async function addXp(amount: number) {
    if (!userId) return;
    const bonus = isPremium ? Math.round(amount * 1.5) : amount;
    const { data } = await supabase.from("profiles").select("xp").eq("id", userId).single();
    await supabase.from("profiles").update({ xp: (data?.xp ?? 0) + bonus }).eq("id", userId);
    setXpGained(bonus);
    setTimeout(() => setXpGained(null), 3000);
    window.dispatchEvent(new CustomEvent("lexistory:story-read"));
  }

  function handleDefAnswer(choice: string) {
    if (defAnswer) return;
    setDefAnswer(choice);
    localStorage.setItem(defKey, choice);
    if (choice === defWord.word) addXp(3);
  }

  function handleAnagSubmit() {
    if (anagResult !== null) return;
    const correct = anagAnswer.toLowerCase().trim() === anagWord.word.toLowerCase();
    setAnagResult(correct);
    localStorage.setItem(anagKey, correct.toString());
    if (correct) addXp(3);
  }

  function handleCitAnswer(choice: string) {
    if (citAnswer) return;
    setCitAnswer(choice);
    localStorage.setItem(citKey, choice);
    if (choice === citation.answer) addXp(3);
  }

  const citParts = citation.text.split("***");

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>🎮 Jeux du jour</h1>
        <p className={styles.subtitle}>4 mini-jeux renouvelés chaque jour à minuit</p>
      </div>

      <div className={styles.grid}>

        {/* MOT DU JOUR */}
        <div className={`${styles.card} ${styles.cardWide}`}>
          <div className={styles.cardTag}>📖 Mot du jour</div>
          <div className={styles.motDuJour}>
            <div className={styles.mot}>{wordOfDay.word}</div>
            <div className={styles.motEtym}>{wordOfDay.etym}</div>
            <div className={styles.motDef}>{wordOfDay.def}</div>
          </div>
        </div>

        {/* DÉFINITION MYSTÈRE */}
        <div className={styles.card}>
          <div className={styles.cardTag}>🔍 Définition mystère</div>
          <p className={styles.cardDesc}>Quel mot correspond à cette définition ?</p>
          <div className={styles.defBox}>{defWord.def}</div>
          <div className={styles.choices}>
            {defChoices.map(choice => (
              <button
                key={choice}
                className={`${styles.choiceBtn} ${
                  defAnswer
                    ? choice === defWord.word
                      ? styles.correct
                      : choice === defAnswer
                      ? styles.wrong
                      : styles.disabled
                    : ""
                }`}
                onClick={() => handleDefAnswer(choice)}
                disabled={!!defAnswer}
              >
                {choice}
              </button>
            ))}
          </div>
          {defAnswer && (
            <div className={defAnswer === defWord.word ? styles.resultOk : styles.resultKo}>
              {defAnswer === defWord.word ? "✅ Bravo ! +3 XP" : `❌ C'était : ${defWord.word}`}
            </div>
          )}
          {!userId && <div className={styles.loginHint}>Connecte-toi pour gagner des XP !</div>}
        </div>

        {/* ANAGRAMME */}
        <div className={styles.card}>
          <div className={styles.cardTag}>🔤 Anagramme</div>
          <p className={styles.cardDesc}>Retrouve le mot mélangé :</p>
          <div className={styles.anagramme}>
            {anagramme.split("").map((l, i) => (
              <span key={i} className={styles.letter}>{l}</span>
            ))}
          </div>
          <div className={styles.anagHint}>{anagWord.def}</div>
          {anagResult === null ? (
            <div className={styles.anagInput}>
              <input
                className={styles.input}
                value={anagAnswer}
                onChange={e => setAnagAnswer(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleAnagSubmit()}
                placeholder="Ta réponse..."
                maxLength={30}
              />
              <button className={styles.submitBtn} onClick={handleAnagSubmit}>→</button>
            </div>
          ) : (
            <div className={anagResult ? styles.resultOk : styles.resultKo}>
              {anagResult ? "✅ Bravo ! +3 XP" : `❌ C'était : ${anagWord.word}`}
            </div>
          )}
          {!userId && <div className={styles.loginHint}>Connecte-toi pour gagner des XP !</div>}
        </div>

        {/* CITATION DU JOUR */}
        <div className={`${styles.card} ${styles.cardWide}`}>
          <div className={styles.cardTag}>💬 Citation du jour</div>
          <p className={styles.cardDesc}>Quel mot manque dans cette citation ?</p>
          <div className={styles.citText}>
            {citParts[0]}
            <span className={citAnswer
              ? citAnswer === citation.answer
                ? styles.citBlankCorrect
                : styles.citBlankWrong
              : styles.citBlank}>
              {citAnswer ? citation.answer : "_ _ _ _ _"}
            </span>
            {citParts[1]}
          </div>
          <div className={styles.choices}>
            {citation.choices.map(choice => (
              <button
                key={choice}
                className={`${styles.choiceBtn} ${
                  citAnswer
                    ? choice === citation.answer
                      ? styles.correct
                      : choice === citAnswer
                      ? styles.wrong
                      : styles.disabled
                    : ""
                }`}
                onClick={() => handleCitAnswer(choice)}
                disabled={!!citAnswer}
              >
                {choice}
              </button>
            ))}
          </div>
          {citAnswer && (
            <div className={citAnswer === citation.answer ? styles.resultOk : styles.resultKo}>
              {citAnswer === citation.answer ? "✅ Bravo ! +3 XP" : `❌ C'était : ${citation.answer}`}
            </div>
          )}
          {!userId && <div className={styles.loginHint}>Connecte-toi pour gagner des XP !</div>}
        </div>

      </div>

      {xpGained !== null && (
        <div className={styles.xpPopup}>+{xpGained} XP ✨{isPremium ? " (x1.5 Premium)" : ""}</div>
      )}
    </div>
  );
}
