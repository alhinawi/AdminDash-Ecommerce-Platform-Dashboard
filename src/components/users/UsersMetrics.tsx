import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Users, UserCheck, ShieldCheck, TrendingUp, Sparkles } from "lucide-react";
import type { User } from "../../types/user";

interface UsersMetricsProps {
  users: User[];
}

export default function UsersMetrics({ users }: UsersMetricsProps) {
  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => u.status === "Active").length;
    const pro = users.filter((u) => u.plan === "Pro").length;
    const enterprise = users.filter((u) => u.plan === "Enterprise").length;
    const paidRate = Math.round(((pro + enterprise) / (total || 1)) * 100);
    const activeRate = Math.round((active / (total || 1)) * 100);

    return {
      total,
      active,
      pro,
      enterprise,
      paidRate,
      activeRate,
    };
  }, [users]);

  // Generate monthly user registration trend data
  const monthlyData = useMemo(() => {
    return [
      { month: "Jan", users: 12, active: 10 },
      { month: "Feb", users: 19, active: 15 },
      { month: "Mar", users: 27, active: 22 },
      { month: "Apr", users: 38, active: 31 },
      { month: "May", users: 54, active: 45 },
      { month: "Jun", users: 72, active: 62 },
      { month: "Jul", users: 89, active: 78 },
      { month: "Aug", users: 100, active: stats.active },
    ];
  }, [stats.active]);

  // Plan Breakdown Data
  const planData = useMemo(() => {
    const free = users.filter((u) => u.plan === "Free").length;
    const pro = users.filter((u) => u.plan === "Pro").length;
    const ent = users.filter((u) => u.plan === "Enterprise").length;

    return [
      { name: "Enterprise", value: ent, color: "#8b5cf6" }, // Violet
      { name: "Pro", value: pro, color: "#3b82f6" }, // Blue
      { name: "Free", value: free, color: "#71717a" }, // Zinc
    ];
  }, [users]);

  return (
    <div className="space-y-6">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Users */}
        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 backdrop-blur-md shadow-xs transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Total Users
            </span>
            <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {stats.total}
            </span>
            <span className="inline-flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400 gap-1">
              <TrendingUp className="w-3 h-3" /> +12.4%
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Across all accounts and plans
          </p>
          <div className="mt-3 h-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#3b82f6"
                  strokeWidth={1.5}
                  fill="url(#totalGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 2: Active Rate */}
        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 backdrop-blur-md shadow-xs transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Active Users
            </span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {stats.active}
            </span>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {stats.activeRate}% active
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            LoggedIn in last 30 days
          </p>
          <div className="mt-3 h-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="activeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="active"
                  stroke="#10b981"
                  strokeWidth={1.5}
                  fill="url(#activeGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 3: Paid Subscribers */}
        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 backdrop-blur-md shadow-xs transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Paid Subscriptions
            </span>
            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {stats.pro + stats.enterprise}
            </span>
            <span className="text-xs font-medium text-violet-600 dark:text-violet-400">
              {stats.paidRate}% paid
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            {stats.enterprise} Enterprise / {stats.pro} Pro
          </p>
          <div className="mt-4 flex h-2 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            <div
              className="bg-violet-500"
              style={{
                width: `${(stats.enterprise / (stats.total || 1)) * 100}%`,
              }}
            />
            <div
              className="bg-blue-500"
              style={{
                width: `${(stats.pro / (stats.total || 1)) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Card 4: Enterprise Tier */}
        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 backdrop-blur-md shadow-xs transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Enterprise Accounts
            </span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {stats.enterprise}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
              Top Tier
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            High-value enterprise customer contracts
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            100% SLA compliant
          </div>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* User Growth Trend Chart */}
        <div className="lg:col-span-2 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 backdrop-blur-md shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                User Acquisition & Activity Trend
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Cumulative registrations vs monthly active users
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-blue-500" />
                <span className="text-zinc-600 dark:text-zinc-400">Total</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500" />
                <span className="text-zinc-600 dark:text-zinc-400">Active</span>
              </div>
            </div>
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="growthTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="growthActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  stroke="#a1a1aa"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: "#e4e4e7" }}
                />
                <YAxis stroke="#a1a1aa" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(24, 24, 27, 0.95)",
                    borderColor: "#3f3f46",
                    borderRadius: "8px",
                    color: "#f4f4f5",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  name="Total Users"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#growthTotal)"
                />
                <Area
                  type="monotone"
                  dataKey="active"
                  name="Active Users"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#growthActive)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Plan Breakdown Pie Chart */}
        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 backdrop-blur-md shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Subscription Plan Distribution
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              Breakdown across Free, Pro, and Enterprise tiers
            </p>
          </div>

          <div className="h-44 w-full flex items-center justify-center my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={planData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {planData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(24, 24, 27, 0.95)",
                    borderColor: "#3f3f46",
                    borderRadius: "8px",
                    color: "#f4f4f5",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
            {planData.map((item) => (
              <div key={item.name} className="text-center">
                <div className="flex items-center justify-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.name}
                </div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
