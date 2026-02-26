import {
  Users,
  ChevronDown,
  ArrowUpDown,
  Monitor,
  Apple,
  Terminal,
  Globe,
  Camera,
  Video,
  MessageCircle,
  Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ONLINE_USERS } from "../../data/onlineUsers";
import type { DeviceType, ActivityType } from "../../data/onlineUsers";

const DEVICE_ICONS: Record<DeviceType, LucideIcon> = {
  Windows: Monitor,
  Mac: Apple,
  Linux: Terminal,
};

const DEVICE_COLORS: Record<DeviceType, string> = {
  Windows: "text-blue-600",
  Mac: "text-slate-700",
  Linux: "text-amber-600",
};

const ACTIVITY_ICONS: Record<ActivityType, LucideIcon> = {
  "Google Chrome": Globe,
  Instagram: Camera,
  "Microsoft Teams": Video,
  YouTube: Video,
  "Opera Mini": Smartphone,
  WhatsApp: MessageCircle,
};

const ACTIVITY_COLORS: Record<ActivityType, string> = {
  "Google Chrome": "text-blue-500",
  Instagram: "text-pink-500",
  "Microsoft Teams": "text-indigo-600",
  YouTube: "text-red-600",
  "Opera Mini": "text-red-500",
  WhatsApp: "text-green-600",
};

function Avatar({ name }: { name: string }) {
  const initial = name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  return (
    <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium flex items-center justify-center shrink-0">
      {initial}
    </span>
  );
}

export default function OnlineUsersCard() {
  return (
    <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 flex flex-wrap items-start justify-between gap-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">
              <Users className="w-4 h-4" strokeWidth={1.5} />
            </span>
            <h2 className="text-base font-semibold text-gray-900">Online Users</h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">View your comprehensive online users.</p>
        </div>
        <div className="relative">
          <select
            className="appearance-none pl-3 pr-8 py-2 text-sm font-medium text-gray-700 bg-transparent border border-gray-200 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue="all"
          >
            <option value="all">All Organization</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      <div className="overflow-x-none">
        <table className="w-full text-sm m-4">
          <thead>
            <tr className="bg-gray-200 border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                <span className="inline-flex items-center gap-1">
                  Name
                  <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                </span>
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                <span className="inline-flex items-center gap-1">
                  Location
                  <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                </span>
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                <span className="inline-flex items-center gap-1">
                  Organization
                  <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                </span>
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                <span className="inline-flex items-center gap-1">
                  Device
                  <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                </span>
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Current Activity</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Time Usage</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {ONLINE_USERS.map((user, i) => {
              const DeviceIcon = DEVICE_ICONS[user.device];
              const ActivityIcon = ACTIVITY_ICONS[user.currentActivity];
              const deviceColor = DEVICE_COLORS[user.device];
              const activityColor = ACTIVITY_COLORS[user.currentActivity];
              return (
                <tr
                  key={user.id}
                  className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          user.status === "online" ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                      <Avatar name={user.name} />
                      <span className="font-medium text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{user.location}</td>
                  <td className="py-3 px-4 text-gray-600">{user.organization}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <DeviceIcon className={`w-4 h-4 shrink-0 ${deviceColor}`} strokeWidth={1.5} />
                      {user.device}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <ActivityIcon className={`w-4 h-4 shrink-0 ${activityColor}`} strokeWidth={1.5} />
                      {user.currentActivity}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{user.timeUsage}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
