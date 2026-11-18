import { useMemo } from "react";
import type { PowerPoint } from "../data/rides";

interface Props {
  data: PowerPoint[];
  ftp: number;
}

const W = 460;
const H = 220;
const PAD = { t: 16, r: 14, b: 30, l: 38 };

function fmtDuration(s: number) {
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${s / 60}m`;
  return `${s / 3600}h`;
}

export function PowerCurve({ data, ftp }: Props) {
  const { pts, area, maxW, y } = useMemo(() => {
    const maxW = Math.ceil(Math.max(...data.map((d) => d.watts)) / 100) * 100;
    const logMin = Math.log10(data[0].seconds);
    const logMax = Math.log10(data[data.length - 1].seconds);
    const plotW = W - PAD.l - PAD.r;
    const plotH = H - PAD.t - PAD.b;
    const x = (s: number) => PAD.l + ((Math.log10(s) - logMin) / (logMax - logMin)) * plotW;
    const y = (w: number) => PAD.t + plotH - (w / maxW) * plotH;
    const pts = data.map((d) => ({ ...d, px: x(d.seconds), py: y(d.watts) }));
    const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.px.toFixed(1)},${p.py.toFixed(1)}`).join(" ");
    const area = `${line} L${pts[pts.length - 1].px.toFixed(1)},${PAD.t + plotH} L${pts[0].px.toFixed(1)},${PAD.t + plotH} Z`;
    return { pts, area, maxW, x, y };
  }, [data]);

  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Power-duration curve">
      <defs>
        <linearGradient id="pcFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--acid)" stopOpacity="0.34" />
          <stop offset="100%" stopColor="var(--acid)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[0, 0.5, 1].map((f) => (
        <g key={f}>
          <line className="grid-line" x1={PAD.l} x2={W - PAD.r} y1={y(maxW * f)} y2={y(maxW * f)} />
          <text className="axis-label" x={PAD.l - 8} y={y(maxW * f) + 3} textAnchor="end">
            {Math.round(maxW * f)}
          </text>
        </g>
      ))}

      <line
        x1={PAD.l}
        x2={W - PAD.r}
        y1={y(ftp)}
        y2={y(ftp)}
        stroke="var(--hot)"
        strokeWidth={1}
        strokeDasharray="4 3"
      />
      <text className="axis-label" x={W - PAD.r} y={y(ftp) - 5} textAnchor="end" fill="var(--hot)">
        FTP {ftp}W
      </text>

      <path d={area} fill="url(#pcFill)" />
      <path d={pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.px.toFixed(1)},${p.py.toFixed(1)}`).join(" ")} fill="none" stroke="var(--acid)" strokeWidth={2} />

      {pts.map((p) => (
        <g key={p.seconds}>
          <circle cx={p.px} cy={p.py} r={3} fill="var(--bg)" stroke="var(--acid)" strokeWidth={1.8} />
          <text className="axis-label" x={p.px} y={H - 10} textAnchor="middle">
            {fmtDuration(p.seconds)}
          </text>
        </g>
      ))}
    </svg>
  );
}
