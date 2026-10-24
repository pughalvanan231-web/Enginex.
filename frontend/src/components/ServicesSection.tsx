'use client'

import { motion } from 'framer-motion'
import {
  Globe,
  Smartphone,
  Brain,
  Palette,
  Video,
  Search,
  Target,
  Share2,
  Users,
  TrendingUp,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'
import SectionHeading from './SectionHeading'

const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  Search,
  Target,
  Share2,
  Users,
  Globe,
  Smartphone,
  Video,
  Palette,
  Brain,
}

const services = [
  {
    icon: 'Globe',
    title: 'Website Development',
    description: 'Custom, high-performance websites and web applications built with Next.js & React for sub-second page loads and high search visibility.',
    href: '/services/website-development',
  },
  {
    icon: 'TrendingUp',
    title: 'Digital Marketing Services',
    description: 'Integrated multi-channel acquisition strategies tailored to drive genuine commercial inquiries and revenue for Indian businesses.',
    href: '/services/digital-marketing',
  },
  {
    icon: 'Search',
    title: 'Search Engine Optimization (SEO)',
    description: 'White-hat technical SEO, Core Web Vitals optimization, and topical authority content designed to capture high-intent Google rankings.',
    href: '/services/seo',
  },
  {
    icon: 'Target',
    title: 'Google Ads Management',
    description: 'High-intent search, Performance Max, and conversion-tracked PPC campaigns engineered to maximize return on advertising spend.',
    href: '/services/google-ads',
  },
  {
    icon: 'Share2',
    title: 'Meta Ads (Facebook & Instagram)',
    description: 'Full-funnel creative testing, granular audience targeting, and Conversions API integration to scale customer acquisition profitably.',
    href: '/services/meta-ads',
  },
  {
    icon: 'Users',
    title: 'Social Media Marketing',
    description: 'Strategic B2B & consumer social media content, founder thought leadership, and organic reach optimization across LinkedIn & Instagram.',
    href: '/services/social-media-marketing',
  },
  {
    icon: 'Smartphone',
    title: 'Mobile App Development',
    description: 'Native-grade iOS and Android mobile apps engineered with React Native and Flutter for seamless user experiences and store approvals.',
    href: '/services/mobile-app-development',
  },
  {
    icon: 'Video',
    title: 'Video Production & Editing',
    description: 'Cinematic corporate brand films, software explainers, customer case studies, and high-retention short-form social reels.',
    href: '/services/video-production',
  },
  {
    icon: 'Palette',
    title: 'Branding & Logo Design',
    description: 'Distinctive brand identity design, custom typography, vector logos, and cohesive style guidelines that command market trust.',
    href: '/services/branding',
  },
  {
    icon: 'Brain',
    title: 'AI Automation & Custom Software',
    description: 'Practical private AI knowledge agents (RAG), automated data extraction, and bespoke enterprise software eliminating manual friction.',
    href: '/services/ai-automation',
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function ServicesSection() {
  return (
    <section className="section-padding bg-[#FAFAFA]">
      <div className="container-custom">
        <SectionHeading
          label="Our Services"
          title="Dedicated Growth & Engineering Services"
          description="From custom software platforms and AI automation to performance digital marketing and white-hat SEO—engineered for measurable commercial outcomes."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Globe
            return (
              <motion.div
                key={service.title}
                {...fadeUp(i * 0.04)}
                className="card-elevated p-6 group cursor-pointer flex flex-col justify-between hover:border-primary/40 transition-all duration-300"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#FF8C38]/08 flex items-center justify-center mb-4 group-hover:bg-[#FF8C38]/12 group-hover:scale-105 transition-all duration-500">
                    <Icon className="w-5 h-5 text-[#FF8C38]" />
                  </div>
                  <h3 className="text-base font-bold text-[#1A1A1A] mb-2 group-hover:text-[#FF8C38] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>
                <div>
                  <Link
                    href={service.href}
                    aria-label={`Explore ${service.title} services`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#FF8C38] group-hover:gap-2.5 transition-all duration-300"
                  >
                    Explore Service <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div {...fadeUp(0.3)} className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FF8C38] text-white text-sm font-medium transition-all duration-500 ease-out hover:bg-[#E67A2E] hover:shadow-lg hover:shadow-[#FF8C38]/20 group"
          >
            View Complete Service Directory{' '}
            <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
