import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonPath = path.join(__dirname, "..", "lib", "music-tracks.json");

const ARTIST = "Taylor Swift";

const NEW_TRACKS = [
  { songTitle: "Love Story", tier: "easy" },
  { songTitle: "You Belong With Me", songAliases: ["You Belong with Me"], tier: "easy" },
  { songTitle: "Blank Space", tier: "medium" },
  { songTitle: "Style", tier: "medium" },
  { songTitle: "Wildest Dreams", tier: "medium" },
  { songTitle: "Anti-Hero", songAliases: ["Anti Hero"], tier: "medium" },
  { songTitle: "Cruel Summer", tier: "medium" },
  { songTitle: "We Are Never Ever Getting Back Together", tier: "easy" },
  { songTitle: "I Knew You Were Trouble", tier: "medium" },
  { songTitle: "Look What You Made Me Do", tier: "medium" },
  { songTitle: "cardigan", songAliases: ["Cardigan"], tier: "medium" },
  { songTitle: "Lover", tier: "easy" },
  { songTitle: "You Need To Calm Down", songAliases: ["You Need to Calm Down"], tier: "easy" },
  { songTitle: "ME!", songAliases: ["Me"], tier: "easy" },
  { songTitle: "Delicate", tier: "medium" },
  { songTitle: "Gorgeous", tier: "medium" },
  { songTitle: "Enchanted", tier: "hard" },
  { songTitle: "All Too Well", tier: "hard" },
  { songTitle: "22", tier: "easy" },
  { songTitle: "Our Song", tier: "easy" },
  { songTitle: "Teardrops On My Guitar", songAliases: ["Teardrops on My Guitar"], tier: "easy" },
  { songTitle: "Lavender Haze", tier: "medium" },
  { songTitle: "Karma", tier: "medium" },
  { songTitle: "Bad Blood", tier: "medium" },
  { songTitle: "Fortnight", tier: "hard" },
  { songTitle: "The Man", tier: "medium" },
  { songTitle: "Back To December", songAliases: ["Back to December"], tier: "medium" },
  { songTitle: "Mine", tier: "medium" },
];

function cleanTitle(name) {
  return name
    .replace(/\s*-\s*remaster(ed)?\s*\d*/gi, "")
    .replace(/\s*\(Taylor's Version\)/gi, "")
    .replace(/\s*\([^)]*version[^)]*\)/gi, "")
    .replace(/\s*\(From[^)]*\)/gi, "")
    .trim();
}

function normalize(value) {
  return value.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim();
}

async function search(songTitle) {
  await new Promise((r) => setTimeout(r, 600));
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(`${ARTIST} ${songTitle}`)}&entity=song&limit=12&country=us`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const results = (data.results ?? []).filter(
      (r) =>
        r.previewUrl &&
        normalize(r.artistName).includes("taylor swift") &&
        (r.trackExplicitness === "notExplicit" ||
          r.trackExplicitness === "cleaned"),
    );
    if (!results.length) return null;

    const want = normalize(songTitle);
    results.sort((a, b) => {
      const ta = normalize(cleanTitle(a.trackName));
      const tb = normalize(cleanTitle(b.trackName));
      const score = (t, raw) => {
        let s = 0;
        if (t === want) s += 4;
        else if (t.includes(want) || want.includes(t)) s += 3;
        if (raw.trackName?.includes("Taylor's Version")) s += 1;
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
        normalize(t.artist).includes("taylor swift"),
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
  console.log(`\nAdded ${added.length} Taylor Swift tracks. Total: ${existing.length}`);
}

main();
