export type WidgetType = "stat" | "storage" | "chart" | "activeUsers" | "deviceManagement";

export interface Widget {
  id: string;
  type: WidgetType;
  title?: string;
      value?: string | number;
      percentage?: number;
      trend?: "up" | "down";
      comparisonText?: string;
      graphColor?: "green" | "red" | "blue";
}
