/**
 * Fetches scene/character stills from Fandom wikis (no movie title on image).
 * Run: node scripts/fetch-movie-images.mjs
 * To refresh existing images: node scripts/refresh-movie-scene-images.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonPath = path.join(__dirname, "..", "lib", "movies.json");

/** Curated PG-rated family movies only. */
const MOVIE_SEEDS = [
  // Disney
  { title: "The Lion King", broadcaster: "disney", wiki: "The_Lion_King_(1994_film)", tier: "easy" },
  { title: "Frozen", broadcaster: "disney", wiki: "Frozen_(2013_film)", tier: "easy", aliases: ["Frozen 2013"] },
  { title: "Moana", broadcaster: "disney", wiki: "Moana_(2016_film)", tier: "easy" },
  { title: "Encanto", broadcaster: "disney", wiki: "Encanto", tier: "easy" },
  { title: "Beauty and the Beast", broadcaster: "disney", wiki: "Beauty_and_the_Beast_(1991_film)", tier: "easy" },
  { title: "Aladdin", broadcaster: "disney", wiki: "Aladdin_(1992_Disney_film)", tier: "easy", aliases: ["Aladdin 1992"] },
  { title: "Mulan", broadcaster: "disney", wiki: "Mulan_(1998_film)", tier: "medium" },
  { title: "Tangled", broadcaster: "disney", wiki: "Tangled", tier: "easy" },
  { title: "The Little Mermaid", broadcaster: "disney", wiki: "The_Little_Mermaid_(1989_film)", tier: "easy" },
  { title: "Zootopia", broadcaster: "disney", wiki: "Zootopia", tier: "easy" },
  { title: "Big Hero 6", broadcaster: "disney", wiki: "Big_Hero_6_(film)", tier: "medium" },
  { title: "Raya and the Last Dragon", broadcaster: "disney", wiki: "Raya_and_the_Last_Dragon", tier: "medium" },
  { title: "Cinderella", broadcaster: "disney", wiki: "Cinderella_(1950_film)", tier: "easy" },
  { title: "Mary Poppins", broadcaster: "disney", wiki: "Mary_Poppins_(film)", tier: "medium" },
  { title: "Lilo & Stitch", broadcaster: "disney", wiki: "Lilo_%26_Stitch", tier: "easy", aliases: ["Lilo and Stitch"] },
  { title: "The Jungle Book", broadcaster: "disney", wiki: "The_Jungle_Book_(1967_film)", tier: "medium" },
  { title: "Peter Pan", broadcaster: "disney", wiki: "Peter_Pan_(1953_film)", tier: "medium" },
  { title: "Hercules", broadcaster: "disney", wiki: "Hercules_(1997_film)", tier: "medium" },
  { title: "Tarzan", broadcaster: "disney", wiki: "Tarzan_(1999_film)", tier: "medium" },
  { title: "Wreck-It Ralph", broadcaster: "disney", wiki: "Wreck-It_Ralph", tier: "medium", aliases: ["Wreck It Ralph"] },
  { title: "Ralph Breaks the Internet", broadcaster: "disney", wiki: "Ralph_Breaks_the_Internet", tier: "medium" },
  { title: "Wish", broadcaster: "disney", wiki: "Wish_(film)", tier: "medium" },
  // Pixar
  { title: "Toy Story", broadcaster: "pixar", wiki: "Toy_Story", tier: "easy" },
  { title: "Toy Story 2", broadcaster: "pixar", wiki: "Toy_Story_2", tier: "easy" },
  { title: "Toy Story 3", broadcaster: "pixar", wiki: "Toy_Story_3", tier: "easy" },
  { title: "Toy Story 4", broadcaster: "pixar", wiki: "Toy_Story_4", tier: "easy" },
  { title: "Finding Nemo", broadcaster: "pixar", wiki: "Finding_Nemo", tier: "easy" },
  { title: "Finding Dory", broadcaster: "pixar", wiki: "Finding_Dory", tier: "easy" },
  { title: "Monsters, Inc.", broadcaster: "pixar", wiki: "Monsters,_Inc.", tier: "easy", aliases: ["Monsters Inc"] },
  { title: "Monsters University", broadcaster: "pixar", wiki: "Monsters_University", tier: "medium" },
  { title: "Cars", broadcaster: "pixar", wiki: "Cars_(film)", tier: "easy" },
  { title: "Cars 2", broadcaster: "pixar", wiki: "Cars_2", tier: "medium" },
  { title: "Cars 3", broadcaster: "pixar", wiki: "Cars_3", tier: "medium" },
  { title: "Up", broadcaster: "pixar", wiki: "Up_(2009_film)", tier: "easy" },
  { title: "Inside Out", broadcaster: "pixar", wiki: "Inside_Out_(2015_film)", tier: "easy" },
  { title: "Inside Out 2", broadcaster: "pixar", wiki: "Inside_Out_2", tier: "easy" },
  { title: "Coco", broadcaster: "pixar", wiki: "Coco_(2017_film)", tier: "easy" },
  { title: "The Incredibles", broadcaster: "pixar", wiki: "The_Incredibles", tier: "easy" },
  { title: "Incredibles 2", broadcaster: "pixar", wiki: "Incredibles_2", tier: "easy" },
  { title: "Ratatouille", broadcaster: "pixar", wiki: "Ratatouille_(film)", tier: "medium" },
  { title: "WALL-E", broadcaster: "pixar", wiki: "WALL-E", tier: "medium", aliases: ["Wall-E", "WALLE"] },
  { title: "Brave", broadcaster: "pixar", wiki: "Brave_(2012_film)", tier: "medium" },
  { title: "Turning Red", broadcaster: "pixar", wiki: "Turning_Red", tier: "medium" },
  { title: "Elemental", broadcaster: "pixar", wiki: "Elemental_(2023_film)", tier: "medium" },
  { title: "Luca", broadcaster: "pixar", wiki: "Luca_(2021_film)", tier: "easy" },
  { title: "Soul", broadcaster: "pixar", wiki: "Soul_(2020_film)", tier: "medium" },
  { title: "Lightyear", broadcaster: "pixar", wiki: "Lightyear_(film)", tier: "medium" },
  { title: "A Bug's Life", broadcaster: "pixar", wiki: "A_Bug%27s_Life", tier: "hard", aliases: ["A Bugs Life"] },
  { title: "Onward", broadcaster: "pixar", wiki: "Onward_(film)", tier: "medium" },
  // DreamWorks
  { title: "Shrek", broadcaster: "dreamworks", wiki: "Shrek", tier: "easy" },
  { title: "Shrek 2", broadcaster: "dreamworks", wiki: "Shrek_2", tier: "easy" },
  { title: "Madagascar", broadcaster: "dreamworks", wiki: "Madagascar_(2005_film)", tier: "easy" },
  { title: "Kung Fu Panda", broadcaster: "dreamworks", wiki: "Kung_Fu_Panda_(film)", tier: "easy" },
  { title: "How to Train Your Dragon", broadcaster: "dreamworks", wiki: "How_to_Train_Your_Dragon_(film)", tier: "easy" },
  { title: "The Prince of Egypt", broadcaster: "dreamworks", wiki: "The_Prince_of_Egypt", tier: "hard" },
  { title: "Rise of the Guardians", broadcaster: "dreamworks", wiki: "Rise_of_the_Guardians", tier: "medium" },
  { title: "The Bad Guys", broadcaster: "dreamworks", wiki: "The_Bad_Guys_(film)", tier: "easy" },
  { title: "Trolls", broadcaster: "dreamworks", wiki: "Trolls_(film)", tier: "easy" },
  { title: "Abominable", broadcaster: "dreamworks", wiki: "Abominable_(2019_film)", tier: "medium" },
  { title: "Megamind", broadcaster: "dreamworks", wiki: "Megamind", tier: "medium" },
  { title: "Spirit: Stallion of the Cimarron", broadcaster: "dreamworks", wiki: "Spirit:_Stallion_of_the_Cimarron", tier: "hard", aliases: ["Spirit"] },
  // Universal / Illumination
  { title: "Minions", broadcaster: "universal", wiki: "Minions_(film)", tier: "easy" },
  { title: "Despicable Me", broadcaster: "universal", wiki: "Despicable_Me", tier: "easy" },
  { title: "Despicable Me 2", broadcaster: "universal", wiki: "Despicable_Me_2", tier: "easy" },
  { title: "Despicable Me 3", broadcaster: "universal", wiki: "Despicable_Me_3", tier: "easy" },
  { title: "Sing", broadcaster: "universal", wiki: "Sing_(2016_American_film)", tier: "easy" },
  { title: "Sing 2", broadcaster: "universal", wiki: "Sing_2", tier: "easy" },
  { title: "The Secret Life of Pets", broadcaster: "universal", wiki: "The_Secret_Life_of_Pets", tier: "easy" },
  { title: "E.T. the Extra-Terrestrial", broadcaster: "universal", wiki: "E.T._the_Extra-Terrestrial", tier: "medium", aliases: ["ET", "E.T."] },
  { title: "The Lorax", broadcaster: "universal", wiki: "The_Lorax_(film)", tier: "easy" },
  { title: "How the Grinch Stole Christmas", broadcaster: "universal", wiki: "How_the_Grinch_Stole_Christmas_(2000_film)", tier: "medium", aliases: ["The Grinch 2000"] },
  { title: "Back to the Future", broadcaster: "universal", wiki: "Back_to_the_Future", tier: "medium" },
  { title: "The Land Before Time", broadcaster: "universal", wiki: "The_Land_Before_Time", tier: "medium" },
  // Warner Bros
  { title: "The Lego Movie", broadcaster: "warner-bros", wiki: "The_Lego_Movie", tier: "easy", aliases: ["Lego Movie"] },
  { title: "The Lego Batman Movie", broadcaster: "warner-bros", wiki: "The_Lego_Batman_Movie", tier: "easy", aliases: ["Lego Batman Movie"] },
  { title: "Wonka", broadcaster: "warner-bros", wiki: "Wonka_(film)", tier: "medium" },
  { title: "Paddington", broadcaster: "warner-bros", wiki: "Paddington_(film)", tier: "easy" },
  { title: "Paddington 2", broadcaster: "warner-bros", wiki: "Paddington_2", tier: "easy" },
  { title: "Space Jam", broadcaster: "warner-bros", wiki: "Space_Jam", tier: "easy" },
  { title: "The Iron Giant", broadcaster: "warner-bros", wiki: "The_Iron_Giant", tier: "medium" },
  { title: "Happy Feet", broadcaster: "warner-bros", wiki: "Happy_Feet", tier: "medium" },
  { title: "Harry Potter and the Sorcerer's Stone", broadcaster: "warner-bros", wiki: "Harry_Potter_and_the_Philosopher%27s_Stone_(film)", tier: "medium", aliases: ["Harry Potter and the Philosophers Stone", "Harry Potter 1"] },
  { title: "Harry Potter and the Chamber of Secrets", broadcaster: "warner-bros", wiki: "Harry_Potter_and_the_Chamber_of_Secrets_(film)", tier: "medium", aliases: ["Harry Potter 2"] },
  { title: "Harry Potter and the Prisoner of Azkaban", broadcaster: "warner-bros", wiki: "Harry_Potter_and_the_Prisoner_of_Azkaban_(film)", tier: "hard", aliases: ["Harry Potter 3"] },
  // Sony
  { title: "Spider-Man: Into the Spider-Verse", broadcaster: "sony", wiki: "Spider-Man:_Into_the_Spider-Verse", tier: "easy", aliases: ["Into the Spider-Verse", "Spider-Verse"] },
  { title: "Hotel Transylvania", broadcaster: "sony", wiki: "Hotel_Transylvania_(film)", tier: "easy" },
  { title: "Hotel Transylvania 2", broadcaster: "sony", wiki: "Hotel_Transylvania_2", tier: "easy" },
  { title: "Cloudy with a Chance of Meatballs", broadcaster: "sony", wiki: "Cloudy_with_a_Chance_of_Meatballs_(film)", tier: "easy" },
  { title: "Arthur Christmas", broadcaster: "sony", wiki: "Arthur_Christmas", tier: "medium" },
  { title: "The Mitchells vs. the Machines", broadcaster: "sony", wiki: "The_Mitchells_vs._the_Machines", tier: "medium", aliases: ["Mitchells vs the Machines"] },
  { title: "Vivo", broadcaster: "sony", wiki: "Vivo_(film)", tier: "medium" },
  { title: "Peter Rabbit", broadcaster: "sony", wiki: "Peter_Rabbit_(film)", tier: "easy" },
  // Netflix
  { title: "Klaus", broadcaster: "netflix", wiki: "Klaus_(film)", tier: "medium" },
  { title: "The Sea Beast", broadcaster: "netflix", wiki: "The_Sea_Beast", tier: "medium" },
  { title: "Over the Moon", broadcaster: "netflix", wiki: "Over_the_Moon_(2020_film)", tier: "medium" },
  { title: "The Willoughbys", broadcaster: "netflix", wiki: "The_Willoughbys", tier: "hard" },
  { title: "Nimona", broadcaster: "netflix", wiki: "Nimona_(film)", tier: "medium" },
  { title: "Guillermo del Toro's Pinocchio", broadcaster: "netflix", wiki: "Guillermo_del_Toro%27s_Pinocchio", tier: "hard", aliases: ["Pinocchio Netflix"] },
  // Paramount
  { title: "Sonic the Hedgehog", broadcaster: "paramount", wiki: "Sonic_the_Hedgehog_(film)", tier: "easy" },
  { title: "Sonic the Hedgehog 2", broadcaster: "paramount", wiki: "Sonic_the_Hedgehog_2_(film)", tier: "easy" },
  { title: "PAW Patrol: The Movie", broadcaster: "paramount", wiki: "PAW_Patrol:_The_Movie", tier: "easy", aliases: ["Paw Patrol The Movie", "PAW Patrol"] },
  { title: "Clifford the Big Red Dog", broadcaster: "paramount", wiki: "Clifford_the_Big_Red_Dog_(film)", tier: "easy", aliases: ["Clifford"] },
  { title: "Dora and the Lost City of Gold", broadcaster: "paramount", wiki: "Dora_and_the_Lost_City_of_Gold", tier: "medium", aliases: ["Dora"] },
  { title: "Wonder Park", broadcaster: "paramount", wiki: "Wonder_Park", tier: "medium" },
];

async function fetchWikiImage(wikiTitle, attempt = 0) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${wikiTitle}`;
  try {
    await new Promise((r) => setTimeout(r, 350));
    const response = await fetch(url, {
      headers: { "User-Agent": "QuizzyMovieQuiz/1.0 (educational quiz app)" },
    });
    if (!response.ok) {
      if (attempt < 2) {
        await new Promise((r) => setTimeout(r, 1200));
        return fetchWikiImage(wikiTitle, attempt + 1);
      }
      return null;
    }
    const data = await response.json();
    return data.thumbnail?.source ?? data.originalimage?.source ?? null;
  } catch {
    if (attempt < 2) {
      await new Promise((r) => setTimeout(r, 1200));
      return fetchWikiImage(wikiTitle, attempt + 1);
    }
    return null;
  }
}

async function main() {
  const movies = [];
  let id = 0;
  const failed = [];

  for (const seed of MOVIE_SEEDS) {
    const image = await fetchWikiImage(seed.wiki);
    if (!image) {
      failed.push(seed.title);
      console.error(`✗ ${seed.title}`);
      continue;
    }

    id += 1;
    const entry = {
      id: `movie-${id}`,
      title: seed.title,
      broadcaster: seed.broadcaster,
      rating: "PG",
      image,
      tier: seed.tier,
    };
    if (seed.aliases) entry.titleAliases = seed.aliases;
    movies.push(entry);
    console.log(`✓ ${seed.title}`);
  }

  fs.writeFileSync(jsonPath, JSON.stringify(movies, null, 2));
  console.log(`\nSaved ${movies.length} PG movies to lib/movies.json`);
  if (failed.length) {
    console.log(`Failed (${failed.length}): ${failed.join(", ")}`);
  }
}

main();
