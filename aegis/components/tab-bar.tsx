"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Video, Bell, MapPin, Users } from "lucide-react";

const tabs = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/camera", label: "Camera", Icon: Video },
  { href: "/alerts", label: "Alerts", Icon: Bell },
  { href: "/community", label: "Community", Icon: MapPin },
  { href: "/household", label: "Family", Icon: Users },
];

export function TabBar() {
  const pathname = usePathname();
  return (
    <div className="absolute bottom-0 left-0 right-0 px-4 pb-7 pt-2 z-30">
      <nav
        className="glass glass-strong flex items-center justify-around rounded-[28px] px-2 py-2.5"
        style={{
          background:
            "linear-gradient(180deg, rgba(12, 90, 175, 0.62) 0%, rgba(7, 38, 92, 0.72) 100%)",
          borderColor: "rgba(120, 200, 255, 0.30)",
        }}
      >
        {tabs.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="pressable relative flex flex-1 flex-col items-center gap-1 rounded-2xl py-1.5"
            >
              {active && (
                <span
                  className="absolute inset-x-1 inset-y-0 rounded-2xl"
                  style={{
                    background: "rgba(100, 210, 255, 0.16)",
                    boxShadow: "inset 0 0 0 1px rgba(100,210,255,0.45), 0 4px 16px -4px rgba(100,210,255,0.5)",
                  }}
                />
              )}
              <Icon
                size={22}
                strokeWidth={active ? 2.6 : 2}
                color={active ? "var(--cyan)" : "var(--ink)"}
                style={{ opacity: active ? 1 : 0.4, position: "relative" }}
              />
              <span
                className="relative text-[10px] font-semibold"
                style={{ color: active ? "var(--cyan)" : "var(--ink)", opacity: active ? 1 : 0.4 }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
