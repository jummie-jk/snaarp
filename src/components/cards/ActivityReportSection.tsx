import { useState } from "react";
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import {
  Target,
  Globe,
  ChevronDown,
  ArrowUpDown,
  Globe as ChromeIcon,
  Video,
  MessageCircle,
  Smartphone,
  Camera,
  Mail,
  Flame,
  MessageSquare,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import DraggableItem from "../dnd/DraggableItem";
import { APP_ACTIVITY_DATA, WEB_ACTIVITY_DATA } from "../../data/activityReport";

const CARD_IDS = ["app-activity", "web-activity"] as const;

const APP_ICONS: Record<string, LucideIcon> = {
  "Google Chrome": ChromeIcon,
  YouTube: Video,
  "Microsoft Teams": Video,
  WhatsApp: MessageCircle,
  "Opera Mini": Smartphone,
  Instagram: Camera,
};

const APP_COLORS: Record<string, string> = {
  "Google Chrome": "text-blue-500",
  YouTube: "text-red-600",
  "Microsoft Teams": "text-indigo-600",
  WhatsApp: "text-green-600",
  "Opera Mini": "text-red-500",
  Instagram: "text-pink-500",
};

const WEB_ICONS: Record<string, LucideIcon> = {
  Chrome: ChromeIcon,
  Gmail: Mail,
  Firefox: Flame,
  Instagram: Camera,
  "X.com": MessageSquare,
  Facebook: MessageSquare,
};

const WEB_COLORS: Record<string, string> = {
  Chrome: "text-blue-500",
  Gmail: "text-red-500",
  Firefox: "text-orange-500",
  Instagram: "text-pink-500",
  "X.com": "text-gray-800",
  Facebook: "text-blue-600",
};

function AppActivityCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col min-h-0 mt-4">
      <div className="p-5 flex flex-wrap items-start justify-between gap-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">
              <Target className="w-4 h-4" strokeWidth={1.5} />
            </span>
            <h2 className="text-base font-semibold text-gray-900">App Activity Report</h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">View your comprehensive organizational app report.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <select className="appearance-none pl-3 pr-8 py-2 text-xs font-medium text-gray-700 bg-transparent border border-gray-200 rounded-lg cursor-pointer focus:outline-none">
              <option>All Organization</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select className="appearance-none pl-3 pr-8 py-2 text-xs font-medium text-gray-700 bg-transparent border border-gray-200 rounded-lg cursor-pointer focus:outline-none">
              <option>Month</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="overflow-x-none flex-1 min-h-0">
        <table className="w-full text-xs m-4">
          <thead>
            <tr className="bg-gray-200 border-b border-gray-200">
              <th className="text-left py-2.5 px-3 font-semibold text-gray-700 border-r border-gray-300 last:border-r-0">
                <span className="inline-flex items-center gap-1">Application <ArrowUpDown className="w-3 h-3 text-gray-500" /></span>
              </th>
              <th className="text-left py-2.5 px-3 font-semibold text-gray-700 border-r border-gray-300 last:border-r-0">
                <span className="inline-flex items-center gap-1">Total Users <ArrowUpDown className="w-3 h-3 text-gray-500" /></span>
              </th>
              <th className="text-left py-2.5 px-3 font-semibold text-gray-700 border-r border-gray-300 last:border-r-0">
                <span className="inline-flex items-center gap-1">Total Number of Hours <ArrowUpDown className="w-3 h-3 text-gray-500" /></span>
              </th>
              <th className="text-left py-2.5 px-3 font-semibold text-gray-700">
                <span className="inline-flex items-center gap-1">Date <ArrowUpDown className="w-3 h-3 text-gray-500" /></span>
              </th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {APP_ACTIVITY_DATA.map((row, i) => {
              const Icon = APP_ICONS[row.app] ?? ChromeIcon;
              const color = APP_COLORS[row.app] ?? "text-gray-500";
              return (
                <tr key={row.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}><td className="py-2 px-1 border-b border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <Icon className={`w-4 h-4 shrink-0 ${color}`} strokeWidth={1.5} />
                      {row.app}
                    </div>
                  </td>
                  <td className="py-2 px-1 border-b border-gray-100 text-gray-600">{row.totalUsers}</td>
                  <td className="py-2 px-1 border-b border-gray-100 text-gray-600">{row.totalHours}</td>
                  <td className="py-2 px-1 border-b border-gray-100 text-gray-600">{row.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function WebActivityCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col min-h-0 mt-4">
      <div className="p-5 flex flex-wrap items-start justify-between gap-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">
              <Globe className="w-4 h-4" strokeWidth={1.5} />
            </span>
            <h2 className="text-base font-semibold text-gray-900">Web Activity</h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">View your comprehensive organizational web report.</p>
        </div>
        <div className="relative">
          <select className="appearance-none pl-3 pr-8 py-2 text-xs font-medium text-gray-700 bg-transparent border border-gray-200 rounded-lg cursor-pointer focus:outline-none">
            <option>Month</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
      <div className="p-4 space-y-4 flex-1 overflow-auto">
        {WEB_ACTIVITY_DATA.map((row) => {
          const Icon = WEB_ICONS[row.name] ?? ChromeIcon;
          const color = WEB_COLORS[row.name] ?? "text-gray-500";
          return (
            <div key={row.id} className="flex flex-wrap items-center gap-3">
              <Icon className={`w-4 h-4 shrink-0 ${color}`} strokeWidth={1.5} />
              <span className="text-xs font-medium text-gray-700 min-w-[4rem]">{row.name}</span>
              <div className="flex-1 min-w-[80px] h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all"
                  style={{ width: `${row.percentage}%` }}
                />
              </div>
              <span className="text-xs text-gray-600 tabular-nums w-10">{row.percentage}%</span>
              <span className="text-xs text-gray-600">{row.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ActivityReportSection() {
  const [order, setOrder] = useState<string[]>([...CARD_IDS]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

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

  const widthByCard: Record<(typeof CARD_IDS)[number], string> = {
    "app-activity": "lg:w-[60%] lg:flex-[0_0_60%]",
    "web-activity": "lg:w-[40%] lg:flex-[0_0_40%]",
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={order} strategy={rectSortingStrategy}>
        <div className="flex flex-col lg:flex-row flex-nowrap gap-4 min-h-[320px] lg:h-[420px] w-full">
          {orderedIds.map((id) => (
            <DraggableItem
              key={id}
              id={id}
              className={`min-w-0 h-full min-h-0 w-full lg:flex-shrink-0 ${widthByCard[id]}`}
            >
              {id === "app-activity" ? <AppActivityCard /> : <WebActivityCard />}
            </DraggableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
