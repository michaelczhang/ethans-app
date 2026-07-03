"use client";

import { useCallback, useMemo, useState } from "react";
import {
  getQuestionsForMode,
  QUIZ_MODES,
  type QuizMode,
  type QuizQuestion,
} from "@/lib/quiz-data";
import {
  ANSWER_MODES,
  checkTypedAnswer,
  DIFFICULTIES,
  getCorrectAnswer,
  prepareQuestionsForDifficulty,
  type AnswerMode,
  type QuizDifficulty,
} from "@/lib/quiz-difficulty";

interface QuizGameProps {
  mode: QuizMode;
  difficulty: QuizDifficulty;
  answerMode: AnswerMode;
  onBackToHome: () => void;
}

function buildQuestionSet(
  mode: QuizMode,
  difficulty: QuizDifficulty,
): QuizQuestion[] {
  return prepareQuestionsForDifficulty(getQuestionsForMode(mode), difficulty, mode);
}

export default function QuizGame({
  mode,
  difficulty,
  answerMode,
  onBackToHome,
}: QuizGameProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
    buildQuestionSet(mode, difficulty),
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const modeInfo = QUIZ_MODES[mode];
  const difficultyInfo = DIFFICULTIES[difficulty];
  const answerModeInfo = ANSWER_MODES[answerMode];
  const correctAnswer = currentQuestion
    ? getCorrectAnswer(currentQuestion)
    : "";

  const isCorrect = useMemo(() => {
    if (!hasSubmitted || !currentQuestion) return false;
    if (answerMode === "typed") {
      return checkTypedAnswer(typedAnswer, currentQuestion, difficulty);
    }
    return selectedIndex === currentQuestion.correctIndex;
  }, [
    hasSubmitted,
    currentQuestion,
    answerMode,
    typedAnswer,
    difficulty,
    selectedIndex,
  ]);

  const progressPercent = useMemo(() => {
    if (isFinished) return 100;
    return Math.round((currentIndex / totalQuestions) * 100);
  }, [currentIndex, totalQuestions, isFinished]);

  const resetQuiz = useCallback(() => {
    setQuestions(buildQuestionSet(mode, difficulty));
    setCurrentIndex(0);
    setScore(0);
    setSelectedIndex(null);
    setTypedAnswer("");
    setHasSubmitted(false);
    setIsFinished(false);
  }, [mode, difficulty]);

  const handleSelectAnswer = (index: number) => {
    if (hasSubmitted || isFinished || answerMode === "typed") return;
    setSelectedIndex(index);
  };

  const handleSubmit = () => {
    if (hasSubmitted || isFinished || !currentQuestion) return;

    if (answerMode === "typed") {
      if (!typedAnswer.trim()) return;
    } else if (selectedIndex === null) {
      return;
    }

    setHasSubmitted(true);

    const correct =
      answerMode === "typed"
        ? checkTypedAnswer(typedAnswer, currentQuestion, difficulty)
        : selectedIndex === currentQuestion.correctIndex;

    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= totalQuestions) {
      setIsFinished(true);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setSelectedIndex(null);
    setTypedAnswer("");
    setHasSubmitted(false);
  };

  const scoreMessage = useMemo(() => {
    const ratio = score / totalQuestions;
    if (ratio === 1) return "Perfect run! Absolute champion.";
    if (ratio >= 0.8) return "Excellent! You really know your stuff.";
    if (ratio >= 0.6) return "Solid effort — keep practicing!";
    if (ratio >= 0.4) return "Not bad! Review and try again.";
    return "Tough round — play again to improve!";
  }, [score, totalQuestions]);

  const canSubmit =
    answerMode === "typed"
      ? typedAnswer.trim().length > 0
      : selectedIndex !== null;

  return (
    <div className="quiz-shell relative mx-auto flex min-h-full w-full max-w-2xl flex-col px-4 py-8 sm:px-6">
      <header className="mb-8 flex items-start justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={onBackToHome}
            className="mb-3 text-sm font-medium text-indigo-300 transition hover:text-white"
          >
            ← Back to Home
          </button>
          <h1 className="home-title text-2xl font-bold tracking-tight sm:text-3xl">
            {modeInfo.emoji} {modeInfo.label} Quiz
          </h1>
        </div>
      </header>

      {!isFinished ? (
        <>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="flex flex-wrap gap-2">
              <span className="quiz-badge">Score: {score}</span>
              <span className="quiz-badge">
                Question {currentIndex + 1} / {totalQuestions}
              </span>
              <span className="quiz-badge">
                {difficultyInfo.emoji} {difficultyInfo.label}
              </span>
              <span className="quiz-badge">
                {answerModeInfo.emoji} {answerModeInfo.label}
              </span>
            </div>
          </div>

          <div className="mb-6 h-2 overflow-hidden rounded-full bg-zinc-200">
            <div
              className="h-full rounded-full bg-indigo-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="quiz-card flex flex-1 flex-col rounded-2xl border border-white/20 p-6 shadow-lg sm:p-8">
            {currentQuestion.image && (
              <div className="mb-5 flex justify-center">
                <img
                  key={currentQuestion.id}
                  src={currentQuestion.image}
                  alt={currentQuestion.imageAlt ?? ""}
                  className="quiz-question-image h-40 w-auto rounded-lg border border-zinc-200 bg-white object-contain shadow-sm sm:h-48"
                />
              </div>
            )}
            <h2 className="text-lg font-semibold leading-snug text-zinc-900 sm:text-xl">
              {currentQuestion.question}
            </h2>

            {answerMode === "typed" ? (
              <div className="mt-6">
                <label
                  htmlFor="typed-answer"
                  className="mb-2 block text-sm font-medium text-zinc-600"
                >
                  Type your answer
                </label>
                <input
                  id="typed-answer"
                  type="text"
                  value={typedAnswer}
                  disabled={hasSubmitted}
                  onChange={(event) => setTypedAnswer(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && canSubmit && !hasSubmitted) {
                      handleSubmit();
                    }
                  }}
                  placeholder="Enter your answer..."
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-base text-zinc-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-200 disabled:opacity-70"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            ) : (
              <ul className="mt-6 space-y-3">
                {currentQuestion.options.map((option, index) => {
                  let optionClass =
                    "border-zinc-200 bg-zinc-50 text-zinc-800 hover:border-indigo-300 hover:bg-indigo-50";

                  if (hasSubmitted) {
                    if (index === currentQuestion.correctIndex) {
                      optionClass =
                        "border-emerald-400 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-300";
                    } else if (index === selectedIndex) {
                      optionClass =
                        "border-rose-400 bg-rose-50 text-rose-900 ring-1 ring-rose-300";
                    } else {
                      optionClass =
                        "border-zinc-200 bg-zinc-50 text-zinc-400 opacity-70";
                    }
                  } else if (index === selectedIndex) {
                    optionClass =
                      "border-indigo-400 bg-indigo-50 text-indigo-900 ring-1 ring-indigo-300";
                  }

                  return (
                    <li key={option}>
                      <button
                        type="button"
                        disabled={hasSubmitted}
                        onClick={() => handleSelectAnswer(index)}
                        className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition sm:text-base ${optionClass} disabled:cursor-default`}
                      >
                        <span className="mr-2 text-zinc-400">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        {option}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            {hasSubmitted && (
              <div
                className={`mt-6 rounded-xl border px-4 py-3 text-sm font-medium ${
                  isCorrect
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-rose-200 bg-rose-50 text-rose-800"
                }`}
              >
                {isCorrect ? (
                  <span>Correct! Nice one.</span>
                ) : (
                  <span>
                    Not quite — the answer is <strong>{correctAnswer}</strong>.
                  </span>
                )}
              </div>
            )}

            <div className="mt-auto space-y-3 pt-6">
              {!hasSubmitted && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 sm:text-base"
                >
                  Submit
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
                disabled={!hasSubmitted}
                className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 sm:text-base"
              >
                {currentIndex + 1 >= totalQuestions
                  ? "See Results"
                  : "Next Question"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="quiz-card flex flex-1 flex-col items-center justify-center rounded-2xl border border-white/20 p-8 text-center shadow-lg">
          <span className="text-5xl" aria-hidden="true">
            {modeInfo.emoji}
          </span>
          <h2 className="mt-4 text-2xl font-bold text-zinc-900">
            Quiz Complete!
          </h2>
          <p className="mt-2 text-zinc-500">{modeInfo.label}</p>

          <div className="mt-6 rounded-2xl bg-indigo-50 px-8 py-5">
            <p className="text-4xl font-bold text-indigo-700">
              {score} / {totalQuestions}
            </p>
            <p className="mt-2 text-sm text-indigo-600">{scoreMessage}</p>
          </div>

          <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
            <button
              type="button"
              onClick={resetQuiz}
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:text-base"
            >
              Play Again
            </button>
            <button
              type="button"
              onClick={onBackToHome}
              className="rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 sm:text-base"
            >
              Choose Another Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
