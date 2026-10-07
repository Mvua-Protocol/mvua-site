"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { NAV_LINKS } from "@/constants/nav";
import { GITHUB_REPO_URL } from "@/constants/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-shadow duration-300",
        scrolled && "shadow-neu-raised-sm"
      )}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-3 lg:px-8">
        <div
          className={cn(
            "flex w-full items-center justify-between gap-4 rounded-full px-4 py-2 transition-colors",
            scrolled ? "bg-bg-elevated/80 backdrop-blur-md" : "bg-bg-elevated/50 backdrop-blur-sm"
          )}
        >
          <Link href="/" className="flex items-center gap-2.5" aria-label="Mvua Protocol home">
            <Image src="/logo-mark.svg" alt="" width={30} height={30} aria-hidden="true" />
            <span className="font-display text-lg font-bold tracking-tight">
              <span className="grad-text">Mvua</span>{" "}
              <span className="text-theme-accent">Protocol</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors min-h-11 inline-flex items-center",
                  isActive(link.href, pathname)
                    ? "text-theme-primary"
                    : "text-content-secondary hover:text-content-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden h-10 w-10 items-center justify-center rounded-full bg-bg-sunken text-content-primary shadow-neu-sunken-sm transition-colors hover:text-theme-primary sm:inline-flex" />
            <Link href="/docs" className="btn btn-primary hidden sm:inline-flex">
              Read the docs
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-bg-sunken text-content-primary shadow-neu-sunken-sm md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="mx-6 mt-2 rounded-3xl bg-bg-elevated p-4 shadow-neu-raised md:hidden"
        >
          <nav className="flex flex-col" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-2xl px-4 py-3 text-base font-semibold min-h-11 inline-flex items-center",
                  isActive(link.href, pathname)
                    ? "text-theme-primary"
                    : "text-content-secondary"
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl px-4 py-3 text-base font-semibold text-content-secondary min-h-11 inline-flex items-center"
            >
              GitHub
            </a>
            <div className="mt-2 flex items-center justify-between border-t border-theme-border/50 px-4 pt-4">
              <span className="text-sm font-semibold text-content-secondary">Theme</span>
              <ThemeToggle className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-bg-sunken text-content-primary shadow-neu-sunken-sm" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
