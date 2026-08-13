import { AlertTriangle, BarChart3, Star, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useAI } from "../../context/AIContext";

export default function AISuggestions() {
  const { t } = useTranslation();
  const { sendMessage } = useAI();

  const suggestions = [
    {
      id: "sales-summary",
      icon: TrendingUp,
      label: t("ai.suggestionSales", "Give me today's sales summary"),
      color: "text-blue-500",
    },
    {
      id: "low-stock",
      icon: AlertTriangle,
      label: t("ai.suggestionRestock", "What products need restocking?"),
      color: "text-amber-500",
    },
    {
      id: "top-products",
      icon: Star,
      label: t("ai.suggestionTopProducts", "Show me my best-selling products"),
      color: "text-purple-500",
    },
    {
      id: "category-compare",
      icon: BarChart3,
      label: t("ai.suggestionCategory", "Compare category valuations"),
      color: "text-emerald-500",
    },
  ];

  return (
    <div className="flex flex-col gap-2 p-4">
      <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
        {t("ai.suggestedPrompts", "Suggested Questions")}
      </p>
      <div className="grid grid-cols-1 gap-2">
        {suggestions.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => sendMessage(item.label)}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-200/80 bg-white p-3 text-start text-xs font-medium text-zinc-700 shadow-2xs transition-all hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-indigo-900/60 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-300"
            >
              <Icon className={`h-4 w-4 shrink-0 ${item.color}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
