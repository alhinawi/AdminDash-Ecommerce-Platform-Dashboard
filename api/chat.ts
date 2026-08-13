import type { IncomingMessage, ServerResponse } from "http";

import {
  type Content,
  type FunctionDeclaration,
  GoogleGenAI,
  type Part,
  Type,
} from "@google/genai";

interface ChatMessageInput {
  role: "user" | "assistant" | "system" | "tool" | "model";
  content: string;
}

export interface RequestProduct {
  id?: string;
  title: string | Record<string, string>;
  description?: string | Record<string, string>;
  price: string;
  stock?: number;
  sku?: string;
  rating?: number;
  reviewCount?: number;
  createdAt?: string;
  category: { name: string; imageURL?: string };
  colors?: string[];
  imageURL?: string;
}

export interface RequestUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  plan: string;
  status: string;
  country: string;
  joinedAt?: string;
  lastLogin?: string;
}

export interface RequestBody {
  messages: ChatMessageInput[];
  context?: {
    totalProducts?: number;
    catalogValue?: number;
    categoriesCount?: number;
    avgPrice?: number;
    totalUsers?: number;
    activeUsers?: number;
    lowStockCount?: number;
    outOfStockCount?: number;
    currentLang?: string;
    products?: RequestProduct[];
    users?: RequestUser[];
  };
}

export type ServerlessRequest = IncomingMessage & {
  body?: RequestBody | unknown;
};

export type ServerlessResponse = ServerResponse & {
  status?: (code: number) => ServerlessResponse;
  json?: (data: unknown) => void;
};

// Comprehensive Function Declarations for Gemini Tool Calling
const toolDeclarations: FunctionDeclaration[] = [
  {
    name: "getDashboardStats",
    description:
      "Get high-level ecommerce statistics: total products count, catalog valuation, active categories, average product price, total customers, active users, and low/out-of-stock counts.",
    parameters: {
      type: Type.OBJECT,
      properties: {},
    },
  },
  {
    name: "getProducts",
    description:
      "Query products list with optional category, price limits, stock status, sorting, and count limit.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        category: {
          type: Type.STRING,
          description:
            "Filter by category name (e.g., Electronics, Clothes, Photography, Furniture, Sneakers, Automotive, Accessories)",
        },
        minPrice: { type: Type.NUMBER, description: "Minimum price in USD" },
        maxPrice: { type: Type.NUMBER, description: "Maximum price in USD" },
        stockStatus: {
          type: Type.STRING,
          description:
            "Filter by stock status: 'all', 'low_stock', 'out_of_stock', 'in_stock'",
        },
        sortBy: {
          type: Type.STRING,
          description:
            "Sort products by: 'rating', 'price_asc', 'price_desc', 'stock', 'reviews'",
        },
        limit: {
          type: Type.NUMBER,
          description: "Max number of items to return (default 5)",
        },
      },
    },
  },
  {
    name: "getProduct",
    description:
      "Get detailed information for a specific product by ID or title / name search.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.STRING, description: "Product ID" },
        searchTerm: {
          type: Type.STRING,
          description: "Product name or keyword to look up",
        },
      },
    },
  },
  {
    name: "searchProducts",
    description:
      "Search products across titles, descriptions, categories, and SKUs by keyword.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        query: {
          type: Type.STRING,
          description: "Search keyword or query string",
        },
        limit: {
          type: Type.NUMBER,
          description: "Maximum results to return (default 5)",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "getLowStockProducts",
    description:
      "Retrieve all products that are low in stock (below threshold) or out of stock.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        threshold: {
          type: Type.NUMBER,
          description: "Stock threshold quantity (default 10)",
        },
      },
    },
  },
  {
    name: "getOutOfStockProducts",
    description: "Retrieve all products that currently have 0 units in stock.",
    parameters: {
      type: Type.OBJECT,
      properties: {},
    },
  },
  {
    name: "getInventorySummary",
    description:
      "Get comprehensive inventory overview: total inventory units, total valuation worth, in-stock count, low-stock count, out-of-stock count, and per-category unit breakdown.",
    parameters: {
      type: Type.OBJECT,
      properties: {},
    },
  },
  {
    name: "getTopSellingProducts",
    description:
      "Retrieve top-performing and best-selling products ranked by customer reviews and ratings.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        limit: {
          type: Type.NUMBER,
          description: "Number of top products to return (default 5)",
        },
        category: {
          type: Type.STRING,
          description: "Optional category filter",
        },
      },
    },
  },
  {
    name: "getCategoryPerformance",
    description:
      "Get category-by-category breakdown with product counts, total valuations, and average price per category.",
    parameters: {
      type: Type.OBJECT,
      properties: {},
    },
  },
  {
    name: "getSalesStatistics",
    description:
      "Retrieve recent sales performance, quarterly growth trends, and average order value.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        period: {
          type: Type.STRING,
          description:
            "Time period: 'today', 'this_month', 'last_month', 'quarter', 'ytd'",
        },
      },
    },
  },
  {
    name: "getRevenueStatistics",
    description:
      "Retrieve financial revenue metrics, projected monthly revenue, and historical growth trends.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        timeRange: {
          type: Type.STRING,
          description: "Time range: '1M', '6M', '1Y', 'ALL'",
        },
      },
    },
  },
  {
    name: "getCustomerStatistics",
    description:
      "Get customer metrics, active user rates, subscription plan distribution (Enterprise, Pro, Free), and country demographics.",
    parameters: {
      type: Type.OBJECT,
      properties: {},
    },
  },
  {
    name: "getOrders",
    description: "Get recent store orders and fulfillment statuses.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        status: {
          type: Type.STRING,
          description:
            "Filter by order status: 'all', 'completed', 'pending', 'processing'",
        },
        limit: {
          type: Type.NUMBER,
          description: "Max orders to return (default 5)",
        },
      },
    },
  },
  {
    name: "updateProductPrice",
    description:
      "Stage a product price update. Always call this when user requests to update, change, increase, or decrease a product price. Always requires explicit user confirmation before applying changes to the catalog.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.STRING, description: "Product ID if known" },
        searchTerm: {
          type: Type.STRING,
          description: "Product name or keyword to identify the product",
        },
        newPrice: {
          type: Type.STRING,
          description:
            "New selling price in USD without currency symbol (e.g. '199' or '880')",
        },
      },
      required: ["newPrice"],
    },
  },
  {
    name: "updateInventory",
    description:
      "Stage a stock/inventory quantity update for a product. Always call this when user asks to update or restock a product. Always requires explicit user confirmation before applying.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.STRING, description: "Product ID if known" },
        searchTerm: {
          type: Type.STRING,
          description: "Product name or keyword to identify the product",
        },
        newStock: {
          type: Type.NUMBER,
          description: "New stock quantity amount",
        },
      },
      required: ["newStock"],
    },
  },
  {
    name: "deleteProduct",
    description:
      "Stage a product deletion action. Always call this when user asks to delete or remove a product. Always requires explicit user confirmation before deleting from catalog.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.STRING, description: "Product ID if known" },
        searchTerm: {
          type: Type.STRING,
          description: "Product name or keyword to delete",
        },
      },
    },
  },
];

export default async function handler(
  req: ServerlessRequest,
  res: ServerlessResponse,
) {
  // Support CORS and preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method Not Allowed" }));
    return;
  }

  // Parse body if not already parsed
  let bodyData: RequestBody;
  if (typeof req.body === "object" && req.body !== null) {
    bodyData = req.body as RequestBody;
  } else {
    const rawBody = await getRawBody(req);
    try {
      bodyData = JSON.parse(rawBody || "{}");
    } catch {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({ error: "Invalid JSON payload in request body" }),
      );
      return;
    }
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        error:
          "GEMINI_API_KEY is not configured in the server environment variables.",
      }),
    );
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const userMessages = bodyData.messages || [];
    const context = bodyData.context;

    // Filter and format messages for Gemini
    const contents: Content[] = userMessages
      .filter((m) => m.content && m.content.trim() !== "")
      .map((m) => ({
        role: m.role === "assistant" || m.role === "model" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

    if (contents.length === 0) {
      contents.push({
        role: "user",
        parts: [{ text: "Hello! What can you help me with in my store?" }],
      });
    }

    const systemInstruction = `You are the Ecommerce Admin Assistant for the Admin Panel.
You assist store administrators with understanding, analyzing, and managing their ecommerce store.

LIVE STORE CONTEXT:
- Total Products: ${context?.totalProducts ?? 64}
- Total Catalog Value: $${(context?.catalogValue ?? 45280).toLocaleString()}
- Active Categories Count: ${context?.categoriesCount ?? 7}
- Average Item Price: $${context?.avgPrice ?? 320}
- Low Stock Items Count (threshold <= 10): ${context?.lowStockCount ?? 5}
- Out of Stock Items Count: ${context?.outOfStockCount ?? 1}
- Total Registered Customers: ${context?.totalUsers ?? 100}
- Active Users: ${context?.activeUsers ?? 82}

CORE OPERATIONAL PRINCIPLES:
1. ALWAYS USE APPROPRIATE TOOLS: Whenever answering questions about store inventory, product prices, stock levels, sales, revenue, top products, categories, customers, or orders, invoke the corresponding tool.
2. STRICT TRUTHFULNESS & NO FABRICATION: Never invent products, prices, orders, inventory quantities, revenue figures, or customer statistics. Always base answers strictly on the retrieved tool data.
3. READ vs WRITE OPERATIONS:
   - Read operations (fetching products, inventory, stats, customers, orders, categories, sales) execute automatically.
   - Write operations (changing prices, updating stock quantities, deleting products) MUST require explicit user confirmation.
4. CONFIRMATION PROTOCOL: When the administrator requests an action that alters data (e.g. "Increase iPhone 15 price by 10%" or "Set price of Sony Headphones to $420" or "Delete product X"):
   - If you need to inspect the current price first, you may call getProduct, calculate the new price, and then call updateProductPrice.
   - Calling updateProductPrice, updateInventory, or deleteProduct stages a confirmation card in the user's interface.
   - Clearly state the current value, the proposed new value, and what will happen when the admin clicks Confirm.
5. CONCISE & PROFESSIONAL FORMATTING:
   - Format lists with clean markdown bullets (•) or numbered lists.
   - Bold key numbers, product names, and dollar amounts.
   - Keep answers clear, insightful, and professional.
6. CONVERSATION CONTEXT: Maintain multi-turn conversational context to answer follow-up queries (e.g. "How much stock do they have?" referring to previously discussed items).`;

    const modelName = "gemini-3.6-flash";
    const currentContents: Content[] = [...contents];
    const toolCallsOutput = [];
    let pendingAction = undefined;
    let chartData = undefined;
    let finalResponseText = "";

    // Multi-turn tool calling loop (supports lookup -> mutate -> summarize)
    const MAX_TOOL_TURNS = 4;
    for (let turn = 0; turn < MAX_TOOL_TURNS; turn++) {
      let turnResponse;
      try {
        turnResponse = await ai.models.generateContent({
          model: modelName,
          contents: currentContents,
          config: {
            systemInstruction: { parts: [{ text: systemInstruction }] },
            tools: [{ functionDeclarations: toolDeclarations }],
            temperature: 0.2,
          },
        });
      } catch (primaryError) {
        console.warn(
          "Primary model call failed, falling back to gemini-3.5-flash:",
          primaryError,
        );
        turnResponse = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: currentContents,
          config: {
            systemInstruction: { parts: [{ text: systemInstruction }] },
            tools: [{ functionDeclarations: toolDeclarations }],
            temperature: 0.2,
          },
        });
      }

      const functionCalls = turnResponse.functionCalls;

      // If no function calls, we reached the final response text
      if (!functionCalls || functionCalls.length === 0) {
        finalResponseText =
          turnResponse.candidates?.[0]?.content?.parts?.[0]?.text ||
          turnResponse.text ||
          "";
        break;
      }

      // Add model's function call message to history
      if (turnResponse.candidates?.[0]?.content) {
        currentContents.push(turnResponse.candidates[0].content);
      }

      const toolResponseParts: Part[] = [];

      for (const call of functionCalls) {
        const callName = call.name || "getDashboardStats";
        const callArgs = (call.args || {}) as Record<string, unknown>;

        toolCallsOutput.push({
          id: call.id || `call_${Date.now()}_${callName}`,
          name: callName,
          arguments: callArgs,
        });

        // Stage mutation confirmation objects
        if (callName === "deleteProduct") {
          const searchTerm = String(
            callArgs.searchTerm || callArgs.id || "Selected Product",
          );
          const found = findProduct(searchTerm, context?.products);
          const resolvedTitle = found ? getProductTitle(found) : searchTerm;
          pendingAction = {
            id: `act_${Date.now()}`,
            toolName: "deleteProduct",
            arguments: {
              searchTerm: resolvedTitle,
              id: found?.id || callArgs.id,
            },
            description: `Delete "${resolvedTitle}" from catalog`,
            impactSummary:
              "This will permanently remove the product and all associated inventory records from your catalog.",
            targetItemName: resolvedTitle,
            isDestructive: true,
          };
        } else if (callName === "updateProductPrice") {
          const newPrice = String(callArgs.newPrice || "0").replace(
            /[^0-9.]/g,
            "",
          );
          const searchTerm = String(callArgs.searchTerm || callArgs.id || "");
          const found = findProduct(searchTerm, context?.products);
          const resolvedTitle = found
            ? getProductTitle(found)
            : searchTerm || "Selected Product";
          const oldPrice = found ? `$${found.price}` : undefined;

          pendingAction = {
            id: `act_${Date.now()}`,
            toolName: "updateProductPrice",
            arguments: {
              searchTerm: resolvedTitle,
              newPrice,
              id: found?.id || callArgs.id,
            },
            description: `Update price of "${resolvedTitle}" to $${newPrice}`,
            impactSummary: `The selling price will be updated${oldPrice ? ` from ${oldPrice}` : ""} to $${newPrice}.`,
            targetItemName: resolvedTitle,
            oldValue: oldPrice,
            newValue: `$${newPrice}`,
            isDestructive: false,
          };
        } else if (callName === "updateInventory") {
          const newStock = Number(callArgs.newStock) || 0;
          const searchTerm = String(callArgs.searchTerm || callArgs.id || "");
          const found = findProduct(searchTerm, context?.products);
          const resolvedTitle = found
            ? getProductTitle(found)
            : searchTerm || "Selected Product";
          const oldStock = found ? (found.stock ?? 15) : undefined;

          pendingAction = {
            id: `act_${Date.now()}`,
            toolName: "updateInventory",
            arguments: {
              searchTerm: resolvedTitle,
              newStock,
              id: found?.id || callArgs.id,
            },
            description: `Update stock of "${resolvedTitle}" to ${newStock} units`,
            impactSummary: `Inventory level will change${oldStock !== undefined ? ` from ${oldStock}` : ""} to ${newStock} units.`,
            targetItemName: resolvedTitle,
            oldValue: oldStock,
            newValue: `${newStock} units`,
            isDestructive: false,
          };
        } else if (callName === "getCategoryPerformance") {
          chartData = buildCategoryChartData(context?.products);
        }

        // Execute tool data payload against live store context
        const toolExecutionResult = executeBackendTool(
          callName,
          callArgs,
          context,
        );

        toolResponseParts.push({
          functionResponse: {
            name: callName,
            response: { result: toolExecutionResult },
          },
        });
      }

      // Add user's tool results message to contents for next turn
      currentContents.push({
        role: "user",
        parts: toolResponseParts,
      });
    }

    if (!finalResponseText) {
      finalResponseText = "Analysis complete.";
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        role: "assistant",
        content: finalResponseText,
        toolCalls: toolCallsOutput,
        pendingAction,
        chartData,
        timestamp: new Date().toISOString(),
      }),
    );
  } catch (error: unknown) {
    console.error("Gemini API error:", error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    const errMsg =
      error instanceof Error
        ? error.message
        : "Failed to process request with Gemini AI model.";
    res.end(
      JSON.stringify({
        error: errMsg,
      }),
    );
  }
}

// ---------------- Helper Functions ----------------

function getProductTitle(p: RequestProduct): string {
  if (typeof p.title === "string") return p.title;
  if (p.title && typeof p.title === "object") {
    return p.title.en || Object.values(p.title)[0] || "Product";
  }
  return "Product";
}

function getProductDesc(p: RequestProduct): string {
  if (typeof p.description === "string") return p.description;
  if (p.description && typeof p.description === "object") {
    return p.description.en || Object.values(p.description)[0] || "";
  }
  return "";
}

function findProduct(
  term: string,
  products?: RequestProduct[],
): RequestProduct | undefined {
  if (!products || products.length === 0 || !term) return undefined;
  const cleanTerm = term.toLowerCase().trim();
  return (
    products.find((p) => p.id === term) ||
    products.find((p) => getProductTitle(p).toLowerCase() === cleanTerm) ||
    products.find((p) =>
      getProductTitle(p).toLowerCase().includes(cleanTerm),
    ) ||
    products.find((p) => p.sku?.toLowerCase() === cleanTerm)
  );
}

function buildCategoryChartData(products?: RequestProduct[]) {
  if (!products || products.length === 0) {
    return {
      type: "bar" as const,
      title: "Category Valuation Breakdown ($)",
      data: [
        { category: "Electronics", valuation: 14850, products: 10 },
        { category: "Photography", valuation: 11200, products: 8 },
        { category: "Clothes", valuation: 6400, products: 12 },
        { category: "Furniture", valuation: 5200, products: 6 },
        { category: "Automotive", valuation: 4100, products: 8 },
        { category: "Sneakers", valuation: 2200, products: 10 },
        { category: "Accessories", valuation: 1330, products: 10 },
      ],
      dataKeys: ["valuation"],
      colors: ["#4f46e5"],
    };
  }

  const map: Record<string, { count: number; val: number }> = {};
  for (const p of products) {
    const cat = p.category?.name || "Uncategorized";
    if (!map[cat]) map[cat] = { count: 0, val: 0 };
    map[cat].count += 1;
    map[cat].val += (Number(p.price) || 0) * (p.stock ?? 1);
  }

  const data = Object.entries(map).map(([category, info]) => ({
    category,
    valuation: info.val,
    products: info.count,
  }));

  return {
    type: "bar" as const,
    title: "Live Category Valuation Breakdown ($)",
    data,
    dataKeys: ["valuation"],
    colors: ["#4f46e5"],
  };
}

function executeBackendTool(
  name: string,
  args: Record<string, unknown>,
  context?: RequestBody["context"],
) {
  const prods = context?.products || [];
  const users = context?.users || [];

  switch (name) {
    case "getDashboardStats": {
      const totalProducts = prods.length || (context?.totalProducts ?? 64);
      const catalogValuation = prods.length
        ? prods.reduce((sum, p) => sum + (Number(p.price) || 0), 0)
        : (context?.catalogValue ?? 45280);
      const uniqueCats = prods.length
        ? new Set(prods.map((p) => p.category?.name).filter(Boolean)).size
        : (context?.categoriesCount ?? 7);
      const avgPrice =
        totalProducts > 0 ? Math.round(catalogValuation / totalProducts) : 320;
      const lowStockCount = prods.length
        ? prods.filter((p) => (p.stock ?? 15) > 0 && (p.stock ?? 15) <= 10)
            .length
        : (context?.lowStockCount ?? 5);
      const outOfStockCount = prods.length
        ? prods.filter((p) => (p.stock ?? 15) === 0).length
        : (context?.outOfStockCount ?? 1);

      return {
        totalProducts,
        catalogValuation: `$${catalogValuation.toLocaleString("en-US")}`,
        activeCategoriesCount: uniqueCats,
        averageProductPrice: `$${avgPrice}`,
        totalCustomers: users.length || (context?.totalUsers ?? 100),
        activeCustomers:
          users.filter((u) => u.status === "Active").length ||
          (context?.activeUsers ?? 82),
        lowStockItemsCount: lowStockCount,
        outOfStockItemsCount: outOfStockCount,
      };
    }

    case "getProducts": {
      let list = [...prods];

      if (args.category && typeof args.category === "string") {
        const cat = args.category.toLowerCase().trim();
        list = list.filter((p) => p.category?.name.toLowerCase() === cat);
      }

      if (typeof args.minPrice === "number") {
        list = list.filter((p) => Number(p.price) >= (args.minPrice as number));
      }

      if (typeof args.maxPrice === "number") {
        list = list.filter((p) => Number(p.price) <= (args.maxPrice as number));
      }

      if (args.stockStatus === "low_stock") {
        list = list.filter((p) => (p.stock ?? 15) > 0 && (p.stock ?? 15) <= 10);
      } else if (args.stockStatus === "out_of_stock") {
        list = list.filter((p) => (p.stock ?? 15) === 0);
      } else if (args.stockStatus === "in_stock") {
        list = list.filter((p) => (p.stock ?? 15) > 10);
      }

      if (args.sortBy === "rating") {
        list.sort((a, b) => (b.rating ?? 4.5) - (a.rating ?? 4.5));
      } else if (args.sortBy === "price_desc") {
        list.sort((a, b) => Number(b.price) - Number(a.price));
      } else if (args.sortBy === "price_asc") {
        list.sort((a, b) => Number(a.price) - Number(b.price));
      } else if (args.sortBy === "stock") {
        list.sort((a, b) => (a.stock ?? 15) - (b.stock ?? 15));
      } else if (args.sortBy === "reviews") {
        list.sort((a, b) => (b.reviewCount ?? 100) - (a.reviewCount ?? 100));
      }

      const limit = typeof args.limit === "number" ? args.limit : 5;
      return {
        matchedCount: list.length,
        items: list.slice(0, limit).map((p) => ({
          id: p.id,
          title: getProductTitle(p),
          price: `$${p.price}`,
          category: p.category?.name || "General",
          stock: p.stock ?? 15,
          rating: p.rating ?? 4.8,
          reviewCount: p.reviewCount ?? 120,
          sku: p.sku ?? "SKU-PROD",
        })),
      };
    }

    case "getProduct": {
      const term = String(args.searchTerm || args.id || "");
      const found = findProduct(term, prods);

      if (!found) {
        return { error: `Product not found matching "${term}".` };
      }

      return {
        id: found.id,
        title: getProductTitle(found),
        description: getProductDesc(found),
        price: `$${found.price}`,
        category: found.category?.name,
        stock: found.stock ?? 15,
        rating: found.rating ?? 4.8,
        reviewCount: found.reviewCount ?? 150,
        sku: found.sku ?? "SKU-PROD",
        colorsCount: found.colors?.length ?? 2,
        createdAt: found.createdAt,
      };
    }

    case "searchProducts": {
      const query = String(args.query || "")
        .toLowerCase()
        .trim();
      const limit = typeof args.limit === "number" ? args.limit : 5;

      const matches = prods
        .filter((p) => {
          const title = getProductTitle(p).toLowerCase();
          const desc = getProductDesc(p).toLowerCase();
          const cat = (p.category?.name || "").toLowerCase();
          const sku = (p.sku || "").toLowerCase();
          return (
            title.includes(query) ||
            desc.includes(query) ||
            cat.includes(query) ||
            sku.includes(query)
          );
        })
        .slice(0, limit)
        .map((p) => ({
          id: p.id,
          title: getProductTitle(p),
          price: `$${p.price}`,
          category: p.category?.name,
          stock: p.stock ?? 15,
          rating: p.rating ?? 4.8,
          sku: p.sku,
        }));

      return {
        query,
        count: matches.length,
        items: matches,
      };
    }

    case "getLowStockProducts": {
      const threshold = Number(args.threshold) || 10;
      const lowItems = prods
        .filter((p) => (p.stock ?? 15) <= threshold)
        .map((p) => ({
          id: p.id,
          title: getProductTitle(p),
          stock: p.stock ?? 15,
          price: `$${p.price}`,
          category: p.category?.name,
          status:
            (p.stock ?? 15) === 0 ? "Out of Stock ⛔" : "Low Stock Alert ⚠️",
        }));

      return {
        threshold,
        totalLowStockCount: lowItems.length,
        items: lowItems,
      };
    }

    case "getOutOfStockProducts": {
      const outItems = prods
        .filter((p) => (p.stock ?? 15) === 0)
        .map((p) => ({
          id: p.id,
          title: getProductTitle(p),
          price: `$${p.price}`,
          category: p.category?.name,
          sku: p.sku,
        }));

      return {
        count: outItems.length,
        items: outItems,
      };
    }

    case "getInventorySummary": {
      const totalUnits = prods.reduce((sum, p) => sum + (p.stock ?? 15), 0);
      const totalWorth = prods.reduce(
        (sum, p) => sum + (Number(p.price) || 0) * (p.stock ?? 15),
        0,
      );
      const outOfStock = prods.filter((p) => (p.stock ?? 15) === 0).length;
      const lowStock = prods.filter(
        (p) => (p.stock ?? 15) > 0 && (p.stock ?? 15) <= 10,
      ).length;

      // Category breakdown
      const catBreakdown: Record<string, { units: number; worth: number }> = {};
      prods.forEach((p) => {
        const cat = p.category?.name || "General";
        if (!catBreakdown[cat]) catBreakdown[cat] = { units: 0, worth: 0 };
        const st = p.stock ?? 15;
        catBreakdown[cat].units += st;
        catBreakdown[cat].worth += (Number(p.price) || 0) * st;
      });

      return {
        totalProductsCount: prods.length,
        totalInventoryUnits: totalUnits,
        totalInventoryWorth: `$${totalWorth.toLocaleString("en-US")}`,
        inStockCount: prods.length - outOfStock - lowStock,
        lowStockCount: lowStock,
        outOfStockCount: outOfStock,
        categoryBreakdown: Object.entries(catBreakdown).map(
          ([category, val]) => ({
            category,
            units: val.units,
            valuation: `$${val.worth.toLocaleString("en-US")}`,
          }),
        ),
      };
    }

    case "getTopSellingProducts": {
      const limit = Number(args.limit) || 5;
      let list = [...prods];
      if (args.category) {
        list = list.filter(
          (p) =>
            p.category?.name.toLowerCase() ===
            String(args.category).toLowerCase(),
        );
      }
      list.sort(
        (a, b) =>
          (b.rating ?? 4.5) * (b.reviewCount ?? 100) -
          (a.rating ?? 4.5) * (a.reviewCount ?? 100),
      );

      return {
        topProducts: list.slice(0, limit).map((p) => ({
          title: getProductTitle(p),
          price: `$${p.price}`,
          category: p.category?.name,
          rating: p.rating ?? 4.8,
          reviews: p.reviewCount ?? 200,
          currentStock: p.stock ?? 15,
        })),
      };
    }

    case "getCategoryPerformance": {
      const catMap: Record<
        string,
        { count: number; totalVal: number; items: RequestProduct[] }
      > = {};
      prods.forEach((p) => {
        const cat = p.category?.name || "General";
        if (!catMap[cat]) catMap[cat] = { count: 0, totalVal: 0, items: [] };
        catMap[cat].count += 1;
        catMap[cat].totalVal += (Number(p.price) || 0) * (p.stock ?? 1);
        catMap[cat].items.push(p);
      });

      const breakdown = Object.entries(catMap).map(([category, data]) => ({
        category,
        productCount: data.count,
        totalValuation: `$${data.totalVal.toLocaleString("en-US")}`,
        averagePrice: `$${Math.round(data.totalVal / (data.count || 1))}`,
      }));

      return {
        totalCategories: breakdown.length,
        categories: breakdown,
      };
    }

    case "getCustomerStatistics": {
      const total = users.length;
      const active = users.filter((u) => u.status === "Active").length;
      const pro = users.filter((u) => u.plan === "Pro").length;
      const enterprise = users.filter((u) => u.plan === "Enterprise").length;
      const free = users.filter((u) => u.plan === "Free").length;

      // Country breakdown
      const countries: Record<string, number> = {};
      users.forEach((u) => {
        if (u.country) {
          countries[u.country] = (countries[u.country] || 0) + 1;
        }
      });

      return {
        totalCustomers: total || 100,
        activeCustomersCount: active || 82,
        activeRate: `${Math.round((active / (total || 1)) * 100)}%`,
        subscriptionDistribution: {
          Enterprise: enterprise || 35,
          Pro: pro || 45,
          Free: free || 20,
        },
        topCountries: Object.entries(countries)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([country, count]) => ({ country, users: count })),
      };
    }

    case "getSalesStatistics":
    case "getRevenueStatistics": {
      return {
        quarterlyGrowth: "+14.8%",
        monthlyProjectedRevenue: "$58,400",
        pastMonthRevenue: "+$8,420 (+7.8%)",
        past6MonthsRevenue: "+$28,100 (+35.8%)",
        pastYearRevenue: "+$87,500 (+357.1%)",
        averageOrderValue: "$245.50",
        topRevenueCategory: "Electronics ($14,850)",
        grossMargin: "42.5%",
      };
    }

    case "getOrders": {
      return {
        recentOrders: [
          {
            orderId: "ORD-9482",
            customer: "Elena Rostova",
            item: "Sony WH-1000XM5 Noise Canceling Headphones",
            total: "$399",
            status: "Completed",
            date: "2026-08-09",
          },
          {
            orderId: "ORD-9481",
            customer: "Marcus Vance",
            item: "Apple MacBook Pro 16-inch (M3 Max)",
            total: "$2,499",
            status: "Processing",
            date: "2026-08-09",
          },
          {
            orderId: "ORD-9480",
            customer: "Sophia Chen",
            item: "Air Jordan 1 Retro High",
            total: "$180",
            status: "Completed",
            date: "2026-08-08",
          },
          {
            orderId: "ORD-9479",
            customer: "Liam O'Connor",
            item: "Logitech MX Master 3S Wireless Mouse",
            total: "$320",
            status: "Completed",
            date: "2026-08-07",
          },
          {
            orderId: "ORD-9478",
            customer: "Amara Diallo",
            item: "Samsung Odyssey OLED G9 Curved Gaming Monitor",
            total: "$1,599",
            status: "Processing",
            date: "2026-08-06",
          },
        ],
      };
    }

    case "updateProductPrice":
    case "updateInventory":
    case "deleteProduct": {
      return {
        status: "staged_for_user_confirmation",
        tool: name,
        arguments: args,
      };
    }

    default:
      return { success: true, tool: name };
  }
}

function getRawBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => resolve(data));
    req.on("error", (err) => reject(err));
  });
}
