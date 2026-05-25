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
      <nav className="glass glass-strong flex items-center justify-around rounded-[28px] px-2 py-2.5">
        {tabs.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="pressable relative flex flex-1 flex-col items-center gap-1 py-1"
            >
              {active && (
                <span className="absolute -top-1 h-9 w-12 rounded-full bg-white/12 blur-md" />
              )}
              <Icon
                size={22}
                strokeWidth={active ? 2.4 : 1.9}
                color={active ? "var(--cyan)" : "var(--ink)"}
                style={{ opacity: active ? 1 : 0.55 }}
              />
              <span
                className="text-[10px] font-medium"
                style={{ color: active ? "var(--cyan)" : "var(--ink)", opacity: active ? 1 : 0.5 }}
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
