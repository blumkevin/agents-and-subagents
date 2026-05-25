"use client";

import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";
import { SecurityAlert } from "@/lib/mock-data";
import { AlertSheet } from "@/components/alert-sheet";

type AlertsContextValue = {
  acknowledgedIds: string[];
  mutedKinds: SecurityAlert["kind"][];
  openAlertId: string | null;
  toggleAcknowledge: (id: string) => void;
  toggleMuteKind: (kind: SecurityAlert["kind"]) => void;
  openAlert: (id: string) => void;
  closeAlert: () => void;
  escalate: (id: string) => void;
};

const AlertsContext = createContext<AlertsContextValue | null>(null);

export function AlertsProvider({ children }: { children: ReactNode }) {
  const [acknowledgedIds, setAcknowledgedIds] = useState<string[]>([]);
  const [mutedKinds, setMutedKinds] = useState<SecurityAlert["kind"][]>([]);
  const [openAlertId, setOpenAlertId] = useState<string | null>(null);

  const toggleAcknowledge = useCallback((id: string) => {
    setAcknowledgedIds((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]
    );
  }, []);

  const toggleMuteKind = useCallback((kind: SecurityAlert["kind"]) => {
    setMutedKinds((kinds) =>
      kinds.includes(kind) ? kinds.filter((x) => x !== kind) : [...kinds, kind]
    );
  }, []);

  const openAlert = useCallback((id: string) => setOpenAlertId(id), []);
  const closeAlert = useCallback(() => setOpenAlertId(null), []);

  const escalate = useCallback((id: string) => {
    // Pure stub — life-safety paths must be backed by hardened infrastructure.
    // No network call is made here.
    console.info("[stub] escalate alert to monitoring:", id);
  }, []);

  const value = useMemo<AlertsContextValue>(
    () => ({
      acknowledgedIds,
      mutedKinds,
      openAlertId,
      toggleAcknowledge,
      toggleMuteKind,
      openAlert,
      closeAlert,
      escalate,
    }),
    [acknowledgedIds, mutedKinds, openAlertId, toggleAcknowledge, toggleMuteKind, openAlert, closeAlert, escalate]
  );

  return (
    <AlertsContext.Provider value={value}>
      {children}
      <AlertSheet />
    </AlertsContext.Provider>
  );
}

export function useAlerts(): AlertsContextValue {
  const ctx = useContext(AlertsContext);
  if (!ctx) {
    throw new Error("useAlerts must be used within an AlertsProvider");
  }
  return ctx;
}
