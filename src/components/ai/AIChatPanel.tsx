import { useEffect } from "react";

import { useAI } from "../../context/AIContext";
import AIHeader from "./AIHeader";
import AIInput from "./AIInput";
import AIMessageList from "./AIMessageList";

export default function AIChatPanel() {
  const { isOpen, setIsOpen } = useAI();

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className="backdrop-blur-2xs animate-in fade-in fixed inset-0 bg-black/40 transition-opacity duration-300"
      />

      {/* Slide-over Panel */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-6 sm:pl-10">
        <div className="animate-in slide-in-from-right flex w-screen max-w-md flex-col overflow-hidden border-s border-zinc-200/80 bg-white shadow-2xl transition-transform duration-300 ease-in-out sm:max-w-lg dark:border-zinc-800 dark:bg-zinc-900">
          {/* Header */}
          <AIHeader onClose={() => setIsOpen(false)} />

          {/* Messages Area */}
          <AIMessageList />

          {/* Input Area */}
          <AIInput />
        </div>
      </div>
    </div>
  );
}
