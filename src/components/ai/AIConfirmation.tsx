import { AlertTriangle, Check, ShieldAlert, X } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useAI } from "../../context/AIContext";
import type { PendingAction } from "../../types/ai";

interface AIConfirmationProps {
  messageId: string;
  action: PendingAction;
  isConfirmed?: boolean;
  isCancelled?: boolean;
}

export default function AIConfirmation({
  messageId,
  action,
  isConfirmed,
  isCancelled,
}: AIConfirmationProps) {
  const { t } = useTranslation();
  const { confirmAction, cancelAction } = useAI();

  if (isConfirmed) {
    return (
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/80 p-3 text-xs font-semibold text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
        <Check className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
        <span>
          {t(
            "ai.actionCompleted",
            "Action verified and executed successfully.",
          )}
        </span>
      </div>
    );
  }

  if (isCancelled) {
    return (
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-400">
        <X className="h-4 w-4 shrink-0 text-zinc-400" />
        <span>{t("ai.actionCancelled", "Action was cancelled by user.")}</span>
      </div>
    );
  }

  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-amber-200 bg-amber-50/60 p-3.5 text-xs shadow-xs dark:border-amber-900/50 dark:bg-amber-950/30">
      <div className="flex items-start gap-2.5">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300">
          {action.isDestructive ? (
            <ShieldAlert className="h-4 w-4 text-rose-600 dark:text-rose-400" />
          ) : (
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          )}
        </div>

        <div className="flex-1">
          <h4 className="font-bold text-zinc-900 dark:text-white">
            {action.description}
          </h4>
          <p className="mt-0.5 text-zinc-600 dark:text-zinc-300">
            {action.impactSummary}
          </p>

          {/* Confirmation Action Buttons */}
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => confirmAction(messageId)}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 font-bold text-white shadow-xs transition-all hover:bg-indigo-700 active:scale-95"
            >
              <Check className="h-3.5 w-3.5" />
              <span>{t("common.confirm", "Confirm")}</span>
            </button>

            <button
              type="button"
              onClick={() => cancelAction(messageId)}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 font-semibold text-zinc-700 shadow-2xs transition-all hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            >
              <X className="h-3.5 w-3.5" />
              <span>{t("common.cancel", "Cancel")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
