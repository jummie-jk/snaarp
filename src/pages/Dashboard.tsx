import { useDashboard, STAT_BLOCK_ID } from "../context/DashboardContext";
import SortableContainer from "../components/dnd/SortableContainer";
import DraggableItem from "../components/dnd/DraggableItem";
import StatBlockSortable from "../components/dnd/StatBlockSortable";
import StorageCard from "../components/cards/StorageCard";
import ChartCard from "../components/cards/ChartCard";
import ActiveUsersCard from "../components/cards/ActiveUsersCard";
import DeviceManagementCard from "../components/cards/DeviceManagementCard";
import ProductivityReportCard from "../components/cards/ProductivityReportCard";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import { ChevronDown, Cloud } from "lucide-react";

const GRID_CLASSES = [
  "xl:col-span-2 xl:row-start-1",
  "xl:col-start-3 xl:col-span-2 xl:row-start-1",
  "xl:col-span-2 xl:row-start-2",
  "xl:col-start-3 xl:col-span-2 xl:row-start-2",
];

export default function Dashboard() {
  const { topLevelOrder } = useDashboard();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 bg-white rounded-xl p-2 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-gray-500">
            <Cloud className="w-5 h-5" strokeWidth={1.5} />
          </span>
          <h2 className="text-sm font-semibold text-gray-900">
            Cloud Network
          </h2>
        </div>
        <ChevronDown className="w-4 h-4" strokeWidth={2} />
      </div>
          <SortableContainer>
            <div className="grid grid-cols-1 xl:grid-cols-4 xl:grid-rows-[auto_minmax(380px,1fr)] gap-3">
              {topLevelOrder.map((id, index) => {
                const gridClass = GRID_CLASSES[index] ?? "";

                if (id === STAT_BLOCK_ID) {
                  return (
                    <StatBlockSortable
                      key={STAT_BLOCK_ID}
                      className={`h-full min-h-0 ${gridClass}`}
                    />
                  );
                }

                if (id === "5") {
                  return (
                    <DraggableItem
                      key="5"
                      id="5"
                      className={`h-full min-h-0 ${gridClass}`}
                    >
                      <StorageCard />
                    </DraggableItem>
                  );
                }

                if (id === "6") {
                  return (
                    <DraggableItem
                      key="6"
                      id="6"
                      className={`h-full min-h-0 ${gridClass}`}
                    >
                      <ChartCard />
                    </DraggableItem>
                  );
                }

                if (id === "7") {
                  return (
                    <DraggableItem
                      key="7"
                      id="7"
                      className={`h-full min-h-0 ${gridClass}`}
                    >
                      <ActiveUsersCard />
                    </DraggableItem>
                  );
                }

                return null;
              })}
            </div>
            <div className="mt-6 space-y-6">
              <DeviceManagementCard />
              <ProductivityReportCard />
            </div>
          </SortableContainer>
        </div>
      </div>
    </div>
  );
}
