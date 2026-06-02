import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600'] })

export const metadata: Metadata = {
  title: 'Mayank Agarwal — Tech Blog',
  description: 'Writing about AI agents, protocols, infrastructure, and the future of technology.',
  openGraph: {
    type: 'website',
    siteName: 'Mayank.dev',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
