import Link from 'next/link'
import { Playfair_Display } from 'next/font/google'
import { getAllPosts } from '@/lib/posts'
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
  const allPosts = getAllPosts()

  return (
    <div className="main">
      <div className="section-header" style={{ marginTop: '40px' }}>
        <h1 className={playfair.className} style={{ fontSize: '2.5rem' }}>Articles</h1>
        <p style={{ color: 'var(--ink-muted)', marginTop: '8px' }}>
          Deep dives into AI agents, protocols, infrastructure, and the technology reshaping how we build.
        </p>
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
