import { useTranslation } from "react-i18next";
import {
  X,
  Mail,
  Globe,
  Calendar,
  Clock,
  Shield,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Trash2,
} from "lucide-react";
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
  const { t } = useTranslation();
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
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            {t("common.active", "Active")}
          </span>
        );
      case "Inactive":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-500/20 bg-zinc-500/10 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
            {t("common.inactive", "Inactive")}
          </span>
        );
      case "Suspended":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            {t("common.suspended", "Suspended")}
          </span>
        );
      case "Banned":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 px-2.5 py-1 text-xs font-medium text-rose-600 dark:text-rose-400">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            {t("common.banned", "Banned")}
          </span>
        );
    }
  };

  const getPlanBadge = (plan: User["plan"]) => {
    switch (plan) {
      case "Enterprise":
        return (
          <span className="inline-flex items-center gap-1 rounded-md border border-violet-500/20 bg-violet-500/10 px-2.5 py-0.5 text-xs font-semibold text-violet-600 dark:text-violet-400">
            <Sparkles className="h-3 w-3" />{" "}
            {t("common.enterprise", "Enterprise")}
          </span>
        );
      case "Pro":
        return (
          <span className="inline-flex items-center gap-1 rounded-md border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
            {t("common.pro", "Pro")}
          </span>
        );
      case "Free":
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {t("common.free", "Free")}
          </span>
        );
    }
  };

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs transition-opacity duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 inset-e-0 flex max-w-full ps-10">
        <div className="flex w-screen max-w-md flex-col justify-between border-s border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
          {/* Header */}
          <div className="border-b border-zinc-200 p-6 dark:border-zinc-800">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-zinc-200 dark:ring-zinc-800"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.fullName,
                      )}&background=3f3f46&color=fff`;
                  }}
                />
                <div>
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    {user.fullName}
                  </h2>
                  <div className="mt-1 flex items-center gap-2">
                    {getStatusBadge(user.status)}
                    {getPlanBadge(user.plan)}
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="cursor-pointer rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                aria-label={t("users.drawer.closeDrawer", "Close drawer")}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 space-y-6 overflow-y-auto p-6">
            {/* Contact & Meta */}
            <div className="space-y-3 rounded-xl border border-zinc-200/60 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
              <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-300">
                <Mail className="h-4 w-4 text-zinc-400" />
                <span className="font-mono text-zinc-900 dark:text-zinc-100">
                  {user.email}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-300">
                <Globe className="h-4 w-4 text-zinc-400" />
                <span>{user.country}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-300">
                <Shield className="h-4 w-4 text-zinc-400" />
                <span>
                  {t("users.table.roleCol", "Role")}:{" "}
                  <strong className="font-medium text-zinc-900 dark:text-zinc-100">
                    {user.role === "Admin"
                      ? t("common.admin", "Admin")
                      : user.role === "Editor"
                        ? t("common.editor", "Editor")
                        : user.role === "Moderator"
                          ? t("common.moderator", "Moderator")
                          : t("common.user", "User")}
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-300">
                <Calendar className="h-4 w-4 text-zinc-400" />
                <span>
                  {t("users.drawer.joined", "Joined")}:{" "}
                  {formatDate(user.joinedAt)}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-300">
                <Clock className="h-4 w-4 text-zinc-400" />
                <span>
                  {t("users.drawer.lastActive", "Last Active")}:{" "}
                  {formatDate(user.lastLogin)}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="mb-3 text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                {t("users.drawer.accountActions", "Account Actions")}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onEdit(user)}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                >
                  {t("users.drawer.editBtn", "Edit Account")}
                </button>
                <button
                  onClick={() =>
                    onStatusChange(
                      user.id,
                      user.status === "Active" ? "Suspended" : "Active",
                    )
                  }
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-100 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-400 dark:hover:bg-amber-900/50"
                >
                  <AlertTriangle className="h-3.5 w-3.5" />
                  {user.status === "Active"
                    ? t("users.drawer.suspendBtn", "Suspend")
                    : t("users.drawer.activateBtn", "Activate")}
                </button>
              </div>
            </div>

            {/* Activity Log */}
            <div>
              <h3 className="mb-3 text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                {t("users.drawer.recentAuditTrail", "Recent Audit Trail")}
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-lg border border-zinc-200/50 bg-zinc-50 p-3 text-xs dark:border-zinc-800 dark:bg-zinc-800/40">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <div>
                    <p className="font-medium text-zinc-800 dark:text-zinc-200">
                      {t(
                        "users.drawer.loggedInSuccess",
                        "Logged in successfully",
                      )}
                    </p>
                    <span className="text-[10px] text-zinc-400">
                      {formatDate(user.lastLogin)} · IP 192.168.1.104
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-zinc-200/50 bg-zinc-50 p-3 text-xs dark:border-zinc-800 dark:bg-zinc-800/40">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
                  <div>
                    <p className="font-medium text-zinc-800 dark:text-zinc-200">
                      {t("users.drawer.planSetTo", {
                        plan: user.plan,
                        defaultValue: `Plan set to ${user.plan}`,
                      })}
                    </p>
                    <span className="text-[10px] text-zinc-400">
                      {formatDate(user.joinedAt)} ·{" "}
                      {t("users.drawer.automatedBilling", "Automated Billing")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Delete Action */}
          <div className="border-t border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
            <button
              onClick={() => {
                if (
                  confirm(
                    t("users.table.deleteConfirm", {
                      name: user.fullName,
                      defaultValue: `Are you sure you want to delete user ${user.fullName}?`,
                    }),
                  )
                ) {
                  onDelete(user.id);
                  onClose();
                }
              }}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/10 px-4 py-2.5 text-xs font-medium text-rose-600 transition-colors hover:bg-rose-500/20 dark:text-rose-400"
            >
              <Trash2 className="h-4 w-4" />{" "}
              {t("users.drawer.deletePermanent", "Delete User Permanently")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
