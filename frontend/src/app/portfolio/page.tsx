import type { Metadata } from 'next'
import PortfolioClient from './PortfolioClient'
import { getBreadcrumbSchema, SITE_URL } from '@/lib/json-ld'

export const metadata: Metadata = {
  title: 'Portfolio & Case Studies | EngineX Solutions',
  description:
    'Explore our portfolio of successful digital projects, custom software development, web applications, and AI integrations built for high-growth businesses.',
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: 'Portfolio & Case Studies | EngineX Solutions',
    description:
      'Explore our portfolio of successful digital projects, custom software development, web applications, and AI integrations.',
    url: `${SITE_URL}/portfolio`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio & Case Studies | EngineX Solutions',
    description:
      'Explore our portfolio of successful digital projects, custom software development, web applications, and AI integrations.',
  },
}

export default function PortfolioPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c'),
        }}
      />
      <PortfolioClient />
    </>
  )
}
