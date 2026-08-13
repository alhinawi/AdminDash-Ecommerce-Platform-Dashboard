import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import type { Product } from "../interfaces";
import { generateDashboardContext } from "../services/ai/aiContext";
import { sendChatMessage } from "../services/ai/aiService";
import type { ChatMessage, PendingAction } from "../types/ai";
import type { User } from "../types/user";
import { getLocalizedText } from "../utils/productUtils";

interface AIContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  messages: ChatMessage[];
  isThinking: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  retryLastMessage: () => Promise<void>;
  confirmAction: (messageId: string) => void;
  cancelAction: (messageId: string) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

interface AIProviderProps {
  children: ReactNode;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  users: User[];
  addToast?: (
    type: "success" | "danger" | "info" | "warning",
    title: string,
    message?: string,
  ) => void;
}

export function AIProvider({
  children,
  products,
  setProducts,
  users,
  addToast,
}: AIProviderProps) {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const contextData = useMemo(
    () => generateDashboardContext(products, users),
    [products, users],
  );

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;

      const userMsg: ChatMessage = {
        id: `msg_${Date.now()}`,
        role: "user",
        content: content.trim(),
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsThinking(true);
      setError(null);

      try {
        const aiResponse = await sendChatMessage({
          messages: [...messages, userMsg],
          context: contextData,
        });

        const assistantMsg: ChatMessage = {
          id: `ai_${Date.now()}`,
          role: "assistant",
          content: aiResponse.content || "I've processed your store request.",
          timestamp: new Date().toISOString(),
          toolCalls: aiResponse.toolCalls,
          pendingAction: aiResponse.pendingAction,
          chartData: aiResponse.chartData,
        };

        setMessages((prev) => [...prev, assistantMsg]);
      } catch (err: unknown) {
        const errMsg =
          err instanceof Error
            ? err.message
            : "An unexpected error occurred while communicating with the AI Assistant.";
        setError(errMsg);
      } finally {
        setIsThinking(false);
      }
    },
    [messages, contextData],
  );

  const retryLastMessage = useCallback(async () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
    if (lastUserMsg) {
      setError(null);
      await sendMessage(lastUserMsg.content);
    }
  }, [messages, sendMessage]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const confirmAction = useCallback(
    (messageId: string) => {
      const targetMsg = messages.find((m) => m.id === messageId);
      if (!targetMsg || !targetMsg.pendingAction) return;

      const action: PendingAction = targetMsg.pendingAction;
      const lang = i18n.language || "en";

      if (action.toolName === "deleteProduct") {
        const searchTerm = (
          (action.arguments.searchTerm as string) ||
          action.targetItemName ||
          ""
        )
          .toLowerCase()
          .trim();

        const match = products.find((p) => {
          if (action.arguments.id && p.id === action.arguments.id) return true;
          const title = getLocalizedText(p.title, lang).toLowerCase();
          return title === searchTerm || title.includes(searchTerm);
        });

        if (match) {
          setProducts((prev) => prev.filter((p) => p.id !== match.id));
          addToast?.(
            "success",
            t("products.productDeleted", "Product Deleted! 🗑️"),
            t("products.productDeletedMsg", {
              title: getLocalizedText(match.title, lang),
              defaultValue: `Removed "${getLocalizedText(match.title, lang)}" from catalog.`,
            }),
          );
        }
      } else if (action.toolName === "updateProductPrice") {
        const newPrice = String(action.arguments.newPrice || "0").replace(
          /[^0-9.]/g,
          "",
        );
        const searchTerm = (
          (action.arguments.searchTerm as string) ||
          action.targetItemName ||
          ""
        )
          .toLowerCase()
          .trim();

        const match = products.find((p) => {
          if (action.arguments.id && p.id === action.arguments.id) return true;
          if (searchTerm) {
            const title = getLocalizedText(p.title, lang).toLowerCase();
            return title === searchTerm || title.includes(searchTerm);
          }
          return false;
        });

        if (match) {
          setProducts((prev) =>
            prev.map((p) =>
              p.id === match.id ? { ...p, price: newPrice } : p,
            ),
          );
          addToast?.(
            "success",
            t("products.productUpdated", "Product Price Updated! ✨"),
            `Updated price of "${getLocalizedText(match.title, lang)}" to $${newPrice}.`,
          );
        }
      } else if (action.toolName === "updateInventory") {
        const newStock = Number(action.arguments.newStock) || 0;
        const searchTerm = (
          (action.arguments.searchTerm as string) ||
          action.targetItemName ||
          ""
        )
          .toLowerCase()
          .trim();

        const match = products.find((p) => {
          if (action.arguments.id && p.id === action.arguments.id) return true;
          if (searchTerm) {
            const title = getLocalizedText(p.title, lang).toLowerCase();
            return title === searchTerm || title.includes(searchTerm);
          }
          return false;
        });

        if (match) {
          setProducts((prev) =>
            prev.map((p) =>
              p.id === match.id ? { ...p, stock: newStock } : p,
            ),
          );
          addToast?.(
            "success",
            t("products.inventoryUpdated", "Inventory Updated! 📦"),
            `Updated stock of "${getLocalizedText(match.title, lang)}" to ${newStock} units.`,
          );
        }
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId
            ? { ...m, actionConfirmed: true, pendingAction: undefined }
            : m,
        ),
      );
    },
    [messages, products, setProducts, addToast, t, i18n.language],
  );

  const cancelAction = useCallback((messageId: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId
          ? { ...m, actionCancelled: true, pendingAction: undefined }
          : m,
      ),
    );
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      messages,
      isThinking,
      error,
      sendMessage,
      clearMessages,
      retryLastMessage,
      confirmAction,
      cancelAction,
    }),
    [
      isOpen,
      messages,
      isThinking,
      error,
      sendMessage,
      clearMessages,
      retryLastMessage,
      confirmAction,
      cancelAction,
    ],
  );

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAI() {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error("useAI must be used within an AIProvider");
  }
  return context;
}
