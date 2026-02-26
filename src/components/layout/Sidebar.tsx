
import {
  LayoutDashboard,
  BarChart3,
  Building2,
  User,
  HardDrive,
  MonitorSmartphone,
  ClipboardList,
  LifeBuoy,
  Users,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-52 bg-white border-r border-gray-200 flex flex-col justify-between">
      <div>
        <div className="p-6 text-2xl font-bold text-center">Snaarp</div>
        <nav className="px-4 space-y-2">
          <SidebarItem
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            active
          />
         <SidebarItem
            icon={<LayoutDashboard size={18} />}
            label="Organisation and Reg"
          />
          <SidebarItem
            icon={<BarChart3 size={18} />}
            label="Reporting"
          />
          <SidebarItem
            icon={<Building2   size={18} />}
            label="Billing"
          />
          <SidebarItem
            icon={<User  size={18} />}
            label="Account"
          />
          <SidebarItem
            icon={<HardDrive  size={18} />}
            label="Storage"
          />
         <SidebarItem
            icon={<MonitorSmartphone  size={18} />}
            label="Device Mangement"
          />
         <SidebarItem
            icon={<ClipboardList  size={18} />}
            label="Productivity Report"
          />
        </nav>
      </div>

      <div className="">
         <SidebarItem
            icon={<Users   size={18} />}
            label="User Panel"
          />
         <SidebarItem
            icon={<LifeBuoy   size={18} />}
            label="Support"
          />

          <div className="p-4 border-t border-gray-100">
            <div className="text-sm font-medium">
          Chidinma Snaarp
        </div>
        <div className="text-xs text-gray-500">
          admin@snaarp.com
        </div>
          </div>
      </div>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition ${
        active
          ? "bg-blue-100 text-blue-600"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </div>
  );
}