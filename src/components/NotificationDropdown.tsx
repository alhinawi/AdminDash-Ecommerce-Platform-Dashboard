import { useState } from "react";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "order" | "stock" | "sale" | "system";
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "New Order Received",
    message: "Customer ordered Sony WH-1000XM5 Headphones ($399)",
    time: "2m ago",
    read: false,
    type: "order",
  },
  {
    id: "2",
    title: "Low Stock Alert",
    message: "Stock running low for Premium Leather Bomber Jacket (2 left)",
    time: "15m ago",
    read: false,
    type: "stock",
  },
  {
    id: "3",
    title: "High Valuation Sale",
    message: "High-tier item sold: Canon EOS R6 Mark II ($2,499)",
    time: "1h ago",
    read: false,
    type: "sale",
  },
  {
    id: "4",
    title: "Analytics Sync Complete",
    message: "Catalog performance metrics updated for 12 months dataset",
    time: "3h ago",
    read: true,
    type: "system",
  },
];

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  return (
    <div className="relative">
      {/* Bell Icon Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all cursor-pointer"
        aria-label="Notifications"
        title="View Notifications"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-extrabold text-white ring-2 ring-white dark:ring-slate-900 animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <>
          {/* Backdrop dismiss */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          <div className="absolute right-0 mt-2 z-50 w-80 sm:w-96 rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xl animate-in fade-in slide-in-from-top-2">
            {/* Popover Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-slate-800">
              <div className="flex items-center gap-x-2">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Notifications</h4>
                {unreadCount > 0 && (
                  <span className="rounded-full bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium cursor-pointer"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* Notification Items List */}
            <div className="mt-3 space-y-2 max-h-80 overflow-y-auto pr-1">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleRead(item.id)}
                  className={`flex items-start gap-x-3 rounded-xl p-2.5 transition-colors cursor-pointer ${
                    !item.read
                      ? "bg-indigo-50/60 dark:bg-slate-800/80 border border-indigo-100/80 dark:border-slate-700/80"
                      : "bg-gray-50/50 dark:bg-slate-800/30 hover:bg-gray-100/60 dark:hover:bg-slate-800/50"
                  }`}
                >
                  {/* Icon per type */}
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-100 dark:bg-slate-700 text-indigo-600 dark:text-indigo-300">
                    {item.type === "order" && "🛒"}
                    {item.type === "stock" && "⚠️"}
                    {item.type === "sale" && "💰"}
                    {item.type === "system" && "⚡"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{item.title}</p>
                      <span className="text-[10px] text-gray-400 dark:text-slate-500 whitespace-nowrap">{item.time}</span>
                    </div>
                    <p className="text-[11px] text-gray-600 dark:text-slate-300 mt-0.5 line-clamp-2">{item.message}</p>
                  </div>

                  {!item.read && <span className="h-2 w-2 shrink-0 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-1.5" />}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-3 pt-2 text-center border-t border-gray-100 dark:border-slate-800">
              <span className="text-[11px] text-gray-400 dark:text-slate-500 font-medium">
                Live product catalog alerts synchronized
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;
