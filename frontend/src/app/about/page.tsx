import type { Metadata } from 'next'
import AboutClient from './AboutClient'
import { getBreadcrumbSchema, SITE_URL } from '@/lib/json-ld'

export const metadata: Metadata = {
  title: 'About Us | Software Engineering & AI Solutions | EngineX Solutions',
  description:
    'Discover EngineX Solutions: our mission, leadership, core values, and proven expertise in custom software development, AI automation, and high-performance web platforms.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About EngineX Solutions | Intelligent Digital Solutions',
    description:
      'Learn about our engineering philosophy, leadership team, and proven track record in software and AI solutions.',
    url: `${SITE_URL}/about`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About EngineX Solutions | Intelligent Digital Solutions',
    description:
      'Learn about our engineering philosophy, leadership team, and proven track record in software and AI solutions.',
  },
}

export default function AboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c'),
        }}
      />
      <AboutClient />
    </>
  )
}
