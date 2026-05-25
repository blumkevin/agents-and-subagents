import { Signal, Wifi, BatteryFull } from "lucide-react";

export function StatusBar() {
  return (
    <div className="relative z-20 flex items-center justify-between px-7 pt-3.5 pb-1 text-ink">
      <span className="text-[15px] font-semibold tracking-tight">9:41</span>
      <div className="flex items-center gap-1.5">
        <Signal size={16} strokeWidth={2.2} />
        <Wifi size={16} strokeWidth={2.2} />
        <BatteryFull size={22} strokeWidth={1.8} />
      </div>
    </div>
  );
}
