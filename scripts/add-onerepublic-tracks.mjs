import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonPath = path.join(__dirname, "..", "lib", "music-tracks.json");

const NEW_TRACKS = [
  { songTitle: "Apologize", tier: "medium" },
  { songTitle: "Secrets", tier: "medium" },
  { songTitle: "Good Life", tier: "easy" },
  { songTitle: "Stop and Stare", tier: "medium" },
  { songTitle: "If I Lose Myself", tier: "medium" },
  { songTitle: "Love Runs Out", tier: "medium" },
  { songTitle: "All the Right Moves", tier: "medium" },
  { songTitle: "Feel Again", tier: "easy" },
  { songTitle: "I Ain't Worried", songAliases: ["I Aint Worried"], tier: "easy" },
  { songTitle: "Wanted", tier: "medium" },
  { songTitle: "Rescue Me", tier: "medium" },
  { songTitle: "Heaven", tier: "medium" },
  { songTitle: "Someday", tier: "medium" },
  { songTitle: "Connection", tier: "medium" },
  { songTitle: "Nobody", tier: "hard" },
  { songTitle: "Preacher", tier: "hard" },
  { songTitle: "Where We Are", tier: "hard" },
];

function cleanTitle(name) {
  return name
    .replace(/\s*-\s*remaster(ed)?\s*\d*/gi, "")
    .replace(/\s*\([^)]*version[^)]*\)/gi, "")
    .trim();
}

function normalize(value) {
  return value.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim();
}

async function search(songTitle) {
  await new Promise((r) => setTimeout(r, 600));
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(`OneRepublic ${songTitle}`)}&entity=song&limit=10&country=us`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const results = (data.results ?? []).filter(
      (r) =>
        r.previewUrl &&
        normalize(r.artistName).includes("onerepublic") &&
        (r.trackExplicitness === "notExplicit" ||
          r.trackExplicitness === "cleaned"),
    );
    if (!results.length) return null;

    const want = normalize(songTitle);
    results.sort((a, b) => {
      const ta = normalize(cleanTitle(a.trackName));
      const tb = normalize(cleanTitle(b.trackName));
      const score = (t, raw) => {
        let s = t === want ? 3 : t.includes(want) || want.includes(t) ? 2 : 0;
        if (raw.trackExplicitness === "notExplicit") s += 2;
        else if (raw.trackExplicitness === "cleaned") s += 1;
        return s;
      };
      return score(tb, b) - score(ta, a);
    });
    return results[0];
  } catch {
    return null;
  }
}

async function main() {
  const existing = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  let nextId = existing.reduce((max, t) => {
    const n = Number(t.id.replace("music-", ""));
    return n > max ? n : max;
  }, 0);

  const added = [];

  for (const track of NEW_TRACKS) {
    const existingSong = existing.find(
      (t) =>
        normalize(t.songTitle) === normalize(track.songTitle) &&
        normalize(t.artist).includes("onerepublic"),
    );
    if (existingSong) {
      console.log(`Skip (exists): ${track.songTitle}`);
      continue;
    }

    const result = await search(track.songTitle);
    if (!result) {
      console.error(`✗ ${track.songTitle}`);
      continue;
    }

    nextId += 1;
    const entry = {
      id: `music-${nextId}`,
      songTitle: cleanTitle(result.trackName) || track.songTitle,
      artist: result.artistName,
      audio: result.previewUrl,
      genre: "pop",
      tier: track.tier,
      itunesTrackId: result.trackId,
      explicitness: result.trackExplicitness,
    };
    if (track.songAliases) entry.songAliases = track.songAliases;

    existing.push(entry);
    added.push(entry.songTitle);
    console.log(`✓ ${track.songTitle} → ${entry.songTitle}`);
  }

  fs.writeFileSync(jsonPath, JSON.stringify(existing, null, 2));
  console.log(`\nAdded ${added.length} OneRepublic tracks. Total: ${existing.length}`);
}

main();
