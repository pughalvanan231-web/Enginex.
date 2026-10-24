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
} from 'lucide-react'
import Link from 'next/link'
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
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <SectionHeading
            as="h1"
            label="Our Services"
            title="Comprehensive Technology & Growth Services"
            description="From high-performance web development and AI automation to data-driven digital marketing and SEO—engineered for measurable commercial impact."
          />

          <div className="space-y-20">
            {servicesList.map((service, i) => {
              const Icon = iconMap[service.icon] || Globe
              return (
                <motion.div
                  key={service.slug}
                  id={service.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 }}
                  className={`flex flex-col ${
                    i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-10 items-center p-8 rounded-2xl border border-border/80 bg-white/60 hover:border-primary/30 transition-all`}
                >
                  <div className="flex-1">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-primary block mb-2">
                      {service.serviceType}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                      {service.title}
                    </h2>
                    <p className="text-base text-muted-foreground leading-relaxed mb-6">
                      {service.shortDescription}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2.5 mb-8">
                      {service.features.slice(0, 4).map((f) => (
                        <div key={f} className="flex items-center gap-2.5 text-xs sm:text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary shrink-0" />
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
                        className="text-xs sm:text-sm font-semibold text-muted-foreground hover:text-primary transition-colors px-2 py-1"
                      >
                        Request Quote &rarr;
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 card-subtle p-8 w-full max-w-md">
                    <div className="aspect-square bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-xl flex flex-col items-center justify-center p-6 text-center border border-primary/10">
                      <Icon className="w-24 h-24 text-primary/30 mb-3" />
                      <div className="text-xs font-semibold text-foreground uppercase tracking-widest">
                        {service.title}
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">
                        {service.deliverables[0]}
                      </p>
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
