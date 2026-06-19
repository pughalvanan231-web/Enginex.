'use client'

import { motion } from 'framer-motion'
import { Globe, Smartphone, Brain, Palette, Code, Cloud, Zap, RefreshCw, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import SectionHeading from './SectionHeading'

const iconMap: Record<string, React.ElementType> = {
  Globe, Smartphone, Brain, Palette, Code, Cloud, Zap, RefreshCw,
}

const services = [
  { icon: 'Globe', title: 'Web Development', description: 'High-converting, lightning-fast websites and web applications built with modern frameworks that drive engagement and revenue.', href: '/services/web-development' },
  { icon: 'Smartphone', title: 'Mobile App Development', description: 'Native and cross-platform apps that deliver exceptional user experiences and measurable business outcomes on iOS and Android.', href: '/services/mobile-app-development' },
  { icon: 'Brain', title: 'AI & Machine Learning', description: 'Intelligent automation, predictive analytics, and custom AI solutions that reduce costs and unlock new revenue streams.', href: '/services/ai-ml-solutions' },
  { icon: 'Palette', title: 'UI/UX Design', description: 'User-centered design that combines aesthetics with functionality to create memorable brand experiences.', href: '/services/ui-ux-design' },
  { icon: 'Code', title: 'Custom Software', description: 'Tailored software solutions built for your unique business challenges and growth objectives.', href: '/services/custom-software' },
  { icon: 'Cloud', title: 'Cloud Solutions', description: 'Scalable cloud infrastructure and DevOps for modern, resilient applications.', href: '/services/cloud-solutions' },
  { icon: 'Zap', title: 'Automation', description: 'Streamline operations with intelligent automation and optimized workflows.', href: '/services/automation' },
  { icon: 'RefreshCw', title: 'Digital Transformation', description: 'End-to-end digital transformation to modernize your business and drive efficiency.', href: '/services/digital-transformation' },
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
          title="Comprehensive Capabilities"
          description="From high-performance technology platforms to performance solutions that actually convert — everything we do is engineered for measurable impact."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon]
            return (
              <motion.div key={service.title} {...fadeUp(i * 0.05)} className="card-elevated p-6 group cursor-pointer">
                <div className="w-11 h-11 rounded-xl bg-[#FF8C38]/08 flex items-center justify-center mb-4 group-hover:bg-[#FF8C38]/12 group-hover:scale-105 transition-all duration-500">
                  {Icon && <Icon className="w-5 h-5 text-[#FF8C38]" />}
                </div>
                <h3 className="text-base font-semibold text-[#1A1A1A] mb-2">{service.title}</h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-5">{service.description}</p>
                <Link href={service.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#FF8C38] group-hover:gap-2.5 transition-all duration-500">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div {...fadeUp(0.3)} className="text-center mt-12">
          <Link href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF8C38] text-white text-sm font-medium transition-all duration-500 ease-out hover:bg-[#E67A2E] hover:shadow-lg hover:shadow-[#FF8C38]/20 group">
            Explore All 16+ Services <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
