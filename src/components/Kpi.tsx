import { IconArrowDown, IconArrowUp } from "./icons";

interface KpiProps {
  label: string;
  value: string;
  unit?: string;
  delta?: number;
  deltaLabel?: string;
  accent?: string;
  invert?: boolean;
  index?: number;
}

export function Kpi({
  label,
  value,
  unit,
  delta,
  deltaLabel = "vs last week",
  accent = "var(--acid)",
  invert = false,
  index = 0,
}: KpiProps) {
  const up = (delta ?? 0) >= 0;
  const good = invert ? !up : up;

  return (
    <div className="kpi" style={{ ["--accent" as string]: accent, animationDelay: `${index * 60}ms` }}>
      <div className="k-label">
        <span>{label}</span>
      </div>
      <div className="k-val">
        {value}
        {unit && <small>{unit}</small>}
      </div>
      {delta !== undefined && (
        <div className="k-foot">
          <span className={`trend ${good ? "up" : "down"}`}>
            {up ? <IconArrowUp /> : <IconArrowDown />}
            {Math.abs(delta)}
            {typeof delta === "number" && "%"}
          </span>
          {deltaLabel}
        </div>
      )}
    </div>
  );
}
