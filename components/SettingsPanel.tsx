"use client";

import {
  DIFFICULTIES,
  type QuizDifficulty,
} from "@/lib/quiz-difficulty";

interface SettingsPanelProps {
  difficulty: QuizDifficulty;
  onDifficultyChange: (difficulty: QuizDifficulty) => void;
  onClose: () => void;
}

export default function SettingsPanel({
  difficulty,
  onDifficultyChange,
  onClose,
}: SettingsPanelProps) {
  const options = Object.keys(DIFFICULTIES) as QuizDifficulty[];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 sm:justify-start sm:pl-6 sm:pt-24">
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-label="Close settings"
        onClick={onClose}
      />
      <div
        className="quiz-card relative w-full max-w-sm rounded-2xl border border-white/20 p-6 shadow-xl"
        role="dialog"
        aria-labelledby="settings-title"
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 id="settings-title" className="text-lg font-bold text-zinc-900">
            Settings
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-sm font-medium text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800"
          >
            ✕
          </button>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Difficulty
        </p>
        <ul className="space-y-2">
          {options.map((key) => {
            const info = DIFFICULTIES[key];
            const isSelected = difficulty === key;

            return (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => onDifficultyChange(key)}
                  className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                    isSelected
                      ? "border-indigo-400 bg-indigo-50 ring-1 ring-indigo-300"
                      : "border-zinc-200 bg-zinc-50 hover:border-indigo-200 hover:bg-indigo-50/50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span aria-hidden="true">{info.emoji}</span>
                    <span className="font-semibold text-zinc-900">{info.label}</span>
                  </span>
                  <span className="mt-1 block text-sm text-zinc-600">
                    {info.description}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
