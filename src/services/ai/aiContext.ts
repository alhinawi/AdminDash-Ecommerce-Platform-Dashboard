import type { Product } from "../../interfaces";
import type { DashboardContextData } from "../../types/ai";
import type { User } from "../../types/user";

export function generateDashboardContext(
  products: Product[],
  users: User[],
): DashboardContextData {
  const totalProducts = products.length;
  const catalogValue = products.reduce(
    (acc, p) => acc + (Number(p.price) || 0),
    0,
  );
  const categories = new Set(
    products.map((p) => p.category?.name).filter(Boolean),
  );
  const averagePrice =
    totalProducts > 0 ? Math.round(catalogValue / totalProducts) : 0;
  const lowStockCount = products.filter(
    (p) => (p.stock ?? 15) > 0 && (p.stock ?? 15) <= 10,
  ).length;
  const outOfStockCount = products.filter((p) => (p.stock ?? 15) === 0).length;

  return {
    products,
    users,
    totalProducts,
    catalogValue,
    uniqueCategoriesCount: categories.size,
    averagePrice,
    lowStockCount,
    outOfStockCount,
  };
}
