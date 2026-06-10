import { notFound } from 'next/navigation'
import { Playfair_Display } from 'next/font/google'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getCanvasBySlug, getCanvasSlugs } from '@/lib/canvases'
import type { Metadata } from 'next'
import Link from 'next/link'

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700', '900'], style: ['normal', 'italic'] })

export async function generateStaticParams() {
  return getCanvasSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const canvas = getCanvasBySlug(slug)
  return {
    title: `${canvas.title} — Opportunity Canvas — Mayank Agarwal`,
    description: canvas.description,
    openGraph: {
      title: canvas.title,
      description: canvas.description,
      type: 'article',
    },
  }
}

export default async function CanvasPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let canvas
  try {
    canvas = getCanvasBySlug(slug)
  } catch {
    notFound()
  }

  return (
    <>
      <div className="article-hero">
        <div className="article-eyebrow">Mayank Agarwal · Opportunity Canvas</div>
        <h1 className={playfair.className}>{canvas.title}</h1>
        <p className="article-sub">{canvas.tagline}</p>
        <div className="article-tags">
          <span
            className="article-tag"
            style={{
              background: 'rgba(245,158,11,0.18)',
              color: '#fcd34d',
              border: '1px solid rgba(245,158,11,0.4)',
              fontWeight: 700,
            }}
          >
            {canvas.status}
          </span>
          {canvas.tags.map((tag) => (
            <span key={tag} className="article-tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="oc-page">
        <MDXRemote source={canvas.content} />

        <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '32px', marginTop: '48px' }}>
          <Link
            href="/opportunities"
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
            ← Back to all canvases
          </Link>
        </div>
      </div>
    </>
  )
}
