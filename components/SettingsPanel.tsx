"use client";

import { useDisplaySettings } from "@/components/DisplaySettingsProvider";
import {
  LANGUAGE_KEYS,
  LANGUAGES,
  type AppLanguage,
} from "@/lib/display-settings";
import {
  ANSWER_MODES,
  DIFFICULTIES,
  type AnswerMode,
  type QuizDifficulty,
} from "@/lib/quiz-difficulty";

interface SettingsPanelProps {
  difficulty: QuizDifficulty;
  answerMode: AnswerMode;
  onDifficultyChange: (difficulty: QuizDifficulty) => void;
  onAnswerModeChange: (mode: AnswerMode) => void;
  onClose: () => void;
}

function ToggleRow({
  label,
  description,
  enabled,
  onChange,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`w-full rounded-xl border px-4 py-3 text-left transition ${
        enabled
          ? "border-indigo-400 bg-indigo-50 ring-1 ring-indigo-300"
          : "border-zinc-200 bg-zinc-50 hover:border-indigo-200 hover:bg-indigo-50/50"
      }`}
    >
      <span className="flex items-center justify-between gap-3">
        <span className="font-semibold text-zinc-900">{label}</span>
        <span
          className={`relative h-6 w-11 shrink-0 rounded-full transition ${
            enabled ? "bg-indigo-600" : "bg-zinc-300"
          }`}
          aria-hidden="true"
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
              enabled ? "left-5" : "left-0.5"
            }`}
          />
        </span>
      </span>
      <span className="mt-1 block text-sm text-zinc-600">{description}</span>
    </button>
  );
}

export default function SettingsPanel({
  difficulty,
  answerMode,
  onDifficultyChange,
  onAnswerModeChange,
  onClose,
}: SettingsPanelProps) {
  const {
    settings,
    setDarkMode,
    setBlindMode,
    setLanguage,
    translate,
  } = useDisplaySettings();
  const difficultyOptions = Object.keys(DIFFICULTIES) as QuizDifficulty[];
  const answerModeOptions = Object.keys(ANSWER_MODES) as AnswerMode[];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 sm:justify-start sm:pl-6 sm:pt-24">
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-label={translate("closeSettings")}
        onClick={onClose}
      />
      <div
        className="settings-panel quiz-card relative max-h-[85vh] w-full max-w-sm overflow-y-auto rounded-2xl border border-white/20 p-6 shadow-xl"
        role="dialog"
        aria-labelledby="settings-title"
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 id="settings-title" className="text-lg font-bold text-zinc-900">
            {translate("settingsTitle")}
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
          {translate("display")}
        </p>
        <ul className="space-y-2">
          <li>
            <ToggleRow
              label={translate("darkMode")}
              description={translate("darkModeDesc")}
              enabled={settings.darkMode}
              onChange={setDarkMode}
            />
          </li>
          <li>
            <ToggleRow
              label={translate("blindMode")}
              description={translate("blindModeDesc")}
              enabled={settings.blindMode}
              onChange={setBlindMode}
            />
          </li>
        </ul>

        <p className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          {translate("translation")}
        </p>
        <p className="mb-3 text-sm text-zinc-600">{translate("translationDesc")}</p>
        <div className="flex flex-wrap gap-2">
          {LANGUAGE_KEYS.map((key) => {
            const info = LANGUAGES[key];
            const isSelected = settings.language === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setLanguage(key as AppLanguage)}
                className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                  isSelected
                    ? "border-indigo-500 bg-indigo-600 text-white shadow-md"
                    : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-indigo-300 hover:bg-indigo-50"
                }`}
              >
                <span className="mr-1.5" aria-hidden="true">
                  {info.emoji}
                </span>
                {info.nativeName}
              </button>
            );
          })}
        </div>

        <p className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          {translate("difficulty")}
        </p>
        <ul className="space-y-2">
          {difficultyOptions.map((key) => {
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

        <p className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          {translate("answerMode")}
        </p>
        <ul className="space-y-2">
          {answerModeOptions.map((key) => {
            const info = ANSWER_MODES[key];
            const isSelected = answerMode === key;

            return (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => onAnswerModeChange(key)}
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
