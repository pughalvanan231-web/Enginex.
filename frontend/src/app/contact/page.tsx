import type { Metadata } from 'next'
import { Mail, Phone, MapPin } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'
import { getBreadcrumbSchema, SITE_URL } from '@/lib/json-ld'

export const metadata: Metadata = {
  title: 'Contact EngineX Solutions | Get a Project Quote & Consultation',
  description:
    'Get in touch with EngineX Solutions. Request a quote or schedule a 30-minute growth consultation for web development, mobile apps, AI automation, or custom software.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact EngineX Solutions | Free Project Consultation',
    description:
      'Have a project in mind? Reach out to EngineX Solutions to discuss custom software, AI automation, and web development.',
    url: `${SITE_URL}/contact`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact EngineX Solutions | Free Project Consultation',
    description:
      'Have a project in mind? Reach out to EngineX Solutions to discuss custom software, AI automation, and web development.',
  },
}

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'pughalvanan231@gmail.com',
    href: 'mailto:pughalvanan231@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 7867050320',
    href: 'tel:+917867050320',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: '2/222c Sulur, Coimbatore, Tamil Nadu',
    href: 'https://maps.google.com/?q=Sulur,Coimbatore,Tamil+Nadu',
  },
]

export default function ContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ])

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c'),
        }}
      />
      <Header />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <SectionHeading
            as="h1"
            label="Contact"
            title="Get in Touch"
            description="Have a project in mind? Reach out to us and let us help you build something great."
          />

          <div className="max-w-lg mx-auto space-y-6">
            {contactInfo.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FF8C38]/08 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#FF8C38]" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      {item.label}
                    </div>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-foreground font-medium whitespace-pre-line hover:text-[#FF8C38] transition-colors duration-300"
                    >
                      {item.value}
                    </a>
                  </div>
                </div>
              )
            })}
            <div className="mt-6 p-4 rounded-xl bg-[#FF8C38]/05 border border-[#FF8C38]/10 text-center">
              <p className="text-xs text-[#6B6B6B]">
                Free 30-minute growth strategy session &bull; No obligation
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
