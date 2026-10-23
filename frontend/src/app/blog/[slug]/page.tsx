import type { Metadata } from 'next'
import BlogDetailClient from './BlogDetailClient'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const formattedTitle = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
  const canonicalUrl = `https://www.enginexsolutions.in/blog/${slug}`

  return {
    title: `${formattedTitle} | Tech Insights | EngineX Solutions`,
    description: `Read "${formattedTitle}" and discover key engineering, software, and AI insights from EngineX Solutions.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${formattedTitle} | EngineX Solutions Blog`,
      description: `Read "${formattedTitle}" on the EngineX Solutions engineering blog.`,
      url: canonicalUrl,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${formattedTitle} | EngineX Solutions`,
      description: `Read "${formattedTitle}" on the EngineX Solutions engineering blog.`,
    },
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  return <BlogDetailClient slug={slug} />
}
