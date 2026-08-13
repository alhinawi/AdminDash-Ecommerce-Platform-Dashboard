import type { ToolName } from "../../types/ai";

export interface ToolDefinition {
  name: ToolName;
  description: string;
  parameters: {
    type: "object";
    properties: Record<
      string,
      {
        type: string;
        description: string;
        enum?: string[];
      }
    >;
    required?: string[];
  };
}

export const AI_TOOLS: ToolDefinition[] = [
  {
    name: "getDashboardStats",
    description:
      "Get high-level ecommerce statistics including total products count, catalog valuation, active categories, and average product price.",
    parameters: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "getProducts",
    description:
      "List products with optional category, price range, stock status, and sorting filters.",
    parameters: {
      type: "object",
      properties: {
        category: {
          type: "string",
          description: "Category name (e.g. Electronics, Clothes, Sneakers)",
        },
        minPrice: {
          type: "number",
          description: "Minimum price filter in USD",
        },
        maxPrice: {
          type: "number",
          description: "Maximum price filter in USD",
        },
        stockStatus: {
          type: "string",
          description: "Stock filter: all, low_stock, out_of_stock, in_stock",
          enum: ["all", "low_stock", "out_of_stock", "in_stock"],
        },
        sortBy: {
          type: "string",
          description:
            "Sort by 'rating', 'price_asc', 'price_desc', 'stock', 'reviews'",
          enum: ["rating", "price_asc", "price_desc", "stock", "reviews"],
        },
        limit: {
          type: "number",
          description: "Maximum number of products to return (default 5)",
        },
      },
    },
  },
  {
    name: "getProduct",
    description:
      "Get detailed information for a specific product by ID or title.",
    parameters: {
      type: "object",
      properties: {
        id: { type: "string", description: "Product ID" },
        searchTerm: {
          type: "string",
          description: "Product name/title search",
        },
      },
    },
  },
  {
    name: "searchProducts",
    description: "Search products by keyword in title or description.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search term" },
        limit: { type: "number", description: "Max results to return" },
      },
      required: ["query"],
    },
  },
  {
    name: "getLowStockProducts",
    description:
      "Retrieve all products that are low in stock (below threshold) or out of stock.",
    parameters: {
      type: "object",
      properties: {
        threshold: {
          type: "number",
          description: "Stock threshold (default 10)",
        },
      },
    },
  },
  {
    name: "getOutOfStockProducts",
    description: "Retrieve all products with 0 units in stock.",
    parameters: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "getInventory",
    description:
      "Get comprehensive inventory overview including total units, stock distribution, and valuation.",
    parameters: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "getInventorySummary",
    description:
      "Get comprehensive inventory overview including total units, valuation, and category breakdown.",
    parameters: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "getTopSellingProducts",
    description: "Retrieve best-selling products by rating and review count.",
    parameters: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Max number of items" },
        category: { type: "string", description: "Filter by category" },
      },
    },
  },
  {
    name: "getCategoryPerformance",
    description:
      "Get category breakdown with product counts, total valuations, and average price per category.",
    parameters: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "getSales",
    description: "Retrieve recent sales metrics and growth trends.",
    parameters: {
      type: "object",
      properties: {
        period: {
          type: "string",
          description: "Time period (today, this_month, last_month, ytd)",
          enum: ["today", "this_month", "last_month", "ytd"],
        },
      },
    },
  },
  {
    name: "getSalesStatistics",
    description: "Retrieve sales metrics and growth statistics.",
    parameters: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "getRevenue",
    description:
      "Retrieve financial revenue breakdown and historical projections.",
    parameters: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "getRevenueStatistics",
    description: "Retrieve revenue breakdown and projections.",
    parameters: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "getCustomers",
    description:
      "Get customer account stats, tier distribution (Free, Pro, Enterprise), and activity.",
    parameters: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "getCustomerStatistics",
    description: "Get customer account stats and tier distribution.",
    parameters: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "getOrders",
    description: "Get recent order activities and fulfillment statuses.",
    parameters: {
      type: "object",
      properties: {
        status: {
          type: "string",
          description: "Filter by order status",
          enum: ["all", "completed", "pending", "processing"],
        },
      },
    },
  },
  {
    name: "createProduct",
    description:
      "Create a new product in the catalog (Requires user confirmation).",
    parameters: {
      type: "object",
      properties: {
        title: { type: "string", description: "Product title" },
        price: { type: "string", description: "Product price" },
        category: { type: "string", description: "Category name" },
        description: { type: "string", description: "Product description" },
        stock: { type: "number", description: "Initial stock count" },
      },
      required: ["title", "price", "category"],
    },
  },
  {
    name: "updateProduct",
    description:
      "Update details of an existing product (Requires user confirmation).",
    parameters: {
      type: "object",
      properties: {
        id: { type: "string", description: "Product ID" },
        title: { type: "string", description: "Updated title" },
        price: { type: "string", description: "Updated price" },
        stock: { type: "number", description: "Updated stock" },
      },
      required: ["id"],
    },
  },
  {
    name: "updateProductPrice",
    description:
      "Change the selling price of a product (Requires user confirmation).",
    parameters: {
      type: "object",
      properties: {
        id: { type: "string", description: "Product ID" },
        searchTerm: { type: "string", description: "Product name to search" },
        newPrice: { type: "string", description: "New price in USD" },
      },
      required: ["newPrice"],
    },
  },
  {
    name: "updateInventory",
    description:
      "Update stock count for a product (Requires user confirmation).",
    parameters: {
      type: "object",
      properties: {
        id: { type: "string", description: "Product ID" },
        searchTerm: { type: "string", description: "Product name" },
        newStock: { type: "number", description: "New stock amount" },
      },
      required: ["newStock"],
    },
  },
  {
    name: "deleteProduct",
    description:
      "Permanently delete a product from the catalog (Requires user confirmation).",
    parameters: {
      type: "object",
      properties: {
        id: { type: "string", description: "Product ID to delete" },
        searchTerm: { type: "string", description: "Product name" },
      },
    },
  },
];
