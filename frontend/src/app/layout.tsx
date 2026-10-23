import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"
import './globals.css'
import { organizationSchema, websiteSchema, SITE_URL } from '@/lib/json-ld'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'EngineX Solutions | AI, Web Development & Digital Marketing',
    template: '%s | EngineX Solutions',
  },
  description:
    'EngineX Solutions helps businesses grow with high-performance website and app development, AI automation, SEO, Google Ads, Meta Ads, social media marketing, branding, and video production.',
  applicationName: 'EngineX Solutions',
  authors: [{ name: 'EngineX Solutions', url: SITE_URL }],
  creator: 'EngineX Solutions',
  publisher: 'EngineX Solutions',
  keywords: [
    'EngineX Solutions',
    'web development',
    'mobile app development',
    'AI solutions',
    'AI automation',
    'custom software development',
    'cloud solutions',
    'SEO services',
    'UI/UX design',
    'digital marketing',
  ],
  alternates: {
    canonical: 'https://www.enginexsolutions.in/',
  },
  openGraph: {
    title: 'EngineX Solutions | AI, Web Development & Digital Marketing',
    description:
      'EngineX Solutions helps businesses grow with website and app development, AI automation, SEO, Google Ads, Meta Ads, social media marketing, branding, and video production.',
    url: SITE_URL,
    siteName: 'EngineX Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EngineX Solutions | AI, Web Development & Digital Marketing',
    description:
      'EngineX Solutions helps businesses grow with website and app development, AI automation, SEO, Google Ads, Meta Ads, social media marketing, branding, and video production.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [organizationSchema, websiteSchema],
            }).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
