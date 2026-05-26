import { ReactNode } from "react";
import { StatusBar } from "./status-bar";
import { TabBar } from "./tab-bar";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 flex min-h-full w-full items-center justify-center p-6">
      <div
        className="relative h-[844px] w-[390px] shrink-0 overflow-hidden rounded-[58px] border border-white/15 bg-black shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
        style={{ boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 0 0 11px #0b0d12, 0 0 0 12px rgba(255,255,255,0.08)" }}
      >
        {/* screen background — gives the glass something to refract */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_50%_-5%,#16264a_0%,transparent_55%),linear-gradient(180deg,#0a0e1a_0%,#06070d_100%)]" />
          <div className="absolute -left-10 top-24 h-64 w-64 rounded-full bg-[var(--blue)] opacity-30 blur-[60px]" />
          <div className="absolute -right-12 top-1/2 h-64 w-64 rounded-full bg-[var(--violet)] opacity-25 blur-[70px]" />
          <div className="absolute bottom-10 left-1/4 h-56 w-56 rounded-full bg-[var(--cyan)] opacity-20 blur-[70px]" />
        </div>

        {/* dynamic island */}
        <div className="absolute left-1/2 top-2.5 z-30 h-[34px] w-[120px] -translate-x-1/2 rounded-full bg-black" />

        <StatusBar />

        <main className="no-scrollbar relative z-10 h-[calc(844px-44px)] overflow-y-auto px-4 pb-32 pt-2">
          {children}
        </main>

        <TabBar />
      </div>
    </div>
  );
}
