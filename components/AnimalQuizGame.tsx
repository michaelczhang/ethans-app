"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { QUIZ_MODES, type AnimalQuizQuestion } from "@/lib/quiz-data";
import { checkAnimalAnswer, getAnimalName } from "@/lib/animal-quiz";
import {
  ANIMAL_CLIP_SECONDS,
  getAnimalQuestions,
} from "@/lib/animal-quiz-data";
import {
  ANSWER_MODES,
  DIFFICULTIES,
  prepareQuestionsForDifficulty,
  type AnswerMode,
  type QuizDifficulty,
} from "@/lib/quiz-difficulty";

interface AnimalQuizGameProps {
  difficulty: QuizDifficulty;
  answerMode: AnswerMode;
  onBackToHome: () => void;
}

function buildQuestionSet(difficulty: QuizDifficulty): AnimalQuizQuestion[] {
  return prepareQuestionsForDifficulty(
    getAnimalQuestions(),
    difficulty,
    "guess-that-animal",
  ) as AnimalQuizQuestion[];
}

export default function AnimalQuizGame({
  difficulty,
  answerMode,
  onBackToHome,
}: AnimalQuizGameProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [questions, setQuestions] = useState<AnimalQuizQuestion[]>(() =>
    buildQuestionSet(difficulty),
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const modeInfo = QUIZ_MODES["guess-that-animal"];
  const difficultyInfo = DIFFICULTIES[difficulty];
  const answerModeInfo = ANSWER_MODES[answerMode];
  const correctAnswer = currentQuestion ? getAnimalName(currentQuestion) : "";

  const isCorrect = useMemo(() => {
    if (!hasSubmitted || !currentQuestion) return false;
    if (answerMode === "typed") {
      return checkAnimalAnswer(typedAnswer, currentQuestion, difficulty);
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
    setQuestions(buildQuestionSet(difficulty));
    setCurrentIndex(0);
    setScore(0);
    setSelectedIndex(null);
    setTypedAnswer("");
    setHasSubmitted(false);
    setIsFinished(false);
    setIsPlaying(false);
  }, [difficulty]);

  const playClip = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.currentTime >= ANIMAL_CLIP_SECONDS) {
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
      }
    };

    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.load();
    setIsPlaying(false);
  }, [currentQuestion?.id, currentQuestion?.audio]);

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
        ? checkAnimalAnswer(typedAnswer, currentQuestion, difficulty)
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
    if (ratio === 1) return "Perfect ears! You know every critter.";
    if (ratio >= 0.8) return "Excellent! The animal kingdom bows to you.";
    if (ratio >= 0.6) return "Solid effort — keep listening!";
    if (ratio >= 0.4) return "Not bad! Replay the sounds and try again.";
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
            No animal sounds are available yet.
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
            Listen closely and name the animal
          </p>
        </div>
      </header>

      {!isFinished ? (
        <>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="flex flex-wrap gap-2">
              <span className="quiz-badge">Score: {score}</span>
              <span className="quiz-badge">
                Sound {currentIndex + 1} / {totalQuestions}
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
              className="h-full rounded-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="quiz-card flex flex-1 flex-col rounded-2xl border border-white/20 p-6 shadow-lg sm:p-8">
            <div className="mb-6 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-5">
              <p className="text-sm font-medium text-emerald-800">
                {currentQuestion.question}
              </p>
              <audio
                ref={audioRef}
                src={currentQuestion.audio}
                preload="auto"
                className="hidden"
              />
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={playClip}
                  className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  {isPlaying ? "▶ Playing..." : "▶ Play Sound"}
                </button>
                <button
                  type="button"
                  onClick={playClip}
                  disabled={isPlaying}
                  className="rounded-xl border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50 disabled:opacity-60"
                >
                  Replay
                </button>
              </div>
            </div>

            {answerMode === "typed" ? (
              <div className="mt-2">
                <label
                  htmlFor="typed-animal-answer"
                  className="mb-2 block text-sm font-medium text-zinc-600"
                >
                  Type the animal name
                </label>
                <input
                  id="typed-animal-answer"
                  type="text"
                  value={typedAnswer}
                  disabled={hasSubmitted}
                  onChange={(event) => setTypedAnswer(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && canSubmit && !hasSubmitted) {
                      handleSubmit();
                    }
                  }}
                  placeholder="Enter the animal..."
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-base text-zinc-900 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-200 disabled:opacity-70"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            ) : (
              <ul className="mt-2 space-y-3">
                {currentQuestion.options.map((option, index) => {
                  let optionClass =
                    "border-zinc-200 bg-zinc-50 text-zinc-800 hover:border-emerald-300 hover:bg-emerald-50";

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
                      "border-emerald-400 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-300";
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
                  <span>Correct! That&apos;s a {correctAnswer}.</span>
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
                  className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 sm:text-base"
                >
                  Submit
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
                disabled={!hasSubmitted}
                className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 sm:text-base"
              >
                {currentIndex + 1 >= totalQuestions
                  ? "See Results"
                  : "Next Sound"}
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

          <div className="mt-6 rounded-2xl bg-emerald-50 px-8 py-5">
            <p className="text-4xl font-bold text-emerald-700">
              {score} / {totalQuestions}
            </p>
            <p className="mt-2 text-sm text-emerald-600">{scoreMessage}</p>
          </div>

          <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
            <button
              type="button"
              onClick={resetQuiz}
              className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 sm:text-base"
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
