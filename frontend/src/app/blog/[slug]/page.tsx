import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogDetailClient from './BlogDetailClient'
import { getStaticBlogPostBySlug, getAllStaticBlogSlugs } from '@/lib/blog-data'
import { getArticleSchema, getBreadcrumbSchema, SITE_URL } from '@/lib/json-ld'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllStaticBlogSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const staticPost = getStaticBlogPostBySlug(slug)

  if (staticPost) {
    const canonicalUrl = `${SITE_URL}/blog/${staticPost.slug}`
    return {
      title: `${staticPost.title} | EngineX Solutions`,
      description: staticPost.excerpt,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: `${staticPost.title} | EngineX Solutions Blog`,
        description: staticPost.excerpt,
        url: canonicalUrl,
        type: 'article',
        publishedTime: staticPost.publishedAt,
        modifiedTime: staticPost.updatedAt,
        authors: [staticPost.author.name],
        section: staticPost.category,
        tags: staticPost.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: staticPost.title,
        description: staticPost.excerpt,
      },
    }
  }

  const formattedTitle = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
  const canonicalUrl = `${SITE_URL}/blog/${slug}`

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
  const staticPost = getStaticBlogPostBySlug(slug)

  const articleSchema = staticPost
    ? getArticleSchema({
        slug: staticPost.slug,
        title: staticPost.title,
        description: staticPost.excerpt,
        publishedAt: staticPost.publishedAt,
        updatedAt: staticPost.updatedAt,
        authorName: staticPost.author.name,
        category: staticPost.category,
      })
    : null

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    {
      name: staticPost ? staticPost.title : slug,
      path: `/blog/${slug}`,
    },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': articleSchema ? [articleSchema, breadcrumbSchema] : [breadcrumbSchema],
          }).replace(/</g, '\\u003c'),
        }}
      />
      <BlogDetailClient slug={slug} initialStaticPost={staticPost} />
    </>
  )
}
