'use client'

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
  ArrowRight,
  Check,
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'
import { servicesList } from '@/lib/services-data'

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Brain,
  Palette,
  Code,
  Cloud,
  Zap,
  RefreshCw,
}

export default function ServicesClient() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <SectionHeading
            as="h1"
            label="Our Services"
            title="Comprehensive Digital Solutions"
            description="From web development to AI, we offer everything you need to build, scale, and transform your business in the digital age."
          />

          <div className="space-y-24">
            {servicesList.map((service, i) => {
              const Icon = iconMap[service.icon] || Globe
              return (
                <motion.div
                  key={service.slug}
                  id={service.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className={`flex flex-col ${
                    i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-12 items-center`}
                >
                  <div className="flex-1">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                      {service.title}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      {service.detail}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3 mb-8">
                      {service.features.map((f) => (
                        <div key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
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
                      <Link
                        href="/contact"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                      >
                        Request Quote &rarr;
                      </Link>
                    </div>
                  </div>
                  <div className="flex-1 card-subtle p-8 lg:p-12 w-full">
                    <div className="aspect-square bg-gradient-to-br from-primary/5 to-transparent rounded-xl flex items-center justify-center">
                      <Icon className="w-32 h-32 text-primary/20" />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
