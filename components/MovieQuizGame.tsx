"use client";

import { useCallback, useMemo, useState } from "react";
import { QUIZ_MODES, type MovieQuizQuestion } from "@/lib/quiz-data";
import { MOVIE_BROADCASTER_FILTERS } from "@/lib/movie-broadcaster";
import type { MovieBroadcasterFilter } from "@/lib/movie-broadcaster";
import { checkMovieAnswer, getMovieTitle } from "@/lib/movie-quiz";
import { getMovieQuestionsForFilters } from "@/lib/movie-quiz-data";
import {
  ANSWER_MODES,
  DIFFICULTIES,
  getCorrectAnswer,
  prepareQuestionsForDifficulty,
  type AnswerMode,
  type QuizDifficulty,
} from "@/lib/quiz-difficulty";

interface MovieQuizGameProps {
  difficulty: QuizDifficulty;
  answerMode: AnswerMode;
  broadcaster: MovieBroadcasterFilter;
  onBackToHome: () => void;
}

function buildQuestionSet(
  difficulty: QuizDifficulty,
  broadcaster: MovieBroadcasterFilter,
): MovieQuizQuestion[] {
  return prepareQuestionsForDifficulty(
    getMovieQuestionsForFilters({ broadcaster }),
    difficulty,
    "guess-that-movie",
  ) as MovieQuizQuestion[];
}

export default function MovieQuizGame({
  difficulty,
  answerMode,
  broadcaster,
  onBackToHome,
}: MovieQuizGameProps) {
  const [questions, setQuestions] = useState<MovieQuizQuestion[]>(() =>
    buildQuestionSet(difficulty, broadcaster),
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const modeInfo = QUIZ_MODES["guess-that-movie"];
  const broadcasterInfo = MOVIE_BROADCASTER_FILTERS[broadcaster];
  const difficultyInfo = DIFFICULTIES[difficulty];
  const answerModeInfo = ANSWER_MODES[answerMode];
  const correctAnswer = currentQuestion
    ? getMovieTitle(currentQuestion)
    : "";

  const isCorrect = useMemo(() => {
    if (!hasSubmitted || !currentQuestion) return false;
    if (answerMode === "typed") {
      return checkMovieAnswer(typedAnswer, currentQuestion, difficulty);
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
    setQuestions(buildQuestionSet(difficulty, broadcaster));
    setCurrentIndex(0);
    setScore(0);
    setSelectedIndex(null);
    setTypedAnswer("");
    setHasSubmitted(false);
    setIsFinished(false);
  }, [difficulty, broadcaster]);

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
        ? checkMovieAnswer(typedAnswer, currentQuestion, difficulty)
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
    if (ratio === 1) return "Perfect run! Hollywood legend.";
    if (ratio >= 0.8) return "Excellent! You really know your movies.";
    if (ratio >= 0.6) return "Solid effort — keep watching!";
    if (ratio >= 0.4) return "Not bad! Pop some popcorn and try again.";
    return "Tough round — give it another go!";
  }, [score, totalQuestions]);

  const canSubmit =
    answerMode === "typed"
      ? typedAnswer.trim().length > 0
      : selectedIndex !== null;

  if (totalQuestions === 0) {
    return (
      <div className="quiz-shell relative mx-auto flex min-h-full w-full max-w-2xl flex-col px-4 py-8 sm:px-6">
        <button
          type="button"
          onClick={onBackToHome}
          className="mb-6 text-sm font-medium text-indigo-300 transition hover:text-white"
        >
          ← Back to Home
        </button>
        <div className="quiz-card rounded-2xl border border-white/20 p-8 text-center shadow-lg">
          <p className="text-lg font-semibold text-zinc-900">
            No PG movies found for {broadcasterInfo.label}.
          </p>
          <p className="mt-2 text-sm text-zinc-600">
            Try a different studio or pick All Studios.
          </p>
        </div>
      </div>
    );
  }

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
            {modeInfo.emoji} {modeInfo.label}
          </h1>
          <p className="mt-1 text-sm text-indigo-200">
            {broadcasterInfo.emoji} {broadcasterInfo.label} · PG only
          </p>
        </div>
      </header>

      {!isFinished ? (
        <>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="flex flex-wrap gap-2">
              <span className="quiz-badge">Score: {score}</span>
              <span className="quiz-badge">
                Scene {currentIndex + 1} / {totalQuestions}
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
              className="h-full rounded-full bg-rose-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="quiz-card flex flex-1 flex-col rounded-2xl border border-white/20 p-6 shadow-lg sm:p-8">
            {currentQuestion.image && (
              <div className="mb-5 flex justify-center">
                <img
                  key={currentQuestion.id}
                  src={currentQuestion.image}
                  alt={currentQuestion.imageAlt ?? "Movie scene"}
                  referrerPolicy="no-referrer"
                  className="movie-scene-image max-h-64 w-full rounded-xl border border-zinc-200 bg-zinc-900 object-cover shadow-md sm:max-h-80"
                />
              </div>
            )}
            <h2 className="text-center text-lg font-semibold leading-snug text-zinc-900 sm:text-xl">
              {currentQuestion.question}
            </h2>

            {answerMode === "typed" ? (
              <div className="mt-6">
                <label
                  htmlFor="typed-movie-answer"
                  className="mb-2 block text-sm font-medium text-zinc-600"
                >
                  Type the movie title
                </label>
                <input
                  id="typed-movie-answer"
                  type="text"
                  value={typedAnswer}
                  disabled={hasSubmitted}
                  onChange={(event) => setTypedAnswer(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && canSubmit && !hasSubmitted) {
                      handleSubmit();
                    }
                  }}
                  placeholder="Enter the movie name..."
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-base text-zinc-900 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-200 disabled:opacity-70"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            ) : (
              <ul className="mt-6 space-y-3">
                {currentQuestion.options.map((option, index) => {
                  let optionClass =
                    "border-zinc-200 bg-zinc-50 text-zinc-800 hover:border-rose-300 hover:bg-rose-50";

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
                      "border-rose-400 bg-rose-50 text-rose-900 ring-1 ring-rose-300";
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
                  <span>Correct! That&apos;s {correctAnswer}.</span>
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
                  className="w-full rounded-xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 sm:text-base"
                >
                  Submit
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
                disabled={!hasSubmitted}
                className="w-full rounded-xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 sm:text-base"
              >
                {currentIndex + 1 >= totalQuestions
                  ? "See Results"
                  : "Next Scene"}
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

          <div className="mt-6 rounded-2xl bg-rose-50 px-8 py-5">
            <p className="text-4xl font-bold text-rose-700">
              {score} / {totalQuestions}
            </p>
            <p className="mt-2 text-sm text-rose-600">{scoreMessage}</p>
          </div>

          <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
            <button
              type="button"
              onClick={resetQuiz}
              className="rounded-xl bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 sm:text-base"
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
