import type { Metadata } from 'next'
import BlogClient from './BlogClient'
import { getBreadcrumbSchema, SITE_URL } from '@/lib/json-ld'

export const metadata: Metadata = {
  title: 'Insights & Articles | Engineering & AI Blog | EngineX Solutions',
  description:
    'Read articles and insights on modern web development, artificial intelligence, cloud architectures, and digital transformation from EngineX Solutions.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Insights & Articles | EngineX Solutions',
    description:
      'Read articles and insights on modern web development, artificial intelligence, cloud architectures, and digital transformation.',
    url: `${SITE_URL}/blog`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insights & Articles | EngineX Solutions',
    description:
      'Read articles and insights on modern web development, artificial intelligence, cloud architectures, and digital transformation.',
  },
}

export default function BlogPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c'),
        }}
      />
      <BlogClient />
    </>
  )
}
