/**
 * Resolves Wikimedia Commons audio URLs for animal sounds.
 * Run: node scripts/fetch-animal-sounds.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "..", "lib", "animals.json");

const ANIMALS = [
  { name: "Dog", commonsFile: "Barking_of_a_dog_2.ogg", aliases: ["Puppy"], tier: "easy" },
  { name: "Cat", commonsFile: "Meow.ogg", aliases: ["Kitten"], tier: "easy" },
  { name: "Cow", commonsFile: "Single_Cow_Moo.ogg", tier: "easy" },
  { name: "Sheep", commonsFile: "Sheep_bleating.ogg", tier: "easy" },
  { name: "Duck", commonsFile: "Duck_quack.ogg", tier: "easy" },
  { name: "Rooster", commonsFile: "Rooster_crowing.ogg", aliases: ["Chicken"], tier: "easy" },
  { name: "Pig", commonsFile: "Pig_grunt.ogg", tier: "easy" },
  { name: "Horse", commonsFile: "Horse_neigh.ogg", tier: "medium" },
  { name: "Lion", commonsFile: "Lion_roar.ogg", tier: "medium" },
  { name: "Elephant", commonsFile: "Elephant_trumpeting.ogg", tier: "medium" },
  { name: "Owl", commonsFile: "Owl_hoot.ogg", tier: "medium" },
  { name: "Frog", commonsFile: "Frog_croak.ogg", tier: "easy" },
  { name: "Wolf", commonsFile: "Wolf_howl.ogg", tier: "hard" },
  { name: "Bee", commonsFile: "Bee_buzz.ogg", tier: "medium" },
  { name: "Dolphin", commonsFile: "Dolphin_sounds.ogg", tier: "hard" },
  { name: "Whale", commonsFile: "Humpback_whale_song.ogg", tier: "hard" },
  { name: "Monkey", commonsFile: "Monkey_call.ogg", tier: "medium" },
  { name: "Snake", commonsFile: "Rattlesnake_rattle.ogg", tier: "hard" },
  { name: "Crow", commonsFile: "Crow_call.ogg", tier: "medium" },
  { name: "Turkey", commonsFile: "Turkey_gobble.ogg", tier: "medium" },
];

async function resolveUrl(commonsFile) {
  await new Promise((r) => setTimeout(r, 1200));
  const title = `File:${commonsFile}`;
  const params = new URLSearchParams({
    action: "query",
    titles: title,
    prop: "imageinfo",
    iiprop: "url",
    format: "json",
  });
  const response = await fetch(
    `https://commons.wikimedia.org/w/api.php?${params}`,
    { headers: { "User-Agent": "QuizzyAnimalQuiz/1.0" } },
  );
  if (!response.ok) return null;
  const data = await response.json();
  const page = Object.values(data.query?.pages ?? {})[0];
  return page?.imageinfo?.[0]?.url ?? null;
}

async function main() {
  const results = [];
  let id = 0;

  for (const animal of ANIMALS) {
    const audio = await resolveUrl(animal.commonsFile);
    if (!audio) {
      console.error(`✗ ${animal.name} (${animal.commonsFile})`);
      continue;
    }
    id += 1;
    const entry = {
      id: `animal-${id}`,
      name: animal.name,
      audio,
      tier: animal.tier,
    };
    if (animal.aliases) entry.aliases = animal.aliases;
    results.push(entry);
    console.log(`✓ ${animal.name}`);
  }

  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`\nSaved ${results.length} animals to lib/animals.json`);
}

main();
