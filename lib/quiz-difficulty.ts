import type { QuizQuestion } from "@/lib/quiz-data";

export type QuizDifficulty = "easy" | "medium" | "hard";

export const DIFFICULTIES: Record<
  QuizDifficulty,
  { label: string; emoji: string; description: string }
> = {
  easy: {
    label: "Easy",
    emoji: "🌱",
    description: "10 questions · 3 choices each",
  },
  medium: {
    label: "Medium",
    emoji: "⚡",
    description: "20 questions · 4 choices each",
  },
  hard: {
    label: "Hard",
    emoji: "🔥",
    description: "All questions · 4 choices each",
  },
};

const STORAGE_KEY = "quiz-arena-difficulty";

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function loadDifficulty(): QuizDifficulty {
  if (typeof window === "undefined") return "medium";
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "easy" || saved === "medium" || saved === "hard") return saved;
  return "medium";
}

export function saveDifficulty(difficulty: QuizDifficulty): void {
  localStorage.setItem(STORAGE_KEY, difficulty);
}

function questionLimit(difficulty: QuizDifficulty): number | null {
  switch (difficulty) {
    case "easy":
      return 10;
    case "medium":
      return 20;
    case "hard":
      return null;
  }
}

function optionCount(difficulty: QuizDifficulty): number {
  return difficulty === "easy" ? 3 : 4;
}

export function prepareQuestionsForDifficulty(
  questions: QuizQuestion[],
  difficulty: QuizDifficulty,
): QuizQuestion[] {
  const limit = questionLimit(difficulty);
  const shuffled = shuffle(questions);
  const selected =
    limit === null ? shuffled : shuffled.slice(0, Math.min(limit, shuffled.length));
  const choices = optionCount(difficulty);

  return selected.map((question) => {
    if (choices >= question.options.length) return question;

    const correctAnswer = question.options[question.correctIndex];
    const wrongAnswers = question.options.filter(
      (_, index) => index !== question.correctIndex,
    );
    const trimmedWrong = shuffle(wrongAnswers).slice(0, choices - 1);
    const newOptions = shuffle([correctAnswer, ...trimmedWrong]);

    return {
      ...question,
      options: newOptions,
      correctIndex: newOptions.indexOf(correctAnswer),
    };
  });
}
