import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useAI } from "../../context/AIContext";

export default function FloatingAIButton() {
  const { t } = useTranslation();
  const { isOpen, setIsOpen } = useAI();

  return (
    <div className="fixed right-5 bottom-5 z-40 sm:right-7 sm:bottom-7">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={t("ai.askAiTooltip", "Ask AI Assistant")}
        title={t("ai.askAiTooltip", "Ask AI Assistant")}
        className="group relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl bg-linear-to-tr from-indigo-600 via-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-500/25 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/40 focus:outline-hidden focus-visible:ring-4 focus-visible:ring-indigo-400 active:scale-95"
      >
        {/* Glow backdrop pulse */}
        <span className="absolute inset-0 -z-10 animate-pulse rounded-2xl bg-indigo-500/30 blur-md transition-all group-hover:bg-indigo-500/50" />

        {/* AI Icon with Sparkles */}
        <Sparkles className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12" />

        {/* Online Status Dot */}
        <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 dark:border-zinc-900" />
        </span>

        {/* Accessible Tooltip */}
        <span className="pointer-events-none absolute right-16 hidden rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-white opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 sm:block dark:bg-zinc-800">
          {t("ai.askAiTooltip", "Ask AI Assistant")}
        </span>
      </button>
    </div>
  );
}
