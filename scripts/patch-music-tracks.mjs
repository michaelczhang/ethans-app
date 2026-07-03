import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonPath = path.join(__dirname, "..", "lib", "music-tracks.json");
const tracks = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const patches = {
  "music-28": { songTitle: "bad guy", songAliases: ["Bad Guy"] },
  "music-30": {
    songTitle: "Sunflower",
    songAliases: ["Sunflower Spider-Man"],
    artistAliases: ["Post Malone", "Swae Lee"],
  },
  "music-42": {
    songTitle: "Crazy in Love",
    songAliases: ["Crazy In Love", "Crazy in Love feat Jay-Z"],
    artistAliases: ["Beyoncé", "Beyonce"],
  },
  "music-48": { songTitle: "Closer", songAliases: ["Closer feat Halsey"] },
  "music-49": { songTitle: "Señorita", songAliases: ["Senorita"] },
  "music-64": {
    songTitle: "Boy With Luv",
    songAliases: ["Boy With Luv feat Halsey"],
    artistAliases: ["BTS feat Halsey"],
  },
  "music-75": {
    songTitle: "Fire",
    songAliases: ["Burning Up", "Burning Up FIRE", "FIRE"],
  },
};

let next = tracks
  .filter((t) => t.id !== "music-59")
  .map((t) => ({ ...t, ...(patches[t.id] ?? {}) }));

async function fetchTrack(id, songTitle, artist, extra = {}) {
  await new Promise((r) => setTimeout(r, 2500));
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(`${artist} ${songTitle}`)}&entity=song&limit=8&country=us`;
  const res = await fetch(url);
  const text = await res.text();
  if (!text) return null;
  const data = JSON.parse(text);
  const key = artist.toLowerCase().split(" ")[0];
  const hit =
    (data.results ?? []).find(
      (r) => r.previewUrl && r.artistName.toLowerCase().includes(key),
    ) ?? (data.results ?? []).find((r) => r.previewUrl);
  if (!hit) return null;
  return {
    id,
    songTitle: hit.trackName.replace(/\s*\([^)]*version[^)]*\)/gi, "").trim(),
    artist: hit.artistName,
    audio: hit.previewUrl,
    tier: extra.tier ?? "medium",
    ...extra,
    itunesTrackId: hit.trackId,
  };
}

const adds = [
  ["music-59", "Boulevard of Broken Dreams", "Green Day", { tier: "hard" }],
  ["music-63", "Permission to Dance", "BTS", { tier: "easy" }],
  ["music-70", "Blood Sweat & Tears", "BTS", { tier: "hard", songAliases: ["Blood Sweat and Tears"] }],
];

for (const [id, song, artist, extra] of adds) {
  const track = await fetchTrack(id, song, artist, extra);
  if (track) {
    next.push(track);
    console.log("Added", song);
  } else {
    console.log("Skipped", song);
  }
}

next.sort((a, b) => Number(a.id.replace("music-", "")) - Number(b.id.replace("music-", "")));

fs.writeFileSync(jsonPath, JSON.stringify(next, null, 2));
console.log("Total tracks:", next.length);
console.log("BTS tracks:", next.filter((t) => t.artist.includes("BTS")).length);
