import type { Metadata } from 'next'
import ProjectDetailClient from './ProjectDetailClient'
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/portfolio-data'
import { getBreadcrumbSchema, SITE_URL } from '@/lib/json-ld'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (project) {
    const canonicalUrl = `${SITE_URL}/portfolio/${project.slug}`
    return {
      title: `${project.title} | Case Study | EngineX Solutions`,
      description: project.description,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: `${project.title} | Case Study | EngineX Solutions`,
        description: project.description,
        url: canonicalUrl,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: project.title,
        description: project.description,
      },
    }
  }

  const formattedTitle = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
  const canonicalUrl = `${SITE_URL}/portfolio/${slug}`

  return {
    title: `${formattedTitle} | Project Case Study | EngineX Solutions`,
    description: `Discover how EngineX Solutions architected and delivered the ${formattedTitle} project.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${formattedTitle} | Case Study | EngineX Solutions`,
      description: `Explore the ${formattedTitle} case study delivered by EngineX Solutions.`,
      url: canonicalUrl,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${formattedTitle} | EngineX Solutions`,
      description: `Explore the ${formattedTitle} case study delivered by EngineX Solutions.`,
    },
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    {
      name: project ? project.title : slug,
      path: `/portfolio/${slug}`,
    },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c'),
        }}
      />
      <ProjectDetailClient slug={slug} initialProject={project} />
    </>
  )
}
