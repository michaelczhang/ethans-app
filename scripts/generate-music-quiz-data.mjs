import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tracks = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "lib", "music-tracks.json"), "utf8"),
);

function esc(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function formatTrack(track) {
  const lines = [
    `  {`,
    `    id: "${track.id}",`,
    `    songTitle: "${esc(track.songTitle)}",`,
    `    artist: "${esc(track.artist)}",`,
    `    audio:`,
    `      "${esc(track.audio)}",`,
    `    genre: "${track.genre ?? "pop"}",`,
  ];
  if (track.songAliases?.length) {
    lines.push(
      `    songAliases: [${track.songAliases.map((a) => `"${esc(a)}"`).join(", ")}],`,
    );
  }
  if (track.artistAliases?.length) {
    lines.push(
      `    artistAliases: [${track.artistAliases.map((a) => `"${esc(a)}"`).join(", ")}],`,
    );
  }
  lines.push(`    tier: "${track.tier ?? "medium"}",`, `  },`);
  return lines.join("\n");
}

const body = `import type { MusicQuizQuestion } from "@/lib/quiz-data";
import type { MusicGenre, MusicGenreFilter } from "@/lib/music-genre";

/** Seconds of each preview clip to play (iTunes previews are ~30s; we trim to the opening). */
export const MUSIC_CLIP_SECONDS = 15;

type TrackSeed = {
  id: string;
  songTitle: string;
  artist: string;
  audio: string;
  genre: MusicGenre;
  songAliases?: string[];
  artistAliases?: string[];
  tier?: "easy" | "medium" | "hard";
};

const TRACKS: TrackSeed[] = [
${tracks.map(formatTrack).join("\n")}
];

function pickDistractors(titles: string[], correct: string, seed: number): string[] {
  const pool = titles.filter((title) => title !== correct);
  const start = seed % Math.max(pool.length, 1);
  const picked: string[] = [];
  for (let i = 0; i < pool.length && picked.length < 3; i++) {
    const title = pool[(start + i) % pool.length];
    if (!picked.includes(title)) picked.push(title);
  }
  return picked;
}

function buildMusicQuestionsFromTracks(seedTracks: TrackSeed[]): MusicQuizQuestion[] {
  const titles = seedTracks.map((track) => track.songTitle);

  return seedTracks.map((track, index) => {
    const distractors = pickDistractors(titles, track.songTitle, index);
    const correctIndex = index % 4;
    const options = [...distractors];
    options.splice(correctIndex, 0, track.songTitle);

    return {
      id: track.id,
      question: "What song is playing?",
      options: options.slice(0, 4),
      correctIndex,
      audio: track.audio,
      artist: track.artist,
      songTitle: track.songTitle,
      songAliases: track.songAliases,
      artistAliases: track.artistAliases,
      genre: track.genre,
      tier: track.tier,
    };
  });
}

export function buildMusicQuestions(): MusicQuizQuestion[] {
  return buildMusicQuestionsFromTracks(TRACKS);
}

export function getMusicQuestionsForGenre(
  genre: MusicGenreFilter,
): MusicQuizQuestion[] {
  if (genre === "all") return buildMusicQuestions();
  return buildMusicQuestionsFromTracks(TRACKS.filter((track) => track.genre === genre));
}

export function getMusicTrackCount(genre: MusicGenreFilter = "all"): number {
  if (genre === "all") return TRACKS.length;
  return TRACKS.filter((track) => track.genre === genre).length;
}

export const MUSIC_QUESTIONS: MusicQuizQuestion[] = buildMusicQuestions();
`;

fs.writeFileSync(path.join(__dirname, "..", "lib", "music-quiz-data.ts"), body);
console.log(`Generated music-quiz-data.ts with ${tracks.length} tracks`);
