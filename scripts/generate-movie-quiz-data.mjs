/**
 * Generates lib/movie-quiz-data.ts from lib/movies.json
 * Run: node scripts/generate-movie-quiz-data.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonPath = path.join(__dirname, "..", "lib", "movies.json");
const outPath = path.join(__dirname, "..", "lib", "movie-quiz-data.ts");

const movies = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const lines = [];
lines.push(`import type { MovieQuizQuestion } from "@/lib/quiz-data";`);
lines.push(`import type { MovieBroadcasterFilter } from "@/lib/movie-broadcaster";`);
lines.push(`import type { MovieBroadcasterId } from "@/lib/movie-broadcaster";`);
lines.push("");
lines.push(`export type MovieSeed = {`);
lines.push(`  id: string;`);
lines.push(`  title: string;`);
lines.push(`  broadcaster: MovieBroadcasterId;`);
lines.push(`  rating: "PG";`);
lines.push(`  image: string;`);
lines.push(`  titleAliases?: string[];`);
lines.push(`  tier?: "easy" | "medium" | "hard";`);
lines.push(`};`);
lines.push("");
lines.push(`export type MovieFilters = {`);
lines.push(`  broadcaster: MovieBroadcasterFilter;`);
lines.push(`};`);
lines.push("");
lines.push(`export const MOVIES: MovieSeed[] = ${JSON.stringify(movies, null, 2)};`);
lines.push("");
lines.push(`function pickDistractors(titles: string[], correct: string, seed: number): string[] {`);
lines.push(`  const pool = titles.filter((title) => title !== correct);`);
lines.push(`  const start = seed % Math.max(pool.length, 1);`);
lines.push(`  const picked: string[] = [];`);
lines.push(`  for (let i = 0; i < pool.length && picked.length < 3; i++) {`);
lines.push(`    const title = pool[(start + i) % pool.length];`);
lines.push(`    if (!picked.includes(title)) picked.push(title);`);
lines.push(`  }`);
lines.push(`  return picked;`);
lines.push(`}`);
lines.push("");
lines.push(`export function buildMovieQuestionsFromSeeds(seeds: MovieSeed[]): MovieQuizQuestion[] {`);
lines.push(`  const titles = seeds.map((movie) => movie.title);`);
lines.push(`  return seeds.map((movie, index) => {`);
lines.push(`    const distractors = pickDistractors(titles, movie.title, index);`);
lines.push(`    const correctIndex = index % 4;`);
lines.push(`    const options = [...distractors];`);
lines.push(`    options.splice(correctIndex, 0, movie.title);`);
lines.push(`    return {`);
lines.push(`      id: movie.id,`);
lines.push(`      question: "Which movie is this scene from?",`);
lines.push(`      options: options.slice(0, 4),`);
lines.push(`      correctIndex,`);
lines.push(`      image: movie.image,`);
lines.push(`      imageAlt: \`Scene from \${movie.title}\`,`);
lines.push(`      movieTitle: movie.title,`);
lines.push(`      titleAliases: movie.titleAliases,`);
lines.push(`      broadcaster: movie.broadcaster,`);
lines.push(`      rating: movie.rating,`);
lines.push(`      tier: movie.tier,`);
lines.push(`    };`);
lines.push(`  });`);
lines.push(`}`);
lines.push("");
lines.push(`export function filterMovies(filters: MovieFilters): MovieSeed[] {`);
lines.push(`  return MOVIES.filter((movie) => {`);
lines.push(`    if (filters.broadcaster !== "all" && movie.broadcaster !== filters.broadcaster) {`);
lines.push(`      return false;`);
lines.push(`    }`);
lines.push(`    return movie.rating === "PG";`);
lines.push(`  });`);
lines.push(`}`);
lines.push("");
lines.push(`export function getMovieQuestionsForFilters(filters: MovieFilters): MovieQuizQuestion[] {`);
lines.push(`  return buildMovieQuestionsFromSeeds(filterMovies(filters));`);
lines.push(`}`);
lines.push("");
lines.push(`export function getMovieCount(filters: Partial<MovieFilters> = {}): number {`);
lines.push(`  return filterMovies({ broadcaster: filters.broadcaster ?? "all" }).length;`);
lines.push(`}`);
lines.push("");
lines.push(`export const MOVIE_QUESTIONS: MovieQuizQuestion[] = buildMovieQuestionsFromSeeds(MOVIES);`);

fs.writeFileSync(outPath, lines.join("\n"));
console.log(`Generated movie-quiz-data.ts with ${movies.length} movies`);
