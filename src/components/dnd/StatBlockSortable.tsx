import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
import { LayoutGrid } from "lucide-react";
import { useDashboard, STAT_BLOCK_ID } from "../../context/DashboardContext";
import DraggableItem from "./DraggableItem";
import StatCard from "../cards/StatCard";
import type { Widget } from "../../types/dashboard";

interface Props {
  className?: string;
}

export default function StatBlockSortable({ className = "" }: Props) {
  const {
    statCardOrder,
    setStatCardOrder,
    getWidget,
  } = useDashboard();

  const {
    attributes: blockAttributes,
    listeners: blockListeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: STAT_BLOCK_ID });

  const blockStyle: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  function handleStatCardDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = statCardOrder.indexOf(active.id as string);
    const newIndex = statCardOrder.indexOf(over.id as string);
    if (oldIndex === -1 || newIndex === -1) return;
    setStatCardOrder((prev) => arrayMove(prev, oldIndex, newIndex));
  }

  const orderedStatWidgets = statCardOrder
    .map((id) => getWidget(id))
    .filter((w): w is Widget => w != null && w.type === "stat");

  return (
    <div
      ref={setNodeRef}
      style={blockStyle}
      className={`relative bg-transparent min-h-0 h-full flex flex-col ${isDragging ? "z-50 opacity-95" : ""} ${className}`}
    >
      <div
        {...blockAttributes}
        {...blockListeners}
        className="absolute top-2 left-2 z-20 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-grab active:cursor-grabbing touch-none"
        tabIndex={0}
        aria-label="Drag to move this section"
      >
        <LayoutGrid className="w-4 h-4" strokeWidth={1.5} />
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleStatCardDragEnd}
      >
        <SortableContext
          items={statCardOrder}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-2 grid-rows-[1fr_1fr] gap-2 flex-1 min-h-0">
            {orderedStatWidgets.map((widget) => (
              <DraggableItem key={widget.id} id={widget.id} className="min-w-0 h-full min-h-0">
                <StatCard
                  title={widget.title!}
                  value={widget.value!}
                  percentage={widget.percentage!}
                  trend={widget.trend!}
                  comparisonText={widget.comparisonText!}
                  graphColor={widget.graphColor}
                />
              </DraggableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
