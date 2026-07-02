export type LetterState = "correct" | "present" | "absent" | "empty";

export type WanderGuess = {
  word: string;
  letters: LetterState[];
  isWin: boolean;
};

export const MAX_TRIES = 6;

export function evaluateGuess(guess: string, answer: string): WanderGuess {
  const g = guess.toUpperCase();
  const a = answer.toUpperCase();
  const len = a.length;
  const letters: LetterState[] = Array(len).fill("absent");
  const answerChars = a.split("");
  const guessChars = g.split("");
  const used = Array(len).fill(false);

  for (let i = 0; i < len; i++) {
    if (guessChars[i] === answerChars[i]) {
      letters[i] = "correct";
      used[i] = true;
    }
  }

  for (let i = 0; i < len; i++) {
    if (letters[i] === "correct") continue;
    const found = answerChars.findIndex(
      (ch, idx) => !used[idx] && ch === guessChars[i],
    );
    if (found !== -1) {
      letters[i] = "present";
      used[found] = true;
    }
  }

  return { word: g, letters, isWin: g === a };
}

export function getPathLetters(
  guesses: WanderGuess[],
  wordLength: number,
): (string | null)[] {
  const path: (string | null)[] = Array(wordLength).fill(null);
  for (const guess of guesses) {
    guess.letters.forEach((state, i) => {
      if (state === "correct") path[i] = guess.word[i];
    });
  }
  return path;
}

export function countSharedLetters(guess: string, answer: string): number {
  const aCounts: Record<string, number> = {};
  for (const ch of answer.toUpperCase()) {
    aCounts[ch] = (aCounts[ch] ?? 0) + 1;
  }
  let shared = 0;
  for (const ch of guess.toUpperCase()) {
    if (aCounts[ch] > 0) {
      shared++;
      aCounts[ch]--;
    }
  }
  return shared;
}
