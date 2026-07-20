export type MathGrade =
  | "kindergarten"
  | "grade-1"
  | "grade-2"
  | "grade-3"
  | "grade-4"
  | "grade-5-plus";

type MathGradeProfile = {
  label: string;
  shortLabel: string;
  emoji: string;
  description: string;
  minFactor: number;
  maxFactor: number;
};

export const MATH_GRADES: Record<MathGrade, MathGradeProfile> = {
  kindergarten: {
    label: "Kindergarten",
    shortLabel: "K",
    emoji: "🌱",
    description: "Tiny products — factors 1 to 2",
    minFactor: 1,
    maxFactor: 2,
  },
  "grade-1": {
    label: "Grade 1",
    shortLabel: "1",
    emoji: "1️⃣",
    description: "Early facts — factors 1 to 5",
    minFactor: 1,
    maxFactor: 5,
  },
  "grade-2": {
    label: "Grade 2",
    shortLabel: "2",
    emoji: "2️⃣",
    description: "Building fluency — factors 1 to 10",
    minFactor: 1,
    maxFactor: 10,
  },
  "grade-3": {
    label: "Grade 3",
    shortLabel: "3",
    emoji: "3️⃣",
    description: "Classic times tables — factors 1 to 12",
    minFactor: 1,
    maxFactor: 12,
  },
  "grade-4": {
    label: "Grade 4",
    shortLabel: "4",
    emoji: "4️⃣",
    description: "Stronger tables — factors 2 to 12",
    minFactor: 2,
    maxFactor: 12,
  },
  "grade-5-plus": {
    label: "Grade 5+",
    shortLabel: "5+",
    emoji: "5️⃣",
    description: "Challenge mode — factors 3 to 15",
    minFactor: 3,
    maxFactor: 15,
  },
};

export const MATH_GRADE_KEYS = Object.keys(MATH_GRADES) as MathGrade[];

export const DEFAULT_MATH_GRADE: MathGrade = "grade-3";

const MATH_GRADE_STORAGE_KEY = "quizzy-math-grade";

export function factorRangeForGrade(grade: MathGrade): {
  min: number;
  max: number;
} {
  const profile = MATH_GRADES[grade];
  return { min: profile.minFactor, max: profile.maxFactor };
}

export function loadMathGrade(): MathGrade {
  if (typeof window === "undefined") return DEFAULT_MATH_GRADE;
  const saved = localStorage.getItem(MATH_GRADE_STORAGE_KEY);
  if (saved && saved in MATH_GRADES) return saved as MathGrade;
  return DEFAULT_MATH_GRADE;
}

export function saveMathGrade(grade: MathGrade): void {
  localStorage.setItem(MATH_GRADE_STORAGE_KEY, grade);
}
