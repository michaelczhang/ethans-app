import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "music");
const SAMPLE_RATE = 44100;

const FREQ = {
  A3: 220.0,
  "F#4": 369.99,
  B3: 246.94,
  C4: 261.63,
  "C#4": 277.18,
  D4: 293.66,
  Eb4: 311.13,
  E4: 329.63,
  F4: 349.23,
  G4: 392.0,
  "G#4": 415.3,
  Ab4: 415.3,
  A4: 440.0,
  Bb4: 466.16,
  B4: 493.88,
  "C#5": 554.37,
  C5: 523.25,
  Eb5: 622.25,
  D5: 587.33,
  "D#5": 622.25,
  E5: 659.25,
  "F#5": 739.99,
  F5: 698.46,
  Ab5: 830.61,
  G5: 783.99,
  A5: 880.0,
};

/** @type {Record<string, [string, number][]>} */
const MELODIES = {
  "twinkle-twinkle": [
    ["C4", 0.45],
    ["C4", 0.45],
    ["G4", 0.45],
    ["G4", 0.45],
    ["A4", 0.45],
    ["A4", 0.45],
    ["G4", 0.9],
    ["F4", 0.45],
    ["F4", 0.45],
    ["E4", 0.45],
    ["E4", 0.45],
    ["D4", 0.45],
    ["D4", 0.45],
    ["C4", 0.9],
  ],
  "happy-birthday": [
    ["C4", 0.35],
    ["C4", 0.15],
    ["D4", 0.5],
    ["C4", 0.5],
    ["F4", 0.5],
    ["E4", 0.75],
    ["C4", 0.35],
    ["C4", 0.15],
    ["D4", 0.5],
    ["C4", 0.5],
    ["G4", 0.5],
    ["F4", 0.9],
  ],
  "mary-had-a-little-lamb": [
    ["E4", 0.4],
    ["D4", 0.4],
    ["C4", 0.4],
    ["D4", 0.4],
    ["E4", 0.4],
    ["E4", 0.4],
    ["E4", 0.8],
    ["D4", 0.4],
    ["D4", 0.4],
    ["D4", 0.8],
    ["E4", 0.4],
    ["G4", 0.4],
    ["G4", 0.8],
  ],
  "ode-to-joy": [
    ["E4", 0.4],
    ["E4", 0.4],
    ["F4", 0.4],
    ["G4", 0.4],
    ["G4", 0.4],
    ["F4", 0.4],
    ["E4", 0.4],
    ["D4", 0.4],
    ["C4", 0.4],
    ["C4", 0.4],
    ["D4", 0.4],
    ["E4", 0.4],
    ["E4", 0.55],
    ["D4", 0.25],
    ["D4", 0.8],
  ],
  "fur-elise": [
    ["E5", 0.35],
    ["D#5", 0.35],
    ["E5", 0.35],
    ["D#5", 0.35],
    ["E5", 0.35],
    ["B4", 0.35],
    ["D5", 0.35],
    ["C5", 0.35],
    ["A4", 0.7],
    ["C4", 0.35],
    ["E4", 0.35],
    ["A4", 0.35],
    ["B4", 0.7],
  ],
  "beethoven-fifth": [
    ["G4", 0.25],
    ["G4", 0.25],
    ["G4", 0.25],
    ["Eb4", 0.7],
    ["F4", 0.25],
    ["F4", 0.25],
    ["F4", 0.25],
    ["D4", 0.7],
    ["G4", 0.25],
    ["G4", 0.25],
    ["G4", 0.25],
    ["Eb4", 0.7],
  ],
  "the-entertainer": [
    ["C5", 0.3],
    ["E5", 0.15],
    ["C5", 0.3],
    ["A4", 0.3],
    ["B4", 0.3],
    ["G4", 0.3],
    ["A4", 0.3],
    ["C5", 0.3],
    ["E5", 0.15],
    ["C5", 0.3],
    ["A4", 0.6],
  ],
  "canon-in-d": [
    ["F#4", 0.5],
    ["E4", 0.5],
    ["D4", 0.5],
    ["F#4", 0.5],
    ["E4", 0.5],
    ["D4", 0.5],
    ["F#4", 0.5],
    ["E4", 0.5],
    ["D4", 0.5],
    ["A3", 0.5],
    ["F#4", 0.5],
    ["E4", 0.5],
    ["D4", 0.5],
  ],
  "mountain-king": [
    ["A3", 0.25],
    ["A3", 0.25],
    ["B3", 0.25],
    ["C4", 0.25],
    ["C4", 0.25],
    ["B3", 0.25],
    ["A3", 0.25],
    ["B3", 0.25],
    ["C4", 0.25],
    ["C4", 0.25],
    ["C4", 0.25],
    ["C4", 0.25],
    ["C4", 0.25],
    ["B3", 0.25],
    ["B3", 0.25],
    ["B3", 0.25],
    ["B3", 0.25],
  ],
  "sugar-plum-fairy": [
    ["E5", 0.35],
    ["D5", 0.35],
    ["C5", 0.35],
    ["B4", 0.35],
    ["C5", 0.35],
    ["D5", 0.35],
    ["E5", 0.35],
    ["F5", 0.35],
    ["G5", 0.35],
    ["F5", 0.35],
    ["E5", 0.35],
    ["D5", 0.35],
    ["C5", 0.7],
  ],
  "william-tell": [
    ["C4", 0.25],
    ["C4", 0.25],
    ["C4", 0.25],
    ["C4", 0.25],
    ["E4", 0.25],
    ["G4", 0.25],
    ["C5", 0.5],
    ["G4", 0.25],
    ["C5", 0.75],
    ["E5", 0.25],
    ["G5", 0.25],
    ["C5", 0.5],
  ],
  "moonlight-sonata": [
    ["G#4", 0.55],
    ["C#5", 0.55],
    ["E5", 0.55],
    ["G#4", 0.55],
    ["C#5", 0.55],
    ["E5", 0.55],
    ["G#4", 0.55],
    ["C#5", 0.55],
    ["E5", 0.55],
    ["A4", 0.55],
    ["C#5", 0.55],
    ["E5", 0.55],
  ],
  "jingle-bells": [
    ["E4", 0.4],
    ["E4", 0.4],
    ["E4", 0.8],
    ["E4", 0.4],
    ["E4", 0.4],
    ["E4", 0.8],
    ["E4", 0.4],
    ["G4", 0.4],
    ["C4", 0.5],
    ["D4", 0.3],
    ["E4", 1.0],
  ],
  "row-row-row": [
    ["C4", 0.4],
    ["C4", 0.4],
    ["C4", 0.4],
    ["D4", 0.4],
    ["E4", 0.8],
    ["E4", 0.4],
    ["D4", 0.4],
    ["E4", 0.4],
    ["F4", 0.8],
    ["F4", 0.4],
    ["E4", 0.4],
    ["D4", 0.4],
    ["C4", 0.8],
  ],
  "when-the-saints": [
    ["C4", 0.4],
    ["E4", 0.4],
    ["G4", 0.4],
    ["C5", 0.6],
    ["E4", 0.4],
    ["C4", 0.4],
    ["E4", 0.4],
    ["G4", 0.8],
    ["G4", 0.4],
    ["G4", 0.4],
    ["E4", 0.4],
    ["C4", 0.8],
  ],
  "old-macdonald": [
    ["G4", 0.4],
    ["G4", 0.4],
    ["G4", 0.4],
    ["D4", 0.4],
    ["E4", 0.4],
    ["E4", 0.4],
    ["D4", 0.8],
    ["B4", 0.4],
    ["B4", 0.4],
    ["A4", 0.4],
    ["G4", 0.8],
  ],
  "london-bridge": [
    ["G4", 0.4],
    ["A4", 0.4],
    ["G4", 0.4],
    ["F4", 0.4],
    ["E4", 0.4],
    ["F4", 0.4],
    ["G4", 0.8],
    ["D4", 0.4],
    ["E4", 0.4],
    ["F4", 0.8],
    ["G4", 0.4],
    ["A4", 0.4],
    ["G4", 0.8],
  ],
  "flight-of-the-bumblebee": [
    ["A4", 0.12],
    ["Bb4", 0.12],
    ["B4", 0.12],
    ["C5", 0.12],
    ["C#5", 0.12],
    ["D5", 0.12],
    ["Eb5", 0.12],
    ["E5", 0.12],
    ["F5", 0.12],
    ["F#5", 0.12],
    ["G5", 0.12],
    ["Ab5", 0.12],
    ["A5", 0.12],
    ["G5", 0.12],
    ["F#5", 0.12],
    ["F5", 0.12],
    ["E5", 0.12],
    ["Eb5", 0.12],
    ["D5", 0.12],
    ["C#5", 0.12],
    ["C5", 0.12],
    ["B4", 0.12],
    ["Bb4", 0.12],
    ["A4", 0.24],
  ],
  "turkish-march": [
    ["B4", 0.3],
    ["C5", 0.3],
    ["D5", 0.3],
    ["E5", 0.3],
    ["C5", 0.3],
    ["A4", 0.3],
    ["A4", 0.6],
    ["D5", 0.3],
    ["C5", 0.3],
    ["B4", 0.3],
    ["A4", 0.3],
    ["B4", 0.3],
    ["C5", 0.6],
  ],
  "blue-danube": [
    ["D4", 0.45],
    ["A3", 0.45],
    ["F#4", 0.45],
    ["D4", 0.45],
    ["A3", 0.45],
    ["F#4", 0.45],
    ["D4", 0.45],
    ["A3", 0.45],
    ["F#4", 0.45],
    ["D4", 0.45],
    ["A3", 0.45],
    ["F#4", 0.45],
  ],
};

function generateTone(freq, durationSec, volume = 0.28) {
  const attack = Math.floor(SAMPLE_RATE * 0.015);
  const release = Math.floor(SAMPLE_RATE * 0.08);
  const samples = Math.max(1, Math.floor(SAMPLE_RATE * durationSec));
  const data = new Float32Array(samples);

  for (let i = 0; i < samples; i++) {
    const t = i / SAMPLE_RATE;
    let env = 1;
    if (i < attack) env = i / attack;
    if (i > samples - release) env = Math.max(0, (samples - i) / release);
    data[i] = Math.sin(2 * Math.PI * freq * t) * volume * env;
  }

  return data;
}

function renderMelody(notes) {
  const parts = notes.map(([note, duration]) => {
    const freq = FREQ[note];
    if (!freq) throw new Error(`Unknown note: ${note}`);
    return generateTone(freq, duration);
  });

  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const output = new Float32Array(total);
  let offset = 0;
  for (const part of parts) {
    output.set(part, offset);
    offset += part.length;
  }
  return output;
}

function writeWav(filePath, samples) {
  const buffer = Buffer.alloc(44 + samples.length * 2);
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + samples.length * 2, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(samples.length * 2, 40);

  for (let i = 0; i < samples.length; i++) {
    const clamped = Math.max(-1, Math.min(1, samples[i]));
    buffer.writeInt16LE(Math.round(clamped * 32767), 44 + i * 2);
  }

  fs.writeFileSync(filePath, buffer);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const [slug, notes] of Object.entries(MELODIES)) {
  const samples = renderMelody(notes);
  const filePath = path.join(OUT_DIR, `${slug}.wav`);
  writeWav(filePath, samples);
  console.log(`Wrote ${filePath}`);
}

console.log(`Generated ${Object.keys(MELODIES).length} clips in ${OUT_DIR}`);
