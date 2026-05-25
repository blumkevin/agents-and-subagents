"use client";

import { Check, X, BellOff, Bell, ShieldAlert } from "lucide-react";
import { Glass } from "@/components/glass";
import { Pill } from "@/components/ui";
import { alertIcon } from "@/components/icons";
import { sevColor, sevLabel } from "@/lib/severity";
import { alerts } from "@/lib/mock-data";
import { useAlerts } from "@/components/alerts-store";
import { createElement, useState } from "react";

export function AlertSheet() {
  const {
    openAlertId,
    closeAlert,
    acknowledgedIds,
    mutedKinds,
    toggleAcknowledge,
    toggleMuteKind,
    escalate,
  } = useAlerts();

  const [reported, setReported] = useState(false);

  if (openAlertId === null) return null;

  const alert = alerts.find((a) => a.id === openAlertId);
  if (!alert) return null;

  const color = sevColor[alert.severity];
  const icon = alertIcon(alert.kind);
  const acknowledged = acknowledgedIds.includes(alert.id);
  const muted = mutedKinds.includes(alert.kind);

  function close() {
    setReported(false);
    closeAlert();
  }

  return (
    <div
      onClick={close}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 backdrop-blur-sm"
    >
      <div
        className="glass glass-strong w-full max-w-[358px] p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[18px] font-bold">{alert.title}</h2>
          <button onClick={close} className="pressable rounded-full bg-white/10 p-2">
            <X size={18} />
          </button>
        </div>

        <div className="flex items-start gap-3.5">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
            style={{ background: `${color}26` }}
          >
            {createElement(icon, { size: 23, color, strokeWidth: 2.1 })}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] leading-snug text-ink/65">{alert.detail}</p>
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              <Pill color={color}>{sevLabel[alert.severity]}</Pill>
              <Pill>{alert.location}</Pill>
              <span className="text-[11px] text-ink/45">{alert.time}</span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2.5">
          {/* Acknowledge */}
          <button
            onClick={() => toggleAcknowledge(alert.id)}
            className="pressable w-full"
            style={acknowledged ? { boxShadow: "inset 0 0 0 1.5px var(--green)", borderRadius: "20px" } : undefined}
          >
            <Glass className="flex items-center justify-center gap-2 rounded-2xl py-3.5">
              <Check size={18} color={acknowledged ? "var(--green)" : "var(--ink)"} />
              <span
                className="text-[15px] font-semibold"
                style={{ color: acknowledged ? "var(--green)" : "var(--ink)" }}
              >
                {acknowledged ? "Acknowledged ✓" : "Acknowledge"}
              </span>
            </Glass>
          </button>

          {/* Mute this type */}
          <button onClick={() => toggleMuteKind(alert.kind)} className="pressable w-full">
            <Glass className="flex items-center justify-center gap-2 rounded-2xl py-3.5">
              {muted ? <Bell size={18} /> : <BellOff size={18} />}
              <span className="text-[15px] font-semibold">
                {muted ? "Unmute these alerts" : "Mute these alerts"}
              </span>
            </Glass>
          </button>

          {/* Escalate to monitoring */}
          <button
            onClick={() => {
              escalate(alert.id);
              setReported(true);
            }}
            disabled={reported}
            className="pressable w-full"
          >
            <Glass tint="red" className="flex items-center justify-center gap-2 rounded-2xl py-3.5">
              <ShieldAlert size={18} color="var(--red)" />
              <span className="text-[15px] font-semibold text-red">
                {reported ? "Reported ✓" : "Escalate to monitoring"}
              </span>
            </Glass>
          </button>
          <p className="px-1 text-center text-[11px] text-ink/45">
            Demo only — this does not contact real monitoring or dispatch.
          </p>
        </div>
      </div>
    </div>
  );
}
