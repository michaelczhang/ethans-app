import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const RETRY = [
  { id: "music-55", songTitle: "Just the Way You Are", artist: "Bruno Mars", tier: "medium" },
  { id: "music-58", songTitle: "Pumped Up Kicks", artist: "Foster the People", tier: "hard" },
  { id: "music-59", songTitle: "Boulevard of Broken Dreams", artist: "Green Day", tier: "hard" },
  { id: "music-62", songTitle: "Butter", artist: "BTS", tier: "easy" },
  { id: "music-63", songTitle: "Permission to Dance", artist: "BTS", tier: "easy" },
  { id: "music-66", songTitle: "MIC Drop", artist: "BTS", songAliases: ["Mic Drop"], tier: "medium" },
  { id: "music-68", songTitle: "Spring Day", artist: "BTS", tier: "hard" },
  { id: "music-70", songTitle: "Blood Sweat & Tears", artist: "BTS", songAliases: ["Blood Sweat and Tears"], tier: "hard" },
  { id: "music-71", songTitle: "IDOL", artist: "BTS", songAliases: ["Idol"], tier: "medium" },
  { id: "music-73", songTitle: "Yet To Come", artist: "BTS", tier: "medium" },
  { id: "music-74", songTitle: "Save ME", artist: "BTS", songAliases: ["Save Me"], tier: "hard" },
  { id: "music-77", songTitle: "Make It Right", artist: "BTS", tier: "hard" },
  { id: "music-79", songTitle: "My Universe", artist: "Coldplay", songAliases: ["My Universe BTS"], artistAliases: ["Coldplay x BTS", "BTS"], tier: "medium" },
];

function cleanTitle(name) {
  return name
    .replace(/\s*-\s*remaster(ed)?\s*\d*/gi, "")
    .replace(/\s*\([^)]*version[^)]*\)/gi, "")
    .trim();
}

async function search(track, attempt = 0) {
  const query = encodeURIComponent(`${track.artist} ${track.songTitle}`);
  const url = `https://itunes.apple.com/search?term=${query}&entity=song&limit=12&country=us&media=music`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (attempt < 3) {
        await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
        return search(track, attempt + 1);
      }
      return null;
    }
    const text = await res.text();
    if (!text) return null;
    const data = JSON.parse(text);
    const artistKey = track.artist.toLowerCase().split(" ")[0];
    const results = (data.results ?? []).filter(
      (r) => r.previewUrl && r.artistName.toLowerCase().includes(artistKey),
    );
    if (results.length) return results[0];
    const fallback = (data.results ?? []).filter((r) => r.previewUrl);
    return fallback[0] ?? null;
  } catch {
    if (attempt < 3) {
      await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
      return search(track, attempt + 1);
    }
    return null;
  }
}

async function main() {
  const existingPath = path.join(__dirname, "..", "lib", "music-tracks.json");
  const existing = JSON.parse(fs.readFileSync(existingPath, "utf8"));
  const byId = new Map(existing.map((t) => [t.id, t]));

  for (const track of RETRY) {
    await new Promise((r) => setTimeout(r, 1200));
    const result = await search(track);
    if (!result) {
      console.error(`✗ ${track.songTitle}`);
      continue;
    }
    byId.set(track.id, {
      id: track.id,
      songTitle: cleanTitle(result.trackName) || track.songTitle,
      artist: result.artistName,
      audio: result.previewUrl,
      songAliases: track.songAliases,
      artistAliases: track.artistAliases,
      tier: track.tier,
      itunesTrackId: result.trackId,
    });
    console.log(`✓ ${track.songTitle} → ${result.trackName}`);
  }

  const merged = [...byId.values()].sort((a, b) => {
    const na = Number(a.id.replace("music-", ""));
    const nb = Number(b.id.replace("music-", ""));
    return na - nb;
  });

  // Fix wrong Boulevard if Sparrow Sleeps slipped in
  const blvd = merged.find((t) => t.id === "music-59");
  if (blvd && !blvd.artist.toLowerCase().includes("green")) {
    delete byId.get("music-59");
    const fixed = await search({ songTitle: "Boulevard of Broken Dreams", artist: "Green Day" });
    if (fixed) {
      byId.set("music-59", {
        id: "music-59",
        songTitle: cleanTitle(fixed.trackName),
        artist: fixed.artistName,
        audio: fixed.previewUrl,
        tier: "hard",
        itunesTrackId: fixed.trackId,
      });
      console.log("Fixed Boulevard:", fixed.trackName);
    }
  }

  const final = [...byId.values()].sort((a, b) => Number(a.id.replace("music-", "")) - Number(b.id.replace("music-", "")));
  fs.writeFileSync(existingPath, JSON.stringify(final, null, 2));
  console.log(`Total: ${final.length} tracks`);
}

main();
