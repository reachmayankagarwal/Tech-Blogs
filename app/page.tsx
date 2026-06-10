import Link from 'next/link'
import { Playfair_Display } from 'next/font/google'
import { getAllPosts } from '@/lib/posts'
import { getAllProducts } from '@/lib/products'
import { getAllCanvases } from '@/lib/canvases'
import type { ProductStatus } from '@/lib/products'
import type { Metadata } from 'next'

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700', '900'], style: ['normal', 'italic'] })

export const metadata: Metadata = {
  title: 'Mayank Agarwal — AI powered Product Prototypes & Articles',
  description: 'AI Product Lifecycle — building with AI and documenting every step from ideation to deployment.',
}

const TOPICS = [
  'AI Agents', 'Protocols & Standards', 'Large Language Models',
  'AI Infrastructure', 'Multi-Agent Systems', 'MCP',
  'Developer Tools', 'Future of Work', 'Engineering',
]

const STATUS_COLORS: Record<ProductStatus, { bg: string; color: string }> = {
  Live:     { bg: '#d1fae5', color: '#065f46' },
  Beta:     { bg: '#fef3c7', color: '#92400e' },
  Building: { bg: '#dbeafe', color: '#1e40af' },
  Archived: { bg: '#f3f4f6', color: '#6b7280' },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function HomePage() {
  const allPosts = getAllPosts()
  const allProducts = getAllProducts()
  const allCanvases = getAllCanvases()
  const recentPosts = allPosts.slice(0, 2)

  return (
    <>
      {/* HERO */}
      <div className="hero">
        <div className="hero-tag">AI Articles · Prototypes · 0 to 1 Product · Lifecycle · Management</div>
        <h1 className={playfair.className}>
          Product Management with AI<br />&amp; <em>Building Prototypes</em>
        </h1>
        <p>AI Prototypes and Product Lifecycle — building with AI and documenting every step from ideation to deployment.</p>
        <div className="hero-stats">
          <div className="stat">
            <div className={`stat-num ${playfair.className}`}>{allPosts.length}</div>
            <div className="stat-label">Articles</div>
          </div>
          <div className="stat">
            <div className={`stat-num ${playfair.className}`}>{allProducts.length}</div>
            <div className="stat-label">Products</div>
          </div>
          <div className="stat">
            <div className={`stat-num ${playfair.className}`}>2026</div>
            <div className="stat-label">Est.</div>
          </div>
        </div>
      </div>

      <div className="main">
        {/* LATEST ARTICLES */}
        <div id="articles">
          <div className="section-header">
            <h2 className={playfair.className}>Latest Articles</h2>
            <Link href="/articles" className="card-read-link" style={{ fontSize: '0.9rem' }}>
              View all →
            </Link>
          </div>
          <div className="posts-grid">
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/posts/${post.slug}`} className="post-card">
                <div className="card-category">{post.tags[0]}</div>
                <h3 className={playfair.className}>{post.title}</h3>
                <p>{post.description}</p>
                <div className="card-footer">
                  <span className="text-[var(--ink-muted)]">{formatDate(post.date)} · {post.readTime}</span>
                  <span className="card-read-link">Read →</span>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link href="/articles" className="post-read" style={{ display: 'inline-block' }}>
              View all {allPosts.length} articles →
            </Link>
          </div>
        </div>

        {/* PRODUCTS */}
        {allProducts.length > 0 && (
          <div id="products" style={{ marginTop: '64px' }}>
            <div className="section-header">
              <h2 className={playfair.className}>Product Prototypes</h2>
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
        )}

        {/* OPPORTUNITY CANVAS */}
        <div id="opportunity-canvas" style={{ marginTop: '64px' }}>
          <div className="section-header">
            <h2 className={playfair.className}>Opportunity Canvas</h2>
          </div>
          <div className="posts-grid">
            {allCanvases.length > 0 ? (
              allCanvases.map((canvas) => (
                <Link key={canvas.slug} href={`/canvases/${canvas.slug}`} className="post-card">
                  <div className="card-category">{canvas.tags[0]}</div>
                  <h3 className={playfair.className}>{canvas.title}</h3>
                  <p>{canvas.description}</p>
                  <div className="card-footer">
                    <span style={{ color: 'var(--ink-muted)', fontSize: '0.85rem' }}>{canvas.status}</span>
                    <span className="card-read-link">View →</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="post-card" style={{ borderStyle: 'dashed', opacity: 0.7 }}>
                <div className="card-category">Problem · Solution · Market</div>
                <h3 className={playfair.className}>Canvases Coming Soon</h3>
                <p>Structured PM artifacts documenting problems worth solving — customer segments, pain points, proposed solutions, and go-to-market thinking in a single view.</p>
                <div className="card-footer">
                  <span style={{ color: 'var(--ink-muted)', fontSize: '0.85rem' }}>First canvas in progress</span>
                  <span className="card-read-link">Soon →</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* TOPICS */}
        <div className="topics" id="topics">
          <h2 className={playfair.className}>Browse by Topic</h2>
          <div className="topic-pills">
            {TOPICS.map((topic) => (
              <span key={topic} className="topic-pill">{topic}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
