import type { Metadata } from 'next'
import ServicesClient from './ServicesClient'
import { getBreadcrumbSchema, SITE_URL } from '@/lib/json-ld'

export const metadata: Metadata = {
  title: 'Our Services | Software, AI & Digital Solutions | EngineX Solutions',
  description:
    'Explore comprehensive technology and digital solutions by EngineX Solutions: custom web development, mobile apps, AI automation, cloud architecture, and UI/UX design.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Our Services | EngineX Solutions',
    description:
      'Explore comprehensive technology and digital solutions by EngineX Solutions: web, mobile, AI, and cloud development.',
    url: `${SITE_URL}/services`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services | EngineX Solutions',
    description:
      'Explore comprehensive technology and digital solutions by EngineX Solutions: web, mobile, AI, and cloud development.',
  },
}

export default function ServicesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c'),
        }}
      />
      <ServicesClient />
    </>
  )
}
