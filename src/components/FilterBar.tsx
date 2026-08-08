import type { Category } from "../interfaces";
import Select, { type SelectOption } from "./ui/Select";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  stockStatus?: string;
  setStockStatus?: (status: string) => void;
  categories: Category[];
  totalResults: number;
  totalProducts: number;
}

const FilterBar = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  stockStatus = "all",
  setStockStatus,
  categories,
  totalResults,
  totalProducts,
}: FilterBarProps) => {
  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "all" ||
    sortBy !== "default" ||
    stockStatus !== "all";

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("default");
    if (setStockStatus) setStockStatus("all");
  };

  const categoryOptions: SelectOption[] = [
    { value: "all", label: "All Categories" },
    ...categories.map((cat) => ({
      value: cat.name.toLowerCase(),
      label: cat.name,
      imageURL: cat.imageURL,
    })),
  ];

  const stockOptions: SelectOption[] = [
    { value: "all", label: "All Stock Status" },
    { value: "in-stock", label: "In Stock (> 10)" },
    { value: "low-stock", label: "Low Stock (1 - 10)" },
    { value: "out-of-stock", label: "Out of Stock (0)" },
  ];

  const sortOptions: SelectOption[] = [
    { value: "default", label: "Sort by: Default" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "newest", label: "Newest Arrival" },
    { value: "rating", label: "Highest Rated" },
    { value: "title-asc", label: "Title: A to Z" },
  ];

  return (
    <div className="mb-6 space-y-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      {/* Search & Selectors Container */}
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-slate-500">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name or description..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pr-9 pl-9 text-xs text-gray-900 placeholder-gray-400 focus:border-accent focus:ring-2 focus:ring-accent focus:outline-hidden dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-100 dark:placeholder-slate-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-slate-200"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filters & Sorting Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Dropdown */}
          <Select
            options={categoryOptions}
            value={selectedCategory}
            onChange={setSelectedCategory}
            size="sm"
            className="w-44"
          />

          {/* Stock Status Dropdown */}
          {setStockStatus && (
            <Select
              options={stockOptions}
              value={stockStatus}
              onChange={setStockStatus}
              size="sm"
              className="w-44"
            />
          )}

          {/* Sort Dropdown */}
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            size="sm"
            className="w-48"
          />

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="cursor-pointer rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-xs font-semibold text-rose-600 transition-all hover:bg-rose-100 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-400 dark:hover:bg-rose-900/60"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Results summary strip */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-2 text-xs text-gray-500 dark:border-slate-800 dark:text-slate-400">
        <div>
          Showing{" "}
          <span className="font-bold text-gray-900 dark:text-white">
            {totalResults}
          </span>{" "}
          of{" "}
          <span className="font-bold text-gray-900 dark:text-white">
            {totalProducts}
          </span>{" "}
          Products
        </div>
        {selectedCategory !== "all" && (
          <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
            Category: {selectedCategory}
          </span>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
