import { ReactNode } from "react";

const SPIKES = 14;

// Slightly irregular spikes so it reads as hand-cut rather than vector-perfect
const points = Array.from({ length: SPIKES * 2 }, (_, i) => {
  const angle = (Math.PI * i) / SPIKES - Math.PI / 2;
  const radius = i % 2 === 0 ? 50 - (i % 3) * 1.5 : 34 + (i % 4);
  return `${50 + radius * Math.cos(angle)},${50 + radius * Math.sin(angle)}`;
}).join(" ");

export const Starburst = ({
  children,
  className = "",
  fill = "var(--color-taffy)",
}: {
  children: ReactNode;
  className?: string;
  fill?: string;
}) => (
  <div className={`starburst ${className}`}>
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <polygon
        points={points}
        fill={fill}
        stroke="var(--color-ink)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
    <span>{children}</span>
  </div>
);
