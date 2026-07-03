export type QuizCategory = "games" | "geography" | "aqua";

export type QuizMode =
  | "starcraft"
  | "pokemon"
  | "minecraft"
  | "fortnite"
  | "states-capitals"
  | "countries"
  | "sea-animals"
  | "ocean";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  image?: string;
  imageAlt?: string;
  tier?: "easy" | "medium" | "hard";
}

export const CATEGORIES: Record<
  QuizCategory,
  { label: string; emoji: string; description: string; image: string }
> = {
  games: {
    label: "Games",
    emoji: "🎮",
    description: "Video game trivia — StarCraft, Pokémon, Minecraft & Fortnite",
    image: "/backgrounds/starcraft-bg.png",
  },
  geography: {
    label: "Geography",
    emoji: "🗺️",
    description: "U.S. state capitals and world country flags",
    image: "/backgrounds/geography-bg.png",
  },
  aqua: {
    label: "Aqua",
    emoji: "🌊",
    description: "Sea creatures, coral reefs, and ocean science",
    image: "/backgrounds/aqua-bg.png",
  },
};

export const QUIZ_MODES: Record<
  QuizMode,
  {
    label: string;
    emoji: string;
    description: string;
    category: QuizCategory;
  }
> = {
  starcraft: {
    label: "StarCraft",
    emoji: "⚔️",
    description: "Units, races, maps, mechanics & lore",
    category: "games",
  },
  pokemon: {
    label: "Pokémon",
    emoji: "⚡",
    description: "Names, types, evolutions, games & generations",
    category: "games",
  },
  minecraft: {
    label: "Minecraft",
    emoji: "⛏️",
    description: "Blocks, mobs, crafting, biomes & survival",
    category: "games",
  },
  fortnite: {
    label: "Fortnite",
    emoji: "🎯",
    description: "Battle Royale, weapons, items, locations & modes",
    category: "games",
  },
  "states-capitals": {
    label: "50 States & Capitals",
    emoji: "🇺🇸",
    description: "Match each U.S. state to its capital city.",
    category: "geography",
  },
  countries: {
    label: "Guess the Country",
    emoji: "🌍",
    description: "Identify countries around the world by their flags.",
    category: "geography",
  },
  "sea-animals": {
    label: "Sea Animals",
    emoji: "🐠",
    description: "Dolphins, sharks, whales, and life beneath the waves.",
    category: "aqua",
  },
  ocean: {
    label: "The Ocean",
    emoji: "🌊",
    description: "Tides, trenches, currents, and ocean facts.",
    category: "aqua",
  },
};

export const STARCRAFT_QUESTIONS: QuizQuestion[] = [
  {
    id: "sc-1",
    question: "Which Protoss unit can use Blink to teleport short distances?",
    options: ["Zealot", "Stalker", "Immortal", "Sentry"],
    correctIndex: 1,
    tier: "easy",
  },
  {
    id: "sc-2",
    question: "What is the main job of a Zerg Overlord?",
    options: ["Anti-air defense", "Supply & vision", "Mining minerals", "Casting spells"],
    correctIndex: 1,
    tier: "easy",
  },
  {
    id: "sc-3",
    question: "Which Terran unit gathers resources and builds structures?",
    options: ["Marine", "SCV", "Medivac", "Reaper"],
    correctIndex: 1,
    tier: "easy",
  },
  {
    id: "sc-4",
    question: "Which race warps in units from a Warp Gate?",
    options: ["Terran", "Zerg", "Protoss", "All three"],
    correctIndex: 2,
    tier: "easy",
  },
  {
    id: "sc-5",
    question: "What does a Protoss Pylon provide?",
    options: ["Vespene gas", "Supply & power field", "Creep spread", "Lift-off"],
    correctIndex: 1,
    tier: "easy",
  },
  {
    id: "sc-6",
    question: "Who is known as the Queen of Blades?",
    options: ["Tassadar", "Kerrigan", "Zeratul", "Raynor"],
    correctIndex: 1,
    tier: "easy",
  },
  {
    id: "sc-7",
    question: "Which Terran building can lift off and fly to a new location?",
    options: ["Bunker", "Supply Depot", "Barracks", "Missile Turret"],
    correctIndex: 2,
    tier: "easy",
  },
  {
    id: "sc-8",
    question: "What ability lets a Protoss Sentry create fake units?",
    options: ["Psionic Storm", "Hallucination", "Force Field", "Guardian Shield"],
    correctIndex: 1,
    tier: "easy",
  },
  {
    id: "sc-9",
    question: "Which map feature is unique to Zerg bases?",
    options: ["Power fields", "Creep", "Add-ons", "Chrono Boost"],
    correctIndex: 1,
    tier: "easy",
  },
  {
    id: "sc-10",
    question: "What does Chronoboost speed up on a Protoss Nexus?",
    options: ["Unit movement", "Production or research", "Shield regen", "Mineral income"],
    correctIndex: 1,
    tier: "easy",
  },
  {
    id: "sc-11",
    question: "Which unit is a common Terran option for shooting down air units?",
    options: ["Zealot", "Marine", "Zergling", "Colossus"],
    correctIndex: 1,
    tier: "easy",
  },
  {
    id: "sc-12",
    question: "Which Protoss unit is invisible and used for detection?",
    options: ["Observer", "Phoenix", "Void Ray", "Disruptor"],
    correctIndex: 0,
    tier: "easy",
  },
  {
    id: "sc-13",
    question: "What resource do all three races collect besides minerals?",
    options: ["Energy", "Vespene Gas", "Supply", "Credits"],
    correctIndex: 1,
    tier: "easy",
  },
  {
    id: "sc-14",
    question: "Which Zerg ground unit can burrow underground?",
    options: ["Hydralisk", "Roach", "Mutalisk", "Ultralisk"],
    correctIndex: 1,
    tier: "easy",
  },
  {
    id: "sc-15",
    question: "Which Terran flying unit heals injured biological units?",
    options: ["Viking", "Medivac", "Raven", "Liberator"],
    correctIndex: 1,
    tier: "easy",
  },
  {
    id: "sc-16",
    question: "Which Protoss hero sacrificed himself to destroy the Zerg Overmind?",
    options: ["Artanis", "Tassadar", "Fenix", "Karax"],
    correctIndex: 1,
    tier: "easy",
  },
  {
    id: "sc-17",
    question: "What does a Zerg Spawning Pool let you build first?",
    options: ["Roaches", "Zerglings", "Mutalisks", "Banelings"],
    correctIndex: 1,
    tier: "easy",
  },
  {
    id: "sc-18",
    question: "Which Terran unit can switch into long-range siege artillery mode?",
    options: ["Siege Tank", "Thor", "Hellion", "Ghost"],
    correctIndex: 0,
    tier: "easy",
  },
  {
    id: "sc-19",
    question: "Which tall Protoss unit attacks with dual thermal lances?",
    options: ["Immortal", "Colossus", "Archon", "Disruptor"],
    correctIndex: 1,
    tier: "easy",
  },
  {
    id: "sc-20",
    question: "Which Zerg flying unit spits Corrosive Bile at structures?",
    options: ["Corruptor", "Mutalisk", "Viper", "Brood Lord"],
    correctIndex: 0,
    tier: "easy",
  },
  {
    id: "sc-21",
    question: "Which race uses Larvae at Hatcheries to make workers and units?",
    options: ["Terran", "Protoss", "Zerg", "None of them"],
    correctIndex: 2,
    tier: "easy",
  },
  {
    id: "sc-22",
    question: "What is the maximum supply limit per player in StarCraft II?",
    options: ["150", "200", "250", "300"],
    correctIndex: 1,
    tier: "easy",
  },
  {
    id: "sc-23",
    question: "Which three races can you play as in StarCraft?",
    options: [
      "Human, Elf, Orc",
      "Terran, Zerg, Protoss",
      "Marine, Alien, Robot",
      "Earth, Mars, Venus",
    ],
    correctIndex: 1,
    tier: "easy",
  },
  {
    id: "sc-24",
    question: "Who is the main Terran rebel leader in StarCraft II?",
    options: ["Arcturus Mengsk", "Jim Raynor", "Tychus Findlay", "Matt Horner"],
    correctIndex: 1,
    tier: "easy",
  },
  {
    id: "sc-25",
    question: "Which company created StarCraft?",
    options: ["Riot Games", "Blizzard Entertainment", "Epic Games", "Valve"],
    correctIndex: 1,
    tier: "easy",
  },
];

export const POKEMON_QUESTIONS: QuizQuestion[] = [
  {
    id: "pk-1",
    question: "Which Pokémon has the highest base Attack stat of any non-Mega Pokémon?",
    options: ["Rampardos", "Kartana", "Deoxys-Attack", "Primal Groudon"],
    correctIndex: 1,
  },
  {
    id: "pk-2",
    question: "What is the maximum useful EV investment a single stat can receive?",
    options: ["128", "200", "252", "510"],
    correctIndex: 2,
  },
  {
    id: "pk-3",
    question: "Which Hidden Ability does Greninja have that changes its type to the type of the move it just used?",
    options: ["Protean", "Color Change", "Adaptability", "Torrent"],
    correctIndex: 0,
  },
  {
    id: "pk-4",
    question: "What is the base power of Explosion (the strongest single-target physical move that isn't a Z-Move or Max Move)?",
    options: ["150", "200", "250", "300"],
    correctIndex: 2,
  },
  {
    id: "pk-5",
    question: "Which signature move lets Rayquaza Mega Evolve without a Mega Stone?",
    options: ["Dragon Ascent", "Draco Meteor", "Sky Attack", "Outrage"],
    correctIndex: 0,
  },
  {
    id: "pk-6",
    question: "What ability does Primal Kyogre have that summons heavy rain and blocks Fire moves?",
    options: ["Drizzle", "Primordial Sea", "Rain Dish", "Sheer Force"],
    correctIndex: 1,
  },
  {
    id: "pk-7",
    question: "Which condition is required to evolve Eevee into Sylveon?",
    options: [
      "Level up with high friendship at night",
      "Level up with high friendship knowing a Fairy-type move",
      "Level up near a Moss Rock",
      "Use a Shiny Stone",
    ],
    correctIndex: 1,
  },
  {
    id: "pk-8",
    question: "Which Fire-type move has the highest base power (excluding Z-Moves and Max Moves)?",
    options: ["Flare Blitz", "Overheat", "V-create", "Blast Burn"],
    correctIndex: 2,
  },
  {
    id: "pk-9",
    question: "What is the dual typing of the Ultra Beast Kartana?",
    options: ["Grass / Steel", "Grass / Flying", "Bug / Steel", "Steel / Fighting"],
    correctIndex: 0,
  },
  {
    id: "pk-10",
    question: "Which Pokémon has the ability Wonder Guard, making it immune to non–super-effective moves?",
    options: ["Sableye", "Spiritomb", "Shedinja", "Dusknoir"],
    correctIndex: 2,
  },
  {
    id: "pk-11",
    question: "Which Pokémon has \"Judgment\" as its signature move?",
    options: ["Arceus", "Rayquaza", "Mewtwo", "Palkia"],
    correctIndex: 0,
  },
  {
    id: "pk-12",
    question: "What is Ditto's Hidden Ability that transforms it into the opponent upon entering battle?",
    options: ["Transform", "Imposter", "Change Form", "Copycat"],
    correctIndex: 1,
  },
  {
    id: "pk-13",
    question: "What is the signature move of Zacian in its Crowned Sword form?",
    options: ["Behemoth Blade", "Behemoth Bash", "Sacred Sword", "Iron Head"],
    correctIndex: 0,
  },
  {
    id: "pk-14",
    question: "What is the unique dual typing of Rotom-Wash?",
    options: ["Electric / Water", "Electric / Ghost", "Water / Ghost", "Electric / Ice"],
    correctIndex: 0,
  },
  {
    id: "pk-15",
    question: "Which starter Pokémon evolutionary line has Speed Boost as its Hidden Ability?",
    options: ["Torchic line", "Chimchar line", "Tepig line", "Fennekin line"],
    correctIndex: 0,
  },
  {
    id: "pk-16",
    question: "Which held item lets Mewtwo Mega Evolve into Mega Mewtwo Y?",
    options: ["Mewtwonite X", "Mewtwonite Y", "Master Ball", "Life Orb"],
    correctIndex: 1,
  },
  {
    id: "pk-17",
    question: "Yanma evolves into Yanmega only when it levels up knowing which specific move?",
    options: ["Ancient Power", "Silver Wind", "Air Slash", "Double-Edge"],
    correctIndex: 0,
  },
  {
    id: "pk-18",
    question: "Which non-Mega Pokémon has the highest base stat total?",
    options: ["Mewtwo", "Rayquaza", "Arceus", "Kyogre"],
    correctIndex: 2,
  },
  {
    id: "pk-19",
    question: "Kadabra evolves into Alakazam only under which condition?",
    options: [
      "Level up while holding a Twisted Spoon",
      "Trade to another player",
      "Use a Sun Stone",
      "Reach level 42",
    ],
    correctIndex: 1,
  },
  {
    id: "pk-20",
    question: "Which two Pokémon types were introduced in Generation II?",
    options: [
      "Dark and Steel",
      "Fairy and Dark",
      "Steel and Fairy",
      "Ghost and Dragon",
    ],
    correctIndex: 0,
  },
  {
    id: "pk-21",
    question: "What is the standard IV cap for each stat on a Pokémon?",
    options: ["15", "31", "63", "255"],
    correctIndex: 1,
  },
  {
    id: "pk-22",
    question: "What is the base power of Water Spout when the user is at 100% HP?",
    options: ["100", "120", "150", "180"],
    correctIndex: 2,
  },
  {
    id: "pk-23",
    question: "What is Snorlax's signature Z-Move associated with Pulverizing Pancake?",
    options: [
      "Pulverizing Pancake (requires Snorlium Z)",
      "Extreme Evoboost",
      "Genesis Supernova",
      "Sinister Arrow Raid",
    ],
    correctIndex: 0,
  },
  {
    id: "pk-24",
    question: "In which region's game does the player first encounter Team Galactic?",
    options: ["Hoenn", "Sinnoh", "Unova", "Kalos"],
    correctIndex: 1,
  },
  {
    id: "pk-25",
    question: "Which Generation I Pokémon has the highest base stat total?",
    options: ["Mewtwo", "Dragonite", "Snorlax", "Alakazam"],
    correctIndex: 0,
  },
];

export const MINECRAFT_QUESTIONS: QuizQuestion[] = [
  {
    id: "mc-1",
    question: "How many bookshelves must surround an Enchanting Table for maximum enchantment power?",
    options: ["12", "15", "16", "20"],
    correctIndex: 1,
  },
  {
    id: "mc-2",
    question: "At which Y-level are diamonds most abundant in Java Edition 1.18+?",
    options: ["-59", "-32", "12", "16"],
    correctIndex: 0,
  },
  {
    id: "mc-3",
    question: "How many blocks total are required to build a maximum-power (Level 4) Beacon pyramid?",
    options: ["91", "128", "164", "219"],
    correctIndex: 2,
  },
  {
    id: "mc-4",
    question: "Which combination crafts a single Piston?",
    options: [
      "3 planks + 4 cobblestone + 1 iron ingot + 1 redstone",
      "4 planks + 3 cobblestone + 1 iron ingot + 1 redstone",
      "3 planks + 4 cobblestone + 1 gold ingot + 1 redstone",
      "3 planks + 4 stone + 2 iron ingots",
    ],
    correctIndex: 0,
  },
  {
    id: "mc-5",
    question: "What is the maximum HP of an Iron Golem?",
    options: ["50", "75", "100", "200"],
    correctIndex: 2,
  },
  {
    id: "mc-6",
    question: "The Deep Dark biome generates primarily below which Y-level?",
    options: ["Y=64", "Y=32", "Y=0", "Y=-64 only"],
    correctIndex: 2,
  },
  {
    id: "mc-7",
    question: "Which of these mobs only spawns via commands, never naturally?",
    options: ["Vindicator", "Evoker", "Illusioner", "Vex"],
    correctIndex: 2,
  },
  {
    id: "mc-8",
    question: "What is the maximum level of the Efficiency enchantment on a tool?",
    options: ["III", "IV", "V", "X"],
    correctIndex: 2,
  },
  {
    id: "mc-9",
    question: "How many hit points does the Ender Dragon have in Java Edition?",
    options: ["100", "200", "250", "300"],
    correctIndex: 1,
  },
  {
    id: "mc-10",
    question: "What is the maximum number of Ender Pearls a single Enderman can drop with Looting III?",
    options: ["0–1", "0–4", "1–3", "0–5"],
    correctIndex: 1,
  },
  {
    id: "mc-11",
    question: "Which structure contains the End Portal frames?",
    options: ["Nether Fortress", "End City", "Stronghold", "Ancient City"],
    correctIndex: 2,
  },
  {
    id: "mc-12",
    question: "How many Eyes of Ender are required at most to fully activate an End Portal?",
    options: ["8", "10", "12", "16"],
    correctIndex: 2,
  },
  {
    id: "mc-13",
    question: "In Java Edition 1.18+, hostile mobs only spawn at what light level?",
    options: ["7 or below", "5 or below", "Exactly 0", "Any light level"],
    correctIndex: 2,
  },
  {
    id: "mc-14",
    question: "What percentage of fall damage does the Feather Falling IV enchantment prevent?",
    options: ["48%", "60%", "84%", "100%"],
    correctIndex: 0,
  },
  {
    id: "mc-15",
    question: "What pickaxe tier is required to mine Ancient Debris?",
    options: ["Iron", "Diamond", "Netherite", "Stone"],
    correctIndex: 1,
  },
  {
    id: "mc-16",
    question: "What is required to craft a single Netherite Ingot?",
    options: [
      "4 Gold Ingots + 4 Netherite Scrap",
      "1 Gold Ingot + 4 Netherite Scrap",
      "4 Netherite Scrap only",
      "1 Diamond + 4 Netherite Scrap",
    ],
    correctIndex: 0,
  },
  {
    id: "mc-17",
    question: "How many blocks can a Redstone signal travel from a source before needing a Repeater?",
    options: ["8", "12", "15", "16"],
    correctIndex: 2,
  },
  {
    id: "mc-18",
    question: "What is the player's maximum reach distance for blocks in Java Edition Survival mode?",
    options: ["3.0 blocks", "4.5 blocks", "5.0 blocks", "6.0 blocks"],
    correctIndex: 1,
  },
  {
    id: "mc-19",
    question: "Which is the ONLY passive (non-hostile) mob that spawns naturally in the Nether?",
    options: ["Strider", "Piglin", "Zoglin", "Ghast"],
    correctIndex: 0,
  },
  {
    id: "mc-20",
    question: "What is the base drop chance of a Wither Skeleton Skull without the Looting enchantment?",
    options: ["0.5%", "2.5%", "5%", "10%"],
    correctIndex: 1,
  },
  {
    id: "mc-21",
    question: "What blocks are required to summon the Wither boss?",
    options: [
      "4 Soul Sand + 3 Wither Skeleton Skulls",
      "3 Soul Soil + 4 Wither Skulls",
      "4 Obsidian + 3 Wither Skulls",
      "3 Netherrack + 3 Wither Skulls",
    ],
    correctIndex: 0,
  },
  {
    id: "mc-22",
    question: "What is the crafting recipe for a Beacon?",
    options: [
      "5 Glass + 3 Obsidian + 1 Nether Star",
      "4 Glass + 4 Obsidian + 1 Nether Star",
      "3 Glass + 5 Obsidian + 1 Heart of the Sea",
      "5 Glass + 3 Diamond + 1 Nether Star",
    ],
    correctIndex: 0,
  },
  {
    id: "mc-23",
    question: "How must Dark Oak saplings be arranged to grow into a full tree?",
    options: [
      "A single sapling on any dirt block",
      "Four saplings placed in a 2×2 square",
      "Nine saplings in a 3×3 square",
      "Six saplings in a line",
    ],
    correctIndex: 1,
  },
  {
    id: "mc-24",
    question: "Which Nether mob must be killed to obtain Blaze Rods for brewing potions?",
    options: ["Blaze", "Ghast", "Piglin", "Magma Cube"],
    correctIndex: 0,
  },
  {
    id: "mc-25",
    question: "What is the base explosion power (radius input) of a single TNT block?",
    options: ["2", "4", "6", "8"],
    correctIndex: 1,
  },
];

export const FORTNITE_QUESTIONS: QuizQuestion[] = [
  {
    id: "fn-1",
    question: "What was the name of Fortnite's very first live in-game event, held at Dusty Depot in June 2018?",
    options: ["The Blast Off", "The Rocket Launch", "The Meteor", "The Unvaulting"],
    correctIndex: 1,
  },
  {
    id: "fn-2",
    question: "Which Chapter 1 POI was destroyed by the meteor event and became known as Dusty Divot?",
    options: ["Tilted Towers", "Tomato Town", "Dusty Depot", "Loot Lake"],
    correctIndex: 2,
  },
  {
    id: "fn-3",
    question: "What is the maximum combined health + shield a player can have in classic Battle Royale?",
    options: ["100", "150", "200", "300"],
    correctIndex: 2,
  },
  {
    id: "fn-4",
    question: "Which Chapter 2 Season 2 boss dropped the Mythic Drum Gun?",
    options: ["Meowscles", "TNTina", "Midas", "Skye"],
    correctIndex: 2,
  },
  {
    id: "fn-5",
    question: "In which Chapter and Season was the Reboot Van (to revive eliminated teammates) first introduced?",
    options: [
      "Chapter 1 Season 8",
      "Chapter 2 Season 1",
      "Chapter 2 Season 2",
      "Chapter 3 Season 1",
    ],
    correctIndex: 0,
  },
  {
    id: "fn-6",
    question: "Which Chapter and Season introduced the standalone Zero Build mode?",
    options: [
      "Chapter 2 Season 8",
      "Chapter 3 Season 2",
      "Chapter 3 Season 4",
      "Chapter 4 Season 1",
    ],
    correctIndex: 1,
  },
  {
    id: "fn-7",
    question: "What is the nickname players gave to the sentient purple cube introduced in Chapter 1 Season 5?",
    options: ["Kevin", "Bob", "Rufus", "Kubey"],
    correctIndex: 0,
  },
  {
    id: "fn-8",
    question: "Which soccer superstar received an Icon Series skin in Chapter 2 Season 6?",
    options: ["Cristiano Ronaldo", "Lionel Messi", "Neymar Jr.", "Kylian Mbappé"],
    correctIndex: 2,
  },
  {
    id: "fn-9",
    question: "Which Fortnite character is voiced by Dwayne \"The Rock\" Johnson?",
    options: ["The Paradigm", "The Foundation", "Agent Jones", "The Scientist"],
    correctIndex: 1,
  },
  {
    id: "fn-10",
    question: "Which weapon was in Fortnite for only about 4 days in December 2018 before being vaulted after community backlash?",
    options: ["Infinity Blade", "Boombox", "Chiller Grenade", "Zapotron"],
    correctIndex: 0,
  },
  {
    id: "fn-11",
    question: "In Fortnite lore, what is \"The Seven\"?",
    options: [
      "A group of dimensional agents opposing the Imagined Order",
      "The original Battle Bus pilots",
      "A squad of villains from inside the Storm",
      "The first seven vaulted weapons",
    ],
    correctIndex: 0,
  },
  {
    id: "fn-12",
    question: "Which Chapter and Season first introduced driveable cars to Battle Royale?",
    options: [
      "Chapter 1 Season 9",
      "Chapter 2 Season 3",
      "Chapter 2 Season 4",
      "Chapter 3 Season 1",
    ],
    correctIndex: 1,
  },
  {
    id: "fn-13",
    question: "How much health does a Chug Splash restore to yourself and teammates in its area of effect?",
    options: ["10", "20", "30", "50"],
    correctIndex: 1,
  },
  {
    id: "fn-14",
    question: "How much damage per tick does the Storm deal in its final phase in classic Battle Royale?",
    options: ["2", "5", "10", "20"],
    correctIndex: 2,
  },
  {
    id: "fn-15",
    question: "In which Chapter and Season was the Sliding movement mechanic introduced?",
    options: [
      "Chapter 2 Season 8",
      "Chapter 3 Season 1",
      "Chapter 3 Season 3",
      "Chapter 4 Season 1",
    ],
    correctIndex: 1,
  },
  {
    id: "fn-16",
    question: "Which Chapter 1 event destroyed Tilted Towers and Retail Row at the start of Season 9?",
    options: [
      "The Meteor",
      "The Volcano Eruption",
      "The Unvaulting",
      "The Blast Off",
    ],
    correctIndex: 1,
  },
  {
    id: "fn-17",
    question: "What is the body-shot damage of a Legendary Bolt-Action Sniper Rifle in classic Battle Royale?",
    options: ["105", "110", "116", "132"],
    correctIndex: 2,
  },
  {
    id: "fn-18",
    question: "Which crossover season pitted Marvel heroes against Galactus in \"Nexus War\"?",
    options: [
      "Chapter 2 Season 3",
      "Chapter 2 Season 4",
      "Chapter 2 Season 5",
      "Chapter 2 Season 6",
    ],
    correctIndex: 1,
  },
  {
    id: "fn-19",
    question: "Who is Agent Jonesy (\"Agent Jones\") working for at the start of Chapter 2 Season 5?",
    options: [
      "The Imagined Order (IO)",
      "The Seven",
      "The Foundation",
      "Ghost, from Chapter 2 Season 2",
    ],
    correctIndex: 0,
  },
  {
    id: "fn-20",
    question: "During which live event did The Foundation (Dwayne Johnson) first appear in-game?",
    options: [
      "Operation: Sky Fire",
      "The End (Chapter 2 finale, Dec 2021)",
      "The Big Bang",
      "Collision",
    ],
    correctIndex: 1,
  },
  {
    id: "fn-21",
    question: "Which Fortnite building material has the highest max HP per wall piece?",
    options: ["Wood", "Brick / Stone", "Metal", "They're all equal at max"],
    correctIndex: 2,
  },
  {
    id: "fn-22",
    question: "Which Chapter 1 Season 6 item let players briefly phase through walls?",
    options: ["Rift-to-Go", "Shadow Stone", "Grappler", "Launch Pad"],
    correctIndex: 1,
  },
  {
    id: "fn-23",
    question: "What was the tagline of Fortnite Chapter 1 Season 6?",
    options: [
      "Darkness Rises",
      "Neo Tilted Falls",
      "Marvel Nexus",
      "Battle Pass Rebooted",
    ],
    correctIndex: 0,
  },
  {
    id: "fn-24",
    question: "Which weapon won the community \"Unvaulting\" vote in March 2019 and was reintroduced to Fortnite?",
    options: [
      "Drum Gun",
      "Tactical SMG",
      "Bouncer Trap",
      "Guided Missile",
    ],
    correctIndex: 0,
  },
  {
    id: "fn-25",
    question: "Which Chapter launch introduced both Rocket Racing and LEGO Fortnite as new modes?",
    options: [
      "Chapter 4 Season 3",
      "Chapter 5 Season 1",
      "Chapter 5 Season 2",
      "Chapter 5 Season 4",
    ],
    correctIndex: 1,
  },
];

export const SEA_ANIMALS_QUESTIONS: QuizQuestion[] = [
  {
    id: "sa-1",
    question: "Which sea animal is the largest animal ever known to have lived?",
    options: ["Great White Shark", "Blue Whale", "Giant Squid", "Whale Shark"],
    correctIndex: 1
  },
  {
    id: "sa-2",
    question: "What type of animal is a clownfish?",
    options: ["Mammal", "Fish", "Crustacean", "Mollusk"],
    correctIndex: 1
  },
  {
    id: "sa-3",
    question: "How many arms does a typical octopus have?",
    options: ["6", "8", "10", "12"],
    correctIndex: 1
  },
  {
    id: "sa-4",
    question: "Which sea creature is known for its ability to change color and texture to camouflage?",
    options: ["Jellyfish", "Cuttlefish", "Starfish", "Sea Urchin"],
    correctIndex: 1
  },
  {
    id: "sa-5",
    question: "What do sea turtles use to navigate long ocean migrations?",
    options: [
      "Sound waves only",
      "Earth's magnetic field",
      "Following other turtles only",
      "Sun position only",
    ],
    correctIndex: 1
  },
  {
    id: "sa-6",
    question: "Which animal is the fastest swimmer in the ocean?",
    options: ["Dolphin", "Sailfish", "Great White Shark", "Orca"],
    correctIndex: 1
  },
  {
    id: "sa-7",
    question: "What is a group of jellyfish called?",
    options: ["School", "Pod", "Bloom", "Flock"],
    correctIndex: 2
  },
  {
    id: "sa-8",
    question: "Which marine mammal is known as the \"unicorn of the sea\"?",
    options: ["Beluga", "Narwhal", "Dugong", "Manatee"],
    correctIndex: 1
  },
  {
    id: "sa-9",
    question: "What do whales use to filter tiny food from the water?",
    options: ["Gills", "Baleen plates", "Tentacles", "Claws"],
    correctIndex: 1
  },
  {
    id: "sa-10",
    question: "Which fish is famous for puffing up when threatened?",
    options: ["Anglerfish", "Pufferfish", "Lionfish", "Barracuda"],
    correctIndex: 1
  },
  {
    id: "sa-11",
    question: "What type of animal is a starfish (sea star)?",
    options: ["Fish", "Echinoderm", "Crustacean", "Mollusk"],
    correctIndex: 1
  },
  {
    id: "sa-12",
    question: "Which shark has a distinctly hammer-shaped head?",
    options: [
      "Tiger Shark",
      "Hammerhead Shark",
      "Bull Shark",
      "Mako Shark",
    ],
    correctIndex: 1
  },
  {
    id: "sa-13",
    question: "What is the largest species of ray?",
    options: ["Stingray", "Manta Ray", "Electric Ray", "Skate"],
    correctIndex: 1
  },
  {
    id: "sa-14",
    question: "Which sea animal produces pearls inside its shell?",
    options: ["Crab", "Oyster", "Lobster", "Shrimp"],
    correctIndex: 1
  },
  {
    id: "sa-15",
    question: "What do male seahorses do that is unusual among animals?",
    options: [
      "Lay eggs",
      "Carry and give birth to young",
      "Build nests in coral",
      "Change color every season",
    ],
    correctIndex: 1
  },
  {
    id: "sa-16",
    question: "Which ocean predator is actually the largest member of the dolphin family?",
    options: ["Great White Shark", "Orca (Killer Whale)", "Leopard Seal", "Moray Eel"],
    correctIndex: 1
  },
  {
    id: "sa-17",
    question: "What deep-sea fish uses a glowing lure on its head to attract prey?",
    options: ["Lanternfish", "Anglerfish", "Viperfish", "Hatchetfish"],
    correctIndex: 1
  },
  {
    id: "sa-18",
    question: "Which gentle giant feeds mainly on krill and small fish?",
    options: ["Great White Shark", "Whale Shark", "Barracuda", "Moray Eel"],
    correctIndex: 1
  },
  {
    id: "sa-19",
    question: "What type of animal is a lobster?",
    options: ["Fish", "Crustacean", "Mollusk", "Echinoderm"],
    correctIndex: 1
  },
  {
    id: "sa-20",
    question: "Which marine mammal has long tusks and lives in Arctic waters?",
    options: ["Walrus", "Sea Lion", "Dugong", "Harbor Seal"],
    correctIndex: 0
  },
  {
    id: "sa-21",
    question: "What is the main diet of most coral polyps?",
    options: [
      "Large fish",
      "Tiny plankton and algae partners",
      "Seaweed only",
      "Other corals",
    ],
    correctIndex: 1
  },
  {
    id: "sa-22",
    question: "Which animal has three hearts and blue blood?",
    options: ["Jellyfish", "Octopus", "Sea Cucumber", "Crab"],
    correctIndex: 1
  },
  {
    id: "sa-23",
    question: "What do dolphins use to find food and navigate in murky water?",
    options: ["Infrared vision", "Echolocation", "Magnetism", "Chemical trails only"],
    correctIndex: 1
  },
  {
    id: "sa-24",
    question: "Which spiny fish is known for its venomous fin spines?",
    options: ["Lionfish", "Tuna", "Cod", "Sardine"],
    correctIndex: 0
  },
  {
    id: "sa-25",
    question: "What slow-moving mammal is often called a \"sea cow\"?",
    options: ["Walrus", "Manatee", "Sea Otter", "Polar Bear"],
    correctIndex: 1
  },
];

export const OCEAN_QUESTIONS: QuizQuestion[] = [
  {
    id: "oc-1",
    question: "Which ocean is the largest on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
    correctIndex: 2,
  },
  {
    id: "oc-2",
    question: "What is the deepest known point in the ocean?",
    options: [
      "Puerto Rico Trench",
      "Mariana Trench",
      "Java Trench",
      "Tonga Trench",
    ],
    correctIndex: 1,
  },
  {
    id: "oc-3",
    question: "What primarily causes ocean tides?",
    options: [
      "Ocean currents",
      "Wind",
      "Gravitational pull of the Moon and Sun",
      "Underwater earthquakes",
    ],
    correctIndex: 2,
  },
  {
    id: "oc-4",
    question: "What percentage of Earth's surface is covered by oceans (approximately)?",
    options: ["51%", "61%", "71%", "81%"],
    correctIndex: 2,
  },
  {
    id: "oc-5",
    question: "Which layer of the ocean receives the most sunlight?",
    options: ["Abyssal zone", "Sunlight (epipelagic) zone", "Hadal zone", "Midnight zone"],
    correctIndex: 1,
  },
  {
    id: "oc-6",
    question: "What is the name for a warm ocean current that flows from the Gulf of Mexico toward Europe?",
    options: ["Humboldt Current", "Gulf Stream", "California Current", "Labrador Current"],
    correctIndex: 1,
  },
  {
    id: "oc-7",
    question: "What gas do oceans absorb large amounts of from the atmosphere?",
    options: ["Nitrogen", "Oxygen", "Carbon dioxide", "Helium"],
    correctIndex: 2,
  },
  {
    id: "oc-8",
    question: "Which underwater mountain range runs down the middle of the Atlantic Ocean?",
    options: [
      "Himalayas",
      "Mid-Atlantic Ridge",
      "Mariana Ridge",
      "Andes Undersea Chain",
    ],
    correctIndex: 1,
  },
  {
    id: "oc-9",
    question: "What is an estuary?",
    options: [
      "A deep ocean trench",
      "Where a river meets the sea",
      "A type of coral reef",
      "An underwater volcano",
    ],
    correctIndex: 1,
  },
  {
    id: "oc-10",
    question: "What phenomenon raises sea surface temperatures in the eastern Pacific and can affect global weather?",
    options: ["La Niña", "El Niño", "Monsoon", "Gulf Stream reversal"],
    correctIndex: 1,
  },
  {
    id: "oc-11",
    question: "What is the average salinity of ocean water (in parts per thousand)?",
    options: ["About 5", "About 15", "About 35", "About 55"],
    correctIndex: 2,
  },
  {
    id: "oc-12",
    question: "Which type of wave is caused by underwater earthquakes or landslides?",
    options: ["Tidal wave (tsunami)", "Wind wave", "Rogue wave only", "Kelvin wave"],
    correctIndex: 0,
  },
  {
    id: "oc-13",
    question: "What are hydrothermal vents on the ocean floor often called?",
    options: ["Blue holes", "Black smokers", "White cliffs", "Salt domes"],
    correctIndex: 1,
  },
  {
    id: "oc-14",
    question: "Which ocean zone lies between the surface and about 200 meters deep?",
    options: ["Hadal", "Epipelagic (sunlight zone)", "Bathypelagic", "Abyssopelagic"],
    correctIndex: 1,
  },
  {
    id: "oc-15",
    question: "What is the continental shelf?",
    options: [
      "The deepest part of the ocean",
      "The shallow, gently sloping edge of a continent under the sea",
      "A coral atoll",
      "An oceanic trench",
    ],
    correctIndex: 1,
  },
  {
    id: "oc-16",
    question: "Which tiny ocean organisms form the base of many marine food webs?",
    options: ["Krill only", "Phytoplankton", "Jellyfish", "Coral polyps only"],
    correctIndex: 1,
  },
  {
    id: "oc-17",
    question: "What is the Great Pacific Garbage Patch mainly made of?",
    options: [
      "Sunken ships",
      "Floating plastic debris",
      "Volcanic ash",
      "Oil spills only",
    ],
    correctIndex: 1,
  },
  {
    id: "oc-18",
    question: "Why does the ocean appear blue to our eyes?",
    options: [
      "Because of fish pigments",
      "Water absorbs red light and scatters blue light",
      "Because of salt crystals",
      "Because of algae only",
    ],
    correctIndex: 1,
  },
  {
    id: "oc-19",
    question: "What is bioluminescence in the deep ocean?",
    options: [
      "Light from underwater volcanoes",
      "Living organisms producing their own light",
      "Reflection of moonlight only",
      "Light from sonar equipment",
    ],
    correctIndex: 1,
  },
  {
    id: "oc-20",
    question: "Which ocean is the smallest by area?",
    options: ["Indian Ocean", "Southern Ocean", "Arctic Ocean", "Atlantic Ocean"],
    correctIndex: 2,
  },
  {
    id: "oc-21",
    question: "What is a gyre in oceanography?",
    options: [
      "A type of fish migration",
      "A large system of rotating ocean currents",
      "An underwater cave",
      "A tidal bore",
    ],
    correctIndex: 1,
  },
  {
    id: "oc-22",
    question: "Kelp forests are found mainly in which type of water?",
    options: [
      "Tropical shallow seas",
      "Cold, nutrient-rich coastal waters",
      "Deep abyssal plains",
      "Freshwater lakes only",
    ],
    correctIndex: 1,
  },
  {
    id: "oc-23",
    question: "What is ocean acidification caused by?",
    options: [
      "Too much oxygen in water",
      "Increased absorption of CO₂ lowering pH",
      "Melting ice adding fresh water only",
      "Underwater mining",
    ],
    correctIndex: 1,
  },
  {
    id: "oc-24",
    question: "Which instrument is used to measure ocean depth from a ship?",
    options: ["Thermometer", "Sonar / echo sounder", "Barometer", "Anemometer"],
    correctIndex: 1,
  },
  {
    id: "oc-25",
    question: "What is the Coriolis effect's role in oceans?",
    options: [
      "It creates tides",
      "It deflects moving water and helps form currents",
      "It causes tsunamis",
      "It makes water more salty",
    ],
    correctIndex: 1,
  },
];

const STATE_CAPITAL_ENTRIES: readonly [string, string, string][] = [
  ["Alabama", "Montgomery", "al"],
  ["Alaska", "Juneau", "ak"],
  ["Arizona", "Phoenix", "az"],
  ["Arkansas", "Little Rock", "ar"],
  ["California", "Sacramento", "ca"],
  ["Colorado", "Denver", "co"],
  ["Connecticut", "Hartford", "ct"],
  ["Delaware", "Dover", "de"],
  ["Florida", "Tallahassee", "fl"],
  ["Georgia", "Atlanta", "ga"],
  ["Hawaii", "Honolulu", "hi"],
  ["Idaho", "Boise", "id"],
  ["Illinois", "Springfield", "il"],
  ["Indiana", "Indianapolis", "in"],
  ["Iowa", "Des Moines", "ia"],
  ["Kansas", "Topeka", "ks"],
  ["Kentucky", "Frankfort", "ky"],
  ["Louisiana", "Baton Rouge", "la"],
  ["Maine", "Augusta", "me"],
  ["Maryland", "Annapolis", "md"],
  ["Massachusetts", "Boston", "ma"],
  ["Michigan", "Lansing", "mi"],
  ["Minnesota", "Saint Paul", "mn"],
  ["Mississippi", "Jackson", "ms"],
  ["Missouri", "Jefferson City", "mo"],
  ["Montana", "Helena", "mt"],
  ["Nebraska", "Lincoln", "ne"],
  ["Nevada", "Carson City", "nv"],
  ["New Hampshire", "Concord", "nh"],
  ["New Jersey", "Trenton", "nj"],
  ["New Mexico", "Santa Fe", "nm"],
  ["New York", "Albany", "ny"],
  ["North Carolina", "Raleigh", "nc"],
  ["North Dakota", "Bismarck", "nd"],
  ["Ohio", "Columbus", "oh"],
  ["Oklahoma", "Oklahoma City", "ok"],
  ["Oregon", "Salem", "or"],
  ["Pennsylvania", "Harrisburg", "pa"],
  ["Rhode Island", "Providence", "ri"],
  ["South Carolina", "Columbia", "sc"],
  ["South Dakota", "Pierre", "sd"],
  ["Tennessee", "Nashville", "tn"],
  ["Texas", "Austin", "tx"],
  ["Utah", "Salt Lake City", "ut"],
  ["Vermont", "Montpelier", "vt"],
  ["Virginia", "Richmond", "va"],
  ["Washington", "Olympia", "wa"],
  ["West Virginia", "Charleston", "wv"],
  ["Wisconsin", "Madison", "wi"],
  ["Wyoming", "Cheyenne", "wy"],
];

const COUNTRY_FLAG_ENTRIES: readonly [string, string][] = [
  ["France", "fr"],
  ["Japan", "jp"],
  ["Brazil", "br"],
  ["Canada", "ca"],
  ["Germany", "de"],
  ["India", "in"],
  ["Australia", "au"],
  ["Mexico", "mx"],
  ["Italy", "it"],
  ["South Korea", "kr"],
  ["United Kingdom", "gb"],
  ["Spain", "es"],
  ["China", "cn"],
  ["Russia", "ru"],
  ["Argentina", "ar"],
  ["Egypt", "eg"],
  ["South Africa", "za"],
  ["Nigeria", "ng"],
  ["Sweden", "se"],
  ["Norway", "no"],
  ["Netherlands", "nl"],
  ["Turkey", "tr"],
  ["Greece", "gr"],
  ["Thailand", "th"],
  ["New Zealand", "nz"],
];

function pickDeterministicDistractors(
  pool: readonly string[],
  correct: string,
  index: number,
  seed: number,
): string[] {
  const distractors: string[] = [];
  let step = seed;
  let guard = 0;
  while (distractors.length < 3 && guard < pool.length * 3) {
    const candidate = pool[(index + step) % pool.length];
    if (candidate !== correct && !distractors.includes(candidate)) {
      distractors.push(candidate);
    }
    step += seed + 4;
    guard += 1;
  }
  return distractors;
}

function buildStatesCapitalsQuestions(): QuizQuestion[] {
  const capitals = STATE_CAPITAL_ENTRIES.map(([, capital]) => capital);
  return STATE_CAPITAL_ENTRIES.map(([state, capital, code], index) => {
    const distractors = pickDeterministicDistractors(
      capitals,
      capital,
      index,
      7,
    );
    const correctIndex = index % 4;
    const options = [...distractors];
    options.splice(correctIndex, 0, capital);
    return {
      id: `sac-${index + 1}`,
      question: `What is the capital of ${state}?`,
      options: options.slice(0, 4),
      correctIndex,
      image: `https://flagcdn.com/w320/us-${code}.png`,
      imageAlt: `${state} state flag`,
    };
  });
}

function buildCountriesQuestions(): QuizQuestion[] {
  const names = COUNTRY_FLAG_ENTRIES.map(([name]) => name);
  return COUNTRY_FLAG_ENTRIES.map(([name, code], index) => {
    const distractors = pickDeterministicDistractors(names, name, index, 5);
    const correctIndex = index % 4;
    const options = [...distractors];
    options.splice(correctIndex, 0, name);
    return {
      id: `country-${index + 1}`,
      question: "Which country does this flag belong to?",
      options: options.slice(0, 4),
      correctIndex,
      image: `https://flagcdn.com/w320/${code}.png`,
      imageAlt: "National flag",
    };
  });
}

export const STATES_CAPITALS_QUESTIONS: QuizQuestion[] =
  buildStatesCapitalsQuestions();

export const COUNTRIES_QUESTIONS: QuizQuestion[] = buildCountriesQuestions();

export function getQuestionsForMode(mode: QuizMode): QuizQuestion[] {
  switch (mode) {
    case "starcraft":
      return STARCRAFT_QUESTIONS;
    case "pokemon":
      return POKEMON_QUESTIONS;
    case "minecraft":
      return MINECRAFT_QUESTIONS;
    case "fortnite":
      return FORTNITE_QUESTIONS;
    case "states-capitals":
      return STATES_CAPITALS_QUESTIONS;
    case "countries":
      return COUNTRIES_QUESTIONS;
    case "sea-animals":
      return SEA_ANIMALS_QUESTIONS;
    case "ocean":
      return OCEAN_QUESTIONS;
  }
}

export function getQuestionCount(mode: QuizMode): number {
  return getQuestionsForMode(mode).length;
}

export function getModesForCategory(category: QuizCategory): QuizMode[] {
  return (Object.keys(QUIZ_MODES) as QuizMode[]).filter(
    (mode) => QUIZ_MODES[mode].category === category,
  );
}

export function getQuizCountForCategory(category: QuizCategory): number {
  return getModesForCategory(category).length;
}
