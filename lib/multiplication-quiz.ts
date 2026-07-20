import type { MathGrade } from "@/lib/math-grade";
import { DEFAULT_MATH_GRADE, factorRangeForGrade } from "@/lib/math-grade";
import type { QuizQuestion } from "@/lib/quiz-data";

export const MULTIPLICATION_POOL_SIZE = 36;

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildDistractors(a: number, b: number, correct: number): string[] {
  const candidates = new Set<number>();

  const add = (value: number) => {
    if (value > 0 && value !== correct) candidates.add(value);
  };

  add((a + 1) * b);
  add((a - 1) * b);
  add(a * (b + 1));
  add(a * (b - 1));
  add(a + b);
  add(Math.abs(a - b));
  add(correct + 1);
  add(correct - 1);
  add(correct + a);
  add(correct - a);
  add(correct + b);
  add(correct - b);
  add(a * b + a);
  add(a * b - b);

  const nearby = [correct + 2, correct - 2, correct + 3, correct - 3];
  for (const value of nearby) add(value);

  const distractors: string[] = [];
  for (const value of candidates) {
    distractors.push(String(value));
    if (distractors.length >= 3) break;
  }

  let guard = 0;
  while (distractors.length < 3 && guard < 20) {
    const offset = randomInt(1, Math.max(4, Math.floor(correct / 3)));
    const sign = guard % 2 === 0 ? 1 : -1;
    add(correct + sign * offset);
    const next = [...candidates].find((v) => !distractors.includes(String(v)));
    if (next !== undefined) distractors.push(String(next));
    guard += 1;
  }

  return distractors.slice(0, 3);
}

function buildQuestion(a: number, b: number, id: string): QuizQuestion {
  const correct = a * b;
  const distractors = buildDistractors(a, b, correct);
  const correctIndex = randomInt(0, 3);
  const options = [...distractors];
  options.splice(correctIndex, 0, String(correct));

  return {
    id,
    question: `What is ${a} × ${b}?`,
    options: options.slice(0, 4),
    correctIndex,
  };
}

export function generateMultiplicationQuestions(
  grade: MathGrade = DEFAULT_MATH_GRADE,
  poolSize = MULTIPLICATION_POOL_SIZE,
): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  const seen = new Set<string>();
  const range = factorRangeForGrade(grade);

  let attempts = 0;
  while (questions.length < poolSize && attempts < poolSize * 8) {
    attempts += 1;
    const a = randomInt(range.min, range.max);
    const b = randomInt(range.min, range.max);
    const key = `${a}x${b}`;
    if (seen.has(key)) continue;
    seen.add(key);

    questions.push(buildQuestion(a, b, `mult-${questions.length + 1}`));
  }

  return questions;
}
