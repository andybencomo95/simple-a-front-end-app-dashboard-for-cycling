export function RouteMap() {
  // Stylised topo/recon map of the current session route.
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M25 0H0V25" fill="none" stroke="var(--line)" strokeWidth="0.6" />
        </pattern>
        <linearGradient id="trace" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--lime)" />
          <stop offset="100%" stopColor="var(--acid)" />
        </linearGradient>
      </defs>

      <rect width="400" height="300" fill="url(#grid)" />

      {/* contour rings */}
      {[
        [70, 190, 46],
        [70, 190, 30],
        [330, 80, 52],
        [330, 80, 34],
        [210, 250, 38],
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke="var(--line-2)" strokeWidth="0.8" opacity="0.7" />
      ))}

      {/* water */}
      <path d="M0 236 Q60 220 96 244 T190 250 L190 300 L0 300 Z" fill="rgba(63,90,143,0.16)" stroke="var(--line-2)" strokeWidth="0.7" />

      {/* route */}
      <path
        d="M42 258 C70 232 66 196 104 182 C142 168 150 132 190 122 C232 112 250 84 292 76 C324 70 344 56 372 44"
        fill="none"
        stroke="url(#trace)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeDasharray="260"
        strokeDashoffset="260"
        style={{ animation: "draw 2.4s 0.35s cubic-bezier(0.4,0,0.2,1) forwards" }}
      />

      <circle cx="42" cy="258" r="5.5" fill="var(--lime)" stroke="var(--bg)" strokeWidth="2" />
      <circle cx="372" cy="44" r="6" fill="var(--acid)" stroke="var(--bg)" strokeWidth="2" />
      <text x="42" y="280" className="axis-label" textAnchor="middle">START</text>
      <text x="372" y="34" className="axis-label" textAnchor="middle" fill="var(--acid)">FINISH</text>

      {/* climb markers */}
      {[
        [150, 132],
        [292, 76],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <path d={`M${cx} ${cy - 7} l7 12 h-14 z`} fill="var(--amber)" />
          <text x={cx} y={cy - 11} className="axis-label" textAnchor="middle" fill="var(--amber)">
            KOM{i + 1}
          </text>
        </g>
      ))}

      <style>{`@keyframes draw { to { stroke-dashoffset: 0; } }`}</style>
    </svg>
  );
}
