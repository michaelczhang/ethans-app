export type QuizMode = "starcraft" | "pokemon" | "minecraft" | "fortnite";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export const QUIZ_MODES: Record<
  QuizMode,
  { label: string; emoji: string; description: string }
> = {
  starcraft: {
    label: "StarCraft",
    emoji: "⚔️",
    description: "Units, races, maps, mechanics & lore",
  },
  pokemon: {
    label: "Pokémon",
    emoji: "⚡",
    description: "Names, types, evolutions, games & generations",
  },
  minecraft: {
    label: "Minecraft",
    emoji: "⛏️",
    description: "Blocks, mobs, crafting, biomes & survival",
  },
  fortnite: {
    label: "Fortnite",
    emoji: "🎯",
    description: "Battle Royale, weapons, items, locations & modes",
  },
};

export const STARCRAFT_QUESTIONS: QuizQuestion[] = [
  {
    id: "sc-1",
    question: "Which Protoss unit can use Blink to teleport short distances?",
    options: ["Zealot", "Stalker", "Immortal", "Sentry"],
    correctIndex: 1,
  },
  {
    id: "sc-2",
    question: "What is the primary role of a Zerg Overlord?",
    options: [
      "Anti-air defense",
      "Supply & vision",
      "Mineral gathering",
      "Spell casting",
    ],
    correctIndex: 1,
  },
  {
    id: "sc-3",
    question: "Which Terran worker unit can repair mechanical units and buildings?",
    options: ["Marine", "SCV", "Medivac", "Reaper"],
    correctIndex: 1,
  },
  {
    id: "sc-4",
    question: "Which race warps in units from a Warp Gate?",
    options: ["Terran", "Zerg", "Protoss", "All three"],
    correctIndex: 2,
  },
  {
    id: "sc-5",
    question: "What does a Protoss Pylon provide?",
    options: [
      "Vespene gas",
      "Supply & power field",
      "Creep spread",
      "Lift-off capability",
    ],
    correctIndex: 1,
  },
  {
    id: "sc-6",
    question: "Which Zerg unit morphs from a Larva at a Hatchery?",
    options: ["Marine", "Drone", "Probe", "SCV"],
    correctIndex: 1,
  },
  {
    id: "sc-7",
    question: "Who is known as the Queen of Blades?",
    options: ["Tassadar", "Kerrigan", "Zeratul", "Raynor"],
    correctIndex: 1,
  },
  {
    id: "sc-8",
    question: "Which Terran building can lift off and relocate?",
    options: ["Bunker", "Supply Depot", "Barracks", "Missile Turret"],
    correctIndex: 2,
  },
  {
    id: "sc-9",
    question: "What ability does a Protoss Sentry use to create fake units?",
    options: ["Psionic Storm", "Hallucination", "Force Field", "Guardian Shield"],
    correctIndex: 1,
  },
  {
    id: "sc-10",
    question: "Which map feature is unique to Zerg bases?",
    options: ["Power fields", "Creep", "Add-ons", "Chrono Boost"],
    correctIndex: 1,
  },
  {
    id: "sc-11",
    question: "What does Chronoboost accelerate on a Nexus?",
    options: [
      "Unit movement speed",
      "Production or research",
      "Shield regeneration",
      "Mineral income",
    ],
    correctIndex: 1,
  },
  {
    id: "sc-12",
    question: "Which unit is a common Terran anti-air option?",
    options: ["Zealot", "Marine", "Zergling", "Colossus"],
    correctIndex: 1,
  },
  {
    id: "sc-13",
    question: "In StarCraft II, which expansion added the Adept?",
    options: [
      "Wings of Liberty",
      "Heart of the Swarm",
      "Legacy of the Void",
      "Nova Covert Ops",
    ],
    correctIndex: 2,
  },
  {
    id: "sc-14",
    question: "Which Protoss unit is cloaked and used for detection?",
    options: ["Observer", "Phoenix", "Void Ray", "Disruptor"],
    correctIndex: 0,
  },
  {
    id: "sc-15",
    question: "What resource do all three races harvest besides minerals?",
    options: ["Energy", "Vespene Gas", "Supply", "Credits"],
    correctIndex: 1,
  },
  {
    id: "sc-16",
    question: "Which Zerg unit can burrow underground?",
    options: ["Hydralisk", "Roach", "Mutalisk", "Ultralisk"],
    correctIndex: 1,
  },
  {
    id: "sc-17",
    question: "What is the Terran drop ship that heals biological units?",
    options: ["Viking", "Medivac", "Raven", "Liberator"],
    correctIndex: 1,
  },
  {
    id: "sc-18",
    question: "Which Protoss hero sacrificed himself to destroy the Overmind?",
    options: ["Artanis", "Tassadar", "Fenix", "Karax"],
    correctIndex: 1,
  },
  {
    id: "sc-19",
    question: "What does a Zerg Spawning Pool unlock?",
    options: ["Roaches", "Zerglings", "Mutalisks", "Banelings"],
    correctIndex: 1,
  },
  {
    id: "sc-20",
    question: "Which Terran unit can siege into a long-range artillery mode?",
    options: ["Tank", "Thor", "Hellion", "Ghost"],
    correctIndex: 0,
  },
  {
    id: "sc-21",
    question: "What is the Protoss high-tier ground unit with dual thermal lances?",
    options: ["Immortal", "Colossus", "Archon", "Disruptor"],
    correctIndex: 1,
  },
  {
    id: "sc-22",
    question: "Which Zerg flying unit spits Corrosive Bile?",
    options: ["Corruptor", "Mutalisk", "Viper", "Brood Lord"],
    correctIndex: 0,
  },
  {
    id: "sc-23",
    question: "What ability lets Terran SCVs build structures?",
    options: ["Morph", "Warp", "Build", "Inject"],
    correctIndex: 2,
  },
  {
    id: "sc-24",
    question: "Which race uses Larvae to produce workers and units?",
    options: ["Terran", "Protoss", "Zerg", "None"],
    correctIndex: 2,
  },
  {
    id: "sc-25",
    question: "What is the maximum supply limit per player in StarCraft II?",
    options: ["150", "200", "250", "300"],
    correctIndex: 1,
  },
];

export const POKEMON_QUESTIONS: QuizQuestion[] = [
  {
    id: "pk-1",
    question: "What type is Pikachu?",
    options: ["Normal", "Electric", "Psychic", "Fighting"],
    correctIndex: 1,
  },
  {
    id: "pk-2",
    question: "What does Charmander evolve into at level 16?",
    options: ["Charizard", "Charmeleon", "Arcanine", "Ninetales"],
    correctIndex: 1,
  },
  {
    id: "pk-3",
    question: "Which Pokémon is #001 in the National Pokédex?",
    options: ["Pikachu", "Bulbasaur", "Mew", "Eevee"],
    correctIndex: 1,
  },
  {
    id: "pk-4",
    question: "What is Squirtle's final evolution?",
    options: ["Wartortle", "Blastoise", "Lapras", "Gyarados"],
    correctIndex: 1,
  },
  {
    id: "pk-5",
    question: "Which generation introduced the Hoenn region?",
    options: ["Generation I", "Generation II", "Generation III", "Generation IV"],
    correctIndex: 2,
  },
  {
    id: "pk-6",
    question: "Who is the professor in the Kanto region?",
    options: [
      "Professor Elm",
      "Professor Oak",
      "Professor Birch",
      "Professor Rowan",
    ],
    correctIndex: 1,
  },
  {
    id: "pk-7",
    question: "Which type is super effective against Fire-type Pokémon?",
    options: ["Grass", "Water", "Electric", "Normal"],
    correctIndex: 1,
  },
  {
    id: "pk-8",
    question: "What does Pikachu evolve into when exposed to a Thunder Stone?",
    options: ["Pichu", "Raichu", "Jolteon", "Electabuzz"],
    correctIndex: 1,
  },
  {
    id: "pk-9",
    question: "Which Pokémon appears on the box art of Pokémon Gold?",
    options: ["Lugia", "Ho-Oh", "Celebi", "Suicune"],
    correctIndex: 1,
  },
  {
    id: "pk-10",
    question: "What are Gengar's types?",
    options: [
      "Ghost only",
      "Ghost / Poison",
      "Dark / Ghost",
      "Poison / Psychic",
    ],
    correctIndex: 1,
  },
  {
    id: "pk-11",
    question: "Which evolution requires trading Machoke while holding an item?",
    options: [
      "Machamp (trade, no item)",
      "Golem",
      "Alakazam",
      "Poliwrath",
    ],
    correctIndex: 0,
  },
  {
    id: "pk-12",
    question: "Name the legendary bird trio from Kanto.",
    options: [
      "Articuno, Zapdos, Moltres",
      "Raikou, Entei, Suicune",
      "Uxie, Mesprit, Azelf",
      "Tornadus, Thundurus, Landorus",
    ],
    correctIndex: 0,
  },
  {
    id: "pk-13",
    question: "Which Eeveelution was introduced in Generation VI (Kalos)?",
    options: ["Umbreon", "Leafeon", "Sylveon", "Glaceon"],
    correctIndex: 2,
  },
  {
    id: "pk-14",
    question: "In which games did the player first choose between Bulbasaur, Charmander, and Squirtle as starters?",
    options: [
      "Gold & Silver",
      "Red & Blue",
      "Ruby & Sapphire",
      "Diamond & Pearl",
    ],
    correctIndex: 1,
  },
  {
    id: "pk-15",
    question: "What type is Dragonite?",
    options: [
      "Dragon only",
      "Dragon / Flying",
      "Dragon / Water",
      "Flying / Normal",
    ],
    correctIndex: 1,
  },
  {
    id: "pk-16",
    question: "Which Pokémon evolves from Eevee with a Water Stone?",
    options: ["Jolteon", "Flareon", "Vaporeon", "Espeon"],
    correctIndex: 2,
  },
  {
    id: "pk-17",
    question: "What is the evolved form of Abra?",
    options: ["Kadabra", "Alakazam", "Hypno", "Mr. Mime"],
    correctIndex: 0,
  },
  {
    id: "pk-18",
    question: "Which type is weak to Ice-type moves?",
    options: ["Fire", "Grass", "Dragon", "Steel"],
    correctIndex: 2,
  },
  {
    id: "pk-19",
    question: "What Pokémon is known as the 'Seed Pokémon'?",
    options: ["Oddish", "Bulbasaur", "Bellsprout", "Exeggcute"],
    correctIndex: 1,
  },
  {
    id: "pk-20",
    question: "Which region is featured in Pokémon Ruby & Sapphire?",
    options: ["Johto", "Kanto", "Hoenn", "Sinnoh"],
    correctIndex: 2,
  },
  {
    id: "pk-21",
    question: "What does a Master Ball do?",
    options: [
      "Heals all Pokémon",
      "Guarantees catching a Pokémon",
      "Revives fainted Pokémon",
      "Doubles experience",
    ],
    correctIndex: 1,
  },
  {
    id: "pk-22",
    question: "Which Pokémon is the mascot of Pokémon Red?",
    options: ["Blastoise", "Venusaur", "Charizard", "Pikachu"],
    correctIndex: 2,
  },
  {
    id: "pk-23",
    question: "What type is Lucario?",
    options: [
      "Fighting only",
      "Fighting / Steel",
      "Steel / Psychic",
      "Fighting / Dark",
    ],
    correctIndex: 1,
  },
  {
    id: "pk-24",
    question: "Which Pokémon can learn Surf outside of battle in many games?",
    options: ["Magikarp", "Psyduck", "Any Water-type", "Various Pokémon (HM/TM)"],
    correctIndex: 3,
  },
  {
    id: "pk-25",
    question: "What is Mewtwo's type?",
    options: ["Psychic", "Psychic / Dark", "Normal", "Ghost"],
    correctIndex: 0,
  },
];

export const MINECRAFT_QUESTIONS: QuizQuestion[] = [
  {
    id: "mc-1",
    question: "What do you need to mine diamond ore?",
    options: ["Stone pickaxe", "Iron pickaxe", "Gold pickaxe", "Wooden pickaxe"],
    correctIndex: 1,
  },
  {
    id: "mc-2",
    question: "Which mob explodes when it gets close to the player?",
    options: ["Zombie", "Skeleton", "Creeper", "Spider"],
    correctIndex: 2,
  },
  {
    id: "mc-3",
    question: "What material do you combine with sticks to make a torch?",
    options: ["Redstone", "Coal or charcoal", "Glowstone", "Blaze powder"],
    correctIndex: 1,
  },
  {
    id: "mc-4",
    question: "Which dimension is home to the Ender Dragon?",
    options: ["The Nether", "The Overworld", "The End", "The Deep Dark"],
    correctIndex: 2,
  },
  {
    id: "mc-5",
    question: "What do villagers use as currency for trading?",
    options: ["Gold ingots", "Diamonds", "Emeralds", "Iron nuggets"],
    correctIndex: 2,
  },
  {
    id: "mc-6",
    question: "Which block lets you sleep through the night?",
    options: ["Wool block", "Bed", "Carpet", "Hay bale"],
    correctIndex: 1,
  },
  {
    id: "mc-7",
    question: "What do you need to enter the Nether?",
    options: ["End portal", "Nether portal", "Stronghold", "Beacon"],
    correctIndex: 1,
  },
  {
    id: "mc-8",
    question: "Which ore is used to craft Netherite gear?",
    options: ["Gold", "Diamond", "Ancient Debris", "Obsidian"],
    correctIndex: 2,
  },
  {
    id: "mc-9",
    question: "What food item restores the most hunger when cooked?",
    options: ["Raw beef", "Bread", "Steak", "Apple"],
    correctIndex: 2,
  },
  {
    id: "mc-10",
    question: "Which tool is best for mining stone and ores?",
    options: ["Axe", "Shovel", "Pickaxe", "Hoe"],
    correctIndex: 2,
  },
  {
    id: "mc-11",
    question: "What mob drops bones and arrows?",
    options: ["Zombie", "Skeleton", "Creeper", "Witch"],
    correctIndex: 1,
  },
  {
    id: "mc-12",
    question: "Which biome has tall ice spikes?",
    options: ["Taiga", "Ice Spikes", "Snowy Plains", "Frozen Ocean"],
    correctIndex: 1,
  },
  {
    id: "mc-13",
    question: "What do you craft with 3 wheat?",
    options: ["Cookie", "Bread", "Cake", "Pumpkin pie"],
    correctIndex: 1,
  },
  {
    id: "mc-14",
    question: "Which block is immune to Ghast fireballs?",
    options: ["Dirt", "Cobblestone", "Sand", "Gravel"],
    correctIndex: 1,
  },
  {
    id: "mc-15",
    question: "What is the name of the underwater temple structure?",
    options: ["Stronghold", "Ocean Monument", "Woodland Mansion", "Desert Temple"],
    correctIndex: 1,
  },
  {
    id: "mc-16",
    question: "Which item lets you breathe underwater?",
    options: ["Potion of Healing", "Turtle Shell (helmet)", "Golden apple", "Elytra"],
    correctIndex: 1,
  },
  {
    id: "mc-17",
    question: "What mob is found in the Deep Dark and tracks vibrations?",
    options: ["Warden", "Enderman", "Shulker", "Blaze"],
    correctIndex: 0,
  },
  {
    id: "mc-18",
    question: "How many obsidian blocks are needed for a Nether portal frame (minimum)?",
    options: ["8", "10", "12", "14"],
    correctIndex: 1,
  },
  {
    id: "mc-19",
    question: "Which enchantment lets you walk on water (frost)?",
    options: ["Depth Strider", "Frost Walker", "Aqua Affinity", "Riptide"],
    correctIndex: 1,
  },
  {
    id: "mc-20",
    question: "What do bees produce in beehives?",
    options: ["Honey", "Wax only", "Both honey and honeycomb", "Nothing"],
    correctIndex: 2,
  },
  {
    id: "mc-21",
    question: "Which material makes the strongest vanilla armor?",
    options: ["Diamond", "Iron", "Netherite", "Gold"],
    correctIndex: 2,
  },
  {
    id: "mc-22",
    question: "What block do you use to create an enchantment table?",
    options: ["Obsidian, diamonds & book", "Iron & redstone", "Gold & lapis", "Emeralds & book"],
    correctIndex: 0,
  },
  {
    id: "mc-23",
    question: "Which passive mob can be sheared for wool?",
    options: ["Cow", "Pig", "Sheep", "Chicken"],
    correctIndex: 2,
  },
  {
    id: "mc-24",
    question: "What is the main use of redstone in Minecraft?",
    options: ["Crafting armor", "Building circuits & machines", "Smelting ore", "Growing crops"],
    correctIndex: 1,
  },
  {
    id: "mc-25",
    question: "Which item is required to tame a wolf?",
    options: ["Fish", "Bone", "Beef", "Seeds"],
    correctIndex: 1,
  },
];

export const FORTNITE_QUESTIONS: QuizQuestion[] = [
  {
    id: "fn-1",
    question: "What is the main game mode where 100 players fight to be the last one standing?",
    options: ["Creative", "Save the World", "Battle Royale", "Party Royale"],
    correctIndex: 2,
  },
  {
    id: "fn-2",
    question: "What do you press to build a wall quickly on PC by default?",
    options: ["Q", "F1", "Right-click", "Left-click"],
    correctIndex: 0,
  },
  {
    id: "fn-3",
    question: "Which material builds the fastest but has the lowest health?",
    options: ["Wood", "Stone", "Metal", "Brick"],
    correctIndex: 0,
  },
  {
    id: "fn-4",
    question: "What is the rarest chest loot color in standard Battle Royale?",
    options: ["Green", "Blue", "Purple", "Gold"],
    correctIndex: 3,
  },
  {
    id: "fn-5",
    question: "Which item lets you glide after jumping from high places?",
    options: ["Jetpack", "Glider", "Umbrella only", "Balloon"],
    correctIndex: 1,
  },
  {
    id: "fn-6",
    question: "What happens when the Storm closes in?",
    options: [
      "Players heal",
      "Players outside take damage over time",
      "Loot spawns",
      "Builds become stronger",
    ],
    correctIndex: 1,
  },
  {
    id: "fn-7",
    question: "Which consumable restores health and shield at once (Chug Jug)?",
    options: ["Bandages", "Med Kit", "Chug Jug", "Small Shield Potion"],
    correctIndex: 2,
  },
  {
    id: "fn-8",
    question: "What is the maximum shield a player can have?",
    options: ["50", "75", "100", "150"],
    correctIndex: 2,
  },
  {
    id: "fn-9",
    question: "Which weapon type uses shells as ammo?",
    options: ["Assault rifle", "Shotgun", "SMG", "Sniper rifle"],
    correctIndex: 1,
  },
  {
    id: "fn-10",
    question: "What does a Reboot Van do?",
    options: [
      "Respawn eliminated squadmates",
      "Upgrade weapons",
      "Heal to full",
      "Mark enemies on the map",
    ],
    correctIndex: 0,
  },
  {
    id: "fn-11",
    question: "Which island location was the original map name fans call 'Chapter 1'?",
    options: ["Apollo", "Athena", "Artemis", "Helios"],
    correctIndex: 1,
  },
  {
    id: "fn-12",
    question: "What currency is used to buy cosmetics in the Item Shop?",
    options: ["Gold bars", "V-Bucks", "Credits", "Battle Stars"],
    correctIndex: 1,
  },
  {
    id: "fn-13",
    question: "Which item can launch you into the air when stepped on?",
    options: ["Bouncer", "Trap", "Campfire", "Launch Pad"],
    correctIndex: 3,
  },
  {
    id: "fn-14",
    question: "What is a 'Third Party' in Fortnite slang?",
    options: [
      "Playing in a trio",
      "Another team attacking mid-fight",
      "Using a third weapon slot",
      "Building with three materials",
    ],
    correctIndex: 1,
  },
  {
    id: "fn-15",
    question: "Which mode lets players build anything without combat pressure?",
    options: ["Arena", "Creative", "Zero Build", "Team Rumble"],
    correctIndex: 1,
  },
  {
    id: "fn-16",
    question: "What does 'Zero Build' mode remove?",
    options: ["Vehicles", "Building", "Shields", "Legendary loot"],
    correctIndex: 1,
  },
  {
    id: "fn-17",
    question: "Which rarity is purple in Fortnite's loot system?",
    options: ["Uncommon", "Rare", "Epic", "Legendary"],
    correctIndex: 2,
  },
  {
    id: "fn-18",
    question: "What is the name of Fortnite's seasonal progression pass?",
    options: ["Battle Pass", "Season Ticket", "War Pass", "Loot Pass"],
    correctIndex: 0,
  },
  {
    id: "fn-19",
    question: "Which item marks nearby enemies through walls briefly?",
    options: ["Shadow Stone", "Intel Pack", "Recon Scanner", "Proximity Mine"],
    correctIndex: 2,
  },
  {
    id: "fn-20",
    question: "How many players are typically in a standard Battle Royale match?",
    options: ["50", "64", "100", "150"],
    correctIndex: 2,
  },
  {
    id: "fn-21",
    question: "What does editing a build allow you to do?",
    options: [
      "Change its color",
      "Create doors, windows, or shapes",
      "Make it indestructible",
      "Duplicate it",
    ],
    correctIndex: 1,
  },
  {
    id: "fn-22",
    question: "Which company develops Fortnite?",
    options: ["Riot Games", "Epic Games", "Blizzard", "Activision"],
    correctIndex: 1,
  },
  {
    id: "fn-23",
    question: "What is a 'crank' in competitive Fortnite slang?",
    options: [
      "Driving a car fast",
      "Building quickly in a fight",
      "Using a crankshaft item",
      "Rotating early",
    ],
    correctIndex: 1,
  },
  {
    id: "fn-24",
    question: "Which vehicle famously let players drift and boost across the map?",
    options: ["Boat", "Quadcrasher", "Shopping cart", "All of the above at times"],
    correctIndex: 3,
  },
  {
    id: "fn-25",
    question: "What happens when you are eliminated in Battle Royale?",
    options: [
      "You respawn instantly",
      "You can spectate or leave",
      "You switch teams",
      "You become a ghost builder",
    ],
    correctIndex: 1,
  },
];

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
  }
}

export function getQuestionCount(mode: QuizMode): number {
  return getQuestionsForMode(mode).length;
}
