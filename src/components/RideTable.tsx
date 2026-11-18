import type { Ride } from "../data/rides";

interface Props {
  rides: Ride[];
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }).toUpperCase();

const fmtDur = (min: number) => `${Math.floor(min / 60)}h ${String(min % 60).padStart(2, "0")}m`;

export function RideTable({ rides }: Props) {
  const maxTss = Math.max(...rides.map((r) => r.tss));

  return (
    <div className="table-wrap">
      <table className="rides">
        <thead>
          <tr>
            <th>Session</th>
            <th>Type</th>
            <th className="num">Distance</th>
            <th className="num">Elev</th>
            <th className="num">Time</th>
            <th className="num">Avg W</th>
            <th className="num">NP</th>
            <th className="num">HR</th>
            <th className="num">TSS</th>
          </tr>
        </thead>
        <tbody>
          {rides.map((r) => (
            <tr key={r.id}>
              <td className="ride-name">
                {r.name}
                <div className="route">
                  {fmtDate(r.date)} · {r.route}
                </div>
              </td>
              <td>
                <span className={`pill ${r.type}`}>{r.type}</span>
              </td>
              <td className="num">{r.distanceKm.toFixed(1)} km</td>
              <td className="num">{r.elevationM} m</td>
              <td className="num">{fmtDur(r.durationMin)}</td>
              <td className="num">{r.avgPowerW}</td>
              <td className="num">{r.normPowerW}</td>
              <td className="num">{r.avgHrBpm}</td>
              <td className="num">
                <div className="tss-bar">
                  <span>{r.tss}</span>
                  <span className="tb">
                    <i style={{ width: `${(r.tss / maxTss) * 100}%` }} />
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
