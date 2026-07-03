"use client";

import { useEffect, useState } from "react";
import CategoryHome from "@/components/CategoryHome";
import QuizBackground from "@/components/QuizBackground";
import QuizGame from "@/components/QuizGame";
import QuizHome from "@/components/QuizHome";
import { QUIZ_MODES, type QuizCategory, type QuizMode } from "@/lib/quiz-data";
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
};

const CATEGORIES_VIEW_BACKGROUNDS: string[] = [
  "/backgrounds/starcraft-bg.png",
  "/backgrounds/geography-bg.png",
  "/backgrounds/aqua-bg.png",
  "/backgrounds/sea-animals-bg.png",
];

function backgroundsForView(view: View): string[] {
  if (view.name === "categories") return CATEGORIES_VIEW_BACKGROUNDS;
  if (view.name === "quizzes-list") return CATEGORY_BACKGROUNDS[view.category];
  return CATEGORY_BACKGROUNDS[QUIZ_MODES[view.mode].category];
}

export default function QuizApp() {
  const [view, setView] = useState<View>({ name: "categories" });
  const [difficulty, setDifficulty] = useState<QuizDifficulty>("medium");
  const [answerMode, setAnswerMode] = useState<AnswerMode>("multiple-choice");

  useEffect(() => {
    setDifficulty(loadDifficulty());
    setAnswerMode(loadAnswerMode());
  }, []);

  const handleDifficultyChange = (next: QuizDifficulty) => {
    setDifficulty(next);
    saveDifficulty(next);
  };

  const handleAnswerModeChange = (next: AnswerMode) => {
    setAnswerMode(next);
    saveAnswerMode(next);
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
          onSelectMode={(mode) =>
            setView({ name: "quiz", mode, category: view.category })
          }
          onBack={() => setView({ name: "categories" })}
        />
      )}
      {view.name === "quiz" && (
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
