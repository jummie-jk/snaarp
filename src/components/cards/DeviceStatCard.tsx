import { Area, AreaChart, ResponsiveContainer } from "recharts";
import type { LucideIcon } from "lucide-react";

const trendDataUp = [30, 42, 38, 55, 52, 68, 72];
const trendDataDown = [70, 58, 62, 48, 52, 38, 35];

export interface SubStatItem {
  label: string;
  value: string | number;
  icon: LucideIcon;
}

export interface BreakdownItem {
  label: string;
  value: string;
  icon: LucideIcon;
}

interface DeviceStatCardProps {
  title: string;
  value: string | number;
  percentage: number;
  trend: "up" | "down";
  comparisonText: string;
  icon: LucideIcon;
  subStats?: SubStatItem[];
  breakdown?: BreakdownItem[];
  className?: string;
}

export default function DeviceStatCard({
  title,
  value,
  percentage,
  trend,
  comparisonText,
  icon: Icon,
  subStats,
  className = "",
}: DeviceStatCardProps) {
  const isUp = trend === "up";
  const chartColor = isUp ? "#22c55e" : "#ef4444";
  const chartData = isUp ? trendDataUp : trendDataDown;

  return (
    <div
      className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 min-w-0 w-full flex flex-col ${className}`}
    >
      <div className="flex flex-nowrap justify-between items-stretch gap-3">
        <div className="min-w-0 flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 shrink-0">
              <Icon className="w-4 h-4" strokeWidth={1.5} />
            </span>
            <h3 className="text-xs font-medium text-black truncate">{title}</h3>
          </div>

          <div className="flex items-baseline gap-2 mt-2 flex-wrap">
            <p className="text-sm font-bold text-black tabular-nums">
              {typeof value === "number" ? value.toLocaleString() : value}
            </p>
            <span
              className={`text-sm font-medium flex items-center gap-0.5 shrink-0 ${
                isUp ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {isUp ? "↑" : "↓"}
              {percentage}%
            </span>
          </div>

          <p className="text-xs text-gray-500 mt-0.5">{comparisonText}</p>
        </div>

        <div className="w-20 h-9 shrink-0 self-center">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData.map((v, i) => ({ v, i }))}
              margin={{ top: 2, right: 2, bottom: 2, left: 2 }}
            >
              <defs>
                <linearGradient
                  id={`device-stat-gradient-${title}-${chartColor.replace("#", "")}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={chartColor} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={chartColor}
                strokeWidth={1.5}
                fill={`url(#device-stat-gradient-${title}-${chartColor.replace("#", "")})`}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {subStats && subStats.length > 0 && (
        <div className="flex flex-nowrap items-center gap-8 mt-3 pt-3 border-t border-gray-100">
          {subStats.map(({ label, value: v, icon: SubIcon }) => (
            <div key={label} className="flex flex-col shrink-0">
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <SubIcon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                <span>{label}</span>
              </div>
              <span className="text-sm font-medium text-black tabular-nums mt-0.5">
                {typeof v === "number" ? v.toLocaleString() : v}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
