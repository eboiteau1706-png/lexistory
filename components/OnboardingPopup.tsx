"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase";
import styles from "./OnboardingPopup.module.css";

const STEPS = [
  {
    emoji: "📖",
    title: "Une histoire par jour",
    desc: "Chaque jour, une nouvelle histoire renouvelée à minuit. Choisis ton niveau : Curieux (simple), Lecteur (intermédiaire) ou Érudit (avancé). Chaque histoire lue rapporte +3 XP !",
  },
  {
    emoji: "💡",
    title: "Clique sur les mots",
    desc: "Chaque mot de l'histoire est cliquable. Tape dessus pour voir sa définition, son étymologie et un exemple. Les mots que tu as vus passent en vert — tes mots appris s'accumulent dans ton profil.",
  },
  {
    emoji: "🎮",
    title: "4 mini-jeux quotidiens",
    desc: "Chaque jour, 4 jeux t'attendent : le Mot du jour, une Définition mystère, un Anagramme et une Citation à compléter. Gagne jusqu'à +9 XP par jour !",
  },
  {
    emoji: "👥",
    title: "Amis et classement",
    desc: "Ajoute tes amis par pseudo et retrouve-les dans le classement. Compare vos XP, vos séries de lecture et montez de niveau ensemble. Un classement global te montre où tu te situes parmi tous les joueurs.",
  },
  {
    emoji: "🏆",
    title: "10 niveaux à débloquer",
    desc: "Gagne des XP en lisant les histoires (+3 XP chacune) et en jouant aux mini-jeux (+3 XP par jeu). Maintiens ta série quotidienne pour des bonus XP ! Passe de Graine à Légende en 10 niveaux.",
  },
  {
    emoji: "✨",
    title: "LexiStory Premium",
    desc: "",
    isPremium: true,
    perks: [
      "📅 Accès à toutes les histoires passées",
      "⚡ Boost XP ×1,5 — +4 XP par histoire au lieu de 3",
      "📊 Stats avancées : rang, record, assiduité",
      "🎮 4 mini-jeux exclusifs supplémentaires par jour (+12 XP)",
    ],
  },
];

export default function OnboardingPopup() {
  const [show, setShow]           = useState(false);
  const [step, setStep]           = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser]           = useState<any>(null);
  const router   = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    if (pathname === "/login" || pathname === "/compte-confirme") return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) setShow(true);
    });
  }, [pathname]);

  function handleNext() {
    if (step < STEPS.length - 1) setStep(step + 1);
    else setShowLogin(true);
  }

  function handleLogin() {
    setShow(false);
    router.push("/login");
  }

  function handleContinueWithout() {
    setShow(false);
  }

  if (!show || user) return null;

  const current = STEPS[step];

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {!showLogin ? (
          <>
            <div className={styles.dots}>
              {STEPS.map((_, i) => (
                <div key={i} className={`${styles.dot} ${i === step ? styles.dotActive : i < step ? styles.dotDone : ""}`} />
              ))}
            </div>
            <div className={styles.emoji}>{current.emoji}</div>
            <h2 className={`${styles.title} ${current.isPremium ? styles.titlePremium : ""}`}>
              {current.title}
            </h2>
            {current.isPremium ? (
              <div className={styles.perks}>
                {current.perks!.map((p, i) => (
                  <div key={i} className={styles.perk}>{p}</div>
                ))}
                <div className={styles.premiumPrice}>1,99€ / mois — sans engagement</div>
              </div>
            ) : (
              <p className={styles.desc}>{current.desc}</p>
            )}
            <div className={styles.btns}>
              <button className={styles.btnNext} onClick={handleNext}>
                {step < STEPS.length - 1 ? "Suivant →" : "Commencer →"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.emoji}>🚀</div>
            <h2 className={styles.title}>Prêt à commencer ?</h2>
            <p className={styles.desc}>
              Crée un compte gratuit pour sauvegarder ta progression, gagner des XP et rejoindre le classement.
            </p>
            <div className={styles.btns}>
              <button className={styles.btnNext} onClick={handleLogin}>
                Se connecter / S&apos;inscrire →
              </button>
              <button className={styles.btnSkip} onClick={handleContinueWithout}>
                Continuer sans compte
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
