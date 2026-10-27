'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Globe,
  Smartphone,
  Brain,
  Palette,
  Code,
  Cloud,
  Zap,
  RefreshCw,
  Search,
  Target,
  Share2,
  Users,
  Video,
  TrendingUp,
  ArrowRight,
  Check,
  ArrowUpRight,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'
import { servicesList } from '@/lib/services-data'
import EnquiryModal from '@/components/EnquiryModal'

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Brain,
  Palette,
  Code,
  Cloud,
  Zap,
  RefreshCw,
  Search,
  Target,
  Share2,
  Users,
  Video,
  TrendingUp,
}

export default function ServicesClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('General Inquiry')

  const openModal = (serviceTitle: string) => {
    setSelectedService(serviceTitle)
    setModalOpen(true)
  }

  return (
    <main className="min-h-screen bg-[#060608] text-white">
      <Header />
      <div className="pt-36 pb-24 relative overflow-hidden">
        {/* Background Ambience */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

        <div className="container-custom relative z-10">
          <SectionHeading
            as="h1"
            label="Our Services"
            title="Comprehensive Technology & Growth Services"
            description="From high-performance web development and AI automation to data-driven digital marketing and SEO—engineered for measurable commercial impact."
          />

          <div className="space-y-16">
            {servicesList.map((service, i) => {
              const Icon = iconMap[service.icon] || Globe
              return (
                <motion.div
                  key={service.slug}
                  id={service.slug}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className={`flex flex-col ${
                    i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-10 items-center p-8 sm:p-12 rounded-3xl card-elevated border border-white/10 hover:border-white/30 transition-all duration-400`}
                >
                  <div className="flex-1">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/15 flex items-center justify-center mb-6 text-white shadow-[0_0_20px_rgba(255,255,255,0.08)]">
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <span className="text-[11px] uppercase tracking-widest font-bold text-neutral-400 block mb-2">
                      {service.serviceType}
                    </span>

                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                      {service.title}
                    </h2>

                    <p className="text-sm sm:text-base text-neutral-400 leading-relaxed mb-6">
                      {service.shortDescription}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-3 mb-8">
                      {service.features.slice(0, 4).map((f) => (
                        <div key={f} className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-300">
                          <Check className="w-4 h-4 text-white shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <Link href={`/services/${service.slug}`}>
                        <Button variant="primary" className="gap-2 group">
                          Explore {service.title}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                      <button
                        onClick={() => openModal(service.title)}
                        className="text-xs sm:text-sm font-semibold text-neutral-400 hover:text-white transition-colors px-3 py-2 rounded-full border border-white/10 hover:border-white/30"
                      >
                        Request Quote &rarr;
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 w-full max-w-md">
                    <div className="aspect-square rounded-2xl relative overflow-hidden border border-white/10 group shadow-xl bg-neutral-950">
                      <Image
                        src={service.image || `/images/services/${service.slug}.jpg`}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 420px"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 pointer-events-none" />

                      <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-[11px] font-semibold shadow-sm">
                        <Icon className="w-3.5 h-3.5 text-white" />
                        <span>{service.serviceType}</span>
                      </div>

                      <div className="absolute bottom-4 inset-x-4 z-10 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-white">
                        <div className="text-xs font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <span>{service.title}</span>
                        </div>
                        <p className="text-xs text-neutral-300 line-clamp-2">
                          {service.deliverables[0]}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={selectedService}
      />

      <Footer />
    </main>
  )
}
