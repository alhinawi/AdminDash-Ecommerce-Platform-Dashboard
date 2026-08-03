import type { Category } from "../interfaces";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
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
  categories,
  totalResults,
  totalProducts,
}: FilterBarProps) => {
  const hasActiveFilters = searchQuery.trim() !== "" || selectedCategory !== "all" || sortBy !== "default";

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("default");
  };

  return (
    <div className="mb-6 rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm space-y-4">
      {/* Search & Selectors Container */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-slate-500">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            placeholder="Search products by title or description..."
            className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50 py-2.5 pl-9 pr-9 text-xs text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:border-indigo-600 dark:focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filters & Sorting Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50 px-3 py-2.5 text-xs font-medium text-gray-800 dark:text-slate-200 focus:border-indigo-600 focus:outline-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id || cat.name} value={cat.name.toLowerCase()}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50 px-3 py-2.5 text-xs font-medium text-gray-800 dark:text-slate-200 focus:border-indigo-600 focus:outline-none cursor-pointer"
          >
            <option value="default">Sort by: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="title-asc">Title: A to Z</option>
            <option value="title-desc">Title: Z to A</option>
          </select>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/40 px-3 py-2.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-all cursor-pointer"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Results summary strip */}
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400 pt-2 border-t border-gray-100 dark:border-slate-800">
        <div>
          Showing <span className="font-bold text-gray-900 dark:text-white">{totalResults}</span> of{" "}
          <span className="font-bold text-gray-900 dark:text-white">{totalProducts}</span> Products
        </div>
        {selectedCategory !== "all" && (
          <span className="rounded-full bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
            Category: {selectedCategory}
          </span>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
