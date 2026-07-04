import type { MovieQuizQuestion } from "@/lib/quiz-data";
import type { MovieBroadcasterFilter } from "@/lib/movie-broadcaster";
import type { MovieBroadcasterId } from "@/lib/movie-broadcaster";

export type MovieSeed = {
  id: string;
  title: string;
  broadcaster: MovieBroadcasterId;
  rating: "PG";
  image: string;
  titleAliases?: string[];
  tier?: "easy" | "medium" | "hard";
};

export type MovieFilters = {
  broadcaster: MovieBroadcasterFilter;
};

export const MOVIES: MovieSeed[] = [
  {
    "id": "movie-1",
    "title": "The Lion King",
    "broadcaster": "disney",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/d/df/The_Lion_King_-_98%C2%B0_%22Circle_of_Life%22_Behind_the_Scenes/revision/latest?cb=20170823215732",
    "tier": "easy"
  },
  {
    "id": "movie-2",
    "title": "Frozen",
    "broadcaster": "disney",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/1/11/Elsa-anna-final-scene.png/revision/latest/scale-to-width-down/640?cb=20140303163403",
    "tier": "easy",
    "titleAliases": [
      "Frozen 2013"
    ]
  },
  {
    "id": "movie-3",
    "title": "Moana",
    "broadcaster": "disney",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/d/da/Future_Chief_Moana_.jpg/revision/latest/scale-to-width-down/640?cb=20170309030107",
    "tier": "easy"
  },
  {
    "id": "movie-4",
    "title": "Encanto",
    "broadcaster": "disney",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/a/a5/Disney1990.JPG/revision/latest/scale-to-width-down/640?cb=20220227073842",
    "tier": "easy"
  },
  {
    "id": "movie-5",
    "title": "Beauty and the Beast",
    "broadcaster": "disney",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/a/a5/Disney1990.JPG/revision/latest/scale-to-width-down/640?cb=20220227073842",
    "tier": "easy"
  },
  {
    "id": "movie-6",
    "title": "Aladdin",
    "broadcaster": "disney",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/a/ac/4k-aladdin-animationscreencaps.com-11588.jpg/revision/latest/scale-to-width-down/640?cb=20201013173024",
    "tier": "easy",
    "titleAliases": [
      "Aladdin 1992"
    ]
  },
  {
    "id": "movie-7",
    "title": "Mulan",
    "broadcaster": "disney",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/2/21/Disney_World_Mulan.jpg/revision/latest/scale-to-width-down/640?cb=20180718080015",
    "tier": "medium"
  },
  {
    "id": "movie-8",
    "title": "Tangled",
    "broadcaster": "disney",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/a/a5/Disney1990.JPG/revision/latest/scale-to-width-down/640?cb=20220227073842",
    "tier": "easy"
  },
  {
    "id": "movie-9",
    "title": "The Little Mermaid",
    "broadcaster": "disney",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/c/c1/Arielle_Gets_Human_Feet_Scene_-_THE_LITTLE_MERMAID_Anniversary_Edition_%282019%29_Movie_Clip/revision/latest?cb=20190123035155",
    "tier": "easy"
  },
  {
    "id": "movie-10",
    "title": "Zootopia",
    "broadcaster": "disney",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/4/42/Shakira_Zootopia_Zootropolis_%22Gazelle%22_Behind_The_Scenes_Interview/revision/latest?cb=20160217212354",
    "tier": "easy"
  },
  {
    "id": "movie-11",
    "title": "Big Hero 6",
    "broadcaster": "disney",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/c/c3/Big-hero-6-easter-egg-black-talon-orka.jpg/revision/latest/scale-to-width-down/640?cb=20180405220335",
    "tier": "medium"
  },
  {
    "id": "movie-12",
    "title": "Raya and the Last Dragon",
    "broadcaster": "disney",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/a/a5/Disney1990.JPG/revision/latest/scale-to-width-down/640?cb=20220227073842",
    "tier": "medium"
  },
  {
    "id": "movie-13",
    "title": "Cinderella",
    "broadcaster": "disney",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/7/70/Cinderella1950AnimationDrawing1.jpg/revision/latest/scale-to-width-down/640?cb=20240620160112",
    "tier": "easy"
  },
  {
    "id": "movie-14",
    "title": "Mary Poppins",
    "broadcaster": "disney",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/a/a5/Disney1990.JPG/revision/latest/scale-to-width-down/640?cb=20220227073842",
    "tier": "medium"
  },
  {
    "id": "movie-15",
    "title": "Lilo & Stitch",
    "broadcaster": "disney",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/a/a5/Disney1990.JPG/revision/latest/scale-to-width-down/640?cb=20220227073842",
    "tier": "easy",
    "titleAliases": [
      "Lilo and Stitch"
    ]
  },
  {
    "id": "movie-16",
    "title": "The Jungle Book",
    "broadcaster": "disney",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/0/00/Jungle-Book-characters.jpg/revision/latest/scale-to-width-down/640?cb=20240616162403",
    "tier": "medium"
  },
  {
    "id": "movie-17",
    "title": "Hercules",
    "broadcaster": "disney",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/d/d6/Hades_Character_Insights/revision/latest?cb=20160705183138",
    "tier": "medium"
  },
  {
    "id": "movie-18",
    "title": "Tarzan",
    "broadcaster": "disney",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/6/64/Walt-Disney-Characters-image-walt-disney-characters-36379736-5760-3240.jpg/revision/latest/scale-to-width-down/640?cb=20140730004022",
    "tier": "medium"
  },
  {
    "id": "movie-19",
    "title": "Wreck-It Ralph",
    "broadcaster": "disney",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/a/a5/Disney1990.JPG/revision/latest/scale-to-width-down/640?cb=20220227073842",
    "tier": "medium",
    "titleAliases": [
      "Wreck It Ralph"
    ]
  },
  {
    "id": "movie-20",
    "title": "Toy Story",
    "broadcaster": "pixar",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/pixar/images/2/22/%22Rain%22_Toy_Story_Deleted_Scene/revision/latest?cb=20200101004650",
    "tier": "easy"
  },
  {
    "id": "movie-21",
    "title": "Toy Story 2",
    "broadcaster": "pixar",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/pixar/images/8/88/18.png/revision/latest/scale-to-width-down/640?cb=20161122224244",
    "tier": "easy"
  },
  {
    "id": "movie-22",
    "title": "Toy Story 4",
    "broadcaster": "pixar",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/pixar/images/d/dd/Screenshot_2019-04-29_at_21.49.34.png/revision/latest/scale-to-width-down/640?cb=20190429205532",
    "tier": "easy"
  },
  {
    "id": "movie-23",
    "title": "Finding Nemo",
    "broadcaster": "pixar",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/pixar/images/c/cb/Anchor-FindingNemo3D.jpg/revision/latest/scale-to-width-down/640?cb=20120609033105",
    "tier": "easy"
  },
  {
    "id": "movie-24",
    "title": "Monsters University",
    "broadcaster": "pixar",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/pixar/images/3/32/010a_cbm1gd_145211207x-jpg_rgb.jpg/revision/latest/scale-to-width-down/640?cb=20130605193041",
    "tier": "medium"
  },
  {
    "id": "movie-25",
    "title": "Cars",
    "broadcaster": "pixar",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/pixar/images/7/74/Aiken3.jpg/revision/latest/scale-to-width-down/640?cb=20100627053953",
    "tier": "easy"
  },
  {
    "id": "movie-26",
    "title": "Cars 2",
    "broadcaster": "pixar",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/pixar/images/d/dd/Cars-2-video-game-screenshot-1.jpg/revision/latest/scale-to-width-down/640?cb=20111214223204",
    "tier": "medium"
  },
  {
    "id": "movie-27",
    "title": "Cars 3",
    "broadcaster": "pixar",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/pixar/images/f/f9/Screenshot_20240326-224236.png/revision/latest/scale-to-width-down/640?cb=20250704170318",
    "tier": "medium"
  },
  {
    "id": "movie-28",
    "title": "Up",
    "broadcaster": "pixar",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/d/df/Gallery-1490112508-colorful-house-from-up-recreation-utah.jpg/revision/latest/scale-to-width-down/640?cb=20180929161928",
    "tier": "easy"
  },
  {
    "id": "movie-29",
    "title": "Inside Out",
    "broadcaster": "pixar",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/f/fd/Inside_Out_-_Behind_the_Scenes_Interview_with_Amy_Poehler/revision/latest?cb=20150609172304",
    "tier": "easy"
  },
  {
    "id": "movie-30",
    "title": "Inside Out 2",
    "broadcaster": "pixar",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/pixar/images/9/9a/Inside_Out_2_Credits.png/revision/latest/scale-to-width-down/640?cb=20240913225803",
    "tier": "easy"
  },
  {
    "id": "movie-31",
    "title": "Coco",
    "broadcaster": "pixar",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/pixar/images/d/de/Coco-ew-firststill.jpg/revision/latest/scale-to-width-down/640?cb=20170105211542",
    "tier": "easy"
  },
  {
    "id": "movie-32",
    "title": "The Incredibles",
    "broadcaster": "pixar",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/pixar/images/7/7f/Incredibles-syndrome-mirage-characters.jpg/revision/latest?cb=20110319231859",
    "tier": "easy"
  },
  {
    "id": "movie-33",
    "title": "Incredibles 2",
    "broadcaster": "pixar",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/6/65/Incredibles_2_%22Elastigirl%22_Behind_The_Scenes_Holly_Hunter_Interview/revision/latest?cb=20180607130653",
    "tier": "easy"
  },
  {
    "id": "movie-34",
    "title": "Ratatouille",
    "broadcaster": "pixar",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/pixar/images/8/8a/Album-ratatouille.jpg/revision/latest?cb=20071015194040",
    "tier": "medium"
  },
  {
    "id": "movie-35",
    "title": "WALL-E",
    "broadcaster": "pixar",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/7/72/Theme_Park_Atmosphere_Characters_-_WALL-E.jpg/revision/latest?cb=20110731175332",
    "tier": "medium",
    "titleAliases": [
      "Wall-E",
      "WALLE"
    ]
  },
  {
    "id": "movie-36",
    "title": "Brave",
    "broadcaster": "pixar",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/pixar/images/b/ba/Brave-M_pubstill_B_RGB_3_24_2011_special16_rgb.jpg/revision/latest/scale-to-width-down/640?cb=20110330134801",
    "tier": "medium"
  },
  {
    "id": "movie-37",
    "title": "Turning Red",
    "broadcaster": "pixar",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/a/a5/Disney1990.JPG/revision/latest/scale-to-width-down/640?cb=20220227073842",
    "tier": "medium"
  },
  {
    "id": "movie-38",
    "title": "Elemental",
    "broadcaster": "pixar",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/pixar/images/5/57/Elemental_OST.jpg/revision/latest/scale-to-width-down/640?cb=20230602180619",
    "tier": "medium"
  },
  {
    "id": "movie-39",
    "title": "Luca",
    "broadcaster": "pixar",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/pixar/images/f/f5/5DE5B085-3BFD-4AE7-82AC-BAF79E43D72C.jpeg/revision/latest/scale-to-width-down/640?cb=20210428172534",
    "tier": "easy"
  },
  {
    "id": "movie-40",
    "title": "Soul",
    "broadcaster": "pixar",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/pixar/images/e/e7/Cannes_%28Soul%29.jpg/revision/latest/scale-to-width-down/640?cb=20230914003126",
    "tier": "medium"
  },
  {
    "id": "movie-41",
    "title": "Lightyear",
    "broadcaster": "pixar",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/c/c0/Disney_and_Pixar%27s_Lightyear_-_%22Fathership%22_Deleted_Scene_Clip_-_On_Digital_%26_Blu-ray/revision/latest?cb=20220804180115",
    "tier": "medium"
  },
  {
    "id": "movie-42",
    "title": "A Bug's Life",
    "broadcaster": "pixar",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/3/31/Character_Modeling_A_Bug%27s_Life_Disney%E2%80%A2Pixar/revision/latest?cb=20201023225433",
    "tier": "hard",
    "titleAliases": [
      "A Bugs Life"
    ]
  },
  {
    "id": "movie-43",
    "title": "Onward",
    "broadcaster": "pixar",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/a/a5/Disney1990.JPG/revision/latest/scale-to-width-down/640?cb=20220227073842",
    "tier": "medium"
  },
  {
    "id": "movie-44",
    "title": "Shrek",
    "broadcaster": "dreamworks",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/dreamworks/images/f/f4/Megamind_Render.png/revision/latest/scale-to-width-down/640?cb=20240205171717",
    "tier": "easy"
  },
  {
    "id": "movie-45",
    "title": "Shrek 2",
    "broadcaster": "dreamworks",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/dreamworks/images/a/af/Shrek_2_Deleted_Scene_1-0/revision/latest?cb=20200217012458",
    "tier": "easy"
  },
  {
    "id": "movie-46",
    "title": "Madagascar",
    "broadcaster": "dreamworks",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/dreamworks/images/9/96/Madagascar_2_the_main_characters.jpg/revision/latest/scale-to-width-down/640?cb=20230202160128",
    "tier": "easy"
  },
  {
    "id": "movie-47",
    "title": "Kung Fu Panda",
    "broadcaster": "dreamworks",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/dreamworks/images/b/bc/Wiki.png/revision/latest?cb=20100814035750",
    "tier": "easy"
  },
  {
    "id": "movie-48",
    "title": "Rise of the Guardians",
    "broadcaster": "dreamworks",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/dreamworks/images/e/ed/Rise_Of_The_Guardians_-_Behind_The_Scenes_HD/revision/latest?cb=20130719214814",
    "tier": "medium"
  },
  {
    "id": "movie-49",
    "title": "The Bad Guys",
    "broadcaster": "dreamworks",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/dreamworks/images/e/ed/Meet_The_Bad_Guys.jpg/revision/latest/scale-to-width-down/640?cb=20240911234945",
    "tier": "easy"
  },
  {
    "id": "movie-50",
    "title": "Megamind",
    "broadcaster": "dreamworks",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/dreamworks/images/b/bc/Wiki.png/revision/latest?cb=20100814035750",
    "tier": "medium"
  },
  {
    "id": "movie-51",
    "title": "Spirit: Stallion of the Cimarron",
    "broadcaster": "dreamworks",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/dreamworks/images/b/bb/Sprint.png/revision/latest?cb=20190103014743",
    "tier": "hard",
    "titleAliases": [
      "Spirit"
    ]
  },
  {
    "id": "movie-52",
    "title": "Minions",
    "broadcaster": "universal",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/singmovie/images/2/22/United_States_of_America.png/revision/latest/scale-to-width-down/640?cb=20170131120957",
    "tier": "easy"
  },
  {
    "id": "movie-53",
    "title": "Despicable Me 2",
    "broadcaster": "universal",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/despicableme/images/7/71/Carl.png/revision/latest?cb=20130808103749",
    "tier": "easy"
  },
  {
    "id": "movie-54",
    "title": "Sing",
    "broadcaster": "universal",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/singmovie/images/f/f8/I%27m_Still_Standing_3.png/revision/latest/scale-to-width-down/640?cb=20171129020946",
    "tier": "easy"
  },
  {
    "id": "movie-55",
    "title": "Sing 2",
    "broadcaster": "universal",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/singmovie/images/2/22/United_States_of_America.png/revision/latest/scale-to-width-down/640?cb=20170131120957",
    "tier": "easy"
  },
  {
    "id": "movie-56",
    "title": "The Secret Life of Pets",
    "broadcaster": "universal",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/despicableme/images/b/ba/The_Art_of_Eric_Guillon.jpg/revision/latest/scale-to-width-down/640?cb=20240717200005",
    "tier": "easy"
  },
  {
    "id": "movie-57",
    "title": "The Lorax",
    "broadcaster": "universal",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/singmovie/images/a/a3/Canada.png/revision/latest/scale-to-width-down/640?cb=20171215043734",
    "tier": "easy"
  },
  {
    "id": "movie-58",
    "title": "Back to the Future",
    "broadcaster": "universal",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/despicableme/images/b/b5/GAMEOVER_FIRSTLOOK.jpg/revision/latest?cb=20240805045126",
    "tier": "medium"
  },
  {
    "id": "movie-59",
    "title": "The Lego Batman Movie",
    "broadcaster": "warner-bros",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/lego/images/2/25/1997_Bat_Nipples_%28Batman_%26_Robin_Flashback_-_LEGO_Batman_Movie%29.png/revision/latest/scale-to-width-down/640?cb=20170601033645",
    "tier": "easy",
    "titleAliases": [
      "Lego Batman Movie"
    ]
  },
  {
    "id": "movie-60",
    "title": "Wonka",
    "broadcaster": "warner-bros",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/warner-bros-entertainment/images/4/46/Willy_wonka_2005_character.jpg/revision/latest?cb=20161214170741",
    "tier": "medium"
  },
  {
    "id": "movie-61",
    "title": "Paddington 2",
    "broadcaster": "warner-bros",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/harrypotter/images/0/0c/Brendan_Gleeson_1.jpg/revision/latest/scale-to-width-down/640?cb=20230817164620",
    "tier": "easy"
  },
  {
    "id": "movie-62",
    "title": "Space Jam",
    "broadcaster": "warner-bros",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/harrypotter/images/8/84/Peter_Serafinowicz.jpg/revision/latest/scale-to-width-down/640?cb=20260617011632",
    "tier": "easy"
  },
  {
    "id": "movie-63",
    "title": "The Iron Giant",
    "broadcaster": "warner-bros",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/harrypotter/images/7/72/B7C21M1.jpg/revision/latest/scale-to-width-down/640?cb=20240124172102",
    "tier": "medium"
  },
  {
    "id": "movie-64",
    "title": "Happy Feet",
    "broadcaster": "warner-bros",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/harrypotter/images/a/a1/Miriam_Margolyes.jpg/revision/latest?cb=20150806034301",
    "tier": "medium"
  },
  {
    "id": "movie-65",
    "title": "Harry Potter and the Sorcerer's Stone",
    "broadcaster": "warner-bros",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/harrypotter/images/d/d3/Albus_Dumbledore_PS_promo.jpg/revision/latest/scale-to-width-down/640?cb=20161120171908",
    "tier": "medium",
    "titleAliases": [
      "Harry Potter and the Philosophers Stone",
      "Harry Potter 1"
    ]
  },
  {
    "id": "movie-66",
    "title": "Harry Potter and the Chamber of Secrets",
    "broadcaster": "warner-bros",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/harrypotter/images/8/88/COS_Faroese_cover.jpg/revision/latest?cb=20170615130120",
    "tier": "medium",
    "titleAliases": [
      "Harry Potter 2"
    ]
  },
  {
    "id": "movie-67",
    "title": "Harry Potter and the Prisoner of Azkaban",
    "broadcaster": "warner-bros",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/harrypotter/images/a/ad/POA_Faroese_cover.jpg/revision/latest?cb=20170615130557",
    "tier": "hard",
    "titleAliases": [
      "Harry Potter 3"
    ]
  },
  {
    "id": "movie-68",
    "title": "Spider-Man: Into the Spider-Verse",
    "broadcaster": "sony",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/hoteltransylvania/images/1/1a/Kathryn_Hahn.jpg/revision/latest/scale-to-width-down/640?cb=20180621231448",
    "tier": "easy",
    "titleAliases": [
      "Into the Spider-Verse",
      "Spider-Verse"
    ]
  },
  {
    "id": "movie-69",
    "title": "Hotel Transylvania",
    "broadcaster": "sony",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/hoteltransylvania/images/c/c7/Hotel_Transylvania_-_Johnny%27s_Rap_-_Deleted_Scene/revision/latest?cb=20150927142506",
    "tier": "easy"
  },
  {
    "id": "movie-70",
    "title": "Hotel Transylvania 2",
    "broadcaster": "sony",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/hoteltransylvania/images/9/9d/Hotel_Transylvania_2_Behind-The-Scenes_Film_Matchups_-_Selena_Gomez%2C_Andy_Samberg%2C_Kevin_James/revision/latest?cb=20160530001044",
    "tier": "easy"
  },
  {
    "id": "movie-71",
    "title": "Cloudy with a Chance of Meatballs",
    "broadcaster": "sony",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/cloudywithachanceofmeatballs/images/7/71/Let%27s_Go_Behind_The_Scenes_%F0%9F%98%82%F0%9F%98%82%F0%9F%98%82_-_Cloudy_With_A_Chance_Of_Meatballs_%F0%9F%8D%9D/revision/latest?cb=20230625184922",
    "tier": "easy"
  },
  {
    "id": "movie-72",
    "title": "Arthur Christmas",
    "broadcaster": "sony",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/sonypicturesanimation/images/1/13/Arthur-christmas-disneyscreencaps.com-1003.jpg/revision/latest/scale-to-width-down/640?cb=20201217051103",
    "tier": "medium"
  },
  {
    "id": "movie-73",
    "title": "The Mitchells vs. the Machines",
    "broadcaster": "sony",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/hoteltransylvania/images/b/ba/Tumblr_3d84115d67b3b3fee12eb16363744849_6e2b74be_1280.png/revision/latest/scale-to-width-down/640?cb=20210521034329",
    "tier": "medium",
    "titleAliases": [
      "Mitchells vs the Machines"
    ]
  },
  {
    "id": "movie-74",
    "title": "Vivo",
    "broadcaster": "sony",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/sonypicturesanimation/images/6/68/Vivo_Blu-ray.jpg/revision/latest/scale-to-width-down/640?cb=20230606074711",
    "tier": "medium"
  },
  {
    "id": "movie-75",
    "title": "Peter Rabbit",
    "broadcaster": "sony",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/sonypicturesanimation/images/8/8e/486558_m1512877077.jpg/revision/latest/scale-to-width-down/640?cb=20180121153422",
    "tier": "easy"
  },
  {
    "id": "movie-76",
    "title": "Klaus",
    "broadcaster": "netflix",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/filmguide/images/2/2f/Screenshot--2020.09.04-00_21_43.png/revision/latest?cb=20200904042223",
    "tier": "medium"
  },
  {
    "id": "movie-77",
    "title": "Nimona",
    "broadcaster": "netflix",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/disney/images/a/a4/Emperors-new-groove-disneyscreencaps.com-271.jpg/revision/latest/scale-to-width-down/640?cb=20150522002048",
    "tier": "medium"
  },
  {
    "id": "movie-78",
    "title": "Sonic the Hedgehog",
    "broadcaster": "paramount",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/sonic/images/5/5b/ASR-Transformed-Xbox.com-screenshots-12.jpg/revision/latest/scale-to-width-down/640?cb=20120831211150",
    "tier": "easy"
  },
  {
    "id": "movie-79",
    "title": "Sonic the Hedgehog 2",
    "broadcaster": "paramount",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/sonic/images/2/20/All_Multiplayer.png/revision/latest?cb=20100406160300",
    "tier": "easy"
  },
  {
    "id": "movie-80",
    "title": "Dora and the Lost City of Gold",
    "broadcaster": "paramount",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/sonic/images/b/ba/Ali_Hekimo%C4%9Flu.jpg/revision/latest?cb=20240601121948",
    "tier": "medium",
    "titleAliases": [
      "Dora"
    ]
  },
  {
    "id": "movie-81",
    "title": "Wonder Park",
    "broadcaster": "paramount",
    "rating": "PG",
    "image": "https://static.wikia.nocookie.net/sonic/images/5/59/MC_Riv1b.png/revision/latest/scale-to-width-down/640?cb=20170503154442",
    "tier": "medium"
  }
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

export function buildMovieQuestionsFromSeeds(seeds: MovieSeed[]): MovieQuizQuestion[] {
  const titles = seeds.map((movie) => movie.title);
  return seeds.map((movie, index) => {
    const distractors = pickDistractors(titles, movie.title, index);
    const correctIndex = index % 4;
    const options = [...distractors];
    options.splice(correctIndex, 0, movie.title);
    return {
      id: movie.id,
      question: "Which movie is this scene from?",
      options: options.slice(0, 4),
      correctIndex,
      image: movie.image,
      imageAlt: `Scene from ${movie.title}`,
      movieTitle: movie.title,
      titleAliases: movie.titleAliases,
      broadcaster: movie.broadcaster,
      rating: movie.rating,
      tier: movie.tier,
    };
  });
}

export function filterMovies(filters: MovieFilters): MovieSeed[] {
  return MOVIES.filter((movie) => {
    if (filters.broadcaster !== "all" && movie.broadcaster !== filters.broadcaster) {
      return false;
    }
    return movie.rating === "PG";
  });
}

export function getMovieQuestionsForFilters(filters: MovieFilters): MovieQuizQuestion[] {
  return buildMovieQuestionsFromSeeds(filterMovies(filters));
}

export function getMovieCount(filters: Partial<MovieFilters> = {}): number {
  return filterMovies({ broadcaster: filters.broadcaster ?? "all" }).length;
}

export const MOVIE_QUESTIONS: MovieQuizQuestion[] = buildMovieQuestionsFromSeeds(MOVIES);