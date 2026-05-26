"use client";

import { useEffect, useRef, useState } from "react";
import { Footprints, Car, MapPin, Phone, ShieldAlert } from "lucide-react";
import { Glass } from "@/components/glass";

type Mode = "none" | "walking" | "car";

export default function SafetyPage() {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const [mode, setMode] = useState<Mode>("none");
  const raf = useRef<number | null>(null);
  const start = useRef(0);

  useEffect(() => {
    if (!holding) return;
    start.current = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start.current) / 1500);
      setProgress(p);
      if (p >= 1) {
        setTriggered(true);
        setHolding(false);
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [holding]);

  function press() {
    if (!triggered) setHolding(true);
  }
  function release() {
    setHolding(false);
    setProgress((p) => (triggered ? p : 0));
  }

  return (
    <div>
      <header className="px-1 pb-4 pt-2">
        <h1 className="text-[26px] font-bold tracking-tight">Safety</h1>
        <p className="text-[13px] text-ink/55">You&apos;re one tap from the monitoring station</p>
      </header>

      {/* SOS */}
      <div className="relative flex flex-col items-center py-3">
        {!triggered && holding && (
          <span className="sos-ring absolute top-3 h-44 w-44 rounded-full bg-[var(--red)]/40" />
        )}
        <button
          onMouseDown={press}
          onMouseUp={release}
          onMouseLeave={release}
          onTouchStart={press}
          onTouchEnd={release}
          className="pressable relative h-44 w-44 select-none rounded-full"
          style={{ touchAction: "none" }}
        >
          <svg viewBox="0 0 176 176" className="absolute inset-0 -rotate-90">
            <circle cx="88" cy="88" r="82" fill="none" stroke="rgba(255,69,58,0.2)" strokeWidth="6" />
            <circle
              cx="88" cy="88" r="82" fill="none" stroke="var(--red)" strokeWidth="6" strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 82}
              strokeDashoffset={2 * Math.PI * 82 * (1 - progress)}
            />
          </svg>
          <span className="glass glass-tint-red absolute inset-3 flex flex-col items-center justify-center rounded-full">
            <ShieldAlert size={44} color="var(--red)" strokeWidth={2.1} />
            <span className="mt-1 text-[22px] font-extrabold tracking-tight" style={{ color: triggered ? "var(--red)" : "white" }}>
              {triggered ? "SENT" : "SOS"}
            </span>
          </span>
        </button>
        <p className="mt-4 text-[13px] text-ink/55">
          {triggered ? "Monitoring station notified · stay on the line" : "Press and hold to alert monitoring"}
        </p>
        {triggered && (
          <button onClick={() => { setTriggered(false); setProgress(0); }} className="mt-3 text-[13px] font-medium text-cyan">
            Cancel alert
          </button>
        )}
      </div>

      {/* call row */}
      <Glass className="mt-2 flex items-center gap-3.5 p-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--green)]/22">
          <Phone size={20} color="var(--green)" />
        </div>
        <div className="flex-1">
          <p className="text-[14.5px] font-semibold">Call monitoring station</p>
          <p className="text-[12px] text-ink/55">24/7 · avg. answer 8s</p>
        </div>
      </Glass>

      {/* modes */}
      <h2 className="px-1 pb-2 pt-6 text-[15px] font-semibold">Travel modes</h2>
      <div className="grid grid-cols-2 gap-3">
        <ModeCard
          active={mode === "walking"}
          onClick={() => setMode((m) => (m === "walking" ? "none" : "walking"))}
          Icon={Footprints}
          label="Walking mode"
          sub="Share live location while you're out"
          accent="var(--green)"
        />
        <ModeCard
          active={mode === "car"}
          onClick={() => setMode((m) => (m === "car" ? "none" : "car"))}
          Icon={Car}
          label="Car mode"
          sub="Auto-arms on garage arrival"
          accent="var(--orange)"
        />
      </div>

      {mode !== "none" && (
        <Glass tint="green" className="mt-3 flex items-center gap-3 p-4">
          <span className="relative flex h-3 w-3">
            <span className="sos-ring absolute inline-flex h-3 w-3 rounded-full bg-[var(--green)]" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--green)]" />
          </span>
          <div className="flex-1">
            <p className="text-[14px] font-semibold">
              {mode === "walking" ? "Walking mode active" : "Car mode active"}
            </p>
            <p className="flex items-center gap-1 text-[12px] text-ink/60">
              <MapPin size={12} /> Live location shared with the central
            </p>
          </div>
        </Glass>
      )}

      <Glass className="mt-3 p-4">
        <p className="text-[12px] leading-snug text-ink/55">
          Demo only. SOS and location sharing must be backed by hardened,
          redundant monitoring infrastructure before real use.
        </p>
      </Glass>
    </div>
  );
}

function ModeCard({
  active, onClick, Icon, label, sub, accent,
}: {
  active: boolean; onClick: () => void; Icon: typeof Footprints; label: string; sub: string; accent: string;
}) {
  return (
    <button onClick={onClick} className="pressable text-left">
      <Glass
        className="flex h-[132px] flex-col justify-between p-4"
        style={active ? { boxShadow: `inset 0 0 0 1.5px ${accent}, 0 8px 30px rgba(0,0,0,0.35)` } : undefined}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: `${accent}28` }}>
          <Icon size={21} color={accent} strokeWidth={2.1} />
        </div>
        <div>
          <p className="text-[14.5px] font-semibold leading-tight">{label}</p>
          <p className="mt-0.5 text-[11px] leading-snug text-ink/55">{sub}</p>
        </div>
      </Glass>
    </button>
  );
}
