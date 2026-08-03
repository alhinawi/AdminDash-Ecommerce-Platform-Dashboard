import { useState } from "react";
import type { Product } from "../interfaces";

interface AnalyticsChartsProps {
  products: Product[];
}

const AnalyticsCharts = ({ products }: AnalyticsChartsProps) => {
  const [activeTab, setActiveTab] = useState<"overview" | "categories" | "pricing">("overview");

  const totalProductsCount = products.length || 1;
  const totalCatalogWorth = products.reduce((sum, item) => sum + (Number(item.price) || 0), 0) || 1;

  // 1. Calculate Category Stats
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
    avgPrice: Math.round(data.totalValue / (data.count || 1)),
    countPercentage: Math.round((data.count / totalProductsCount) * 100),
    valuePercentage: Math.round((data.totalValue / totalCatalogWorth) * 100),
  }));

  // Top category by value
  const topValuedCategory = [...categoryList].sort((a, b) => b.totalValue - a.totalValue)[0];

  // 2. Calculate Price Range Distribution Tiers
  const priceTiers = [
    { label: "Budget (<$500)", min: 0, max: 499, count: 0, totalValue: 0, color: "bg-emerald-500", border: "border-emerald-500/20" },
    { label: "Mid-Tier ($500-$1.5k)", min: 500, max: 1499, count: 0, totalValue: 0, color: "bg-indigo-500", border: "border-indigo-500/20" },
    { label: "High-Tier ($1.5k-$10k)", min: 1500, max: 9999, count: 0, totalValue: 0, color: "bg-purple-500", border: "border-purple-500/20" },
    { label: "Ultra Luxury ($10k+)", min: 10000, max: Infinity, count: 0, totalValue: 0, color: "bg-rose-500", border: "border-rose-500/20" },
  ];

  products.forEach((p) => {
    const val = Number(p.price) || 0;
    const tier = priceTiers.find((t) => val >= t.min && val <= t.max);
    if (tier) {
      tier.count += 1;
      tier.totalValue += val;
    }
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
    <div className="mb-10 rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-4 pb-6 border-b border-gray-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-x-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Catalog Analytics & Insights</h3>
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
            Visual breakdown of product inventory distribution, price ranges, and category intelligence
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center rounded-xl bg-gray-100/80 dark:bg-slate-800/80 p-1 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`rounded-lg px-3 py-1.5 transition-all cursor-pointer ${
              activeTab === "overview"
                ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs font-semibold"
                : "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("categories")}
            className={`rounded-lg px-3 py-1.5 transition-all cursor-pointer ${
              activeTab === "categories"
                ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs font-semibold"
                : "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Categories ({categoryList.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("pricing")}
            className={`rounded-lg px-3 py-1.5 transition-all cursor-pointer ${
              activeTab === "pricing"
                ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs font-semibold"
                : "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Pricing Tiers
          </button>
        </div>
      </div>

      {/* ----------------- TAB 1: OVERVIEW ----------------- */}
      {activeTab === "overview" && (
        <div className="space-y-6 pt-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Category Breakdown (2 Cols) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold uppercase tracking-wider text-xs text-gray-900 dark:text-slate-200">
                  Category Inventory Distribution
                </h4>
                <span className="text-xs text-gray-400 dark:text-slate-500 font-medium">
                  {categoryList.length} Categories Active
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
                        <span className="font-semibold">{cat.name}</span>
                        <span className="text-gray-400 dark:text-slate-500 font-normal">({cat.count} items)</span>
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        ${cat.totalValue.toLocaleString("en-US")}{" "}
                        <span className="text-gray-400 dark:text-slate-500 font-normal text-[11px]">
                          ({cat.valuePercentage}% worth)
                        </span>
                      </div>
                    </div>
                    {/* Animated Progress Bar */}
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500"
                        style={{ width: `${Math.max(cat.valuePercentage, 4)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Tiers Visual Histogram */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-900 dark:text-slate-200 uppercase tracking-wider">
                Price Distribution
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

              {/* Swatches Popularity */}
              <div className="pt-2">
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-2">
                  Popular Palette Swatches
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

          {/* Executive Insight Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-slate-800">
            <div className="rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 p-3">
              <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Top Valued Category
              </span>
              <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                {topValuedCategory?.name || "N/A"} (${topValuedCategory?.totalValue.toLocaleString("en-US")})
              </p>
            </div>

            <div className="rounded-xl bg-purple-50/60 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50 p-3">
              <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                Catalog Diversity
              </span>
              <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                {categoryList.length} Categories Across {products.length} Products
              </p>
            </div>

            <div className="rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 p-3">
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Primary Color Accent
              </span>
              <div className="flex items-center gap-x-2 mt-1">
                <span
                  className="h-3.5 w-3.5 rounded-full border border-black/10"
                  style={{ backgroundColor: colorList[0]?.[0] || "#6366f1" }}
                />
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {colorList[0]?.[0] || "Default"} ({colorList[0]?.[1] || 0} uses)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- TAB 2: CATEGORIES DEEP DIVE ----------------- */}
      {activeTab === "categories" && (
        <div className="pt-6 space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Category Intelligence Cards
            </h4>
            <span className="text-xs text-gray-500 dark:text-slate-400">
              Detailed valuation & item breakdown per category
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryList.map((cat) => (
              <div
                key={cat.name}
                className="rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 p-4 space-y-3 transition-all hover:border-indigo-200 dark:hover:border-indigo-800"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-2.5">
                    {cat.imageURL && (
                      <img
                        src={cat.imageURL}
                        alt={cat.name}
                        className="h-8 w-8 rounded-full object-cover ring-2 ring-indigo-500/20"
                      />
                    )}
                    <div>
                      <h5 className="text-sm font-bold text-gray-900 dark:text-white">{cat.name}</h5>
                      <span className="text-[11px] text-gray-500 dark:text-slate-400">{cat.count} Items</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200/60 dark:border-slate-700/60 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 dark:text-slate-400">Total Worth:</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      ${cat.totalValue.toLocaleString("en-US")}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 dark:text-slate-400">Avg. Unit Price:</span>
                    <span className="font-semibold text-gray-800 dark:text-slate-200">
                      ${cat.avgPrice.toLocaleString("en-US")}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 dark:text-slate-400">Share of Inventory:</span>
                    <span className="font-semibold text-purple-600 dark:text-purple-400">
                      {cat.valuePercentage}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
                  <div
                    className="h-full rounded-full bg-indigo-600 dark:bg-indigo-400"
                    style={{ width: `${Math.max(cat.valuePercentage, 5)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- TAB 3: PRICING TIERS DEEP DIVE ----------------- */}
      {activeTab === "pricing" && (
        <div className="pt-6 space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Price Range Tiers Analysis
            </h4>
            <span className="text-xs text-gray-500 dark:text-slate-400">
              Distribution across budget, mid-tier, and luxury brackets
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {priceTiers.map((tier) => {
              const tierWorthPct = Math.round((tier.totalValue / totalCatalogWorth) * 100);
              return (
                <div
                  key={tier.label}
                  className={`rounded-xl border ${tier.border} bg-gray-50/50 dark:bg-slate-800/50 p-4 space-y-3`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900 dark:text-white uppercase">
                      {tier.label.split(" ")[0]}
                    </span>
                    <span className={`h-3 w-3 rounded-full ${tier.color}`} />
                  </div>

                  <div className="text-xl font-extrabold text-gray-900 dark:text-white">
                    {tier.count} <span className="text-xs font-normal text-gray-500 dark:text-slate-400">Items</span>
                  </div>

                  <div className="pt-2 border-t border-gray-200/60 dark:border-slate-700/60 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-slate-400">Range:</span>
                      <span className="font-medium text-gray-800 dark:text-slate-200">
                        {tier.label.split(" ")[1]}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-slate-400">Combined Value:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        ${tier.totalValue.toLocaleString("en-US")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-slate-400">Inventory Share:</span>
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                        {tierWorthPct}%
                      </span>
                    </div>
                  </div>

                  {/* Tier Bar */}
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
                    <div
                      className={`h-full rounded-full ${tier.color}`}
                      style={{ width: `${Math.max(tierWorthPct, 4)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsCharts;
