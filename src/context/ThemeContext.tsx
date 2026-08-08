import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
}

export type AccentColor =
  | "#4f46e5" // Indigo
  | "#06b6d4" // Cyan
  | "#10b981" // Emerald
  | "#f43f5e" // Rose
  | "#8b5cf6" // Purple
  | "#ea580c"; // Amber

export interface ThemePreset {
  name: string;
  hex: string;
  bg: string;
  bgHover: string;
  text: string;
  border: string;
  badgeBg: string;
  badgeText: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ACCENT_PRESETS: Record<AccentColor, ThemePreset> = {
  "#4f46e5": {
    name: "indigo",
    hex: "#4f46e5",
    bg: "bg-indigo-600",
    bgHover: "hover:bg-indigo-700",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-600 dark:border-indigo-400",
    badgeBg: "bg-indigo-500/10 dark:bg-indigo-400/10",
    badgeText: "text-indigo-600 dark:text-indigo-400",
  },
  "#06b6d4": {
    name: "cyan",
    hex: "#06b6d4",
    bg: "bg-cyan-600",
    bgHover: "hover:bg-cyan-700",
    text: "text-cyan-600 dark:text-cyan-400",
    border: "border-cyan-600 dark:border-cyan-400",
    badgeBg: "bg-cyan-500/10 dark:bg-cyan-400/10",
    badgeText: "text-cyan-600 dark:text-cyan-400",
  },
  "#10b981": {
    name: "emerald",
    hex: "#10b981",
    bg: "bg-emerald-600",
    bgHover: "hover:bg-emerald-700",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-600 dark:border-emerald-400",
    badgeBg: "bg-emerald-500/10 dark:bg-emerald-400/10",
    badgeText: "text-emerald-600 dark:text-emerald-400",
  },
  "#f43f5e": {
    name: "rose",
    hex: "#f43f5e",
    bg: "bg-rose-600",
    bgHover: "hover:bg-rose-700",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-600 dark:border-rose-400",
    badgeBg: "bg-rose-500/10 dark:bg-rose-400/10",
    badgeText: "text-rose-600 dark:text-rose-400",
  },
  "#8b5cf6": {
    name: "purple",
    hex: "#8b5cf6",
    bg: "bg-purple-600",
    bgHover: "hover:bg-purple-700",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-600 dark:border-purple-400",
    badgeBg: "bg-purple-500/10 dark:bg-purple-400/10",
    badgeText: "text-purple-600 dark:text-purple-400",
  },
  "#ea580c": {
    name: "amber",
    hex: "#ea580c",
    bg: "bg-amber-600",
    bgHover: "hover:bg-amber-700",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-600 dark:border-amber-400",
    badgeBg: "bg-amber-500/10 dark:bg-amber-400/10",
    badgeText: "text-amber-600 dark:text-amber-400",
  },
};

interface ThemeContextType {
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
  themePreset: ThemePreset;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const DEFAULT_USER: UserProfile = {
  name: "Mohamed Alhinawi",
  email: "mohamed.alhinawi@company.com",
  role: "Administrator",
  avatarUrl: "https://avatars.githubusercontent.com/u/68702059?v=4",
};

const DEFAULT_ACCENT: AccentColor = "#4f46e5";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [accentColor, setAccentColorState] = useState<AccentColor>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("app_accent_color");
      if (saved && saved in ACCENT_PRESETS) return saved as AccentColor;
    }
    return DEFAULT_ACCENT;
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("app_user_profile");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // Fallback
        }
      }
    }
    return DEFAULT_USER;
  });

  const themePreset =
    ACCENT_PRESETS[accentColor] || ACCENT_PRESETS[DEFAULT_ACCENT];

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("app_accent_color", accentColor);

      const themeHexMap: Record<AccentColor, { hover: string; light: string }> =
        {
          "#4f46e5": { hover: "#4338ca", light: "rgba(79, 70, 229, 0.15)" },
          "#06b6d4": { hover: "#0891b2", light: "rgba(6, 182, 212, 0.15)" },
          "#10b981": { hover: "#059669", light: "rgba(16, 185, 129, 0.15)" },
          "#f43f5e": { hover: "#e11d48", light: "rgba(244, 63, 94, 0.15)" },
          "#8b5cf6": { hover: "#7c3aed", light: "rgba(139, 92, 246, 0.15)" },
          "#ea580c": { hover: "#c2410c", light: "rgba(234, 88, 12, 0.15)" },
        };

      const meta = themeHexMap[accentColor] || themeHexMap[DEFAULT_ACCENT];
      document.documentElement.style.setProperty(
        "--primary-accent",
        accentColor,
      );
      document.documentElement.style.setProperty(
        "--primary-accent-hover",
        meta.hover,
      );
      document.documentElement.style.setProperty(
        "--primary-accent-light",
        meta.light,
      );
    }
  }, [accentColor]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("app_user_profile", JSON.stringify(userProfile));
      } catch (e) {
        console.error("Could not save profile to localStorage:", e);
      }
    }
  }, [userProfile]);

  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color);
  };

  return (
    <ThemeContext.Provider
      value={{
        accentColor,
        setAccentColor,
        themePreset,
        userProfile,
        setUserProfile,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}
