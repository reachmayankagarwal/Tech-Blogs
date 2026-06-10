import Link from 'next/link'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700'] })

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className={`footer-logo ${playfair.className}`}>
        Mayank<span>.ai</span>
      </div>
      <p>Building AI products, mapping opportunities, and documenting the journey from 0 to 1.</p>
      <div className="footer-links">
        <Link href="/">Home</Link>
        <Link href="/articles">Articles</Link>
        <Link href="/products">Product Prototypes</Link>
        <Link href="/canvases">Opportunity Canvas</Link>
        <a
          href="https://github.com/reachmayankagarwal"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/reachmayankagarwal"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  )
}
