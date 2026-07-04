"use client";

import { useEffect, useState } from "react";
import { useDisplaySettings } from "@/components/DisplaySettingsProvider";

const VISITOR_KEY = "quizzy-visit-recorded";

function formatCount(count: number): string {
  return count.toLocaleString();
}

function hasRecordedVisit(): boolean {
  try {
    return localStorage.getItem(VISITOR_KEY) === "1";
  } catch {
    return false;
  }
}

function markVisitRecorded(): void {
  try {
    localStorage.setItem(VISITOR_KEY, "1");
  } catch {
    // Private browsing or storage blocked — skip persisting.
  }
}

export default function VisitCounter({
  className = "visit-counter pointer-events-none fixed top-4 left-3/4 z-30 -translate-x-1/2",
}: {
  className?: string;
}) {
  const [count, setCount] = useState<number | null>(null);
  const { translate } = useDisplaySettings();

  useEffect(() => {
    let cancelled = false;

    async function loadVisits() {
      try {
        const shouldRecord = !hasRecordedVisit();
        const response = await fetch("/api/visits", {
          method: shouldRecord ? "POST" : "GET",
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { count?: number };
        if (typeof data.count === "number" && !cancelled) {
          setCount(data.count);
        }

        if (shouldRecord) {
          markVisitRecorded();
        }
      } catch {
        // Ignore network errors — counter is non-critical.
      }
    }

    void loadVisits();

    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) {
    return null;
  }

  const label = count === 1 ? translate("visit") : translate("visits");

  return (
    <div className={className} aria-live="polite">
      <p className="rounded-xl border border-white/25 bg-white/90 px-3 py-1.5 text-sm font-semibold text-zinc-800 shadow-lg backdrop-blur">
        <span aria-hidden="true">👀 </span>
        {formatCount(count)} {label}
      </p>
    </div>
  );
}
