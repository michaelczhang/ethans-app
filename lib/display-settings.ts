export type AppLanguage = "en" | "es" | "fr" | "de" | "zh";

export type DisplaySettings = {
  darkMode: boolean;
  blindMode: boolean;
  language: AppLanguage;
};

export const LANGUAGES: Record<
  AppLanguage,
  { label: string; emoji: string; nativeName: string }
> = {
  en: { label: "English", emoji: "🇺🇸", nativeName: "English" },
  es: { label: "Spanish", emoji: "🇪🇸", nativeName: "Español" },
  fr: { label: "French", emoji: "🇫🇷", nativeName: "Français" },
  de: { label: "German", emoji: "🇩🇪", nativeName: "Deutsch" },
  zh: { label: "Chinese", emoji: "🇨🇳", nativeName: "中文" },
};

export const LANGUAGE_KEYS = Object.keys(LANGUAGES) as AppLanguage[];

const STORAGE_KEY = "quizzy-display-settings";

const DEFAULT_SETTINGS: DisplaySettings = {
  darkMode: false,
  blindMode: false,
  language: "en",
};

export function loadDisplaySettings(): DisplaySettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<DisplaySettings>;
    return {
      darkMode: Boolean(parsed.darkMode),
      blindMode: Boolean(parsed.blindMode),
      language:
        parsed.language && parsed.language in LANGUAGES
          ? parsed.language
          : "en",
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveDisplaySettings(settings: DisplaySettings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function applyDisplaySettings(settings: DisplaySettings): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark-mode", settings.darkMode);
  root.classList.toggle("blind-mode", settings.blindMode);
  root.lang = settings.language === "zh" ? "zh-Hans" : settings.language;
}
