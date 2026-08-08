import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  Download,
  Eye,
  Edit2,
  Trash2,
  UserCheck,
  UserX,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { User, Role, Plan, Status } from "../../types/user";

interface UsersTableProps {
  users: User[];
  onViewUser: (user: User) => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
  onBulkDelete: (userIds: string[]) => void;
  onStatusChange: (userId: string, status: Status) => void;
}

export default function UsersTable({
  users,
  onViewUser,
  onEditUser,
  onDeleteUser,
  onBulkDelete,
  onStatusChange,
}: UsersTableProps) {
  "use no memo";
  const { t } = useTranslation();
  /* ------- TABLE STATES ------- */
  const [sorting, setSorting] = useState<SortingState>([
    { id: "joinedAt", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  // Filter dropdown state
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedPlan, setSelectedPlan] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);
  const [activeActionMenuId, setActiveActionMenuId] = useState<string | null>(
    null,
  );

  // Formatter helper
  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return iso;
    }
  };

  /* ------- FILTERED DATA DERIVATION ------- */
  const filteredData = useMemo(() => {
    return users.filter((u) => {
      if (selectedRole !== "all" && u.role !== selectedRole) return false;
      if (selectedPlan !== "all" && u.plan !== selectedPlan) return false;
      if (selectedStatus !== "all" && u.status !== selectedStatus) return false;
      if (globalFilter.trim()) {
        const query = globalFilter.toLowerCase();
        const matchesName = u.fullName.toLowerCase().includes(query);
        const matchesEmail = u.email.toLowerCase().includes(query);
        const matchesCountry = u.country.toLowerCase().includes(query);
        if (!matchesName && !matchesEmail && !matchesCountry) return false;
      }
      return true;
    });
  }, [users, selectedRole, selectedPlan, selectedStatus, globalFilter]);

  /* ------- TABLE COLUMNS DEFINITION ------- */
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      // Select Checkbox Column
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            className="h-4 w-4 cursor-pointer rounded-xs border-zinc-300 bg-white text-zinc-900 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-800"
            aria-label="Select all rows"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="h-4 w-4 cursor-pointer rounded-xs border-zinc-300 bg-white text-zinc-900 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-800"
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },

      // User Profile Column (Avatar + Name + Email)
      {
        accessorKey: "fullName",
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            {t("users.table.userCol", "User Name")}
            {column.getIsSorted() === "asc" ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : column.getIsSorted() === "desc" ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronsUpDown className="h-3.5 w-3.5 opacity-50" />
            )}
          </button>
        ),
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex items-center gap-3 py-1">
              <img
                src={user.avatar}
                alt={user.fullName}
                className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-zinc-200 dark:ring-zinc-800"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.fullName,
                    )}&background=3f3f46&color=fff`;
                }}
              />
              <div className="min-w-0">
                <button
                  onClick={() => onViewUser(user)}
                  className="block truncate text-left text-sm font-semibold text-zinc-900 hover:underline dark:text-zinc-100"
                >
                  {user.fullName}
                </button>
                <span className="block truncate font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  {user.email}
                </span>
              </div>
            </div>
          );
        },
      },

      // Role Column
      {
        accessorKey: "role",
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            {t("users.table.roleCol", "Role")}
            <ArrowUpDown className="h-3 w-3 opacity-50" />
          </button>
        ),
        cell: ({ row }) => {
          const role: Role = row.getValue("role");
          const roleStyles: Record<Role, string> = {
            Admin:
              "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold",
            Editor:
              "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
            Moderator:
              "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20",
            User: "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300",
          };

          const roleLabel =
            role === "Admin"
              ? t("common.admin", "Admin")
              : role === "Editor"
                ? t("common.editor", "Editor")
                : role === "Moderator"
                  ? t("common.moderator", "Moderator")
                  : t("common.user", "User");

          return (
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${roleStyles[role]}`}
            >
              {roleLabel}
            </span>
          );
        },
      },

      // Plan Column
      {
        accessorKey: "plan",
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            {t("users.table.planCol", "Plan")}
            <ArrowUpDown className="h-3 w-3 opacity-50" />
          </button>
        ),
        cell: ({ row }) => {
          const plan: Plan = row.getValue("plan");
          const planBadge: Record<Plan, { icon?: string; badgeClass: string }> =
            {
              Enterprise: {
                badgeClass:
                  "bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 font-semibold",
              },
              Pro: {
                badgeClass:
                  "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
              },
              Free: {
                badgeClass:
                  "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400",
              },
            };

          const planLabel =
            plan === "Enterprise"
              ? t("common.enterprise", "Enterprise")
              : plan === "Pro"
                ? t("common.pro", "Pro")
                : t("common.free", "Free");

          return (
            <span
              className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${planBadge[plan].badgeClass}`}
            >
              {plan === "Enterprise" && (
                <Sparkles className="h-3 w-3 text-amber-500" />
              )}
              {planLabel}
            </span>
          );
        },
      },

      // Status Column
      {
        accessorKey: "status",
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            {t("users.table.statusCol", "Status")}
            <ArrowUpDown className="h-3 w-3 opacity-50" />
          </button>
        ),
        cell: ({ row }) => {
          const status: Status = row.getValue("status");
          switch (status) {
            case "Active":
              return (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {t("common.active", "Active")}
                </span>
              );
            case "Inactive":
              return (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-500/10 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                  {t("common.inactive", "Inactive")}
                </span>
              );
            case "Suspended":
              return (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  {t("common.suspended", "Suspended")}
                </span>
              );
            case "Banned":
              return (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-2 py-0.5 text-xs font-medium text-rose-600 dark:text-rose-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                  {t("common.banned", "Banned")}
                </span>
              );
          }
        },
      },

      // Country Column
      {
        accessorKey: "country",
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            {t("users.modal.country", "Country")}
            <ArrowUpDown className="h-3 w-3 opacity-50" />
          </button>
        ),
        cell: ({ row }) => (
          <span className="text-xs text-zinc-700 dark:text-zinc-300">
            {row.getValue("country")}
          </span>
        ),
      },

      // Joined Date Column
      {
        accessorKey: "joinedAt",
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            {t("users.table.joinedCol", "Joined Date")}
            <ArrowUpDown className="h-3 w-3 opacity-50" />
          </button>
        ),
        cell: ({ row }) => (
          <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
            {formatDate(row.getValue("joinedAt"))}
          </span>
        ),
      },

      // Last Login Column
      {
        accessorKey: "lastLogin",
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            {t("users.table.lastActiveCol", "Last Active")}
            <ArrowUpDown className="h-3 w-3 opacity-50" />
          </button>
        ),
        cell: ({ row }) => (
          <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
            {formatDate(row.getValue("lastLogin"))}
          </span>
        ),
      },

      // Action Row Menu Column
      {
        id: "actions",
        header: () => (
          <span className="sr-only">
            {t("users.table.actionsCol", "Actions")}
          </span>
        ),
        cell: ({ row }) => {
          const user = row.original;
          const isOpen = activeActionMenuId === user.id;

          return (
            <div className="relative flex justify-end">
              <button
                onClick={() => setActiveActionMenuId(isOpen ? null : user.id)}
                className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                aria-label={t("users.table.actionsCol", "Actions")}
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>

              {isOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setActiveActionMenuId(null)}
                  />
                  <div className="absolute inset-e-0 top-8 z-30 w-44 rounded-xl border border-zinc-200 bg-white py-1 text-xs shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                    <button
                      onClick={() => {
                        setActiveActionMenuId(null);
                        onViewUser(user);
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-zinc-700 transition-colors hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      <Eye className="h-3.5 w-3.5" />{" "}
                      {t("common.viewDetails", "View Details")}
                    </button>
                    <button
                      onClick={() => {
                        setActiveActionMenuId(null);
                        onEditUser(user);
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-zinc-700 transition-colors hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      <Edit2 className="h-3.5 w-3.5" />{" "}
                      {t("users.drawer.editBtn", "Edit Account")}
                    </button>
                    <button
                      onClick={() => {
                        setActiveActionMenuId(null);
                        onStatusChange(
                          user.id,
                          user.status === "Active" ? "Suspended" : "Active",
                        );
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-amber-600 transition-colors hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/30"
                    >
                      {user.status === "Active" ? (
                        <>
                          <UserX className="h-3.5 w-3.5" />{" "}
                          {t("users.drawer.suspendBtn", "Suspend")}
                        </>
                      ) : (
                        <>
                          <UserCheck className="h-3.5 w-3.5" />{" "}
                          {t("users.drawer.activateBtn", "Activate")}
                        </>
                      )}
                    </button>
                    <div className="my-1 border-t border-zinc-100 dark:border-zinc-800" />
                    <button
                      onClick={() => {
                        setActiveActionMenuId(null);
                        onDeleteUser(user.id);
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30"
                    >
                      <Trash2 className="h-3.5 w-3.5" />{" "}
                      {t("common.delete", "Delete")}
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        },
      },
    ],
    [
      activeActionMenuId,
      onViewUser,
      onEditUser,
      onDeleteUser,
      onStatusChange,
      t,
    ],
  );

  /* ------- TANSTACK TABLE INSTANCE ------- */
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const selectedSelectedRowIds = useMemo(() => {
    return Object.keys(rowSelection)
      .filter((key) => rowSelection[key as keyof typeof rowSelection])
      .map((indexStr) => {
        const row = table.getRowModel().rows[parseInt(indexStr, 10)];
        return row ? row.original.id : null;
      })
      .filter(Boolean) as string[];
  }, [rowSelection, table]);

  // Export CSV Handler for Selected or All
  const handleExportCSV = (targetUsers: User[]) => {
    const headers = [
      "ID",
      "Name",
      "Email",
      "Role",
      "Plan",
      "Status",
      "Country",
      "Joined At",
      "Last Login",
    ];
    const rows = targetUsers.map((u) => [
      u.id,
      `"${u.fullName}"`,
      u.email,
      u.role,
      u.plan,
      u.status,
      `"${u.country}"`,
      u.joinedAt,
      u.lastLogin,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `users_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar & Filters Toolbar */}
      <div className="flex flex-col items-stretch justify-between gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center dark:border-zinc-800 dark:bg-zinc-900">
        {/* Search Input */}
        <div className="relative min-w-60 flex-1">
          <Search className="absolute inset-s-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder={t(
              "users.table.searchPlaceholder",
              "Search users by name, email, or country... (⌘K)",
            )}
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 ps-9 pe-4 text-xs text-zinc-900 placeholder-zinc-400 transition-all focus:ring-2 focus:ring-zinc-400 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-100 dark:focus:ring-zinc-600"
          />
        </div>

        {/* Filter Selects & View Column Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Role Filter */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-700 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300"
          >
            <option value="all">
              {t("users.table.allRoles", "All Roles")}
            </option>
            <option value="Admin">{t("common.admin", "Admin")}</option>
            <option value="Editor">{t("common.editor", "Editor")}</option>
            <option value="Moderator">
              {t("common.moderator", "Moderator")}
            </option>
            <option value="User">{t("common.user", "User")}</option>
          </select>

          {/* Plan Filter */}
          <select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-700 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300"
          >
            <option value="all">
              {t("users.table.allPlans", "All Plans")}
            </option>
            <option value="Enterprise">
              {t("common.enterprise", "Enterprise")}
            </option>
            <option value="Pro">{t("common.pro", "Pro")}</option>
            <option value="Free">{t("common.free", "Free")}</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-700 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300"
          >
            <option value="all">
              {t("users.table.allStatuses", "All Statuses")}
            </option>
            <option value="Active">{t("common.active", "Active")}</option>
            <option value="Inactive">{t("common.inactive", "Inactive")}</option>
            <option value="Suspended">
              {t("common.suspended", "Suspended")}
            </option>
            <option value="Banned">{t("common.banned", "Banned")}</option>
          </select>

          {/* Columns Visibility Popover */}
          <div className="relative">
            <button
              onClick={() => setIsColumnMenuOpen(!isColumnMenuOpen)}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              {t("users.table.columnsBtn", "Columns")}
            </button>

            {isColumnMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsColumnMenuOpen(false)}
                />
                <div className="absolute inset-e-0 top-10 z-30 w-48 space-y-1 rounded-xl border border-zinc-200 bg-white p-2 text-xs shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="px-2 py-1 text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">
                    {t("users.table.toggleColumns", "Toggle Columns")}
                  </div>
                  {table
                    .getAllLeafColumns()
                    .filter((col) => col.getCanHide())
                    .map((column) => (
                      <label
                        key={column.id}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-zinc-700 capitalize hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800/60"
                      >
                        <input
                          type="checkbox"
                          checked={column.getIsVisible()}
                          onChange={column.getToggleVisibilityHandler()}
                          className="h-3.5 w-3.5 rounded-xs border-zinc-300 dark:border-zinc-700"
                        />
                        {column.id === "fullName"
                          ? t("users.table.userCol", "User Name")
                          : column.id === "role"
                            ? t("users.table.roleCol", "Role")
                            : column.id === "plan"
                              ? t("users.table.planCol", "Plan")
                              : column.id === "status"
                                ? t("users.table.statusCol", "Status")
                                : column.id === "country"
                                  ? t("users.modal.country", "Country")
                                  : column.id === "joinedAt"
                                    ? t("users.table.joinedCol", "Joined Date")
                                    : column.id === "lastLogin"
                                      ? t(
                                          "users.table.lastActiveCol",
                                          "Last Active",
                                        )
                                      : column.id}
                      </label>
                    ))}
                </div>
              </>
            )}
          </div>

          {/* Export CSV Button */}
          <button
            onClick={() => handleExportCSV(filteredData)}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <Download className="h-3.5 w-3.5" />
            {t("users.table.exportCsv", "Export CSV")}
          </button>
        </div>
      </div>

      {/* Batch Action Toolbar (Appears when 1+ rows selected) */}
      {selectedSelectedRowIds.length > 0 && (
        <div className="animate-in slide-in-from-top-2 flex items-center justify-between rounded-xl bg-zinc-900 p-3 px-4 text-white shadow-lg duration-200 dark:bg-zinc-100 dark:text-zinc-900">
          <div className="flex items-center gap-3 text-xs font-medium">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[11px] font-bold text-white">
              {selectedSelectedRowIds.length}
            </span>
            <span>
              {t("users.table.selectedUsers", {
                count: selectedSelectedRowIds.length,
                defaultValue: `${selectedSelectedRowIds.length} users selected`,
              })}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const selectedUsers = users.filter((u) =>
                  selectedSelectedRowIds.includes(u.id),
                );
                handleExportCSV(selectedUsers);
              }}
              className="rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-700 dark:bg-zinc-200 dark:hover:bg-zinc-300"
            >
              {t("users.table.exportSelected", "Export Selected")}
            </button>
            <button
              onClick={() => {
                if (
                  confirm(
                    t("users.table.bulkDeleteConfirm", {
                      count: selectedSelectedRowIds.length,
                      defaultValue: `Are you sure you want to delete ${selectedSelectedRowIds.length} selected users?`,
                    }),
                  )
                ) {
                  onBulkDelete(selectedSelectedRowIds);
                  setRowSelection({});
                }
              }}
              className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-rose-700"
            >
              {t("users.table.bulkDelete", "Bulk Delete")}
            </button>
            <button
              onClick={() => setRowSelection({})}
              className="px-2 py-1.5 text-xs underline opacity-80 hover:opacity-100"
            >
              {t("common.clear", "Clear")}
            </button>
          </div>
        </div>
      )}

      {/* Table Main Section */}
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-b border-zinc-200 bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-800/40"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 font-semibold text-zinc-600 select-none dark:text-zinc-400"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`transition-colors hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 ${
                      row.getIsSelected()
                        ? "bg-zinc-100/70 dark:bg-zinc-800/60"
                        : ""
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="h-32 text-center text-xs text-zinc-500 dark:text-zinc-400"
                  >
                    {t(
                      "users.table.noUsersFound",
                      "No matching users found matching your filters.",
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination Footer */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-zinc-200 bg-zinc-50/50 p-4 text-xs sm:flex-row dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400">
            <span>
              {t("common.showing", "Showing")}{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                {table.getState().pagination.pageIndex *
                  table.getState().pagination.pageSize +
                  1}
              </strong>{" "}
              {t("common.of", "to")}{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) *
                    table.getState().pagination.pageSize,
                  filteredData.length,
                )}
              </strong>{" "}
              {t("common.of", "of")}{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                {filteredData.length}
              </strong>{" "}
              {t("common.users", "users")}
            </span>

            {/* Page Size Selector */}
            <div className="ms-4 flex items-center gap-1.5">
              <span>{t("users.table.show", "Show:")}</span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
                className="rounded-md border border-zinc-200 bg-white px-2 py-1 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                {[10, 25, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="rounded-lg border border-zinc-200 bg-white p-1.5 text-zinc-700 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              aria-label={t("common.prev", "Previous Page")}
            >
              <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
            </button>

            <span className="font-mono text-zinc-600 dark:text-zinc-400">
              {t("users.table.pageOf", {
                current: table.getState().pagination.pageIndex + 1,
                total: table.getPageCount() || 1,
                defaultValue: `Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount() || 1}`,
              })}
            </span>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="rounded-lg border border-zinc-200 bg-white p-1.5 text-zinc-700 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              aria-label={t("common.next", "Next Page")}
            >
              <ChevronRight className="h-4 w-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
