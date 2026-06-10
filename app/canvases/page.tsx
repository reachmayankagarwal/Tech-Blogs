import Link from 'next/link'
import { Playfair_Display } from 'next/font/google'
import { getAllCanvases } from '@/lib/canvases'
import type { Metadata } from 'next'

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700', '900'], style: ['normal', 'italic'] })

export const metadata: Metadata = {
  title: 'Opportunity Canvas — Mayank Agarwal',
  description: 'Structured PM artifacts — problem, solution, market, and go-to-market thinking for opportunities worth building.',
}

export default function CanvasesPage() {
  const allCanvases = getAllCanvases()

  return (
    <div className="main">
      <div className="section-header" style={{ marginTop: '40px' }}>
        <h1 className={playfair.className} style={{ fontSize: '2.5rem' }}>Opportunity Canvas</h1>
        <p style={{ color: 'var(--ink-muted)', marginTop: '8px' }}>
          Structured PM artifacts — problem, solution, market, and go-to-market thinking for opportunities worth building.
        </p>
      </div>

      <div className="posts-grid">
        {allCanvases.map((canvas) => (
          <Link key={canvas.slug} href={`/canvases/${canvas.slug}`} className="post-card">
            <div className="card-category">{canvas.tags[0]}</div>
            <h3 className={playfair.className}>{canvas.title}</h3>
            <p>{canvas.description}</p>
            <div className="card-footer">
              <span style={{ color: 'var(--ink-muted)', fontSize: '0.85rem' }}>{canvas.status}</span>
              <span className="card-read-link">View →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
