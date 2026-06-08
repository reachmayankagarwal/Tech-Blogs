import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const PRODUCTS_DIR = path.join(process.cwd(), 'content', 'products')

export type ProductStatus = 'Live' | 'Beta' | 'Building' | 'Archived'

export interface ProductMeta {
  slug: string
  title: string
  tagline: string
  description: string
  status: ProductStatus
  tags: string[]
  date: string
  link?: string
}

export interface Product extends ProductMeta {
  content: string
}

export function getProductSlugs(): string[] {
  if (!fs.existsSync(PRODUCTS_DIR)) return []
  return fs
    .readdirSync(PRODUCTS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getProductBySlug(slug: string): Product {
  const fullPath = path.join(PRODUCTS_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? '',
    tagline: data.tagline ?? '',
    description: data.description ?? '',
    status: data.status ?? 'Building',
    tags: data.tags ?? [],
    date: data.date ?? '',
    link: data.link,
    content,
  }
}

export function getAllProducts(): ProductMeta[] {
  return getProductSlugs()
    .map((slug) => {
      const { content: _, ...meta } = getProductBySlug(slug)
      return meta
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}
