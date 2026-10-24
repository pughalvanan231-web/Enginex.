export interface PortfolioProject {
  id: string
  slug: string
  title: string
  clientName: string
  category: string
  description: string
  technologies: string[]
  completionDate: string
  projectUrl?: string | null
  challenge: string
  solution: string
  outcome: string
  featured: boolean
}

export const staticProjects: PortfolioProject[] = [
  {
    id: 'proj-1',
    slug: 'ecommerce-growth-engine',
    title: 'Headless E-Commerce Web Platform with Sub-Second Edge Speeds',
    clientName: 'Direct-to-Consumer Brand',
    category: 'Web Development',
    description:
      'Engineered a custom Next.js 15 headless e-commerce store with server-side rendering, instant product filtering, and Razorpay checkout integration.',
    technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Razorpay', 'PostgreSQL', 'Vercel Edge'],
    completionDate: 'January 2026',
    projectUrl: 'https://www.enginexsolutions.in/services/website-development',
    challenge:
      'The client was operating on a legacy WordPress/WooCommerce site taking over 4.5 seconds to load on mobile devices, causing high cart abandonment and poor organic search ranking.',
    solution:
      'Rebuilt the entire storefront with Next.js App Router, edge caching, automated WebP/AVIF image optimization, and dynamic structured data schema.',
    outcome:
      'Reduced average mobile page load time to 800ms, achieved all-green Core Web Vitals, and significantly increased mobile checkout completions.',
    featured: true,
  },
  {
    id: 'proj-2',
    slug: 'b2b-lead-generation-system',
    title: 'Multi-Channel B2B Customer Acquisition Engine & PPC Optimization',
    clientName: 'Industrial Equipment Manufacturer',
    category: 'Digital Marketing',
    description:
      'Synchronized high-intent Google Search advertising, technical SEO remediation, and GA4 enhanced conversion tracking for a precision machinery supplier.',
    technologies: ['Google Ads', 'Google Tag Manager', 'GA4 Enhanced Conversions', 'Technical SEO', 'Looker Studio'],
    completionDate: 'December 2025',
    projectUrl: 'https://www.enginexsolutions.in/services/google-ads',
    challenge:
      'The manufacturer had spent substantial budget on broad-match Google Ads with negligible return, receiving non-commercial queries and unqualified consumer clicks.',
    solution:
      'Restructured campaigns into tightly themed single-intent ad groups, added over 400 industry negative keywords, and established server-side lead verification.',
    outcome:
      'Decreased cost per qualified commercial lead by 42% within 60 days while increasing genuine quotation inquiries from industrial buyers across India.',
    featured: true,
  },
  {
    id: 'proj-3',
    slug: 'enterprise-rag-assistant',
    title: 'Private Enterprise Document Intelligence & AI Automation Pipeline',
    clientName: 'Logistics & Compliance Firm',
    category: 'AI Automation',
    description:
      'Developed a private retrieval-augmented generation (RAG) assistant allowing internal teams to query standard operating procedures and regulatory filings instantly.',
    technologies: ['Python', 'FastAPI', 'LangChain', 'pgvector', 'PostgreSQL', 'Docker'],
    completionDate: 'November 2025',
    projectUrl: 'https://www.enginexsolutions.in/services/ai-automation',
    challenge:
      'Employees spent over 90 minutes each day searching through unorganized PDF filings and compliance manuals, leading to delayed customer responses and documentation errors.',
    solution:
      'Deployed an on-premises vector database with semantic chunking and automated document ingestion, restricted strictly within the client’s private cloud VPC.',
    outcome:
      'Reduced document query resolution times from 90 minutes to under 5 seconds with verifiable document citations and zero data leakage to external models.',
    featured: true,
  },
  {
    id: 'proj-4',
    slug: 'mobile-field-service-app',
    title: 'Cross-Platform Field Service Application with Offline Sync',
    clientName: 'Engineering Field Operations',
    category: 'Mobile App Development',
    description:
      'Built a cross-platform mobile inspection app allowing field engineers to complete audits, capture digital signatures, and sync reports with offline resilience.',
    technologies: ['React Native', 'TypeScript', 'SQLite', 'Firebase Cloud Messaging', 'REST API'],
    completionDate: 'October 2025',
    projectUrl: 'https://www.enginexsolutions.in/services/mobile-app-development',
    challenge:
      'Field technicians working in remote industrial sites with spotty mobile network coverage experienced app crashes and lost manual paper inspection forms.',
    solution:
      'Designed an offline-first SQLite database architecture that queues inspections locally and synchronizes automatically upon regaining connectivity.',
    outcome:
      'Eliminated manual paper records completely and accelerated inspection turnaround times across 5 regional Indian service hubs.',
    featured: true,
  },
]

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return staticProjects.find((p) => p.slug === slug)
}

export function getAllProjectSlugs(): string[] {
  return staticProjects.map((p) => p.slug)
}
