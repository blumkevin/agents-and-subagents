"use client";

import { useEffect, useState } from "react";
import { Camera, Volume2, VolumeX, Clock, Lock, RotateCcw } from "lucide-react";
import { Glass } from "@/components/glass";

const FEEDS = ["Hall · Fl 14", "Lobby", "Garage", "Elevator"];
const LIMIT = 60;

export default function CameraPage() {
  const [feed, setFeed] = useState(0);
  const [remaining, setRemaining] = useState(LIMIT);
  const [muted, setMuted] = useState(true);
  const active = remaining > 0;

  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(t);
  }, [active]);

  function restart() {
    setRemaining(LIMIT);
  }

  const pct = (remaining / LIMIT) * 100;

  return (
    <div>
      <header className="px-1 pb-3 pt-2">
        <h1 className="text-[26px] font-bold tracking-tight">Live camera</h1>
        <p className="text-[13px] text-ink/55">Time-limited access for your privacy</p>
      </header>

      {/* Viewport */}
      <Glass className="relative aspect-[3/4] overflow-hidden p-0">
        {/* faux feed */}
        <div className="absolute inset-0 bg-[linear-gradient(170deg,#0c1422_0%,#1a2438_45%,#0a0f1c_100%)]" />
        <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(180deg,transparent_0,transparent_3px,rgba(255,255,255,0.04)_4px)]" />
        {/* hallway suggestion */}
        <div className="absolute left-1/2 top-1/2 h-3/4 w-1/2 -translate-x-1/2 -translate-y-1/2 [transform:perspective(400px)_rotateX(34deg)] rounded-b-3xl border-x border-white/10 bg-[linear-gradient(180deg,rgba(100,210,255,0.10),transparent)]" />

        {/* overlays */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-semibold backdrop-blur">
            {active ? (
              <>
                <span className="rec-dot h-2 w-2 rounded-full bg-[var(--red)]" /> LIVE
              </>
            ) : (
              "ENDED"
            )}
          </span>
          <span className="rounded-full bg-black/45 px-2.5 py-1 font-mono text-[11px] backdrop-blur">
            {FEEDS[feed]}
          </span>
        </div>

        {/* countdown */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          {active ? (
            <div className="glass glass-strong flex items-center gap-3 rounded-2xl p-3">
              <div className="relative h-11 w-11">
                <svg viewBox="0 0 44 44" className="h-11 w-11 -rotate-90">
                  <circle cx="22" cy="22" r="19" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
                  <circle
                    cx="22" cy="22" r="19" fill="none"
                    stroke="var(--cyan)" strokeWidth="4" strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 19}
                    strokeDashoffset={(2 * Math.PI * 19 * (100 - pct)) / 100}
                    style={{ transition: "stroke-dashoffset 1s linear" }}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[13px] font-bold">
                  {remaining}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-semibold">Live access</p>
                <p className="text-[11px] text-ink/55">Ends automatically in {remaining}s</p>
              </div>
              <button onClick={() => setMuted((m) => !m)} className="pressable rounded-full bg-white/12 p-2.5">
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          ) : (
            <button onClick={restart} className="pressable w-full">
              <div className="glass glass-strong flex items-center justify-center gap-2 rounded-2xl py-3.5 text-[15px] font-semibold text-cyan">
                <RotateCcw size={18} /> Request 60s more
              </div>
            </button>
          )}
        </div>
      </Glass>

      {/* feed switcher */}
      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
        {FEEDS.map((f, i) => (
          <button
            key={f}
            onClick={() => { setFeed(i); restart(); }}
            className={`pressable whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-medium ${
              i === feed ? "bg-[var(--cyan)] text-black" : "glass"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* controls */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        <button className="pressable">
          <Glass className="flex items-center justify-center gap-2 py-3.5 text-[14px] font-semibold">
            <Camera size={18} color="var(--cyan)" /> Snapshot
          </Glass>
        </button>
        <button className="pressable">
          <Glass className="flex items-center justify-center gap-2 py-3.5 text-[14px] font-semibold">
            <Clock size={18} color="var(--cyan)" /> History
          </Glass>
        </button>
      </div>

      <Glass className="mt-3 flex items-start gap-3 p-4">
        <Lock size={18} color="var(--green)" className="mt-0.5 shrink-0" />
        <p className="text-[12.5px] leading-snug text-ink/65">
          Every viewing is logged and limited to 60 seconds to protect your neighbors&apos; privacy.
        </p>
      </Glass>
    </div>
  );
}
