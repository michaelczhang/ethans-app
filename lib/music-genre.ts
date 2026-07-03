export type MusicGenre = "pop" | "rock" | "k-pop" | "hip-hop" | "classic";

export type MusicGenreFilter = MusicGenre | "all";

export const MUSIC_GENRES: Record<
  MusicGenre,
  { label: string; emoji: string; description: string }
> = {
  pop: {
    label: "Pop",
    emoji: "🎤",
    description: "Chart hits and mainstream favorites",
  },
  rock: {
    label: "Rock",
    emoji: "🎸",
    description: "Classic and modern rock anthems",
  },
  "k-pop": {
    label: "K-Pop",
    emoji: "💜",
    description: "Korean pop — BTS, PSY, and more",
  },
  "hip-hop": {
    label: "Hip-Hop & R&B",
    emoji: "🎧",
    description: "Hip-hop, rap, and R&B grooves",
  },
  classic: {
    label: "Classics",
    emoji: "📻",
    description: "Timeless hits from past decades",
  },
};

export const MUSIC_GENRE_KEYS = Object.keys(MUSIC_GENRES) as MusicGenre[];

export const MUSIC_GENRE_FILTERS: Record<
  MusicGenreFilter,
  { label: string; emoji: string }
> = {
  all: { label: "All Genres", emoji: "🎶" },
  ...Object.fromEntries(
    MUSIC_GENRE_KEYS.map((key) => [
      key,
      { label: MUSIC_GENRES[key].label, emoji: MUSIC_GENRES[key].emoji },
    ]),
  ),
} as Record<MusicGenreFilter, { label: string; emoji: string }>;

export const MUSIC_GENRE_FILTER_KEYS: MusicGenreFilter[] = [
  "all",
  ...MUSIC_GENRE_KEYS,
];

const GENRE_STORAGE_KEY = "quiz-arena-music-genre";

export function loadMusicGenre(): MusicGenreFilter {
  if (typeof window === "undefined") return "all";
  const saved = localStorage.getItem(GENRE_STORAGE_KEY);
  if (saved && saved in MUSIC_GENRE_FILTERS) return saved as MusicGenreFilter;
  return "all";
}

export function saveMusicGenre(genre: MusicGenreFilter): void {
  localStorage.setItem(GENRE_STORAGE_KEY, genre);
}
