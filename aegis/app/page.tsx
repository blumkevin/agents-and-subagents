import Link from "next/link";
import { Video, Footprints, Car, ShieldCheck, Cctv, Users } from "lucide-react";
import { Glass, SectionTitle } from "@/components/glass";
import { QuickAction, ListLink, Pill } from "@/components/ui";
import { AlertsList } from "@/components/alerts-list";
import { building } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div>
      <header className="px-1 pt-2">
        <p className="text-[13px] font-medium text-ink/50">Good evening</p>
        <h1 className="text-[28px] font-bold tracking-tight">Sofía</h1>
      </header>

      <Glass tint="green" className="sweep mt-4 overflow-hidden p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[13px] text-ink/60">{building.name}</p>
            <p className="text-[20px] font-bold leading-tight">{building.unit}</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--green)]/25">
            <ShieldCheck size={26} color="var(--green)" strokeWidth={2.2} />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2.5">
          <Pill color="var(--green)">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--green)]" /> Armed · All clear
          </Pill>
          <Pill>
            <Cctv size={13} /> {building.camerasOnline} cameras
          </Pill>
          <Pill>
            <Users size={13} /> {building.residents}
          </Pill>
        </div>
      </Glass>

      <SectionTitle>Quick actions</SectionTitle>
      <div className="grid grid-cols-2 gap-3">
        <QuickAction href="/camera" Icon={Video} label="Hallway cam" sub="60s live access" tint="blue" accent="var(--cyan)" />
        <QuickAction href="/safety" Icon={ShieldCheck} label="SOS" sub="Call monitoring" tint="red" accent="var(--red)" />
        <QuickAction href="/safety" Icon={Footprints} label="Walking mode" sub="Share live location" accent="var(--green)" />
        <QuickAction href="/safety" Icon={Car} label="Car mode" sub="Garage arrival" accent="var(--orange)" />
      </div>

      <SectionTitle
        action={
          <Link href="/alerts">
            <ListLink>See all</ListLink>
          </Link>
        }
      >
        Recent activity
      </SectionTitle>
      <AlertsList limit={3} />
    </div>
  );
}
