import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const IconDashboard = ({ size = 17, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <rect x="3" y="3" width="7.5" height="7.5" />
    <rect x="13.5" y="3" width="7.5" height="7.5" />
    <rect x="3" y="13.5" width="7.5" height="7.5" />
    <rect x="13.5" y="13.5" width="7.5" height="7.5" />
  </svg>
);

export const IconBolt = ({ size = 17, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12z" />
  </svg>
);

export const IconRoute = ({ size = 17, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="6" cy="19" r="2.6" />
    <circle cx="18" cy="5" r="2.6" />
    <path d="M8.6 19h5.4a4 4 0 0 0 0-8H10a4 4 0 0 1 0-8h5.4" />
  </svg>
);

export const IconHeart = ({ size = 17, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 20s-7-4.4-7-9.3A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7 3.1C19 15.6 12 20 12 20z" />
  </svg>
);

export const IconCalendar = ({ size = 17, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <rect x="3" y="5" width="18" height="16" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);

export const IconCog = ({ size = 17, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.2 5.2l2.1 2.1M16.7 16.7l2.1 2.1M18.8 5.2l-2.1 2.1M7.3 16.7l-2.1 2.1" />
  </svg>
);

export const IconArrowUp = ({ size = 13, ...p }: IconProps) => (
  <svg {...base(size)} strokeWidth={2.4} {...p}>
    <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />
  </svg>
);

export const IconArrowDown = ({ size = 13, ...p }: IconProps) => (
  <svg {...base(size)} strokeWidth={2.4} {...p}>
    <path d="M12 5v14M5.5 12.5 12 19l6.5-6.5" />
  </svg>
);
