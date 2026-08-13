import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ar from "./locales/ar.json";
import de from "./locales/de.json";
import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import { DEFAULT_LANGUAGE, type SupportedLanguage } from "./types";

const STORAGE_KEY = "app_language";

export const getSavedLanguage = (): SupportedLanguage => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && ["en", "ar", "es", "de", "fr"].includes(saved)) {
      return saved as SupportedLanguage;
    }
  }
  return DEFAULT_LANGUAGE;
};

export const updateDocumentDirection = (lng: string) => {
  if (typeof document !== "undefined") {
    const isRtl = lng === "ar";
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lng;
    if (isRtl) {
      document.documentElement.classList.add("rtl");
      document.body.classList.add("rtl");
    } else {
      document.documentElement.classList.remove("rtl");
      document.body.classList.remove("rtl");
    }
  }
};

const initialLanguage = getSavedLanguage();
updateDocumentDirection(initialLanguage);

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
    es: { translation: es },
    de: { translation: de },
    fr: { translation: fr },
  },
  lng: initialLanguage,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, lng);
    updateDocumentDirection(lng);
  }
});

export default i18n;
