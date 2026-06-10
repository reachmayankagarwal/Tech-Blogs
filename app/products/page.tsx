import Link from 'next/link'
import { Playfair_Display } from 'next/font/google'
import { getAllProducts } from '@/lib/products'
import type { ProductStatus } from '@/lib/products'
import type { Metadata } from 'next'

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700', '900'], style: ['normal', 'italic'] })

const STATUS_COLORS: Record<ProductStatus, { bg: string; color: string }> = {
  Live:     { bg: '#d1fae5', color: '#065f46' },
  Beta:     { bg: '#fef3c7', color: '#92400e' },
  Building: { bg: '#dbeafe', color: '#1e40af' },
  Archived: { bg: '#f3f4f6', color: '#6b7280' },
}

export const metadata: Metadata = {
  title: 'Product Prototypes — Mayank Agarwal',
  description: '0→1 AI prototypes — built, shipped, and documented end to end, from problem discovery to deployment.',
}

export default function ProductsPage() {
  const allProducts = getAllProducts()

  return (
    <div className="main">
      <div className="section-header" style={{ marginTop: '40px' }}>
        <h1 className={playfair.className} style={{ fontSize: '2.5rem' }}>Product Prototypes</h1>
        <p style={{ color: 'var(--ink-muted)', marginTop: '8px' }}>
          0→1 AI prototypes — built, shipped, and documented end to end, from problem discovery to deployment.
        </p>
      </div>

      <div className="posts-grid">
        {allProducts.map((product) => {
          const statusStyle = STATUS_COLORS[product.status]
          return (
            <Link key={product.slug} href={`/products/${product.slug}`} className="post-card product-card">
              <div className="product-card-header">
                <div className="card-category">{product.tags[0]}</div>
                <span
                  className="product-status"
                  style={{ background: statusStyle.bg, color: statusStyle.color }}
                >
                  {product.status}
                </span>
              </div>
              <h3 className={playfair.className}>{product.title}</h3>
              <p className="product-tagline">{product.tagline}</p>
              <p>{product.description}</p>
              <div className="card-footer">
                <div className="product-tags">
                  {product.tags.slice(1, 3).map((tag) => (
                    <span key={tag} className="product-tech-tag">{tag}</span>
                  ))}
                </div>
                <span className="card-read-link">View →</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
