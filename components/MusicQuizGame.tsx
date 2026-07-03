"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  QUIZ_MODES,
  type MusicQuizQuestion,
} from "@/lib/quiz-data";
import {
  checkArtistAnswer,
  checkSongAnswer,
  getArtistName,
  getSongTitle,
} from "@/lib/music-quiz";
import { MUSIC_CLIP_SECONDS, getMusicQuestionsForGenre } from "@/lib/music-quiz-data";
import type { MusicGenreFilter } from "@/lib/music-genre";
import { MUSIC_GENRE_FILTERS } from "@/lib/music-genre";
import {
  ANSWER_MODES,
  DIFFICULTIES,
  prepareQuestionsForDifficulty,
  type AnswerMode,
  type QuizDifficulty,
} from "@/lib/quiz-difficulty";

interface MusicQuizGameProps {
  difficulty: QuizDifficulty;
  answerMode: AnswerMode;
  genre: MusicGenreFilter;
  onBackToHome: () => void;
}

function buildQuestionSet(
  difficulty: QuizDifficulty,
  genre: MusicGenreFilter,
): MusicQuizQuestion[] {
  return prepareQuestionsForDifficulty(
    getMusicQuestionsForGenre(genre),
    difficulty,
    "name-that-tune",
  ) as MusicQuizQuestion[];
}

export default function MusicQuizGame({
  difficulty,
  answerMode,
  genre,
  onBackToHome,
}: MusicQuizGameProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [questions, setQuestions] = useState<MusicQuizQuestion[]>(() =>
    buildQuestionSet(difficulty, genre),
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [songScore, setSongScore] = useState(0);
  const [artistBonus, setArtistBonus] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [typedSong, setTypedSong] = useState("");
  const [typedArtist, setTypedArtist] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const modeInfo = QUIZ_MODES["name-that-tune"];
  const genreInfo = MUSIC_GENRE_FILTERS[genre];
  const difficultyInfo = DIFFICULTIES[difficulty];
  const answerModeInfo = ANSWER_MODES[answerMode];
  const maxScore = totalQuestions * 2;
  const totalScore = songScore + artistBonus;

  const songCorrect = useMemo(() => {
    if (!hasSubmitted || !currentQuestion) return false;
    if (answerMode === "typed") {
      return checkSongAnswer(typedSong, currentQuestion, difficulty);
    }
    return selectedIndex === currentQuestion.correctIndex;
  }, [
    hasSubmitted,
    currentQuestion,
    answerMode,
    typedSong,
    difficulty,
    selectedIndex,
  ]);

  const artistCorrect = useMemo(() => {
    if (!hasSubmitted || !currentQuestion || !typedArtist.trim()) return false;
    return checkArtistAnswer(typedArtist, currentQuestion, difficulty);
  }, [hasSubmitted, currentQuestion, typedArtist, difficulty]);

  const progressPercent = useMemo(() => {
    if (isFinished) return 100;
    return Math.round((currentIndex / totalQuestions) * 100);
  }, [currentIndex, totalQuestions, isFinished]);

  const resetQuiz = useCallback(() => {
    setQuestions(buildQuestionSet(difficulty, genre));
    setCurrentIndex(0);
    setSongScore(0);
    setArtistBonus(0);
    setSelectedIndex(null);
    setTypedSong("");
    setTypedArtist("");
    setHasSubmitted(false);
    setIsFinished(false);
    setIsPlaying(false);
  }, [difficulty, genre]);

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
      if (audio.currentTime >= MUSIC_CLIP_SECONDS) {
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
      if (!typedSong.trim()) return;
    } else if (selectedIndex === null) {
      return;
    }

    setHasSubmitted(true);

    const songIsCorrect =
      answerMode === "typed"
        ? checkSongAnswer(typedSong, currentQuestion, difficulty)
        : selectedIndex === currentQuestion.correctIndex;

    const artistIsCorrect =
      typedArtist.trim().length > 0 &&
      checkArtistAnswer(typedArtist, currentQuestion, difficulty);

    if (songIsCorrect) {
      setSongScore((prev) => prev + 1);
    }
    if (songIsCorrect && artistIsCorrect) {
      setArtistBonus((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= totalQuestions) {
      setIsFinished(true);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setSelectedIndex(null);
    setTypedSong("");
    setTypedArtist("");
    setHasSubmitted(false);
  };

  const scoreMessage = useMemo(() => {
    const ratio = totalScore / maxScore;
    if (ratio === 1) return "Perfect ears! Song and artist master.";
    if (ratio >= 0.75) return "Amazing! You really know your music.";
    if (ratio >= 0.5) return "Solid round — keep listening!";
    if (ratio >= 0.3) return "Good start — replay clips and try again.";
    return "Tough set — give it another spin!";
  }, [totalScore, maxScore]);

  const canSubmit =
    answerMode === "typed"
      ? typedSong.trim().length > 0
      : selectedIndex !== null;

  if (!currentQuestion && !isFinished) return null;

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
            {genreInfo.emoji} {genreInfo.label}
          </p>
        </div>
      </header>

      {!isFinished ? (
        <>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="flex flex-wrap gap-2">
              <span className="quiz-badge">
                Score: {totalScore} / {maxScore}
              </span>
              <span className="quiz-badge">
                Round {currentIndex + 1} / {totalQuestions}
              </span>
              <span className="quiz-badge">
                {difficultyInfo.emoji} {difficultyInfo.label}
              </span>
              <span className="quiz-badge">
                {answerModeInfo.emoji} {answerModeInfo.label}
              </span>
              <span className="quiz-badge">
                {genreInfo.emoji} {genreInfo.label}
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
            <div className="mb-6 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50 p-5">
              <p className="text-sm font-medium text-indigo-700">
                Listen to the first {MUSIC_CLIP_SECONDS} seconds, then name the
                song. Type the artist for a bonus point!
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
                  className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  {isPlaying ? "▶ Playing..." : "▶ Play Clip"}
                </button>
                <button
                  type="button"
                  onClick={playClip}
                  className="rounded-xl border border-indigo-200 bg-white px-5 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
                >
                  ↺ Replay
                </button>
              </div>
            </div>

            <h2 className="text-lg font-semibold leading-snug text-zinc-900 sm:text-xl">
              {currentQuestion.question}
            </h2>

            {answerMode === "typed" ? (
              <div className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="typed-song"
                    className="mb-2 block text-sm font-medium text-zinc-600"
                  >
                    Song title
                  </label>
                  <input
                    id="typed-song"
                    type="text"
                    value={typedSong}
                    disabled={hasSubmitted}
                    onChange={(event) => setTypedSong(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && canSubmit && !hasSubmitted) {
                        handleSubmit();
                      }
                    }}
                    placeholder="Enter the song name..."
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-base text-zinc-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-200 disabled:opacity-70"
                    autoComplete="off"
                    spellCheck={false}
                  />
                </div>
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

            <div className="mt-6">
              <label
                htmlFor="typed-artist"
                className="mb-2 block text-sm font-medium text-zinc-600"
              >
                Artist <span className="text-indigo-500">(+1 bonus if correct)</span>
              </label>
              <input
                id="typed-artist"
                type="text"
                value={typedArtist}
                disabled={hasSubmitted}
                onChange={(event) => setTypedArtist(event.target.value)}
                placeholder="Who performs this song?"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-base text-zinc-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-200 disabled:opacity-70"
                autoComplete="off"
                spellCheck={false}
              />
            </div>

            {hasSubmitted && (
              <div
                className={`mt-6 space-y-2 rounded-xl border px-4 py-3 text-sm font-medium ${
                  songCorrect
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-rose-200 bg-rose-50 text-rose-800"
                }`}
              >
                {songCorrect ? (
                  <p>Correct song! +1 point.</p>
                ) : (
                  <p>
                    Not quite — the song is{" "}
                    <strong>{getSongTitle(currentQuestion)}</strong>.
                  </p>
                )}
                {typedArtist.trim() && (
                  <p className={artistCorrect ? "text-emerald-700" : "text-rose-700"}>
                    {artistCorrect ? (
                      songCorrect ? (
                        <>Artist bonus! +1 more point.</>
                      ) : (
                        <>Right artist, but the song name was needed for bonus.</>
                      )
                    ) : (
                      <>
                        Artist: <strong>{getArtistName(currentQuestion)}</strong>
                      </>
                    )}
                  </p>
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
                  : "Next Round"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="quiz-card flex flex-1 flex-col items-center justify-center rounded-2xl border border-white/20 p-8 text-center shadow-lg">
          <span className="text-5xl" aria-hidden="true">
            {modeInfo.emoji}
          </span>
          <h2 className="mt-4 text-2xl font-bold text-zinc-900">Quiz Complete!</h2>
          <p className="mt-2 text-zinc-500">{modeInfo.label}</p>

          <div className="mt-6 rounded-2xl bg-indigo-50 px-8 py-5">
            <p className="text-4xl font-bold text-indigo-700">
              {totalScore} / {maxScore}
            </p>
            <p className="mt-2 text-sm text-indigo-600">
              {songScore} songs · {artistBonus} artist bonuses
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
