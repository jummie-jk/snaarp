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
  Monitor,
  Zap,
  ChevronDown,
  User,
  Mail,
  LayoutGrid,
  Plug,
  Power,
  PowerOff,
  Send,
  Inbox,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import DraggableItem from "../dnd/DraggableItem";
import DeviceStatCard from "./DeviceStatCard";
import type { SubStatItem } from "./DeviceStatCard";

const DEVICE_CARD_IDS = ["dm-devices", "dm-users", "dm-emails", "dm-apps"] as const;

const DEVICE_CARDS: Record<
  (typeof DEVICE_CARD_IDS)[number],
  {
    title: string;
    value: string | number;
    percentage: number;
    trend: "up" | "down";
    comparisonText: string;
    icon: LucideIcon;
    subStats?: SubStatItem[];
  }
> = {
  "dm-devices": {
    title: "Number Of Devices",
    value: "3,836",
    percentage: 15,
    trend: "up",
    comparisonText: "Compared to last week",
    icon: Monitor,
    subStats: [
      { label: "Plugged", value: "1,923", icon: Plug },
      { label: "Unplugged", value: "1,913", icon: PowerOff },
    ],
  },
  "dm-users": {
    title: "Users",
    value: "3,836",
    percentage: 15,
    trend: "down",
    comparisonText: "Compared to last week",
    icon: User,
    subStats: [
      { label: "Active", value: "592", icon: Power },
      { label: "Offline", value: "3,836", icon: PowerOff },
    ],
  },
  "dm-emails": {
    title: "Emails",
    value: 316,
    percentage: 23,
    trend: "down",
    comparisonText: "Compared to last week",
    icon: Mail,
    subStats: [
      { label: "Sent", value: "592", icon: Send },
      { label: "Received", value: "3,836", icon: Inbox },
    ],
  },
  "dm-apps": {
    title: "Number of Apps",
    value: 316,
    percentage: 23,
    trend: "down",
    comparisonText: "Compared to last week",
    icon: LayoutGrid,
    subStats: [
      { label: "Sent", value: "592", icon: Send },
      { label: "Received", value: "3,836", icon: Inbox },
    ],
  },
};

export default function DeviceManagementCard() {
  const [cardOrder, setCardOrder] = useState<string[]>([...DEVICE_CARD_IDS]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = cardOrder.indexOf(active.id as string);
    const newIndex = cardOrder.indexOf(over.id as string);
    if (oldIndex === -1 || newIndex === -1) return;
    setCardOrder((prev) => arrayMove(prev, oldIndex, newIndex));
  }

  const orderedCards = cardOrder
    .map((id) => ({ id, config: DEVICE_CARDS[id as (typeof DEVICE_CARD_IDS)[number]] }))
    .filter((entry): entry is { id: string; config: (typeof DEVICE_CARDS)[(typeof DEVICE_CARD_IDS)[number]] } => entry.config != null);

  return (
    <div className="bg-transparent w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-gray-500">
            <Monitor className="w-5 h-5" strokeWidth={1.5} />
          </span>
          <h2 className="text-sm font-semibold text-gray-900">
            Device Management Dashboard
          </h2>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm"
        >
          <Zap className="w-4 h-4" strokeWidth={2} />
          Upgrade Plan
          <ChevronDown className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={cardOrder}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {orderedCards.map(({ id, config }) => (
              <DraggableItem key={id} id={id} className="min-w-0">
                <DeviceStatCard
                  title={config.title}
                  value={config.value}
                  percentage={config.percentage}
                  trend={config.trend}
                  comparisonText={config.comparisonText}
                  icon={config.icon}
                  subStats={config.subStats}
                />
              </DraggableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
