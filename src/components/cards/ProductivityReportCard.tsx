import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
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
  Presentation,
  Zap,
  ChevronDown,
  Clock,
  CalendarDays,
  User,
  Globe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import DraggableItem from "../dnd/DraggableItem";

const trendDataUp = [30, 42, 38, 55, 52, 68, 72];
const trendDataDown = [70, 58, 62, 48, 52, 38, 35];

const CARD_IDS = ["pr-hours", "pr-days", "pr-users", "pr-web"] as const;

const CARDS: Record<
  (typeof CARD_IDS)[number],
  { label: string; value: string; percentage: number; trend: "up" | "down"; icon: LucideIcon }
> = {
  "pr-hours": {
    label: "Hours Productivity",
    value: "576 Hrs",
    percentage: 15,
    trend: "down",
    icon: Clock,
  },
  "pr-days": {
    label: "Days Activity",
    value: "267 Days",
    percentage: 15,
    trend: "up",
    icon: CalendarDays,
  },
  "pr-users": {
    label: "Users",
    value: "3,836",
    percentage: 15,
    trend: "down",
    icon: User,
  },
  "pr-web": {
    label: "Web Activity",
    value: "178 Activities",
    percentage: 15,
    trend: "up",
    icon: Globe,
  },
};

function ProductivityCard({
  id,
  label,
  value,
  percentage,
  trend,
  icon: Icon,
}: {
  id: string;
  label: string;
  value: string;
  percentage: number;
  trend: "up" | "down";
  icon: LucideIcon;
}) {
  const isUp = trend === "up";
  const chartColor = isUp ? "#22c55e" : "#ef4444";
  const chartData = isUp ? trendDataUp : trendDataDown;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 min-w-0 w-full h-full flex flex-col">
      <div className="flex flex-nowrap justify-between items-stretch gap-3">
        <div className="min-w-0 flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 shrink-0">
              <Icon className="w-4 h-4" strokeWidth={1.5} />
            </span>
            <h3 className="text-sm font-medium text-black truncate">{label}</h3>
          </div>
          <div className="flex items-baseline gap-2 mt-3 flex-wrap">
            <p className="text-sm font-bold text-black tabular-nums">{value}</p>
            <span
              className={`text-sm font-medium shrink-0 ${
                isUp ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {isUp ? "↑" : "↓"}
              {percentage}%
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Compared to last week</p>
        </div>
        <div className="w-20 h-9 shrink-0 self-center">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData.map((v, i) => ({ v, i }))}
              margin={{ top: 2, right: 2, bottom: 2, left: 2 }}
            >
              <defs>
                <linearGradient
                  id={`pr-gradient-${id}-${chartColor.replace("#", "")}`}
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
                fill={`url(#pr-gradient-${id}-${chartColor.replace("#", "")})`}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default function ProductivityReportCard() {
  const [order, setOrder] = useState<string[]>([...CARD_IDS]);

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

  const orderedIds = order.filter((id): id is (typeof CARD_IDS)[number] =>
    CARD_IDS.includes(id as (typeof CARD_IDS)[number])
  );

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mt-5">
        <div className="flex items-center gap-2">
          <span className="text-gray-500">
            <Presentation className="w-5 h-5" strokeWidth={1.5} />
          </span>
          <h2 className="text-sm font-semibold text-gray-900">Productivity Report</h2>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm"
          >
            <Zap className="w-4 h-4" strokeWidth={2} />
            Upgrade Plan
          </button>
          <ChevronDown className="w-4 h-4 text-gray-500" strokeWidth={2} />
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={order} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 auto-rows-[200px]">
            {orderedIds.map((id) => {
              const card = CARDS[id];
              if (!card) return null;
              return (
                <DraggableItem key={id} id={id} className="min-w-0 h-[140px] min-h-0">
                  <ProductivityCard
                    id={id}
                    label={card.label}
                    value={card.value}
                    percentage={card.percentage}
                    trend={card.trend}
                    icon={card.icon}
                  />
                </DraggableItem>
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
