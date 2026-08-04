import { X, Mail, Globe, Calendar, Clock, Shield, Sparkles, CheckCircle2, AlertTriangle, Trash2 } from "lucide-react";
import type { User } from "../../types/user";

interface UserDetailDrawerProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (user: User) => void;
  onStatusChange: (userId: string, newStatus: User["status"]) => void;
  onDelete: (userId: string) => void;
}

export default function UserDetailDrawer({
  user,
  isOpen,
  onClose,
  onEdit,
  onStatusChange,
  onDelete,
}: UserDetailDrawerProps) {
  if (!isOpen || !user) return null;

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  const getStatusBadge = (status: User["status"]) => {
    switch (status) {
      case "Active":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active
          </span>
        );
      case "Inactive":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border border-zinc-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            Inactive
          </span>
        );
      case "Suspended":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Suspended
          </span>
        );
      case "Banned":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Banned
          </span>
        );
    }
  };

  const getPlanBadge = (plan: User["plan"]) => {
    switch (plan) {
      case "Enterprise":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
            <Sparkles className="w-3 h-3" /> Enterprise
          </span>
        );
      case "Pro":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            Pro
          </span>
        );
      case "Free":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
            Free Tier
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-zinc-200 dark:ring-zinc-800"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.fullName
                    )}&background=3f3f46&color=fff`;
                  }}
                />
                <div>
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    {user.fullName}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusBadge(user.status)}
                    {getPlanBadge(user.plan)}
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {/* Contact & Meta */}
            <div className="space-y-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-800">
              <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-300">
                <Mail className="w-4 h-4 text-zinc-400" />
                <span className="font-mono text-zinc-900 dark:text-zinc-100">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-300">
                <Globe className="w-4 h-4 text-zinc-400" />
                <span>{user.country}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-300">
                <Shield className="w-4 h-4 text-zinc-400" />
                <span>Role: <strong className="font-medium text-zinc-900 dark:text-zinc-100">{user.role}</strong></span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-300">
                <Calendar className="w-4 h-4 text-zinc-400" />
                <span>Joined: {formatDate(user.joinedAt)}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-300">
                <Clock className="w-4 h-4 text-zinc-400" />
                <span>Last Active: {formatDate(user.lastLogin)}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                Account Actions
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onEdit(user)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                >
                  Edit Account
                </button>
                <button
                  onClick={() =>
                    onStatusChange(
                      user.id,
                      user.status === "Active" ? "Suspended" : "Active"
                    )
                  }
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-lg border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {user.status === "Active" ? "Suspend" : "Activate"}
                </button>
              </div>
            </div>

            {/* Activity Log */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                Recent Audit Trail
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-xs p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-zinc-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-zinc-800 dark:text-zinc-200">
                      Logged in successfully
                    </p>
                    <span className="text-[10px] text-zinc-400">
                      {formatDate(user.lastLogin)} · IP 192.168.1.104
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-zinc-800">
                  <Sparkles className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-zinc-800 dark:text-zinc-200">
                      Plan set to {user.plan}
                    </p>
                    <span className="text-[10px] text-zinc-400">
                      {formatDate(user.joinedAt)} · Automated Billing
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Delete Action */}
          <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            <button
              onClick={() => {
                if (confirm(`Are you sure you want to delete user ${user.fullName}?`)) {
                  onDelete(user.id);
                  onClose();
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-medium rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Delete User Permanently
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
