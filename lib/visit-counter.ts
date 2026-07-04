import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const VISITS_FILE = path.join(DATA_DIR, "visits.json");
const COUNTAPI_NAMESPACE = "ethans-app-quizzy";
const COUNTAPI_KEY = "visits";

type VisitsData = {
  count: number;
};

async function readVisitsFile(): Promise<VisitsData> {
  try {
    const raw = await readFile(VISITS_FILE, "utf8");
    const parsed = JSON.parse(raw) as VisitsData;
    if (typeof parsed.count === "number" && Number.isFinite(parsed.count)) {
      return { count: Math.max(0, Math.floor(parsed.count)) };
    }
  } catch {
    // Missing or invalid file — fall through.
  }
  return { count: 0 };
}

async function writeVisitsFile(data: VisitsData): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(VISITS_FILE, JSON.stringify(data, null, 2), "utf8");
}

async function countApiGet(): Promise<number | null> {
  try {
    const response = await fetch(
      `https://api.countapi.xyz/get/${COUNTAPI_NAMESPACE}/${COUNTAPI_KEY}`,
      { next: { revalidate: 0 } },
    );
    if (!response.ok) {
      return null;
    }
    const data = (await response.json()) as { value?: number };
    return typeof data.value === "number" ? Math.max(0, data.value) : null;
  } catch {
    return null;
  }
}

async function countApiHit(): Promise<number | null> {
  try {
    const response = await fetch(
      `https://api.countapi.xyz/hit/${COUNTAPI_NAMESPACE}/${COUNTAPI_KEY}`,
      { cache: "no-store" },
    );
    if (!response.ok) {
      return null;
    }
    const data = (await response.json()) as { value?: number };
    return typeof data.value === "number" ? Math.max(0, data.value) : null;
  } catch {
    return null;
  }
}

export async function getVisitCount(): Promise<number> {
  const fileCount = await readVisitsFile()
    .then((data) => data.count)
    .catch(() => 0);
  const remoteCount = await countApiGet();

  if (remoteCount !== null && remoteCount > fileCount) {
    return remoteCount;
  }

  return fileCount;
}

export async function incrementVisitCount(): Promise<number> {
  const data = await readVisitsFile();
  const next = { count: data.count + 1 };

  try {
    await writeVisitsFile(next);
    return next.count;
  } catch {
    return (await countApiHit()) ?? next.count;
  }
}
