'use client'

import { useEffect } from 'react'

/**
 * Scrolls to a #section when the homepage is reached via a hash link
 * (e.g. a back-link from /products/[slug]), then strips the hash so the
 * home URL stays clean at "/".
 */
export default function ScrollClean() {
  useEffect(() => {
    function handle() {
      const hash = window.location.hash
      if (!hash) return
      const el = document.getElementById(hash.slice(1))
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }
    handle()
    window.addEventListener('hashchange', handle)
    return () => window.removeEventListener('hashchange', handle)
  }, [])

  return null
}
