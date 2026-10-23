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
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { ServiceItem } from '@/lib/services-data'

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

interface ServiceDetailClientProps {
  service: ServiceItem
  relatedServices: ServiceItem[]
}

export default function ServiceDetailClient({ service, relatedServices }: ServiceDetailClientProps) {
  const Icon = iconMap[service.icon] || Globe

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
              </li>
              <li>
                <Link href="/services" className="hover:text-foreground transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
              </li>
              <li className="text-foreground font-medium" aria-current="page">
                {service.title}
              </li>
            </ol>
          </nav>

          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-24">
            <div className="flex-1">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                {service.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
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
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button variant="primary" size="lg" className="gap-2 group">
                    Schedule Free Consultation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="secondary" size="lg" className="gap-2">
                    <ArrowLeft className="w-4 h-4" /> All Services
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 card-subtle p-8 lg:p-12 w-full">
              <div className="aspect-square bg-gradient-to-br from-primary/5 to-transparent rounded-xl flex items-center justify-center relative overflow-hidden">
                <Icon className="w-36 h-36 text-primary/20" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/90 backdrop-blur-sm border border-border/50 text-xs text-muted-foreground flex items-center gap-3 shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                  <span>Engineered for measurable business growth, high availability, and rapid ROI.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <section className="mb-24">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <span className="section-label">Why Choose Us</span>
              <h2 className="section-title">Key Benefits & Strategic Advantages</h2>
              <p className="section-desc mt-3 mx-auto">
                Discover why leading businesses trust EngineX Solutions for {service.title.toLowerCase()}.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {service.benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card-subtle p-7 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Process Section */}
          <section className="mb-24">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <span className="section-label">Our Workflow</span>
              <h2 className="section-title">Our Proven Delivery Process</h2>
              <p className="section-desc mt-3 mx-auto">
                A structured, transparent engineering methodology from initial scoping to production launch.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="card-subtle p-6 relative group"
                >
                  <div className="text-3xl font-extrabold text-primary/20 mb-3 group-hover:text-primary transition-colors">
                    {step.step}
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Related Services (Internal Linking) */}
          {relatedServices.length > 0 && (
            <section className="mb-20 pt-12 border-t border-border">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div>
                  <span className="section-label">Complementary Capabilities</span>
                  <h2 className="text-2xl font-bold text-foreground mt-1">Related Services & Solutions</h2>
                </div>
                <Link
                  href="/services"
                  className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1"
                >
                  View All Services <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedServices.map((rel) => {
                  const RelIcon = iconMap[rel.icon] || Globe
                  return (
                    <Link
                      key={rel.slug}
                      href={`/services/${rel.slug}`}
                      className="card-subtle p-5 group hover:border-primary/40 transition-all block"
                    >
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                        <RelIcon className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {rel.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                        {rel.shortDescription}
                      </p>
                      <span className="text-xs font-medium text-primary inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                        Explore {rel.title} <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  )
                })}
              </div>
            </section>
          )}

          {/* Bottom Conversion CTA */}
          <div className="text-center max-w-3xl mx-auto p-10 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Ready to Accelerate Your Business with {service.title}?
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-xl mx-auto">
              Discuss your project goals with our senior engineering team. We deliver measurable business outcomes with zero fluff.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg" className="gap-2 group">
                Request a Custom Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
