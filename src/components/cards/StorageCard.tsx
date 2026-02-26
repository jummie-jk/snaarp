import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { FolderOpen, Zap, AlertTriangle } from "lucide-react";

const STORAGE_DATA = [
  { name: "Files", value: 18, color: "#6366f1" },
  { name: "Folders", value: 12, color: "#f59e0b" },
  { name: "Videos", value: 15, color: "#22c55e" },
  { name: "Apps", value: 10, color: "#38bdf8" },
  { name: "Audios", value: 8, color: "#ef4444" },
  { name: "Miscellaneous", value: 17, color: "#4f46e5" },
  { name: "Available Space", value: 20, color: "#e5e7eb" },
];

export default function StorageCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-gray-400">
          <FolderOpen className="w-4 h-4" strokeWidth={1.5} />
        </span>
        <h3 className="text-sm font-medium text-black">Storage</h3>
      </div>

      <div className="flex flex-wrap items-stretch gap-6 lg:gap-8">
        <div className="relative w-44 h-44 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={STORAGE_DATA}
                innerRadius={52}
                outerRadius={72}
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
            <span className="w-20 h-20 rounded-full border-2 border-dotted border-blue-500 flex flex-col items-center justify-center bg-white/80">
              <span className="text-xl font-bold text-black leading-tight">
                80%
              </span>
              <span className="text-[10px] font-medium text-gray-600">
                Used
              </span>
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-2 min-w-0">
          {STORAGE_DATA.map((entry) => (
            <div
              key={entry.name}
              className="flex items-center gap-2 text-sm text-black"
            >
              <span
                className="w-3 h-3 rounded-sm shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <span className="truncate">{entry.name}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-between gap-4 min-w-0 flex-1 lg:min-w-[240px]">
          <div className="rounded-xl border-2 border-amber-200 bg-amber-50/80 p-4">
            <p className="font-semibold text-black flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              Note
            </p>
            <p className="text-sm text-gray-700 mt-1 leading-snug">
              You've almost reached your limit. You have used 80% of your
              available storage. Upgrade plan to access more space.
            </p>
          </div>
          <button
            type="button"
            className="self-start inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm"
          >
            <Zap className="w-4 h-4" strokeWidth={2} />
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );
}
