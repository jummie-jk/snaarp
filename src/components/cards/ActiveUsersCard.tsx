import { User, ChevronDown, MapPin } from "lucide-react";

const COUNTRIES = [
  { name: "United Kingdom", code: "GB", percentage: 78 },
  { name: "Nigeria", code: "NG", percentage: 61 },
  { name: "UAE", code: "AE", percentage: 45 },
  { name: "Canada", code: "CA", percentage: 59 },
  { name: "United States of America", code: "US", percentage: 78 },
];

const MAP_PINS = [
  { name: "Stanley", color: "bg-blue-500", left: "15%", top: "20%" },
  { name: "Samuel", color: "bg-red-500", left: "20%", top: "65%" },
  { name: "Chisom", color: "bg-green-500", left: "70%", top: "70%" },
];

function FlagEmoji({ code }: { code: string }) {
  const cc = code.toUpperCase();
  const codePoints = [...cc].map((c) => 0x1f1e6 - 65 + c.charCodeAt(0));
  return <span className="text-lg leading-none" role="img">{String.fromCodePoint(...codePoints)}</span>;
}

export default function ActiveUsersCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col min-h-0 h-full">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 shrink-0">
            <User className="w-4 h-4" strokeWidth={1.5} />
          </span>
          <h3 className="text-sm font-medium text-black">Active Users</h3>
        </div>
        <div className="relative shrink-0">
          <select
            defaultValue="Month"
            className="appearance-none pl-2 pr-6 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Month">Month</option>
            <option value="Week">Week</option>
            <option value="Year">Year</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
        </div>
      </div>

      <div className="flex gap-3 flex-1 min-h-0 min-w-0">
        <div className="relative flex-1 min-w-0 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden min-h-[180px]">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 opacity-80" />
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
            <MapPin className="w-8 h-8 opacity-50" />
          </div>
          <div className="relative w-full h-full min-h-[180px]">
            {MAP_PINS.map((pin) => (
              <div
                key={pin.name}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ left: pin.left, top: pin.top }}
              >
                <div
                  className={`w-3 h-3 rounded-full ${pin.color} border-2 border-white shadow-md`}
                  title={pin.name}
                />
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 text-[10px] font-medium text-gray-700 whitespace-nowrap bg-white/90 px-1.5 py-0.5 rounded">
                  {pin.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 min-w-0 space-y-3 flex flex-col justify-center">
          {COUNTRIES.map((country) => (
            <div
              key={country.code}
              className="flex items-center gap-3 p-2 rounded-lg bg-gray-50/80 border border-gray-100"
            >
              <span className="shrink-0 w-7 h-5 flex items-center justify-center rounded overflow-hidden bg-white border border-gray-200">
                <FlagEmoji code={country.code} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-800 truncate">
                  {country.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all"
                      style={{ width: `${country.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 tabular-nums shrink-0 w-8">
                    {country.percentage}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
