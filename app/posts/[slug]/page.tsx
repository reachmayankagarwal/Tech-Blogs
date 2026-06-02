import { notFound } from 'next/navigation'
import { Playfair_Display } from 'next/font/google'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getPostSlugs } from '@/lib/posts'
import type { Metadata } from 'next'
import Link from 'next/link'

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700', '900'], style: ['normal', 'italic'] })

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  return {
    title: `${post.title} — Mayank Agarwal`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let post
  try {
    post = getPostBySlug(slug)
  } catch {
    notFound()
  }

  return (
    <>
      <div className="article-hero">
        <div className="article-eyebrow">Mayank Agarwal · Tech Blog</div>
        <h1 className={playfair.className}>{post.title}</h1>
        <p className="article-sub">{post.description}</p>
        <div className="article-tags">
          {post.tags.map((tag) => (
            <span key={tag} className="article-tag">{tag}</span>
          ))}
        </div>
        <div className="article-meta">
          {formatDate(post.date)} · {post.readTime}
        </div>
      </div>

      <div className="prose-container">
        <div className="prose">
          <MDXRemote source={post.content} />
        </div>

        <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '32px', marginBottom: '80px' }}>
          <Link
            href="/"
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
            ← Back to all articles
          </Link>
        </div>
      </div>
    </>
  )
}
