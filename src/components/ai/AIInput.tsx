import type { KeyboardEvent, ChangeEvent } from "react";
import { useState, useRef } from "react";
import { SendHorizonal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAI } from "../../context/AIContext";

export default function AIInput() {
  const { t } = useTranslation();
  const { sendMessage, isThinking } = useAI();
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!input.trim() || isThinking) return;
    sendMessage(input);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-grow height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120,
      )}px`;
    }
  };

  return (
    <div className="border-t border-zinc-200/80 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-end gap-2 rounded-xl border border-zinc-200 bg-zinc-50/80 p-1.5 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800/80">
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={t(
            "ai.inputPlaceholder",
            "Ask about products, sales, inventory...",
          )}
          disabled={isThinking}
          className="max-h-28 flex-1 resize-none bg-transparent px-2 py-1 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden disabled:opacity-50 dark:text-white dark:placeholder:text-zinc-500"
        />

        <button
          type="button"
          onClick={handleSend}
          disabled={!input.trim() || isThinking}
          aria-label={t("ai.send", "Send message")}
          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs transition-all hover:bg-indigo-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <SendHorizonal className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-1.5 text-center text-[10px] text-zinc-400 dark:text-zinc-500">
        {t(
          "ai.disclaimer",
          "AI utilizes live store catalog & statistics context.",
        )}
      </div>
    </div>
  );
}
