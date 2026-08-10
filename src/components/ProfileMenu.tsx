import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ChevronDown,
  Settings,
  LogOut,
  ShieldCheck,
  BarChart2,
  Users,
} from "lucide-react";

import { useThemeContext } from "../context/ThemeContext";

export interface ProfileUser {
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  status: "online" | "away" | "offline";
}

interface ProfileMenuProps {
  user?: ProfileUser;
  onItemClick?: (itemKey: string) => void;
}

export default function ProfileMenu({
  user: userProp,
  onItemClick,
}: ProfileMenuProps) {
  const { t } = useTranslation();
  const { userProfile, themePreset } = useThemeContext();
  const user = userProp || { ...userProfile, status: "online" as const };
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeMenu]);

  // Keyboard navigation support
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        closeMenu();
        buttonRef.current?.focus();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeMenu]);

  const navigate = useNavigate();
  const isUsersPage = location.pathname === "/users";
  const isSettingsPage = location.pathname === "/settings";
  const isAnalyticsPage =
    location.pathname === "/" || (!isUsersPage && !isSettingsPage);

  const handleActionClick = (key: string) => {
    if (key === "logout") {
      navigate("/login");
    } else if (key === "settings") {
      navigate("/settings");
    }
    if (onItemClick) {
      onItemClick(key);
    }
    closeMenu();
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Profile Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User profile menu"
        className="group flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-200/80 bg-white/50 p-1.5 outline-hidden transition-all duration-200 select-none hover:bg-zinc-100/80 focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-800/60 dark:focus-visible:ring-zinc-600"
      >
        {/* Avatar with Status Indicator */}
        <div className="relative shrink-0">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="h-9 w-9 rounded-full object-cover ring-1 ring-zinc-200 transition-transform group-hover:scale-105 dark:ring-zinc-800"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name,
                )}&background=18181b&color=fff`;
            }}
          />
          {/* Online Status Dot */}
          <span
            className="absolute inset-e-0 bottom-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900"
            title={t("common.online", "Online")}
          />
        </div>

        {/* User Info (Visible on Tablet / Desktop) */}
        <div className="hidden flex-col text-left md:flex">
          <span className="truncate text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            {user.name}
          </span>
          <span className="truncate text-[10px] text-zinc-500 dark:text-zinc-400">
            {user.role}
          </span>
        </div>

        {/* Dropdown Caret Icon */}
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Profile Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          className="absolute inset-e-0 z-50 mt-2 w-72 origin-top-right rounded-2xl border border-zinc-200 bg-white/95 p-1.5 shadow-2xl outline-hidden backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/95"
        >
          {/* Header Section */}
          <div className="flex items-center gap-3 rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/60">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white shadow-inner dark:bg-zinc-100 dark:text-zinc-900">
              {user.name.charAt(0)}
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-xs font-bold text-zinc-900 dark:text-zinc-100">
                {user.name}
              </span>
              <span className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">
                {user.email}
              </span>
              <div className="mt-1 flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>{user.role}</span>
              </div>
            </div>
          </div>

          <div className="my-1 border-t border-zinc-100 dark:border-zinc-800/80" />

          {/* Navigation Links Group */}
          <div className="space-y-1 p-1" role="none">
            {/* Products & Analytics */}
            <Link
              to="/"
              role="menuitem"
              onClick={closeMenu}
              className={`flex min-h-11 w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all duration-150 ${
                isAnalyticsPage
                  ? `${themePreset.badgeBg} font-semibold ${themePreset.text}`
                  : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <BarChart2
                  className={`h-4 w-4 ${
                    isAnalyticsPage ? themePreset.text : "text-zinc-400"
                  }`}
                />
                <span>
                  {t("nav.productsAnalytics", "Products & Analytics")}
                </span>
              </div>
            </Link>

            {/* Users Management */}
            <Link
              to="/users"
              role="menuitem"
              onClick={closeMenu}
              className={`flex min-h-11 w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all duration-150 ${
                isUsersPage
                  ? `${themePreset.badgeBg} font-semibold ${themePreset.text}`
                  : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <Users
                  className={`h-4 w-4 ${
                    isUsersPage ? themePreset.text : "text-zinc-400"
                  }`}
                />
                <span>{t("nav.usersManagement", "Users Management")}</span>
              </div>

              <span
                className={`rounded-full ${themePreset.badgeBg} px-2 py-0.5 text-[10px] font-bold ${themePreset.badgeText}`}
              >
                100
              </span>
            </Link>
          </div>

          <div className="my-1 border-t border-zinc-100 dark:border-zinc-800/80" />

          {/* Additional Options */}
          <div className="space-y-1 p-1" role="none">
            {/* Settings */}
            <Link
              to="/settings"
              role="menuitem"
              onClick={closeMenu}
              className={`flex min-h-11 w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all duration-150 ${
                isSettingsPage
                  ? `${themePreset.badgeBg} font-semibold ${themePreset.text}`
                  : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings
                  className={`h-4 w-4 ${
                    isSettingsPage ? themePreset.text : "text-zinc-400"
                  }`}
                />
                <span>{t("nav.settings", "Settings")}</span>
              </div>
            </Link>

            {/* Logout */}
            <button
              type="button"
              role="menuitem"
              onClick={() => handleActionClick("logout")}
              className="flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
            >
              <LogOut className="h-4 w-4 text-rose-500" />
              <span>{t("nav.signOut", "Sign Out")}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
