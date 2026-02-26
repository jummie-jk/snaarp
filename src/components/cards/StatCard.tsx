import { Area, AreaChart, ResponsiveContainer } from "recharts";
import {
  User,
  Users,
  Upload,
  Building2,
  type LucideIcon,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  percentage: number;
  trend: "up" | "down";
  comparisonText: string;
  graphColor?: "green" | "red" | "blue";
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  Users: User,
  Groups: Users,
  Uploads: Upload,
  Departments: Building2,
};

const trendDataUp = [30, 42, 38, 55, 52, 68, 72];
const trendDataDown = [70, 58, 62, 48, 52, 38, 35];

export default function StatCard({
  title,
  value,
  percentage,
  trend,
  comparisonText,
  className = "",
}: StatCardProps) {
  const isUp = trend === "up";
  const Icon = iconMap[title] ?? User;

  const chartColor = isUp ? "#22c55e" : "#ef4444";
  const chartData = isUp ? trendDataUp : trendDataDown;

  return (
    <div
      className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 min-w-0 w-full h-full flex flex-col ${className}`}
    >
      <div className="flex flex-nowrap justify-between items-stretch">
        <div className="min-w-0 flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 shrink-0">
              <Icon className="w-4 h-4" strokeWidth={1.5} />
            </span>
            <h3 className="text-sm font-medium text-black truncate">{title}</h3>
          </div>

          <div className="flex items-baseline gap-2 mt-3 flex-wrap">
            <p className="text-sm font-semibold text-black tabular-nums">
              {typeof value === "number" ? value.toLocaleString() : value}
            </p>
            <span
              className={`text-sm font-medium flex items-center gap-0.5 shrink-0 ${
                isUp ? "text-green-600" : "text-red-600"
              }`}
            >
              {isUp ? (
                <span className="text-green-600">↑</span>
              ) : (
                <span className="text-red-600">↓</span>
              )}
              {percentage}%
            </span>
          </div>

          <p className="text-xs text-gray-500 mt-1">{comparisonText}</p>
        </div>

        <div className="w-20 h-9 shrink-0 self-center">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData.map((v, i) => ({ v, i }))}
              margin={{ top: 2, right: 2, bottom: 2, left: 2 }}
            >
              <defs>
                <linearGradient
                  id={`stat-gradient-${title}-${chartColor.replace("#", "")}`}
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
                fill={`url(#stat-gradient-${title}-${chartColor.replace("#", "")})`}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
