import { useEffect, useRef } from "react";
import { useAI } from "../../context/AIContext";
import AIMessage from "./AIMessage";
import AISuggestions from "./AISuggestions";
import AIThinkingIndicator from "./AIThinkingIndicator";
import AIError from "./AIError";

export default function AIMessageList() {
  const { messages, isThinking, error } = useAI();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking, error]);

  return (
    <div className="flex-1 overflow-y-auto py-3">
      {messages.length === 0 ? (
        <AISuggestions />
      ) : (
        <div className="space-y-1">
          {messages.map((msg) => (
            <AIMessage key={msg.id} message={msg} />
          ))}
        </div>
      )}

      {isThinking && <AIThinkingIndicator />}
      {error && <AIError error={error} />}

      <div ref={bottomRef} />
    </div>
  );
}
