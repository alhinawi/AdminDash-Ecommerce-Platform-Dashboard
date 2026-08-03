import { useEffect } from "react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  title: string;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

const Toast = ({ toasts, onDismiss }: ToastProps) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-y-2.5 max-w-sm w-full px-4 sm:px-0 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem = ({
  toast,
  onDismiss,
}: {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const bgStyles =
    toast.type === "success"
      ? "bg-slate-900 dark:bg-slate-800 text-white border border-emerald-500/30"
      : toast.type === "error"
      ? "bg-rose-950 text-white border border-rose-500/40"
      : "bg-indigo-950 text-white border border-indigo-500/40";

  const icon =
    toast.type === "success" ? "🎉" : toast.type === "error" ? "⚠️" : "ℹ️";

  return (
    <div
      className={`pointer-events-auto flex items-start gap-x-3 rounded-2xl p-4 shadow-xl backdrop-blur-md animate-in slide-in-from-bottom-4 fade-in duration-300 ${bgStyles}`}
    >
      <span className="text-base leading-none">{icon}</span>
      <div className="flex-1 min-w-0">
        <h5 className="text-xs font-bold leading-tight">{toast.title}</h5>
        <p className="text-[11px] opacity-90 mt-0.5 leading-relaxed">
          {toast.message}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
        aria-label="Close Toast"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
