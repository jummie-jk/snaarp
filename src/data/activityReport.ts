export interface AppActivityRow {
  id: string;
  app: string;
  totalUsers: number;
  totalHours: string;
  date: string;
}

export interface WebActivityRow {
  id: string;
  name: string;
  percentage: number;
  time: string;
}

export const APP_ACTIVITY_DATA: AppActivityRow[] = [
  { id: "1", app: "Google Chrome", totalUsers: 34, totalHours: "3 hours 12 minutes", date: "2024-06-26 15:33:49" },
  { id: "2", app: "YouTube", totalUsers: 12, totalHours: "2 hours 8 minutes", date: "2024-06-26 14:22:10" },
  { id: "3", app: "Microsoft Teams", totalUsers: 16, totalHours: "6 hours 45 minutes", date: "2024-06-26 12:10:33" },
  { id: "4", app: "WhatsApp", totalUsers: 49, totalHours: "1 hour 30 minutes", date: "2024-06-26 11:05:22" },
  { id: "5", app: "Opera Mini", totalUsers: 3, totalHours: "9 hours 10 minutes", date: "2024-06-26 09:44:18" },
  { id: "6", app: "Instagram", totalUsers: 22, totalHours: "45 minutes", date: "2024-06-26 08:20:55" },
];

export const WEB_ACTIVITY_DATA: WebActivityRow[] = [
  { id: "1", name: "Chrome", percentage: 78, time: "5 hours 12 minutes" },
  { id: "2", name: "Gmail", percentage: 61, time: "2 hours 24 minutes" },
  { id: "3", name: "Firefox", percentage: 45, time: "40 minutes" },
  { id: "4", name: "Instagram", percentage: 78, time: "5 hours 6 minutes" },
  { id: "5", name: "X.com", percentage: 59, time: "1 hour 8 minutes" },
  { id: "6", name: "Facebook", percentage: 61, time: "3 hours 1 minute" },
];
