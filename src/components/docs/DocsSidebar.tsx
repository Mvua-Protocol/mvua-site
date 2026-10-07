import Link from "next/link";
import { cn } from "@/lib/cn";
import type { SidebarSection } from "@/lib/mdx";

export function DocsSidebar({
  nav,
  className,
  onNavigate,
}: {
  nav: SidebarSection[];
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <nav
      aria-label="Documentation navigation"
      className={cn("flex w-full flex-col rounded-3xl bg-bg-elevated p-5 shadow-neu-raised", className)}
    >
      <div className="flex-1 space-y-6 overflow-y-auto scrollbar-thin pr-1">
        {nav.map((section) => (
          <div key={section.section}>
            <div className="mb-3 px-3 font-display text-xs font-bold uppercase tracking-widest text-content-primary">
              {section.section}
            </div>
            <ul className="space-y-1.5">
              {section.links.map((link) => (
                <li key={link.slug}>
                  <Link
                    href={`/docs/${link.slug}`}
                    onClick={onNavigate}
                    className="block rounded-xl px-3 py-2 text-sm font-medium text-content-secondary transition-colors hover:bg-bg-sunken hover:text-content-primary"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
