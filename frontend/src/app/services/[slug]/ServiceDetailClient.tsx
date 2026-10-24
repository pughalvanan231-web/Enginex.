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

            <div className="flex-1 card-subtle p-8 lg:p-10 w-full">
              <div className="aspect-square bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl flex flex-col items-center justify-center relative p-8 border border-primary/20">
                <Icon className="w-28 h-28 text-primary/30 mb-4" />
                <div className="text-center">
                  <span className="text-xs uppercase tracking-widest text-primary font-bold">
                    Engineering Excellence
                  </span>
                  <p className="text-sm font-semibold text-foreground mt-1 max-w-xs mx-auto">
                    Built for speed, commercial accountability, and compounding business growth.
                  </p>
                </div>

                <div className="mt-6 w-full p-3.5 rounded-xl bg-white/95 backdrop-blur-sm border border-border text-xs text-muted-foreground flex items-center gap-3 shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                  <span>White-hat, transparent execution. 100% client code and account ownership.</span>
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
