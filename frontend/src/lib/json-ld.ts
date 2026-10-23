import { ServiceItem } from './services-data'

export const SITE_URL = 'https://www.enginexsolutions.in'

export const organizationSchema = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'EngineX Solutions',
  alternateName: 'EngineX',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  email: 'pughalvanan231@gmail.com',
  telephone: '+91 7867050320',
  description: 'EngineX Solutions is a modern technology, AI, and digital solutions company delivering custom software, website and app development, AI automation, and digital growth.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2/222c Sulur',
    addressLocality: 'Coimbatore',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  sameAs: [],
}

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'EngineX Solutions',
  description: 'A modern software, AI, and creative digital solutions company.',
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
}

export function getServiceSchema(service: ServiceItem) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/services/${service.slug}#service`,
    name: service.title,
    description: service.shortDescription,
    provider: {
      '@type': 'Organization',
      name: 'EngineX Solutions',
      url: SITE_URL,
    },
    serviceType: service.serviceType,
    areaServed: 'Worldwide',
    url: `${SITE_URL}/services/${service.slug}`,
  }
}

export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path.startsWith('http') ? item.path : `${SITE_URL}${item.path}`,
    })),
  }
}
