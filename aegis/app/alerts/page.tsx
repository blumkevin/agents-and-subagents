import { Glass } from "@/components/glass";
import { Pill } from "@/components/ui";
import { alertIcon } from "@/components/icons";
import { alerts, SecurityAlert } from "@/lib/mock-data";

const sevColor: Record<SecurityAlert["severity"], string> = {
  critical: "var(--red)",
  warning: "var(--orange)",
  info: "var(--cyan)",
};
const sevLabel: Record<SecurityAlert["severity"], string> = {
  critical: "Critical",
  warning: "Warning",
  info: "Info",
};

export default function AlertsPage() {
  return (
    <div>
      <header className="px-1 pb-3 pt-2">
        <h1 className="text-[26px] font-bold tracking-tight">Alerts</h1>
        <p className="text-[13px] text-ink/55">Security events in and around Torre Aurora</p>
      </header>

      <div className="flex flex-col gap-3">
        {alerts.map((a) => {
          const color = sevColor[a.severity];
          const Icon = alertIcon(a.kind);
          return (
            <Glass key={a.id} tint={a.severity === "critical" ? "red" : undefined} className="p-4">
              <div className="flex items-start gap-3.5">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                  style={{ background: `${color}26` }}
                >
                  <Icon size={23} color={color} strokeWidth={2.1} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[15.5px] font-semibold">{a.title}</p>
                    <span className="shrink-0 text-[11px] text-ink/45">{a.time}</span>
                  </div>
                  <p className="mt-0.5 text-[13px] leading-snug text-ink/65">{a.detail}</p>
                  <div className="mt-2.5 flex items-center gap-2">
                    <Pill color={color}>{sevLabel[a.severity]}</Pill>
                    <Pill>{a.location}</Pill>
                  </div>
                </div>
              </div>
            </Glass>
          );
        })}
      </div>
    </div>
  );
}
