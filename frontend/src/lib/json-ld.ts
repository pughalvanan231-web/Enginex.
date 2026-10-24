import { ServiceItem, ServiceFAQ } from './services-data'

export const SITE_URL = 'https://www.enginexsolutions.in'

export interface ArticleItem {
  slug: string
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  authorName: string
  category: string
}

export const organizationSchema = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'EngineX Solutions',
  alternateName: ['EngineX', 'EngineX Solution'],
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  email: 'pughalvanan231@gmail.com',
  telephone: '+917867050320',
  description:
    'EngineX Solutions is a premier technology, custom software development, AI automation, and performance digital marketing agency headquartered in Sulur, Coimbatore, serving businesses across India.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2/222c Sulur',
    addressLocality: 'Coimbatore',
    addressRegion: 'Tamil Nadu',
    postalCode: '641402',
    addressCountry: 'IN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-7867050320',
      contactType: 'customer service',
      email: 'pughalvanan231@gmail.com',
      areaServed: 'IN',
      availableLanguage: ['en', 'ta', 'hi'],
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'EngineX Solutions Professional Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Digital Marketing Services',
          url: `${SITE_URL}/services/digital-marketing`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Search Engine Optimization (SEO)',
          url: `${SITE_URL}/services/seo`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Google Ads Management',
          url: `${SITE_URL}/services/google-ads`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Meta Ads Management',
          url: `${SITE_URL}/services/meta-ads`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Social Media Marketing',
          url: `${SITE_URL}/services/social-media-marketing`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Website Development Services',
          url: `${SITE_URL}/services/website-development`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mobile App Development',
          url: `${SITE_URL}/services/mobile-app-development`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Video Production & Editing',
          url: `${SITE_URL}/services/video-production`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Branding & Logo Design',
          url: `${SITE_URL}/services/branding`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Automation & Custom Software',
          url: `${SITE_URL}/services/ai-automation`,
        },
      },
    ],
  },
}

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'EngineX Solutions',
  description: 'Custom Software, AI Automation, Web Development & Performance Digital Marketing Solutions.',
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
  inLanguage: 'en-US',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/services?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
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
      telephone: '+917867050320',
      email: 'pughalvanan231@gmail.com',
    },
    serviceType: service.serviceType,
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    url: `${SITE_URL}/services/${service.slug}`,
    termsOfService: `${SITE_URL}/terms`,
  }
}

export function getFAQSchema(faqs: ServiceFAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function getArticleSchema(article: ArticleItem) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_URL}/blog/${article.slug}#article`,
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.authorName,
      url: `${SITE_URL}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'EngineX Solutions',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.ico`,
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${article.slug}`,
    },
    articleSection: article.category,
    inLanguage: 'en-US',
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
