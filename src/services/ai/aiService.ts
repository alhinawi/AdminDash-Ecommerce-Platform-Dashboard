import type { ChatMessage, DashboardContextData } from "../../types/ai";

interface SendMessageOptions {
  messages: ChatMessage[];
  context: DashboardContextData;
}

export async function sendChatMessage({
  messages,
  context,
}: SendMessageOptions): Promise<Partial<ChatMessage>> {
  try {
    const formattedMessages = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const response = await fetch("/api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: formattedMessages,
        context: {
          totalProducts: context.totalProducts,
          catalogValue: context.catalogValue,
          categoriesCount: context.uniqueCategoriesCount,
          avgPrice: context.averagePrice,
          totalUsers: context.users.length,
          lowStockCount: context.lowStockCount,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Server returned error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn("AI endpoint unreachable, using client fallback:", error);
    // Fallback response
    return {
      role: "assistant",
      content:
        "I'm here to help manage your store. You can ask me about low stock items, top revenue products, or request price updates.",
      timestamp: new Date().toISOString(),
    };
  }
}
