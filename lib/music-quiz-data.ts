import type { MusicQuizQuestion } from "@/lib/quiz-data";
import {
  trackMatchesArtist,
  type MusicArtistFilter,
} from "@/lib/music-artist";
import type { MusicGenre, MusicGenreFilter } from "@/lib/music-genre";

/** Seconds of each preview clip to play (iTunes previews are ~30s; we trim to the opening). */
export const MUSIC_CLIP_SECONDS = 15;

export type TrackExplicitness = "notExplicit" | "cleaned";

export type TrackSeed = {
  id: string;
  songTitle: string;
  artist: string;
  audio: string;
  genre: MusicGenre;
  explicitness: TrackExplicitness;
  songAliases?: string[];
  artistAliases?: string[];
  tier?: "easy" | "medium" | "hard";
};

function isCleanTrack(track: TrackSeed): boolean {
  return track.explicitness === "notExplicit" || track.explicitness === "cleaned";
}

export type MusicFilters = {
  genre: MusicGenreFilter;
  artist: MusicArtistFilter;
};

export const TRACKS: TrackSeed[] = [
  {
    id: "music-1",
    songTitle: "Billie Jean",
    artist: "Michael Jackson",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/dc/bc/8a/dcbc8a3e-4ce1-c00d-cc02-eda2212053c7/mzaf_8347559338388601510.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-2",
    songTitle: "Thriller",
    artist: "Michael Jackson",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/58/8c/cb/588ccb9a-ab79-4a38-43b5-d4c24ea42859/mzaf_2083607504726567992.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-3",
    songTitle: "Beat It",
    artist: "Michael Jackson",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/88/cd/46/88cd46bd-dba7-1dc2-a63b-e8c111ac4fc3/mzaf_4042555053237612653.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-4",
    songTitle: "Never Gonna Give You Up",
    artist: "Rick Astley",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/3a/d6/9a/3ad69a5b-1fdc-c0ca-069b-541cef78e9d6/mzaf_12029354858253493617.plus.aac.p.m4a",
    genre: "classic",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-5",
    songTitle: "Take On Me",
    artist: "a-ha",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f2/03/4f/f2034f41-707f-7111-bc63-e5d3cf7f2240/mzaf_17215043934336702540.plus.aac.p.m4a",
    genre: "classic",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-6",
    songTitle: "Don't Stop Believin'",
    artist: "Journey",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/94/f7/d7/94f7d709-811c-3af5-f35a-9601591eb3eb/mzaf_10178220480141203357.plus.aac.p.m4a",
    genre: "rock",
    songAliases: ["Dont Stop Believin"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-7",
    songTitle: "Sweet Caroline",
    artist: "Neil Diamond",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ad/4f/a3/ad4fa361-9ee5-0799-1ca7-6900ffecc216/mzaf_11795694173831798173.plus.aac.p.m4a",
    genre: "classic",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-8",
    songTitle: "Livin' On a Prayer",
    artist: "Bon Jovi",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/75/15/30/75153020-b7c4-7958-8907-4aa1b965dc24/mzaf_2377504467597068152.plus.aac.p.m4a",
    genre: "rock",
    songAliases: ["Living on a Prayer", "Livin On a Prayer"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-9",
    songTitle: "Eye of the Tiger",
    artist: "Survivor",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/fe/fa/9e/fefa9edd-c023-4d1c-1012-08bfb0ec69e6/mzaf_4651653238471209843.plus.aac.p.m4a",
    genre: "rock",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-10",
    songTitle: "We Will Rock You",
    artist: "Queen",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e9/37/42/e9374231-9cef-ad56-365c-a7ba09e4fa55/mzaf_10566507321838390251.plus.aac.p.m4a",
    genre: "rock",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-11",
    songTitle: "Bohemian Rhapsody",
    artist: "Queen",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/8f/11/52/8f1152a9-fd5f-0021-f546-b97579c22ec3/mzaf_3962258993076347789.plus.aac.p.m4a",
    genre: "rock",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-12",
    songTitle: "Another One Bites the Dust",
    artist: "Queen",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/47/61/3c/47613c3e-de3e-b2a0-8d36-d05a6619f1d3/mzaf_16109120005998758960.plus.aac.p.m4a",
    genre: "rock",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-13",
    songTitle: "Africa",
    artist: "Toto",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/12/e5/ba/12e5ba45-05c1-7060-25a8-c9b718e7f6e8/mzaf_4488601364870711408.plus.aac.p.m4a",
    genre: "rock",
    artistAliases: ["Toto"],
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-14",
    songTitle: "Wonderwall",
    artist: "Oasis",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ab/16/93/ab16933c-6203-3db9-9da9-513ff1c8496d/mzaf_16993612140334549994.plus.aac.p.m4a",
    genre: "rock",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-15",
    songTitle: "Mr. Brightside",
    artist: "The Killers",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b3/95/6e/b3956e14-35f0-937e-afb0-72774d3f613f/mzaf_8359343604382181711.plus.aac.p.m4a",
    genre: "rock",
    songAliases: ["Mr Brightside"],
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-16",
    songTitle: "Shake It Off",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/11/d5/6d/11d56d4a-ce23-e793-8681-70dc4d35d931/mzaf_5886436202259848624.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-17",
    songTitle: "Happy (From \"Despicable Me 2\")",
    artist: "Pharrell Williams",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/4c/ba/89/4cba89f1-1a8a-3f33-b3ac-d88bcad8b996/mzaf_17135561476274403451.plus.aac.p.m4a",
    genre: "pop",
    songAliases: ["Happy From Despicable Me 2"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-18",
    songTitle: "CAN'T STOP THE FEELING!",
    artist: "Justin Timberlake",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/86/41/2d/86412d20-2f4d-39fc-221b-3f643d7c99c6/mzaf_9909715182585785919.plus.aac.p.m4a",
    genre: "pop",
    songAliases: ["Cant Stop the Feeling"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-19",
    songTitle: "Blinding Lights",
    artist: "The Weeknd",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/17/b4/8f/17b48f9a-0b93-6bb8-fe1d-3a16623c2cfb/mzaf_9560252727299052414.plus.aac.p.m4a",
    genre: "pop",
    artistAliases: ["Weeknd"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-20",
    songTitle: "Shape of You",
    artist: "Ed Sheeran",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/44/c7/4f/44c74f0d-72dc-6143-d4d0-ba14d661ca0d/mzaf_9566898362556366703.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-21",
    songTitle: "Rolling in the Deep",
    artist: "Adele",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/9f/07/1d/9f071dc7-791c-c869-dfa2-06b25936a287/mzaf_11077490630806345321.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-22",
    songTitle: "Uptown Funk (feat. Bruno Mars)",
    artist: "Mark Ronson",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/62/e1/98/62e19826-cd13-6eff-390e-dbca502bb7b5/mzaf_8006535252627949661.plus.aac.p.m4a",
    genre: "hip-hop",
    songAliases: ["Uptown Funk feat Bruno Mars"],
    artistAliases: ["Bruno Mars", "Mark Ronson"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-23",
    songTitle: "Viva La Vida",
    artist: "Coldplay",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/2b/04/65/2b0465c3-2db1-e461-2362-14b528456b8f/mzaf_1805426141027060154.plus.aac.p.m4a",
    genre: "rock",
    songAliases: ["Viva La Vida"],
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-24",
    songTitle: "Counting Stars",
    artist: "OneRepublic",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b0/db/7f/b0db7fbe-f8ff-1f67-fe72-ca8185ffbca2/mzaf_15298650366584767800.plus.aac.p.m4a",
    genre: "rock",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-25",
    songTitle: "bad guy",
    artist: "Billie Eilish",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/c3/87/1f/c3871f7e-3260-d615-1c66-5fdca2c3a48f/mzaf_10721331211699880949.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-26",
    songTitle: "Levitating",
    artist: "Dua Lipa",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/59/dc/4d/59dc4dda-93ff-8f1c-c536-f005f6ea6af5/mzaf_3066686759813252385.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-27",
    songTitle: "Watermelon Sugar",
    artist: "Harry Styles",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/16/86/f5/1686f50d-8b77-7e32-85f7-5f0e804d68fe/mzaf_14195633304344507287.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-28",
    songTitle: "As It Was",
    artist: "Harry Styles",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/67/10/16/67101606-3869-ca44-6c03-e13d6322cb51/mzaf_1135399237022217274.plus.aac.p.m4a",
    genre: "pop",
    songAliases: ["Bad Guy"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-29",
    songTitle: "Old Town Road",
    artist: "Lil Nas X",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/9b/1f/b9/9b1fb99c-9111-91da-9296-5ab8d82028ee/mzaf_11237315064991720435.plus.aac.p.m4a",
    genre: "hip-hop",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-30",
    songTitle: "Sunflower (Spider-Man: Into the Spider-Verse)",
    artist: "Post Malone & Swae Lee",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/98/f0/d6/98f0d67e-f8bf-762d-cac7-1c6b3b6b35dd/mzaf_4543283896248560946.plus.aac.p.m4a",
    genre: "hip-hop",
    songAliases: ["Sunflower Spider-Man"],
    artistAliases: ["Post Malone", "Swae Lee"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-31",
    songTitle: "Believer",
    artist: "Imagine Dragons",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c0/3f/36/c03f367a-b66b-fd0a-a54c-30f8250c4410/mzaf_12768434238801682952.plus.aac.p.m4a",
    genre: "rock",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-32",
    songTitle: "Radioactive",
    artist: "Imagine Dragons",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/77/70/88/777088e9-60a1-c459-bfa5-6e66f2fd2695/mzaf_7685408661765681881.plus.aac.p.m4a",
    genre: "rock",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-33",
    songTitle: "Smells Like Teen Spirit",
    artist: "Nirvana",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/a6/53/1e/a6531efa-397c-eb73-ecab-9b2790c1471e/mzaf_16440344883389407474.plus.aac.p.m4a",
    genre: "rock",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-34",
    songTitle: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/a5/82/2d/a5822d67-2e65-fe95-511e-1f785d23e5cc/mzaf_8619467974951398014.plus.aac.p.m4a",
    genre: "rock",
    songAliases: ["Sweet Child O Mine"],
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-35",
    songTitle: "Hotel California",
    artist: "Eagles",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a7/1b/f0/a71bf07d-f498-05c9-2c8a-d12af7d019d8/mzaf_11402952498213508559.plus.aac.p.m4a",
    genre: "classic",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-36",
    songTitle: "Let It Be",
    artist: "The Beatles",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/0f/f7/e1/0ff7e145-6be6-4341-4fa1-32999d20707f/mzaf_15493778815944217662.plus.aac.p.m4a",
    genre: "classic",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-37",
    songTitle: "Hey Jude",
    artist: "The Beatles",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3d/08/f5/3d08f5d7-1e0a-99d9-1085-d50ecc972bb9/mzaf_1689604474306790314.plus.aac.p.m4a",
    genre: "classic",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-38",
    songTitle: "Yellow",
    artist: "Coldplay",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/66/f3/1a/66f31a76-a6ed-cb4c-f353-23310a7ae9a8/mzaf_10593596652344378873.plus.aac.p.m4a",
    genre: "rock",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-39",
    songTitle: "Seven Nation Army",
    artist: "The White Stripes",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/61/54/97/61549744-a83b-1c4d-58cf-e56b36beb4a7/mzaf_1246579179619940831.plus.aac.p.m4a",
    genre: "rock",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-40",
    songTitle: "Poker Face",
    artist: "Lady Gaga",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/06/b8/ac/06b8acb3-7f5e-3302-0781-952eb834e27a/mzaf_17151548762072495969.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-41",
    songTitle: "Bad Romance",
    artist: "Lady Gaga",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/1b/54/f0/1b54f0b7-db6a-1a40-6af8-4ae4650d8d6d/mzaf_2782647211171496826.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-42",
    songTitle: "Crazy in Love (feat. JAŸ-Z)",
    artist: "Beyoncé",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/b5/2a/4f/b52a4fcd-0628-cb38-c8ab-a697c11a9175/mzaf_1541321636664021445.plus.aac.p.m4a",
    genre: "hip-hop",
    songAliases: ["Crazy In Love", "Crazy in Love feat Jay-Z"],
    artistAliases: ["Beyoncé", "Beyonce"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-43",
    songTitle: "Toxic",
    artist: "Britney Spears",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ae/c4/7f/aec47f56-842d-49b4-558b-7a7523fd6728/mzaf_6693111381462300599.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-44",
    songTitle: "...Baby One More Time",
    artist: "Britney Spears",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/49/6a/b2/496ab286-3c2d-91f9-2d83-2dc2d7d0ed39/mzaf_9080140052391941165.plus.aac.p.m4a",
    genre: "pop",
    songAliases: ["Baby One More Time"],
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-45",
    songTitle: "Call Me Maybe",
    artist: "Carly Rae Jepsen",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/32/62/aa/3262aa6b-498c-6178-c4c6-0cd9b54f4a5e/mzaf_8580252104309473753.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-46",
    songTitle: "Gangnam Style",
    artist: "PSY",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3d/65/ae/3d65ae0a-7b2c-f14d-5680-cdafaa8cfb2d/mzaf_11206445915046452880.plus.aac.p.m4a",
    genre: "k-pop",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-47",
    songTitle: "Despacito",
    artist: "Luis Fonsi & Daddy Yankee",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/40/5b/e7/405be722-3ec9-ba27-7469-002182d57b39/mzaf_14120258742032474456.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-48",
    songTitle: "Closer (feat. Halsey)",
    artist: "The Chainsmokers",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/bd/f9/b9/bdf9b9b2-eaa4-4461-6079-aaacc6df7316/mzaf_17327312786932455493.plus.aac.p.m4a",
    genre: "pop",
    songAliases: ["Closer feat Halsey"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-49",
    songTitle: "Señorita",
    artist: "Shawn Mendes & Camila Cabello",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/cf/06/d6/cf06d6fd-f7a0-2898-8363-67688df6c14f/mzaf_8234301186390421644.plus.aac.p.m4a",
    genre: "pop",
    songAliases: ["Senorita"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-50",
    songTitle: "Perfect",
    artist: "Ed Sheeran",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c7/ba/bc/c7babc66-f598-aaa6-bcf6-307281795817/mzaf_16337361235117168274.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-51",
    songTitle: "Someone Like You",
    artist: "Adele",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/ef/18/7b/ef187b7d-f487-e935-4ca1-af5748313710/mzaf_8455263230305249048.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-52",
    songTitle: "Roar",
    artist: "Katy Perry",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/21/a8/76/21a87607-1fe3-2bd2-753c-0b4b73c22b90/mzaf_9666996724668759977.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-53",
    songTitle: "Firework",
    artist: "Katy Perry",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ab/27/3b/ab273b22-1eb1-dd49-5332-5ef70c35683b/mzaf_4912325324633099647.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-54",
    songTitle: "Locked Out of Heaven",
    artist: "Bruno Mars",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/f4/37/44/f4374481-e6e8-54d1-32ad-893ec2f4d495/mzaf_3915415747653767603.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-55",
    songTitle: "Just the Way You Are",
    artist: "Bruno Mars",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/0c/9d/26/0c9d266f-632d-dbda-770d-55cdded795f8/mzaf_18078867637438469059.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-56",
    songTitle: "Party In the U.S.A.",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/76/9e/79/769e79f5-3fbe-a416-4109-e57acaf7ebb7/mzaf_1472369971298162165.plus.aac.p.m4a",
    genre: "pop",
    songAliases: ["Party in the USA"],
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-57",
    songTitle: "Royals",
    artist: "Lorde",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/4c/50/2e/4c502ee4-d63e-3f7c-11cc-61b2e0c92656/mzaf_4849324024240261165.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-58",
    songTitle: "Pumped Up Kicks",
    artist: "Foster the People",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/dd/a9/80/dda980a0-3b62-f7b7-9588-11b929a30b3c/mzaf_4007504837203131685.plus.aac.p.m4a",
    genre: "rock",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-60",
    songTitle: "Iris",
    artist: "The Goo Goo Dolls",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/60/17/35/60173512-3d5c-1d6f-549e-d8ddafa93e07/mzaf_5281658494050788067.plus.aac.p.m4a",
    genre: "rock",
    artistAliases: ["The Goo Goo Dolls"],
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-61",
    songTitle: "Dynamite",
    artist: "BTS",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/3b/f2/5c/3bf25cc9-a395-6858-1ef8-5c29956afaf6/mzaf_6007556042949037280.plus.aac.p.m4a",
    genre: "k-pop",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-62",
    songTitle: "Butter",
    artist: "BTS",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/f4/80/70/f48070d2-3802-520b-c724-c367125ef2a5/mzaf_16052369757637658622.plus.aac.p.m4a",
    genre: "k-pop",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-64",
    songTitle: "Boy With Luv (feat. Halsey)",
    artist: "BTS",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/0b/8d/84/0b8d84e5-5273-ae21-0c6e-591af6097294/mzaf_16252906211188582302.plus.aac.p.m4a",
    genre: "k-pop",
    songAliases: ["Boy With Luv feat Halsey"],
    artistAliases: ["BTS feat Halsey"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-65",
    songTitle: "DNA",
    artist: "BTS",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d4/09/d0/d409d0b1-b411-4f5e-838f-f83e886a0931/mzaf_4091230585279402671.plus.aac.p.m4a",
    genre: "k-pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-66",
    songTitle: "MIC Drop",
    artist: "BTS",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ca/99/62/ca99624a-e285-1b3b-fbbc-5b49e24e3bf6/mzaf_17663668298580733193.plus.aac.p.m4a",
    genre: "k-pop",
    songAliases: ["Mic Drop"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-67",
    songTitle: "Life Goes On",
    artist: "BTS",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/7f/63/1c/7f631c84-92f2-0805-22cf-8b15ddae12ce/mzaf_7122502015402982287.plus.aac.p.m4a",
    genre: "k-pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-68",
    songTitle: "Spring Day",
    artist: "BTS",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/18/d7/18/18d718e6-efb8-2241-47b8-44f8951b7afb/mzaf_9900867605041120176.plus.aac.p.m4a",
    genre: "k-pop",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-69",
    songTitle: "FAKE LOVE",
    artist: "BTS",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/0b/d4/c9/0bd4c96a-42f9-ba5b-61ae-b892eedc07bb/mzaf_13192440704264218610.plus.aac.p.m4a",
    genre: "k-pop",
    songAliases: ["Fake Love"],
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-70",
    songTitle: "Blood Sweat & Tears",
    artist: "BTS",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/99/7c/3c/997c3c6f-7644-0153-752e-9454bb73428b/mzaf_15295778061705568451.plus.aac.p.m4a",
    genre: "k-pop",
    songAliases: ["Blood Sweat and Tears"],
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-71",
    songTitle: "IDOL",
    artist: "BTS",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ed/66/e4/ed66e4b9-85a6-931b-d9f7-cd6728ca4ef5/mzaf_7284917574445292460.plus.aac.p.m4a",
    genre: "k-pop",
    songAliases: ["Idol"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-72",
    songTitle: "ON",
    artist: "BTS",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/30/7f/21/307f210e-a502-fa4a-8822-a0587f97c5f3/mzaf_12491938612066207306.plus.aac.p.m4a",
    genre: "k-pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-73",
    songTitle: "Yet To Come",
    artist: "BTS",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/12/a9/3d/12a93d0b-036b-170b-09fa-379d785e63b7/mzaf_17633343337902112849.plus.aac.p.m4a",
    genre: "k-pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-74",
    songTitle: "Save ME",
    artist: "BTS",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/0d/5a/fe/0d5afe45-3667-b7f7-ef23-29f1c45359df/mzaf_12438044864581460524.plus.aac.p.m4a",
    genre: "k-pop",
    songAliases: ["Save Me"],
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-75",
    songTitle: "Burning Up (FIRE)",
    artist: "BTS",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/8c/bf/2b/8cbf2b63-d297-00e1-6151-e38e8035ba39/mzaf_16676068374597282362.plus.aac.p.m4a",
    genre: "k-pop",
    songAliases: ["Burning Up", "Burning Up FIRE", "FIRE"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-76",
    songTitle: "Dope",
    artist: "BTS",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d4/a7/31/d4a73105-0fcf-f07a-08ed-b731f7099b06/mzaf_10558830626272194757.plus.aac.p.m4a",
    genre: "k-pop",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-77",
    songTitle: "Make It Right",
    artist: "BTS",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e7/fc/5a/e7fc5af6-0501-3ca8-dd6e-6903b9e583aa/mzaf_5882509071602676554.plus.aac.p.m4a",
    genre: "k-pop",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-78",
    songTitle: "Black Swan",
    artist: "BTS",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/bd/fb/e5/bdfbe5db-dc69-b162-1391-9ca54cbeab67/mzaf_16962188115154166520.plus.aac.p.m4a",
    genre: "k-pop",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-79",
    songTitle: "My Universe",
    artist: "Coldplay X BTS",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ac/9a/20/ac9a20f7-0065-92f0-7fbe-c136bc5ddcf4/mzaf_10985566651421931051.plus.aac.p.m4a",
    genre: "k-pop",
    songAliases: ["My Universe BTS"],
    artistAliases: ["Coldplay x BTS", "BTS"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-80",
    songTitle: "Apologize",
    artist: "OneRepublic",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d7/a5/ac/d7a5ac54-0dbf-5bea-df14-c9965ac2e682/mzaf_2048711194344336393.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-81",
    songTitle: "Secrets",
    artist: "OneRepublic",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/7c/6f/89/7c6f896d-e83a-87d5-bb8a-8601da470403/mzaf_13387475480559212540.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-82",
    songTitle: "Good Life (iTunes Session)",
    artist: "OneRepublic",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/4c/bb/e9/4cbbe94d-75ac-5edd-7afe-ed357a081fb9/mzaf_8378367554654084515.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-83",
    songTitle: "Stop and Stare",
    artist: "OneRepublic",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/df/0b/6b/df0b6bb1-b5a5-c071-4bfe-995e4862d327/mzaf_2065875964758493665.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-84",
    songTitle: "If I Lose Myself",
    artist: "OneRepublic",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3c/9f/22/3c9f2284-01be-2d40-cb7e-ecbdf9b6cdd1/mzaf_10773611713967523163.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-85",
    songTitle: "Love Runs Out",
    artist: "OneRepublic",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/a4/6a/60/a46a6071-1306-d32f-9cb9-006ada95b353/mzaf_8276479845023814826.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-86",
    songTitle: "All The Right Moves",
    artist: "OneRepublic",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/86/a8/1f/86a81fa4-95d7-b3fb-87f7-8403ec24783e/mzaf_1148162306280550559.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-87",
    songTitle: "Feel Again",
    artist: "OneRepublic",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/2c/62/f3/2c62f3bc-a4b7-af70-5e0b-2050cb7dcc78/mzaf_2694003188951343399.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-88",
    songTitle: "I Ain't Worried",
    artist: "OneRepublic",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/1e/a1/3d/1ea13da1-8ac6-e603-ec6f-3f6d5b89f8f3/mzaf_8445589109258687921.plus.aac.p.m4a",
    genre: "pop",
    songAliases: ["I Aint Worried"],
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-89",
    songTitle: "Wanted",
    artist: "OneRepublic",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/06/22/6d/06226dcf-59b9-8e84-6ce3-fd678d592826/mzaf_8241401672335071943.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-90",
    songTitle: "Rescue Me",
    artist: "OneRepublic",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/32/31/d7/3231d7f5-7a94-6f33-5be7-043bd33a80ba/mzaf_8160567856128636185.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-91",
    songTitle: "Heaven",
    artist: "OneRepublic",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/0d/7b/01/0d7b01a9-64cc-5f49-b01b-3abd01f97a4a/mzaf_9995448488109519655.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-92",
    songTitle: "Someday",
    artist: "OneRepublic",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/8a/b8/5a/8ab85aab-7aa6-8ec4-49d2-04713db0c243/mzaf_17439399566899788116.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-93",
    songTitle: "Connection",
    artist: "OneRepublic",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/64/22/82/6422821f-44c5-2fd0-3caf-aee01dbcc7ca/mzaf_4208706188746189409.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-94",
    songTitle: "Nobody (from Kaiju No. 8)",
    artist: "OneRepublic",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b5/9b/14/b59b1431-4908-3b7a-fd4d-bb86d193ca6a/mzaf_1746474897586183065.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-95",
    songTitle: "Preacher",
    artist: "OneRepublic",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/de/31/1b/de311b23-aa26-976f-2458-4f20078769f0/mzaf_11505353645811099889.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-96",
    songTitle: "Love Story",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/8b/4c/b3/8b4cb3a5-b1d1-c82c-e6ab-48cc3969d4ff/mzaf_858711921713575608.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-97",
    songTitle: "You Belong With Me",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ec/84/f2/ec84f262-1498-583f-dd5b-cd1a78587bce/mzaf_8651470950553551918.plus.aac.p.m4a",
    genre: "pop",
    songAliases: ["You Belong with Me"],
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-98",
    songTitle: "Blank Space",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f1/dd/3a/f1dd3add-0fc5-2e35-3460-923fb707f21e/mzaf_7924539200493199372.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-99",
    songTitle: "Style",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/bd/5d/72/bd5d726f-f082-732a-bfac-102ab3739ec7/mzaf_13805328136345741566.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-100",
    songTitle: "Wildest Dreams",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/45/26/a4/4526a416-a6ee-44a1-92a5-bde8369d898c/mzaf_7980441848261718723.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-101",
    songTitle: "Anti-Hero",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/1d/56/2a/1d562a07-dc5f-a9c0-1f36-2051a8c14eb7/mzaf_7214829135431340590.plus.aac.p.m4a",
    genre: "pop",
    songAliases: ["Anti Hero"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-102",
    songTitle: "Cruel Summer",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/44/af/81/44af8168-9609-1b85-5048-ada08dceacf3/mzaf_1341699644335558812.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-103",
    songTitle: "We Are Never Ever Getting Back Together",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/bc/71/fa/bc71fa68-e311-5aa5-20bc-0f52cace4fcf/mzaf_9597223352300847194.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-104",
    songTitle: "I Knew You Were Trouble",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/54/8f/a3/548fa33c-74cc-65ae-5f50-2a6858753397/mzaf_4018994675652787372.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-105",
    songTitle: "Look What You Made Me Do",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3b/26/64/3b26645a-2c49-f0c7-fa6d-be6ad83b0ae9/mzaf_4194244291813253017.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-106",
    songTitle: "cardigan",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/00/b3/f2/00b3f2a0-3228-b65f-7189-91eb26f5adf6/mzaf_3535055549125623460.plus.aac.p.m4a",
    genre: "pop",
    songAliases: ["Cardigan"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-107",
    songTitle: "Lover",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e0/db/47/e0db47b0-7f70-0631-0414-cd4777d2fb3e/mzaf_6362891154838442638.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-108",
    songTitle: "You Need To Calm Down",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e8/80/4f/e8804fa1-6118-74fd-4602-b96969ebef41/mzaf_5457103975229379192.plus.aac.p.m4a",
    genre: "pop",
    songAliases: ["You Need to Calm Down"],
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-109",
    songTitle: "ME! (feat. Brendon Urie of Panic! At The Disco)",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/c5/6f/e3/c56fe3a6-2f25-b545-6135-aaba0a838569/mzaf_1819099962104489735.plus.aac.p.m4a",
    genre: "pop",
    songAliases: ["Me"],
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-110",
    songTitle: "Delicate",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/a7/24/e8/a724e804-d5df-f7a7-24cc-09df9df57a79/mzaf_4087189896444308455.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-111",
    songTitle: "Gorgeous",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b5/c7/76/b5c77613-f75e-1895-f9ed-a39a0907dec0/mzaf_8863959442271111939.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-112",
    songTitle: "Enchanted",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ff/f2/da/fff2daa7-e089-c08b-9b34-d2ba8d8ee37c/mzaf_13585740172543756019.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-113",
    songTitle: "All Too Well",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/98/45/5e/98455e46-746d-c879-c610-48322068929b/mzaf_12082529185475484305.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-114",
    songTitle: "22",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/55/86/02/55860256-c850-4a30-a97c-3083210f1325/mzaf_427967193683630924.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-115",
    songTitle: "Our Song",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/49/22/e5/4922e538-7172-1f13-7b98-673915553bdd/mzaf_16010520491370125418.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-116",
    songTitle: "Teardrops On My Guitar",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/87/8e/b8/878eb86a-bd25-fa85-414b-82403d8629ea/mzaf_4527437505274510479.plus.aac.p.m4a",
    genre: "pop",
    songAliases: ["Teardrops on My Guitar"],
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-117",
    songTitle: "Lavender Haze",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/e8/3d/a6/e83da665-dc67-5d12-1bcb-92b2cbff0eb2/mzaf_8022777830254348609.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "cleaned",
    tier: "medium",
  },
  {
    id: "music-118",
    songTitle: "Karma",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/e4/11/80/e41180a4-df9e-2347-c956-a12eb3259102/mzaf_16028347522538508645.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "cleaned",
    tier: "medium",
  },
  {
    id: "music-119",
    songTitle: "Bad Blood",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/48/ac/ea/48acea0d-8faf-34e1-b6a6-76ae2944d478/mzaf_4651792087173004763.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-120",
    songTitle: "Fortnight (feat. Post Malone)",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/90/67/b5/9067b561-f437-d4ce-1f2f-ac3913339d72/mzaf_9669199482319820236.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-121",
    songTitle: "The Man",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3b/b7/c6/3bb7c6f7-d06f-f91c-7801-0ed0a6257e1c/mzaf_12747815097409700369.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-122",
    songTitle: "Back To December",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/7f/41/6c/7f416cce-44f0-52ff-79c7-031943d61848/mzaf_13058990753845209936.plus.aac.p.m4a",
    genre: "pop",
    songAliases: ["Back to December"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-123",
    songTitle: "Mine",
    artist: "Taylor Swift",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/64/78/6f/64786fbc-3294-4561-d02f-87adda756293/mzaf_12118142068342740523.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-124",
    songTitle: "7 Things",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/e4/16/8b/e4168ba2-b98e-90fe-4dd1-c88f301a37fc/mzaf_11151290494119624676.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-125",
    songTitle: "Adore You",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/48/08/b9/4808b946-d103-ebd5-14d6-fde2fd2749ae/mzaf_4673996428338165700.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-126",
    songTitle: "Angels Like You",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b2/2e/19/b22e1910-2064-930e-1d2f-3a06baace9e7/mzaf_12279042806738380334.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-127",
    songTitle: "Bad Karma (feat. Joan Jett)",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b9/cf/ab/b9cfabc1-39c8-a595-4303-8265f807e997/mzaf_635218885618591149.plus.aac.p.m4a",
    genre: "pop",
    artistAliases: ["Miley Cyrus"],
    explicitness: "cleaned",
    tier: "medium",
  },
  {
    id: "music-128",
    songTitle: "Bang Bang X See You Again (Live)",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/69/bf/b9/69bfb900-f566-b4b1-2997-4c29147ba40c/mzaf_272279348269176307.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-129",
    songTitle: "Bottom of the Ocean",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/df/c2/17/dfc2178b-82d3-0ef2-fb3e-6a2f7b2af218/mzaf_167268233035898546.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-130",
    songTitle: "Breakout",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/48/75/a4/4875a402-14aa-75de-b872-336843b4434c/mzaf_11960963659599919603.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-131",
    songTitle: "Can't Be Tamed",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/2b/af/93/2baf9305-5db8-b801-cce6-a8510f61072d/mzaf_15714150095709817537.plus.aac.p.m4a",
    genre: "pop",
    songAliases: ["Cant Be Tamed"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-132",
    songTitle: "Don't Let the Sun Go Down On Me",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/2a/92/6e/2a926ef6-75f9-03b0-0ad5-424209b10799/mzaf_8239446193914874478.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-133",
    songTitle: "Don't Walk Away",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/97/97/cf/9797cfe6-9090-d282-57d7-626b437cf84e/mzaf_13895130239996419852.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-134",
    songTitle: "Dream",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/4a/11/8f/4a118f84-ed33-6582-ab9f-43200a2d794f/mzaf_1165311103786961568.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-135",
    songTitle: "Dream As One (from Avatar: Fire and Ash)",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/7d/cd/0c/7dcd0cc0-ac16-1e4f-eed9-45544fcccd89/mzaf_6413770666396111354.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-136",
    songTitle: "Drive",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/10/10/fb/1010fbd3-2465-b97a-58b5-8635fc7b1e8a/mzaf_10163401952534422237.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-137",
    songTitle: "Easy Lover",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/65/4c/07/654c077b-9269-a58b-8408-5b28bc065eb5/mzaf_11278435667461565326.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-138",
    songTitle: "Edge of Midnight (Midnight Sky Remix) [feat. Stevie Nicks]",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/4e/85/73/4e8573ad-74ed-8b12-81d8-8f9f68c73ce1/mzaf_16837175578096902170.plus.aac.p.m4a",
    genre: "pop",
    artistAliases: ["Miley Cyrus"],
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-139",
    songTitle: "End of the World",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/a1/c5/2b/a1c52bdb-5fea-9abf-038c-76c04db0900c/mzaf_9619135548827080150.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-140",
    songTitle: "Every Girl You've Ever Loved (feat. Naomi Campbell)",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ee/97/2f/ee972f38-81f3-c0f0-9507-5002d21245fe/mzaf_11260365910406074765.plus.aac.p.m4a",
    genre: "pop",
    artistAliases: ["Miley Cyrus"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-141",
    songTitle: "Every Rose Has Its Thorn",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/d1/86/5f/d1865f67-dfb7-f61b-597c-6919d8924dc7/mzaf_16033889873540370438.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-142",
    songTitle: "Flowers",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/c5/46/32/c546324e-d129-4630-45cd-78092836ce4f/mzaf_14963616412621662357.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-143",
    songTitle: "Fly On the Wall",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/dc/bd/44/dcbd44ef-0786-11d9-a5bf-ff6ee83a57d2/mzaf_7282615432138933122.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-144",
    songTitle: "G.N.O. - Girl's Night Out",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/62/10/0d/62100db4-cf54-c9bc-7969-68991a9d319e/mzaf_13707980770086249990.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-145",
    songTitle: "Gimme What I Want",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/93/b6/7c/93b67c85-dad6-433c-7dab-df9d9cbedd31/mzaf_11273385202633249870.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-146",
    songTitle: "Girls Just Wanna Have Fun",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/c1/90/ef/c190ef12-900b-3b6c-e4a4-b3cdb1d615e1/mzaf_9374644397686043935.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-147",
    songTitle: "Golden Burning Sun",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3a/30/e7/3a30e73f-1c18-bc30-3988-b27d4449cca0/mzaf_3059370644354244196.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-148",
    songTitle: "Golden G String",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d7/c6/3b/d7c63b67-8200-5223-013f-35f9921ec56b/mzaf_15702575252471998686.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-149",
    songTitle: "Goodbye",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/c0/5b/d0/c05bd089-2d90-4c0f-0d4a-4d43f6f1cf19/mzaf_10257927209208944931.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-150",
    songTitle: "Hands of Love",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/73/3b/b9/733bb902-8ed0-de8d-9da5-8b4d347c0a13/mzaf_13465249094820634869.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-151",
    songTitle: "Hate Me",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/85/f6/5c/85f65c92-dfb6-0a06-4f4e-932e3c9fe513/mzaf_15361660805408701176.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-152",
    songTitle: "Heart of Glass (Live)",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/dc/a5/75/dca575aa-4e50-845a-a1cd-3a159b40148d/mzaf_13779601630485806064.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-153",
    songTitle: "High",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/03/fd/e0/03fde047-aedd-8018-9f5f-f6dfdf924861/mzaf_521078561805694035.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-154",
    songTitle: "Hoedown Throwdown",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/52/33/dc/5233dc99-d1cf-dada-0f92-47e0e0c55b50/mzaf_6882862479804130262.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-155",
    songTitle: "I Hope You Find It",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/a4/a5/10/a4a510b4-4b1e-0b28-10a0-1295d5b2a534/mzaf_4034521003259905987.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-156",
    songTitle: "I Learned from You",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/50/aa/41/50aa41e1-8511-647a-085d-b9dfd2b5d638/mzaf_6682856319945197295.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-157",
    songTitle: "I Miss You",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/86/a0/af/86a0af42-ce32-b819-09f2-e6b8409e96ac/mzaf_4605024561544092765.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-158",
    songTitle: "I Would Die For You",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/24/d9/73/24d97333-efe3-6fd7-f6d0-b29e3a2bdb15/mzaf_11448432569903055797.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-159",
    songTitle: "Island",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/f4/0e/cc/f40ecc14-8d1e-71bc-c4c7-09a36d7d7af2/mzaf_3710064506198315320.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-160",
    songTitle: "Jaded",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/55/e1/33/55e133ad-5cfc-6c85-ac49-c253448a70a2/mzaf_9321022507351540038.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "cleaned",
    tier: "medium",
  },
  {
    id: "music-161",
    songTitle: "Jolene (Live)",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/76/49/a9/7649a97a-2818-5892-8355-3cd9b9606cc3/mzaf_9503247357691357380.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-162",
    songTitle: "Let's Dance",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ce/8b/ed/ce8bed2d-b98e-9328-54c8-063d78a4cdb8/mzaf_4562066808486503046.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-163",
    songTitle: "Liberty Walk",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/1f/32/c9/1f32c9ea-f1bc-dc7c-c42d-573ef15a42a8/mzaf_13891249964100171025.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-164",
    songTitle: "Like a Prayer (Live)",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d1/5c/d9/d15cd915-b57a-14b2-8c00-64ad85365bc3/mzaf_13016907363312957466.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-165",
    songTitle: "Malibu",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/7a/cc/3e/7acc3e00-4203-92e2-f509-129c79d7b0f5/mzaf_11594898530513101076.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-166",
    songTitle: "Maybe (Live)",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/9d/b6/a3/9db6a376-0705-e175-d81c-727e303c409e/mzaf_11818806969230942875.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-167",
    songTitle: "Maybe You're Right",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/94/5d/ac/945daccd-0e6a-35fa-8aba-3c4ae959f4e0/mzaf_13330636284777333551.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-168",
    songTitle: "Midnight Sky",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/f9/b8/93/f9b8937f-b883-2cbf-b1d7-20b3e825579c/mzaf_3074964872894268869.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-169",
    songTitle: "More to Lose",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/29/f8/b4/29f8b46b-e589-4bf5-9837-bd89582b4444/mzaf_4721720822774727638.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-170",
    songTitle: "My Heart Beats for Love",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/5a/1e/a9/5a1ea9fb-d958-7952-361f-b7db0cb0d71d/mzaf_3701213696169261518.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-171",
    songTitle: "Never Be Me",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b5/35/ff/b535ffdc-e0fc-24ac-ce94-9fa7dc426de6/mzaf_9841219083439621840.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-172",
    songTitle: "Night Crawling (feat. Billy Idol)",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/94/3d/66/943d66bc-c42a-8344-2432-d4efcd0c9485/mzaf_7251494166854593637.plus.aac.p.m4a",
    genre: "pop",
    artistAliases: ["Miley Cyrus"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-173",
    songTitle: "Nothing Breaks Like a Heart (Live)",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/44/83/0f/44830fff-2e35-71cd-429a-c779df8a5f05/mzaf_15156174896416747562.plus.aac.p.m4a",
    genre: "pop",
    artistAliases: ["Miley Cyrus"],
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-174",
    songTitle: "Nothing Else Matters (feat. WATT, Elton John, Yo-Yo Ma, Robert Trujillo & Chad Smith)",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/20/11/bb/2011bba6-fa85-fa00-5660-159cf8b15aed/mzaf_6773370406571064093.plus.aac.p.m4a",
    genre: "pop",
    artistAliases: ["Miley Cyrus"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-175",
    songTitle: "On My Own",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/40/74/49/40744935-c702-0461-6b64-6458ef0ae3ee/mzaf_8521022558005862751.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-176",
    songTitle: "Plastic Hearts",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/5e/6d/bd/5e6dbdc4-9e26-2950-b660-93c4529eda39/mzaf_11323926903928978640.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-177",
    songTitle: "Prelude",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/8e/12/ed/8e12ed65-7da7-6438-ee84-c1d7ad0b6cfa/mzaf_9047426601763045000.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-178",
    songTitle: "Prisoner (feat. Dua Lipa)",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/a5/3c/58/a53c5842-1824-39fb-2091-1603d34c3963/mzaf_11014767299660630962.plus.aac.p.m4a",
    genre: "pop",
    artistAliases: ["Miley Cyrus"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-179",
    songTitle: "Psycho Killer",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/5d/d3/58/5dd35898-ed1f-aa97-964c-1b3f019e1c38/mzaf_14017894510067277623.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-180",
    songTitle: "Rainbowland (feat. Dolly Parton)",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/c8/23/cf/c823cffa-5ce1-52ef-009c-990c17f6e858/mzaf_6132260505767519000.plus.aac.p.m4a",
    genre: "pop",
    artistAliases: ["Miley Cyrus"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-181",
    songTitle: "River",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/75/e6/7c/75e67cb3-e403-171d-3b15-6739651a6884/mzaf_16856297667112434683.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-182",
    songTitle: "Rockin' Around the Christmas Tree",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/6c/c5/ce/6cc5ceeb-c536-575b-249a-0e66d8dc77f6/mzaf_5802319910754527641.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-183",
    songTitle: "Rooting for My Baby",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/de/b4/d7/deb4d76d-84a2-7542-52d9-b893619b6b92/mzaf_14578011718395157908.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-184",
    songTitle: "Rose Colored Lenses",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/70/ea/3c/70ea3c43-46fb-d5ba-ee91-4006a2e872bc/mzaf_1647185544305476422.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-185",
    songTitle: "Secrets (feat. Lindsey Buckingham & Mick Fleetwood)",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b0/e0/52/b0e0528c-7a4c-f8fb-a6a5-61171efc8216/mzaf_11612403593911279073.plus.aac.p.m4a",
    genre: "pop",
    artistAliases: ["Miley Cyrus"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-186",
    songTitle: "See You Again",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/6f/25/af/6f25afc7-3cb2-0a1f-8332-5ed94693a9f7/mzaf_14499964565442485366.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-187",
    songTitle: "Sleigh Ride",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/f3/4f/2a/f34f2adc-e682-0f2a-8066-2fa3f1414f40/mzaf_16515398818513541242.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-188",
    songTitle: "Slide Away",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/bb/9b/72/bb9b72a3-5833-44c4-3aba-425f3fa513bc/mzaf_447165780166969230.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-189",
    songTitle: "Someone Else",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ef/3e/de/ef3ede42-dca5-4a3c-1435-9f4725e52132/mzaf_11042038414462147873.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-190",
    songTitle: "Something Beautiful",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/cc/19/88/cc198850-fa56-0345-a115-fdb9345d81fe/mzaf_10347101652109153961.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-191",
    songTitle: "Start All Over",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/83/73/19/837319d7-9536-83a7-2753-e52dff26cb8b/mzaf_408334267139993430.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-192",
    songTitle: "Stay",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/ec/91/89/ec91892f-d2df-8264-9ab4-6a1c74ae5725/mzaf_6885445715944475230.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-193",
    songTitle: "The Bitch Is Back",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/23/75/8a/23758a7b-5be7-6700-3bb3-286e94044dba/mzaf_11655076722415881839.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-194",
    songTitle: "The Climb",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/1b/0a/65/1b0a653f-979d-3855-4574-7738a3a732e3/mzaf_12193290508710453141.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-195",
    songTitle: "The Time of Our Lives",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/4f/06/3b/4f063b6c-2076-6335-6824-b8719e69d921/mzaf_158054205253447878.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "hard",
  },
  {
    id: "music-196",
    songTitle: "Thousand Miles (feat. Brandi Carlile)",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/63/28/c7/6328c7c8-6ec1-e46f-9653-0e89a555d96f/mzaf_18343411460668799628.plus.aac.p.m4a",
    genre: "pop",
    artistAliases: ["Miley Cyrus"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-197",
    songTitle: "Two More Lonely People",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/55/58/41/555841ed-2b21-d087-e52d-ec7123cbd8e4/mzaf_14396696043788163924.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-198",
    songTitle: "Used To Be Young",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/15/b8/ed/15b8ed9d-0186-e29e-2e25-ae11f5a12046/mzaf_8433047979576204383.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-199",
    songTitle: "Violet Chemistry",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/14/22/52/14225286-fab7-5b7d-e8cc-d62abbdc4fa0/mzaf_143365870182670439.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-200",
    songTitle: "Walk of Fame (feat. Brittany Howard)",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/c1/bd/6d/c1bd6d7e-a518-344a-257c-3160da69f048/mzaf_4553368778020030357.plus.aac.p.m4a",
    genre: "pop",
    artistAliases: ["Miley Cyrus"],
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-201",
    songTitle: "We Can't Stop",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/fe/50/86/fe5086f7-e8ff-cce6-0820-c17ac814c49d/mzaf_7121731585584531913.plus.aac.p.m4a",
    genre: "pop",
    songAliases: ["We Cant Stop"],
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-202",
    songTitle: "We Can't Stop X Where Is My Mind? (Live)",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/81/7b/2f/817b2f36-8bd6-9345-a730-5f325740f7b6/mzaf_11140842102322091034.plus.aac.p.m4a",
    genre: "pop",
    songAliases: ["We Cant Stop X Where Is My Mind? (Live)"],
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-203",
    songTitle: "When I Look At You",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c4/ae/f9/c4aef920-c81e-43ed-c894-c1842e287067/mzaf_11857061161087360660.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-204",
    songTitle: "Who Owns My Heart",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/25/21/8f/25218f44-e4bd-63dd-3741-c5e324d1140c/mzaf_7826893314675404952.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-205",
    songTitle: "Wildcard",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/00/d1/53/00d153c0-77a4-4dbc-c705-8177640068f0/mzaf_4673412996266561231.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-206",
    songTitle: "Wonder Woman",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/41/17/4c/41174cb3-28dc-fc48-39a3-9f7e84395933/mzaf_9162979343097176477.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-207",
    songTitle: "Wrecking Ball",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f8/e8/a2/f8e8a23c-b85d-17dd-9625-b39ec26b171f/mzaf_1866607988873686159.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-208",
    songTitle: "Wrecking Ball X Nothing Compares 2 U (Live)",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/af/cf/a3/afcfa32c-706c-1521-3792-e5208a6880b7/mzaf_11325055515667108424.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-209",
    songTitle: "You",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c2/ef/d4/c2efd438-c01a-e2f0-1ac2-707bd6a4c98e/mzaf_11524572418824536748.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-210",
    songTitle: "You're Gonna Make Me Lonesome When You Go",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/6a/15/bd/6a15bdbf-8a3d-ff41-f36b-eff2948fb500/mzaf_7824461984790654747.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-211",
    songTitle: "Younger Now",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ad/1a/cb/ad1acb0a-cef4-62f2-151c-e6412bf30564/mzaf_13326039334960202433.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "easy",
  },
  {
    id: "music-212",
    songTitle: "Younger You (From the \"Hannah Montana 20th Anniversary Special\")",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b4/ed/28/b4ed28d4-6060-5dc2-c628-6487972a5a12/mzaf_7349063977679557910.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "medium",
  },
  {
    id: "music-213",
    songTitle: "Zombie (Live from the NIVA Save Our Stages Festival)",
    artist: "Miley Cyrus",
    audio:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/61/ed/02/61ed024f-1758-319d-f2d1-7067e042ad52/mzaf_4415969295834237149.plus.aac.p.m4a",
    genre: "pop",
    explicitness: "notExplicit",
    tier: "hard",
  },
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

export function buildMusicQuestionsFromTracks(
  seedTracks: TrackSeed[],
): MusicQuizQuestion[] {
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

export function filterMusicTracks(filters: MusicFilters): TrackSeed[] {
  return TRACKS.filter((track) => {
    if (!isCleanTrack(track)) return false;
    if (filters.genre !== "all" && track.genre !== filters.genre) return false;
    if (filters.artist !== "all" && !trackMatchesArtist(track, filters.artist)) {
      return false;
    }
    return true;
  });
}

export function buildMusicQuestions(): MusicQuizQuestion[] {
  return buildMusicQuestionsFromTracks(TRACKS);
}

export function getMusicQuestionsForFilters(
  filters: MusicFilters,
): MusicQuizQuestion[] {
  return buildMusicQuestionsFromTracks(filterMusicTracks(filters));
}

export function getMusicTrackCount(filters: Partial<MusicFilters> = {}): number {
  return filterMusicTracks({
    genre: filters.genre ?? "all",
    artist: filters.artist ?? "all",
  }).length;
}

export function getMusicQuestionsForGenre(
  genre: MusicGenreFilter,
): MusicQuizQuestion[] {
  return getMusicQuestionsForFilters({ genre, artist: "all" });
}

export const MUSIC_QUESTIONS: MusicQuizQuestion[] = buildMusicQuestions();
