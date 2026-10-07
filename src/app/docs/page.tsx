import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { getSidebarNav } from "@/lib/mdx";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "How Mvua Protocol works, from the index science to the Soroban contract surface and the oracle model.",
  alternates: { canonical: "/docs" },
};

export default function DocsHubPage() {
  const nav = getSidebarNav();
  const totalDocs = nav.reduce((sum, section) => sum + section.links.length, 0);

  return (
    <SiteShell>
      <section className="mx-auto max-w-[1400px] px-6 pb-24 pt-8 lg:px-12">
        <p className="mb-3 font-display text-xs font-bold uppercase tracking-widest text-theme-primary">
          Documentation
        </p>
        <h1 className="max-w-3xl font-display text-4xl font-extrabold tracking-tight text-content-primary sm:text-5xl">
          Everything behind {SITE_NAME}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-content-secondary">
          {totalDocs} documents, authored in MDX, covering the trigger maths, the on chain
          contracts, the oracle model and the answers to the questions people ask first.
        </p>

        <div className="mt-14 space-y-12">
          {nav.map((section) => (
            <div key={section.section}>
              <h2 className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-content-primary">
                {section.section}
              </h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {section.links.map((link) => (
                  <Link
                    key={link.slug}
                    href={`/docs/${link.slug}`}
                    className="group flex flex-col rounded-3xl bg-bg-elevated p-6 shadow-neu-raised transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-bg-sunken text-theme-primary shadow-neu-sunken-sm">
                      <BookOpen size={18} aria-hidden="true" />
                    </span>
                    <span className="font-display text-lg font-bold text-content-primary">
                      {link.title}
                    </span>
                    {link.description && (
                      <span className="mt-2 text-sm leading-relaxed text-content-secondary">
                        {link.description}
                      </span>
                    )}
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-theme-primary">
                      Read
                      <ArrowRight
                        size={16}
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
