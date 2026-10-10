"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { TableOfContents } from "@/components/docs/TableOfContents";
import type { SidebarSection } from "@/lib/mdx";

export function DocsLayoutShell({
  nav,
  children,
}: {
  nav: SidebarSection[];
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="mx-auto max-w-[1400px] px-6 pb-10 pt-32 lg:px-12">
        <div className="mb-6 lg:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-bg-elevated px-5 text-sm font-semibold shadow-neu-raised-sm"
            aria-label="Open documentation navigation"
          >
            <Menu size={18} aria-hidden="true" /> Docs menu
          </button>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)_240px] xl:gap-16">
          <aside className="hidden lg:block print:hidden">
            <div className="sticky top-28 max-h-[calc(100vh-8rem)]">
              <DocsSidebar nav={nav} className="max-h-[calc(100vh-8rem)]" />
            </div>
          </aside>

          <main className="min-w-0">
            <div className="mb-8 xl:hidden print:hidden">
              <TableOfContents />
            </div>
            <article
              id="doc-content"
              className="prose prose-slate max-w-prose dark:prose-invert prose-headings:font-display prose-headings:tracking-tight prose-a:font-semibold prose-a:text-theme-primary prose-code:font-mono prose-code:text-[0.85em] prose-code:text-theme-accent prose-code:before:content-none prose-code:after:content-none prose-pre:bg-bg-sunken prose-pre:shadow-neu-sunken-sm prose-table:text-sm prose-th:text-left prose-img:rounded-2xl"
            >
              {children}
            </article>
          </main>

          <aside className="hidden xl:block print:hidden">
            <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden print:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            aria-label="Close documentation navigation"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="relative h-full w-80 max-w-[85vw] rounded-r-3xl bg-bg-base p-6 shadow-neu-raised">
            <div className="mb-6 flex items-center justify-between border-b border-theme-border/50 pb-4">
              <p className="font-display text-sm font-bold uppercase tracking-widest text-theme-primary">
                Navigation
              </p>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-content-secondary hover:text-content-primary"
                aria-label="Close documentation navigation"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <div className="h-[calc(100%-6rem)] overflow-y-auto scrollbar-thin pr-1">
              <DocsSidebar nav={nav} onNavigate={() => setDrawerOpen(false)} />
            </div>
          </aside>
        </div>
      )}

      <footer className="mx-auto max-w-[1400px] px-6 pb-10 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-3 border-t border-theme-border pt-6 text-sm sm:flex-row">
          <Link href="/" className="font-semibold text-content-secondary hover:text-content-primary">
            ← Back to the site
          </Link>
          <span className="text-content-muted">Mvua Protocol documentation</span>
        </div>
      </footer>
    </div>
  );
}
