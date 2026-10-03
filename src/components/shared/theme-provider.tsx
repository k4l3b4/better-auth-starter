"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type ThemeName =
  | "terracotta"
  | "midnight"
  | "sage"
  | "rose"
  | "ocean";

export type ColorMode = "dark" | "light";

interface ThemeContextValue {
  theme: ThemeName;
  mode: ColorMode;
  setTheme: (t: ThemeName) => void;
  setMode: (m: ColorMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}

const THEME_KEY = "feben-theme";
const MODE_KEY = "feben-mode";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("terracotta");
  const [mode, setModeState] = useState<ColorMode>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = (localStorage.getItem(THEME_KEY) as ThemeName) || "terracotta";
    const savedMode = (localStorage.getItem(MODE_KEY) as ColorMode) || "dark";
    setThemeState(savedTheme);
    setModeState(savedMode);
    applyTheme(savedTheme, savedMode);
    setMounted(true);
  }, []);

  function applyTheme(t: ThemeName, m: ColorMode) {
    const html = document.documentElement;
    // Remove all theme and mode classes
    html.classList.remove("dark", "light");
    html.removeAttribute("data-theme");
    // Apply mode
    html.classList.add(m);
    // Apply theme
    html.setAttribute("data-theme", t);
  }

  function setTheme(t: ThemeName) {
    setThemeState(t);
    localStorage.setItem(THEME_KEY, t);
    applyTheme(t, mode);
  }

  function setMode(m: ColorMode) {
    setModeState(m);
    localStorage.setItem(MODE_KEY, m);
    applyTheme(theme, m);
  }

  function toggleMode() {
    setMode(mode === "dark" ? "light" : "dark");
  }

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, mode, setTheme, setMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
