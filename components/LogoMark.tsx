import React from "react";

interface LogoMarkProps {
  /** Tailwind className — use h-* / w-* to size, e.g. "h-8 w-8" */
  className?: string;
}

/**
 * LB logo mark as an inline SVG React component.
 *
 * Structure:
 *   - "L" frame  : two black rectangles (uses currentColor → adapts to dark/light)
 *   - "B" network: 6 nodes + 7 edges in navy
 *       navy uses Tailwind dark-mode variant so it stays visible on dark backgrounds
 *
 * viewBox 0 0 200 200 — scale via className (h-* / w-*)
 */
export function LogoMark({ className }: LogoMarkProps): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      className={className}
      aria-label="LB AI Research Lab"
      role="img"
    >
      {/* L frame — currentColor adapts to foreground (black / white) */}
      <rect x="18" y="18" width="14" height="150" fill="currentColor" />
      <rect x="18" y="168" width="148" height="14" fill="currentColor" />

      {/*
        B network edges
        Light mode : #1a2761 (dark navy)
        Dark  mode : #6b9bd2 (accessible mid-blue on dark bg)
        Tailwind JIT arbitrary values handle this cleanly.
      */}
      <line
        x1="32"  y1="46"  x2="120" y2="46"
        stroke="#1a2761" strokeWidth="8" strokeLinecap="round"
        className="[stroke:#1a2761] dark:[stroke:#6b9bd2]"
      />
      <line
        x1="32"  y1="108" x2="68"  y2="108"
        stroke="#1a2761" strokeWidth="8" strokeLinecap="round"
        className="[stroke:#1a2761] dark:[stroke:#6b9bd2]"
      />
      <line
        x1="68"  y1="46"  x2="68"  y2="162"
        stroke="#1a2761" strokeWidth="8" strokeLinecap="round"
        className="[stroke:#1a2761] dark:[stroke:#6b9bd2]"
      />
      <line
        x1="120" y1="46"  x2="144" y2="77"
        stroke="#1a2761" strokeWidth="8" strokeLinecap="round"
        className="[stroke:#1a2761] dark:[stroke:#6b9bd2]"
      />
      <line
        x1="68"  y1="108" x2="144" y2="77"
        stroke="#1a2761" strokeWidth="8" strokeLinecap="round"
        className="[stroke:#1a2761] dark:[stroke:#6b9bd2]"
      />
      <line
        x1="68"  y1="108" x2="144" y2="135"
        stroke="#1a2761" strokeWidth="8" strokeLinecap="round"
        className="[stroke:#1a2761] dark:[stroke:#6b9bd2]"
      />
      <line
        x1="144" y1="135" x2="68"  y2="162"
        stroke="#1a2761" strokeWidth="8" strokeLinecap="round"
        className="[stroke:#1a2761] dark:[stroke:#6b9bd2]"
      />

      {/* B network nodes */}
      <circle cx="68"  cy="46"  r="10" fill="#1a2761" className="fill-[#1a2761] dark:fill-[#6b9bd2]" />
      <circle cx="120" cy="46"  r="10" fill="#1a2761" className="fill-[#1a2761] dark:fill-[#6b9bd2]" />
      <circle cx="68"  cy="108" r="10" fill="#1a2761" className="fill-[#1a2761] dark:fill-[#6b9bd2]" />
      <circle cx="144" cy="77"  r="10" fill="#1a2761" className="fill-[#1a2761] dark:fill-[#6b9bd2]" />
      <circle cx="144" cy="135" r="10" fill="#1a2761" className="fill-[#1a2761] dark:fill-[#6b9bd2]" />
      <circle cx="68"  cy="162" r="10" fill="#1a2761" className="fill-[#1a2761] dark:fill-[#6b9bd2]" />
    </svg>
  );
}
