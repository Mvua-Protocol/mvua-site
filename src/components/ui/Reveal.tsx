"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Reveals children on scroll with a single fade-up, then stops observing.
 * One orchestrated entrance rather than an effect on every element.
 */
export function Reveal({
  children,
  className,
  delayMs = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = `opacity 400ms ease-out ${delayMs}ms, transform 400ms ease-out ${delayMs}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "none";
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delayMs]);

  const Component = Tag as React.ElementType;
  return (
    <Component ref={ref} className={cn(className)}>
      {children}
    </Component>
  );
}
