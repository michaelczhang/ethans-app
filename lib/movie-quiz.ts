import type { MovieQuizQuestion } from "@/lib/quiz-data";
import { normalizeAnswer, type QuizDifficulty } from "@/lib/quiz-difficulty";

function acceptedTitles(question: MovieQuizQuestion): string[] {
  const titles = [question.movieTitle, ...(question.titleAliases ?? [])];
  return titles.map((title) => normalizeAnswer(title));
}

export function getMovieTitle(question: MovieQuizQuestion): string {
  return question.movieTitle;
}

export function checkMovieAnswer(
  typed: string,
  question: MovieQuizQuestion,
  difficulty: QuizDifficulty,
): boolean {
  const normalizedTyped = normalizeAnswer(typed);
  if (!normalizedTyped) return false;

  const accepted = acceptedTitles(question);
  const correct = normalizeAnswer(question.movieTitle);

  if (accepted.includes(normalizedTyped)) return true;

  if (difficulty === "easy") {
    if (
      accepted.some(
        (title) =>
          title.includes(normalizedTyped) || normalizedTyped.includes(title),
      )
    ) {
      return true;
    }
  }

  if (difficulty !== "hard") {
    const withoutArticle = normalizedTyped.replace(/^(the|a|an)\s+/, "");
    if (accepted.includes(withoutArticle)) return true;
  }

  return normalizedTyped === correct;
}
