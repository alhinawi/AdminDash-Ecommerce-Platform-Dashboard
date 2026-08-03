import { useState } from "react";
import Button from "./ui/Button";

interface NavbarProps {
  onAddProduct: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar = ({ onAddProduct, darkMode, toggleDarkMode }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 dark:border-slate-800 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto flex items-center justify-between px-5 py-3.5">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/20">
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
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              Product<span className="text-indigo-600 dark:text-indigo-400">Hub</span>
            </span>
            <span className="hidden sm:inline-block ml-2 rounded-full bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900">
              v2.0
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-x-8 text-sm font-medium text-gray-600 dark:text-slate-300">
          <a href="#" className="text-indigo-600 dark:text-indigo-400 font-semibold transition-colors">
            Catalog
          </a>
          <a href="#products-grid" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Products
          </a>
          <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Categories
          </a>
          <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Analytics
          </a>
        </nav>

        {/* Actions (Dark Mode Toggle & Add Product) */}
        <div className="hidden sm:flex items-center gap-x-3">
          {/* Night Mode Toggle Button */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-amber-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all cursor-pointer"
            aria-label="Toggle Dark Mode"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? (
              /* Sun Icon */
              <svg className="h-5 w-5 fill-current text-amber-400" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              /* Moon Icon */
              <svg className="h-5 w-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>

          <Button
            onClick={onAddProduct}
            width="w-auto"
            className="bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-all"
          >
            + Add Product
          </Button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-x-2 sm:hidden">
          <button
            type="button"
            onClick={toggleDarkMode}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-amber-400 cursor-pointer"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 flex flex-col gap-y-3 animate-in fade-in slide-in-from-top-2">
          <a href="#" className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
            Catalog
          </a>
          <a href="#products-grid" className="text-gray-600 dark:text-slate-300 hover:text-indigo-600 text-sm">
            Products
          </a>
          <a href="#" className="text-gray-600 dark:text-slate-300 hover:text-indigo-600 text-sm">
            Categories
          </a>
          <a href="#" className="text-gray-600 dark:text-slate-300 hover:text-indigo-600 text-sm">
            Analytics
          </a>
          <div className="pt-2">
            <Button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onAddProduct();
              }}
              className="bg-indigo-600 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700"
            >
              + Add Product
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
