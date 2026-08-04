import { useState } from "react";
import { UserPlus, RefreshCw, CheckCircle2 } from "lucide-react";
import type { User, Status } from "../../types/user";
import { mockUsers } from "../../data/mockUsers";
import UsersMetrics from "./UsersMetrics";
import UsersTable from "./UsersTable";
import UserDetailDrawer from "./UserDetailDrawer";
import UserFormModal from "./UserFormModal";

export default function UsersPage() {
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
          u.id === editingUser.id ? ({ ...u, ...userData } as User) : u
        )
      );
      showNotification(`Updated profile for ${userData.fullName}`);
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
      showNotification(`Added new user ${newUser.fullName}`);
    }
  };

  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find((u) => u.id === userId);
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    showNotification(`Deleted user ${userToDelete?.fullName || userId}`);
  };

  const handleBulkDelete = (userIds: string[]) => {
    setUsers((prev) => prev.filter((u) => !userIds.includes(u.id)));
    showNotification(`Successfully deleted ${userIds.length} users`);
  };

  const handleStatusChange = (userId: string, newStatus: Status) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
    );
    showNotification(`Updated user status to ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans pb-16">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xl border border-zinc-700/50 dark:border-zinc-300/50 text-xs font-medium animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Page Layout Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Page Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-xs bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                ADMIN / USERS
              </span>
              <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Sync
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-1">
              User Management
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Manage permissions, subscription tiers, and account statuses across your workspace.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setUsers([...mockUsers])}
              className="flex items-center gap-1.5 py-2 px-3.5 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-xs"
              title="Reset mock data"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Data
            </button>

            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-2 py-2 px-4 text-xs font-medium rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm"
            >
              <UserPlus className="w-4 h-4" /> Add User
            </button>
          </div>
        </div>

        {/* Recharts Analytics & Metrics Section */}
        <section aria-label="User Analytics Metrics">
          <UsersMetrics users={users} />
        </section>

        {/* TanStack Data Table Section */}
        <section aria-label="User Data Table">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Accounts Directory
            </h2>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Showing {users.length} registered accounts
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
