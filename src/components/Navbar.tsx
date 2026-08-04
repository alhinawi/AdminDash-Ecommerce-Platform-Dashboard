import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Users, Package, BarChart2 } from "lucide-react";
import Button from "./ui/Button";
import NotificationDropdown from "./NotificationDropdown";
import ProfileMenu from "./ProfileMenu";

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
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900/90">
      <div className="container mx-auto flex items-center justify-between px-5 py-3">
        {/* 1. Logo */}
        <div className="flex items-center gap-x-3">
          <Link to="/" className="group flex items-center gap-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-tr from-zinc-900 to-zinc-700 text-white shadow-md transition-transform group-hover:scale-105 dark:from-zinc-100 dark:to-zinc-300 dark:text-zinc-900">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                Admin
                <span className="text-blue-600 dark:text-blue-400">Dash</span>
              </span>
              <span className="ml-2 hidden rounded-full border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-600 sm:inline-block dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                v2.4
              </span>
            </div>
          </Link>
        </div>

        {/* 2. Navigation */}
        <nav className="hidden items-center gap-x-1 rounded-xl border border-zinc-200/60 bg-zinc-100/80 p-1 text-xs font-medium md:flex dark:border-zinc-800 dark:bg-zinc-800/60">
          <Link
            to="/"
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 transition-all ${
              !isUsersPage
                ? "bg-white font-semibold text-zinc-900 shadow-xs dark:bg-zinc-900 dark:text-zinc-100"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            <BarChart2 className="h-3.5 w-3.5" />
            Products & Analytics
          </Link>

          <Link
            to="/users"
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 transition-all ${
              isUsersPage
                ? "bg-white font-semibold text-zinc-900 shadow-xs dark:bg-zinc-900 dark:text-zinc-100"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            Users Management
            <span className="py-0.2 ml-1 rounded-full bg-blue-500/10 px-1.5 text-[10px] font-bold text-blue-600 dark:text-blue-400">
              100
            </span>
          </Link>
        </nav>

        {/* 3. Actions: [ Notifications ] [ Theme Toggle ] [ Add Product ] [ Profile ▼ ] */}
        <div className="hidden items-center gap-x-3 sm:flex">
          <NotificationDropdown />

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-700 transition-all hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-amber-400 dark:hover:bg-zinc-700"
            aria-label="Toggle Dark Mode"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {!isUsersPage && (
            <Button
              onClick={onAddProduct}
              width="w-auto"
              className="bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              + Add Product
            </Button>
          )}

          {/* Profile Menu Dropdown */}
          <ProfileMenu />
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-x-2 sm:hidden">
          <NotificationDropdown />

          <button
            type="button"
            onClick={toggleDarkMode}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-amber-400"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <ProfileMenu />

          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 focus:outline-none dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            aria-label="Toggle Navigation Menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="animate-in fade-in slide-in-from-top-2 flex flex-col gap-y-3 border-t border-zinc-200 bg-white px-5 py-4 md:hidden dark:border-zinc-800 dark:bg-zinc-900">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-sm font-medium ${
              !isUsersPage
                ? "font-bold text-blue-600"
                : "text-zinc-600 dark:text-zinc-300"
            }`}
          >
            Products & Analytics
          </Link>
          <Link
            to="/users"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-sm font-medium ${
              isUsersPage
                ? "font-bold text-blue-600"
                : "text-zinc-600 dark:text-zinc-300"
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
