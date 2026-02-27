import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface Props {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export default function DraggableItem({ id, children, className = "" }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative ${className} ${isDragging ? "z-50 opacity-95 shadow-lg" : ""}`}
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 right-2  z-10 p-1.5 m-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-grab active:cursor-grabbing touch-none"
        tabIndex={0}
        aria-label="Drag to reorder"
      >
        <GripVertical className="w-4 h-4" strokeWidth={1.5} />
      </div>
      {children}
    </div>
  );
}
