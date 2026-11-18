import { useMemo, useState } from "react";
import type { WeekLoad } from "../data/rides";

interface Props {
  data: WeekLoad[];
}

const W = 640;
const H = 220;
const PAD = { t: 16, r: 12, b: 28, l: 34 };

export function LoadChart({ data }: Props) {
  const [active, setActive] = useState<number | null>(null);

  const { max, barW, gap, plotH } = useMemo(() => {
    const max = Math.ceil(Math.max(...data.map((d) => d.tss)) / 100) * 100;
    const plotW = W - PAD.l - PAD.r;
    const plotH = H - PAD.t - PAD.b;
    const slot = plotW / data.length;
    return { max, barW: slot * 0.56, gap: slot, plotH };
  }, [data]);

  const avg = Math.round(data.reduce((s, d) => s + d.tss, 0) / data.length);
  const y = (v: number) => PAD.t + plotH - (v / max) * plotH;

  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Weekly training load in TSS">
      {[0, 0.25, 0.5, 0.75, 1].map((f) => (
        <g key={f}>
          <line className="grid-line" x1={PAD.l} x2={W - PAD.r} y1={y(max * f)} y2={y(max * f)} />
          <text className="axis-label" x={PAD.l - 8} y={y(max * f) + 3} textAnchor="end">
            {Math.round(max * f)}
          </text>
        </g>
      ))}

      <line
        x1={PAD.l}
        x2={W - PAD.r}
        y1={y(avg)}
        y2={y(avg)}
        stroke="var(--acid-dim)"
        strokeWidth={1}
        strokeDasharray="3 4"
        opacity={0.8}
      />
      <text className="axis-label" x={W - PAD.r} y={y(avg) - 5} textAnchor="end" fill="var(--acid-dim)">
        AVG {avg}
      </text>

      {data.map((d, i) => {
        const x = PAD.l + i * gap + (gap - barW) / 2;
        const h = (d.tss / max) * plotH;
        const isActive = active === i;
        const top = PAD.t + plotH - h;
        return (
          <g
            key={d.label}
            className="bar"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <rect x={x} y={top} width={barW} height={h} fill={isActive ? "var(--acid)" : "var(--acid-dim)"} />
            <rect x={x} y={top} width={barW} height={3} fill="var(--acid)" />
            <text className="axis-label" x={x + barW / 2} y={H - 9} textAnchor="middle">
              {d.label}
            </text>
            {isActive && (
              <text className="axis-label" x={x + barW / 2} y={top - 6} textAnchor="middle" fill="var(--ink)">
                {d.tss} · {d.hours}h
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
