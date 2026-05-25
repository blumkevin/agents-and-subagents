import { LucideIcon, Eye, Volume2, ShieldAlert, DoorOpen, Flame, Info } from "lucide-react";
import { SecurityAlert } from "@/lib/mock-data";

const map: Record<SecurityAlert["kind"], LucideIcon> = {
  loitering: Eye,
  noise: Volume2,
  robbery: ShieldAlert,
  intrusion: DoorOpen,
  fire: Flame,
  info: Info,
};

export function alertIcon(kind: SecurityAlert["kind"]): LucideIcon {
  return map[kind] ?? Info;
}
