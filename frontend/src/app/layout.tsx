import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata: Metadata = {
  title: 'EngineX.solution | Software Development & AI Solutions',
  description: 'We help startups and businesses build AI-powered products, custom software, websites, mobile apps, and digital experiences that drive growth.',
  openGraph: {
    title: 'EngineX.solution | Intelligent Digital Solutions',
    description: 'Transforming Ideas into Intelligent Digital Solutions',
    type: 'website',
    locale: 'en_US',
    siteName: 'EngineX.solution',
  },
  twitter: { card: 'summary_large_image', title: 'EngineX.solution', description: 'Transforming Ideas into Intelligent Digital Solutions' },
  robots: 'index, follow',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
