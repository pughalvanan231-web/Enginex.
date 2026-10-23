import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServiceDetailClient from './ServiceDetailClient'
import {
  servicesList,
  getServiceBySlug,
  getAllServiceSlugs,
  ServiceItem,
} from '@/lib/services-data'
import { getServiceSchema, getBreadcrumbSchema, SITE_URL } from '@/lib/json-ld'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return {
      title: 'Service Not Found | EngineX Solutions',
      description: 'The requested service could not be found.',
      robots: { index: false, follow: false },
    }
  }

  const canonicalUrl = `https://www.enginexsolutions.in/services/${service.slug}`

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: canonicalUrl,
      type: 'website',
      siteName: 'EngineX Solutions',
    },
    twitter: {
      card: 'summary_large_image',
      title: service.metaTitle,
      description: service.metaDescription,
    },
  }
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const relatedServices: ServiceItem[] = service.relatedSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is ServiceItem => Boolean(s))

  const serviceSchema = getServiceSchema(service)
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.title, path: `/services/${service.slug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [serviceSchema, breadcrumbSchema],
          }).replace(/</g, '\\u003c'),
        }}
      />
      <ServiceDetailClient service={service} relatedServices={relatedServices} />
    </>
  )
}
