import { useState } from "react";
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Mail, BarChart3, LineChart as LineChartIcon, ChevronDown } from "lucide-react";
import DraggableItem from "../dnd/DraggableItem";

const EMAIL_CHART_IDS = ["email-chart", "total-email"] as const;

const DOUGHNUT_DATA = [
  { name: "Sent", value: 2200, color: "#f97316" },
  { name: "Received", value: 2900, color: "#6366f1" },
  { name: "Unsent", value: 321, color: "#e5e7eb" },
];

const MONTHS = ["JAN", "FEB", "MARCH", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const TOTAL_EMAIL_DATA = MONTHS.map((name, i) => ({
  name,
  sent: 300 + Math.round(250 * Math.sin(i * 0.6) + 100),
  received: 500 + Math.round(300 * Math.cos(i * 0.5) + 150),
  unsent: 15 + (i % 5) * 4,
  total: 0,
})).map((d) => ({ ...d, total: d.sent + d.received + d.unsent }));

function EmailChartWidget() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-full flex flex-col min-h-0">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-gray-500">
          <Mail className="w-4 h-4" strokeWidth={1.5} />
        </span>
        <h3 className="text-sm font-semibold text-gray-900">Email Chart</h3>
      </div>
      <div className="relative flex-1 min-h-[200px] flex flex-col items-center">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={DOUGHNUT_DATA}
              innerRadius={52}
              outerRadius={72}
              dataKey="value"
              stroke="none"
            >
              {DOUGHNUT_DATA.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="w-20 h-20 rounded-full border-2 border-dashed border-indigo-400 flex items-center justify-center bg-white/90">
            <span className="text-[10px] font-medium text-gray-600 text-center leading-tight px-1">
              Emails Chart
            </span>
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-center mt-2 mb-4">
        {DOUGHNUT_DATA.map((d) => (
          <div key={d.name} className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: d.color }} />
            {d.name}
          </div>
        ))}
      </div>
      <div className="pt-3 border-t border-gray-100 flex flex-col items-center justify-center">
        <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">Total Emails Sent</p>
        <p className="text-2xl font-bold text-gray-900 mt-1 tabular-nums">5,421</p>
      </div>
    </div>
  );
}

function TotalEmailWidget() {
  const [chartType, setChartType] = useState<"bar" | "line">("line");
  const [period, setPeriod] = useState("Month");

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-full flex flex-col min-h-0">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-gray-500">
            <Mail className="w-4 h-4" strokeWidth={1.5} />
          </span>
          <h3 className="text-sm font-semibold text-gray-900">Total Email</h3>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setChartType("bar")}
            className={`p-1.5 rounded-lg transition ${chartType === "bar" ? "bg-blue-50 text-blue-600 border border-blue-200" : "text-gray-400 hover:bg-gray-50"}`}
            aria-label="Bar chart"
          >
            <BarChart3 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setChartType("line")}
            className={`p-1.5 rounded-lg transition ${chartType === "line" ? "bg-blue-50 text-blue-600 border border-blue-200" : "text-gray-400 hover:bg-gray-50"}`}
            aria-label="Line chart"
          >
            <LineChartIcon className="w-4 h-4" />
          </button>
          <div className="relative ml-1">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="appearance-none pl-2 pr-6 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer focus:outline-none"
            >
              <option value="Month">Month</option>
              <option value="Week">Week</option>
              <option value="Year">Year</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="flex-1 w-full min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={TOTAL_EMAIL_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="emailAreaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, "dataMax"]} tick={{ fontSize: 10 }} width={36} axisLine={false} tickLine={false} tickFormatter={(v) => (typeof v === "number" ? v.toLocaleString() : v)} />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8, borderBottom: "3px solid #6366f1" }}
              formatter={(value: number | undefined) => [value != null ? value.toLocaleString() : "0", ""]}
              labelFormatter={(label) => label}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const p = payload[0].payload;
                return (
                  <div className="bg-white rounded-lg shadow-lg border border-gray-100 px-3 py-2 text-xs">
                    <div className="text-gray-500">Sent {p.sent?.toLocaleString()}</div>
                    <div className="text-gray-500">Received {p.received?.toLocaleString()}</div>
                    <div className="text-gray-500">Unsent {p.unsent?.toLocaleString()}</div>
                    <div className="font-bold text-indigo-600 mt-1">Total {(p.total ?? 0).toLocaleString()}</div>
                  </div>
                );
              }}
            />
            <Area type="monotone" dataKey="total" stroke="#6366f1" strokeWidth={2} fill="url(#emailAreaFill)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function EmailSectionCard() {
  const [order, setOrder] = useState<string[]>([...EMAIL_CHART_IDS]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = order.indexOf(active.id as string);
    const newIndex = order.indexOf(over.id as string);
    if (oldIndex === -1 || newIndex === -1) return;
    setOrder((prev) => arrayMove(prev, oldIndex, newIndex));
  }

  const orderedIds = order.filter((id): id is (typeof EMAIL_CHART_IDS)[number] =>
    EMAIL_CHART_IDS.includes(id as (typeof EMAIL_CHART_IDS)[number])
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={order} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 lg:grid-cols-[30%_1fr] gap-4 min-h-[320px]">
          {orderedIds.map((id) => (
            <DraggableItem key={id} id={id} className="min-w-0 h-full min-h-0">
              {id === "email-chart" ? <EmailChartWidget /> : <TotalEmailWidget />}
            </DraggableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
