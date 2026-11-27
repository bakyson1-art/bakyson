"use client";

import React, { useEffect, useRef, useState } from "react";

interface HeroMainPlaceholderProps {
  imageSrc?: string;
  imageAlt?: string;
  cornerRadius?: number;
}

export default function HeroMainPlaceholder({
  imageSrc = "/images/hospitality-detail.jpg",
  imageAlt = "Hero media",
  cornerRadius = 34,
}: HeroMainPlaceholderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 1360, height: 680 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (rect && rect.width > 0 && rect.height > 0) {
        setDims({ width: rect.width, height: rect.height });
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const buildExactSvgPath = (W: number, H: number, R: number) => {
    // Anchor coordinates matching the layout proportions
    const xNotch = W * 0.505;
    const yNotch = H * 0.455;
    const yDiagStart = H * 0.545;
    const xDiagEnd = W * 0.68;

    // Diagonal vector from V3(W, yDiagStart) to V4(xDiagEnd, H)
    const dx = xDiagEnd - W; // negative
    const dy = H - yDiagStart; // positive
    const diagLength = Math.hypot(dx, dy);

    // Unit vector along V3 -> V4
    const ux = dx / diagLength;
    const uy = dy / diagLength;

    // Angle of diagonal below horizontal (radians)
    const alpha = Math.atan2(dy, Math.abs(dx));

    // Exact tangent trim distances for the two oblique corners
    const phi3 = Math.PI / 2 + alpha; // Interior angle at V3
    const d3 = R / Math.tan(phi3 / 2);

    const phi4 = Math.PI - alpha; // Interior angle at V4
    const d4 = R / Math.tan(phi4 / 2);

    // Tangent points around V3 (W, yDiagStart)
    const v3InX = W;
    const v3InY = yDiagStart - d3;
    const v3OutX = W + ux * d3;
    const v3OutY = yDiagStart + uy * d3;

    // Tangent points around V4 (xDiagEnd, H)
    const v4InX = xDiagEnd - ux * d4;
    const v4InY = H - uy * d4;
    const v4OutX = xDiagEnd - d4;
    const v4OutY = H;

    // Construct closed path using true circular arcs (A R R 0 0 sweep x y)
    return [
      // Start just after V1 (top-center convex corner)
      `M ${xNotch + R},0`,
      // Top edge to V2
      `L ${W - R},0`,
      `A ${R},${R} 0 0 1 ${W},${R}`,
      // Right upper edge to V3
      `L ${v3InX},${v3InY}`,
      `A ${R},${R} 0 0 1 ${v3OutX},${v3OutY}`,
      // Oblique diagonal cut to V4
      `L ${v4InX},${v4InY}`,
      `A ${R},${R} 0 0 1 ${v4OutX},${v4OutY}`,
      // Bottom edge to V5
      `L ${R},${H}`,
      `A ${R},${R} 0 0 1 0,${H - R}`,
      // Left lower edge to V6
      `L 0,${yNotch + R}`,
      `A ${R},${R} 0 0 1 ${R},${yNotch}`,
      // Horizontal shelf into concave reflex corner V7 (sweep = 0 for inward curve)
      `L ${xNotch - R},${yNotch}`,
      `A ${R},${R} 0 0 0 ${xNotch},${yNotch - R}`,
      // Vertical shelf up to V1
      `L ${xNotch},${R}`,
      `A ${R},${R} 0 0 1 ${xNotch + R},0`,
      "Z",
    ].join(" ");
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[460px] sm:h-[580px] lg:h-[680px]"
    >
      {/* Hidden SVG ClipPath definition */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id="middle-hero-exact-clip" clipPathUnits="userSpaceOnUse">
            <path d={buildExactSvgPath(dims.width, dims.height, cornerRadius)} />
          </clipPath>
        </defs>
      </svg>

      {/* Clipped Image Container */}
      <div
        style={{ clipPath: "url(#middle-hero-exact-clip)" }}
        className="w-full h-full overflow-hidden"
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
}
