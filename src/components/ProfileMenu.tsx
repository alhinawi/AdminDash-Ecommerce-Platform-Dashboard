import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  Settings,
  LogOut,
  ShieldCheck,
  BarChart2,
  Users,
} from "lucide-react";

export interface ProfileUser {
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  status: "online" | "away" | "offline";
}

const defaultProfileUser: ProfileUser = {
  name: "Mohamed Alhinawi",
  email: "mohamed.alhinawi@company.com",
  role: "Administrator",
  avatarUrl: "https://avatars.githubusercontent.com/u/68702059?v=4",
  status: "online",
};

interface ProfileMenuProps {
  user?: ProfileUser;
  onItemClick?: (itemKey: string) => void;
}

export default function ProfileMenu({
  user = defaultProfileUser,
  onItemClick,
}: ProfileMenuProps) {
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

  const isUsersPage = location.pathname === "/users";
  const isAnalyticsPage = location.pathname === "/" || !isUsersPage;

  const handleActionClick = (key: string) => {
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
        className="group flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-zinc-200/80 bg-white/50 p-1.5 outline-hidden transition-all duration-200 select-none hover:bg-zinc-100/80 focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-800/60 dark:focus-visible:ring-zinc-600"
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
            className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900"
            title="Status: Online"
          />
        </div>

        {/* User Info (Visible on Tablet / Desktop) */}
        <div className="hidden flex-col text-left sm:flex">
          <span className="text-xs leading-none font-semibold tracking-tight text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
            {user.name}
          </span>
          <span className="mt-0.5 text-[11px] leading-tight font-medium text-zinc-500 dark:text-zinc-400">
            {user.role}
          </span>
        </div>

        {/* Rotating Chevron */}
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown Menu Container */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          className="animate-in fade-in slide-in-from-top-2 absolute right-0 z-50 mt-2 w-65 origin-top-right overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/95 p-1.5 shadow-2xl shadow-zinc-900/10 backdrop-blur-md transition-all duration-200 dark:border-zinc-800 dark:bg-zinc-900/95 dark:shadow-black/60"
        >
          {/* Dropdown Header: Email & Role */}
          <div className="rounded-xl border-b border-zinc-100 bg-zinc-50/50 px-3.5 py-3 dark:border-zinc-800/80 dark:bg-zinc-900/50">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
                {user.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  {user.name}
                </p>
                <p className="truncate font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="mt-2.5 flex items-center justify-between border-t border-zinc-200/50 pt-2 dark:border-zinc-800">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider text-emerald-600 uppercase dark:text-emerald-400">
                <ShieldCheck className="h-3 w-3" /> {user.role}
              </span>
              <span className="font-mono text-[10px] text-zinc-400">
                Workspace Owner
              </span>
            </div>
          </div>

          {/* Navigation Links Group */}
          <div className="mt-1 space-y-1 p-1" role="none">
            {/* Products & Analytics */}
            <Link
              to="/"
              role="menuitem"
              onClick={closeMenu}
              className={`flex min-h-11 w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all duration-150 ${
                isAnalyticsPage
                  ? "bg-blue-50/80 font-semibold text-blue-600 dark:bg-blue-500/15 dark:text-blue-400"
                  : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <BarChart2
                  className={`h-4 w-4 ${
                    isAnalyticsPage
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-zinc-400"
                  }`}
                />
                <span>Products & Analytics</span>
              </div>
            </Link>

            {/* Users Management */}
            <Link
              to="/users"
              role="menuitem"
              onClick={closeMenu}
              className={`flex min-h-11 w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all duration-150 ${
                isUsersPage
                  ? "bg-blue-50/80 font-semibold text-blue-600 dark:bg-blue-500/15 dark:text-blue-400"
                  : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <Users
                  className={`h-4 w-4 ${
                    isUsersPage
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-zinc-400"
                  }`}
                />
                <span>Users Management</span>
              </div>

              <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                100
              </span>
            </Link>
          </div>

          {/* Divider */}
          <div className="my-1 border-t border-zinc-100 dark:border-zinc-800/80" />

          {/* Additional Options */}
          <div className="space-y-1 p-1" role="none">
            {/* Settings */}
            <button
              type="button"
              role="menuitem"
              onClick={() => handleActionClick("settings")}
              className="flex min-h-11 w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium text-zinc-700 transition-all duration-150 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-100"
            >
              <div className="flex items-center gap-3">
                <Settings className="h-4 w-4 text-zinc-400" />
                <span>Settings</span>
              </div>
            </button>

            {/* Logout */}
            <button
              type="button"
              role="menuitem"
              onClick={() => handleActionClick("logout")}
              className="flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
            >
              <LogOut className="h-4 w-4 text-rose-500" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
