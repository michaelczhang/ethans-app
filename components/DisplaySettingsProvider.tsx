"use client";

import {
  applyDisplaySettings,
  loadDisplaySettings,
  saveDisplaySettings,
  type AppLanguage,
  type DisplaySettings,
} from "@/lib/display-settings";
import { t, type TranslationKey } from "@/lib/i18n";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type DisplaySettingsContextValue = {
  settings: DisplaySettings;
  setDarkMode: (enabled: boolean) => void;
  setBlindMode: (enabled: boolean) => void;
  setLanguage: (language: AppLanguage) => void;
  translate: (key: TranslationKey) => string;
};

const DisplaySettingsContext = createContext<DisplaySettingsContextValue | null>(
  null,
);

export function DisplaySettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState<DisplaySettings>(loadDisplaySettings);

  useEffect(() => {
    applyDisplaySettings(settings);
  }, [settings]);

  const updateSettings = useCallback((next: Partial<DisplaySettings>) => {
    setSettings((current) => {
      const merged = { ...current, ...next };
      saveDisplaySettings(merged);
      return merged;
    });
  }, []);

  const value = useMemo<DisplaySettingsContextValue>(
    () => ({
      settings,
      setDarkMode: (enabled) => updateSettings({ darkMode: enabled }),
      setBlindMode: (enabled) => updateSettings({ blindMode: enabled }),
      setLanguage: (language) => updateSettings({ language }),
      translate: (key) => t(key, settings.language),
    }),
    [settings, updateSettings],
  );

  return (
    <DisplaySettingsContext.Provider value={value}>
      {children}
    </DisplaySettingsContext.Provider>
  );
}

export function useDisplaySettings(): DisplaySettingsContextValue {
  const context = useContext(DisplaySettingsContext);
  if (!context) {
    throw new Error("useDisplaySettings must be used within DisplaySettingsProvider");
  }
  return context;
}
