import { useState } from "react";
import { useTranslation } from "react-i18next";
import { UserPlus, RefreshCw, CheckCircle2 } from "lucide-react";
import type { User, Status } from "@/types/user";
import { mockUsers } from "@/data/mockUsers";
import UsersMetrics from "@/components/users/UsersMetrics";
import UsersTable from "@/components/users/UsersTable";
import UserDetailDrawer from "@/components/users/UserDetailDrawer";
import UserFormModal from "@/components/users/UserFormModal";

export default function UsersPage() {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  /* ------- HANDLERS ------- */
  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  const handleOpenAddModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = (userData: Partial<User>) => {
    if (editingUser) {
      // Update existing user
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id ? ({ ...u, ...userData } as User) : u,
        ),
      );
      showNotification(
        t("users.toasts.updatedMsg", {
          name: userData.fullName || "User",
          defaultValue: `Updated profile for ${userData.fullName}`,
        }),
      );
    } else {
      // Create new user
      const newUser: User = {
        id: `usr_${Date.now().toString().slice(-4)}`,
        avatar: `https://picsum.photos/id/${Math.floor(Math.random() * 200)}/150/150`,
        fullName: userData.fullName || "New User",
        email: userData.email || "user@example.com",
        role: userData.role || "User",
        plan: userData.plan || "Free",
        status: userData.status || "Active",
        country: userData.country || "United States",
        joinedAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      setUsers((prev) => [newUser, ...prev]);
      showNotification(
        t("users.toasts.createdMsg", {
          name: newUser.fullName,
          defaultValue: `Added new user ${newUser.fullName}`,
        }),
      );
    }
  };

  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find((u) => u.id === userId);
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    showNotification(
      t("users.toasts.deletedMsg", {
        name: userToDelete?.fullName || userId,
        defaultValue: `Deleted user ${userToDelete?.fullName || userId}`,
      }),
    );
  };

  const handleBulkDelete = (userIds: string[]) => {
    setUsers((prev) => prev.filter((u) => !userIds.includes(u.id)));
    showNotification(
      t("users.toasts.deletedMsg", {
        name: `${userIds.length} users`,
        defaultValue: `Successfully deleted ${userIds.length} users`,
      }),
    );
  };

  const handleStatusChange = (userId: string, newStatus: Status) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)),
    );
    const statusLabel =
      newStatus === "Active"
        ? t("common.active", "Active")
        : newStatus === "Inactive"
          ? t("common.inactive", "Inactive")
          : newStatus === "Suspended"
            ? t("common.suspended", "Suspended")
            : t("common.banned", "Banned");

    showNotification(
      t("users.toasts.updatedStatus", {
        status: statusLabel,
        defaultValue: `Updated user status to ${statusLabel}`,
      }),
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 pb-16 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="animate-in slide-in-from-bottom-3 fixed inset-e-6 bottom-6 z-50 flex items-center gap-2 rounded-xl border border-zinc-700/50 bg-zinc-900 px-4 py-3 text-xs font-medium text-white shadow-2xl duration-200 dark:border-zinc-300/50 dark:bg-zinc-100 dark:text-zinc-900">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 dark:text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Page Layout Container */}
      <div className="mx-auto max-w-7xl space-y-8 px-4 pt-8 sm:px-6 lg:px-8">
        {/* Page Top Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-zinc-200 pb-6 md:flex-row md:items-center dark:border-zinc-800/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-xs bg-zinc-200 px-2 py-0.5 font-mono text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                {t("common.enterpriseBuild", "ADMIN / USERS")}
              </span>
              <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                {t("common.liveSync", "Live Sync")}
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {t("users.title", "User Management")}
            </h1>
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
              {t(
                "users.subtitle",
                "Manage permissions, subscription tiers, and account statuses across your workspace.",
              )}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setUsers([...mockUsers])}
              className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-medium text-zinc-700 shadow-xs transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              title={t("common.reset", "Reset Data")}
            >
              <RefreshCw className="h-3.5 w-3.5" />{" "}
              {t("common.reset", "Reset Data")}
            </button>

            <button
              onClick={handleOpenAddModal}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <UserPlus className="h-4 w-4" />{" "}
              {t("users.addUser", "+ Add User")}
            </button>
          </div>
        </div>

        {/* Recharts Analytics & Metrics Section */}
        <section aria-label="User Analytics Metrics">
          <UsersMetrics users={users} />
        </section>

        {/* TanStack Data Table Section */}
        <section aria-label="User Data Table">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {t("users.table.accountsDirectory", "Accounts Directory")}
            </h2>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {t("common.showing", "Showing")} {users.length}{" "}
              {t("common.users", "registered accounts")}
            </span>
          </div>

          <UsersTable
            users={users}
            onViewUser={handleViewUser}
            onEditUser={handleOpenEditModal}
            onDeleteUser={handleDeleteUser}
            onBulkDelete={handleBulkDelete}
            onStatusChange={handleStatusChange}
          />
        </section>
      </div>

      {/* Slide-over Profile Detail Drawer */}
      <UserDetailDrawer
        user={selectedUser}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onEdit={(u) => {
          setIsDrawerOpen(false);
          handleOpenEditModal(u);
        }}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteUser}
      />

      {/* User Form Modal */}
      <UserFormModal
        isOpen={isModalOpen}
        userToEdit={editingUser}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveUser}
      />
    </div>
  );
}
