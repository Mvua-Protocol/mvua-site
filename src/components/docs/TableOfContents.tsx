"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

interface Heading {
  level: 2 | 3;
  text: string;
  id: string;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const root = document.getElementById("doc-content");
    if (!root) return;

    const collect = () => {
      const nodes = Array.from(root.querySelectorAll("h2[id], h3[id]"));
      setHeadings(
        nodes.map((node) => ({
          level: node.tagName.toLowerCase() === "h2" ? 2 : 3,
          id: node.id,
          text: node.textContent?.trim() ?? "",
        }))
      );
    };

    collect();
    const observer = new MutationObserver(collect);
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;
    const onScroll = () => {
      let current = headings[0]?.id ?? "";
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top <= 140) current = h.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-4 font-display text-xs font-bold uppercase tracking-widest text-content-primary">
        On this page
      </p>
      <ul className="space-y-2 border-l border-theme-border">
        {headings.map((h) => (
          <li key={h.id} className={cn(h.level === 3 && "pl-4")}>
            <a
              href={`#${h.id}`}
              className={cn(
                "-ml-px block border-l-2 py-1 pl-3 transition-colors",
                activeId === h.id
                  ? "border-theme-primary font-semibold text-theme-primary"
                  : "border-transparent text-content-secondary hover:text-content-primary"
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
