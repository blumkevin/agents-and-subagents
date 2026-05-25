import { SecurityAlert } from "@/lib/mock-data";

export const sevColor: Record<SecurityAlert["severity"], string> = {
  critical: "var(--red)",
  warning: "var(--orange)",
  info: "var(--cyan)",
};

export const sevLabel: Record<SecurityAlert["severity"], string> = {
  critical: "Critical",
  warning: "Warning",
  info: "Info",
};
