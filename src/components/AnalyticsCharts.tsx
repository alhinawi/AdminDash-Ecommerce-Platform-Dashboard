import { useState } from "react";
import type { Product } from "../interfaces";

interface AnalyticsChartsProps {
  products: Product[];
}

const CATEGORY_COLOR_MAP: Record<string, string> = {
  electronics: "#3b82f6", // Vibrant Tech Royal Blue
  clothes: "#10b981", // Emerald Green
  photography: "#f59e0b", // Warm Gold / Amber
  furniture: "#f43f5e", // Rose Red
  sneakers: "#06b6d4", // Cyan Sky
  cars: "#8b5cf6", // Electric Purple
  accessories: "#ea580c", // Sunset Orange
};

const DISTINCT_PALETTE = [
  "#3b82f6", // Blue
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#f43f5e", // Rose
  "#06b6d4", // Cyan
  "#8b5cf6", // Violet
  "#ea580c", // Orange
  "#0d9488", // Teal
  "#d946ef", // Fuchsia
  "#0284c7", // Sky
  "#65a30d", // Lime
  "#ec4899", // Pink
];

const AnalyticsCharts = ({ products }: AnalyticsChartsProps) => {
  const [activeTab, setActiveTab] = useState<"overview" | "categories" | "pricing">("overview");
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);

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

  const categoryList = Object.entries(categoryStats).map(([name, data], idx) => {
    const normalizedKey = name.toLowerCase().trim();
    const color =
      CATEGORY_COLOR_MAP[normalizedKey] ||
      DISTINCT_PALETTE[idx % DISTINCT_PALETTE.length];

    return {
      name,
      count: data.count,
      totalValue: data.totalValue,
      imageURL: data.imageURL,
      color,
      avgPrice: Math.round(data.totalValue / (data.count || 1)),
      countPercentage: Math.round((data.count / totalProductsCount) * 100),
      valuePercentage: Math.round((data.totalValue / totalCatalogWorth) * 100),
    };
  });

  // Top category by value
  const topValuedCategory = [...categoryList].sort((a, b) => b.totalValue - a.totalValue)[0];

  // 2. Calculate Price Range Distribution Tiers
  const priceTiers = [
    { label: "Budget (<$500)", min: 0, max: 499, count: 0, totalValue: 0, color: "bg-emerald-500", stroke: "#10b981", border: "border-emerald-500/20" },
    { label: "Mid-Tier ($500-$1.5k)", min: 500, max: 1499, count: 0, totalValue: 0, color: "bg-indigo-500", stroke: "#6366f1", border: "border-indigo-500/20" },
    { label: "High-Tier ($1.5k-$10k)", min: 1500, max: 9999, count: 0, totalValue: 0, color: "bg-purple-500", stroke: "#a855f7", border: "border-purple-500/20" },
    { label: "Ultra Luxury ($10k+)", min: 10000, max: Infinity, count: 0, totalValue: 0, color: "bg-rose-500", stroke: "#f43f5e", border: "border-rose-500/20" },
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

  // 4. SVG Donut Chart Calculation (Balanced Category Item Share with Slice Gaps)
  const donutRadius = 42;
  const circumference = 2 * Math.PI * donutRadius; // ~263.89
  const sliceGap = categoryList.length > 1 ? 4 : 0; // Gap between slices
  let accumulatedOffset = 0;

  const donutSlices = categoryList.map((cat, i) => {
    const itemRatio = cat.count / totalProductsCount;
    const rawLen = itemRatio * circumference;
    const sliceLen = Math.max(rawLen - sliceGap, 4);
    const strokeDasharray = `${sliceLen} ${circumference - sliceLen}`;
    const strokeDashoffset = -accumulatedOffset;
    accumulatedOffset += rawLen;

    return {
      ...cat,
      index: i,
      itemRatio,
      countPercentage: Math.round(itemRatio * 100),
      strokeDasharray,
      strokeDashoffset,
    };
  });

  // 5. 12-Month Sales & Revenue Analytics Data
  const monthlyData = [
    { month: "Jan", revenue: 24500, sales: 140 },
    { month: "Feb", revenue: 32100, sales: 185 },
    { month: "Mar", revenue: 28900, sales: 160 },
    { month: "Apr", revenue: 45200, sales: 230 },
    { month: "May", revenue: 58700, sales: 310 },
    { month: "Jun", revenue: 52400, sales: 285 },
    { month: "Jul", revenue: 67900, sales: 390 },
    { month: "Aug", revenue: 74500, sales: 420 },
    { month: "Sep", revenue: 69300, sales: 380 },
    { month: "Oct", revenue: 85100, sales: 490 },
    { month: "Nov", revenue: 98400, sales: 580 },
    { month: "Dec", revenue: 112000, sales: 650 },
  ];

  const [hoveredMonth, setHoveredMonth] = useState<typeof monthlyData[0] | null>(null);
  const maxMonthlyRevenue = Math.max(...monthlyData.map((d) => d.revenue));
  const totalAnnualRevenue = monthlyData.reduce((sum, d) => sum + d.revenue, 0);

  const monthlyPoints = monthlyData.map((d, idx) => {
    const x = (idx / (monthlyData.length - 1)) * 300;
    const y = 115 - (d.revenue / maxMonthlyRevenue) * 90;
    return { ...d, x, y };
  });

  const monthlyPathD = monthlyPoints.reduce((acc, pt, i, arr) => {
    if (i === 0) return `M ${pt.x},${pt.y}`;
    const prev = arr[i - 1];
    const cp1x = prev.x + (pt.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (pt.x - prev.x) / 2;
    const cp2y = pt.y;
    return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${pt.x},${pt.y}`;
  }, "");

  const monthlyAreaD = `${monthlyPathD} L 300,130 L 0,130 Z`;

  return (
    <div className="mb-10 rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-4 pb-6 border-b border-gray-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-x-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Catalog Analytics & Visual Graphs</h3>
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
            Interactive SVG charts, inventory market share, and product price curves
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
        <div className="space-y-8 pt-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* SVG Donut Chart (1 Col) */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/40 p-5 relative">
              <span className="text-xs font-bold text-gray-900 dark:text-slate-200 uppercase tracking-wider mb-2">
                Category Market Share
              </span>

              <div className="relative h-48 w-48 flex items-center justify-center">
                <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r={donutRadius}
                    className="stroke-gray-200 dark:stroke-slate-700"
                    strokeWidth="12"
                    fill="none"
                  />
                  {donutSlices.map((slice) => (
                    <circle
                      key={slice.name}
                      cx="50"
                      cy="50"
                      r={donutRadius}
                      stroke={slice.color}
                      strokeWidth={hoveredSlice === slice.index ? "15" : "12"}
                      strokeDasharray={slice.strokeDasharray}
                      strokeDashoffset={slice.strokeDashoffset}
                      strokeLinecap="round"
                      fill="none"
                      style={{ pointerEvents: "stroke" }}
                      className="transition-all duration-300 cursor-pointer hover:opacity-90"
                      onMouseEnter={() => setHoveredSlice(slice.index)}
                      onMouseLeave={() => setHoveredSlice(null)}
                    />
                  ))}
                </svg>

                {/* Central Donut Text Badge */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  {hoveredSlice !== null && donutSlices[hoveredSlice] ? (
                    <>
                      <span className="text-[10px] font-semibold text-gray-700 dark:text-slate-200">
                        {donutSlices[hoveredSlice].name}
                      </span>
                      <span className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">
                        {donutSlices[hoveredSlice].countPercentage}% Share
                      </span>
                      <span className="text-[10px] font-medium text-gray-500 dark:text-slate-400">
                        ${donutSlices[hoveredSlice].totalValue.toLocaleString("en-US")}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-slate-500">
                        Total Worth
                      </span>
                      <span className="text-sm font-extrabold text-gray-900 dark:text-white">
                        ${totalCatalogWorth.toLocaleString("en-US")}
                      </span>
                      <span className="text-[10px] text-indigo-500 font-semibold">
                        {categoryList.length} Categories
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Donut Legend */}
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 pt-3 text-[11px]">
                {categoryList.map((cat, idx) => (
                  <div
                    key={cat.name}
                    className="flex items-center gap-x-1.5 cursor-pointer"
                    onMouseEnter={() => setHoveredSlice(idx)}
                    onMouseLeave={() => setHoveredSlice(null)}
                  >
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="font-medium text-gray-700 dark:text-slate-300">{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SVG Area Curve Trend Chart (2 Cols) */}
            <div className="lg:col-span-2 space-y-4 rounded-2xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/40 p-5 relative">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-slate-200 uppercase tracking-wider">
                    Annual Revenue & Growth Trend (12 Months)
                  </h4>
                  <span className="text-[11px] text-gray-500 dark:text-slate-400">
                    Monthly sales revenue performance curve
                  </span>
                </div>
                <div className="flex items-center gap-x-2">
                  {hoveredMonth ? (
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-full border border-indigo-200 dark:border-indigo-800 animate-in fade-in">
                      {hoveredMonth.month}: ${hoveredMonth.revenue.toLocaleString("en-US")} ({hoveredMonth.sales} sales)
                    </span>
                  ) : (
                    <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-900">
                      Peak: Dec (${maxMonthlyRevenue.toLocaleString("en-US")})
                    </span>
                  )}
                </div>
              </div>

              {/* SVG Area Curve */}
              <div className="relative h-40 w-full pt-2">
                <svg className="h-full w-full overflow-visible" viewBox="0 0 300 130" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="monthlyAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  <line x1="0" y1="20" x2="300" y2="20" className="stroke-gray-200 dark:stroke-slate-700/60" strokeDasharray="3 3" />
                  <line x1="0" y1="65" x2="300" y2="65" className="stroke-gray-200 dark:stroke-slate-700/60" strokeDasharray="3 3" />
                  <line x1="0" y1="115" x2="300" y2="115" className="stroke-gray-200 dark:stroke-slate-700/60" strokeDasharray="3 3" />

                  {/* Filled Area */}
                  <path d={monthlyAreaD} fill="url(#monthlyAreaGradient)" />

                  {/* Curve Stroke Line */}
                  <path d={monthlyPathD} fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />

                  {/* Interactive Month Nodes */}
                  {monthlyPoints.map((pt) => (
                    <g
                      key={pt.month}
                      className="group/node cursor-pointer"
                      onMouseEnter={() => setHoveredMonth(pt)}
                      onMouseLeave={() => setHoveredMonth(null)}
                    >
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={hoveredMonth?.month === pt.month ? "6" : "4"}
                        className="fill-indigo-600 dark:fill-indigo-400 stroke-white dark:stroke-slate-900 transition-all duration-200"
                        strokeWidth="2"
                      />
                    </g>
                  ))}
                </svg>
              </div>

              {/* X-Axis Month Labels */}
              <div className="flex items-center justify-between text-[10px] font-medium text-gray-500 dark:text-slate-400 pt-1">
                {monthlyData.map((d) => (
                  <span
                    key={d.month}
                    className={`cursor-pointer transition-colors ${
                      hoveredMonth?.month === d.month
                        ? "text-indigo-600 dark:text-indigo-400 font-bold"
                        : "hover:text-gray-900 dark:hover:text-white"
                    }`}
                    onMouseEnter={() => setHoveredMonth(d)}
                    onMouseLeave={() => setHoveredMonth(null)}
                  >
                    {d.month}
                  </span>
                ))}
              </div>

              {/* Curve Graph Footer */}
              <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-slate-400 pt-2 border-t border-gray-200/50 dark:border-slate-700/50">
                <span>Annual Total: ${totalAnnualRevenue.toLocaleString("en-US")}</span>
                <span>Avg Monthly: ${Math.round(totalAnnualRevenue / 12).toLocaleString("en-US")}</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">+357% Growth</span>
              </div>
            </div>
          </div>

          {/* Executive Insight Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
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
                  {colorList[0]?.[0] || "Default"} ({Math.round(((colorList[0]?.[1] || 0) / totalColorInstances) * 100)}% share)
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
              Category Valuation & Comparison Graph
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
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
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

                {/* Animated Bar */}
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.max(cat.valuePercentage, 5)}%`,
                      backgroundColor: cat.color,
                    }}
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
              Price Range Tiers Bar Graph
            </h4>
            <span className="text-xs text-gray-500 dark:text-slate-400">
              Distribution across budget, mid-tier, and luxury brackets
            </span>
          </div>

          {/* Bar Graph Visual */}
          <div className="flex h-48 items-end gap-x-4 rounded-xl border border-gray-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 p-5">
            {priceTiers.map((tier) => {
              const heightPercent =
                tier.count > 0 ? Math.round((tier.count / maxTierCount) * 100) : 10;
              return (
                <div key={tier.label} className="flex flex-1 flex-col items-center gap-y-2 h-full justify-end">
                  <span className="text-xs font-bold text-gray-700 dark:text-slate-200">
                    {tier.count} <span className="text-[10px] text-gray-400 font-normal">items</span>
                  </span>
                  <div
                    className={`w-full rounded-t-xl ${tier.color} transition-all duration-500 hover:opacity-90 shadow-sm`}
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-xs font-semibold text-gray-700 dark:text-slate-300 text-center line-clamp-1">
                    {tier.label.split(" ")[0]}
                  </span>
                </div>
              );
            })}
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
