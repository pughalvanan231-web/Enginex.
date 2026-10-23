import type { Metadata } from 'next'
import CareersClient from './CareersClient'
import { getBreadcrumbSchema, SITE_URL } from '@/lib/json-ld'

export const metadata: Metadata = {
  title: 'Careers at EngineX Solutions | Join Our Engineering Team',
  description:
    'Explore high-impact career opportunities at EngineX Solutions. Work on modern software engineering, AI systems, and cloud infrastructure.',
  alternates: {
    canonical: '/careers',
  },
  openGraph: {
    title: 'Careers at EngineX Solutions | Join Our Team',
    description:
      'Explore career opportunities at EngineX Solutions. Work with modern tech stacks, AI, and cloud systems.',
    url: `${SITE_URL}/careers`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers at EngineX Solutions | Join Our Team',
    description:
      'Explore career opportunities at EngineX Solutions. Work with modern tech stacks, AI, and cloud systems.',
  },
}

export default function CareersPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Careers', path: '/careers' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c'),
        }}
      />
      <CareersClient />
    </>
  )
}
