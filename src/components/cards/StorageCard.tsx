import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Database, Zap, AlertCircle } from "lucide-react";

const STORAGE_DATA = [
  { name: "Files", value: 18, color: "#a78bfa" },
  { name: "Folders", value: 12, color: "#fbbf24" },
  { name: "Videos", value: 15, color: "#22c55e" },
  { name: "Apps", value: 10, color: "#38bdf8" },
  { name: "Audios", value: 8, color: "#ef4444" },
  { name: "Miscellaneous", value: 17, color: "#4f46e5" },
  { name: "Available Space", value: 20, color: "#e5e7eb" },
];

export default function StorageCard() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 h-full flex flex-col min-h-0">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-gray-500">
          <Database className="w-4 h-4" strokeWidth={1.5} />
        </span>
        <h3 className="text-sm font-medium text-gray-900">Storage</h3>
      </div>

      <div className="flex gap-4 flex-nowrap">
        <div className="relative w-36 h-36 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={STORAGE_DATA}
                innerRadius={42}
                outerRadius={58}
                dataKey="value"
                stroke="none"
              >
                {STORAGE_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="w-16 h-16 rounded-full border-2 border-dashed border-blue-400 flex flex-col items-center justify-center bg-white/90 text-center">
              <span className="text-lg font-bold text-gray-900 leading-tight">
                80%
              </span>
              <span className="text-[9px] font-medium text-gray-500">Used</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col flex-1 min-w-0 gap-3">
          <div className="rounded-lg border-l-4 border-amber-400 bg-amber-50/90 p-3 shrink-0">
            <p className="font-bold text-violet-600 flex items-center gap-1.5 text-sm">
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-amber-400/30">
                <AlertCircle className="w-2.5 h-2.5 text-amber-600 shrink-0" />
              </span>
              Note
            </p>
            <p className="text-xs text-gray-700 mt-1 leading-snug">
              You've almost reached your limit. You have used 80% of your
              available storage. Upgrade plan to access more space.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
            {STORAGE_DATA.map((entry) => (
              <div
                key={entry.name}
                className="flex items-center gap-1.5 text-xs text-gray-700"
              >
                <span
                  className="w-2.5 h-2.5 rounded-sm shrink-0"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="truncate">{entry.name}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-auto">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 border-violet-300 bg-white text-violet-500 text-sm font-medium hover:bg-violet-50 hover:border-violet-400 transition-colors"
            >
              <Zap className="w-3.5 h-3.5" strokeWidth={2} />
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
