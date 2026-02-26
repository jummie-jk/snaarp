import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Widget } from "../types/dashboard";

export const STAT_BLOCK_ID = "stat-block";

interface DashboardContextType {
  widgets: Widget[];
  setWidgets: React.Dispatch<React.SetStateAction<Widget[]>>;
  topLevelOrder: string[];
  setTopLevelOrder: React.Dispatch<React.SetStateAction<string[]>>;
  statCardOrder: string[];
  setStatCardOrder: React.Dispatch<React.SetStateAction<string[]>>;
  getWidget: (id: string) => Widget | undefined;
}

const DashboardContext = createContext<
  DashboardContextType | undefined
>(undefined);

export function DashboardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [widgets, setWidgets] = useState<Widget[]>([
    {
      id: "1",
      type: "stat",
      title: "Users",
      value: "3,836",
      percentage: 15,
      trend: "down",
      comparisonText: "Compared to last week",
      graphColor: "red",
    },
    {
      id: "2",
      type: "stat",
      title: "Groups",
      value: 316,
      percentage: 23,
      trend: "up",
      comparisonText: "Compared to last week",
      graphColor: "green",
    },
    {
      id: "3",
      type: "stat",
      title: "Uploads",
      value: 1200,
      percentage: 10,
      trend: "up",
      comparisonText: "Compared to last week",
      graphColor: "green",
    },
    {
      id: "4",
      type: "stat",
      title: "Departments",
      value: 12,
      percentage: 5,
      trend: "down",
      comparisonText: "Compared to last week",
      graphColor: "red",
    },
    { id: "5", type: "storage" },
    { id: "6", type: "chart" },
    { id: "7", type: "activeUsers" },
    { id: "8", type: "deviceManagement" },
  ]);

  const [topLevelOrder, setTopLevelOrder] = useState<string[]>([
    STAT_BLOCK_ID,
    "5",
    "6",
    "7",
  ]);

  const [statCardOrder, setStatCardOrder] = useState<string[]>([
    "1",
    "2",
    "3",
    "4",
  ]);

  const getWidget = (id: string) => widgets.find((w) => w.id === id);

  return (
    <DashboardContext.Provider
      value={{
        widgets,
        setWidgets,
        topLevelOrder,
        setTopLevelOrder,
        statCardOrder,
        setStatCardOrder,
        getWidget,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard(): DashboardContextType {
  const context = useContext(DashboardContext);
  if (!context)
    throw new Error("useDashboard must be used inside provider");
  return context;
}
