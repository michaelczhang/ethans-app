"use client";

import {
  QUIZ_MODES,
  getQuestionCount,
  type QuizMode,
} from "@/lib/quiz-data";

const MODE_IMAGES: Record<QuizMode, string> = {
  starcraft: "/backgrounds/starcraft-bg.png",
  pokemon: "/backgrounds/pokemon-bg.png",
  minecraft: "/backgrounds/minecraft-bg.png",
  fortnite: "/backgrounds/fortnite-bg.png",
};

interface QuizHomeProps {
  onSelectMode: (mode: QuizMode) => void;
}

export default function QuizHome({ onSelectMode }: QuizHomeProps) {
  const modes = Object.keys(QUIZ_MODES) as QuizMode[];

  return (
    <div className="quiz-shell mx-auto flex min-h-full w-full max-w-3xl flex-col px-4 py-10 sm:px-6">
      <header className="mb-10 text-center">
        <p className="home-label text-sm font-semibold uppercase tracking-widest">
          Quiz Arena
        </p>
        <h1 className="home-title mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Pick a Quiz
        </h1>
        <p className="home-subtitle mx-auto mt-3 max-w-lg text-base">
          Choose a topic below, answer 25 questions, and see how high you can
          score.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {modes.map((key) => {
          const info = QUIZ_MODES[key];
          const count = getQuestionCount(key);

          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectMode(key)}
              className="home-quiz-card group overflow-hidden rounded-2xl border border-white/20 text-left shadow-lg transition hover:border-indigo-300/60 hover:shadow-xl"
            >
              <div
                className="h-28 bg-cover bg-center transition group-hover:scale-105"
                style={{ backgroundImage: `url(${MODE_IMAGES[key]})` }}
              />
              <div className="p-5">
                <span className="text-3xl" aria-hidden="true">
                  {info.emoji}
                </span>
                <h2 className="mt-3 text-xl font-bold text-zinc-900 group-hover:text-indigo-700">
                  {info.label}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">
                  {info.description}
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-indigo-600">
                  {count} questions →
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
