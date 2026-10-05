"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, Mail, Globe } from "lucide-react";
import {
  CONTACT_EMAIL,
  GITHUB_APP_URL,
  GITHUB_CONTRACT_URL,
  GITHUB_ORG_URL,
} from "@/constants/site";

const navColumns = [
  {
    heading: "Protocol",
    links: [
      { href: "/", label: "Home" },
      { href: "/architecture", label: "Architecture" },
      { href: "/roadmap", label: "Roadmap" },
    ],
  },
  {
    heading: "Documentation",
    links: [
      { href: "/docs", label: "Overview" },
      { href: "/docs/guide/how-mvua-works", label: "Concepts" },
      { href: "/docs/reference/protocol", label: "Protocol reference" },
      { href: "/docs/faq", label: "FAQ" },
    ],
  },
  {
    heading: "Code",
    links: [
      { href: GITHUB_CONTRACT_URL, label: "mvua-contract", external: true },
      { href: GITHUB_APP_URL, label: "mvua-app", external: true },
      { href: GITHUB_ORG_URL, label: "GitHub org", external: true },
    ],
  },
];

export function Footer() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const text = textRef.current;
    if (!wrap || !text) return;

    const fit = () => {
      text.style.fontSize = "200px";
      text.style.width = "fit-content";
      const textWidth = text.offsetWidth;
      const wrapWidth = wrap.offsetWidth;
      text.style.width = "";
      if (textWidth === 0) return;
      text.style.fontSize = `${200 * (wrapWidth / textWidth) * 0.92}px`;
    };

    document.fonts.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  return (
    <footer className="relative pt-4 pb-0">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="rounded-3xl bg-bg-elevated px-10 py-12 shadow-neu-raised">
          <div className="flex flex-col gap-10 md:flex-row md:gap-16">
            <div className="flex w-full min-w-0 flex-col gap-6 md:w-72 md:flex-shrink-0">
              <Link href="/" className="flex items-center gap-2.5">
                <Image src="/logo-mark.svg" alt="" width={32} height={32} aria-hidden="true" />
                <span className="font-display text-lg font-bold tracking-tight">
                  <span className="grad-text">Mvua</span>{" "}
                  <span className="text-theme-accent">Protocol</span>
                </span>
              </Link>
              <p className="text-sm leading-relaxed text-content-secondary">
                Parametric climate insurance on Stellar. Farmers get paid
                automatically when on chain weather data says the season failed.
              </p>
              <div className="flex flex-wrap items-center gap-1">
                <a
                  href={GITHUB_ORG_URL}
                  aria-label="Mvua Protocol on GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center p-2 text-content-secondary transition-colors hover:text-content-primary"
                >
                  <Github size={18} aria-hidden="true" />
                </a>
                <a
                  href="https://stellar.org"
                  aria-label="Stellar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center p-2 text-content-secondary transition-colors hover:text-content-primary"
                >
                  <Globe size={18} aria-hidden="true" />
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  aria-label="Email Mvua Protocol"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center p-2 text-content-secondary transition-colors hover:text-content-primary"
                >
                  <Mail size={18} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="flex flex-1 flex-wrap gap-8 md:gap-12">
              {navColumns.map((col) => (
                <div key={col.heading} className="flex min-w-[120px] flex-col gap-4">
                  <h4 className="text-sm font-semibold text-content-primary">{col.heading}</h4>
                  <ul className="flex flex-col gap-1">
                    {col.links.map((link) =>
                      "external" in link && link.external ? (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center text-sm text-content-secondary transition-colors hover:text-content-primary"
                          >
                            {link.label}
                          </a>
                        </li>
                      ) : (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="inline-flex min-h-11 items-center text-sm text-content-secondary transition-colors hover:text-content-primary"
                          >
                            {link.label}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-theme-border pt-6 sm:flex-row">
            <p className="text-xs text-content-muted">
              {year ? `© ${year} ` : "© "}Mvua Protocol. All rights reserved.
            </p>
            <p className="text-xs text-content-muted">Built on Stellar with Soroban</p>
          </div>
        </div>
      </div>

      <div ref={wrapRef} className="mx-auto max-w-[1400px] overflow-hidden px-6 lg:px-8">
        <div
          ref={textRef}
          aria-hidden="true"
          className="pointer-events-none mx-auto mt-2 select-none whitespace-nowrap leading-none text-theme-primary"
          style={{
            fontWeight: 800,
            letterSpacing: "-0.03em",
            opacity: 0.28,
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 30%, transparent 78%)",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 30%, transparent 78%)",
          }}
        >
          MVUA
        </div>
      </div>
    </footer>
  );
}
