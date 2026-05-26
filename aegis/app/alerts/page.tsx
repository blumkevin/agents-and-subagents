import { AlertsList } from "@/components/alerts-list";

export default function AlertsPage() {
  return (
    <div>
      <header className="px-1 pb-3 pt-2">
        <h1 className="text-[26px] font-bold tracking-tight">Alerts</h1>
        <p className="text-[13px] text-ink/55">Security events in and around Torre Aurora</p>
      </header>

      <AlertsList />
    </div>
  );
}
