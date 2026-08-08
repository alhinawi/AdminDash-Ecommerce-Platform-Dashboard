import { useMemo } from "react";
import { useTranslation } from "react-i18next";
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
import {
  Users,
  UserCheck,
  ShieldCheck,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import type { User } from "../../types/user";

interface UsersMetricsProps {
  users: User[];
}

export default function UsersMetrics({ users }: UsersMetricsProps) {
  const { t } = useTranslation();
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
      { month: t("months.jan", "Jan"), users: 12, active: 10 },
      { month: t("months.feb", "Feb"), users: 19, active: 15 },
      { month: t("months.mar", "Mar"), users: 27, active: 22 },
      { month: t("months.apr", "Apr"), users: 38, active: 31 },
      { month: t("months.may", "May"), users: 54, active: 45 },
      { month: t("months.jun", "Jun"), users: 72, active: 62 },
      { month: t("months.jul", "Jul"), users: 89, active: 78 },
      { month: t("months.aug", "Aug"), users: 100, active: stats.active },
    ];
  }, [stats.active, t]);

  // Plan Breakdown Data
  const planData = useMemo(() => {
    const free = users.filter((u) => u.plan === "Free").length;
    const pro = users.filter((u) => u.plan === "Pro").length;
    const ent = users.filter((u) => u.plan === "Enterprise").length;

    return [
      {
        name: "Enterprise",
        label: t("common.enterprise", "Enterprise"),
        value: ent,
        color: "#8b5cf6",
      }, // Violet
      {
        name: "Pro",
        label: t("common.pro", "Pro"),
        value: pro,
        color: "#3b82f6",
      }, // Blue
      {
        name: "Free",
        label: t("common.free", "Free"),
        value: free,
        color: "#71717a",
      }, // Zinc
    ];
  }, [users, t]);

  return (
    <div className="space-y-6">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Users */}
        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs backdrop-blur-md transition-all hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-zinc-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
              {t("users.metrics.totalUsers", "Total Users")}
            </span>
            <div className="rounded-lg bg-zinc-100 p-2 text-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-300">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {stats.total}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="h-3 w-3" /> +12.4%
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            {t("users.metrics.activeRatio", "Across all accounts and plans")}
          </p>
          <div className="mt-3 h-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient
                    id="totalGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
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
        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs backdrop-blur-md transition-all hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-zinc-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
              {t("users.metrics.activeNow", "Active Users")}
            </span>
            <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
              <UserCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {stats.active}
            </span>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {stats.activeRate}% {t("common.active", "active")}
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            {t("users.metrics.onlineSessions", "LoggedIn in last 30 days")}
          </p>
          <div className="mt-3 h-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient
                    id="activeGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
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
        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs backdrop-blur-md transition-all hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-zinc-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
              {t("users.metrics.paidSubscriptions", "Paid Subscriptions")}
            </span>
            <div className="rounded-lg bg-violet-500/10 p-2 text-violet-600 dark:text-violet-400">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {stats.pro + stats.enterprise}
            </span>
            <span className="text-xs font-medium text-violet-600 dark:text-violet-400">
              {stats.paidRate}%
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            {stats.enterprise} {t("common.enterprise", "Enterprise")} /{" "}
            {stats.pro} {t("common.pro", "Pro")}
          </p>
          <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
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
        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs backdrop-blur-md transition-all hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-zinc-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
              {t("users.metrics.enterpriseAccounts", "Enterprise Accounts")}
            </span>
            <div className="rounded-lg bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {stats.enterprise}
            </span>
            <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
              {t("users.metrics.tierLevel", "Top Tier")}
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            {t("users.metrics.enterpriseRatio", "Dedicated tier support")}
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
            100% SLA compliant
          </div>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* User Growth Trend Chart */}
        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs backdrop-blur-md lg:col-span-2 dark:border-zinc-800 dark:bg-zinc-900/80">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {t(
                  "users.metrics.cumulativeVsActive",
                  "User Acquisition & Activity Trend",
                )}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {t(
                  "users.metrics.cumulativeVsActive",
                  "Cumulative registrations vs monthly active users",
                )}
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-xs bg-blue-500" />
                <span className="text-zinc-600 dark:text-zinc-400">
                  {t("users.metrics.totalLegend", "Total")}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-xs bg-emerald-500" />
                <span className="text-zinc-600 dark:text-zinc-400">
                  {t("users.metrics.activeLegend", "Active")}
                </span>
              </div>
            </div>
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
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
                <YAxis
                  stroke="#a1a1aa"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
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
                  name={t("users.metrics.totalLegend", "Total Users")}
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#growthTotal)"
                />
                <Area
                  type="monotone"
                  dataKey="active"
                  name={t("users.metrics.activeLegend", "Active Users")}
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
        <div className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-5 shadow-xs backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {t(
                "users.metrics.planDistribution",
                "Subscription Plan Distribution",
              )}
            </h3>
            <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">
              {t(
                "users.metrics.planBreakdown",
                "Breakdown across Free, Pro, and Enterprise tiers",
              )}
            </p>
          </div>

          <div className="my-2 flex h-44 w-full items-center justify-center">
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
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="transparent"
                    />
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

          <div className="grid grid-cols-3 gap-2 border-t border-zinc-100 pt-2 dark:border-zinc-800/80">
            {planData.map((item) => (
              <div key={item.name} className="text-center">
                <div className="flex items-center justify-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.label}
                </div>
                <div className="mt-0.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
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
