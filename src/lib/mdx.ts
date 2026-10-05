import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { slugify } from "@/lib/slug";

const DOCS_DIR = path.join(process.cwd(), "content", "docs");

export interface DocFrontmatter {
  title: string;
  description?: string;
  order?: number;
  section?: string;
  sectionOrder?: number;
}

export interface SidebarLink {
  title: string;
  slug: string;
  description?: string;
}

export interface SidebarSection {
  section: string;
  links: SidebarLink[];
}

export interface DocHeading {
  level: 2 | 3;
  text: string;
  id: string;
}

export interface Doc extends DocFrontmatter {
  slug: string;
  content: string;
}

function walkMdx(dir: string, base = dir): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkMdx(full, base);
    if (entry.isFile() && entry.name.endsWith(".mdx")) return [full];
    return [];
  });
}

function slugFromFile(file: string): string {
  const rel = path.relative(DOCS_DIR, file).replace(/\\/g, "/");
  return rel.replace(/\.mdx$/, "");
}

export function getAllDocSlugs(): string[] {
  return walkMdx(DOCS_DIR).map(slugFromFile).sort();
}

export function getDocBySlug(slug: string): Doc | null {
  const file = path.join(DOCS_DIR, `${slug}.mdx`);
  if (!file.startsWith(DOCS_DIR) || !fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    content,
    title: (data.title as string) ?? slug,
    description: data.description as string | undefined,
    order: data.order as number | undefined,
    section: data.section as string | undefined,
    sectionOrder: data.sectionOrder as number | undefined,
  };
}

export function getSidebarNav(): SidebarSection[] {
  const docs = getAllDocSlugs()
    .map((slug) => getDocBySlug(slug))
    .filter((d): d is Doc => Boolean(d));

  const grouped = new Map<
    string,
    { order: number; links: (SidebarLink & { order: number })[] }
  >();

  for (const doc of docs) {
    const section = doc.section ?? "Documentation";
    if (!grouped.has(section)) {
      grouped.set(section, { order: doc.sectionOrder ?? 999, links: [] });
    }
    grouped.get(section)!.links.push({
      title: doc.title,
      slug: doc.slug,
      description: doc.description,
      order: doc.order ?? 999,
    });
  }

  return Array.from(grouped.entries())
    .sort((a, b) => a[1].order - b[1].order)
    .map(([section, { links }]) => ({
      section,
      links: links
        .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
        .map(({ order: _order, ...link }) => link),
    }));
}

export function extractHeadings(content: string): DocHeading[] {
  const headings: DocHeading[] = [];
  const lines = content.split("\n");
  let inFence = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (match) {
      const level = match[1].length as 2 | 3;
      const text = match[2].replace(/`/g, "").trim();
      headings.push({ level, text, id: slugify(text) });
    }
  }
  return headings;
}
