import type { Product } from "../../interfaces";
import type { User } from "../../types/user";
import type { ToolName, ToolResult } from "../../types/ai";
import { getLocalizedText } from "../../utils/productUtils";

interface ExecuteToolsParams {
  toolName: ToolName;
  args: Record<string, unknown>;
  products: Product[];
  users: User[];
  currentLang?: string;
}

export function executeTool({
  toolName,
  args,
  products,
  users,
  currentLang = "en",
}: ExecuteToolsParams): ToolResult {
  const toolCallId = `res_${Date.now()}`;

  switch (toolName) {
    case "getDashboardStats": {
      const totalProducts = products.length;
      const catalogValue = products.reduce(
        (sum, p) => sum + (Number(p.price) || 0),
        0,
      );
      const uniqueCategories = new Set(
        products.map((p) => p.category?.name).filter(Boolean),
      ).size;
      const avgPrice =
        totalProducts > 0 ? Math.round(catalogValue / totalProducts) : 0;
      const activeUsers = users.filter((u) => u.status === "Active").length;
      const lowStockCount = products.filter(
        (p) => (p.stock ?? 15) > 0 && (p.stock ?? 15) <= 10,
      ).length;
      const outOfStockCount = products.filter(
        (p) => (p.stock ?? 15) === 0,
      ).length;

      return {
        toolCallId,
        name: toolName,
        result: {
          totalProducts,
          catalogValuation: `$${catalogValue.toLocaleString("en-US")}`,
          uniqueCategories,
          averageProductPrice: `$${avgPrice}`,
          totalRegisteredUsers: users.length,
          activeUsersCount: activeUsers,
          lowStockCount,
          outOfStockCount,
        },
      };
    }

    case "getProducts": {
      let list = [...products];

      if (args.category && typeof args.category === "string") {
        const cat = args.category.toLowerCase();
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
      const results = list.slice(0, limit).map((p) => ({
        id: p.id,
        title: getLocalizedText(p.title, currentLang),
        price: `$${p.price}`,
        category: p.category.name,
        stock: p.stock ?? 15,
        rating: p.rating ?? 4.8,
        sku: p.sku ?? "SKU-PROD",
      }));

      return {
        toolCallId,
        name: toolName,
        result: results,
      };
    }

    case "getProduct": {
      const targetId = args.id as string | undefined;
      const targetTitle = (args.searchTerm || args.title) as string | undefined;

      const found = products.find((p) => {
        if (targetId && p.id === targetId) return true;
        if (targetTitle) {
          const t = getLocalizedText(p.title, currentLang).toLowerCase();
          return t.includes(targetTitle.toLowerCase());
        }
        return false;
      });

      if (!found) {
        return {
          toolCallId,
          name: toolName,
          result: { error: "Product not found with specified criteria." },
        };
      }

      return {
        toolCallId,
        name: toolName,
        result: {
          id: found.id,
          title: getLocalizedText(found.title, currentLang),
          description: getLocalizedText(found.description, currentLang),
          price: `$${found.price}`,
          category: found.category.name,
          stock: found.stock ?? 15,
          rating: found.rating ?? 4.8,
          reviewCount: found.reviewCount ?? 120,
          sku: found.sku ?? "SKU-PROD",
        },
      };
    }

    case "searchProducts": {
      const query = (
        typeof args.query === "string" ? args.query : ""
      ).toLowerCase();
      const limit = typeof args.limit === "number" ? args.limit : 5;

      const matches = products
        .filter((p) => {
          const title = getLocalizedText(p.title, currentLang).toLowerCase();
          const desc = getLocalizedText(
            p.description,
            currentLang,
          ).toLowerCase();
          const cat = p.category.name.toLowerCase();
          return (
            title.includes(query) || desc.includes(query) || cat.includes(query)
          );
        })
        .slice(0, limit)
        .map((p) => ({
          id: p.id,
          title: getLocalizedText(p.title, currentLang),
          price: `$${p.price}`,
          category: p.category.name,
          stock: p.stock ?? 15,
          rating: p.rating ?? 4.8,
        }));

      return {
        toolCallId,
        name: toolName,
        result: matches,
      };
    }

    case "getLowStockProducts": {
      const threshold =
        typeof args.threshold === "number" ? args.threshold : 10;
      const lowItems = products
        .filter((p) => (p.stock ?? 15) <= threshold)
        .map((p) => ({
          id: p.id,
          title: getLocalizedText(p.title, currentLang),
          currentStock: p.stock ?? 15,
          price: `$${p.price}`,
          category: p.category.name,
          status:
            (p.stock ?? 15) === 0 ? "Out of Stock ⛔" : "Low Stock Alert ⚠️",
        }));

      return {
        toolCallId,
        name: toolName,
        result: {
          threshold,
          totalLowStockCount: lowItems.length,
          items: lowItems,
        },
      };
    }

    case "getOutOfStockProducts": {
      const outItems = products
        .filter((p) => (p.stock ?? 15) === 0)
        .map((p) => ({
          id: p.id,
          title: getLocalizedText(p.title, currentLang),
          price: `$${p.price}`,
          category: p.category.name,
        }));

      return {
        toolCallId,
        name: toolName,
        result: {
          count: outItems.length,
          items: outItems,
        },
      };
    }

    case "getInventory":
    case "getInventorySummary": {
      const totalUnits = products.reduce((sum, p) => sum + (p.stock ?? 15), 0);
      const totalWorth = products.reduce(
        (sum, p) => sum + (Number(p.price) || 0) * (p.stock ?? 15),
        0,
      );
      const outOfStock = products.filter((p) => (p.stock ?? 15) === 0).length;
      const lowStock = products.filter(
        (p) => (p.stock ?? 15) > 0 && (p.stock ?? 15) <= 10,
      ).length;

      return {
        toolCallId,
        name: toolName,
        result: {
          totalProductsCount: products.length,
          totalInventoryUnits: totalUnits,
          totalInventoryWorth: `$${totalWorth.toLocaleString("en-US")}`,
          outOfStockCount: outOfStock,
          lowStockCount: lowStock,
          inStockCount: products.length - outOfStock - lowStock,
        },
      };
    }

    case "getTopSellingProducts": {
      const limit = typeof args.limit === "number" ? args.limit : 5;
      const list = [...products].sort(
        (a, b) =>
          (b.rating ?? 4.5) * (b.reviewCount ?? 100) -
          (a.rating ?? 4.5) * (a.reviewCount ?? 100),
      );

      return {
        toolCallId,
        name: toolName,
        result: list.slice(0, limit).map((p) => ({
          title: getLocalizedText(p.title, currentLang),
          price: `$${p.price}`,
          category: p.category.name,
          rating: p.rating ?? 4.8,
          reviews: p.reviewCount ?? 200,
          currentStock: p.stock ?? 15,
        })),
      };
    }

    case "getCategoryPerformance": {
      const catMap: Record<
        string,
        { count: number; totalVal: number; items: Product[] }
      > = {};

      products.forEach((p) => {
        const cat = p.category.name;
        if (!catMap[cat]) {
          catMap[cat] = { count: 0, totalVal: 0, items: [] };
        }
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
        toolCallId,
        name: toolName,
        result: breakdown,
      };
    }

    case "getCustomers":
    case "getCustomerStatistics": {
      const total = users.length;
      const active = users.filter((u) => u.status === "Active").length;
      const pro = users.filter((u) => u.plan === "Pro").length;
      const enterprise = users.filter((u) => u.plan === "Enterprise").length;
      const free = users.filter((u) => u.plan === "Free").length;

      return {
        toolCallId,
        name: toolName,
        result: {
          totalCustomers: total,
          activeUsers: active,
          activePercentage: `${Math.round((active / (total || 1)) * 100)}%`,
          planDistribution: {
            Enterprise: enterprise,
            Pro: pro,
            Free: free,
          },
        },
      };
    }

    case "getSales":
    case "getSalesStatistics":
    case "getRevenue":
    case "getRevenueStatistics": {
      return {
        toolCallId,
        name: toolName,
        result: {
          quarterlyGrowth: "+14.8%",
          projectedMonthlyRevenue: "$58,400",
          averageOrderValue: "$245.50",
          topSellingCategory: "Electronics",
          grossMargin: "42.5%",
        },
      };
    }

    case "getOrders": {
      return {
        toolCallId,
        name: toolName,
        result: [
          {
            id: "ORD-9482",
            customer: "Elena Rostova",
            item: "Sony WH-1000XM5",
            total: "$399",
            status: "Completed",
            date: "2026-08-09",
          },
          {
            id: "ORD-9481",
            customer: "Marcus Vance",
            item: "Apple MacBook Pro 16-inch",
            total: "$2,499",
            status: "Processing",
            date: "2026-08-09",
          },
          {
            id: "ORD-9480",
            customer: "Sophia Chen",
            item: "Air Jordan 1 Retro High",
            total: "$180",
            status: "Completed",
            date: "2026-08-08",
          },
        ],
      };
    }

    default:
      return {
        toolCallId,
        name: toolName,
        result: { status: "Tool executed successfully." },
      };
  }
}
