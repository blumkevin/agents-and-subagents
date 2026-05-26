import { CSSProperties, ReactNode } from "react";

type GlassProps = {
  children: ReactNode;
  className?: string;
  tint?: "blue" | "red" | "green";
  strong?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
};

export function Glass({ children, className = "", tint, strong, onClick, style }: GlassProps) {
  const tintClass = tint ? `glass-tint-${tint}` : "";
  return (
    <div
      onClick={onClick}
      style={style}
      className={`glass ${strong ? "glass-strong" : ""} ${tintClass} ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between px-1 mt-6 mb-2.5">
      <h2 className="text-[15px] font-semibold tracking-tight text-ink/90">{children}</h2>
      {action}
    </div>
  );
}
