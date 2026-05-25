"use client";

import { useState } from "react";
import { ScanFace, Plus, ChevronRight, ShieldCheck } from "lucide-react";
import { Glass, SectionTitle } from "@/components/glass";
import { Pill } from "@/components/ui";
import { members as seed } from "@/lib/mock-data";

export default function HouseholdPage() {
  const [members, setMembers] = useState(seed);

  function toggleFace(id: string) {
    setMembers((m) => m.map((x) => (x.id === id ? { ...x, faceId: !x.faceId } : x)));
  }

  const withFace = members.filter((m) => m.faceId).length;

  return (
    <div>
      <header className="px-1 pb-3 pt-2">
        <h1 className="text-[26px] font-bold tracking-tight">Household</h1>
        <p className="text-[13px] text-ink/55">Who can enter with Face ID</p>
      </header>

      <Glass tint="blue" className="flex items-center gap-3.5 p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/14">
          <ShieldCheck size={24} color="var(--cyan)" />
        </div>
        <div className="flex-1">
          <p className="text-[15px] font-semibold">{withFace} of {members.length} enrolled</p>
          <p className="text-[12.5px] text-ink/60">Face ID grants keyless building access</p>
        </div>
      </Glass>

      <SectionTitle>Members</SectionTitle>
      <div className="flex flex-col gap-2.5">
        {members.map((m) => (
          <Glass key={m.id} className="flex items-center gap-3.5 p-3.5">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[15px] font-bold text-black"
              style={{ background: m.accent }}
            >
              {m.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-semibold">{m.name}</p>
              <p className="text-[12.5px] text-ink/55">{m.role}</p>
            </div>
            <button
              onClick={() => toggleFace(m.id)}
              className="pressable flex items-center gap-1.5 rounded-full px-3 py-2"
              style={{ background: m.faceId ? "rgba(48,209,88,0.22)" : "rgba(255,255,255,0.08)" }}
            >
              <ScanFace size={16} color={m.faceId ? "var(--green)" : "var(--ink)"} />
              <span
                className="text-[12px] font-semibold"
                style={{ color: m.faceId ? "var(--green)" : "var(--ink)", opacity: m.faceId ? 1 : 0.6 }}
              >
                {m.faceId ? "On" : "Off"}
              </span>
            </button>
          </Glass>
        ))}
      </div>

      <button className="pressable mt-4 w-full">
        <Glass className="flex items-center justify-between p-4">
          <span className="flex items-center gap-3 text-[15px] font-semibold">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/12">
              <Plus size={20} color="var(--cyan)" />
            </span>
            Add household member
          </span>
          <ChevronRight size={20} className="text-ink/40" />
        </Glass>
      </button>

      <Glass className="mt-3 p-4">
        <p className="text-[12.5px] leading-snug text-ink/60">
          Biometric data is sensitive. Face ID templates are stored encrypted and
          never shared with other residents.
        </p>
        <div className="mt-2.5">
          <Pill color="var(--green)">End-to-end encrypted</Pill>
        </div>
      </Glass>
    </div>
  );
}
