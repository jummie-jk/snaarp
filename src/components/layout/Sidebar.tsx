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
  X,
} from "lucide-react";

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ open = false, onClose }: SidebarProps) {
  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose?.()}
        aria-label="Close sidebar"
        className={`fixed inset-0 z-[9] bg-black/50 transition-opacity duration-200 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-10 h-screen w-52 shrink-0 bg-white border-r border-gray-200 flex flex-col justify-between overflow-y-auto transition-transform duration-200 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
      <div>
        <div className="relative flex items-center justify-center py-6 px-4">
          <span className="text-2xl font-bold">Snaarp</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="lg:hidden absolute right-2 p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="px-4 space-y-2">
          <SidebarItem
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            active
            onActivate={onClose}
          />
         <SidebarItem
            icon={<LayoutDashboard size={18} />}
            label="Organisation and Reg"
            onActivate={onClose}
          />
          <SidebarItem
            icon={<BarChart3 size={18} />}
            label="Reporting"
            onActivate={onClose}
          />
          <SidebarItem
            icon={<Building2   size={18} />}
            label="Billing"
            onActivate={onClose}
          />
          <SidebarItem
            icon={<User  size={18} />}
            label="Account"
            onActivate={onClose}
          />
          <SidebarItem
            icon={<HardDrive  size={18} />}
            label="Storage"
            onActivate={onClose}
          />
         <SidebarItem
            icon={<MonitorSmartphone  size={18} />}
            label="Device Mangement"
            onActivate={onClose}
          />
         <SidebarItem
            icon={<ClipboardList  size={18} />}
            label="Productivity Report"
            onActivate={onClose}
          />
        </nav>
      </div>

      <div className="">
         <SidebarItem
            icon={<Users   size={18} />}
            label="User Panel"
            onActivate={onClose}
          />
         <SidebarItem
            icon={<LifeBuoy   size={18} />}
            label="Support"
            onActivate={onClose}
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
    </aside>
    </>
  );
}

function SidebarItem({
  icon,
  label,
  active,
  onActivate,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onActivate?: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onActivate}
      onKeyDown={(e) => e.key === "Enter" && onActivate?.()}
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