import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Users, Package, BarChart2 } from "lucide-react";
import Button from "./ui/Button";
import NotificationDropdown from "./NotificationDropdown";

interface NavbarProps {
  onAddProduct: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar = ({ onAddProduct, darkMode, toggleDarkMode }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isUsersPage = location.pathname === "/users";

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto flex items-center justify-between px-5 py-3.5">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-x-3">
          <Link to="/" className="flex items-center gap-x-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 text-white dark:text-zinc-900 shadow-md transition-transform group-hover:scale-105">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                Admin<span className="text-blue-600 dark:text-blue-400">Dash</span>
              </span>
              <span className="hidden sm:inline-block ml-2 rounded-full bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-semibold text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                v2.4
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-x-1 p-1 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-800 text-xs font-medium">
          <Link
            to="/"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
              !isUsersPage
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs font-semibold"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            Products & Analytics
          </Link>

          <Link
            to="/users"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
              isUsersPage
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs font-semibold"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Users Management
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold">
              100
            </span>
          </Link>
        </nav>

        {/* Actions (Notifications, Dark Mode Toggle & Add Product) */}
        <div className="hidden sm:flex items-center gap-x-3">
          <NotificationDropdown />

          {/* Night Mode Toggle Button */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-amber-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all cursor-pointer"
            aria-label="Toggle Dark Mode"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {!isUsersPage && (
            <Button
              onClick={onAddProduct}
              width="w-auto"
              className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-xs"
            >
              + Add Product
            </Button>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-x-2 sm:hidden">
          <NotificationDropdown />

          <button
            type="button"
            onClick={toggleDarkMode}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-amber-400 cursor-pointer"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 focus:outline-none"
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
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-4 flex flex-col gap-y-3 animate-in fade-in slide-in-from-top-2">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-sm font-medium ${
              !isUsersPage ? "text-blue-600 font-bold" : "text-zinc-600 dark:text-zinc-300"
            }`}
          >
            Products & Analytics
          </Link>
          <Link
            to="/users"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-sm font-medium ${
              isUsersPage ? "text-blue-600 font-bold" : "text-zinc-600 dark:text-zinc-300"
            }`}
          >
            Users Management (100)
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
