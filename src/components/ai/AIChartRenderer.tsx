import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { ChartData } from "../../types/ai";

interface AIChartRendererProps {
  chartData: ChartData;
}

export default function AIChartRenderer({ chartData }: AIChartRendererProps) {
  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-3.5 dark:border-zinc-800 dark:bg-zinc-800/40">
      <h4 className="mb-2 text-xs font-bold text-zinc-800 dark:text-zinc-200">
        {chartData.title}
      </h4>

      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData.data}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            <XAxis
              dataKey="category"
              stroke="#a1a1aa"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: "#e4e4e7" }}
            />
            <YAxis
              stroke="#a1a1aa"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(24, 24, 27, 0.95)",
                borderColor: "#3f3f46",
                borderRadius: "8px",
                color: "#f4f4f5",
                fontSize: "11px",
              }}
            />
            <Bar
              dataKey="valuation"
              name="Valuation ($)"
              fill="#4f46e5"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
