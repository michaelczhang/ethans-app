import type { QuizDifficulty } from "@/lib/quiz-difficulty";
import type { MusicInstrument } from "@/lib/music-instrument";

export interface PerfectPitchQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  note: string;
  pitchClass: string;
  octave: number;
  frequency: number;
  tier?: QuizDifficulty;
}

const NATURAL_PITCHES = ["C", "D", "E", "F", "G", "A", "B"] as const;
const CHROMATIC_PITCHES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as const;

const PITCH_SEMITONE: Record<string, number> = {
  C: 0,
  "C#": 1,
  Db: 1,
  D: 2,
  "D#": 3,
  Eb: 3,
  E: 4,
  F: 5,
  "F#": 6,
  Gb: 6,
  G: 7,
  "G#": 8,
  Ab: 8,
  A: 9,
  "A#": 10,
  Bb: 10,
  B: 11,
};

const ENHARMONIC: Record<string, string[]> = {
  C: ["C"],
  "C#": ["C#", "Db"],
  D: ["D"],
  "D#": ["D#", "Eb"],
  E: ["E"],
  F: ["F"],
  "F#": ["F#", "Gb"],
  G: ["G"],
  "G#": ["G#", "Ab"],
  A: ["A"],
  "A#": ["A#", "Bb"],
  B: ["B"],
};

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function noteToFrequency(pitchClass: string, octave: number): number {
  const semitone = PITCH_SEMITONE[pitchClass];
  if (semitone === undefined) throw new Error(`Unknown pitch: ${pitchClass}`);
  const midi = 12 * (octave + 1) + semitone;
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function questionLimit(difficulty: QuizDifficulty): number {
  switch (difficulty) {
    case "easy":
      return 10;
    case "medium":
      return 20;
    case "hard":
      return 24;
  }
}

function optionCount(difficulty: QuizDifficulty): number {
  return difficulty === "easy" ? 3 : 4;
}

function pitchPool(difficulty: QuizDifficulty): string[] {
  return difficulty === "easy"
    ? [...NATURAL_PITCHES]
    : [...CHROMATIC_PITCHES];
}

function octavePool(difficulty: QuizDifficulty): number[] {
  switch (difficulty) {
    case "easy":
      return [4];
    case "medium":
      return [3, 4, 5];
    case "hard":
      return [3, 4, 5, 6];
  }
}

function formatAnswer(
  pitchClass: string,
  octave: number,
  difficulty: QuizDifficulty,
): string {
  if (difficulty === "hard") return `${pitchClass}${octave}`;
  return pitchClass;
}

function pickDistractors(
  pool: string[],
  correct: string,
  count: number,
  seed: number,
): string[] {
  const candidates = pool.filter((value) => value !== correct);
  const start = seed % Math.max(candidates.length, 1);
  const picked: string[] = [];

  for (let i = 0; i < candidates.length && picked.length < count; i++) {
    const value = candidates[(start + i) % candidates.length];
    if (!picked.includes(value)) picked.push(value);
  }

  return picked;
}

export function generatePerfectPitchQuestions(
  difficulty: QuizDifficulty,
): PerfectPitchQuestion[] {
  const pitches = pitchPool(difficulty);
  const octaves = octavePool(difficulty);
  const candidates: { pitchClass: string; octave: number }[] = [];

  for (const octave of octaves) {
    for (const pitchClass of pitches) {
      candidates.push({ pitchClass, octave });
    }
  }

  const limit = Math.min(questionLimit(difficulty), candidates.length);
  const selected = shuffle(candidates).slice(0, limit);
  const answerPool = selected.map(({ pitchClass, octave }) =>
    formatAnswer(pitchClass, octave, difficulty),
  );

  return selected.map(({ pitchClass, octave }, index) => {
    const answer = formatAnswer(pitchClass, octave, difficulty);
    const choices = optionCount(difficulty);
    const distractors = pickDistractors(
      answerPool,
      answer,
      choices - 1,
      index,
    );
    const correctIndex = index % choices;
    const options = [...distractors];
    options.splice(correctIndex, 0, answer);

    return {
      id: `pp-${index + 1}`,
      question: "What note do you hear?",
      options: options.slice(0, choices),
      correctIndex,
      note: answer,
      pitchClass,
      octave,
      frequency: noteToFrequency(pitchClass, octave),
      tier: difficulty,
    };
  });
}

export function getAcceptedNoteAnswers(
  question: PerfectPitchQuestion,
  difficulty: QuizDifficulty,
): string[] {
  const aliases = ENHARMONIC[question.pitchClass] ?? [question.pitchClass];
  const accepted = new Set<string>();

  for (const pitch of aliases) {
    accepted.add(pitch);
    if (difficulty === "hard") {
      accepted.add(`${pitch}${question.octave}`);
    }
  }

  return [...accepted];
}

export function checkPerfectPitchAnswer(
  typed: string,
  question: PerfectPitchQuestion,
  difficulty: QuizDifficulty,
): boolean {
  const normalized = typed
    .toLowerCase()
    .trim()
    .replace(/sharp/g, "#")
    .replace(/flat/g, "b")
    .replace(/\s+/g, "");

  if (!normalized) return false;

  const accepted = getAcceptedNoteAnswers(question, difficulty).map((value) =>
    value.toLowerCase().replace(/\s+/g, ""),
  );

  return accepted.includes(normalized);
}

export function playInstrumentNote(
  audioContext: AudioContext,
  frequency: number,
  instrument: MusicInstrument,
  duration = 1.4,
): void {
  const now = audioContext.currentTime;

  switch (instrument) {
    case "piano":
      playHarmonicStack(audioContext, frequency, duration, now, [1, 2, 3, 4], [
        1, 0.5, 0.25, 0.15,
      ], "sine", 0.01, 0.08);
      break;
    case "guitar":
      playPluck(audioContext, frequency, duration, now, "triangle", 0.35);
      break;
    case "flute":
      playSustained(audioContext, frequency, duration, now, "sine", 0.22, 0.12, 0.08, true);
      break;
    case "trumpet":
      playBrass(audioContext, frequency, duration, now);
      break;
    case "violin":
      playSustained(audioContext, frequency, duration, now, "sawtooth", 0.14, 0.1, 0.15, true);
      break;
    case "organ":
      playHarmonicStack(audioContext, frequency, duration * 1.1, now, [1, 2, 3], [0.35, 0.2, 0.1], "sine", 0.04, 0.2);
      break;
  }
}

function playHarmonicStack(
  audioContext: AudioContext,
  frequency: number,
  duration: number,
  now: number,
  harmonics: number[],
  volumes: number[],
  type: OscillatorType,
  attack: number,
  release: number,
): void {
  harmonics.forEach((harmonic, index) => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = type;
    osc.frequency.value = frequency * harmonic;
    const peak = volumes[index] ?? 0.1;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(peak, now + attack);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start(now);
    osc.stop(now + duration + release);
  });
}

function playPluck(
  audioContext: AudioContext,
  frequency: number,
  duration: number,
  now: number,
  type: OscillatorType,
  volume: number,
): void {
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = frequency * 4;
  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.85);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);
  osc.start(now);
  osc.stop(now + duration);
}

function playSustained(
  audioContext: AudioContext,
  frequency: number,
  duration: number,
  now: number,
  type: OscillatorType,
  volume: number,
  attack: number,
  release: number,
  vibrato: boolean,
): void {
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = type;
  osc.frequency.value = frequency;

  if (vibrato) {
    const lfo = audioContext.createOscillator();
    const lfoGain = audioContext.createGain();
    lfo.frequency.value = 5.5;
    lfoGain.gain.value = frequency * 0.012;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start(now);
    lfo.stop(now + duration + release);
  }

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume, now + attack);
  gain.gain.setValueAtTime(volume, now + duration - release);
  gain.gain.linearRampToValueAtTime(0, now + duration);
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.start(now);
  osc.stop(now + duration + 0.05);
}

function playBrass(
  audioContext: AudioContext,
  frequency: number,
  duration: number,
  now: number,
): void {
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = frequency * 2.2;
  filter.Q.value = 1.2;
  osc.type = "sawtooth";
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.18, now + 0.06);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);
  osc.start(now);
  osc.stop(now + duration);
}

export function getPerfectPitchQuestionCount(
  difficulty: QuizDifficulty,
): number {
  return questionLimit(difficulty);
}
