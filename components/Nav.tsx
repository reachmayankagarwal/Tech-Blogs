'use client'

import Link from 'next/link'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700'] })

export default function Nav() {
  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <Link href="/" className={`nav-logo ${playfair.className}`}>
          Mayank<span>.</span>dev
        </Link>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/#articles">Articles</Link>
          <Link href="/#topics">Topics</Link>
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
