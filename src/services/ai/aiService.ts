import type { ChatMessage, DashboardContextData } from "../../types/ai";

interface SendMessageOptions {
  messages: ChatMessage[];
  context: DashboardContextData;
}

export async function sendChatMessage({
  messages,
  context,
}: SendMessageOptions): Promise<Partial<ChatMessage>> {
  const formattedMessages = messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const activeUsersCount = context.users.filter(
    (u) => u.status === "Active",
  ).length;

  const response = await fetch("/api/chat", {
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
        activeUsers: activeUsersCount,
        lowStockCount: context.lowStockCount,
        outOfStockCount: context.outOfStockCount,
        products: context.products.map((p) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          price: p.price,
          stock: p.stock ?? 15,
          sku: p.sku,
          rating: p.rating ?? 4.8,
          reviewCount: p.reviewCount ?? 120,
          category: { name: p.category.name, imageURL: p.category.imageURL },
          colors: p.colors,
          createdAt: p.createdAt,
        })),
        users: context.users.map((u) => ({
          id: u.id,
          fullName: u.fullName,
          email: u.email,
          role: u.role,
          plan: u.plan,
          status: u.status,
          country: u.country,
          joinedAt: u.joinedAt,
          lastLogin: u.lastLogin,
        })),
      },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `Server error: ${response.statusText}`);
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}
