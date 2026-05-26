"use client";

import { Check } from "lucide-react";
import { Glass } from "@/components/glass";
import { Pill } from "@/components/ui";
import { alertIcon } from "@/components/icons";
import { sevColor } from "@/lib/severity";
import { alerts } from "@/lib/mock-data";
import { useAlerts } from "@/components/alerts-store";

export function AlertsList({ limit }: { limit?: number }) {
  const { openAlert, acknowledgedIds, mutedKinds } = useAlerts();
  const rows = limit !== undefined ? alerts.slice(0, limit) : alerts;

  return (
    <div className="flex flex-col gap-2.5">
      {rows.map((a) => {
        const color = sevColor[a.severity];
        const Icon = alertIcon(a.kind);
        const muted = mutedKinds.includes(a.kind);
        const acknowledged = acknowledgedIds.includes(a.id);

        return (
          <button
            key={a.id}
            onClick={() => openAlert(a.id)}
            className={`pressable w-full text-left ${muted ? "opacity-50" : ""}`}
          >
            <Glass className="flex items-center gap-3.5 p-3.5">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
                style={{ background: `${color}26` }}
              >
                <Icon size={21} color={color} strokeWidth={2.1} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[14.5px] font-semibold">{a.title}</p>
                  <span className="shrink-0 text-[11px] text-ink/45">{a.time}</span>
                </div>
                <p className="truncate text-[12.5px] text-ink/55">{a.location}</p>
                {(muted || acknowledged) && (
                  <div className="mt-1.5 flex items-center gap-2">
                    {acknowledged && (
                      <Pill color="var(--green)">
                        <Check size={12} /> Acknowledged
                      </Pill>
                    )}
                    {muted && <Pill>Muted</Pill>}
                  </div>
                )}
              </div>
            </Glass>
          </button>
        );
      })}
    </div>
  );
}
