import { Link, useLocation } from "react-router-dom";
import { Users, Package, BarChart2, Sun, Moon, Settings } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import ProfileMenu from "./ProfileMenu";
import { useThemeContext } from "../context/ThemeContext";

interface NavbarProps {
  onAddProduct: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar = ({ darkMode, toggleDarkMode }: NavbarProps) => {
  const { themePreset } = useThemeContext();
  const location = useLocation();
  const isUsersPage = location.pathname === "/users";
  const isSettingsPage = location.pathname === "/settings";
  const isProductsPage = location.pathname === "/";

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
                <span className={`ml-0.5 ${themePreset.text}`}>Dash</span>
              </span>
              <span className="ml-2 hidden rounded-full border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-600 sm:inline-block dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                v2.4
              </span>
            </div>
          </Link>
        </div>

        {/* 2. Desktop Navigation */}
        <nav className="hidden items-center gap-x-1 rounded-xl border border-zinc-200/60 bg-zinc-100/80 p-1 text-xs font-medium lg:flex dark:border-zinc-800 dark:bg-zinc-800/60">
          <Link
            to="/"
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 transition-all ${
              isProductsPage
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
            <span
              className={`py-0.2 ml-1 rounded-full ${themePreset.badgeBg} ${themePreset.badgeText} px-1.5 text-[10px] font-bold`}
            >
              100
            </span>
          </Link>

          <Link
            to="/settings"
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 transition-all ${
              isSettingsPage
                ? "bg-white font-semibold text-zinc-900 shadow-xs dark:bg-zinc-900 dark:text-zinc-100"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            <Settings className="h-3.5 w-3.5" />
            Settings
          </Link>
        </nav>

        {/* 3. Actions: [ Notifications ] [ Theme Toggle ] [ + Add Product ] [ Profile ▼ ] */}
        <div className="flex items-center gap-x-2.5">
          <NotificationDropdown />

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-700 transition-all duration-200 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-amber-400 dark:hover:bg-zinc-700"
            aria-label="Toggle Dark Mode"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? (
              <Sun className="h-4 w-4 text-amber-400 transition-transform duration-200 hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 text-zinc-600 transition-transform duration-200 hover:-rotate-12 dark:text-zinc-300" />
            )}
          </button>

          {/* Profile Menu Dropdown */}
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
