import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FileText, BarChart3, LineChart, ChevronDown } from "lucide-react";

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

const FILE_SHARING_DATA = MONTHS.map((name, i) => ({
  name,
  public: 20 + Math.round(60 * Math.sin(i * 0.5) + 10 * (i % 3)),
  anyoneWithLink: 15 + Math.round(40 * Math.cos(i * 0.4) + 5 * (i % 2)),
  withinOrg: 10 + Math.round(30 * Math.sin(i * 0.3)),
}));

const COLORS = {
  public: "#3b82f6",
  anyoneWithLink: "#60a5fa",
  withinOrg: "#93c5fd",
};

export default function ChartCard() {
  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  const [period, setPeriod] = useState("Month");

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col min-h-0 h-full">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 shrink-0">
            <FileText className="w-4 h-4" strokeWidth={1.5} />
          </span>
          <div>
            <h3 className="text-sm font-medium text-black">File Sharing</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Keep track of files and how they're shared
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setChartType("bar")}
            className={`p-1.5 rounded-lg transition ${chartType === "bar" ? "bg-gray-100 text-gray-700" : "text-gray-400 hover:bg-gray-50"}`}
            aria-label="Bar chart"
          >
            <BarChart3 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setChartType("line")}
            className={`p-1.5 rounded-lg transition ${chartType === "line" ? "bg-gray-100 text-gray-700" : "text-gray-400 hover:bg-gray-50"}`}
            aria-label="Line chart"
          >
            <LineChart className="w-4 h-4" />
          </button>
          <div className="relative ml-1">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="appearance-none pl-2 pr-6 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Month">Month</option>
              <option value="Week">Week</option>
              <option value="Year">Year</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex-1 w-full h-[220px] min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={FILE_SHARING_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} width={24} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8 }}
              formatter={(value: number | undefined) => [value ?? 0, ""]}
              labelFormatter={(label) => label}
            />
            <Legend
              wrapperStyle={{ fontSize: 11 }}
              formatter={(value) => value.replace(/([A-Z])/g, " $1").trim()}
              iconType="square"
              iconSize={8}
            />
            <Bar dataKey="public" name="Public" fill={COLORS.public} radius={[2, 2, 0, 0]} stackId="a" />
            <Bar dataKey="anyoneWithLink" name="Anyone with link" fill={COLORS.anyoneWithLink} radius={[2, 2, 0, 0]} stackId="a" />
            <Bar dataKey="withinOrg" name="Within Organisation" fill={COLORS.withinOrg} radius={[2, 2, 0, 0]} stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap gap-4 mt-2 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <span className="w-2 h-2 rounded-sm bg-[#3b82f6]" />
          Public
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <span className="w-2 h-2 rounded-sm bg-[#60a5fa]" />
          Anyone with link
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <span className="w-2 h-2 rounded-sm bg-[#93c5fd]" />
          Within Organisation
        </div>
      </div>
    </div>
  );
}
