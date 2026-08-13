import { AlertCircle, RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useAI } from "../../context/AIContext";

interface AIErrorProps {
  error: string;
}

export default function AIError({ error }: AIErrorProps) {
  const { t } = useTranslation();
  const { retryLastMessage } = useAI();

  return (
    <div className="mx-4 my-2 flex items-center justify-between rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800 shadow-2xs dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
        <span className="line-clamp-2">{error}</span>
      </div>

      <button
        type="button"
        onClick={() => retryLastMessage()}
        className="ms-2 flex shrink-0 cursor-pointer items-center gap-1 font-bold text-rose-700 underline hover:text-rose-900 dark:text-rose-300 dark:hover:text-white"
      >
        <RefreshCw className="h-3 w-3" />
        <span>{t("common.retry", "Retry")}</span>
      </button>
    </div>
  );
}
