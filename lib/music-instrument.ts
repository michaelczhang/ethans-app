export type MusicInstrument =
  | "piano"
  | "guitar"
  | "flute"
  | "trumpet"
  | "violin"
  | "organ";

export const INSTRUMENTS: Record<
  MusicInstrument,
  { label: string; emoji: string; description: string }
> = {
  piano: {
    label: "Piano",
    emoji: "🎹",
    description: "Warm keys with harmonics",
  },
  guitar: {
    label: "Guitar",
    emoji: "🎸",
    description: "Plucked string tone",
  },
  flute: {
    label: "Flute",
    emoji: "🪈",
    description: "Airy breathy tone",
  },
  trumpet: {
    label: "Trumpet",
    emoji: "🎺",
    description: "Bright brass sound",
  },
  violin: {
    label: "Violin",
    emoji: "🎻",
    description: "Singing bowed strings",
  },
  organ: {
    label: "Organ",
    emoji: "🎼",
    description: "Sustained pipe tone",
  },
};

export const INSTRUMENT_KEYS = Object.keys(INSTRUMENTS) as MusicInstrument[];

const INSTRUMENT_STORAGE_KEY = "quiz-arena-music-instrument";

export function loadInstrument(): MusicInstrument {
  if (typeof window === "undefined") return "piano";
  const saved = localStorage.getItem(INSTRUMENT_STORAGE_KEY);
  if (saved && saved in INSTRUMENTS) return saved as MusicInstrument;
  return "piano";
}

export function saveInstrument(instrument: MusicInstrument): void {
  localStorage.setItem(INSTRUMENT_STORAGE_KEY, instrument);
}
