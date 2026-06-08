import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CANVASES_DIR = path.join(process.cwd(), 'content', 'canvases')

export interface CanvasMeta {
  slug: string
  title: string
  tagline: string
  description: string
  status: string
  tags: string[]
  date: string
  link?: string
}

export interface Canvas extends CanvasMeta {
  content: string
}

export function getCanvasSlugs(): string[] {
  if (!fs.existsSync(CANVASES_DIR)) return []
  return fs
    .readdirSync(CANVASES_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getCanvasBySlug(slug: string): Canvas {
  const fullPath = path.join(CANVASES_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? '',
    tagline: data.tagline ?? '',
    description: data.description ?? '',
    status: data.status ?? 'Discovery',
    tags: data.tags ?? [],
    date: data.date ?? '',
    link: data.link,
    content,
  }
}

export function getAllCanvases(): CanvasMeta[] {
  return getCanvasSlugs()
    .map((slug) => {
      const { content: _, ...meta } = getCanvasBySlug(slug)
      return meta
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}
