/**
 * Tags every track with iTunes explicitness and ensures only clean previews remain.
 * Prefers notExplicit over cleaned; removes tracks with no clean preview.
 * Run: node scripts/ensure-clean-tracks.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonPath = path.join(__dirname, "..", "lib", "music-tracks.json");

const USER_AGENT = "QuizzyMusicQuiz/1.0 (clean track audit)";

function normalize(value) {
  return value.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim();
}

function cleanTitle(name) {
  return name
    .replace(/\s*-\s*remaster(ed)?\s*\d*/gi, "")
    .replace(/\s*\([^)]*version[^)]*\)/gi, "")
    .trim();
}

function isClean(explicitness) {
  return explicitness === "notExplicit" || explicitness === "cleaned";
}

function explicitRank(explicitness) {
  if (explicitness === "notExplicit") return 2;
  if (explicitness === "cleaned") return 1;
  return 0;
}

async function lookupByIds(ids) {
  if (!ids.length) return [];
  const url = `https://itunes.apple.com/lookup?id=${ids.join(",")}&country=us`;
  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) return [];
  const data = await response.json();
  return data.results ?? [];
}

async function lookupArtistCatalog(artistId) {
  const url = `https://itunes.apple.com/lookup?id=${artistId}&entity=song&limit=200&country=us`;
  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) return [];
  const data = await response.json();
  return (data.results ?? []).filter((r) => r.wrapperType === "track" && r.previewUrl);
}

function pickBestCleanAlternate(candidates, wantTitle, wantArtist) {
  const want = normalize(wantTitle);
  const artistKey = normalize(wantArtist);

  const scored = candidates
    .filter((r) => isClean(r.trackExplicitness) && r.previewUrl)
    .map((r) => {
      const title = normalize(cleanTitle(r.trackName));
      const artist = normalize(r.artistName);
      let titleScore = 0;
      if (title === want) titleScore = 10;
      else if (title.includes(want) || want.includes(title)) titleScore = 6;
      else return null;

      let score = explicitRank(r.trackExplicitness) * 3 + titleScore;
      if (artist.includes(artistKey) || artistKey.includes(artist)) score += 4;
      return { result: r, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);

  return scored[0]?.result ?? null;
}

async function findBestCleanVersion(track, meta) {
  const artistId = meta?.artistId;
  if (!artistId) return meta;

  await new Promise((r) => setTimeout(r, 350));
  const catalog = await lookupArtistCatalog(artistId);
  const alternate = pickBestCleanAlternate(catalog, track.songTitle, track.artist);
  if (!alternate) return meta;

  if (explicitRank(alternate.trackExplicitness) > explicitRank(meta.trackExplicitness)) {
    return alternate;
  }

  if (
    alternate.trackExplicitness === meta.trackExplicitness &&
    normalize(cleanTitle(alternate.trackName)) === normalize(track.songTitle)
  ) {
    return alternate;
  }

  return meta;
}

function trackFromMeta(track, meta) {
  return {
    ...track,
    songTitle: cleanTitle(meta.trackName) || track.songTitle,
    artist: meta.artistName || track.artist,
    audio: meta.previewUrl || track.audio,
    itunesTrackId: meta.trackId,
    explicitness: meta.trackExplicitness,
  };
}

async function main() {
  const tracks = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  const ids = tracks.map((t) => t.itunesTrackId).filter(Boolean);
  const metaById = new Map();

  for (let i = 0; i < ids.length; i += 50) {
    await new Promise((r) => setTimeout(r, 450));
    const results = await lookupByIds(ids.slice(i, i + 50));
    for (const result of results) {
      if (result.trackId) metaById.set(result.trackId, result);
    }
  }

  let kept = 0;
  let upgraded = 0;
  let tagged = 0;
  const removed = [];
  const nextTracks = [];

  for (const track of tracks) {
    let meta = metaById.get(track.itunesTrackId);

    if (!meta?.previewUrl) {
      removed.push(`${track.songTitle} (missing iTunes metadata)`);
      console.error(`✗ removed ${track.songTitle} (no metadata)`);
      continue;
    }

    if (!isClean(meta.trackExplicitness)) {
      const replacement = await findBestCleanVersion(track, meta);
      if (!replacement || !isClean(replacement.trackExplicitness)) {
        removed.push(`${track.songTitle} (explicit)`);
        console.error(`✗ removed ${track.songTitle} (explicit)`);
        continue;
      }
      meta = replacement;
      upgraded += 1;
      console.log(
        `↑ ${track.songTitle} → ${meta.trackName} (${meta.trackExplicitness})`,
      );
    } else if (meta.trackExplicitness === "cleaned") {
      const better = await findBestCleanVersion(track, meta);
      if (
        better &&
        better.trackExplicitness === "notExplicit" &&
        better.trackId !== meta.trackId
      ) {
        meta = better;
        upgraded += 1;
        console.log(`↑ ${track.songTitle} → notExplicit ${meta.trackName}`);
      }
    }

    const next = trackFromMeta(track, meta);
    if (!track.explicitness) tagged += 1;
    nextTracks.push(next);
    kept += 1;
  }

  fs.writeFileSync(jsonPath, JSON.stringify(nextTracks, null, 2));

  const counts = nextTracks.reduce((acc, t) => {
    acc[t.explicitness] = (acc[t.explicitness] ?? 0) + 1;
    return acc;
  }, {});

  console.log(`\nDone. Kept ${kept}, upgraded ${upgraded}, removed ${removed.length}`);
  console.log("Explicitness:", counts);
  if (removed.length) console.log(`Removed: ${removed.join("; ")}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
