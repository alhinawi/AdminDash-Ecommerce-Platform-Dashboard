import { useId, useState } from "react";

type TimeRange = "1M" | "6M" | "1Y" | "ALL";

interface DataPoint {
  label: string;
  value: number;
  date: string;
}

const DATA_SETS: Record<TimeRange, { points: DataPoint[]; changeText: string; isPositive: boolean }> = {
  "1M": {
    changeText: "+$8,420 (+7.8%) past month",
    isPositive: true,
    points: [
      { label: "Jul 1", value: 98200, date: "July 1, 2026" },
      { label: "Jul 5", value: 101400, date: "July 5, 2026" },
      { label: "Jul 10", value: 99800, date: "July 10, 2026" },
      { label: "Jul 15", value: 104300, date: "July 15, 2026" },
      { label: "Jul 20", value: 102900, date: "July 20, 2026" },
      { label: "Jul 25", value: 105800, date: "July 25, 2026" },
      { label: "Jul 31", value: 106620, date: "July 31, 2026" },
    ],
  },
  "6M": {
    changeText: "+$28,100 (+35.8%) past 6 months",
    isPositive: true,
    points: [
      { label: "Feb", value: 52400, date: "Feb 2026" },
      { label: "Mar", value: 58900, date: "Mar 2026" },
      { label: "Apr", value: 67200, date: "Apr 2026" },
      { label: "May", value: 74500, date: "May 2026" },
      { label: "Jun", value: 69800, date: "Jun 2026" },
      { label: "Jul", value: 80500, date: "Jul 2026" },
    ],
  },
  "1Y": {
    changeText: "+$87,500 (+357.1%) past year",
    isPositive: true,
    points: [
      { label: "Jan", value: 24500, date: "Jan 2026" },
      { label: "Feb", value: 32100, date: "Feb 2026" },
      { label: "Mar", value: 28900, date: "Mar 2026" },
      { label: "Apr", value: 45200, date: "Apr 2026" },
      { label: "May", value: 58700, date: "May 2026" },
      { label: "Jun", value: 52400, date: "Jun 2026" },
      { label: "Jul", value: 67900, date: "Jul 2026" },
      { label: "Aug", value: 74500, date: "Aug 2026" },
      { label: "Sep", value: 69300, date: "Sep 2026" },
      { label: "Oct", value: 85100, date: "Oct 2026" },
      { label: "Nov", value: 98400, date: "Nov 2026" },
      { label: "Dec", value: 112000, date: "Dec 2026" },
    ],
  },
  ALL: {
    changeText: "+$104,200 (+1,302%) all time",
    isPositive: true,
    points: [
      { label: "2022", value: 8000, date: "2022" },
      { label: "2023", value: 22400, date: "2023" },
      { label: "2024", value: 48900, date: "2024" },
      { label: "2025", value: 79200, date: "2025" },
      { label: "2026", value: 112200, date: "2026" },
    ],
  },
};

const GoogleFinanceChart = () => {
  const [range, setRange] = useState<TimeRange>("1Y");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const filterId = useId();

  const currentDataset = DATA_SETS[range];
  const points = currentDataset.points;

  const minVal = Math.min(...points.map((p) => p.value));
  const maxVal = Math.max(...points.map((p) => p.value));
  const paddingVal = (maxVal - minVal) * 0.15 || 1000;
  const yMin = Math.max(0, minVal - paddingVal);
  const yMax = maxVal + paddingVal;

  const width = 600;
  const height = 220;
  const paddingX = 20;
  const paddingY = 20;
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  // Calculate SVG Coordinates
  const coords = points.map((pt, i) => {
    const x = paddingX + (i / (points.length - 1)) * chartWidth;
    const y = paddingY + chartHeight - ((pt.value - yMin) / (yMax - yMin)) * chartHeight;
    return { ...pt, x, y };
  });

  // Construct Smooth Cubic Bezier Path
  const linePathD = coords.reduce((acc, pt, i, arr) => {
    if (i === 0) return `M ${pt.x},${pt.y}`;
    const prev = arr[i - 1];
    const cpx1 = prev.x + (pt.x - prev.x) * 0.5;
    const cpy1 = prev.y;
    const cpx2 = prev.x + (pt.x - prev.x) * 0.5;
    const cpy2 = pt.y;
    return `${acc} C ${cpx1},${cpy1} ${cpx2},${cpy2} ${pt.x},${pt.y}`;
  }, "");

  const areaPathD = `${linePathD} L ${coords[coords.length - 1].x},${height - paddingY} L ${coords[0].x},${height - paddingY} Z`;

  const activePoint = hoveredIndex !== null ? coords[hoveredIndex] : coords[coords.length - 1];

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const svgX = (mouseX / rect.width) * width;

    let closestIdx = 0;
    let closestDist = Infinity;
    coords.forEach((pt, idx) => {
      const dist = Math.abs(pt.x - svgX);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = idx;
      }
    });

    setHoveredIndex(closestIdx);
  };

  return (
    <div className="rounded-3xl border border-gray-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 md:p-8 shadow-xs transition-colors duration-300">
      {/* Header: Executive Summary & Time Range Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-slate-800/60">
        <div>
          <div className="flex items-center gap-x-2 text-xs font-semibold text-gray-500 dark:text-slate-400">
            <span>TOTAL REVENUE VALUATION</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="flex items-baseline gap-x-3 mt-1">
            <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white font-mono">
              ${activePoint.value.toLocaleString("en-US")}
            </span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900">
              {currentDataset.changeText}
            </span>
          </div>
          <p className="text-[11px] text-gray-400 dark:text-slate-500 mt-0.5">{activePoint.date}</p>
        </div>

        {/* Time Range Tabs (1M, 6M, 1Y, ALL) */}
        <div className="flex items-center gap-x-1 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/80 dark:bg-slate-800/60 p-1 w-fit">
          {(["1M", "6M", "1Y", "ALL"] as TimeRange[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setRange(tab);
                setHoveredIndex(null);
              }}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
                range === tab
                  ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs"
                  : "text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Monotone Area Chart Viewport */}
      <div className="relative pt-6">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <defs>
            {/* Subtle Gradient Fill */}
            <linearGradient id={`areaGradient-${filterId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary-accent)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="var(--primary-accent)" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Subtle Horizontal Grid Lines */}
          {[0.2, 0.45, 0.7, 0.9].map((ratio) => {
            const y = paddingY + chartHeight * ratio;
            return (
              <line
                key={ratio}
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke="currentColor"
                className="text-gray-200 dark:text-slate-800"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Smooth Area Gradient Fill */}
          <path d={areaPathD} fill={`url(#areaGradient-${filterId})`} />

          {/* Thin 2px Monotone Vector Curve */}
          <path
            d={linePathD}
            fill="none"
            stroke="var(--primary-accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Vertical Hairline Crosshair & Active Point (Revealed on Hover) */}
          {hoveredIndex !== null && (
            <>
              <line
                x1={coords[hoveredIndex].x}
                y1={paddingY}
                x2={coords[hoveredIndex].x}
                y2={height - paddingY}
                stroke="var(--primary-accent)"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.6"
              />

              {/* Glowing Inner Point */}
              <circle
                cx={coords[hoveredIndex].x}
                cy={coords[hoveredIndex].y}
                r="5"
                fill="var(--primary-accent)"
                className="ring-4 ring-indigo-500/20"
              />
              <circle
                cx={coords[hoveredIndex].x}
                cy={coords[hoveredIndex].y}
                r="2"
                fill="#ffffff"
              />
            </>
          )}
        </svg>

        {/* X-Axis Labels */}
        <div className="flex items-center justify-between pt-3 px-1 text-[11px] font-medium text-gray-400 dark:text-slate-500">
          {coords.map((pt, idx) => (
            <span
              key={pt.label + idx}
              className={`transition-colors ${
                hoveredIndex === idx
                  ? "text-accent font-bold"
                  : ""
              }`}
            >
              {pt.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoogleFinanceChart;
