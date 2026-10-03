"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, type ThemeName } from "@/components/shared/theme-provider";
import { Moon, Sun, Palette, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const THEMES: {
  id: ThemeName;
  label: string;
  description: string;
  lightSwatch: { bg: string; primary: string; accent: string };
  darkSwatch: { bg: string; primary: string; accent: string };
}[] = [
  {
    id: "terracotta",
    label: "Terracotta",
    description: "Warm cream & earthy amber",
    lightSwatch: { bg: "#f7f0e8", primary: "#b5612a", accent: "#e8d5b7" },
    darkSwatch: { bg: "#1e140c", primary: "#c97a3a", accent: "#3a2010" },
  },
  {
    id: "midnight",
    label: "Midnight Slate",
    description: "Cool grey & electric violet",
    lightSwatch: { bg: "#f4f4f8", primary: "#6c47d9", accent: "#e8e6f5" },
    darkSwatch: { bg: "#0f0f1a", primary: "#9b77ff", accent: "#1e1a38" },
  },
  {
    id: "sage",
    label: "Forest Sage",
    description: "Linen & deep botanical green",
    lightSwatch: { bg: "#f3f5f0", primary: "#3a6e45", accent: "#d6e8d4" },
    darkSwatch: { bg: "#0e1610", primary: "#5ca06e", accent: "#162018" },
  },
  {
    id: "rose",
    label: "Dusty Rose",
    description: "Soft ivory & muted blush",
    lightSwatch: { bg: "#faf5f5", primary: "#b5435d", accent: "#f0d8dc" },
    darkSwatch: { bg: "#1a0e10", primary: "#d9708a", accent: "#2a1520" },
  },
  {
    id: "ocean",
    label: "Deep Ocean",
    description: "Chalk white & teal depth",
    lightSwatch: { bg: "#f0f7f9", primary: "#1a7a8a", accent: "#c9e8ef" },
    darkSwatch: { bg: "#090f12", primary: "#2abccd", accent: "#0d2530" },
  },
];

export default function ThemeSwitcher() {
  const { theme, mode, setTheme, toggleMode } = useTheme();
  const [open, setOpen] = useState(false);

  const current = THEMES.find((t) => t.id === theme)!;

  return (
    <>
      {/* Floating trigger button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* Dark/light mode toggle */}
        <Button
          size="icon"
          variant="outline"
          onClick={toggleMode}
          className="h-10 w-10 rounded-full shadow-lg border-border/60 bg-background/80 backdrop-blur-md hover:scale-110 transition-transform"
          title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          <AnimatePresence mode="wait">
            {mode === "dark" ? (
              <motion.span
                key="sun"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className="h-4 w-4" />
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon className="h-4 w-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </Button>

        {/* Palette trigger */}
        <Button
          size="icon"
          onClick={() => setOpen((o) => !o)}
          className="h-12 w-12 rounded-full shadow-lg hover:scale-110 transition-transform"
          title="Change color theme"
        >
          <Palette className="h-5 w-5" />
        </Button>
      </div>

      {/* Theme panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-24 right-6 z-50 w-80 rounded-2xl border border-border/60 bg-card shadow-2xl shadow-black/20 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
                <div>
                  <p className="font-heading font-semibold text-sm">Color Theme</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Active: <span className="text-primary font-medium">{current.label}</span>
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Theme list */}
              <div className="p-3 flex flex-col gap-1.5">
                {THEMES.map((t) => {
                  const swatch = mode === "dark" ? t.darkSwatch : t.lightSwatch;
                  const isActive = t.id === theme;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left transition-all ${
                        isActive
                          ? "bg-primary/10 border border-primary/30"
                          : "hover:bg-muted border border-transparent"
                      }`}
                    >
                      {/* Color swatches */}
                      <div className="flex gap-1 flex-shrink-0">
                        <div
                          className="w-6 h-6 rounded-full border border-black/10 shadow-sm"
                          style={{ background: swatch.bg }}
                        />
                        <div
                          className="w-6 h-6 rounded-full border border-black/10 shadow-sm -ml-2"
                          style={{ background: swatch.primary }}
                        />
                        <div
                          className="w-6 h-6 rounded-full border border-black/10 shadow-sm -ml-2"
                          style={{ background: swatch.accent }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-none">{t.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{t.description}</p>
                      </div>
                      {isActive && (
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Mode toggle inside panel */}
              <div className="border-t border-border/50 px-5 py-3 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Mode: <span className="text-foreground font-medium capitalize">{mode}</span>
                </p>
                <button
                  onClick={toggleMode}
                  className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline transition-colors"
                >
                  {mode === "dark" ? (
                    <><Sun className="h-3.5 w-3.5" /> Light</>
                  ) : (
                    <><Moon className="h-3.5 w-3.5" /> Dark</>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
