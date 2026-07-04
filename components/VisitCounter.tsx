"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "quizzy-visit-recorded";

function formatCount(count: number): string {
  return count.toLocaleString();
}

export default function VisitCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadVisits() {
      try {
        const shouldRecord = !sessionStorage.getItem(SESSION_KEY);
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
          sessionStorage.setItem(SESSION_KEY, "1");
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

  const label = count === 1 ? "visit" : "visits";

  return (
    <div
      className="visit-counter pointer-events-none fixed top-4 left-1/2 z-30 -translate-x-1/2"
      aria-live="polite"
    >
      <p className="rounded-xl border border-white/25 bg-white/90 px-3 py-1.5 text-sm font-semibold text-zinc-800 shadow-lg backdrop-blur">
        <span aria-hidden="true">👀 </span>
        {formatCount(count)} {label}
      </p>
    </div>
  );
}
