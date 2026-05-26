"use client";

import { useState } from "react";
import { Plus, ThumbsUp, MapPin, X } from "lucide-react";
import { Glass } from "@/components/glass";
import { Pill } from "@/components/ui";
import { incidents } from "@/lib/mock-data";

const TYPES = ["👁️ Suspicious", "🚨 Theft", "🚓 Police", "💡 Hazard", "🐕 Stray", "🔥 Fire"];

export default function CommunityPage() {
  const [composing, setComposing] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <div>
      <header className="px-1 pb-3 pt-2">
        <h1 className="text-[26px] font-bold tracking-tight">Community</h1>
        <p className="text-[13px] text-ink/55">Real-time reports from neighbors nearby</p>
      </header>

      {/* faux map */}
      <Glass className="relative mb-4 h-40 overflow-hidden p-0">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0e1a2e,#13243f)]" />
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(100,210,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(100,210,255,0.12)_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2">
          <span className="sos-ring absolute inset-0 rounded-full bg-[var(--cyan)]" />
          <span className="absolute inset-0 rounded-full border-2 border-white bg-[var(--blue)]" />
        </div>
        <span className="absolute left-[28%] top-[34%] text-lg">👁️</span>
        <span className="absolute left-[68%] top-[58%] text-lg">🚨</span>
        <span className="absolute left-[44%] top-[72%] text-lg">🚓</span>
        <span className="absolute bottom-3 left-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] backdrop-blur">
          4 active · 1 km radius
        </span>
      </Glass>

      <div className="flex flex-col gap-2.5">
        {incidents.map((it) => (
          <Glass key={it.id} className="flex items-center gap-3.5 p-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-xl">
              {it.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[14.5px] font-semibold">{it.type}</p>
              <p className="truncate text-[12.5px] text-ink/60">{it.note}</p>
              <div className="mt-1.5 flex items-center gap-2">
                <Pill><MapPin size={12} /> {it.distance}</Pill>
                <span className="text-[11px] text-ink/45">{it.time} ago</span>
              </div>
            </div>
            <button className="pressable flex shrink-0 flex-col items-center gap-0.5 rounded-2xl bg-white/8 px-3 py-2">
              <ThumbsUp size={16} color="var(--cyan)" />
              <span className="text-[11px] font-semibold">{it.confirms}</span>
            </button>
          </Glass>
        ))}
      </div>

      {/* FAB */}
      <button
        onClick={() => setComposing(true)}
        className="pressable fixed bottom-28 left-1/2 z-40 -translate-x-1/2"
      >
        <div className="glass glass-strong glass-tint-blue flex items-center gap-2 rounded-full px-5 py-3.5 text-[15px] font-semibold">
          <Plus size={20} color="var(--cyan)" /> Report incident
        </div>
      </button>

      {/* composer sheet */}
      {composing && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 backdrop-blur-sm">
          <Glass strong className="w-full max-w-[358px] p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[18px] font-bold">Report an incident</h2>
              <button onClick={() => setComposing(false)} className="pressable rounded-full bg-white/10 p-2">
                <X size={18} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setPicked(t)}
                  className={`pressable rounded-2xl py-3 text-[13.5px] font-medium ${
                    picked === t ? "bg-[var(--cyan)] text-black" : "glass"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <button className="pressable mt-4 w-full" onClick={() => setComposing(false)}>
              <div className="glass glass-tint-blue rounded-2xl py-3.5 text-center text-[15px] font-semibold text-cyan">
                Share with neighbors
              </div>
            </button>
            <p className="mt-2.5 text-center text-[11px] text-ink/45">
              Reports are anonymous to other residents.
            </p>
          </Glass>
        </div>
      )}
    </div>
  );
}
