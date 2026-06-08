import Link from 'next/link'
import { Playfair_Display } from 'next/font/google'
import { getAllPosts, getFeaturedPost } from '@/lib/posts'
import type { Metadata } from 'next'

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700', '900'], style: ['normal', 'italic'] })

export const metadata: Metadata = {
  title: 'Articles — Mayank Agarwal',
  description: 'Deep dives into AI agents, protocols, infrastructure, and the technology reshaping how we build.',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function ArticlesPage() {
  const featured = getFeaturedPost()
  const allPosts = getAllPosts()

  return (
    <div className="main">
      <div className="section-header" style={{ marginTop: '40px' }}>
        <h1 className={playfair.className} style={{ fontSize: '2.5rem' }}>Articles</h1>
        <p style={{ color: 'var(--ink-muted)', marginTop: '8px' }}>
          Deep dives into AI agents, protocols, infrastructure, and the technology reshaping how we build.
        </p>
      </div>

      {/* FEATURED */}
      {featured && (
        <div style={{ marginBottom: '48px' }}>
          <div className="featured-post">
            <div>
              <div className="featured-eyebrow">
                <span className="badge-featured">Featured</span>
                <span className="post-date">{formatDate(featured.date)} · {featured.readTime}</span>
              </div>
              <h2 className={playfair.className}>{featured.title}</h2>
              <p>{featured.description}</p>
              <div className="post-meta">
                {featured.tags.map((tag, i) => (
                  <span key={tag} className={`post-tag${i === 1 ? ' green' : i === 2 ? ' amber' : ''}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <Link className="post-read" href={`/posts/${featured.slug}`}>
                Read Article →
              </Link>
            </div>
            <div className="featured-visual">
              <span className="visual-label">Protocols Covered</span>
              <div className="visual-chips">
                {['MCP', 'A2A', 'ACP', 'ANP', 'AG-UI', 'AP2', 'UCP', 'X42', 'W3C'].map((p) => (
                  <span key={p} className="vc">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ALL POSTS */}
      <div className="section-header">
        <h2 className={playfair.className}>All Articles</h2>
      </div>
      <div className="posts-grid">
        {allPosts.map((post) => (
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
    </div>
  )
}
