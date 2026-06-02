import Link from 'next/link'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700'] })

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className={`footer-logo ${playfair.className}`}>
        Mayank<span>.dev</span>
      </div>
      <p>Writing about AI, agents, and the future of technology.</p>
      <div className="footer-links">
        <Link href="/">Home</Link>
        <Link href="/#articles">Articles</Link>
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
