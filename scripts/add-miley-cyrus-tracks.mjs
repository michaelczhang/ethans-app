import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonPath = path.join(__dirname, "..", "lib", "music-tracks.json");

const MILEY_ARTIST_ID = 137057909;

function cleanTitle(name) {
  return name
    .replace(/\s*-\s*remaster(ed)?\s*\d*/gi, "")
    .replace(/\s*\([^)]*version[^)]*\)/gi, "")
    .replace(/\s*\(From[^)]*\)/gi, "")
    .trim();
}

function normalize(value) {
  return value.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim();
}

function baseTitle(name) {
  return normalize(name.split("(")[0]);
}

function explicitRank(value) {
  if (value === "notExplicit") return 3;
  if (value === "cleaned") return 2;
  return 0;
}

function studioScore(name) {
  const lower = name.toLowerCase();
  let score = 0;
  if (lower.includes("live")) score -= 3;
  if (lower.includes("remix")) score -= 2;
  if (lower.includes("feat.")) score -= 1;
  if (lower.includes("x ")) score -= 4;
  return score;
}

function pickBetterTrack(current, candidate) {
  const currentRank = explicitRank(current.trackExplicitness);
  const candidateRank = explicitRank(candidate.trackExplicitness);
  if (candidateRank !== currentRank) {
    return candidateRank > currentRank ? candidate : current;
  }

  const currentStudio = studioScore(current.trackName);
  const candidateStudio = studioScore(candidate.trackName);
  if (candidateStudio !== currentStudio) {
    return candidateStudio > currentStudio ? candidate : current;
  }

  return candidate.trackName.length < current.trackName.length
    ? candidate
    : current;
}

function isAllowedExplicitness(value) {
  return value === "notExplicit" || value === "cleaned";
}

async function fetchMileyCatalog() {
  const url = `https://itunes.apple.com/lookup?id=${MILEY_ARTIST_ID}&entity=song&limit=200&country=us`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`iTunes lookup failed: ${response.status}`);
  }

  const text = await response.text();
  if (!text) {
    throw new Error("iTunes lookup returned an empty response");
  }

  const data = JSON.parse(text);
  return (data.results ?? []).filter(
    (track) =>
      track.wrapperType === "track" &&
      track.previewUrl &&
      track.artistName === "Miley Cyrus" &&
      isAllowedExplicitness(track.trackExplicitness),
  );
}

function tierForTitle(title) {
  const easy = [
    "party in the usa",
    "flowers",
    "the climb",
    "wrecking ball",
    "we cant stop",
    "see you again",
    "malibu",
    "used to be young",
    "midnight sky",
    "true friend",
    "butterfly fly away",
    "start all over",
    "younger now",
  ];
  const key = baseTitle(title);
  if (easy.some((song) => key.includes(song) || song.includes(key))) {
    return "easy";
  }
  if (title.toLowerCase().includes("live") || title.toLowerCase().includes("remix")) {
    return "hard";
  }
  return "medium";
}

function buildAliases(songTitle) {
  const aliases = [];
  if (songTitle.includes("U.S.A.")) {
    aliases.push(songTitle.replace("U.S.A.", "USA"));
  }
  if (songTitle.includes("Can't")) {
    aliases.push(songTitle.replace("Can't", "Cant"));
  }
  return aliases.length ? aliases : undefined;
}

async function main() {
  const existing = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  let nextId = existing.reduce((max, track) => {
    const n = Number(track.id.replace("music-", ""));
    return n > max ? n : max;
  }, 0);

  const existingIds = new Set(
    existing.map((track) => track.itunesTrackId).filter(Boolean),
  );
  const existingTitles = new Set(
    existing
      .filter((track) => normalize(track.artist).includes("miley cyrus"))
      .map((track) => baseTitle(track.songTitle)),
  );

  const catalog = await fetchMileyCatalog();
  const bestByTitle = new Map();

  for (const track of catalog) {
    const key = baseTitle(track.trackName);
    const current = bestByTitle.get(key);
    bestByTitle.set(key, current ? pickBetterTrack(current, track) : track);
  }

  const added = [];

  const sortedTracks = [...bestByTitle.values()].sort((a, b) =>
    a.trackName.localeCompare(b.trackName),
  );

  for (const track of sortedTracks) {
    if (existingIds.has(track.trackId)) continue;
    if (existingTitles.has(baseTitle(track.trackName))) continue;

    nextId += 1;
    const songTitle = cleanTitle(track.trackName);
    const entry = {
      id: `music-${nextId}`,
      songTitle,
      artist: track.artistName,
      audio: track.previewUrl,
      genre: "pop",
      tier: tierForTitle(songTitle),
      itunesTrackId: track.trackId,
    };

    const aliases = buildAliases(songTitle);
    if (aliases) entry.songAliases = aliases;

    if (
      songTitle.toLowerCase().includes("feat.") ||
      track.trackName.toLowerCase().includes("nothing breaks like a heart")
    ) {
      entry.artistAliases = ["Miley Cyrus"];
    }

    existing.push(entry);
    existingTitles.add(baseTitle(songTitle));
    existingIds.add(track.trackId);
    added.push(songTitle);
    console.log(`✓ ${songTitle}`);
  }

  fs.writeFileSync(jsonPath, JSON.stringify(existing, null, 2));
  console.log(`\nAdded ${added.length} Miley Cyrus tracks. Total: ${existing.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
