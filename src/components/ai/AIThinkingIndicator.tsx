import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AIThinkingIndicator() {
  const { t } = useTranslation();

  return (
    <div className="animate-in fade-in flex items-start gap-3 px-4 py-2 duration-200">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-linear-to-tr from-indigo-600 to-purple-600 text-white shadow-xs">
        <Sparkles className="h-3.5 w-3.5 animate-spin" />
      </div>

      <div className="flex flex-col gap-1 rounded-2xl rounded-tl-sm border border-zinc-100 bg-white p-3 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:0.2s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:0.4s]" />
          <span className="ms-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            {t("ai.thinking", "Analyzing store data...")}
          </span>
        </div>
      </div>
    </div>
  );
}
