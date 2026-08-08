import { useEffect, useState } from "react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  title: string;
  message: string;
  count?: number;
  resetCounter?: number;
}

interface ActiveToast extends ToastMessage {
  isExiting: boolean;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

const Toast = ({ toasts, onDismiss }: ToastProps) => {
  const [activeToasts, setActiveToasts] = useState<ActiveToast[]>([]);

  useEffect(() => {
    setActiveToasts((prev) => {
      // Start with current local active toasts
      let updated = [...prev];

      // 1. Add new toasts or update existing ones from props
      toasts.forEach((propToast) => {
        const existingIdx = updated.findIndex((t) => t.id === propToast.id);
        if (existingIdx === -1) {
          // New toast: insert at the beginning (top of stack)
          updated.unshift({
            id: propToast.id,
            type: propToast.type,
            title: propToast.title,
            message: propToast.message,
            count: propToast.count ?? 1,
            resetCounter: propToast.resetCounter ?? 0,
            isExiting: false,
          });
        } else {
          // Update existing details in place and move to front if resetCounter changed
          const existing = updated[existingIdx];
          const hasNewTrigger = (propToast.resetCounter ?? 0) > (existing.resetCounter ?? 0);
          
          updated.splice(existingIdx, 1);
          updated.unshift({
            ...existing,
            count: propToast.count ?? 1,
            resetCounter: propToast.resetCounter ?? 0,
            title: propToast.title,
            message: propToast.message,
            type: propToast.type,
            // If it was already exiting, keep it exiting unless it was re-triggered
            isExiting: hasNewTrigger ? false : existing.isExiting,
          });
        }
      });

      // 2. Mark any toasts no longer in props as exiting
      updated = updated.map((t) => {
        const inProps = toasts.some((pt) => pt.id === t.id);
        if (!inProps && !t.isExiting) {
          return { ...t, isExiting: true };
        }
        return t;
      });

      // 3. Limit visible active toasts to 3
      let activeCount = 0;
      updated = updated.map((t) => {
        if (!t.isExiting) {
          activeCount++;
          if (activeCount > 3) {
            return { ...t, isExiting: true };
          }
        }
        return t;
      });

      return updated;
    });
  }, [toasts]);

  const handleStartExit = (id: string) => {
    setActiveToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isExiting: true } : t))
    );
  };

  const handleAnimationComplete = (id: string) => {
    setActiveToasts((prev) => prev.filter((t) => t.id !== id));
    onDismiss(id);
  };

  if (activeToasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-y-2.5 max-w-sm w-full px-4 sm:px-0 pointer-events-none">
      {activeToasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onStartExit={handleStartExit}
          onAnimationComplete={handleAnimationComplete}
        />
      ))}
    </div>
  );
};

const ToastItem = ({
  toast,
  onStartExit,
  onAnimationComplete,
}: {
  toast: ActiveToast;
  onStartExit: (id: string) => void;
  onAnimationComplete: (id: string) => void;
}) => {
  // Sync with exit animation
  useEffect(() => {
    if (toast.isExiting) {
      const timer = setTimeout(() => {
        onAnimationComplete(toast.id);
      }, 250); // Matches the toast-exit keyframe duration (0.25s)
      return () => clearTimeout(timer);
    }
  }, [toast.isExiting, toast.id, onAnimationComplete]);

  // Auto-dismiss timer (resets when resetCounter changes)
  useEffect(() => {
    if (toast.isExiting) return;

    const timer = setTimeout(() => {
      onStartExit(toast.id);
    }, 4000); // 4 seconds auto-dismiss

    return () => clearTimeout(timer);
  }, [toast.id, toast.resetCounter, toast.isExiting, onStartExit]);

  const bgStyles =
    toast.type === "success"
      ? "bg-slate-900 dark:bg-slate-800 text-white border border-emerald-500/30"
      : toast.type === "error"
      ? "bg-rose-950 text-white border border-rose-500/40"
      : "bg-indigo-950 text-white border border-indigo-500/40";

  const icon =
    toast.type === "success" ? "🎉" : toast.type === "error" ? "⚠️" : "ℹ️";

  const animationClass = toast.isExiting ? "toast-exit" : "toast-enter";

  return (
    <div
      className={`pointer-events-auto flex items-start gap-x-3 rounded-2xl p-4 shadow-xl backdrop-blur-md ${animationClass} ${bgStyles}`}
    >
      <span className="text-base leading-none">{icon}</span>
      <div className="flex-1 min-w-0">
        <h5 className="text-xs font-bold leading-tight flex items-center gap-1.5">
          {toast.title}
          {toast.count && toast.count > 1 && (
            <span className="inline-flex items-center justify-center bg-white/20 dark:bg-white/10 px-1.5 py-0.5 rounded-full text-[9px] font-bold">
              x{toast.count}
            </span>
          )}
        </h5>
        <p className="text-[11px] opacity-90 mt-0.5 leading-relaxed">
          {toast.message}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onStartExit(toast.id)}
        className="text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
        aria-label="Close Toast"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
