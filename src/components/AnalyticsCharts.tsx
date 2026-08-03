import { useState } from "react";
import type { Product } from "../interfaces";

interface AnalyticsChartsProps {
  products: Product[];
}

const AnalyticsCharts = ({ products }: AnalyticsChartsProps) => {
  const [activeTab, setActiveTab] = useState<"overview" | "categories" | "pricing">("overview");

  // 1. Calculate Category Data
  const categoryStats = products.reduce((acc, p) => {
    const name = p.category?.name || "Uncategorized";
    if (!acc[name]) {
      acc[name] = { count: 0, totalValue: 0, imageURL: p.category?.imageURL };
    }
    acc[name].count += 1;
    acc[name].totalValue += Number(p.price) || 0;
    return acc;
  }, {} as Record<string, { count: number; totalValue: number; imageURL?: string }>);

  const categoryList = Object.entries(categoryStats).map(([name, data]) => ({
    name,
    count: data.count,
    totalValue: data.totalValue,
    imageURL: data.imageURL,
    percentage: Math.round((data.count / (products.length || 1)) * 100),
  }));

  // 2. Calculate Price Range Distribution Tiers
  const priceTiers = [
    { label: "Budget (<$500)", min: 0, max: 499, count: 0, color: "bg-emerald-500" },
    { label: "Mid-Tier ($500-$1.5k)", min: 500, max: 1499, count: 0, color: "bg-indigo-500" },
    { label: "High-Tier ($1.5k-$10k)", min: 1500, max: 9999, count: 0, color: "bg-purple-500" },
    { label: "Ultra Luxury ($10k+)", min: 10000, max: Infinity, count: 0, color: "bg-rose-500" },
  ];

  products.forEach((p) => {
    const val = Number(p.price) || 0;
    const tier = priceTiers.find((t) => val >= t.min && val <= t.max);
    if (tier) tier.count += 1;
  });

  const maxTierCount = Math.max(...priceTiers.map((t) => t.count), 1);

  // 3. Color Frequency Analysis
  const colorFrequency = products.reduce((acc, p) => {
    p.colors?.forEach((c) => {
      acc[c] = (acc[c] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const colorList = Object.entries(colorFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const totalColorInstances = Object.values(colorFrequency).reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="mb-10 rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-4 pb-6 border-b border-gray-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-x-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Catalog Analytics & Insights</h3>
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
            Visual breakdown of product inventory distribution, price ranges, and color popularity
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center rounded-xl bg-gray-100/80 dark:bg-slate-800/80 p-1 text-xs font-medium">
          <button
            onClick={() => setActiveTab("overview")}
            className={`rounded-lg px-3 py-1.5 transition-all ${
              activeTab === "overview"
                ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs font-semibold"
                : "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`rounded-lg px-3 py-1.5 transition-all ${
              activeTab === "categories"
                ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs font-semibold"
                : "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab("pricing")}
            className={`rounded-lg px-3 py-1.5 transition-all ${
              activeTab === "pricing"
                ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs font-semibold"
                : "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Pricing Tiers
          </button>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
        {/* Category Breakdown (2 Cols) */}
        <div className={`lg:col-span-2 space-y-4 ${activeTab === "pricing" ? "hidden lg:block" : ""}`}>
          <div className="flex items-center justify-between">
            <h4 className="font-bold uppercase tracking-wider text-xs text-gray-900 dark:text-slate-200">
              Category Distribution
            </h4>
            <span className="text-xs text-gray-400 dark:text-slate-500 font-medium">
              {categoryList.length} Categories
            </span>
          </div>

          <div className="space-y-3.5">
            {categoryList.map((cat) => (
              <div key={cat.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-x-2 font-medium text-gray-800 dark:text-slate-200">
                    {cat.imageURL && (
                      <img
                        src={cat.imageURL}
                        alt={cat.name}
                        className="h-5 w-5 rounded-full object-cover ring-1 ring-gray-200 dark:ring-slate-700"
                      />
                    )}
                    <span>{cat.name}</span>
                    <span className="text-gray-400 dark:text-slate-500 font-normal">({cat.count} items)</span>
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    ${cat.totalValue.toLocaleString("en-US")}{" "}
                    <span className="text-gray-400 dark:text-slate-500 font-normal text-[11px]">
                      ({cat.percentage}%)
                    </span>
                  </div>
                </div>
                {/* Animated Progress Bar */}
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${Math.max(cat.percentage, 4)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Tiers Visual Bar Graph */}
        <div className={`space-y-4 ${activeTab === "categories" ? "hidden lg:block" : ""}`}>
          <h4 className="text-xs font-bold text-gray-900 dark:text-slate-200 uppercase tracking-wider">
            Price Range Breakdown
          </h4>

          <div className="flex h-44 items-end gap-x-3 rounded-xl border border-gray-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 p-4">
            {priceTiers.map((tier) => {
              const heightPercent =
                tier.count > 0 ? Math.round((tier.count / maxTierCount) * 100) : 8;
              return (
                <div key={tier.label} className="flex flex-1 flex-col items-center gap-y-2 h-full justify-end">
                  <span className="text-[10px] font-bold text-gray-600 dark:text-slate-300">{tier.count}</span>
                  <div
                    className={`w-full rounded-t-lg ${tier.color} transition-all duration-500 hover:opacity-90 shadow-xs`}
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-[9px] font-medium text-gray-500 dark:text-slate-400 text-center line-clamp-1">
                    {tier.label.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Color Palette Popularity */}
          <div className="pt-2">
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2">
              Popular Swatches
            </h5>
            <div className="flex flex-wrap items-center gap-2">
              {colorList.map(([color, count]) => {
                const pct = Math.round((count / totalColorInstances) * 100);
                return (
                  <div
                    key={color}
                    className="flex items-center gap-x-1.5 rounded-lg border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-800 px-2 py-1 shadow-2xs text-[11px]"
                  >
                    <span
                      className="h-3 w-3 rounded-full border border-black/10 dark:border-white/20"
                      style={{ backgroundColor: color }}
                    />
                    <span className="font-semibold text-gray-700 dark:text-slate-200">{count}</span>
                    <span className="text-[10px] text-gray-400 dark:text-slate-500">({pct}%)</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
