import { useState } from "react";
import {
  athlete,
  fitnessTrend,
  hrZones,
  powerCurve,
  rides,
  weeklyLoad,
} from "./data/rides";
import { Kpi } from "./components/Kpi";
import { LoadChart } from "./components/LoadChart";
import { PowerCurve } from "./components/PowerCurve";
import { RideTable } from "./components/RideTable";
import { RouteMap } from "./components/RouteMap";
import {
  IconBolt,
  IconCalendar,
  IconCog,
  IconDashboard,
  IconHeart,
  IconRoute,
} from "./components/icons";

const NAV = [
  { id: "dashboard", label: "Dashboard", Icon: IconDashboard },
  { id: "rides", label: "Rides", Icon: IconRoute },
  { id: "power", label: "Power", Icon: IconBolt },
  { id: "health", label: "Health", Icon: IconHeart },
  { id: "calendar", label: "Plan", Icon: IconCalendar },
  { id: "settings", label: "Settings", Icon: IconCog },
];

const RANGES = ["7D", "30D", "90D", "Season"];

export default function App() {
  const [nav, setNav] = useState("dashboard");
  const [range, setRange] = useState("30D");

  const totalKm = rides.reduce((s, r) => s + r.distanceKm, 0);
  const totalTss = rides.reduce((s, r) => s + r.tss, 0);
  const totalElev = rides.reduce((s, r) => s + r.elevationM, 0);
  const totalHrs = rides.reduce((s, r) => s + r.durationMin, 0) / 60;
  const seasonPct = Math.round((athlete.seasonDoneKm / athlete.seasonGoalKm) * 100);

  return (
    <div className="shell">
      <aside className="rail">
        <div className="brand">
          <div className="brand-mark">
            <IconBolt size={19} />
          </div>
          <div>
            <div className="brand-name">CADENCE</div>
            <div className="brand-sub">Telemetry</div>
          </div>
        </div>

        <nav className="nav" aria-label="Primary">
          <div className="nav-label">Menu</div>
          {NAV.map(({ id, label, Icon }) => (
            <button
              key={id}
              className="nav-item"
              aria-current={nav === id ? "page" : undefined}
              onClick={() => setNav(id)}
            >
              <Icon />
              {label}
            </button>
          ))}
        </nav>

        <div className="rail-foot">
          <div className="form-widget">
            <div className="fw-top">
              <span>Form · TSB</span>
              <span>W47</span>
            </div>
            <div className="fw-val">
              {fitnessTrend.tsb > 0 ? "+" : ""}
              {fitnessTrend.tsb}
            </div>
            <div className="fw-note">{fitnessTrend.form} — ease off before race day</div>
          </div>

          <div className="rider-mini">
            <div className="avatar">{athlete.initials}</div>
            <div>
              <div className="rm-name">{athlete.name}</div>
              <div className="rm-team">{athlete.team}</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="crumbs">
            Athlete / <b>{nav}</b>
          </div>
          <div className="topbar-right">
            <span className="live">
              <span className="dot" />
              Live sync
            </span>
            <div className="seg" role="group" aria-label="Date range">
              {RANGES.map((r) => (
                <button key={r} aria-pressed={range === r} onClick={() => setRange(r)}>
                  {r}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="content">
          <section className="hero">
            <div className="hero-copy">
              <span className="eyebrow">Season 2026 · Week 47</span>
              <h1>
                Ride data,
                <br />
                <em>dialled in.</em>
              </h1>
              <p>
                Every watt, beat and metre of your last {rides.length} sessions — power,
                heart rate and load in one pit-wall view. {totalKm.toFixed(0)} km logged
                across the {range.toLowerCase()} window.
              </p>
              <div className="hero-actions">
                <button className="btn btn-solid">Analyse latest ride</button>
                <button className="btn">Export FIT</button>
              </div>
            </div>

            <div className="map-card">
              <RouteMap />
              <div className="map-badge">North Loop · Fjordveien</div>
              <div className="map-stats">
                <div>
                  <div className="ms-k">Distance</div>
                  <div className="ms-v">
                    84.6<span>km</span>
                  </div>
                </div>
                <div>
                  <div className="ms-k">Elevation</div>
                  <div className="ms-v">
                    1120<span>m</span>
                  </div>
                </div>
                <div>
                  <div className="ms-k">Norm power</div>
                  <div className="ms-v">
                    271<span>W</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="kpis">
            <Kpi index={0} label="Total distance" value={totalKm.toFixed(0)} unit="km" delta={8.4} />
            <Kpi index={1} label="Training load" value={String(totalTss)} unit="TSS" delta={12.1} />
            <Kpi index={2} label="Elevation gained" value={totalElev.toLocaleString()} unit="m" delta={-3.2} />
            <Kpi
              index={3}
              label="Avg heart rate"
              value={String(Math.round(rides.reduce((s, r) => s + r.avgHrBpm, 0) / rides.length))}
              unit="bpm"
              delta={-1.8}
              accent="var(--hot)"
              invert
            />
          </section>

          <section className="grid-2">
            <div className="panel">
              <div className="panel-head">
                <div>
                  <h2>Weekly Load</h2>
                  <div className="sub">Training stress score · {totalHrs.toFixed(1)}h total</div>
                </div>
                <div className="legend">
                  <span>
                    <i style={{ background: "var(--acid)" }} />
                    TSS
                  </span>
                  <span>
                    <i style={{ background: "var(--acid-dim)" }} />
                    Avg
                  </span>
                </div>
              </div>
              <div className="panel-body">
                <LoadChart data={weeklyLoad} />
              </div>
            </div>

            <div className="panel">
              <div className="panel-head">
                <div>
                  <h2>Heart Rate Zones</h2>
                  <div className="sub">Time in zone · last 30 days</div>
                </div>
              </div>
              <div className="panel-body">
                {hrZones.map((z, i) => {
                  const total = hrZones.reduce((s, x) => s + x.minutes, 0);
                  const pct = (z.minutes / total) * 100;
                  return (
                    <div className="zone" key={z.zone}>
                      <div>
                        <div className="zone-tag" style={{ color: z.color }}>
                          {z.zone}
                        </div>
                        <div className="zone-name">{z.label}</div>
                      </div>
                      <div className="zone-track">
                        <div
                          className="zone-fill"
                          style={{
                            width: `${pct}%`,
                            background: z.color,
                            animationDelay: `${i * 90}ms`,
                          }}
                        />
                      </div>
                      <div className="zone-min">
                        <b>{Math.floor(z.minutes / 60)}</b>h {z.minutes % 60}m
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="grid-2b">
            <div className="panel">
              <div className="panel-head">
                <div>
                  <h2>Power Curve</h2>
                  <div className="sub">Best efforts · current season</div>
                </div>
              </div>
              <div className="panel-body">
                <PowerCurve data={powerCurve} ftp={athlete.ftp} />
              </div>
            </div>

            <div className="panel">
              <div className="panel-head">
                <div>
                  <h2>Fitness &amp; Form</h2>
                  <div className="sub">CTL / ATL / TSB model</div>
                </div>
              </div>
              <div className="panel-body">
                <div className="fit">
                  <div>
                    <div className="f-k">CTL · Fitness</div>
                    <div className="f-v">{fitnessTrend.ctl}</div>
                    <div className="f-n">42-day load average</div>
                  </div>
                  <div>
                    <div className="f-k">ATL · Fatigue</div>
                    <div className="f-v" style={{ color: "var(--amber)" }}>
                      {fitnessTrend.atl}
                    </div>
                    <div className="f-n">7-day load average</div>
                  </div>
                  <div>
                    <div className="f-k">TSB · Form</div>
                    <div className="f-v" style={{ color: "var(--hot)" }}>
                      {fitnessTrend.tsb}
                    </div>
                    <div className="f-n">{fitnessTrend.form}</div>
                  </div>
                </div>

                <div className="panel-body" style={{ padding: "17px 0 0" }}>
                  {[
                    ["VO₂ Max", `${athlete.vo2max}`, "ml/kg/min"],
                    ["FTP", `${athlete.ftp}`, "W · 5.1 W/kg"],
                    ["Resting HR", `${athlete.restingHr}`, "bpm"],
                    ["Max HR", `${athlete.maxHr}`, "bpm"],
                    ["Weight", `${athlete.weightKg}`, "kg"],
                    ["Season progress", `${seasonPct}`, `% of ${athlete.seasonGoalKm} km`],
                  ].map(([k, v, n]) => (
                    <div className="zone" key={k} style={{ gridTemplateColumns: "1fr auto" }}>
                      <div>
                        <div className="zone-name" style={{ fontSize: "9.5px" }}>
                          {n}
                        </div>
                        <div style={{ fontWeight: 600, fontSize: 15, marginTop: 2 }}>{k}</div>
                      </div>
                      <div className="zone-min">
                        <b style={{ fontSize: 19 }}>{v}</b>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="panel-head">
              <div>
                <h2>Recent Rides</h2>
                <div className="sub">{rides.length} sessions · newest first</div>
              </div>
              <button className="btn" style={{ padding: "8px 14px" }}>
                View all
              </button>
            </div>
            <RideTable rides={rides} />
          </section>
        </div>

        <footer className="strip">
          <span>
            <b>CADENCE</b> telemetry
          </span>
          <span>
            Last sync <b>2 min ago</b>
          </span>
          <span>
            Device <b>Wahoo ELEMNT</b>
          </span>
          <span>
            HR <b>Polar H10</b>
          </span>
          <span>
            Data <b>demo fixture</b>
          </span>
        </footer>
      </main>
    </div>
  );
}
