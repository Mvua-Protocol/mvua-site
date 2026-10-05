import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { slugify } from "@/lib/slug";

function headingId(children: React.ReactNode): string {
  const text =
    typeof children === "string"
      ? children
      : Array.isArray(children)
        ? children.map((c) => (typeof c === "string" ? c : "")).join("")
        : "";
  return slugify(text);
}

function Callout({
  type = "note",
  title,
  children,
}: {
  type?: "note" | "warn" | "clay";
  title?: string;
  children: React.ReactNode;
}) {
  const cls =
    type === "warn" ? "callout-warn" : type === "clay" ? "callout-clay" : "callout-note";
  return (
    <div className={`callout ${cls}`}>
      {title && <span className="callout-title">{title}</span>}
      <div className="text-sm leading-relaxed text-content-secondary [&>p]:m-0">{children}</div>
    </div>
  );
}

export const MDX_COMPONENTS: MDXComponents = {
  Callout,
  h2: ({ children }) => (
    <h2 id={headingId(children)} className="scroll-mt-28">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 id={headingId(children)} className="scroll-mt-28">
      {children}
    </h3>
  ),
  a: ({ href = "", children }) =>
    href.startsWith("/") ? (
      <Link href={href}>{children}</Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  blockquote: ({ children }) => <Callout type="note">{children}</Callout>,
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full">{children}</table>
    </div>
  ),
};
