"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase";
import styles from "@/app/jeux/jeux.module.css";

interface QuizQuestion {
  type: "histoire" | "vocabulaire";
  question: string;
  choices: string[];
  correct_index: number;
  explanation: string;
}

interface QuizCompletion {
  score: number;
  xpEarned: number;
  answers?: string[];
}

const LEVELS        = ["Curieux", "Lecteur", "Érudit"] as const;
const LEVEL_EMOJI: Record<string, string> = { Curieux: "🌱", Lecteur: "📖", Érudit: "🎓" };
const AUTO_SKIP     = "__skip__";
const QUESTION_TIME = 30;

function localKey(date: string, level: string)    { return `lx_quiz_${level}_${date}`; }
function progressKey(date: string, level: string) { return `lx_quiz_prog_${level}_${date}`; }

interface Props {
  userId: string | null | undefined;
  todayStr: string;
  visible: boolean;
}

export default function DailyQuiz({ userId, todayStr, visible }: Props) {
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
  const [showReview, setShowReview]       = useState(false);
  const [timeLeft, setTimeLeft]           = useState(QUESTION_TIME);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // stateRef updated every render — lets effects/callbacks read current values without stale closures
  const stateRef = useRef({
    questions:     null as QuizQuestion[] | null,
    selectedLevel: null as string | null,
    isCompleted:   false,
    answers:       Array(6).fill(null) as (string | null)[],
    currentQ:      0,
    userId:        undefined as string | null | undefined,
    todayStr:      "",
  });
  stateRef.current = {
    questions,
    selectedLevel,
    isCompleted: selectedLevel ? !!completions[selectedLevel] : false,
    answers,
    currentQ,
    userId,
    todayStr,
  };

  // ── Load completions on mount ─────────────────────────────────────────────────
  useEffect(() => {
    if (userId === undefined) return;
    if (userId) {
      // Sync localStorage → DB une entrée à la fois (évite qu'un seul échec bloque tout)
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key?.startsWith("lx_quiz_") || key.startsWith("lx_quiz_prog_")) continue;
        const m = key.match(/^lx_quiz_(.+)_(\d{4}-\d{2}-\d{2})$/);
        if (!m) continue;
        const [, lvl, date] = m;
        if (!(LEVELS as readonly string[]).includes(lvl as typeof LEVELS[number])) continue;
        try {
          const parsed = JSON.parse(localStorage.getItem(key) ?? "");
          if (typeof parsed.score !== "number") continue;
          supabase.from("quiz_completions").upsert(
            { user_id: userId, quiz_date: date, level: lvl, score: parsed.score,
              xp_earned: typeof parsed.xpEarned === "number" ? parsed.xpEarned : 0,
              answers:   Array.isArray(parsed.answers) ? parsed.answers : [] },
            { onConflict: "user_id,quiz_date,level", ignoreDuplicates: true }
          );
        } catch {}
      }

      supabase
        .from("quiz_completions")
        .select("level, score, xp_earned")
        .eq("user_id", userId)
        .eq("quiz_date", todayStr)
        .then(({ data }) => {
          const loaded: Record<string, QuizCompletion> = {};
          // Always load localStorage first as fallback (handles DB failures gracefully)
          for (const lvl of LEVELS) {
            const saved = localStorage.getItem(localKey(todayStr, lvl));
            if (saved) { try { loaded[lvl] = JSON.parse(saved); } catch {} }
          }
          // DB data overrides localStorage score/xpEarned (authoritative source)
          if (data) {
            for (const row of data) {
              const savedAnswers = loaded[row.level]?.answers;
              loaded[row.level] = { score: row.score, xpEarned: row.xp_earned, answers: savedAnswers };
            }
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

  // ── Save progress on full page navigation (unmount) ───────────────────────────
  // Only localStorage — no setState allowed in cleanup
  useEffect(() => {
    return () => {
      const s = stateRef.current;
      if (!s.questions || !s.selectedLevel || s.isCompleted) return;
      if (s.answers[s.currentQ] !== null) return; // already answered

      const newAnswers = [...s.answers] as (string | null)[];
      newAnswers[s.currentQ] = AUTO_SKIP;
      const firstNull = newAnswers.findIndex(a => a === null);

      if (firstNull === -1) {
        const score    = (newAnswers as string[]).filter((a, i) => a !== AUTO_SKIP && a === s.questions![i].choices[s.questions![i].correct_index]).length;
        const xpEarned = (newAnswers as string[]).reduce((t, a, i) =>
          a !== AUTO_SKIP && a === s.questions![i].choices[s.questions![i].correct_index] ? t + 1 : t, 0);
        localStorage.setItem(localKey(s.todayStr, s.selectedLevel), JSON.stringify({ score, xpEarned, answers: newAnswers }));
        localStorage.removeItem(progressKey(s.todayStr, s.selectedLevel));
      } else {
        localStorage.setItem(progressKey(s.todayStr, s.selectedLevel), JSON.stringify({ answers: newAnswers }));
      }
    };
  }, []); // only on unmount

  // ── Timer: start/reset when question or visibility changes ────────────────────
  const isCompleted     = selectedLevel ? !!completions[selectedLevel] : false;
  const currentAnswered = answers[currentQ] !== null;

  useEffect(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (!selectedLevel || isCompleted || !questions || currentAnswered || loading || !visible) return;

    setTimeLeft(QUESTION_TIME);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } };
  }, [currentQ, selectedLevel, isCompleted, currentAnswered, loading, visible]);

  // ── Save progress (with active question) so restore can auto-skip it ─────────
  useEffect(() => {
    if (!selectedLevel || !questions || isCompleted) return;
    const firstNull = answers.findIndex(a => a === null);
    if (firstNull === -1) return;
    localStorage.setItem(progressKey(todayStr, selectedLevel), JSON.stringify({ answers, currentQ }));
  }, [currentQ, answers, selectedLevel, questions, isCompleted, todayStr]);

  // ── Timer expiry → show feedback with "Temps écoulé" ─────────────────────────
  useEffect(() => {
    if (timeLeft !== 0) return;
    const s = stateRef.current;
    if (!s.questions || !s.selectedLevel || s.isCompleted || s.answers[s.currentQ] !== null) return;

    const newAnswers = [...s.answers] as (string | null)[];
    newAnswers[s.currentQ] = AUTO_SKIP;
    setAnswers(newAnswers);
    setShowExpl(true);

    const firstNull = newAnswers.findIndex(a => a === null);
    if (firstNull === -1) {
      saveCompletionInline(newAnswers as string[], s.questions, s.selectedLevel, s.userId, s.todayStr);
    } else {
      localStorage.setItem(progressKey(s.todayStr, s.selectedLevel), JSON.stringify({ answers: newAnswers }));
      // User clicks "Question suivante →" to advance (not auto-advanced here)
    }
  }, [timeLeft]);

  // ── Tab switch → silent auto-skip + advance ───────────────────────────────────
  useEffect(() => {
    if (visible) return;
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }

    const s = stateRef.current;
    if (!s.questions || !s.selectedLevel || s.isCompleted || s.answers[s.currentQ] !== null) return;

    const newAnswers = [...s.answers] as (string | null)[];
    newAnswers[s.currentQ] = AUTO_SKIP;
    setAnswers(newAnswers);
    setShowExpl(false);

    const firstNull = newAnswers.findIndex(a => a === null);
    if (firstNull === -1) {
      saveCompletionInline(newAnswers as string[], s.questions, s.selectedLevel, s.userId, s.todayStr);
    } else {
      localStorage.setItem(progressKey(s.todayStr, s.selectedLevel), JSON.stringify({ answers: newAnswers }));
      setCurrentQ(firstNull);
    }
  }, [visible]);

  // ── Helpers ───────────────────────────────────────────────────────────────────
  function saveCompletionInline(
    finalAnswers: string[], qs: QuizQuestion[], level: string,
    uid: string | null | undefined, dateStr: string,
  ) {
    const score    = finalAnswers.filter((a, i) => a !== AUTO_SKIP && a === qs[i].choices[qs[i].correct_index]).length;
    const xpEarned = finalAnswers.reduce((t, a, i) =>
      a !== AUTO_SKIP && a === qs[i].choices[qs[i].correct_index] ? t + 1 : t, 0);
    const completion: QuizCompletion = { score, xpEarned, answers: finalAnswers };
    localStorage.setItem(localKey(dateStr, level), JSON.stringify(completion));
    localStorage.removeItem(progressKey(dateStr, level));
    if (uid) {
      supabase.from("quiz_completions").upsert(
        { user_id: uid, quiz_date: dateStr, level, score, xp_earned: xpEarned, answers: finalAnswers },
        { onConflict: "user_id,quiz_date,level" }
      );
    }
    setCompletions(prev => ({ ...prev, [level]: completion }));
  }

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

  // ── Select level ──────────────────────────────────────────────────────────────
  async function handleSelectLevel(level: string) {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }

    const alreadyDone = !!completions[level];
    setSelectedLevel(level);
    setCurrentQ(0);
    setAnswers(Array(6).fill(null));
    setShowExpl(false);
    setError(null);
    setShowReview(false);
    setTimeLeft(QUESTION_TIME);

    if (!alreadyDone) setLoading(true);
    setQuestions(null);
    try {
      const res = await fetch(`/api/daily-quiz?date=${todayStr}&level=${encodeURIComponent(level)}`);
      if (!res.ok) throw new Error("Impossible de charger le quiz");
      const data = await res.json();
      if (!data.questions) throw new Error(data.error ?? "Réponse invalide");
      setQuestions(data.questions);

      if (alreadyDone && completions[level]?.answers) {
        // Restore completed answers for review
        setAnswers([...completions[level].answers!]);
      } else if (!alreadyDone) {
        // Restore in-progress quiz if user navigated away mid-quiz
        const saved = localStorage.getItem(progressKey(todayStr, level));
        if (saved) {
          try {
            const prog = JSON.parse(saved);
            if (Array.isArray(prog.answers)) {
              const restoredAnswers = [...prog.answers] as (string | null)[];
              const savedCurrentQ: number | undefined = prog.currentQ;
              // Auto-skip the question that was active when the user left
              if (savedCurrentQ !== undefined && restoredAnswers[savedCurrentQ] === null) {
                restoredAnswers[savedCurrentQ] = AUTO_SKIP;
              }
              const firstNull = restoredAnswers.findIndex(a => a === null);
              if (firstNull !== -1) {
                setAnswers(restoredAnswers);
                setCurrentQ(firstNull);
              } else {
                // All answered/skipped after auto-skip — save as completion
                saveCompletionInline(restoredAnswers as string[], data.questions, level, userId, todayStr);
              }
            }
          } catch {}
        }
      }
    } catch (e) {
      if (!alreadyDone) setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  // ── Answer ────────────────────────────────────────────────────────────────────
  async function handleAnswer(choice: string) {
    if (!questions || !selectedLevel) return;
    if (answers[currentQ] != null) return;

    // Stop timer immediately
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }

    const correctChoice = questions[currentQ].choices[questions[currentQ].correct_index];
    const correct       = choice === correctChoice;

    const newAnswers = [...answers] as (string | null)[];
    newAnswers[currentQ] = choice;
    setAnswers(newAnswers);
    setShowExpl(true);

    if (correct) await addXp(1);

    const firstNull = newAnswers.findIndex(a => a === null);
    if (firstNull === -1) {
      saveCompletionInline(newAnswers as string[], questions, selectedLevel, userId, todayStr);
    } else {
      localStorage.setItem(progressKey(todayStr, selectedLevel), JSON.stringify({ answers: newAnswers }));
    }
  }

  function handleNext() {
    setCurrentQ(prev => prev + 1);
    setShowExpl(false);
    setTimeLeft(QUESTION_TIME);
  }

  const completion    = selectedLevel ? completions[selectedLevel] : null;
  const q             = questions?.[currentQ];
  const timerColor    = timeLeft > 15 ? "var(--green)" : timeLeft > 8 ? "#f97316" : "#ef4444";
  const timerPct      = (timeLeft / QUESTION_TIME) * 100;
  const circumference = 2 * Math.PI * 13;

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

      {/* Score view */}
      {selectedLevel && isCompleted && completion && !showReview && (
        <div className={styles.quizScore}>
          <div className={styles.quizScoreLevel}>{LEVEL_EMOJI[selectedLevel]} Quiz {selectedLevel}</div>
          <div className={styles.quizScoreNum}>
            {completion.score}<span style={{ fontSize: "1.2rem", color: "var(--text-dim)" }}>/6</span>
          </div>
          <div className={styles.quizScoreXp}>+{completion.xpEarned} XP gagnés aujourd'hui</div>
          {completion.answers && questions && (
            <div className={styles.quizScoreDots}>
              {completion.answers.map((a, i) => {
                const correct = !!questions[i] && a !== AUTO_SKIP && a === questions[i].choices[questions[i].correct_index];
                return <div key={i} className={`${styles.quizScoreDot} ${correct ? styles.quizScoreDotOk : styles.quizScoreDotKo}`} />;
              })}
            </div>
          )}
          {completion.answers && questions && (
            <button className={styles.quizReviewBtn} onClick={() => setShowReview(true)}>
              📋 Voir mes réponses
            </button>
          )}
          <div style={{ fontSize: "0.8rem", color: "var(--text-dim)", marginTop: "4px" }}>Reviens demain pour un nouveau quiz !</div>
        </div>
      )}

      {/* Review mode */}
      {selectedLevel && isCompleted && showReview && questions && completion?.answers && (
        <div className={styles.quizReview}>
          <div className={styles.quizReviewHeader}>
            <span>{LEVEL_EMOJI[selectedLevel]} Quiz {selectedLevel} — Correction</span>
            <button className={styles.quizReviewClose} onClick={() => setShowReview(false)}>← Score</button>
          </div>
          {questions.map((question, i) => {
            const userAnswer    = completion.answers![i];
            const correctChoice = question.choices[question.correct_index];
            const isCorrect     = userAnswer !== AUTO_SKIP && userAnswer === correctChoice;
            const wasSkipped    = userAnswer === AUTO_SKIP;
            return (
              <div key={i} className={`${styles.quizReviewItem} ${isCorrect ? styles.quizReviewOk : styles.quizReviewKo}`}>
                <div className={styles.quizReviewQ}>
                  <span className={`${styles.quizTypeBadge} ${question.type === "histoire" ? styles.quizTypeComp : styles.quizTypeVocab}`}>
                    {question.type === "histoire" ? "📖" : "📝"}
                  </span>
                  <span>{i + 1}. {question.question}</span>
                </div>
                <div className={styles.quizReviewAnswers}>
                  {wasSkipped ? (
                    <div className={styles.quizReviewSkipped}>⏱ Passé (tab quitté ou temps écoulé) · +0 XP</div>
                  ) : (
                    <div className={isCorrect ? styles.quizReviewRight : styles.quizReviewWrong}>
                      {isCorrect ? "✅" : "❌"} Ta réponse : <strong>{userAnswer}</strong>
                    </div>
                  )}
                  {!isCorrect && (
                    <div className={styles.quizReviewCorrect}>
                      ✓ Bonne réponse : <strong>{correctChoice}</strong>
                    </div>
                  )}
                </div>
                {question.explanation && (
                  <div className={styles.quizReviewExpl}>{question.explanation}</div>
                )}
              </div>
            );
          })}
          <button className={styles.quizNextBtn} style={{ alignSelf: "flex-start", marginTop: "4px" }} onClick={() => setShowReview(false)}>
            ← Retour au score
          </button>
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
          <div className={styles.quizProgressTrack}>
            <div className={styles.quizProgressFill} style={{ width: `${(currentQ / questions.length) * 100}%` }} />
          </div>

          <div className={styles.quizMeta}>
            <span className={`${styles.quizTypeBadge} ${q.type === "histoire" ? styles.quizTypeComp : styles.quizTypeVocab}`}>
              {q.type === "histoire" ? "📖 Histoire" : "📝 Vocabulaire"}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Countdown timer — only shown for unanswered questions */}
              {!currentAnswered && (
                <div className={styles.quizTimer}>
                  <svg viewBox="0 0 32 32" width="32" height="32" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
                    <circle cx="16" cy="16" r="13" fill="none" stroke="var(--border)" strokeWidth="2.5" />
                    <circle cx="16" cy="16" r="13" fill="none" stroke={timerColor} strokeWidth="2.5"
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference * (1 - timerPct / 100)}
                      style={{ transition: "stroke-dashoffset 0.85s linear, stroke 0.3s" }}
                    />
                  </svg>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: timerColor, lineHeight: 1, position: "relative" }}>
                    {timeLeft}
                  </span>
                </div>
              )}
              <span className={styles.quizCounter}>{currentQ + 1}/6</span>
            </div>
          </div>

          <div className={styles.quizQuestion}>{q.question}</div>

          <div className={styles.choices}>
            {q.choices.map((choice, idx) => {
              const answered  = answers[currentQ] != null;
              const isCorrect = idx === q.correct_index;
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
              <div className={answers[currentQ] === q.choices[q.correct_index] ? styles.resultOk : styles.resultKo}>
                {answers[currentQ] === AUTO_SKIP
                  ? `⏱ Temps écoulé · La réponse était : ${q.choices[q.correct_index]}`
                  : answers[currentQ] === q.choices[q.correct_index]
                    ? "✅ Bonne réponse ! +1 XP"
                    : `❌ C'était : ${q.choices[q.correct_index]}`}
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
