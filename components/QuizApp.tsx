"use client";

import { useEffect, useState } from "react";
import CategoryHome from "@/components/CategoryHome";
import MusicQuizGame from "@/components/MusicQuizGame";
import PerfectPitchQuizGame from "@/components/PerfectPitchQuizGame";
import QuizBackground from "@/components/QuizBackground";
import QuizGame from "@/components/QuizGame";
import QuizHome from "@/components/QuizHome";
import { QUIZ_MODES, type QuizCategory, type QuizMode } from "@/lib/quiz-data";
import {
  loadInstrument,
  saveInstrument,
  type MusicInstrument,
} from "@/lib/music-instrument";
import {
  loadMusicGenre,
  saveMusicGenre,
  type MusicGenreFilter,
} from "@/lib/music-genre";
import {
  loadMusicArtist,
  saveMusicArtist,
  type MusicArtistFilter,
} from "@/lib/music-artist";
import { getMusicTrackCount } from "@/lib/music-quiz-data";
import {
  loadAnswerMode,
  loadDifficulty,
  saveAnswerMode,
  saveDifficulty,
  type AnswerMode,
  type QuizDifficulty,
} from "@/lib/quiz-difficulty";

type View =
  | { name: "categories" }
  | { name: "quizzes-list"; category: QuizCategory }
  | { name: "quiz"; mode: QuizMode; category: QuizCategory };

const CATEGORY_BACKGROUNDS: Record<QuizCategory, string[]> = {
  games: [
    "/backgrounds/starcraft-bg.png",
    "/backgrounds/pokemon-bg.png",
    "/backgrounds/minecraft-bg.png",
    "/backgrounds/fortnite-bg.png",
  ],
  geography: [
    "/backgrounds/geography-bg.png",
    "/backgrounds/states-bg.png",
    "/backgrounds/countries-bg.png",
  ],
  aqua: [
    "/backgrounds/aqua-bg.png",
    "/backgrounds/sea-animals-bg.png",
    "/backgrounds/ocean-bg.png",
  ],
  music: ["/backgrounds/music-bg.svg"],
};

const CATEGORIES_VIEW_BACKGROUNDS: string[] = [
  "/backgrounds/starcraft-bg.png",
  "/backgrounds/geography-bg.png",
  "/backgrounds/aqua-bg.png",
  "/backgrounds/music-bg.svg",
  "/backgrounds/sea-animals-bg.png",
];

function backgroundsForView(view: View): string[] {
  if (view.name === "categories") return CATEGORIES_VIEW_BACKGROUNDS;
  if (view.name === "quizzes-list") return CATEGORY_BACKGROUNDS[view.category];
  return CATEGORY_BACKGROUNDS[QUIZ_MODES[view.mode].category];
}

function isSpecialMusicQuiz(mode: QuizMode): boolean {
  return mode === "name-that-tune" || mode === "perfect-pitch";
}

export default function QuizApp() {
  const [view, setView] = useState<View>({ name: "categories" });
  const [difficulty, setDifficulty] = useState<QuizDifficulty>("medium");
  const [answerMode, setAnswerMode] = useState<AnswerMode>("multiple-choice");
  const [instrument, setInstrument] = useState<MusicInstrument>("piano");
  const [genre, setGenre] = useState<MusicGenreFilter>("all");
  const [artist, setArtist] = useState<MusicArtistFilter>("all");

  useEffect(() => {
    setDifficulty(loadDifficulty());
    setAnswerMode(loadAnswerMode());
    setInstrument(loadInstrument());
    setGenre(loadMusicGenre());
    setArtist(loadMusicArtist());
  }, []);

  useEffect(() => {
    if (
      artist !== "all" &&
      getMusicTrackCount({ genre, artist }) === 0
    ) {
      setArtist("all");
      saveMusicArtist("all");
    }
  }, [genre, artist]);

  const handleDifficultyChange = (next: QuizDifficulty) => {
    setDifficulty(next);
    saveDifficulty(next);
  };

  const handleAnswerModeChange = (next: AnswerMode) => {
    setAnswerMode(next);
    saveAnswerMode(next);
  };

  const handleInstrumentChange = (next: MusicInstrument) => {
    setInstrument(next);
    saveInstrument(next);
  };

  const handleGenreChange = (next: MusicGenreFilter) => {
    setGenre(next);
    saveMusicGenre(next);
  };

  const handleArtistChange = (next: MusicArtistFilter) => {
    setArtist(next);
    saveMusicArtist(next);
  };

  return (
    <>
      <QuizBackground images={backgroundsForView(view)} />
      {view.name === "categories" && (
        <CategoryHome
          difficulty={difficulty}
          answerMode={answerMode}
          onDifficultyChange={handleDifficultyChange}
          onAnswerModeChange={handleAnswerModeChange}
          onSelectCategory={(category) =>
            setView({ name: "quizzes-list", category })
          }
        />
      )}
      {view.name === "quizzes-list" && (
        <QuizHome
          category={view.category}
          difficulty={difficulty}
          answerMode={answerMode}
          instrument={instrument}
          genre={genre}
          artist={artist}
          onInstrumentChange={handleInstrumentChange}
          onGenreChange={handleGenreChange}
          onArtistChange={handleArtistChange}
          onSelectMode={(mode) =>
            setView({ name: "quiz", mode, category: view.category })
          }
          onBack={() => setView({ name: "categories" })}
        />
      )}
      {view.name === "quiz" && view.mode === "name-that-tune" && (
        <MusicQuizGame
          difficulty={difficulty}
          answerMode={answerMode}
          genre={genre}
          artist={artist}
          onBackToHome={() =>
            setView({ name: "quizzes-list", category: view.category })
          }
        />
      )}
      {view.name === "quiz" && view.mode === "perfect-pitch" && (
        <PerfectPitchQuizGame
          difficulty={difficulty}
          answerMode={answerMode}
          instrument={instrument}
          onBackToHome={() =>
            setView({ name: "quizzes-list", category: view.category })
          }
        />
      )}
      {view.name === "quiz" && !isSpecialMusicQuiz(view.mode) && (
        <QuizGame
          mode={view.mode}
          difficulty={difficulty}
          answerMode={answerMode}
          onBackToHome={() =>
            setView({ name: "quizzes-list", category: view.category })
          }
        />
      )}
    </>
  );
}
