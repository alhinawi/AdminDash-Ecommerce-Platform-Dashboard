import { useCallback, useEffect, useRef, useState } from "react";

import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useThemeContext } from "../context/ThemeContext";
import {
  type LanguageOption,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "../i18n/types";
import FlagIcon from "./ui/FlagIcon";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const { themePreset } = useThemeContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguageCode = (i18n.language || "en").substring(
    0,
    2,
  ) as SupportedLanguage;
  const currentLang: LanguageOption =
    SUPPORTED_LANGUAGES.find((lang) => lang.code === currentLanguageCode) ||
    SUPPORTED_LANGUAGES[0];

  const closeDropdown = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeDropdown]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        closeDropdown();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeDropdown]);

  const handleLanguageSelect = (lang: LanguageOption) => {
    i18n.changeLanguage(lang.code);
    closeDropdown();
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={t("nav.selectLanguage", "Select Language")}
        title={t("nav.language", "Language")}
        className="flex h-8 cursor-pointer items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 px-1.5 text-xs font-semibold text-zinc-700 transition-all duration-200 hover:bg-zinc-100 sm:h-9 sm:px-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
      >
        <FlagIcon code={currentLang.code} className="h-3.5 w-4.5" />
        <span className="hidden font-mono text-[11px] font-bold tracking-wider uppercase xl:inline">
          {currentLang.code.toUpperCase()}
        </span>
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="animate-in fade-in zoom-in-95 absolute inset-e-0 z-50 mt-2 w-48 origin-top-right rounded-2xl border border-zinc-200/80 bg-white/95 p-1.5 shadow-xl backdrop-blur-md duration-150 dark:border-zinc-800 dark:bg-zinc-900/95">
          <div className="px-2.5 py-1.5 text-[10px] font-bold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
            {t("nav.selectLanguage", "Select Language")}
          </div>

          <div className="flex flex-col gap-0.5">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = lang.code === currentLanguageCode;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleLanguageSelect(lang)}
                  className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-2.5 py-2 text-xs font-medium transition-all ${
                    isSelected
                      ? `bg-zinc-100 font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 ${themePreset.text}`
                      : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FlagIcon code={lang.code} className="h-4 w-5.5" />
                    <div className="flex flex-col text-start">
                      <span className="text-xs leading-tight font-semibold">
                        {lang.nativeName}
                      </span>
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                        {lang.name}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className={`h-4 w-4 shrink-0 ${themePreset.text}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
