export type MusicArtistId =
  | "bts"
  | "one-republic"
  | "queen"
  | "michael-jackson"
  | "coldplay"
  | "taylor-swift"
  | "ed-sheeran"
  | "adele"
  | "harry-styles"
  | "imagine-dragons"
  | "the-beatles"
  | "bruno-mars"
  | "lady-gaga"
  | "journey"
  | "bon-jovi"
  | "oasis"
  | "nirvana"
  | "the-weeknd"
  | "billie-eilish"
  | "dua-lipa"
  | "post-malone"
  | "psy"
  | "justin-timberlake"
  | "katy-perry"
  | "the-killers"
  | "mark-ronson"
  | "pharrell-williams"
  | "eagles"
  | "guns-n-roses"
  | "survivor"
  | "toto"
  | "a-ha"
  | "rick-astley"
  | "neil-diamond"
  | "lil-nas-x"
  | "shawn-mendes"
  | "britney-spears"
  | "beyonce"
  | "miley-cyrus"
  | "lorde"
  | "carly-rae-jepsen"
  | "luis-fonsi"
  | "the-chainsmokers"
  | "green-day"
  | "goo-goo-dolls"
  | "foster-the-people"
  | "the-white-stripes";

export type MusicArtistFilter = MusicArtistId | "all";

type ArtistProfile = {
  label: string;
  emoji: string;
  patterns: string[];
};

export const FEATURED_ARTISTS: Record<MusicArtistId, ArtistProfile> = {
  bts: { label: "BTS", emoji: "💜", patterns: ["bts"] },
  "one-republic": { label: "OneRepublic", emoji: "🌟", patterns: ["onerepublic", "one republic"] },
  queen: { label: "Queen", emoji: "👑", patterns: ["queen"] },
  "michael-jackson": { label: "Michael Jackson", emoji: "🕺", patterns: ["michael jackson"] },
  coldplay: { label: "Coldplay", emoji: "🌙", patterns: ["coldplay"] },
  "taylor-swift": { label: "Taylor Swift", emoji: "✨", patterns: ["taylor swift"] },
  "ed-sheeran": { label: "Ed Sheeran", emoji: "🎸", patterns: ["ed sheeran"] },
  adele: { label: "Adele", emoji: "🎙️", patterns: ["adele"] },
  "harry-styles": { label: "Harry Styles", emoji: "🍉", patterns: ["harry styles"] },
  "imagine-dragons": { label: "Imagine Dragons", emoji: "🐉", patterns: ["imagine dragons"] },
  "the-beatles": { label: "The Beatles", emoji: "🪲", patterns: ["the beatles", "beatles"] },
  "bruno-mars": { label: "Bruno Mars", emoji: "🔥", patterns: ["bruno mars"] },
  "lady-gaga": { label: "Lady Gaga", emoji: "⚡", patterns: ["lady gaga"] },
  journey: { label: "Journey", emoji: "🛤️", patterns: ["journey"] },
  "bon-jovi": { label: "Bon Jovi", emoji: "🎤", patterns: ["bon jovi"] },
  oasis: { label: "Oasis", emoji: "🌴", patterns: ["oasis"] },
  nirvana: { label: "Nirvana", emoji: "😎", patterns: ["nirvana"] },
  "the-weeknd": { label: "The Weeknd", emoji: "🌃", patterns: ["the weeknd", "weeknd"] },
  "billie-eilish": { label: "Billie Eilish", emoji: "💚", patterns: ["billie eilish"] },
  "dua-lipa": { label: "Dua Lipa", emoji: "💃", patterns: ["dua lipa"] },
  "post-malone": { label: "Post Malone", emoji: "🎩", patterns: ["post malone"] },
  psy: { label: "PSY", emoji: "🐴", patterns: ["psy"] },
  "justin-timberlake": { label: "Justin Timberlake", emoji: "🕴️", patterns: ["justin timberlake"] },
  "katy-perry": { label: "Katy Perry", emoji: "🎆", patterns: ["katy perry"] },
  "the-killers": { label: "The Killers", emoji: "🎯", patterns: ["the killers"] },
  "mark-ronson": { label: "Mark Ronson", emoji: "🎷", patterns: ["mark ronson"] },
  "pharrell-williams": { label: "Pharrell Williams", emoji: "😊", patterns: ["pharrell williams"] },
  eagles: { label: "Eagles", emoji: "🦅", patterns: ["eagles"] },
  "guns-n-roses": { label: "Guns N' Roses", emoji: "🌹", patterns: ["guns n roses", "guns n' roses"] },
  survivor: { label: "Survivor", emoji: "🐯", patterns: ["survivor"] },
  toto: { label: "Toto", emoji: "🌍", patterns: ["toto"] },
  "a-ha": { label: "a-ha", emoji: "📼", patterns: ["aha", "a ha"] },
  "rick-astley": { label: "Rick Astley", emoji: "🕺", patterns: ["rick astley"] },
  "neil-diamond": { label: "Neil Diamond", emoji: "💎", patterns: ["neil diamond"] },
  "lil-nas-x": { label: "Lil Nas X", emoji: "🤠", patterns: ["lil nas x"] },
  "shawn-mendes": { label: "Shawn Mendes", emoji: "🎶", patterns: ["shawn mendes", "camila cabello"] },
  "britney-spears": { label: "Britney Spears", emoji: "⭐", patterns: ["britney spears"] },
  beyonce: { label: "Beyoncé", emoji: "👑", patterns: ["beyonce", "beyoncé", "jay z", "jay-z"] },
  "miley-cyrus": { label: "Miley Cyrus", emoji: "🎉", patterns: ["miley cyrus"] },
  lorde: { label: "Lorde", emoji: "👑", patterns: ["lorde"] },
  "carly-rae-jepsen": { label: "Carly Rae Jepsen", emoji: "☎️", patterns: ["carly rae jepsen"] },
  "luis-fonsi": { label: "Luis Fonsi", emoji: "🌴", patterns: ["luis fonsi", "daddy yankee"] },
  "the-chainsmokers": { label: "The Chainsmokers", emoji: "🔗", patterns: ["the chainsmokers", "chainsmokers"] },
  "green-day": { label: "Green Day", emoji: "🎸", patterns: ["green day"] },
  "goo-goo-dolls": { label: "Goo Goo Dolls", emoji: "🎵", patterns: ["goo goo dolls"] },
  "foster-the-people": { label: "Foster the People", emoji: "👟", patterns: ["foster the people"] },
  "the-white-stripes": { label: "The White Stripes", emoji: "🎸", patterns: ["the white stripes", "white stripes"] },
};

/** Curated display order — popular picks first. */
export const FEATURED_ARTIST_ORDER: MusicArtistId[] = [
  "bts",
  "one-republic",
  "queen",
  "michael-jackson",
  "taylor-swift",
  "coldplay",
  "harry-styles",
  "ed-sheeran",
  "adele",
  "imagine-dragons",
  "the-beatles",
  "bruno-mars",
  "lady-gaga",
  "the-weeknd",
  "billie-eilish",
  "dua-lipa",
  "journey",
  "bon-jovi",
  "oasis",
  "nirvana",
  "post-malone",
  "justin-timberlake",
  "katy-perry",
  "the-killers",
  "mark-ronson",
  "psy",
  "eagles",
  "guns-n-roses",
  "toto",
  "a-ha",
  "rick-astley",
  "neil-diamond",
  "lil-nas-x",
  "shawn-mendes",
  "britney-spears",
  "beyonce",
  "miley-cyrus",
  "lorde",
  "carly-rae-jepsen",
  "luis-fonsi",
  "the-chainsmokers",
  "pharrell-williams",
  "survivor",
  "goo-goo-dolls",
  "foster-the-people",
  "the-white-stripes",
  "green-day",
];

export const MUSIC_ARTIST_FILTERS: Record<
  MusicArtistFilter,
  { label: string; emoji: string }
> = {
  all: { label: "All Artists", emoji: "🎤" },
  ...Object.fromEntries(
    (Object.keys(FEATURED_ARTISTS) as MusicArtistId[]).map((key) => [
      key,
      {
        label: FEATURED_ARTISTS[key].label,
        emoji: FEATURED_ARTISTS[key].emoji,
      },
    ]),
  ),
} as Record<MusicArtistFilter, { label: string; emoji: string }>;

const ARTIST_STORAGE_KEY = "quiz-arena-music-artist";

function normalizeArtist(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

type ArtistMatchable = {
  artist: string;
  artistAliases?: string[];
};

export function trackMatchesArtist(
  track: ArtistMatchable,
  artistId: MusicArtistId,
): boolean {
  const patterns = FEATURED_ARTISTS[artistId].patterns.map(normalizeArtist);
  const names = [track.artist, ...(track.artistAliases ?? [])].map(
    normalizeArtist,
  );

  return names.some((name) =>
    patterns.some((pattern) => name.includes(pattern) || pattern.includes(name)),
  );
}

export function loadMusicArtist(): MusicArtistFilter {
  if (typeof window === "undefined") return "all";
  const saved = localStorage.getItem(ARTIST_STORAGE_KEY);
  if (saved && saved in MUSIC_ARTIST_FILTERS) return saved as MusicArtistFilter;
  return "all";
}

export function saveMusicArtist(artist: MusicArtistFilter): void {
  localStorage.setItem(ARTIST_STORAGE_KEY, artist);
}

export function getAvailableArtistIds(
  countForArtist: (artistId: MusicArtistId) => number,
): MusicArtistId[] {
  return FEATURED_ARTIST_ORDER.filter((id) => countForArtist(id) > 0);
}
