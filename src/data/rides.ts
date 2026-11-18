export type RideType = "Road" | "Gravel" | "Indoor" | "Climb" | "Recovery";

export interface Ride {
  id: string;
  name: string;
  date: string; // ISO
  type: RideType;
  distanceKm: number;
  elevationM: number;
  durationMin: number;
  avgPowerW: number;
  normPowerW: number;
  avgHrBpm: number;
  avgSpeedKph: number;
  cadenceRpm: number;
  tss: number;
  route: string;
}

export interface WeekLoad {
  label: string;
  tss: number;
  hours: number;
}

export interface PowerPoint {
  seconds: number;
  watts: number;
}

export interface HrZone {
  zone: string;
  label: string;
  minutes: number;
  color: string;
}

export const athlete = {
  name: "Mira Halvorsen",
  handle: "@mira.rides",
  initials: "MH",
  team: "Velo Nord Racing",
  ftp: 312,
  weightKg: 61.4,
  restingHr: 42,
  maxHr: 191,
  vo2max: 68.2,
  seasonGoalKm: 12000,
  seasonDoneKm: 8420,
};

export const rides: Ride[] = [
  {
    id: "r-1042",
    name: "Threshold Block — North Loop",
    date: "2026-11-18T06:12:00",
    type: "Road",
    distanceKm: 84.6,
    elevationM: 1120,
    durationMin: 168,
    avgPowerW: 246,
    normPowerW: 271,
    avgHrBpm: 158,
    avgSpeedKph: 30.2,
    cadenceRpm: 88,
    tss: 218,
    route: "North Loop · Fjordveien",
  },
  {
    id: "r-1039",
    name: "Gravel Recon — Pine Traverse",
    date: "2026-11-16T09:40:00",
    type: "Gravel",
    distanceKm: 63.2,
    elevationM: 890,
    durationMin: 151,
    avgPowerW: 208,
    normPowerW: 238,
    avgHrBpm: 146,
    avgSpeedKph: 25.1,
    cadenceRpm: 81,
    tss: 164,
    route: "Pine Traverse · Sector 4",
  },
  {
    id: "r-1035",
    name: "VO2 Microbursts",
    date: "2026-11-14T18:05:00",
    type: "Indoor",
    distanceKm: 41.8,
    elevationM: 120,
    durationMin: 72,
    avgPowerW: 262,
    normPowerW: 288,
    avgHrBpm: 166,
    avgSpeedKph: 34.8,
    cadenceRpm: 95,
    tss: 121,
    route: "Trainer · Erg Session",
  },
  {
    id: "r-1031",
    name: "Col Repeats — Stegghorn",
    date: "2026-11-12T07:15:00",
    type: "Climb",
    distanceKm: 58.4,
    elevationM: 1980,
    durationMin: 174,
    avgPowerW: 231,
    normPowerW: 268,
    avgHrBpm: 154,
    avgSpeedKph: 20.1,
    cadenceRpm: 76,
    tss: 196,
    route: "Stegghorn · 3× ascent",
  },
  {
    id: "r-1028",
    name: "Endurance Spin",
    date: "2026-11-10T16:30:00",
    type: "Recovery",
    distanceKm: 52.0,
    elevationM: 410,
    durationMin: 118,
    avgPowerW: 168,
    normPowerW: 184,
    avgHrBpm: 128,
    avgSpeedKph: 26.4,
    cadenceRpm: 84,
    tss: 74,
    route: "Riverside · Easy Out",
  },
  {
    id: "r-1024",
    name: "Sprint Ladder",
    date: "2026-11-08T10:00:00",
    type: "Road",
    distanceKm: 71.3,
    elevationM: 640,
    durationMin: 139,
    avgPowerW: 254,
    normPowerW: 279,
    avgHrBpm: 161,
    avgSpeedKph: 30.8,
    cadenceRpm: 90,
    tss: 188,
    route: "Harbour Flats · Ladder",
  },
];

export const weeklyLoad: WeekLoad[] = [
  { label: "W41", tss: 402, hours: 8.5 },
  { label: "W42", tss: 518, hours: 11.2 },
  { label: "W43", tss: 344, hours: 7.4 },
  { label: "W44", tss: 601, hours: 12.8 },
  { label: "W45", tss: 466, hours: 10.1 },
  { label: "W46", tss: 589, hours: 12.2 },
  { label: "W47", tss: 712, hours: 14.6 },
  { label: "W48", tss: 275, hours: 6.2 },
];

export const powerCurve: PowerPoint[] = [
  { seconds: 1, watts: 1080 },
  { seconds: 5, watts: 921 },
  { seconds: 15, watts: 742 },
  { seconds: 30, watts: 618 },
  { seconds: 60, watts: 512 },
  { seconds: 120, watts: 438 },
  { seconds: 300, watts: 366 },
  { seconds: 600, watts: 328 },
  { seconds: 1200, watts: 296 },
  { seconds: 1800, watts: 274 },
  { seconds: 3600, watts: 241 },
];

export const hrZones: HrZone[] = [
  { zone: "Z1", label: "Recovery", minutes: 96, color: "#5b7f6a" },
  { zone: "Z2", label: "Endurance", minutes: 284, color: "#8fd14f" },
  { zone: "Z3", label: "Tempo", minutes: 152, color: "#d8ff3e" },
  { zone: "Z4", label: "Threshold", minutes: 88, color: "#ffb02e" },
  { zone: "Z5", label: "VO2 Max", minutes: 34, color: "#ff5a3c" },
];

export const fitnessTrend = {
  ctl: 78,
  atl: 91,
  tsb: -13,
  form: "Fatigued",
  ctlDelta: 4.2,
};
