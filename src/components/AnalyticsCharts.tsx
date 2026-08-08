import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { Product } from "../interfaces";
import GoogleFinanceChart from "./GoogleFinanceChart";
import Toggle from "./ui/Toggle";

interface AnalyticsChartsProps {
  products: Product[];
}

interface CategoryMeta {
  key: string;
  name: string;
  order: number;
  color: string;
  bgClass: string;
  borderClass: string;
  badgeClass: string;
  gradient: string;
  imageURL: string;
  demoCount: number;
  demoBasePrice: number;
}

// Single Source of Truth for Category Identities
const CATEGORY_CONFIG: Record<string, CategoryMeta> = {
  electronics: {
    key: "electronics",
    name: "Electronics",
    order: 1,
    color: "#3b82f6",
    bgClass: "bg-blue-500",
    borderClass: "border-blue-500/30 dark:border-blue-500/20",
    badgeClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    gradient: "from-blue-500 to-indigo-600",
    imageURL:
      "https://i.pinimg.com/1200x/52/8f/cf/528fcf888642c11bd4b71e50b06b1446.jpg",
    demoCount: 55,
    demoBasePrice: 850,
  },
  clothes: {
    key: "clothes",
    name: "Clothes",
    order: 2,
    color: "#10b981",
    bgClass: "bg-emerald-500",
    borderClass: "border-emerald-500/30 dark:border-emerald-500/20",
    badgeClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    gradient: "from-emerald-500 to-teal-600",
    imageURL:
      "https://i.pinimg.com/736x/43/f9/3a/43f93a9825a88d5ce0e36e8c46d0f4cd.jpg",
    demoCount: 45,
    demoBasePrice: 160,
  },
  photography: {
    key: "photography",
    name: "Photography",
    order: 3,
    color: "#f59e0b",
    bgClass: "bg-amber-500",
    borderClass: "border-amber-500/30 dark:border-amber-500/20",
    badgeClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    gradient: "from-amber-500 to-orange-500",
    imageURL:
      "https://images.unsplash.com/photo-1544743744-48719693e9d9?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    demoCount: 35,
    demoBasePrice: 1400,
  },
  furniture: {
    key: "furniture",
    name: "Furniture",
    order: 4,
    color: "#f43f5e",
    bgClass: "bg-rose-500",
    borderClass: "border-rose-500/30 dark:border-rose-500/20",
    badgeClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    gradient: "from-rose-500 to-pink-600",
    imageURL:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=200&q=80",
    demoCount: 30,
    demoBasePrice: 750,
  },
  sneakers: {
    key: "sneakers",
    name: "Sneakers",
    order: 5,
    color: "#06b6d4",
    bgClass: "bg-cyan-500",
    borderClass: "border-cyan-500/30 dark:border-cyan-500/20",
    badgeClass: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    gradient: "from-cyan-500 to-blue-500",
    imageURL:
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=200&q=80",
    demoCount: 25,
    demoBasePrice: 220,
  },
  automotive: {
    key: "automotive",
    name: "Automotive",
    order: 6,
    color: "#8b5cf6",
    bgClass: "bg-purple-500",
    borderClass: "border-purple-500/30 dark:border-purple-500/20",
    badgeClass: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    gradient: "from-purple-500 to-violet-600",
    imageURL:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    demoCount: 35,
    demoBasePrice: 2400,
  },
  accessories: {
    key: "accessories",
    name: "Accessories",
    order: 7,
    color: "#ea580c",
    bgClass: "bg-orange-500",
    borderClass: "border-orange-500/30 dark:border-orange-500/20",
    badgeClass: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    gradient: "from-orange-500 to-amber-600",
    imageURL:
      "https://i.pinimg.com/736x/59/39/e8/5939e895dc24015b03f3c1ba3c104f37.jpg",
    demoCount: 25,
    demoBasePrice: 120,
  },
};

// Category normalization helper
const getCategoryKey = (rawName?: string): string => {
  if (!rawName) return "electronics";
  const norm = rawName.toLowerCase().trim();
  if (norm.includes("car") || norm.includes("auto") || norm.includes("vehicle"))
    return "automotive";
  if (
    norm.includes("elec") ||
    norm.includes("phone") ||
    norm.includes("laptop")
  )
    return "electronics";
  if (
    norm.includes("cloth") ||
    norm.includes("fashion") ||
    norm.includes("wear")
  )
    return "clothes";
  if (norm.includes("photo") || norm.includes("camera")) return "photography";
  if (norm.includes("furn") || norm.includes("home")) return "furniture";
  if (norm.includes("sneak") || norm.includes("shoe")) return "sneakers";
  if (norm.includes("access")) return "accessories";
  return CATEGORY_CONFIG[norm] ? norm : "electronics";
};

// Generate realistic competitive demo data (250 total items)
const generateDemoProducts = (): Product[] => {
  const demoItems: Product[] = [];
  let idCounter = 1;

  Object.values(CATEGORY_CONFIG).forEach((cat) => {
    for (let i = 0; i < cat.demoCount; i++) {
      const priceVariation = i % 5 === 0 ? 1.35 : i % 3 === 0 ? 0.8 : 1.0;
      const price = Math.round(cat.demoBasePrice * priceVariation);
      demoItems.push({
        id: `demo-${idCounter++}`,
        title: `${cat.name} Item ${i + 1}`,
        description: `Premium demo catalog product for ${cat.name}`,
        imageURL: cat.imageURL,
        price: String(price),
        colors: [cat.color],
        category: {
          name: cat.name,
          imageURL: cat.imageURL,
        },
      });
    }
  });

  return demoItems;
};

const DEMO_PRODUCTS = generateDemoProducts();

const AnalyticsCharts = ({ products }: AnalyticsChartsProps) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "categories" | "pricing"
  >("overview");
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  // Active products source (Real vs. Demo Mode)
  const activeProducts = demoMode ? DEMO_PRODUCTS : products;

  const totalProductsCount = activeProducts.length || 1;
  const totalCatalogWorth =
    activeProducts.reduce((sum, item) => sum + (Number(item.price) || 0), 0) ||
    1;

  // 1. Calculate Category Stats mapped strictly to CATEGORY_CONFIG
  const categoryStats = activeProducts.reduce(
    (acc, p) => {
      const key = getCategoryKey(p.category?.name);
      if (!acc[key]) {
        acc[key] = { count: 0, totalValue: 0 };
      }
      acc[key].count += 1;
      acc[key].totalValue += Number(p.price) || 0;
      return acc;
    },
    {} as Record<string, { count: number; totalValue: number }>,
  );

  const maxCategoryValue = Math.max(
    ...Object.values(categoryStats).map((d) => d.totalValue),
    1,
  );

  // Category List ordered 1 to 7 with stable visual identities
  const categoryList = Object.values(CATEGORY_CONFIG)
    .sort((a, b) => a.order - b.order)
    .map((config) => {
      const data = categoryStats[config.key] || { count: 0, totalValue: 0 };
      const avgPrice =
        data.count > 0 ? Math.round(data.totalValue / data.count) : 0;
      const countPercentage = Math.round(
        (data.count / totalProductsCount) * 100,
      );
      const valuePercentage = Math.round(
        (data.totalValue / totalCatalogWorth) * 100,
      );
      const barRatio = Math.max(
        Math.round((data.totalValue / maxCategoryValue) * 100),
        6,
      );

      return {
        key: config.key,
        name: config.name,
        order: config.order,
        color: config.color,
        bgClass: config.bgClass,
        borderClass: config.borderClass,
        badgeClass: config.badgeClass,
        gradient: config.gradient,
        imageURL: config.imageURL,
        count: data.count,
        totalValue: data.totalValue,
        avgPrice,
        countPercentage,
        valuePercentage,
        barRatio,
      };
    });

  // Top category by total valuation
  const topValuedCategory = [...categoryList].sort(
    (a, b) => b.totalValue - a.totalValue,
  )[0];

  // 2. Price Range Distribution Tiers
  const priceTiers = [
    {
      label: "Budget (<$500)",
      min: 0,
      max: 499,
      count: 0,
      totalValue: 0,
      color: "bg-emerald-500",
      stroke: "#10b981",
      border: "border-emerald-500/20",
    },
    {
      label: "Mid-Tier ($500-$1.5k)",
      min: 500,
      max: 1499,
      count: 0,
      totalValue: 0,
      color: "bg-indigo-500",
      stroke: "#6366f1",
      border: "border-indigo-500/20",
    },
    {
      label: "High-Tier ($1.5k-$10k)",
      min: 1500,
      max: 9999,
      count: 0,
      totalValue: 0,
      color: "bg-purple-500",
      stroke: "#a855f7",
      border: "border-purple-500/20",
    },
    {
      label: "Ultra ($10k+)",
      min: 10000,
      max: Infinity,
      count: 0,
      totalValue: 0,
      color: "bg-rose-500",
      stroke: "#f43f5e",
      border: "border-rose-500/20",
    },
  ];

  activeProducts.forEach((p) => {
    const val = Number(p.price) || 0;
    const tier = priceTiers.find((t) => val >= t.min && val <= t.max);
    if (tier) {
      tier.count += 1;
      tier.totalValue += val;
    }
  });

  const activePricingCatalogWorth =
    priceTiers.reduce((acc, t) => acc + t.totalValue, 0) || 1;
  const maxTierCount = Math.max(...priceTiers.map((t) => t.count), 1);

  // 3. Color Frequency Analysis
  const colorFrequency = activeProducts.reduce(
    (acc, p) => {
      p.colors?.forEach((c) => {
        acc[c] = (acc[c] || 0) + 1;
      });
      return acc;
    },
    {} as Record<string, number>,
  );

  const colorList = Object.entries(colorFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const totalColorInstances =
    Object.values(colorFrequency).reduce((a, b) => a + b, 0) || 1;

  // 4. SVG Donut Chart Calculation
  const donutRadius = 42;
  const circumference = 2 * Math.PI * donutRadius; // ~263.89
  const sliceGap = categoryList.length > 1 ? 3 : 0;

  const donutSlices = categoryList.map((cat, i) => {
    const itemRatio = cat.count / totalProductsCount;
    const rawLen = itemRatio * circumference;
    const sliceLen = Math.max(rawLen - sliceGap, 3);
    const strokeDasharray = `${sliceLen} ${circumference - sliceLen}`;

    const offsetBefore = categoryList
      .slice(0, i)
      .reduce(
        (sum, c) => sum + (c.count / totalProductsCount) * circumference,
        0,
      );

    return {
      ...cat,
      index: i,
      itemRatio,
      countPercentage: Math.round(itemRatio * 100),
      strokeDasharray,
      strokeDashoffset: -offsetBefore,
    };
  });

  const { t } = useTranslation();

  return (
    <div className="mb-10 rounded-2xl border border-gray-100 bg-white p-6 shadow-xs transition-all dark:border-slate-800 dark:bg-slate-900">
      {/* Header & Controls */}
      <div className="flex flex-col justify-between gap-y-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center dark:border-slate-800">
        <div>
          <div className="flex items-center gap-x-2">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-indigo-600 dark:bg-indigo-400" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {t(
                "analytics.realTimeCatalog",
                "Catalog Analytics & Visual Graphs",
              )}
            </h3>
            {demoMode && (
              <span className="animate-pulse rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                ⚡ {t("analytics.demoMode", "Demo Mode")}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-slate-400">
            {t(
              "analytics.analyticsDescription",
              "Interactive SVG charts, inventory market share, and price curves",
            )}
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Global Demo Mode Toggle */}
          <div className="flex items-center gap-x-2 rounded-xl border border-gray-200/50 bg-gray-100/80 px-3 py-1.5 text-xs font-medium transition-all dark:border-slate-700/50 dark:bg-slate-800/80">
            <span className="flex items-center gap-1.5 font-semibold text-gray-700 select-none dark:text-slate-300">
              <span
                className={`h-2 w-2 rounded-full transition-colors ${
                  demoMode
                    ? "animate-pulse bg-amber-500"
                    : "bg-gray-400 dark:bg-slate-500"
                }`}
              />
              {t("analytics.demoMode", "Demo Mode")}
            </span>
            <Toggle
              checked={demoMode}
              onChange={setDemoMode}
              size="sm"
              label="Toggle demo mode"
            />
          </div>

          {/* Tabs */}
          <div className="flex items-center rounded-xl bg-gray-100/80 p-1 text-xs font-medium dark:bg-slate-800/80">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`cursor-pointer rounded-lg px-3 py-1.5 transition-all ${
                activeTab === "overview"
                  ? "text-accent bg-white font-semibold shadow-xs dark:bg-slate-700"
                  : "text-gray-600 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              {t("nav.analyticsOverview", "Overview")}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("categories")}
              className={`cursor-pointer rounded-lg px-3 py-1.5 transition-all ${
                activeTab === "categories"
                  ? "text-accent bg-white font-semibold shadow-xs dark:bg-slate-700"
                  : "text-gray-600 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              {t("analytics.activeCategories", "Categories")} (
              {categoryList.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("pricing")}
              className={`cursor-pointer rounded-lg px-3 py-1.5 transition-all ${
                activeTab === "pricing"
                  ? "text-accent bg-white font-semibold shadow-xs dark:bg-slate-700"
                  : "text-gray-600 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              {t("analytics.valuationTrend", "Pricing Tiers")}
            </button>
          </div>
        </div>
      </div>

      {/* ----------------- TAB 1: OVERVIEW ----------------- */}
      {activeTab === "overview" && (
        <div className="animate-in fade-in space-y-8 pt-6 duration-300">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
            {/* SVG Donut Chart */}
            <div className="relative flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-gray-50/50 p-5 dark:border-slate-800 dark:bg-slate-800/40">
              <span className="mb-2 text-xs font-bold tracking-wider text-gray-900 uppercase dark:text-slate-200">
                {t("analytics.marketShare", "Category Market Share")}
              </span>

              <div className="relative flex h-48 w-48 items-center justify-center">
                <svg
                  className="h-full w-full -rotate-90 transform"
                  viewBox="0 0 100 100"
                >
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
                      className="cursor-pointer transition-all duration-300 hover:opacity-90"
                      onMouseEnter={() => setHoveredSlice(slice.index)}
                      onMouseLeave={() => setHoveredSlice(null)}
                    />
                  ))}
                </svg>

                {/* Central Donut Text */}
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                  {hoveredSlice !== null && donutSlices[hoveredSlice] ? (
                    <>
                      <span className="text-[10px] font-semibold text-gray-700 dark:text-slate-200">
                        {t(
                          "categories." + donutSlices[hoveredSlice].key,
                          donutSlices[hoveredSlice].name,
                        )}
                      </span>
                      <span className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">
                        {t("analytics.share", {
                          percent: donutSlices[hoveredSlice].countPercentage,
                          defaultValue: `${donutSlices[hoveredSlice].countPercentage}% Share`,
                        })}
                      </span>
                      <span className="text-[10px] font-medium text-gray-500 dark:text-slate-400">
                        $
                        {donutSlices[hoveredSlice].totalValue.toLocaleString(
                          "en-US",
                        )}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-[10px] font-bold text-gray-400 uppercase dark:text-slate-500">
                        {t("analytics.totalCatalogWorth", "Total Worth")}
                      </span>
                      <span className="text-sm font-extrabold text-gray-900 dark:text-white">
                        ${totalCatalogWorth.toLocaleString("en-US")}
                      </span>
                      <span className="text-[10px] font-semibold text-indigo-500">
                        {t("analytics.categoriesCount", {
                          count: categoryList.length,
                          defaultValue: `${categoryList.length} Categories`,
                        })}
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
                    className="flex cursor-pointer items-center gap-x-1.5"
                    onMouseEnter={() => setHoveredSlice(idx)}
                    onMouseLeave={() => setHoveredSlice(null)}
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="font-medium text-gray-700 dark:text-slate-300">
                      {t("categories." + cat.key, cat.name)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Finance Chart */}
            <div className="lg:col-span-2">
              <GoogleFinanceChart />
            </div>
          </div>

          {/* Executive Insight Strip */}
          <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-3">
            <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-3 dark:border-indigo-900/50 dark:bg-indigo-950/40">
              <span className="text-[11px] font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
                {t("analytics.topValuedCategory", "Top Valued Category")}
              </span>
              <p className="mt-0.5 text-sm font-bold text-gray-900 dark:text-white">
                {topValuedCategory
                  ? t(
                      "categories." + topValuedCategory.key,
                      topValuedCategory.name,
                    )
                  : "N/A"}{" "}
                (${topValuedCategory?.totalValue.toLocaleString("en-US")})
              </p>
            </div>

            <div className="rounded-xl border border-purple-100 bg-purple-50/60 p-3 dark:border-purple-900/50 dark:bg-purple-950/40">
              <span className="text-[11px] font-semibold tracking-wider text-purple-600 uppercase dark:text-purple-400">
                {t("analytics.catalogDiversity", "Catalog Diversity")}
              </span>
              <p className="mt-0.5 text-sm font-bold text-gray-900 dark:text-white">
                {t("analytics.categoriesAcrossProducts", {
                  categoryCount: categoryList.length,
                  productCount: activeProducts.length,
                  defaultValue: `${categoryList.length} Categories Across ${activeProducts.length} Products`,
                })}
              </p>
            </div>

            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3 dark:border-emerald-900/50 dark:bg-emerald-950/40">
              <span className="text-[11px] font-semibold tracking-wider text-emerald-600 uppercase dark:text-emerald-400">
                {t("analytics.primaryColorAccent", "Primary Color Accent")}
              </span>
              <div className="mt-1 flex items-center gap-x-2">
                <span
                  className="h-3.5 w-3.5 rounded-full border border-black/10"
                  style={{ backgroundColor: colorList[0]?.[0] || "#6366f1" }}
                />
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {t("analytics.colorShare", {
                    name: colorList[0]?.[0] || "Default",
                    share: Math.round(
                      ((colorList[0]?.[1] || 0) / totalColorInstances) * 100,
                    ),
                    defaultValue: `${colorList[0]?.[0] || "Default"} (${Math.round(((colorList[0]?.[1] || 0) / totalColorInstances) * 100)}% share)`,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- TAB 2: CATEGORIES DEEP DIVE ----------------- */}
      {activeTab === "categories" && (
        <div className="animate-in fade-in space-y-6 pt-6 duration-300">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold tracking-wider text-gray-900 uppercase dark:text-white">
              {t(
                "analytics.categoryValuationGraph",
                "Category Valuation & Comparison Graph",
              )}
            </h4>
            <span className="text-xs text-gray-500 dark:text-slate-400">
              {t(
                "analytics.categoryValuationSub",
                "Detailed valuation & item breakdown across 7 categories",
              )}
            </span>
          </div>

          {/* Visual Comparison Graph */}
          <div className="space-y-4 rounded-xl border border-gray-100 bg-slate-50/50 p-5 dark:border-slate-800 dark:bg-slate-800/50">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-700 dark:text-slate-300">
              <span>
                {t(
                  "analytics.categoryRelativeBar",
                  "Category Relative Valuation Comparison Bar",
                )}
              </span>
              <span>{t("analytics.shareOfCatalog", "Share of Catalog")}</span>
            </div>

            <div className="space-y-3">
              {categoryList.map((cat) => (
                <div key={cat.key} className="group space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-x-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="font-bold text-gray-900 dark:text-white">
                        {t("categories." + cat.key, cat.name)}
                      </span>
                      <span className="text-[11px] text-gray-500 dark:text-slate-400">
                        {t("analytics.itemsCount", {
                          count: cat.count,
                          defaultValue: `(${cat.count} items)`,
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-x-3 font-semibold">
                      <span className="text-gray-900 dark:text-white">
                        ${cat.totalValue.toLocaleString("en-US")}
                      </span>
                      <span className="w-10 text-right text-xs text-indigo-600 dark:text-indigo-400">
                        {cat.valuePercentage}%
                      </span>
                    </div>
                  </div>

                  {/* Animated Bar */}
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200/80 p-0.5 dark:bg-slate-700/80">
                    <div
                      className={`h-full rounded-full bg-linear-to-r transition-all duration-700 ease-out ${cat.gradient}`}
                      style={{ width: `${cat.barRatio}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categoryList.map((cat) => (
              <div
                key={cat.key}
                className="space-y-3 rounded-xl border border-gray-100 bg-gray-50/50 p-4 transition-all hover:border-indigo-200 dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-indigo-800"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-2.5">
                    {cat.imageURL && (
                      <img
                        src={cat.imageURL}
                        alt={t("categories." + cat.key, cat.name)}
                        className="h-8 w-8 rounded-full object-cover ring-2 ring-indigo-500/20"
                      />
                    )}
                    <div>
                      <h5 className="text-sm font-bold text-gray-900 dark:text-white">
                        {t("categories." + cat.key, cat.name)}
                      </h5>
                      <span className="text-[11px] text-gray-500 dark:text-slate-400">
                        {cat.count} {t("analytics.items", "Items")}
                      </span>
                    </div>
                  </div>
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                </div>

                <div className="space-y-1.5 border-t border-gray-200/60 pt-2 text-xs dark:border-slate-700/60">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-slate-400">
                      {t("analytics.totalWorthLabel", "Total Worth:")}
                    </span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      ${cat.totalValue.toLocaleString("en-US")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-slate-400">
                      {t("analytics.avgUnitPrice", "Avg. Unit Price:")}
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-slate-200">
                      ${cat.avgPrice.toLocaleString("en-US")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-slate-400">
                      {t("analytics.shareOfInventory", "Share of Inventory:")}
                    </span>
                    <span className="font-semibold text-purple-600 dark:text-purple-400">
                      {cat.valuePercentage}%
                    </span>
                  </div>
                </div>

                {/* Animated Progress Bar */}
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
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
        <div className="animate-in fade-in space-y-6 pt-6 duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <h4 className="text-sm font-bold tracking-wider text-gray-900 uppercase dark:text-white">
                {t("analytics.priceRangeGraph", "Price Range Tiers Bar Graph")}
              </h4>
              {demoMode && (
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                  {t("analytics.demoModeItems", "Demo Mode (250 Items)")}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500 dark:text-slate-400">
              {demoMode
                ? t(
                    "analytics.demoDistribution",
                    "Simulated distribution across budget, mid-tier, high-tier & ultra brackets",
                  )
                : t(
                    "analytics.normalDistribution",
                    "Distribution across budget, mid-tier, high-tier & ultra brackets",
                  )}
            </span>
          </div>

          {/* Bar Graph Visual */}
          <div className="flex h-56 items-end gap-x-4 rounded-xl border border-gray-100 bg-slate-50/50 p-5 pb-6 dark:border-slate-800 dark:bg-slate-800/50">
            {priceTiers.map((tier) => {
              const heightPercent =
                tier.count > 0
                  ? Math.round((tier.count / maxTierCount) * 100)
                  : 10;
              return (
                <div
                  key={tier.label}
                  className="flex h-full flex-1 flex-col items-center justify-between gap-y-2"
                >
                  <span className="text-xs font-bold text-gray-700 dark:text-slate-200">
                    {tier.count}{" "}
                    <span className="text-[10px] font-normal text-gray-400">
                      {t("common.items", "items")}
                    </span>
                  </span>

                  <div className="flex w-full flex-1 items-end">
                    <div
                      className={`w-full rounded-t-xl ${tier.color} shadow-xs transition-all duration-500 hover:opacity-90`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>

                  <span className="py-0.5 text-center text-xs leading-normal font-semibold text-gray-700 dark:text-slate-300">
                    {tier.label.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {priceTiers.map((tier) => {
              const tierWorthPct = Math.round(
                (tier.totalValue / activePricingCatalogWorth) * 100,
              );
              const avgPrice = Math.round(tier.totalValue / (tier.count || 1));
              return (
                <div
                  key={tier.label}
                  className={`space-y-3 rounded-xl border ${tier.border} bg-gray-50/50 p-4 transition-all hover:border-indigo-200 dark:bg-slate-800/50 dark:hover:border-indigo-800`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900 uppercase dark:text-white">
                      {tier.label.split(" ")[0]}
                    </span>
                    <span className={`h-3 w-3 rounded-full ${tier.color}`} />
                  </div>

                  <div className="text-xl font-extrabold text-gray-900 dark:text-white">
                    {tier.count}{" "}
                    <span className="text-xs font-normal text-gray-500 dark:text-slate-400">
                      {t("analytics.items", "Items")}
                    </span>
                  </div>

                  <div className="space-y-1.5 border-t border-gray-200/60 pt-2 text-xs dark:border-slate-700/60">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-slate-400">
                        {t("analytics.range", "Range:")}
                      </span>
                      <span className="font-medium text-gray-800 dark:text-slate-200">
                        {tier.label.split(" ")[1]}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-slate-400">
                        {t("analytics.combinedValue", "Combined Value:")}
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        ${tier.totalValue.toLocaleString("en-US")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-slate-400">
                        {t("analytics.avgPrice", "Avg. Price:")}
                      </span>
                      <span className="font-semibold text-gray-800 dark:text-slate-200">
                        ${avgPrice.toLocaleString("en-US")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-slate-400">
                        {t("analytics.inventoryShare", "Inventory Share:")}
                      </span>
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                        {tierWorthPct}%
                      </span>
                    </div>
                  </div>

                  {/* Tier Bar */}
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${tier.color}`}
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
