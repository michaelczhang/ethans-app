import type { AnimalQuizQuestion } from "@/lib/quiz-data";
import animalsData from "@/lib/animals.json";

/** Max seconds to play per animal clip (many clips are short). */
export const ANIMAL_CLIP_SECONDS = 10;

export type AnimalSeed = {
  id: string;
  name: string;
  audio: string;
  tier?: "easy" | "medium" | "hard";
  aliases?: string[];
};

export const ANIMALS: AnimalSeed[] = animalsData as AnimalSeed[];

function pickDistractors(names: string[], correct: string, seed: number): string[] {
  const pool = names.filter((name) => name !== correct);
  const start = seed % Math.max(pool.length, 1);
  const picked: string[] = [];
  for (let i = 0; i < pool.length && picked.length < 3; i++) {
    const name = pool[(start + i) % pool.length];
    if (!picked.includes(name)) picked.push(name);
  }
  return picked;
}

export function buildAnimalQuestionsFromSeeds(seeds: AnimalSeed[]): AnimalQuizQuestion[] {
  const names = seeds.map((animal) => animal.name);
  return seeds.map((animal, index) => {
    const distractors = pickDistractors(names, animal.name, index);
    const correctIndex = index % 4;
    const options = [...distractors];
    options.splice(correctIndex, 0, animal.name);
    return {
      id: animal.id,
      question: "What animal makes this sound?",
      options: options.slice(0, 4),
      correctIndex,
      audio: animal.audio,
      animalName: animal.name,
      aliases: animal.aliases,
      tier: animal.tier,
    };
  });
}

export function getAnimalQuestions(): AnimalQuizQuestion[] {
  return buildAnimalQuestionsFromSeeds(ANIMALS);
}

export function getAnimalCount(): number {
  return ANIMALS.length;
}

export const ANIMAL_QUESTIONS: AnimalQuizQuestion[] = getAnimalQuestions();
