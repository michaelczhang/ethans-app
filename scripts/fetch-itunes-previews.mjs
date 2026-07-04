/**
 * Fetches 30s iTunes preview URLs for Name That Tune tracks.
 * Run: node scripts/fetch-itunes-previews.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TRACKS = [
  { id: "music-1", songTitle: "Billie Jean", artist: "Michael Jackson", tier: "medium" },
  { id: "music-2", songTitle: "Thriller", artist: "Michael Jackson", tier: "medium" },
  { id: "music-3", songTitle: "Beat It", artist: "Michael Jackson", tier: "hard" },
  { id: "music-4", songTitle: "Never Gonna Give You Up", artist: "Rick Astley", tier: "easy" },
  { id: "music-5", songTitle: "Take On Me", artist: "a-ha", tier: "medium" },
  { id: "music-6", songTitle: "Don't Stop Believin'", artist: "Journey", songAliases: ["Dont Stop Believin"], tier: "medium" },
  { id: "music-7", songTitle: "Sweet Caroline", artist: "Neil Diamond", tier: "easy" },
  { id: "music-8", songTitle: "Livin' on a Prayer", artist: "Bon Jovi", songAliases: ["Living on a Prayer", "Livin On a Prayer"], tier: "medium" },
  { id: "music-9", songTitle: "Eye of the Tiger", artist: "Survivor", tier: "medium" },
  { id: "music-10", songTitle: "We Will Rock You", artist: "Queen", tier: "easy" },
  { id: "music-11", songTitle: "Bohemian Rhapsody", artist: "Queen", tier: "hard" },
  { id: "music-12", songTitle: "Another One Bites the Dust", artist: "Queen", tier: "hard" },
  { id: "music-13", songTitle: "Africa", artist: "TOTO", artistAliases: ["Toto"], tier: "hard" },
  { id: "music-14", songTitle: "Wonderwall", artist: "Oasis", tier: "hard" },
  { id: "music-15", songTitle: "Mr. Brightside", artist: "The Killers", songAliases: ["Mr Brightside"], tier: "hard" },
  { id: "music-16", songTitle: "Shake It Off", artist: "Taylor Swift", tier: "easy" },
  { id: "music-17", songTitle: "Happy", artist: "Pharrell Williams", songAliases: ["Happy From Despicable Me 2"], tier: "medium" },
  { id: "music-18", songTitle: "Can't Stop the Feeling!", artist: "Justin Timberlake", songAliases: ["Cant Stop the Feeling"], tier: "medium" },
  { id: "music-19", songTitle: "Blinding Lights", artist: "The Weeknd", artistAliases: ["Weeknd"], tier: "medium" },
  { id: "music-20", songTitle: "Shape of You", artist: "Ed Sheeran", tier: "hard" },
  { id: "music-21", songTitle: "Rolling in the Deep", artist: "Adele", tier: "hard" },
  { id: "music-22", songTitle: "Uptown Funk", artist: "Mark Ronson", songAliases: ["Uptown Funk feat Bruno Mars"], artistAliases: ["Bruno Mars", "Mark Ronson"], tier: "medium" },
  { id: "music-23", songTitle: "Viva la Vida", artist: "Coldplay", songAliases: ["Viva La Vida"], tier: "hard" },
  { id: "music-24", songTitle: "Counting Stars", artist: "OneRepublic", tier: "hard" },
  { id: "music-25", songTitle: "Bad Guy", artist: "Billie Eilish", tier: "medium" },
  { id: "music-26", songTitle: "Levitating", artist: "Dua Lipa", tier: "medium" },
  { id: "music-27", songTitle: "Watermelon Sugar", artist: "Harry Styles", tier: "medium" },
  { id: "music-28", songTitle: "As It Was", artist: "Harry Styles", tier: "medium" },
  { id: "music-29", songTitle: "Old Town Road", artist: "Lil Nas X", tier: "easy" },
  { id: "music-30", songTitle: "Sunflower", artist: "Post Malone", songAliases: ["Sunflower Post Malone"], tier: "medium" },
  { id: "music-31", songTitle: "Believer", artist: "Imagine Dragons", tier: "medium" },
  { id: "music-32", songTitle: "Radioactive", artist: "Imagine Dragons", tier: "hard" },
  { id: "music-33", songTitle: "Smells Like Teen Spirit", artist: "Nirvana", tier: "hard" },
  { id: "music-34", songTitle: "Sweet Child O' Mine", artist: "Guns N' Roses", songAliases: ["Sweet Child O Mine"], tier: "hard" },
  { id: "music-35", songTitle: "Hotel California", artist: "Eagles", tier: "hard" },
  { id: "music-36", songTitle: "Let It Be", artist: "The Beatles", tier: "medium" },
  { id: "music-37", songTitle: "Hey Jude", artist: "The Beatles", tier: "medium" },
  { id: "music-38", songTitle: "Yellow", artist: "Coldplay", tier: "medium" },
  { id: "music-39", songTitle: "Seven Nation Army", artist: "The White Stripes", tier: "hard" },
  { id: "music-40", songTitle: "Poker Face", artist: "Lady Gaga", tier: "medium" },
  { id: "music-41", songTitle: "Bad Romance", artist: "Lady Gaga", tier: "hard" },
  { id: "music-42", songTitle: "Crazy In Love", artist: "Beyonce", artistAliases: ["Beyoncé"], tier: "medium" },
  { id: "music-43", songTitle: "Toxic", artist: "Britney Spears", tier: "medium" },
  { id: "music-44", songTitle: "...Baby One More Time", artist: "Britney Spears", songAliases: ["Baby One More Time"], tier: "easy" },
  { id: "music-45", songTitle: "Call Me Maybe", artist: "Carly Rae Jepsen", tier: "easy" },
  { id: "music-46", songTitle: "Gangnam Style", artist: "PSY", tier: "easy" },
  { id: "music-47", songTitle: "Despacito", artist: "Luis Fonsi", tier: "medium" },
  { id: "music-48", songTitle: "Closer", artist: "The Chainsmokers", tier: "medium" },
  { id: "music-49", songTitle: "Senorita", artist: "Shawn Mendes", songAliases: ["Señorita"], tier: "medium" },
  { id: "music-50", songTitle: "Perfect", artist: "Ed Sheeran", tier: "medium" },
  { id: "music-51", songTitle: "Someone Like You", artist: "Adele", tier: "hard" },
  { id: "music-52", songTitle: "Roar", artist: "Katy Perry", tier: "medium" },
  { id: "music-53", songTitle: "Firework", artist: "Katy Perry", tier: "medium" },
  { id: "music-54", songTitle: "Locked Out of Heaven", artist: "Bruno Mars", tier: "medium" },
  { id: "music-55", songTitle: "Just the Way You Are", artist: "Bruno Mars", tier: "medium" },
  { id: "music-56", songTitle: "Party in the U.S.A.", artist: "Miley Cyrus", songAliases: ["Party in the USA"], tier: "easy" },
  { id: "music-57", songTitle: "Royals", artist: "Lorde", tier: "hard" },
  { id: "music-58", songTitle: "Pumped Up Kicks", artist: "Foster the People", tier: "hard" },
  { id: "music-59", songTitle: "Boulevard of Broken Dreams", artist: "Green Day", tier: "hard" },
  { id: "music-60", songTitle: "Iris", artist: "The Goo Goo Dolls", artistAliases: ["Goo Goo Dolls"], tier: "hard" },
  // BTS
  { id: "music-61", songTitle: "Dynamite", artist: "BTS", tier: "easy" },
  { id: "music-62", songTitle: "Butter", artist: "BTS", tier: "easy" },
  { id: "music-63", songTitle: "Permission to Dance", artist: "BTS", tier: "easy" },
  { id: "music-64", songTitle: "Boy With Luv", artist: "BTS", songAliases: ["Boy With Luv feat Halsey"], artistAliases: ["BTS feat Halsey"], tier: "medium" },
  { id: "music-65", songTitle: "DNA", artist: "BTS", tier: "medium" },
  { id: "music-66", songTitle: "MIC Drop", artist: "BTS", songAliases: ["Mic Drop"], tier: "medium" },
  { id: "music-67", songTitle: "Life Goes On", artist: "BTS", tier: "medium" },
  { id: "music-68", songTitle: "Spring Day", artist: "BTS", tier: "hard" },
  { id: "music-69", songTitle: "FAKE LOVE", artist: "BTS", songAliases: ["Fake Love"], tier: "hard" },
  { id: "music-70", songTitle: "Blood Sweat & Tears", artist: "BTS", songAliases: ["Blood Sweat and Tears"], tier: "hard" },
  { id: "music-71", songTitle: "IDOL", artist: "BTS", songAliases: ["Idol"], tier: "medium" },
  { id: "music-72", songTitle: "ON", artist: "BTS", tier: "medium" },
  { id: "music-73", songTitle: "Yet To Come", artist: "BTS", tier: "medium" },
  { id: "music-74", songTitle: "Save ME", artist: "BTS", songAliases: ["Save Me"], tier: "hard" },
  { id: "music-75", songTitle: "Fire", artist: "BTS", tier: "medium" },
  { id: "music-76", songTitle: "Dope", artist: "BTS", tier: "hard" },
  { id: "music-77", songTitle: "Make It Right", artist: "BTS", tier: "hard" },
  { id: "music-78", songTitle: "Black Swan", artist: "BTS", tier: "hard" },
  { id: "music-79", songTitle: "Life Goes On", artist: "BTS", tier: "medium" },
];

// Remove duplicate Life Goes On - music-67 and 79
// I'll remove music-79 in final list and add "My Universe" instead
TRACKS[TRACKS.length - 1] = { id: "music-79", songTitle: "My Universe", artist: "Coldplay", songAliases: ["My Universe BTS"], artistAliases: ["Coldplay x BTS", "BTS"], tier: "medium" };

function normalize(value) {
  return value
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanTitle(name) {
  return name
    .replace(/\s*-\s*remaster(ed)?\s*\d*/gi, "")
    .replace(/\s*\([^)]*version[^)]*\)/gi, "")
    .replace(/\s*\(from[^)]*\)/gi, "")
    .trim();
}

function scoreResult(track, result) {
  const title = normalize(cleanTitle(result.trackName));
  const artist = normalize(result.artistName);
  const wantTitle = normalize(track.songTitle);
  const wantArtist = normalize(track.artist);

  let score = 0;
  if (title === wantTitle) score += 10;
  else if (title.includes(wantTitle) || wantTitle.includes(title)) score += 6;

  if (artist === wantArtist) score += 10;
  else if (artist.includes(wantArtist) || wantArtist.includes(artist)) score += 6;

  if (result.trackExplicitness === "notExplicit") score += 4;
  else if (result.trackExplicitness === "cleaned") score += 2;
  else score -= 20;

  if (result.previewUrl) score += 1;

  return score;
}

function isAllowedExplicitness(value) {
  return value === "notExplicit" || value === "cleaned";
}

async function searchItunes(track) {
  const query = encodeURIComponent(`${track.artist} ${track.songTitle}`);
  const url = `https://itunes.apple.com/search?term=${query}&entity=song&limit=10&media=music`;
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const data = await response.json();
    const results = (data.results ?? []).filter(
      (r) => r.previewUrl && isAllowedExplicitness(r.trackExplicitness),
    );

    if (results.length === 0) return null;

    results.sort((a, b) => scoreResult(track, b) - scoreResult(track, a));
    return results[0];
  } catch {
    return null;
  }
}

async function main() {
  const resolved = [];
  const failed = [];

  for (const track of TRACKS) {
    const result = await searchItunes(track);
    if (!result?.previewUrl) {
      failed.push(track);
      console.error(`✗ No preview: ${track.songTitle} — ${track.artist}`);
      continue;
    }

    const displayTitle = cleanTitle(result.trackName) || track.songTitle;

    resolved.push({
      id: track.id,
      songTitle: displayTitle,
      artist: result.artistName,
      audio: result.previewUrl,
      songAliases: track.songAliases,
      artistAliases: track.artistAliases,
      tier: track.tier,
      itunesTrackId: result.trackId,
      explicitness: result.trackExplicitness,
    });

    console.log(`✓ ${track.songTitle} → ${displayTitle} (${result.artistName})`);
    await new Promise((r) => setTimeout(r, 200));
  }

  const outPath = path.join(__dirname, "..", "lib", "music-tracks.json");
  fs.writeFileSync(outPath, JSON.stringify(resolved, null, 2));
  console.log(`\nWrote ${resolved.length} tracks to ${outPath}`);
  if (failed.length) console.log(`Failed: ${failed.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
