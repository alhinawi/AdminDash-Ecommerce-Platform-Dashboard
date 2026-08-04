import { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronDown,
  User as UserIcon,
  Settings,
  Bell,
  CreditCard,
  HelpCircle,
  LogOut,
  ShieldCheck,
  Check,
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
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  const handleSelect = (key: string) => {
    setActiveItem(key);
    if (onItemClick) {
      onItemClick(key);
    }
    closeMenu();
  };

  const menuItems = [
    { key: "profile", label: "My Profile", icon: UserIcon },
    { key: "settings", label: "Account Settings", icon: Settings },
    { key: "notifications", label: "Notifications", icon: Bell, badge: "3" },
    { key: "billing", label: "Billing", icon: CreditCard },
    { key: "help", label: "Help Center", icon: HelpCircle },
  ];

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
        className="group flex items-center gap-3 p-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60 transition-all duration-200 outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600 cursor-pointer select-none"
      >
        {/* Avatar with Status Indicator */}
        <div className="relative shrink-0">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover ring-1 ring-zinc-200 dark:ring-zinc-800 transition-transform group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.name
              )}&background=18181b&color=fff`;
            }}
          />
          {/* Online Status Dot */}
          <span
            className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900"
            title="Status: Online"
          />
        </div>

        {/* User Info (Visible on Tablet / Desktop) */}
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight leading-none group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {user.name}
          </span>
          <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 leading-tight mt-0.5">
            {user.role}
          </span>
        </div>

        {/* Rotating Chevron */}
        <ChevronDown
          className={`w-4 h-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition-transform duration-200 shrink-0 ${
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
          className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-2xl shadow-zinc-900/10 dark:shadow-black/50 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 origin-top-right overflow-hidden"
        >
          {/* Dropdown Header: Email & Role */}
          <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-bold text-xs shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                  {user.name}
                </p>
                <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-zinc-200/50 dark:border-zinc-800">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-3 h-3" /> {user.role}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">Workspace Owner</span>
            </div>
          </div>

          {/* Menu Options Group */}
          <div className="p-1 space-y-0.5" role="none">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.key;

              return (
                <button
                  key={item.key}
                  role="menuitem"
                  onClick={() => handleSelect(item.key)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? "text-current" : "text-zinc-400"}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      {item.badge}
                    </span>
                  )}

                  {isActive && <Check className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="my-1 border-t border-zinc-100 dark:border-zinc-800/80" />

          {/* Logout Section */}
          <div className="p-1" role="none">
            <button
              role="menuitem"
              onClick={() => handleSelect("logout")}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-rose-500" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
