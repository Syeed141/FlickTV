"use client";

import { ReactLenis } from "lenis/react";

const lenisOptions = {
  lerp: 0.145,
  wheelMultiplier: 1,
  anchors: true,
  autoRaf: true,
};

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
