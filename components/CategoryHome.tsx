"use client";

import { useState } from "react";
import { useDisplaySettings } from "@/components/DisplaySettingsProvider";
import SettingsPanel from "@/components/SettingsPanel";
import VisitCounter from "@/components/VisitCounter";
import {
  CATEGORIES,
  getQuizCountForCategory,
  type QuizCategory,
} from "@/lib/quiz-data";
import {
  ANSWER_MODES,
  DIFFICULTIES,
  type AnswerMode,
  type QuizDifficulty,
} from "@/lib/quiz-difficulty";

interface CategoryHomeProps {
  difficulty: QuizDifficulty;
  answerMode: AnswerMode;
  onDifficultyChange: (difficulty: QuizDifficulty) => void;
  onAnswerModeChange: (mode: AnswerMode) => void;
  onSelectCategory: (id: QuizCategory) => void;
}

export default function CategoryHome({
  difficulty,
  answerMode,
  onDifficultyChange,
  onAnswerModeChange,
  onSelectCategory,
}: CategoryHomeProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { translate } = useDisplaySettings();
  const categoryIds = Object.keys(CATEGORIES) as QuizCategory[];
  const difficultyInfo = DIFFICULTIES[difficulty];
  const answerModeInfo = ANSWER_MODES[answerMode];

  return (
    <div className="quiz-shell relative mx-auto flex min-h-full w-full max-w-3xl flex-col px-4 py-10 sm:px-6">
      <VisitCounter className="visit-counter pointer-events-none absolute top-4 left-3/4 z-10 -translate-x-1/2 sm:top-6" />

      <button
        type="button"
        onClick={() => setSettingsOpen(true)}
        className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-xl border border-white/25 bg-white/90 px-3 py-2 text-sm font-semibold text-zinc-800 shadow-lg backdrop-blur transition hover:border-indigo-300 hover:bg-white sm:left-6 sm:top-6"
      >
        <span aria-hidden="true">⚙️</span>
        {translate("settings")}
      </button>

      {settingsOpen && (
        <SettingsPanel
          difficulty={difficulty}
          answerMode={answerMode}
          onDifficultyChange={onDifficultyChange}
          onAnswerModeChange={onAnswerModeChange}
          onClose={() => setSettingsOpen(false)}
        />
      )}

      <header className="mb-10 pt-12 text-center sm:pt-14">
        <h1 className="home-title text-4xl font-extrabold tracking-tight sm:text-5xl">
          Quizzy
        </h1>
        <p className="home-label mt-3 text-sm font-semibold uppercase tracking-widest">
          {translate("pickCategory")}
        </p>
        <p className="home-subtitle mt-2 text-sm font-medium tracking-wide">
          {translate("byEcz")}
        </p>
        <p className="home-subtitle mx-auto mt-3 max-w-lg text-base">
          {translate("chooseGroup")}
        </p>
        <p className="mt-3 text-sm text-indigo-200">
          {translate("difficultyLabel")}: {difficultyInfo.emoji} {difficultyInfo.label} ·{" "}
          {translate("modeLabel")}: {answerModeInfo.emoji} {answerModeInfo.label}
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {categoryIds.map((id) => {
          const cat = CATEGORIES[id];
          const count = getQuizCountForCategory(id);
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelectCategory(id)}
              className="home-quiz-card group overflow-hidden rounded-2xl border border-white/20 text-left shadow-lg transition hover:border-indigo-300/60 hover:shadow-xl"
            >
              <div
                className="h-28 bg-cover bg-center transition group-hover:scale-105"
                style={{ backgroundImage: `url(${cat.image})` }}
              />
              <div className="p-5">
                <span className="text-3xl" aria-hidden="true">
                  {cat.emoji}
                </span>
                <h2 className="mt-3 text-xl font-bold text-zinc-900 group-hover:text-indigo-700">
                  {cat.label}
                </h2>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-indigo-600">
                  {count} {count === 1 ? translate("quiz") : translate("quizzes")} →
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
