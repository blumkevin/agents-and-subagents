import { ReactNode } from "react";
import Link from "next/link";
import { LucideIcon, ChevronRight } from "lucide-react";
import { Glass } from "./glass";

export function Pill({ children, color = "var(--ink)" }: { children: ReactNode; color?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
      style={{ background: "rgba(255,255,255,0.10)", color }}
    >
      {children}
    </span>
  );
}

export function QuickAction({
  href,
  Icon,
  label,
  sub,
  tint,
  accent = "var(--cyan)",
}: {
  href: string;
  Icon: LucideIcon;
  label: string;
  sub?: string;
  tint?: "blue" | "red" | "green";
  accent?: string;
}) {
  return (
    <Link href={href} className="pressable">
      <Glass tint={tint} className="flex h-[112px] flex-col justify-between p-4">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full"
          style={{ background: "rgba(255,255,255,0.14)" }}
        >
          <Icon size={21} color={accent} strokeWidth={2.1} />
        </div>
        <div>
          <p className="text-[15px] font-semibold leading-tight">{label}</p>
          {sub && <p className="text-[11px] text-ink/55">{sub}</p>}
        </div>
      </Glass>
    </Link>
  );
}

export function ListLink({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center gap-0.5 text-[13px] font-medium text-cyan">
      {children}
      <ChevronRight size={15} />
    </span>
  );
}
