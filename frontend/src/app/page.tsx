import type { Metadata } from 'next'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import PortfolioSection from '@/components/PortfolioSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import TrustSection from '@/components/TrustSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import { SITE_URL } from '@/lib/json-ld'

export const metadata: Metadata = {
  title: 'EngineX Solutions | Web Development, AI Automation & Digital Marketing',
  description:
    'EngineX Solutions is a modern technology and digital growth agency in India. We engineer custom Next.js websites, mobile apps, AI automation, SEO, Google Ads, and video production.',
  alternates: {
    canonical: 'https://www.enginexsolutions.in/',
  },
  openGraph: {
    title: 'EngineX Solutions | Web Development, AI Automation & Digital Marketing',
    description:
      'EngineX Solutions helps Indian businesses scale with custom web platforms, practical AI automation, white-hat SEO, and performance advertising.',
    url: SITE_URL,
    type: 'website',
    siteName: 'EngineX Solutions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EngineX Solutions | Web Development, AI Automation & Digital Marketing',
    description:
      'EngineX Solutions helps Indian businesses scale with custom web platforms, practical AI automation, white-hat SEO, and performance advertising.',
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <TrustSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
