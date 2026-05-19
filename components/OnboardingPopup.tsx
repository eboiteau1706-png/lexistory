"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import styles from "./OnboardingPopup.module.css";

const STEPS = [
  {
    emoji: "📖",
    title: "Lis une histoire par jour",
    desc: "Chaque jour, une nouvelle histoire dans 3 niveaux : Curieux, Lecteur ou Érudit. Lis-la jusqu'au bout pour gagner des XP.",
  },
  {
    emoji: "💡",
    title: "Clique sur les mots",
    desc: "Chaque mot de l'histoire est cliquable. Clique dessus pour voir sa définition et son étymologie. Les mots vus passent en vert.",
  },
  {
    emoji: "🎮",
    title: "Joue aux mini-jeux",
    desc: "Chaque jour, 4 mini-jeux t'attendent : mot du jour, définition mystère, anagramme et citation. Jusqu'à +9 XP à gagner !",
  },
  {
    emoji: "🏆",
    title: "Monte de niveau",
    desc: "Gagne des XP en lisant et en jouant. Grimpe dans le classement et atteins le rang Légende en lisant chaque jour.",
  },
];

export default function OnboardingPopup() {
  const [show, setShow]     = useState(false);
  const [step, setStep]     = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser]     = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        const seen = localStorage.getItem("lx_onboarding_done");
        if (!seen) setShow(true);
      }
    });
  }, []);

  function handleNext() {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setShowLogin(true);
    }
  }

  function handleSkip() {
    localStorage.setItem("lx_onboarding_done", "1");
    setShow(false);
  }

  function handleLogin() {
    localStorage.setItem("lx_onboarding_done", "1");
    setShow(false);
    router.push("/login");
  }

  if (!show || user) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {!showLogin ? (
          <>
            {/* Indicateurs d'étapes */}
            <div className={styles.dots}>
              {STEPS.map((_, i) => (
                <div key={i} className={`${styles.dot} ${i === step ? styles.dotActive : ""}`} />
              ))}
            </div>

            <div className={styles.emoji}>{STEPS[step].emoji}</div>
            <h2 className={styles.title}>{STEPS[step].title}</h2>
            <p className={styles.desc}>{STEPS[step].desc}</p>

            <div className={styles.btns}>
              <button className={styles.btnSkip} onClick={handleSkip}>
                Ignorer
              </button>
              <button className={styles.btnNext} onClick={handleNext}>
                {step < STEPS.length - 1 ? "Suivant →" : "Commencer →"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.emoji}>✨</div>
            <h2 className={styles.title}>Crée ton compte</h2>
            <p className={styles.desc}>
              Connecte-toi pour sauvegarder ta progression, gagner des XP et rejoindre le classement.
            </p>
            <button className={styles.btnNext} onClick={handleLogin}>
              Se connecter / S'inscrire →
            </button>
            <button className={styles.btnSkip} onClick={handleSkip}>
              Continuer sans compte
            </button>
          </>
        )}
      </div>
    </div>
  );
}
