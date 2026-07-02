export type WanderWord = {
  word: string;
  category: string;
  clue: string;
  hints: [string, string, string, string];
};

export const WANDER_WORDS: WanderWord[] = [
  {
    word: "EMBER",
    category: "Campfire",
    clue: "A tiny glowing piece left over from a cozy fire.",
    hints: [
      "Five letters. Still warm and orange.",
      "You might roast marshmallows near one.",
      "Rhymes with timber.",
      "Starts with E — what a candle leaves behind.",
    ],
  },
  {
    word: "TIDAL",
    category: "Beach",
    clue: "The ocean's way of saying hello and goodbye to the shore.",
    hints: [
      "Five letters. The moon helps make it happen.",
      "Surfers love when a big one rolls in.",
      "Rhymes with bridal.",
      "Starts with T — describes ocean waves.",
    ],
  },
  {
    word: "MOTHS",
    category: "Garden",
    clue: "Fluffy nighttime visitors who love porch lights.",
    hints: [
      "Five letters. Plural — more than one!",
      "They flutter around lamps on summer nights.",
      "Related to butterflies.",
      "Starts with M — drawn to bright lights.",
    ],
  },
  {
    word: "PRISM",
    category: "Rainbow",
    clue: "Put light through one and get a rainbow surprise!",
    hints: [
      "Five letters. Splits white light into colors.",
      "Triangular glass makes a great one.",
      "Ends with M.",
      "Starts with P — a rainbow maker.",
    ],
  },
  {
    word: "FROST",
    category: "Winter",
    clue: "Nature's sparkly blanket on a chilly morning.",
    hints: [
      "Five letters. Looks like tiny ice crystals.",
      "Jack is a famous snowy friend.",
      "Rhymes with lost.",
      "Starts with F — covers grass on cold days.",
    ],
  },
  {
    word: "VAULT",
    category: "Adventure",
    clue: "A super secure place for treasures — or gymnasts!",
    hints: [
      "Five letters. Very safe and locked tight.",
      "Gymnasts leap over one in the Olympics.",
      "Rhymes with halt.",
      "Starts with V — where banks keep gold.",
    ],
  },
  {
    word: "LYRIC",
    category: "Music",
    clue: "The sing-along part of your favorite song.",
    hints: [
      "Five letters. The words you hum along to.",
      "Every song has them!",
      "Ends with C.",
      "Starts with L — what singers memorize.",
    ],
  },
  {
    word: "GRAIN",
    category: "Farm",
    clue: "Tiny bits that become bread, rice, or oatmeal.",
    hints: [
      "Five letters. Farmers grow lots of it.",
      "Bakers need it for fresh bread.",
      "Rhymes with rain.",
      "Starts with G — wheat is made of it.",
    ],
  },
  {
    word: "SHADE",
    category: "Summer",
    clue: "The cool, comfy spot under a big tree.",
    hints: [
      "Five letters. Perfect on a hot day.",
      "Trees and umbrellas both give it.",
      "Rhymes with made.",
      "Starts with S — where you rest in summer.",
    ],
  },
  {
    word: "FLINT",
    category: "Outdoors",
    clue: "A special rock that can spark a campfire.",
    hints: [
      "Five letters. Strike it to make a spark.",
      "Campers and cave explorers used it.",
      "Rhymes with hint.",
      "Starts with F — makes fire with steel.",
    ],
  },
  {
    word: "BLOOM",
    category: "Spring",
    clue: "What flowers do when spring says it's time to shine.",
    hints: [
      "Five letters. Petals open up!",
      "Gardens are full of them in April.",
      "Rhymes with room.",
      "Starts with B — roses do this beautifully.",
    ],
  },
  {
    word: "CRANE",
    category: "Sky",
    clue: "A tall bird on one leg — or a machine that lifts heavy things.",
    hints: [
      "Five letters. Bird or construction machine.",
      "Both are very tall!",
      "Rhymes with plane.",
      "Starts with C — a famous origami bird.",
    ],
  },
  {
    word: "DRIFT",
    category: "Motion",
    clue: "To wander along slowly, like a leaf on a breeze.",
    hints: [
      "Five letters. Snow, clouds, or thoughts can do it.",
      "No rush — just floating along.",
      "Rhymes with gift.",
      "Starts with D — what snow does in the wind.",
    ],
  },
  {
    word: "HAVEN",
    category: "Cozy",
    clue: "A warm, safe place where you feel right at home.",
    hints: [
      "Five letters. A peaceful refuge.",
      "Like a cozy harbor on a stormy day.",
      "Rhymes with raven.",
      "Starts with H — your happy hideaway.",
    ],
  },
  {
    word: "PIXEL",
    category: "Screens",
    clue: "A teeny-tiny dot of color that makes up every picture on a screen.",
    hints: [
      "Five letters. Millions make one image.",
      "Too small to see, but very important!",
      "Ends with L.",
      "Starts with P — the building block of digital art.",
    ],
  },
];

export function getDailyWord(): WanderWord {
  const start = new Date(2024, 0, 1);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.floor(
    (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );
  return WANDER_WORDS[days % WANDER_WORDS.length];
}

export function getRandomWord(): WanderWord {
  return WANDER_WORDS[Math.floor(Math.random() * WANDER_WORDS.length)];
}
