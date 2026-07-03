import type { MusicQuizQuestion } from "@/lib/quiz-data";
import { normalizeAnswer } from "@/lib/quiz-difficulty";

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

function matchesAnswer(
  typed: string,
  accepted: string[],
  difficulty: "easy" | "medium" | "hard",
): boolean {
  const normalizedTyped = normalizeAnswer(typed);
  if (!normalizedTyped) return false;

  const normalizedAccepted = accepted.map((value) => normalizeAnswer(value));

  if (normalizedAccepted.includes(normalizedTyped)) return true;

  for (const answer of normalizedAccepted) {
    if (difficulty === "easy") {
      if (
        answer.includes(normalizedTyped) ||
        normalizedTyped.includes(answer)
      ) {
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

export function getSongTitle(question: MusicQuizQuestion): string {
  return question.songTitle;
}

export function getArtistName(question: MusicQuizQuestion): string {
  return question.artist;
}

export function checkSongAnswer(
  typed: string,
  question: MusicQuizQuestion,
  difficulty: "easy" | "medium" | "hard",
): boolean {
  const accepted = [question.songTitle, ...(question.songAliases ?? [])];
  return matchesAnswer(typed, accepted, difficulty);
}

export function checkArtistAnswer(
  typed: string,
  question: MusicQuizQuestion,
  difficulty: "easy" | "medium" | "hard",
): boolean {
  const accepted = [question.artist, ...(question.artistAliases ?? [])];
  return matchesAnswer(typed, accepted, difficulty);
}

export function isMusicQuizMode(mode: string): mode is "name-that-tune" {
  return mode === "name-that-tune";
}
