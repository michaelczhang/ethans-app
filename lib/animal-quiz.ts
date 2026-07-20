import type { AnimalQuizQuestion } from "@/lib/quiz-data";
import { normalizeAnswer, type QuizDifficulty } from "@/lib/quiz-difficulty";

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

function acceptedNames(question: AnimalQuizQuestion): string[] {
  return [question.animalName, ...(question.aliases ?? [])];
}

export function getAnimalName(question: AnimalQuizQuestion): string {
  return question.animalName;
}

export function checkAnimalAnswer(
  typed: string,
  question: AnimalQuizQuestion,
  difficulty: QuizDifficulty,
): boolean {
  const normalizedTyped = normalizeAnswer(typed);
  if (!normalizedTyped) return false;

  const accepted = acceptedNames(question).map((name) => normalizeAnswer(name));

  if (accepted.includes(normalizedTyped)) return true;

  for (const answer of accepted) {
    if (difficulty === "easy") {
      if (answer.includes(normalizedTyped) || normalizedTyped.includes(answer)) {
        return true;
      }
      if (levenshtein(normalizedTyped, answer) <= 2) return true;
    } else if (difficulty === "medium") {
      if (levenshtein(normalizedTyped, answer) <= 1) return true;
    } else if (normalizedTyped === answer) {
      return true;
    }
  }

  return false;
}

export function isAnimalQuizMode(mode: string): mode is "guess-that-animal" {
  return mode === "guess-that-animal";
}
