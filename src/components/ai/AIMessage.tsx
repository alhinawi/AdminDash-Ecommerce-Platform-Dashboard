import { Sparkles, User as UserIcon, Wrench } from "lucide-react";
import type { ChatMessage } from "../../types/ai";
import AIConfirmation from "./AIConfirmation";
import AIChartRenderer from "./AIChartRenderer";

interface AIMessageProps {
  message: ChatMessage;
}

export default function AIMessage({ message }: AIMessageProps) {
  const isUser = message.role === "user";

  const renderFormattedContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      if (line.startsWith("### ")) {
        return (
          <h4
            key={idx}
            className="mt-2 mb-1 font-bold text-zinc-900 dark:text-white"
          >
            {line.replace("### ", "")}
          </h4>
        );
      }
      if (line.startsWith("- ")) {
        return (
          <div key={idx} className="my-0.5 ms-2 flex items-start gap-1.5">
            <span className="font-bold text-indigo-500">•</span>
            <span>{renderInlineFormatting(line.replace("- ", ""))}</span>
          </div>
        );
      }
      if (/^\d+\.\s/.test(line)) {
        return (
          <div key={idx} className="my-0.5 ms-2">
            {renderInlineFormatting(line)}
          </div>
        );
      }
      return (
        <p key={idx} className={line.trim() === "" ? "h-2" : "my-0.5"}>
          {renderInlineFormatting(line)}
        </p>
      );
    });
  };

  const renderInlineFormatting = (text: string) => {
    // Basic bold parsing **text**
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-bold text-zinc-900 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div
      className={`flex items-start gap-3 px-4 py-2 ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar Icon */}
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg shadow-2xs ${
          isUser
            ? "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900"
            : "bg-linear-to-tr from-indigo-600 to-purple-600 text-white"
        }`}
      >
        {isUser ? (
          <UserIcon className="h-3.5 w-3.5" />
        ) : (
          <Sparkles className="h-3.5 w-3.5" />
        )}
      </div>

      {/* Bubble Container */}
      <div
        className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-2xs ${
          isUser
            ? "rounded-tr-sm bg-indigo-600 text-white shadow-indigo-500/15"
            : "rounded-tl-sm border border-zinc-200/80 bg-white text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
        }`}
      >
        {/* Tool Call Tag */}
        {!isUser && message.toolCalls && message.toolCalls.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1.5 border-b border-zinc-100 pb-2 dark:border-zinc-800">
            {message.toolCalls.map((tc) => (
              <span
                key={tc.id}
                className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400"
              >
                <Wrench className="h-2.5 w-2.5" />
                {tc.name}
              </span>
            ))}
          </div>
        )}

        {/* Text Content */}
        <div>{renderFormattedContent(message.content)}</div>

        {/* Embedded Chart if present */}
        {!isUser && message.chartData && (
          <AIChartRenderer chartData={message.chartData} />
        )}

        {/* Dangerous Action Confirmation Card if present */}
        {!isUser && message.pendingAction && (
          <AIConfirmation
            messageId={message.id}
            action={message.pendingAction}
            isConfirmed={message.actionConfirmed}
            isCancelled={message.actionCancelled}
          />
        )}
      </div>
    </div>
  );
}
