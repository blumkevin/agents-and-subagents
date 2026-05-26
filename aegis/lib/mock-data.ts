// Mocked data for the Aegis prototype. No real backend — all life-safety
// integrations (SOS dispatch, monitoring, location) are stubbed and MUST be
// replaced by hardened infrastructure before any real deployment.

export type AlertSeverity = "critical" | "warning" | "info";

export type SecurityAlert = {
  id: string;
  title: string;
  detail: string;
  location: string;
  time: string;
  severity: AlertSeverity;
  kind: "loitering" | "noise" | "robbery" | "intrusion" | "fire" | "info";
};

export type Incident = {
  id: string;
  type: string;
  emoji: string;
  note: string;
  distance: string;
  time: string;
  confirms: number;
};

export type Member = {
  id: string;
  name: string;
  role: string;
  faceId: boolean;
  initials: string;
  accent: string;
};

export const building = {
  name: "Torre Aurora",
  unit: "Apt 14B",
  status: "Armed · All clear",
  residents: 128,
  camerasOnline: 6,
};

export const alerts: SecurityAlert[] = [
  {
    id: "a1",
    title: "Person loitering",
    detail: "Individual detected near the main entrance for 4+ minutes.",
    location: "Lobby · Cam 1",
    time: "2 min ago",
    severity: "warning",
    kind: "loitering",
  },
  {
    id: "a2",
    title: "Loud noise detected",
    detail: "Sudden high-decibel event picked up by hallway sensor.",
    location: "Floor 14 · Hall",
    time: "18 min ago",
    severity: "warning",
    kind: "noise",
  },
  {
    id: "a3",
    title: "Resident reported robbery",
    detail: "A neighbor triggered an SOS one block away. Stay alert.",
    location: "Calle 7 · Nearby",
    time: "41 min ago",
    severity: "critical",
    kind: "robbery",
  },
  {
    id: "a4",
    title: "Garage door left open",
    detail: "Door has been open for 9 minutes outside normal hours.",
    location: "Parking · Level -1",
    time: "1 hr ago",
    severity: "info",
    kind: "info",
  },
];

export const incidents: Incident[] = [
  { id: "i1", type: "Suspicious person", emoji: "👁️", note: "Watching parked cars on the corner", distance: "120 m", time: "5 min", confirms: 8 },
  { id: "i2", type: "Theft attempt", emoji: "🚨", note: "Someone tried a car door handle", distance: "300 m", time: "22 min", confirms: 14 },
  { id: "i3", type: "Broken streetlight", emoji: "💡", note: "Dark stretch near the park entrance", distance: "450 m", time: "1 hr", confirms: 5 },
  { id: "i4", type: "Police checkpoint", emoji: "🚓", note: "Routine stop on the main avenue", distance: "800 m", time: "2 hr", confirms: 21 },
];

export const members: Member[] = [
  { id: "m1", name: "Sofía Reyes", role: "Owner", faceId: true, initials: "SR", accent: "var(--blue)" },
  { id: "m2", name: "Daniel Reyes", role: "Partner", faceId: true, initials: "DR", accent: "var(--violet)" },
  { id: "m3", name: "Lucía Reyes", role: "Daughter · 16", faceId: false, initials: "LR", accent: "var(--cyan)" },
  { id: "m4", name: "Marta Gómez", role: "Caregiver", faceId: true, initials: "MG", accent: "var(--green)" },
];
