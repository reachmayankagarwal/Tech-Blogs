import { notFound } from 'next/navigation'
import { Playfair_Display } from 'next/font/google'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getProductBySlug, getProductSlugs } from '@/lib/products'
import type { Metadata } from 'next'
import Link from 'next/link'
import type { ProductStatus } from '@/lib/products'

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700', '900'], style: ['normal', 'italic'] })

const STATUS_COLORS: Record<ProductStatus, { bg: string; color: string }> = {
  Live:     { bg: '#d1fae5', color: '#065f46' },
  Beta:     { bg: '#fef3c7', color: '#92400e' },
  Building: { bg: '#dbeafe', color: '#1e40af' },
  Archived: { bg: '#f3f4f6', color: '#6b7280' },
}

export async function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  return {
    title: `${product.title} — Mayank Agarwal`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      type: 'article',
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let product
  try {
    product = getProductBySlug(slug)
  } catch {
    notFound()
  }

  const statusStyle = STATUS_COLORS[product.status]

  return (
    <>
      <div className="article-hero">
        <div className="article-eyebrow">Mayank Agarwal · Products</div>
        <h1 className={playfair.className}>{product.title}</h1>
        <p className="article-sub">{product.tagline}</p>
        <div className="article-tags" style={{ marginBottom: '16px' }}>
          <span
            className="article-tag"
            style={{
              background: statusStyle.bg,
              color: statusStyle.color,
              border: 'none',
              fontWeight: 700,
            }}
          >
            {product.status}
          </span>
          {product.tags.map((tag) => (
            <span key={tag} className="article-tag">{tag}</span>
          ))}
        </div>
        {product.link && (
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#fff',
              textDecoration: 'none',
              padding: '9px 20px',
              border: '2px solid rgba(255,255,255,0.4)',
              borderRadius: '8px',
              transition: 'all .2s',
              position: 'relative',
            }}
          >
            Visit Product ↗
          </a>
        )}
      </div>

      <div className="prose-container">
        <div className="prose">
          <MDXRemote source={product.content} />
        </div>

        <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '32px', marginBottom: '80px' }}>
          <Link
            href="/#products"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--accent)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            ← Back to all products
          </Link>
        </div>
      </div>
    </>
  )
}
