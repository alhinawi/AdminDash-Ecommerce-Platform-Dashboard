import { useEffect, useRef, useState } from "react";

import {
  BarChart2,
  Moon,
  Package,
  Settings,
  Sun,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import { useThemeContext } from "../context/ThemeContext";
import LanguageSwitcher from "./LanguageSwitcher";
import NotificationDropdown from "./NotificationDropdown";
import ProfileMenu from "./ProfileMenu";

interface NavbarProps {
  onAddProduct: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar = ({ darkMode, toggleDarkMode }: NavbarProps) => {
  const { t } = useTranslation();
  const { themePreset } = useThemeContext();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const isUsersPage = location.pathname === "/users";
  const isSettingsPage = location.pathname === "/settings";
  const isProductsPage = location.pathname === "/";

  // Close mobile menu on Escape key press
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);


  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900/90">
      <div className="container mx-auto flex items-center justify-between px-3 py-2.5 sm:py-3 md:px-4 lg:px-5">
        {/* 1. Logo & Mobile Toggle */}
        <div className="flex items-center gap-x-2 sm:gap-x-3">
         

          <Link to="/" className="group flex items-center gap-x-2 sm:gap-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-tr from-zinc-900 to-zinc-700 text-white shadow-md transition-transform group-hover:scale-105 sm:h-9 sm:w-9 dark:from-zinc-100 dark:to-zinc-300 dark:text-zinc-900">
              <Package className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-zinc-900 sm:text-lg dark:text-white">
                {t("nav.brandName", "Admin")}
                <span className={`ms-0.5 ${themePreset.text}`}>
                  {t("nav.brandHighlight", "Dash")}
                </span>
              </span>
              <span className="ms-2 hidden rounded-full border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-600 lg:inline-block dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                {t("common.version", "v2.4")}
              </span>
            </div>
          </Link>
        </div>

        {/* 2. Desktop & Tablet Navigation */}
        <nav className="hidden items-center gap-x-0.5 rounded-xl border border-zinc-200/60 bg-zinc-100/80 p-1 text-xs font-medium md:flex lg:gap-x-1 dark:border-zinc-800 dark:bg-zinc-800/60">
          <Link
            to="/"
            title={t("nav.productsAnalytics", "Products & Analytics")}
            className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg p-2 transition-all xl:gap-2 xl:px-3.5 xl:py-1.5 ${
              isProductsPage
                ? "bg-white font-semibold text-zinc-900 shadow-xs dark:bg-zinc-900 dark:text-zinc-100"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            <BarChart2 className="h-4 w-4 shrink-0 xl:h-3.5 xl:w-3.5" />
            <span className="hidden lg:inline">
              {t("nav.productsAnalytics", "Products & Analytics")}
            </span>
          </Link>

          <Link
            to="/users"
            title={t("nav.usersManagement", "Users Management")}
            className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg p-2 transition-all xl:gap-2 xl:px-3.5 xl:py-1.5 ${
              isUsersPage
                ? "bg-white font-semibold text-zinc-900 shadow-xs dark:bg-zinc-900 dark:text-zinc-100"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            <Users className="h-4 w-4 shrink-0 xl:h-3.5 xl:w-3.5" />
            <span className="hidden lg:inline">
              {t("nav.usersManagement", "Users Management")}
            </span>
            <span
              className={`ms-1 shrink-0 rounded-full ${themePreset.badgeBg} ${themePreset.badgeText} hidden px-1.5 text-[10px] font-bold sm:inline-block`}
            >
              100
            </span>
          </Link>

          <Link
            to="/settings"
            title={t("nav.settings", "Settings")}
            className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg p-2 transition-all xl:gap-2 xl:px-3.5 xl:py-1.5 ${
              isSettingsPage
                ? "bg-white font-semibold text-zinc-900 shadow-xs dark:bg-zinc-900 dark:text-zinc-100"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            <Settings className="h-4 w-4 shrink-0 xl:h-3.5 xl:w-3.5" />
            <span className="hidden lg:inline">
              {t("nav.settings", "Settings")}
            </span>
          </Link>
        </nav>

        {/* 3. Actions: [ Language Switcher ] [ Notifications ] [ Theme Toggle ] [ Profile Menu ] */}
        <div className="flex items-center gap-x-1 lg:gap-x-2">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Notifications Dropdown */}
          <NotificationDropdown />

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-700 transition-all duration-200 hover:bg-zinc-100 sm:h-9 sm:w-9 dark:border-zinc-700 dark:bg-zinc-800 dark:text-amber-400 dark:hover:bg-zinc-700"
            aria-label={t("nav.toggleTheme", "Toggle Dark Mode")}
            title={
              darkMode
                ? t("nav.switchLight", "Switch to Light Mode")
                : t("nav.switchDark", "Switch to Dark Mode")
            }
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

      {/* Mobile Navigation Drawer Dropdown */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="animate-in fade-in slide-in-from-top-2 border-b border-zinc-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-md md:hidden dark:border-zinc-800 dark:bg-zinc-900/95"
        >
          <nav className="flex flex-col gap-1.5 text-sm font-medium">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors ${
                isProductsPage
                  ? `${themePreset.badgeBg} font-semibold ${themePreset.text}`
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              <div className="flex items-center gap-3">
                <BarChart2 className="h-4.5 w-4.5" />
                <span>{t("nav.productsAnalytics", "Products & Analytics")}</span>
              </div>
            </Link>

            <Link
              to="/users"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors ${
                isUsersPage
                  ? `${themePreset.badgeBg} font-semibold ${themePreset.text}`
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="h-4.5 w-4.5" />
                <span>{t("nav.usersManagement", "Users Management")}</span>
              </div>
              <span
                className={`rounded-full ${themePreset.badgeBg} px-2 py-0.5 text-xs font-bold ${themePreset.badgeText}`}
              >
                100
              </span>
            </Link>

            <Link
              to="/settings"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors ${
                isSettingsPage
                  ? `${themePreset.badgeBg} font-semibold ${themePreset.text}`
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className="h-4.5 w-4.5" />
                <span>{t("nav.settings", "Settings")}</span>
              </div>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
