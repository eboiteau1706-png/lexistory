"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import styles from "@/app/jeux/jeux.module.css";

interface QuizQuestion {
  type: "comprehension" | "vocabulaire";
  question: string;
  choices: string[];
  answer: string;
  explanation: string;
}

interface QuizCompletion {
  answers: string[];
  score: number;
  xpEarned: number;
}

const LEVELS = ["Curieux", "Lecteur", "Érudit"] as const;
const LEVEL_EMOJI: Record<string, string> = { Curieux: "🌱", Lecteur: "📖", Érudit: "🎓" };

function localKey(date: string, level: string) {
  return `lx_quiz_${level}_${date}`;
}

interface Props {
  userId: string | null | undefined;
  todayStr: string;
}

export default function DailyQuiz({ userId, todayStr }: Props) {
  const supabase = createClient();

  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [questions, setQuestions]         = useState<QuizQuestion[] | null>(null);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState<string | null>(null);
  const [currentQ, setCurrentQ]           = useState(0);
  const [answers, setAnswers]             = useState<(string | null)[]>(Array(6).fill(null));
  const [showExpl, setShowExpl]           = useState(false);
  const [completions, setCompletions]     = useState<Record<string, QuizCompletion>>({});
  const [xpGained, setXpGained]           = useState<number | null>(null);

  // Load existing completions on mount
  useEffect(() => {
    if (userId === undefined) return;

    if (userId) {
      supabase
        .from("quiz_completions")
        .select("level, answers, score, xp_earned")
        .eq("user_id", userId)
        .eq("quiz_date", todayStr)
        .then(({ data }) => {
          if (!data) return;
          const loaded: Record<string, QuizCompletion> = {};
          for (const row of data) {
            loaded[row.level] = { answers: row.answers, score: row.score, xpEarned: row.xp_earned };
          }
          setCompletions(loaded);
        });
    } else {
      const loaded: Record<string, QuizCompletion> = {};
      for (const level of LEVELS) {
        const saved = localStorage.getItem(localKey(todayStr, level));
        if (saved) { try { loaded[level] = JSON.parse(saved); } catch {} }
      }
      setCompletions(loaded);
    }
  }, [userId, todayStr]);

  async function addXp(amount: number) {
    if (!userId) return;
    const { data } = await supabase.from("profiles").select("xp").eq("id", userId).single();
    await supabase.from("profiles")
      .update({ xp: (data?.xp ?? 0) + amount, last_active_at: new Date().toISOString() })
      .eq("id", userId);
    setXpGained(amount);
    setTimeout(() => setXpGained(null), 3000);
    window.dispatchEvent(new CustomEvent("lexistory:story-read"));
  }

  async function handleSelectLevel(level: string) {
    setSelectedLevel(level);
    setCurrentQ(0);
    setAnswers(Array(6).fill(null));
    setShowExpl(false);
    setError(null);

    // If already completed today, just show the score
    if (completions[level]) return;

    setLoading(true);
    setQuestions(null);
    try {
      const res = await fetch(`/api/daily-quiz?date=${todayStr}&level=${encodeURIComponent(level)}`);
      if (!res.ok) throw new Error("Impossible de charger le quiz");
      const data = await res.json();
      if (!data.questions) throw new Error(data.error ?? "Réponse invalide");
      setQuestions(data.questions);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  async function handleAnswer(choice: string) {
    if (!questions || !selectedLevel) return;
    if (answers[currentQ] != null) return;

    const correct  = choice === questions[currentQ].answer;
    const xp       = correct ? 2 : 1;

    const newAnswers = [...answers];
    newAnswers[currentQ] = choice;
    setAnswers(newAnswers);
    setShowExpl(true);

    await addXp(xp);

    // On last question save completion immediately
    if (currentQ === questions.length - 1) {
      await saveCompletion(newAnswers as string[], questions);
    }
  }

  async function saveCompletion(finalAnswers: string[], qs: QuizQuestion[]) {
    if (!selectedLevel) return;
    const score    = finalAnswers.filter((a, i) => a === qs[i].answer).length;
    const xpEarned = finalAnswers.reduce((t, a, i) => t + (a === qs[i].answer ? 2 : 1), 0);
    const completion: QuizCompletion = { answers: finalAnswers, score, xpEarned };

    if (userId) {
      await supabase.from("quiz_completions").upsert(
        { user_id: userId, quiz_date: todayStr, level: selectedLevel, answers: finalAnswers, score, xp_earned: xpEarned },
        { onConflict: "user_id,quiz_date,level" }
      );
    } else {
      localStorage.setItem(localKey(todayStr, selectedLevel), JSON.stringify(completion));
    }
    setCompletions(prev => ({ ...prev, [selectedLevel!]: completion }));
  }

  function handleNext() {
    setCurrentQ(prev => prev + 1);
    setShowExpl(false);
  }

  const isCompleted = selectedLevel ? !!completions[selectedLevel] : false;
  const q = questions?.[currentQ];

  return (
    <div>
      {/* Level selector */}
      <div className={styles.quizLevels}>
        {LEVELS.map(level => {
          const done = !!completions[level];
          return (
            <button
              key={level}
              className={`${styles.levelBtn} ${selectedLevel === level ? styles.levelBtnActive : ""} ${done ? styles.levelBtnDone : ""}`}
              onClick={() => handleSelectLevel(level)}
            >
              {LEVEL_EMOJI[level]} {level}
              {done && <span className={styles.levelScore}>{completions[level].score}/6</span>}
            </button>
          );
        })}
      </div>

      {/* Empty state */}
      {!selectedLevel && (
        <div className={styles.quizPlaceholder}>
          <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🧠</div>
          <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Choisis un niveau pour commencer le quiz du jour</div>
          {!userId && <div className={styles.loginHint} style={{ marginTop: "8px" }}>Connecte-toi pour sauvegarder tes XP !</div>}
        </div>
      )}

      {/* Score view after completion */}
      {selectedLevel && isCompleted && (
        <div className={styles.quizScore}>
          <div className={styles.quizScoreLevel}>{LEVEL_EMOJI[selectedLevel]} Quiz {selectedLevel}</div>
          <div className={styles.quizScoreNum}>{completions[selectedLevel].score}<span style={{ fontSize: "1.2rem", color: "var(--text-dim)" }}>/6</span></div>
          <div className={styles.quizScoreXp}>+{completions[selectedLevel].xpEarned} XP gagnés aujourd'hui</div>
          <div className={styles.quizScoreDots}>
            {completions[selectedLevel].answers.map((a, i) => {
              const isOk = questions ? a === questions[i]?.answer : false;
              return <div key={i} className={`${styles.quizScoreDot} ${isOk ? styles.quizScoreDotOk : styles.quizScoreDotKo}`} />;
            })}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-dim)", marginTop: "4px" }}>Reviens demain pour un nouveau quiz !</div>
        </div>
      )}

      {/* Loading */}
      {selectedLevel && !isCompleted && loading && (
        <div className={styles.quizPlaceholder}>
          <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>⏳</div>
          <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Génération du quiz en cours…</div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", marginTop: "4px" }}>Le premier utilisateur génère le quiz pour tout le monde</div>
        </div>
      )}

      {/* Error */}
      {selectedLevel && !isCompleted && error && (
        <div className={styles.quizError}>
          <div style={{ marginBottom: "10px" }}>❌ {error}</div>
          <button className={styles.quizNextBtn} onClick={() => handleSelectLevel(selectedLevel)}>Réessayer</button>
        </div>
      )}

      {/* Question card */}
      {selectedLevel && !isCompleted && !loading && !error && questions && q && (
        <div className={styles.quizCard}>
          {/* Progress bar */}
          <div className={styles.quizProgressTrack}>
            <div className={styles.quizProgressFill} style={{ width: `${(currentQ / questions.length) * 100}%` }} />
          </div>

          <div className={styles.quizMeta}>
            <span className={`${styles.quizTypeBadge} ${q.type === "comprehension" ? styles.quizTypeComp : styles.quizTypeVocab}`}>
              {q.type === "comprehension" ? "📚 Compréhension" : "📝 Vocabulaire"}
            </span>
            <span className={styles.quizCounter}>{currentQ + 1}/6</span>
          </div>

          <div className={styles.quizQuestion}>{q.question}</div>

          <div className={styles.choices}>
            {q.choices.map(choice => {
              const answered  = answers[currentQ] != null;
              const isCorrect = choice === q.answer;
              const isChosen  = choice === answers[currentQ];
              return (
                <button
                  key={choice}
                  className={`${styles.choiceBtn} ${answered ? isCorrect ? styles.correct : isChosen ? styles.wrong : styles.disabled : ""}`}
                  onClick={() => handleAnswer(choice)}
                  disabled={answered}
                >
                  {choice}
                </button>
              );
            })}
          </div>

          {showExpl && answers[currentQ] != null && (
            <div className={styles.quizFeedback}>
              <div className={answers[currentQ] === q.answer ? styles.resultOk : styles.resultKo}>
                {answers[currentQ] === q.answer ? "✅ Bonne réponse ! +2 XP" : `❌ C'était : ${q.answer} · +1 XP`}
              </div>
              {q.explanation && (
                <div className={styles.quizExplanation}>{q.explanation}</div>
              )}
              {currentQ < questions.length - 1 && (
                <button className={styles.quizNextBtn} onClick={handleNext}>
                  Question suivante →
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {xpGained !== null && (
        <div className={styles.xpPopup}>+{xpGained} XP ✨</div>
      )}
    </div>
  );
}
