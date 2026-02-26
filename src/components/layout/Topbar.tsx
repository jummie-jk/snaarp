import React from "react";
import { Search, Bell, Copy } from "lucide-react";

const TopBar: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 gap-4 sticky top-0 z-50">
      
      <div className="flex-1">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 max-w-105">
          <Search size={15} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search for users, groups or settings"
            className="bg-transparent outline-none text-sm text-gray-700 w-full placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <button className="w-9 h-9 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center relative text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition">
          <Bell size={18} />
        </button>

        <div className="w-auto p-2 h-9 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center relative text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition">
          <p>Agent Code: <span className="text-blue-500 font-semibold">0365jgibvfn37gj89</span></p>
          <div className="p-4">
              <Copy size={18} className="text-gray-500" />
          </div>

        </div>
      </div>
    </header>
  );
};

export default TopBar;
