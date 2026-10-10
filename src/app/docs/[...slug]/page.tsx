import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { DocsLayoutShell } from "@/components/docs/DocsLayoutShell";
import { MDX_COMPONENTS } from "@/components/docs/mdx-components";
import { getAllDocSlugs, getDocBySlug, getSidebarNav } from "@/lib/mdx";

export function generateStaticParams() {
  return getAllDocSlugs().map((slug) => ({ slug: slug.split("/") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocBySlug(slug.join("/"));
  if (!doc) return { title: "Not found" };
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/docs/${doc.slug}` },
  };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug: segments } = await params;
  const slug = segments.join("/");
  const doc = getDocBySlug(slug);
  if (!doc) notFound();

  const nav = getSidebarNav();

  return (
    <DocsLayoutShell nav={nav}>
      <header className="not-prose mb-10 border-b border-theme-border pb-6">
        <p className="mb-2 font-display text-xs font-bold uppercase tracking-widest text-theme-primary">
          {doc.section ?? "Documentation"}
        </p>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-content-primary sm:text-5xl">
          {doc.title}
        </h1>
        {doc.description && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-content-secondary">
            {doc.description}
          </p>
        )}
      </header>
      <MDXRemote
        source={doc.content}
        components={MDX_COMPONENTS}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </DocsLayoutShell>
  );
}
