import { useTranslation } from "react-i18next";
import type { Product } from "../interfaces";

interface KpiStatsProps {
  products: Product[];
}

const KpiStats = ({ products }: KpiStatsProps) => {
  const { t } = useTranslation();

  // Calculate Dynamic KPIs
  const totalProducts = products.length;

  const totalCatalogValue = products.reduce(
    (sum, item) => sum + (Number(item.price) || 0),
    0,
  );

  const uniqueCategoriesCount = new Set(
    products.map((p) => p.category?.name).filter(Boolean),
  ).size;

  const averagePrice =
    totalProducts > 0 ? Math.round(totalCatalogValue / totalProducts) : 0;

  const stats = [
    {
      id: "total-products",
      title: t("kpi.totalProducts", "Total Products"),
      value: totalProducts.toLocaleString("en-US"),
      subtitle: t("kpi.totalProductsSub", "Active items in catalog"),
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      badgeColor: "bg-indigo-50 text-indigo-600 border-indigo-100/80",
      accentColor: "from-indigo-600 to-indigo-700",
    },
    {
      id: "catalog-value",
      title: t("kpi.catalogValue", "Catalog Value"),
      value: `$${totalCatalogValue.toLocaleString("en-US")}`,
      subtitle: t("kpi.catalogValueSub", "Total inventory worth"),
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-100/80",
      accentColor: "from-emerald-600 to-teal-700",
    },
    {
      id: "active-categories",
      title: t("kpi.activeCategories", "Active Categories"),
      value: uniqueCategoriesCount.toString(),
      subtitle: t("kpi.activeCategoriesSub", "Product classifications"),
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      ),
      badgeColor: "bg-purple-50 text-purple-600 border-purple-100/80",
      accentColor: "from-purple-600 to-indigo-700",
    },
    {
      id: "avg-price",
      title: t("kpi.averagePrice", "Average Price"),
      value: `$${averagePrice.toLocaleString("en-US")}`,
      subtitle: t("kpi.averagePriceSub", "Per product item"),
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
      badgeColor: "bg-amber-50 text-amber-600 border-amber-100/80",
      accentColor: "from-amber-600 to-orange-700",
    },
  ];

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-200/80 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
        >
          {/* Subtle Top Accent Line */}
          <div
            className={`absolute top-0 right-0 left-0 h-1 bg-linear-to-r ${stat.accentColor} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
          />

          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-slate-400">
              {stat.title}
            </span>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl border ${stat.badgeColor} dark:bg-opacity-20 transition-transform duration-300 group-hover:scale-110`}
            >
              {stat.icon}
            </div>
          </div>

          <div className="mt-3">
            <div className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
              {stat.value}
            </div>
            <p className="mt-1 text-xs font-medium text-gray-500 dark:text-slate-400">
              {stat.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KpiStats;
