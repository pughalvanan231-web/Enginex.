import type { Metadata } from 'next'
import ProjectDetailClient from './ProjectDetailClient'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const formattedTitle = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
  const canonicalUrl = `https://www.enginexsolutions.in/portfolio/${slug}`

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
  return <ProjectDetailClient slug={slug} />
}
