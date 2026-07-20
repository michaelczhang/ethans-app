"use client";

import {
  CATEGORIES,
  QUIZ_MODES,
  getModesForCategory,
  getQuestionCount,
  type QuizCategory,
  type QuizMode,
} from "@/lib/quiz-data";
import {
  INSTRUMENTS,
  INSTRUMENT_KEYS,
  type MusicInstrument,
} from "@/lib/music-instrument";
import {
  MUSIC_GENRE_FILTER_KEYS,
  MUSIC_GENRE_FILTERS,
  type MusicGenreFilter,
} from "@/lib/music-genre";
import {
  MUSIC_ARTIST_FILTERS,
  getAvailableArtistIds,
  type MusicArtistFilter,
} from "@/lib/music-artist";
import { getMusicTrackCount } from "@/lib/music-quiz-data";
import {
  getAvailableBroadcasterIds,
  MOVIE_BROADCASTER_FILTER_KEYS,
  MOVIE_BROADCASTER_FILTERS,
  type MovieBroadcasterFilter,
} from "@/lib/movie-broadcaster";
import { getMovieCount } from "@/lib/movie-quiz-data";
import {
  MATH_GRADE_KEYS,
  MATH_GRADES,
  type MathGrade,
} from "@/lib/math-grade";
import { ANSWER_MODES, DIFFICULTIES, type AnswerMode, type QuizDifficulty } from "@/lib/quiz-difficulty";

const MODE_IMAGES: Record<QuizMode, string> = {
  starcraft: "/backgrounds/starcraft-bg.png",
  pokemon: "/backgrounds/pokemon-bg.png",
  minecraft: "/backgrounds/minecraft-bg.png",
  fortnite: "/backgrounds/fortnite-bg.png",
  "states-capitals": "/backgrounds/states-bg.png",
  countries: "/backgrounds/countries-bg.png",
  "sea-animals": "/backgrounds/sea-animals-bg.png",
  "guess-that-animal": "/backgrounds/animals-bg.svg",
  "name-that-tune": "/backgrounds/music-bg.svg",
  "perfect-pitch": "/backgrounds/music-bg.svg",
  "guess-that-movie": "/backgrounds/movies-bg.png",
  multiplication: "/backgrounds/math-bg.svg",
};

interface QuizHomeProps {
  category: QuizCategory;
  difficulty: QuizDifficulty;
  answerMode: AnswerMode;
  instrument: MusicInstrument;
  genre: MusicGenreFilter;
  artist: MusicArtistFilter;
  broadcaster: MovieBroadcasterFilter;
  mathGrade: MathGrade;
  onInstrumentChange: (instrument: MusicInstrument) => void;
  onGenreChange: (genre: MusicGenreFilter) => void;
  onArtistChange: (artist: MusicArtistFilter) => void;
  onBroadcasterChange: (broadcaster: MovieBroadcasterFilter) => void;
  onMathGradeChange: (grade: MathGrade) => void;
  onSelectMode: (mode: QuizMode) => void;
  onBack: () => void;
}

export default function QuizHome({
  category,
  difficulty,
  answerMode,
  instrument,
  genre,
  artist,
  broadcaster,
  mathGrade,
  onInstrumentChange,
  onGenreChange,
  onArtistChange,
  onBroadcasterChange,
  onMathGradeChange,
  onSelectMode,
  onBack,
}: QuizHomeProps) {
  const modes = getModesForCategory(category);
  const categoryInfo = CATEGORIES[category];
  const difficultyInfo = DIFFICULTIES[difficulty];
  const answerModeInfo = ANSWER_MODES[answerMode];
  const availableArtists = getAvailableArtistIds((artistId) =>
    getMusicTrackCount({ genre, artist: artistId }),
  );
  const nameThatTuneCount = getMusicTrackCount({ genre, artist });
  const guessMovieCount = getMovieCount({ broadcaster });
  const availableBroadcasters = getAvailableBroadcasterIds((id) =>
    getMovieCount({ broadcaster: id }),
  );

  return (
    <div className="quiz-shell mx-auto flex min-h-full w-full max-w-3xl flex-col px-4 py-10 sm:px-6">
      <header className="mb-10 text-center">
        <button
          type="button"
          onClick={onBack}
          className="mb-4 text-sm font-medium text-indigo-300 transition hover:text-white"
        >
          ← Back to Categories
        </button>
        <p className="home-label text-sm font-semibold uppercase tracking-widest">
          {categoryInfo.label}
        </p>
        <h1 className="home-title mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Pick a Quiz
        </h1>
        <p className="home-subtitle mt-3 text-sm">
          {difficultyInfo.emoji} {difficultyInfo.label} · {answerModeInfo.emoji}{" "}
          {answerModeInfo.label}
        </p>
      </header>

      {category === "music" && (
        <div className="mb-8 space-y-4">
          <section className="rounded-2xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur sm:p-5">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-indigo-600">
              Genre
            </p>
            <p className="mt-1 text-center text-sm text-zinc-500">
              Used for Name That Tune — pick which style of music to quiz
            </p>
            <div
              className="mt-4 flex flex-wrap justify-center gap-2"
              role="tablist"
              aria-label="Music genre"
            >
              {MUSIC_GENRE_FILTER_KEYS.map((key) => {
                const info = MUSIC_GENRE_FILTERS[key];
                const isActive = genre === key;
                const count = getMusicTrackCount({ genre: key, artist });
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => onGenreChange(key)}
                    className={`rounded-xl border px-3 py-2 text-sm font-semibold transition sm:px-4 ${
                      isActive
                        ? "border-violet-500 bg-violet-600 text-white shadow-md"
                        : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-violet-300 hover:bg-violet-50"
                    }`}
                  >
                    <span className="mr-1.5" aria-hidden="true">
                      {info.emoji}
                    </span>
                    {info.label}
                    <span className="ml-1.5 text-xs opacity-80">({count})</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur sm:p-5">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-indigo-600">
              Artist
            </p>
            <p className="mt-1 text-center text-sm text-zinc-500">
              Used for Name That Tune — quiz songs from a specific artist
            </p>
            <div
              className="mt-4 flex max-h-44 flex-wrap justify-center gap-2 overflow-y-auto pr-1"
              role="tablist"
              aria-label="Music artist"
            >
              <button
                type="button"
                role="tab"
                aria-selected={artist === "all"}
                onClick={() => onArtistChange("all")}
                className={`rounded-xl border px-3 py-2 text-sm font-semibold transition sm:px-4 ${
                  artist === "all"
                    ? "border-pink-500 bg-pink-600 text-white shadow-md"
                    : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-pink-300 hover:bg-pink-50"
                }`}
              >
                <span className="mr-1.5" aria-hidden="true">
                  {MUSIC_ARTIST_FILTERS.all.emoji}
                </span>
                {MUSIC_ARTIST_FILTERS.all.label}
                <span className="ml-1.5 text-xs opacity-80">
                  ({getMusicTrackCount({ genre, artist: "all" })})
                </span>
              </button>
              {availableArtists.map((key) => {
                const info = MUSIC_ARTIST_FILTERS[key];
                const isActive = artist === key;
                const count = getMusicTrackCount({ genre, artist: key });
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => onArtistChange(key)}
                    className={`rounded-xl border px-3 py-2 text-sm font-semibold transition sm:px-4 ${
                      isActive
                        ? "border-pink-500 bg-pink-600 text-white shadow-md"
                        : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-pink-300 hover:bg-pink-50"
                    }`}
                  >
                    <span className="mr-1.5" aria-hidden="true">
                      {info.emoji}
                    </span>
                    {info.label}
                    <span className="ml-1.5 text-xs opacity-80">({count})</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur sm:p-5">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-indigo-600">
              Instrument
            </p>
            <p className="mt-1 text-center text-sm text-zinc-500">
              Used for Perfect Pitch — pick the sound you want to hear
            </p>
            <div
              className="mt-4 flex flex-wrap justify-center gap-2"
              role="tablist"
              aria-label="Instrument"
            >
              {INSTRUMENT_KEYS.map((key) => {
                const info = INSTRUMENTS[key];
                const isActive = instrument === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => onInstrumentChange(key)}
                    className={`rounded-xl border px-3 py-2 text-sm font-semibold transition sm:px-4 ${
                      isActive
                        ? "border-indigo-500 bg-indigo-600 text-white shadow-md"
                        : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-indigo-300 hover:bg-indigo-50"
                    }`}
                  >
                    <span className="mr-1.5" aria-hidden="true">
                      {info.emoji}
                    </span>
                    {info.label}
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {category === "movies" && (
        <div className="mb-8">
          <section className="rounded-2xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur sm:p-5">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-indigo-600">
              Studio / Broadcaster
            </p>
            <p className="mt-1 text-center text-sm text-zinc-500">
              Used for Guess That Movie! — pick which studio&apos;s PG films to quiz
            </p>
            <div
              className="mt-4 flex flex-wrap justify-center gap-2"
              role="tablist"
              aria-label="Movie broadcaster"
            >
              {MOVIE_BROADCASTER_FILTER_KEYS.map((key) => {
                const info = MOVIE_BROADCASTER_FILTERS[key];
                const isActive = broadcaster === key;
                const count = getMovieCount({ broadcaster: key });
                if (key !== "all" && !availableBroadcasters.includes(key)) {
                  return null;
                }
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => onBroadcasterChange(key)}
                    className={`rounded-xl border px-3 py-2 text-sm font-semibold transition sm:px-4 ${
                      isActive
                        ? "border-rose-500 bg-rose-600 text-white shadow-md"
                        : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-rose-300 hover:bg-rose-50"
                    }`}
                  >
                    <span className="mr-1.5" aria-hidden="true">
                      {info.emoji}
                    </span>
                    {info.label}
                    <span className="ml-1.5 text-xs opacity-80">({count})</span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {category === "math" && (
        <div className="mb-8">
          <section className="rounded-2xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur sm:p-5">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-indigo-600">
              Grade Level
            </p>
            <p className="mt-1 text-center text-sm text-zinc-500">
              Used for Multiplication — pick which grade&apos;s factor range to practice
            </p>
            <div
              className="mt-4 flex flex-wrap justify-center gap-2"
              role="tablist"
              aria-label="Math grade"
            >
              {MATH_GRADE_KEYS.map((key) => {
                const info = MATH_GRADES[key];
                const isActive = mathGrade === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    title={info.description}
                    onClick={() => onMathGradeChange(key)}
                    className={`rounded-xl border px-3 py-2 text-sm font-semibold transition sm:px-4 ${
                      isActive
                        ? "border-emerald-500 bg-emerald-600 text-white shadow-md"
                        : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    <span className="mr-1.5" aria-hidden="true">
                      {info.emoji}
                    </span>
                    {info.label}
                    <span className="ml-1.5 text-xs opacity-80">
                      ({info.minFactor}–{info.maxFactor})
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {modes.map((key) => {
          const info = QUIZ_MODES[key];
          const count =
            key === "name-that-tune"
              ? nameThatTuneCount
              : key === "guess-that-movie"
                ? guessMovieCount
                : getQuestionCount(key);

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
                {key === "name-that-tune" && (
                  <p className="mt-2 text-xs font-medium text-violet-600">
                    {MUSIC_GENRE_FILTERS[genre].emoji}{" "}
                    {MUSIC_GENRE_FILTERS[genre].label}
                    {artist !== "all" && (
                      <>
                        {" · "}
                        {MUSIC_ARTIST_FILTERS[artist].emoji}{" "}
                        {MUSIC_ARTIST_FILTERS[artist].label}
                      </>
                    )}
                  </p>
                )}
                {key === "perfect-pitch" && (
                  <p className="mt-2 text-xs font-medium text-violet-600">
                    {INSTRUMENTS[instrument].emoji} {INSTRUMENTS[instrument].label}
                  </p>
                )}
                {key === "guess-that-movie" && (
                  <p className="mt-2 text-xs font-medium text-rose-600">
                    {MOVIE_BROADCASTER_FILTERS[broadcaster].emoji}{" "}
                    {MOVIE_BROADCASTER_FILTERS[broadcaster].label} · PG only
                  </p>
                )}
                {key === "multiplication" && (
                  <p className="mt-2 text-xs font-medium text-emerald-600">
                    {MATH_GRADES[mathGrade].emoji} {MATH_GRADES[mathGrade].label}{" "}
                    · factors {MATH_GRADES[mathGrade].minFactor}–
                    {MATH_GRADES[mathGrade].maxFactor}
                  </p>
                )}
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-indigo-600">
                  {key === "perfect-pitch"
                    ? `Up to ${count} notes`
                    : key === "name-that-tune"
                      ? `${count} songs`
                      : key === "guess-that-movie"
                        ? `${count} scenes`
                        : key === "guess-that-animal"
                          ? `${count} sounds`
                          : key === "multiplication"
                          ? "Random problems"
                          : `${count} questions`}{" "}
                  →
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
