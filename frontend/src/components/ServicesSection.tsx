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
  ArrowUpRight,
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
    description: 'Custom, high-performance web applications built with Next.js 15 & React for sub-second page loads, exceptional Core Web Vitals, and SEO dominance.',
    href: '/services/website-development',
    tag: 'Next.js / React / Edge',
  },
  {
    icon: 'TrendingUp',
    title: 'Digital Marketing Services',
    description: 'Integrated multi-channel acquisition strategies engineered to generate qualified commercial inquiries, sales pipeline, and recurring revenue.',
    href: '/services/digital-marketing',
    tag: 'Full-Funnel Growth',
  },
  {
    icon: 'Search',
    title: 'Search Engine Optimization (SEO)',
    description: 'White-hat technical SEO architecture, topical authority clustering, and schema optimization designed to dominate high-intent Google rankings.',
    href: '/services/seo',
    tag: 'Technical & Organic SEO',
  },
  {
    icon: 'Target',
    title: 'Google Ads Management',
    description: 'High-intent search, Performance Max, and conversion-tracked PPC campaigns rigorously managed to maximize Return on Ad Spend (ROAS).',
    href: '/services/google-ads',
    tag: 'ROAS & PPC Optimization',
  },
  {
    icon: 'Share2',
    title: 'Meta Ads (Facebook & Instagram)',
    description: 'Full-funnel creative testing frameworks, granular audience segmentation, and Meta Conversions API integration to scale customer acquisition profitably.',
    href: '/services/meta-ads',
    tag: 'Paid Social Performance',
  },
  {
    icon: 'Users',
    title: 'Social Media Marketing',
    description: 'Strategic B2B and consumer social content, executive thought leadership, and organic distribution across LinkedIn and Instagram.',
    href: '/services/social-media-marketing',
    tag: 'Brand & Distribution',
  },
  {
    icon: 'Smartphone',
    title: 'Mobile App Development',
    description: 'Cross-platform native iOS & Android applications engineered with React Native and Flutter for buttery 60fps performance and rapid store delivery.',
    href: '/services/mobile-app-development',
    tag: 'iOS & Android Native',
  },
  {
    icon: 'Video',
    title: 'Video Production & Editing',
    description: 'Cinematic corporate brand videos, software walkthroughs, product showreels, and viral high-retention short-form video assets.',
    href: '/services/video-production',
    tag: 'Cinematic Visuals',
  },
  {
    icon: 'Palette',
    title: 'Branding & Visual Identity',
    description: 'Premium identity systems, typographic design, vector brandmarks, and design tokens that command market trust and instant brand recall.',
    href: '/services/branding',
    tag: 'Brand Systems',
  },
  {
    icon: 'Brain',
    title: 'AI Automation & Custom Software',
    description: 'Private RAG knowledge bases, automated business workflows, intelligent customer bots, and bespoke software eliminating human friction.',
    href: '/services/ai-automation',
    tag: 'Private AI & Workflow',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function ServicesSection() {
  return (
    <section className="section-padding bg-[#060608] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-white/[0.015] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-white/[0.015] rounded-full blur-[140px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          label="Our Capabilities"
          title="Dedicated Growth & Engineering Services"
          description="From custom software architecture and private AI to performance marketing and white-hat SEO—engineered for measurable commercial outcomes."
        />

        {/* Services Grid with Framer Motion Stagger and Card Animations */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Globe
            return (
              <motion.div
                key={service.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="card-elevated p-8 group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                      <Icon className="w-5 h-5 text-white group-hover:text-black transition-colors duration-300" />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/10 group-hover:border-white/20 transition-colors">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors flex items-center justify-between">
                    <span>{service.title}</span>
                  </h3>

                  <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06]">
                  <Link
                    href={service.href}
                    aria-label={`Explore ${service.title} services`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-300 group-hover:text-white transition-all duration-300"
                  >
                    <span>Explore Service</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Directory CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-16"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold text-sm transition-all duration-300 hover:bg-neutral-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] group active:scale-95"
          >
            <span>View Complete Service Directory</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
