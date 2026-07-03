import type { QuizMode, QuizQuestion } from "@/lib/quiz-data";

export type QuizDifficulty = "easy" | "medium" | "hard";
export type AnswerMode = "multiple-choice" | "typed";

export type QuestionTier = QuizDifficulty;

export const DIFFICULTIES: Record<
  QuizDifficulty,
  { label: string; emoji: string; description: string }
> = {
  easy: {
    label: "Easy",
    emoji: "🌱",
    description: "Simple questions · 10 rounds · 3 choices",
  },
  medium: {
    label: "Medium",
    emoji: "⚡",
    description: "Mixed questions · 20 rounds · 4 choices",
  },
  hard: {
    label: "Hard",
    emoji: "🔥",
    description: "Tough questions · all rounds · tricky choices",
  },
};

export const ANSWER_MODES: Record<
  AnswerMode,
  { label: string; emoji: string; description: string }
> = {
  "multiple-choice": {
    label: "Multiple Choice",
    emoji: "🔘",
    description: "Pick the correct answer from options",
  },
  typed: {
    label: "Type Your Answer",
    emoji: "⌨️",
    description: "Type the answer yourself",
  },
};

const DIFFICULTY_STORAGE_KEY = "quiz-arena-difficulty";
const ANSWER_MODE_STORAGE_KEY = "quiz-arena-answer-mode";

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
  const saved = localStorage.getItem(DIFFICULTY_STORAGE_KEY);
  if (saved === "easy" || saved === "medium" || saved === "hard") return saved;
  return "medium";
}

export function saveDifficulty(difficulty: QuizDifficulty): void {
  localStorage.setItem(DIFFICULTY_STORAGE_KEY, difficulty);
}

export function loadAnswerMode(): AnswerMode {
  if (typeof window === "undefined") return "multiple-choice";
  const saved = localStorage.getItem(ANSWER_MODE_STORAGE_KEY);
  if (saved === "multiple-choice" || saved === "typed") return saved;
  return "multiple-choice";
}

export function saveAnswerMode(mode: AnswerMode): void {
  localStorage.setItem(ANSWER_MODE_STORAGE_KEY, mode);
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

function scoreQuestionHardness(question: QuizQuestion): number {
  const correct = question.options[question.correctIndex];
  let score = 0;

  if (/\d/.test(question.question)) score += 2;
  if (question.question.length > 90) score += 2;
  if (correct.length > 18) score += 1;
  if (question.options.some((option) => /^\d/.test(option))) score += 2;
  if (question.options.filter((option) => option.length > 14).length >= 2) {
    score += 1;
  }

  return score;
}

function assignTier(
  question: QuizQuestion,
  mode: QuizMode,
  index: number,
  total: number,
): QuestionTier {
  if (question.tier) return question.tier;

  if (mode === "states-capitals" || mode === "countries") {
    if (index < total * 0.34) return "easy";
    if (index < total * 0.67) return "medium";
    return "hard";
  }

  const hardness = scoreQuestionHardness(question);
  const rank = index / Math.max(total - 1, 1);

  if (hardness <= 1 && rank < 0.45) return "easy";
  if (hardness >= 4 || rank > 0.72) return "hard";
  return "medium";
}

function tiersForDifficulty(difficulty: QuizDifficulty): QuestionTier[] {
  switch (difficulty) {
    case "easy":
      return ["easy"];
    case "medium":
      return ["easy", "medium"];
    case "hard":
      return ["medium", "hard"];
  }
}

function pickDistractors(
  question: QuizQuestion,
  difficulty: QuizDifficulty,
  count: number,
): string[] {
  const correct = question.options[question.correctIndex];
  const wrong = question.options.filter(
    (_, index) => index !== question.correctIndex,
  );

  const scored = wrong.map((option) => {
    const lengthGap = Math.abs(option.length - correct.length);
    if (difficulty === "easy") {
      return { option, score: lengthGap + (option[0] === correct[0] ? 0 : 3) };
    }
    return {
      option,
      score: lengthGap + (option[0] === correct[0] ? -2 : 2),
    };
  });

  scored.sort((a, b) =>
    difficulty === "easy" ? b.score - a.score : a.score - b.score,
  );

  return scored.slice(0, count).map((entry) => entry.option);
}

function trimOptions(
  question: QuizQuestion,
  difficulty: QuizDifficulty,
): QuizQuestion {
  const choices = optionCount(difficulty);
  if (choices >= question.options.length) return question;

  const correctAnswer = question.options[question.correctIndex];
  const distractors = pickDistractors(question, difficulty, choices - 1);
  const newOptions = shuffle([correctAnswer, ...distractors]);

  return {
    ...question,
    options: newOptions,
    correctIndex: newOptions.indexOf(correctAnswer),
  };
}

export function getCorrectAnswer(question: QuizQuestion): string {
  return question.options[question.correctIndex];
}

export function normalizeAnswer(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ");
}

function levenshtein(a: string, b: string): number {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1,
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

export function checkTypedAnswer(
  typed: string,
  question: QuizQuestion,
  difficulty: QuizDifficulty,
): boolean {
  const normalizedTyped = normalizeAnswer(typed);
  if (!normalizedTyped) return false;

  const accepted = question.options.map((option) => normalizeAnswer(option));
  const correct = accepted[question.correctIndex];

  if (normalizedTyped === correct) return true;

  if (difficulty === "easy") {
    if (correct.includes(normalizedTyped) || normalizedTyped.includes(correct)) {
      return true;
    }
    return levenshtein(normalizedTyped, correct) <= 2;
  }

  if (difficulty === "medium") {
    return levenshtein(normalizedTyped, correct) <= 1;
  }

  return false;
}

export function prepareQuestionsForDifficulty(
  questions: QuizQuestion[],
  difficulty: QuizDifficulty,
  mode: QuizMode,
): QuizQuestion[] {
  const allowedTiers = tiersForDifficulty(difficulty);
  const tagged = questions.map((question, index) => ({
    ...question,
    tier: assignTier(question, mode, index, questions.length),
  }));

  const tierPool = tagged.filter((question) =>
    allowedTiers.includes(question.tier ?? "medium"),
  );

  let pool = tierPool.length > 0 ? tierPool : tagged;

  if (difficulty === "hard") {
    const hardOnly = pool.filter((question) => question.tier === "hard");
    if (hardOnly.length >= 5) pool = hardOnly;
  }

  const limit = questionLimit(difficulty);
  const shuffled = shuffle(pool);
  const selected =
    limit === null
      ? shuffled
      : shuffled.slice(0, Math.min(limit, shuffled.length));

  return selected.map((question) => trimOptions(question, difficulty));
}
