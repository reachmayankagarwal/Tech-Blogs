'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700'] })

export default function Nav() {
  const pathname = usePathname()

  // On the homepage, scroll to the section without leaving a #hash in the URL.
  // On other pages, let the Link navigate to /#section (ScrollClean cleans it up).
  function handleSection(e: React.MouseEvent, id: string) {
    if (pathname !== '/') return
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    window.history.replaceState(null, '', '/')
  }

  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <Link href="/" className={`nav-logo ${playfair.className}`}>
          Mayank<span>.</span>dev
        </Link>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/articles">Articles</Link>
          <Link href="/#products" onClick={(e) => handleSection(e, 'products')}>Product Prototypes</Link>
          <Link href="/#opportunity-canvas" onClick={(e) => handleSection(e, 'opportunity-canvas')}>Opportunity Canvas</Link>
          <Link href="/#topics" onClick={(e) => handleSection(e, 'topics')}>Topics</Link>
          <a
            href="https://github.com/reachmayankagarwal"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta nav-cta-ghost"
          >
            GitHub ↗
          </a>
          <a
            href="https://linkedin.com/in/reachmayankagarwal"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </nav>
  )
}
