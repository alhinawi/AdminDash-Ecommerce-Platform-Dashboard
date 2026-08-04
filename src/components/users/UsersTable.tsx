import { useState, useMemo } from "react";
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
  const [activeActionMenuId, setActiveActionMenuId] = useState<string | null>(null);

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
            className="w-4 h-4 rounded-xs border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 focus:ring-zinc-400 cursor-pointer"
            aria-label="Select all rows"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="w-4 h-4 rounded-xs border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 focus:ring-zinc-400 cursor-pointer"
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
            className="flex items-center gap-1.5 font-medium text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            User Name
            {column.getIsSorted() === "asc" ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : column.getIsSorted() === "desc" ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronsUpDown className="w-3.5 h-3.5 opacity-50" />
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
                className="w-9 h-9 rounded-full object-cover ring-1 ring-zinc-200 dark:ring-zinc-800 shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.fullName
                  )}&background=3f3f46&color=fff`;
                }}
              />
              <div className="min-w-0">
                <button
                  onClick={() => onViewUser(user)}
                  className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:underline truncate text-left block"
                >
                  {user.fullName}
                </button>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono truncate block">
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
            className="flex items-center gap-1 font-medium text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            Role
            <ArrowUpDown className="w-3 h-3 opacity-50" />
          </button>
        ),
        cell: ({ row }) => {
          const role: Role = row.getValue("role");
          const roleStyles: Record<Role, string> = {
            Admin: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold",
            Editor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
            Moderator: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20",
            User: "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300",
          };

          return (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleStyles[role]}`}
            >
              {role}
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
            className="flex items-center gap-1 font-medium text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            Plan
            <ArrowUpDown className="w-3 h-3 opacity-50" />
          </button>
        ),
        cell: ({ row }) => {
          const plan: Plan = row.getValue("plan");
          if (plan === "Enterprise") {
            return (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                <Sparkles className="w-3 h-3" /> Enterprise
              </span>
            );
          }
          if (plan === "Pro") {
            return (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                Pro
              </span>
            );
          }
          return (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
              Free
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
            className="flex items-center gap-1 font-medium text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            Status
            <ArrowUpDown className="w-3 h-3 opacity-50" />
          </button>
        ),
        cell: ({ row }) => {
          const status: Status = row.getValue("status");
          switch (status) {
            case "Active":
              return (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
              );
            case "Inactive":
              return (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-zinc-500/10 text-zinc-600 dark:text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                  Inactive
                </span>
              );
            case "Suspended":
              return (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Suspended
                </span>
              );
            case "Banned":
              return (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  Banned
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
            className="flex items-center gap-1 font-medium text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            Country
            <ArrowUpDown className="w-3 h-3 opacity-50" />
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
            className="flex items-center gap-1 font-medium text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            Joined Date
            <ArrowUpDown className="w-3 h-3 opacity-50" />
          </button>
        ),
        cell: ({ row }) => (
          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
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
            className="flex items-center gap-1 font-medium text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            Last Login
            <ArrowUpDown className="w-3 h-3 opacity-50" />
          </button>
        ),
        cell: ({ row }) => (
          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
            {formatDate(row.getValue("lastLogin"))}
          </span>
        ),
      },

      // Action Row Menu Column
      {
        id: "actions",
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => {
          const user = row.original;
          const isOpen = activeActionMenuId === user.id;

          return (
            <div className="relative flex justify-end">
              <button
                onClick={() =>
                  setActiveActionMenuId(isOpen ? null : user.id)
                }
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="User action menu"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              {isOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setActiveActionMenuId(null)}
                  />
                  <div className="absolute right-0 top-8 z-30 w-44 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl py-1 text-xs">
                    <button
                      onClick={() => {
                        setActiveActionMenuId(null);
                        onViewUser(user);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-left"
                    >
                      <Eye className="w-3.5 h-3.5" /> View Profile
                    </button>
                    <button
                      onClick={() => {
                        setActiveActionMenuId(null);
                        onEditUser(user);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-left"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit Account
                    </button>
                    <button
                      onClick={() => {
                        setActiveActionMenuId(null);
                        onStatusChange(
                          user.id,
                          user.status === "Active" ? "Suspended" : "Active"
                        );
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors text-left"
                    >
                      {user.status === "Active" ? (
                        <>
                          <UserX className="w-3.5 h-3.5" /> Suspend Account
                        </>
                      ) : (
                        <>
                          <UserCheck className="w-3.5 h-3.5" /> Activate Account
                        </>
                      )}
                    </button>
                    <div className="my-1 border-t border-zinc-100 dark:border-zinc-800" />
                    <button
                      onClick={() => {
                        setActiveActionMenuId(null);
                        onDeleteUser(user.id);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete User
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        },
      },
    ],
    [activeActionMenuId, onViewUser, onEditUser, onDeleteUser, onStatusChange]
  );

  /* ------- TANSTACK TABLE INSTANCE ------- */
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
    const headers = ["ID", "Name", "Email", "Role", "Plan", "Status", "Country", "Joined At", "Last Login"];
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
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1 min-w-60">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search users by name, email, or country... (⌘K)"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all"
          />
        </div>

        {/* Filter Selects & View Column Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Role Filter */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="py-2 px-3 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 focus:outline-hidden"
          >
            <option value="all">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Moderator">Moderator</option>
            <option value="User">User</option>
          </select>

          {/* Plan Filter */}
          <select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className="py-2 px-3 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 focus:outline-hidden"
          >
            <option value="all">All Plans</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Pro">Pro</option>
            <option value="Free">Free</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="py-2 px-3 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 focus:outline-hidden"
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
            <option value="Banned">Banned</option>
          </select>

          {/* Columns Visibility Popover */}
          <div className="relative">
            <button
              onClick={() => setIsColumnMenuOpen(!isColumnMenuOpen)}
              className="flex items-center gap-1.5 py-2 px-3 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Columns
            </button>

            {isColumnMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsColumnMenuOpen(false)}
                />
                <div className="absolute right-0 top-10 z-30 w-48 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl p-2 space-y-1 text-xs">
                  <div className="px-2 py-1 font-semibold text-zinc-400 uppercase tracking-wider text-[10px]">
                    Toggle Columns
                  </div>
                  {table
                    .getAllLeafColumns()
                    .filter((col) => col.getCanHide())
                    .map((column) => (
                      <label
                        key={column.id}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/60 cursor-pointer text-zinc-700 dark:text-zinc-300 capitalize"
                      >
                        <input
                          type="checkbox"
                          checked={column.getIsVisible()}
                          onChange={column.getToggleVisibilityHandler()}
                          className="w-3.5 h-3.5 rounded-xs border-zinc-300 dark:border-zinc-700"
                        />
                        {column.id === "fullName" ? "User Name" : column.id}
                      </label>
                    ))}
                </div>
              </>
            )}
          </div>

          {/* Export CSV Button */}
          <button
            onClick={() => handleExportCSV(filteredData)}
            className="flex items-center gap-1.5 py-2 px-3 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Batch Action Toolbar (Appears when 1+ rows selected) */}
      {selectedSelectedRowIds.length > 0 && (
        <div className="flex items-center justify-between p-3 px-4 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-3 text-xs font-medium">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white text-[11px] font-bold">
              {selectedSelectedRowIds.length}
            </span>
            <span>users selected</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const selectedUsers = users.filter((u) =>
                  selectedSelectedRowIds.includes(u.id)
                );
                handleExportCSV(selectedUsers);
              }}
              className="py-1.5 px-3 text-xs font-medium rounded-lg bg-zinc-800 dark:bg-zinc-200 hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
            >
              Export Selected
            </button>
            <button
              onClick={() => {
                if (
                  confirm(
                    `Are you sure you want to delete ${selectedSelectedRowIds.length} selected users?`
                  )
                ) {
                  onBulkDelete(selectedSelectedRowIds);
                  setRowSelection({});
                }
              }}
              className="py-1.5 px-3 text-xs font-medium rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-colors"
            >
              Bulk Delete
            </button>
            <button
              onClick={() => setRowSelection({})}
              className="py-1.5 px-2 text-xs underline opacity-80 hover:opacity-100"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Table Main Section */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-800/40"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-400 select-none"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
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
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="h-32 text-center text-zinc-500 dark:text-zinc-400 text-xs"
                  >
                    No matching users found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-xs">
          <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400">
            <span>
              Showing{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                {table.getState().pagination.pageIndex *
                  table.getState().pagination.pageSize +
                  1}
              </strong>{" "}
              to{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) *
                    table.getState().pagination.pageSize,
                  filteredData.length
                )}
              </strong>{" "}
              of{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                {filteredData.length}
              </strong>{" "}
              users
            </span>

            {/* Page Size Selector */}
            <div className="flex items-center gap-1.5 ml-4">
              <span>Show:</span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
                className="px-2 py-1 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
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
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-zinc-600 dark:text-zinc-400 font-mono">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount() || 1}
            </span>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
