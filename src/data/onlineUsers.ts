export type DeviceType = "Windows" | "Mac" | "Linux";
export type ActivityType = "Google Chrome" | "Instagram" | "Microsoft Teams" | "YouTube" | "Opera Mini" | "WhatsApp";

export interface OnlineUser {
  id: string;
  name: string;
  location: string;
  organization: string;
  device: DeviceType;
  currentActivity: ActivityType;
  timeUsage: string;
  status: "online" | "offline";
}

export const ONLINE_USERS: OnlineUser[] = [
  { id: "1", name: "Annette Black", location: "Ottawa, Canada", organization: "MSBM, Ottawa", device: "Windows", currentActivity: "Google Chrome", timeUsage: "3 hours 12 minutes", status: "online" },
  { id: "2", name: "Floyd Miles", location: "Lagos, Nigeria", organization: "MSBM, Lagos", device: "Mac", currentActivity: "Instagram", timeUsage: "2 hours 8 minutes", status: "online" },
  { id: "3", name: "Ronald Richards", location: "London, UK", organization: "MSBM, London", device: "Linux", currentActivity: "Microsoft Teams", timeUsage: "1 hour 45 minutes", status: "offline" },
  { id: "4", name: "Leslie Alexander", location: "Dubai, UAE", organization: "MSBM, Dubai", device: "Windows", currentActivity: "YouTube", timeUsage: "45 minutes", status: "offline" },
  { id: "5", name: "Guy Hawkins", location: "Austin, USA", organization: "MSBM, Austin", device: "Mac", currentActivity: "Opera Mini", timeUsage: "4 hours 20 minutes", status: "online" },
  { id: "6", name: "Jane Cooper", location: "Toronto, Canada", organization: "MSBM, Toronto", device: "Windows", currentActivity: "WhatsApp", timeUsage: "2 hours 30 minutes", status: "online" },
  { id: "7", name: "Cody Fisher", location: "Berlin, Germany", organization: "MSBM, Berlin", device: "Linux", currentActivity: "Google Chrome", timeUsage: "1 hour 15 minutes", status: "offline" },
  { id: "8", name: "Dianne Russell", location: "Paris, France", organization: "MSBM, Paris", device: "Mac", currentActivity: "Microsoft Teams", timeUsage: "5 hours 0 minutes", status: "offline" },
  { id: "9", name: "Jacob Jones", location: "Sydney, Australia", organization: "MSBM, Sydney", device: "Windows", currentActivity: "YouTube", timeUsage: "2 hours 45 minutes", status: "online" },
  { id: "10", name: "Theresa Webb", location: "Tokyo, Japan", organization: "MSBM, Tokyo", device: "Linux", currentActivity: "Instagram", timeUsage: "55 minutes", status: "offline" },
];
