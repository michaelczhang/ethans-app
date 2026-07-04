export type MovieBroadcasterId =
  | "disney"
  | "pixar"
  | "dreamworks"
  | "universal"
  | "warner-bros"
  | "sony"
  | "netflix"
  | "paramount";

export type MovieBroadcasterFilter = MovieBroadcasterId | "all";

type BroadcasterProfile = {
  label: string;
  emoji: string;
  description: string;
};

export const MOVIE_BROADCASTERS: Record<MovieBroadcasterId, BroadcasterProfile> =
  {
    disney: {
      label: "Disney",
      emoji: "🏰",
      description: "Disney Animation classics and modern favorites",
    },
    pixar: {
      label: "Pixar",
      emoji: "💡",
      description: "Pixar animated adventures",
    },
    dreamworks: {
      label: "DreamWorks",
      emoji: "🌙",
      description: "DreamWorks Animation hits",
    },
    universal: {
      label: "Universal",
      emoji: "🌍",
      description: "Universal and Illumination family films",
    },
    "warner-bros": {
      label: "Warner Bros",
      emoji: "🎬",
      description: "Warner Bros family-friendly movies",
    },
    sony: {
      label: "Sony Pictures",
      emoji: "🕷️",
      description: "Sony animated and family films",
    },
    netflix: {
      label: "Netflix",
      emoji: "📺",
      description: "Netflix original family movies",
    },
    paramount: {
      label: "Paramount",
      emoji: "⭐",
      description: "Paramount family adventures",
    },
  };

export const BROADCASTER_ORDER: MovieBroadcasterId[] = [
  "disney",
  "pixar",
  "dreamworks",
  "universal",
  "warner-bros",
  "sony",
  "netflix",
  "paramount",
];

export const MOVIE_BROADCASTER_FILTERS: Record<
  MovieBroadcasterFilter,
  { label: string; emoji: string }
> = {
  all: { label: "All Studios", emoji: "🎥" },
  ...Object.fromEntries(
    BROADCASTER_ORDER.map((key) => [
      key,
      {
        label: MOVIE_BROADCASTERS[key].label,
        emoji: MOVIE_BROADCASTERS[key].emoji,
      },
    ]),
  ),
} as Record<MovieBroadcasterFilter, { label: string; emoji: string }>;

export const MOVIE_BROADCASTER_FILTER_KEYS: MovieBroadcasterFilter[] = [
  "all",
  ...BROADCASTER_ORDER,
];

const BROADCASTER_STORAGE_KEY = "quizzy-movie-broadcaster";

export function loadMovieBroadcaster(): MovieBroadcasterFilter {
  if (typeof window === "undefined") return "all";
  const saved = localStorage.getItem(BROADCASTER_STORAGE_KEY);
  if (saved && saved in MOVIE_BROADCASTER_FILTERS) {
    return saved as MovieBroadcasterFilter;
  }
  return "all";
}

export function saveMovieBroadcaster(broadcaster: MovieBroadcasterFilter): void {
  localStorage.setItem(BROADCASTER_STORAGE_KEY, broadcaster);
}

export function getAvailableBroadcasterIds(
  countForBroadcaster: (id: MovieBroadcasterId) => number,
): MovieBroadcasterId[] {
  return BROADCASTER_ORDER.filter((id) => countForBroadcaster(id) > 0);
}
