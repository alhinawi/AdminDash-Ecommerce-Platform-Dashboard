import { Sparkles, X, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAI } from "../../context/AIContext";

interface AIHeaderProps {
  onClose: () => void;
}

export default function AIHeader({ onClose }: AIHeaderProps) {
  const { t } = useTranslation();
  const { messages, clearMessages } = useAI();

  return (
    <div className="flex items-center justify-between border-b border-zinc-200/80 bg-white/95 px-5 py-4 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/95">
      {/* Brand & Status */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-white">
            {t("ai.headerTitle", "Ecommerce AI Assistant")}
          </h3>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            <span>{t("ai.onlineStatus", "Live Store Context")}</span>
          </div>
        </div>
      </div>

      {/* Actions: Clear & Close */}
      <div className="flex items-center gap-1">
        {messages.length > 0 && (
          <button
            type="button"
            onClick={clearMessages}
            title={t("ai.clearHistory", "Clear conversation")}
            aria-label={t("ai.clearHistory", "Clear conversation")}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}

        <button
          type="button"
          onClick={onClose}
          title={t("common.close", "Close")}
          aria-label={t("common.close", "Close")}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
