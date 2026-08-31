"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenis = useLenis();
  const prevPath = useRef(pathname);

  const isNavigating = prevPath.current !== pathname;

  useEffect(() => {
    if (prevPath.current === pathname) return;
    lenis?.scrollTo(0, { immediate: true });
    prevPath.current = pathname;
  }, [pathname, lenis]);

  return (
    <div key={pathname} className={isNavigating ? "page-transition" : undefined}>
      {children}
    </div>
  );
}
