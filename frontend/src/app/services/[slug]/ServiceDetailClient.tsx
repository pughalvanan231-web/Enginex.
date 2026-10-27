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
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  FileCheck,
  Sparkles,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { ServiceItem } from '@/lib/services-data'
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

interface ServiceDetailClientProps {
  service: ServiceItem
  relatedServices: ServiceItem[]
}

export default function ServiceDetailClient({ service, relatedServices }: ServiceDetailClientProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const Icon = iconMap[service.icon] || Globe

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground flex-wrap">
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
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
                <Icon className="w-4 h-4 text-primary" />
                <span>{service.serviceType}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-tight tracking-tight">
                {service.title}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                {service.detail}
              </p>

              {/* Target Audience Notice */}
              <div className="p-4 rounded-xl bg-muted/40 border border-border mb-8 text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Ideal For: </span>
                {service.targetAudience}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="gap-2 group shadow-lg shadow-primary/15"
                  onClick={() => setModalOpen(true)}
                >
                  Schedule Consultation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Link href="/contact">
                  <Button variant="secondary" size="lg" className="gap-2">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex-1 card-subtle p-4 sm:p-6 lg:p-7 w-full max-w-2xl">
              <div className="aspect-square rounded-2xl relative overflow-hidden border border-border/80 group shadow-2xl bg-neutral-900">
                <Image
                  src={service.image || `/images/services/${service.slug}.jpg`}
                  alt={service.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Dark gradient overlay for contrast and sleek finish */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/30 pointer-events-none" />

                {/* Top Badge: Service Category & Type */}
                <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-lg">
                  <Icon className="w-3.5 h-3.5 text-white" />
                  <span>{service.serviceType}</span>
                </div>

                {/* Top Right: Verified Indicator */}
                <div className="absolute top-4 right-4 z-10 hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium shadow-lg">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>EngineX Delivery</span>
                </div>

                {/* Bottom Overlaid Card: Engineering Excellence & Trust Guarantee */}
                <div className="absolute bottom-4 inset-x-4 z-10 p-4 sm:p-5 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-white shadow-2xl">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] uppercase tracking-widest text-neutral-300 font-bold">
                      Engineering Excellence
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/15">
                      Production Ready
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-white mb-3 leading-snug">
                    Built for speed, commercial accountability, and compounding business growth.
                  </p>

                  <div className="pt-2.5 border-t border-white/10 flex items-center gap-2.5 text-xs text-neutral-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="line-clamp-1">White-hat, transparent execution. 100% client code and account ownership.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Deliverables & Scope */}
          <section className="mb-20">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <span className="section-label">Deliverables</span>
              <h2 className="section-title">What We Deliver</h2>
              <p className="section-desc mt-3 mx-auto">
                Concrete, transparent project milestones and tangible outcomes included with our {service.title.toLowerCase()}.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.deliverables.map((deliv, idx) => (
                <div
                  key={idx}
                  className="card-subtle p-5 flex items-start gap-3 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <FileCheck className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-primary block mb-0.5">
                      Deliverable 0{idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-foreground font-medium leading-snug">
                      {deliv}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Core Technical Capabilities & Features */}
          <section className="mb-20">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <span className="section-label">Capabilities</span>
              <h2 className="section-title">Technical Specifications & Scope</h2>
              <p className="section-desc mt-3 mx-auto">
                The technical pillars, architectures, and toolchains powering our execution.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="card-subtle p-5 flex items-center gap-3.5 hover:border-primary/30 transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Strategic Advantages / Benefits */}
          <section className="mb-20">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <span className="section-label">Why Choose EngineX</span>
              <h2 className="section-title">Strategic Commercial Advantages</h2>
              <p className="section-desc mt-3 mx-auto">
                How our {service.title.toLowerCase()} provides an enduring competitive edge for Indian businesses.
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
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Delivery Process Workflow */}
          <section className="mb-20">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <span className="section-label">Workflow</span>
              <h2 className="section-title">Our Structured Delivery Methodology</h2>
              <p className="section-desc mt-3 mx-auto">
                A disciplined engineering and campaign lifecycle from discovery to ongoing refinement.
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
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Realistic Expected Outcomes (No Fake Guarantees) */}
          <section className="mb-20">
            <div className="card-subtle p-8 lg:p-10 border border-primary/20 bg-gradient-to-br from-primary/05 via-transparent to-transparent">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">
                  Realistic Business Outcomes (What You Can Expect)
                </h2>
              </div>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                We believe in ethical, transparent communication. We do not invent statistics or guarantee overnight viral fame. Instead, here is what our disciplined methodologies consistently achieve:
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {service.realisticOutcomes.map((outcome, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/80 border border-border">
                    <span className="text-xs font-bold text-primary block mb-1">
                      Outcome 0{idx + 1}
                    </span>
                    <p className="text-xs text-foreground font-medium leading-relaxed">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Frequently Asked Questions (FAQ Section + Schema) */}
          {service.faqs && service.faqs.length > 0 && (
            <section className="mb-20">
              <div className="max-w-2xl mx-auto text-center mb-12">
                <span className="section-label">Questions & Answers</span>
                <h2 className="section-title">Frequently Asked Questions</h2>
                <p className="section-desc mt-3 mx-auto">
                  Transparent answers regarding timelines, pricing structures, and technical methodologies.
                </p>
              </div>
              <div className="max-w-3xl mx-auto space-y-4">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="card-subtle p-6 hover:border-primary/30 transition-all">
                    <h3 className="text-base font-semibold text-foreground mb-2 flex items-start gap-2.5">
                      <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-sm text-muted-foreground pl-7 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Internal Linking: Related Services */}
          {relatedServices.length > 0 && (
            <section className="mb-20 pt-12 border-t border-border">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div>
                  <span className="section-label">Interconnected Capabilities</span>
                  <h2 className="text-2xl font-bold text-foreground mt-1">
                    Related Services & Complementary Solutions
                  </h2>
                </div>
                <Link
                  href="/services"
                  className="text-xs sm:text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1"
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
                      className="card-subtle p-4 group hover:border-primary/40 transition-all block overflow-hidden rounded-2xl"
                    >
                      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-3 bg-neutral-900 border border-border/50">
                        <Image
                          src={rel.image || `/images/services/${rel.slug}.jpg`}
                          alt={rel.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-2 left-2 z-10 w-7 h-7 rounded-md bg-black/70 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
                          <RelIcon className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {rel.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                        {rel.shortDescription}
                      </p>
                      <span className="text-xs font-medium text-primary inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                        Learn More <ArrowRight className="w-3 h-3" />
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
              Ready to Discuss Your {service.title} Project?
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-xl mx-auto">
              Schedule a direct consultation with our technical team. We evaluate your business requirements and formulate an objective proposal.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                className="gap-2 group shadow-lg shadow-primary/20"
                onClick={() => setModalOpen(true)}
              >
                Request a Custom Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Direct Contact Information
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Consultation Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={service.title}
      />

      <Footer />
    </main>
  )
}
