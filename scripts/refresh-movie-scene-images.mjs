/**
 * Replaces title-heavy posters with character/scene stills from Fandom wikis.
 * Run: node scripts/refresh-movie-scene-images.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonPath = path.join(__dirname, "..", "lib", "movies.json");

const USER_AGENT = "QuizzyMovieQuiz/1.0 (educational quiz; scene images)";

const WIKIS_BY_BROADCASTER = {
  pixar: ["https://pixar.fandom.com", "https://disney.fandom.com"],
  disney: ["https://disney.fandom.com", "https://jhm.fandom.com"],
  dreamworks: ["https://dreamworks.fandom.com", "https://madagascar.fandom.com"],
  universal: [
    "https://despicableme.fandom.com",
    "https://sing.fandom.com",
    "https://universalstudios.fandom.com",
  ],
  "warner-bros": [
    "https://harrypotter.fandom.com",
    "https://lego.fandom.com",
    "https://warnerbros.fandom.com",
  ],
  sony: [
    "https://sonypicturesanimation.fandom.com",
    "https://hoteltransylvania.fandom.com",
    "https://cloudywithachanceofmeatballs.fandom.com",
  ],
  netflix: ["https://movies.fandom.com", "https://disney.fandom.com"],
  paramount: ["https://sonic.fandom.com", "https://movies.fandom.com"],
};

const POSTER_PATTERN =
  /poster|one.?sheet|teaser|logo|banner|cover|dvd|bluray|icon|header|wordmark|title.?card/i;

const SCENE_PATTERN =
  /scene|screenshot|official-art|3d|character|promo|still|render|infobox|gallery/i;

const SKIP_PATTERN =
  /actor|actress|voice|cast|premiere|red.?carpet|festival|comic.?con|logo|banner|icon|svg/i;

function pageTitleFromMovie(title) {
  return title.replace(/\s+/g, "_").replace(/'/g, "%27");
}

function scoreFileName(name) {
  const lower = name.toLowerCase();
  let score = 0;
  if (POSTER_PATTERN.test(lower)) score -= 40;
  if (SCENE_PATTERN.test(lower)) score += 10;
  if (SKIP_PATTERN.test(lower)) score -= 30;
  if (lower.endsWith(".svg")) score -= 50;
  if (/\.(jpg|jpeg|png|webp)$/i.test(lower)) score += 2;
  return score;
}

async function fandomApi(wikiBase, params) {
  const url = `${wikiBase}/api.php?${params}`;
  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) return null;
  return response.json();
}

async function searchPage(wikiBase, movieTitle) {
  const params = new URLSearchParams({
    action: "query",
    list: "search",
    srsearch: movieTitle,
    format: "json",
    srlimit: "5",
  });
  const data = await fandomApi(wikiBase, params);
  const hit = data?.query?.search?.find((item) => {
    const title = item.title.toLowerCase();
    const want = movieTitle.toLowerCase();
    return title.includes(want) || want.includes(title);
  });
  return hit?.title ?? data?.query?.search?.[0]?.title ?? null;
}

async function listPageImages(wikiBase, pageTitle) {
  const params = new URLSearchParams({
    action: "query",
    titles: pageTitle,
    prop: "images",
    format: "json",
    imlimit: "50",
  });
  const data = await fandomApi(wikiBase, params);
  const page = Object.values(data?.query?.pages ?? {})[0];
  if (!page?.images) return [];
  return page.images
    .map((item) => item.title)
    .filter((title) => title.startsWith("File:"));
}

async function imageThumbUrl(wikiBase, fileTitle) {
  const params = new URLSearchParams({
    action: "query",
    titles: fileTitle,
    prop: "imageinfo",
    iiprop: "url",
    iiurlwidth: "640",
    format: "json",
  });
  const data = await fandomApi(wikiBase, params);
  const page = Object.values(data?.query?.pages ?? {})[0];
  return page?.imageinfo?.[0]?.thumburl ?? null;
}

async function findSceneImage(movie) {
  const wikis = WIKIS_BY_BROADCASTER[movie.broadcaster] ?? ["https://movies.fandom.com"];
  const candidates = [];

  for (const wiki of wikis) {
    await new Promise((r) => setTimeout(r, 300));
    const page =
      (await searchPage(wiki, movie.title)) ??
      pageTitleFromMovie(movie.title);
    const pageName =
      typeof page === "string" && !page.includes("_")
        ? page
        : (await searchPage(wiki, movie.title)) ?? movie.title.replace(/ /g, "_");

    const files = await listPageImages(wiki, pageName);
    for (const file of files) {
      const score = scoreFileName(file);
      if (score < -15) continue;
      candidates.push({ wiki, file, score });
    }
  }

  candidates.sort((a, b) => b.score - a.score);

  for (const candidate of candidates.slice(0, 12)) {
    await new Promise((r) => setTimeout(r, 200));
    const url = await imageThumbUrl(candidate.wiki, candidate.file);
    if (url) {
      return url;
    }
  }

  return null;
}

async function main() {
  const movies = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  let updated = 0;
  const failed = [];

  for (const movie of movies) {
    const sceneUrl = await findSceneImage(movie);
    if (!sceneUrl) {
      failed.push(movie.title);
      console.error(`✗ ${movie.title}`);
      continue;
    }

    movie.image = sceneUrl;
    updated += 1;
    console.log(`✓ ${movie.title}`);
  }

  fs.writeFileSync(jsonPath, JSON.stringify(movies, null, 2));
  console.log(`\nUpdated ${updated}/${movies.length} images`);
  if (failed.length) console.log(`Failed: ${failed.join(", ")}`);
}

main();
