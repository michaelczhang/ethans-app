"use client";

import { useState } from "react";
import QuizBackground from "@/components/QuizBackground";
import QuizGame from "@/components/QuizGame";
import QuizHome from "@/components/QuizHome";
import type { QuizMode } from "@/lib/quiz-data";

export default function QuizApp() {
  const [activeMode, setActiveMode] = useState<QuizMode | null>(null);

  return (
    <>
      <QuizBackground />
      {activeMode === null ? (
        <QuizHome onSelectMode={setActiveMode} />
      ) : (
        <QuizGame mode={activeMode} onBackToHome={() => setActiveMode(null)} />
      )}
    </>
  );
}
