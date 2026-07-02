"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  evaluateGuess,
  getPathLetters,
  countSharedLetters,
  MAX_TRIES,
  type WanderGuess,
  type LetterState,
} from "@/lib/game";
import { getDailyWord, getRandomWord, type WanderWord } from "@/lib/words";

type Status = "playing" | "won" | "lost";

const DARK_MODE_KEY = "eureka-dark-mode";

const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

function tileClass(state: LetterState, isPast: boolean): string {
  if (!isPast) return "ww-input-tile";
  switch (state) {
    case "correct":
      return "trail-tile-correct";
    case "present":
      return "trail-tile-present";
    case "absent":
      return "trail-tile-absent";
    default:
      return "ww-input-tile";
  }
}

export default function WanderWordsGame() {
  const [word, setWord] = useState<WanderWord | null>(null);
  const [guesses, setGuesses] = useState<WanderGuess[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("playing");
  const [shake, setShake] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [pendingGuess, setPendingGuess] = useState<WanderGuess | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const submitTimer = useRef<number | null>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  const len = word?.word.length ?? 5;

  useEffect(() => {
    const stored = localStorage.getItem(DARK_MODE_KEY);
    if (stored === "true") setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem(DARK_MODE_KEY, String(darkMode));
  }, [darkMode]);

  const startGame = useCallback((random = false) => {
    if (submitTimer.current) window.clearTimeout(submitTimer.current);
    setWord(random ? getRandomWord() : getDailyWord());
    setGuesses([]);
    setInput("");
    setStatus("playing");
    setMessage("");
    setSubmitting(false);
    setPendingGuess(null);
  }, []);

  useEffect(() => {
    startGame();
    return () => {
      if (submitTimer.current) window.clearTimeout(submitTimer.current);
    };
  }, [startGame]);

  const path = useMemo(
    () => (word ? getPathLetters(guesses, len) : []),
    [word, guesses, len],
  );

  const unlockedHints = guesses.filter((g) => !g.isWin).length;

  const submit = useCallback(() => {
    if (!word || status !== "playing" || submitting) return;

    if (input.length !== len) {
      setMessage(`Please enter ${len} letters`);
      setShake(true);
      setTimeout(() => setShake(false), 450);
      return;
    }

    const result = evaluateGuess(input, word.word);
    setPendingGuess(result);
    setSubmitting(true);
    setInput("");
    setMessage("");

    submitTimer.current = window.setTimeout(() => {
      setGuesses((prev) => [...prev, result]);
      setPendingGuess(null);
      setSubmitting(false);
      if (result.isWin) setStatus("won");
      else if (guesses.length + 1 >= MAX_TRIES) setStatus("lost");
    }, 700);
  }, [word, status, submitting, input, len, guesses.length]);

  const onKey = useCallback(
    (key: string) => {
      if (!word || status !== "playing" || submitting) return;
      if (key === "ENTER") return submit();
      if (key === "⌫") return setInput((v) => v.slice(0, -1));
      if (/^[A-Z]$/.test(key) && input.length < len) setInput((v) => v + key);
    },
    [word, status, submitting, input, len, submit],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowInstructions(false);
        setShowSettings(false);
        return;
      }
      if (showInstructions || showSettings) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const k = e.key.toUpperCase();
      if (k === "ENTER") onKey("ENTER");
      else if (k === "BACKSPACE") onKey("⌫");
      else if (/^[A-Z]$/.test(k)) onKey(k);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onKey, showInstructions, showSettings]);

  useEffect(() => {
    if (!showSettings) return;
    const handler = (e: MouseEvent) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(e.target as Node)
      ) {
        setShowSettings(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showSettings]);

  if (!word) return null;

  const displayGuesses = pendingGuess ? [...guesses, pendingGuess] : guesses;

  return (
    <div
      className="wander-bg relative min-h-full overflow-hidden px-4 py-10"
      data-theme={darkMode ? "dark" : "light"}
    >
      {/* How to play — top left */}
      <button
        type="button"
        onClick={() => setShowInstructions(true)}
        className="ww-corner-btn fixed left-4 top-4 z-40 rounded-full px-4 py-2 text-sm font-semibold backdrop-blur-sm transition-colors sm:left-6 sm:top-6"
        aria-label="How to play"
      >
        How to play
      </button>

      {/* Settings — top right */}
      <div ref={settingsRef} className="fixed right-4 top-4 z-40 sm:right-6 sm:top-6">
        <button
          type="button"
          onClick={() => setShowSettings((v) => !v)}
          className="ww-corner-btn flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-colors"
          aria-label="Settings"
          aria-expanded={showSettings}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>

        {showSettings && (
          <div className="settings-panel absolute right-0 mt-2 w-56 rounded-xl p-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest ww-muted">
              Settings
            </p>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium ww-heading">Dark mode</span>
              <button
                type="button"
                role="switch"
                aria-checked={darkMode}
                aria-label="Toggle dark mode"
                className="ww-toggle"
                onClick={() => setDarkMode((v) => !v)}
              >
                <span className="ww-toggle-knob" />
              </button>
            </div>
          </div>
        )}
      </div>

      {showInstructions && (
        <div
          className="ww-overlay fixed inset-0 z-50 flex items-start justify-start p-4 backdrop-blur-sm sm:p-6"
          onClick={() => setShowInstructions(false)}
        >
          <div
            className="ww-panel w-full max-w-sm overflow-y-auto rounded-2xl p-6 sm:max-h-[calc(100vh-3rem)]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="instructions-title"
            aria-modal="true"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <h2
                id="instructions-title"
                className="text-xl font-bold ww-heading"
              >
                How to play
              </h2>
              <button
                type="button"
                onClick={() => setShowInstructions(false)}
                className="rounded-full p-1.5 ww-muted transition-colors hover:opacity-70"
                aria-label="Close instructions"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5 text-sm leading-relaxed ww-muted">
              <section>
                <h3 className="mb-1.5 font-bold ww-heading">Goal</h3>
                <p>
                  Guess the secret five-letter word in six tries. Use the clue
                  and hints to help you find the answer!
                </p>
              </section>

              <section>
                <h3 className="mb-1.5 font-bold ww-heading">Your Path</h3>
                <p>
                  When a letter is in the right spot, it appears in{" "}
                  <span className="font-semibold text-emerald-500">
                    Your Path
                  </span>{" "}
                  at the top — even if the rest of your guess wasn&apos;t quite
                  right.
                </p>
              </section>

              <section>
                <h3 className="mb-1.5 font-bold ww-heading">Your Trail</h3>
                <p>
                  Every guess stays on the board so you can spot patterns across
                  your past words.
                </p>
              </section>

              <section>
                <h3 className="mb-1.5 font-bold ww-heading">
                  Letter colors
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="inline-block h-6 w-6 rounded-md bg-emerald-400" />
                    <span>
                      <strong className="text-emerald-500">Green</strong> —
                      right letter, right spot
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-block h-6 w-6 rounded-md bg-amber-300" />
                    <span>
                      <strong className="text-amber-500">Yellow</strong> — in
                      the word, wrong spot
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-block h-6 w-6 rounded-md bg-slate-300" />
                    <span>Gray — not in the word</span>
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="mb-1.5 font-bold ww-heading">Hints</h3>
                <p>
                  Each guess that isn&apos;t quite right unlocks another helpful
                  hint in the clue card.
                </p>
              </section>

              <section>
                <h3 className="mb-1.5 font-bold ww-heading">Controls</h3>
                <p>
                  Type on your keyboard or tap the on-screen keys. Press{" "}
                  <kbd className="ww-surface-muted rounded-md px-1.5 py-0.5 font-mono text-xs ww-heading">
                    Enter
                  </kbd>{" "}
                  to submit. A fresh word arrives every day!
                </p>
              </section>
            </div>
          </div>
        </div>
      )}

      <div className="relative mx-auto flex max-w-lg flex-col items-center">
        <header className="mb-8 text-center">
          <p className="ww-accent-label mb-1 text-sm font-semibold uppercase tracking-widest">
            a word game
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight ww-heading sm:text-5xl">
            Eureka!
          </h1>
          <p className="mt-3 max-w-sm text-base leading-relaxed ww-muted">
            Follow the clues, leave a trail of guesses, and shout Eureka when
            you find the secret word!
          </p>
        </header>

        <section className="mb-6 w-full">
          <p className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-emerald-500">
            Your Path
          </p>
          <div className="flex justify-center gap-2">
            {path.map((letter, i) => (
              <div
                key={i}
                className={`path-slot flex h-14 w-12 items-center justify-center rounded-xl text-2xl font-bold sm:h-16 sm:w-14 sm:text-3xl ${
                  letter ? "path-slot-filled" : ""
                }`}
              >
                {letter ?? "?"}
              </div>
            ))}
          </div>
        </section>

        <section className="clue-card mb-6 w-full rounded-2xl px-6 py-5">
          <p className="text-lg leading-relaxed ww-heading sm:text-xl">
            {word.clue}
          </p>
          <p className="ww-category-badge mt-3 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide">
            {word.category}
          </p>
          {unlockedHints > 0 && (
            <div
              className="mt-5 space-y-2.5 border-t pt-5"
              style={{ borderColor: "var(--ww-border)" }}
            >
              <p className="ww-accent-label text-xs font-bold uppercase tracking-wide">
                More hints
              </p>
              {word.hints.slice(0, unlockedHints).map((hint, i) => (
                <p
                  key={i}
                  className="hint-line text-base leading-relaxed ww-muted"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {hint}
                </p>
              ))}
            </div>
          )}
        </section>

        <section className="mb-4 w-full">
          <p className="mb-3 text-center text-xs font-bold uppercase tracking-widest ww-muted">
            Your Trail — {displayGuesses.length} / {MAX_TRIES}
          </p>
          <div
            className={`flex flex-col items-center gap-2 ${shake ? "animate-shake" : ""}`}
          >
            {displayGuesses.map((guess, gi) => {
              const shared = countSharedLetters(guess.word, word.word);
              return (
                <div
                  key={gi}
                  className="trail-row flex items-center gap-3 rounded-xl px-3 py-1.5"
                >
                  <div className="flex gap-1.5">
                    {guess.word.split("").map((ch, ci) => (
                      <span
                        key={ci}
                        className={`flex h-11 w-10 items-center justify-center rounded-lg text-lg font-bold sm:h-12 sm:w-11 sm:text-xl ${tileClass(guess.letters[ci], true)}`}
                      >
                        {ch}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-medium ww-muted">
                    {shared} match{shared !== 1 ? "es" : ""}
                  </span>
                </div>
              );
            })}

            {status === "playing" && !submitting && (
              <div className="mt-1 flex gap-1.5">
                {Array.from({ length: len }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex h-14 w-12 items-center justify-center rounded-xl text-xl font-bold sm:h-16 sm:w-14 sm:text-2xl ${
                      input[i] ? "ww-input-tile ww-input-tile-filled" : "ww-input-tile"
                    }`}
                  >
                    {input[i] ?? ""}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {message && (
          <p className="mb-3 text-sm font-semibold text-amber-500">{message}</p>
        )}

        {status !== "playing" && (
          <div className="ww-result-won mb-6 w-full rounded-2xl px-6 py-5 text-center">
            {status === "won" ? (
              <p className="text-xl font-bold text-emerald-600">
                You found it! The word was{" "}
                <span className="ww-heading">{word.word}</span> 🎉
              </p>
            ) : (
              <p className="text-xl font-bold ww-muted">
                Nice try! The word was{" "}
                <span className="ww-accent-label">{word.word}</span>
              </p>
            )}
            <button
              type="button"
              onClick={() => startGame(true)}
              className="mt-4 rounded-full bg-sky-500 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-sky-600"
            >
              Play again
            </button>
          </div>
        )}

        <div className="flex w-full max-w-md flex-col gap-1.5">
          {KEYS.map((row, ri) => (
            <div key={ri} className="flex justify-center gap-1">
              {row.map((key) => (
                <button
                  key={key}
                  type="button"
                  disabled={status !== "playing" || submitting}
                  onClick={() => onKey(key === "⌫" ? "⌫" : key)}
                  className={`ww-key flex h-12 items-center justify-center rounded-lg font-bold shadow-sm transition-colors disabled:opacity-30 ${
                    key === "ENTER" || key === "⌫"
                      ? "px-2.5 text-xs"
                      : "w-9 text-sm sm:w-10"
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs font-semibold ww-muted">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-4 w-4 rounded-md bg-emerald-400" />
            Right spot
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-4 w-4 rounded-md bg-amber-300" />
            Wrong spot
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-4 w-4 rounded-md bg-slate-300" />
            Not in word
          </span>
        </div>
      </div>
    </div>
  );
}
