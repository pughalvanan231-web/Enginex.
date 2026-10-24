'use client'

import { motion } from 'framer-motion'
import { Shield, Eye, Target, Heart, ArrowRight, Code2, Cpu, LineChart, MapPin } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'

const values = [
  {
    icon: Code2,
    title: 'Technical Rigor',
    description:
      'We build on proven, modern foundations like Next.js, TypeScript, and robust cloud APIs. No fragile shortcuts, no bloated plugins.',
  },
  {
    icon: Eye,
    title: 'Commercial Transparency',
    description:
      'Direct, jargon-free communication with full client ownership of source code, ad accounts, and analytics data from day one.',
  },
  {
    icon: Target,
    title: 'Results First',
    description:
      'Every technology platform and marketing campaign is engineered around measurable outcomes—qualified leads, search rankings, and system speed.',
  },
  {
    icon: Shield,
    title: 'Data Privacy & Security',
    description:
      'We implement strict enterprise data boundaries. Proprietary business documents and customer information are never shared or used to train public AI models.',
  },
]

const operationalPillars = [
  {
    icon: Cpu,
    title: 'Full-Stack Software & AI',
    description:
      'Architecting resilient web applications, mobile apps, and custom workflow automations that eliminate operational friction.',
  },
  {
    icon: LineChart,
    title: 'Performance Digital Marketing',
    description:
      'Targeting high-intent buyers through white-hat technical SEO, precision Google Ads, and full-funnel Meta advertising.',
  },
  {
    icon: MapPin,
    title: 'Pan-India Delivery',
    description:
      'Headquartered in Sulur, Coimbatore, providing responsive engineering and digital growth services to clients across India.',
  },
]

export default function AboutClient() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <SectionHeading
            as="h1"
            label="About Us"
            title="Engineering High-Performance Digital Solutions"
            description="EngineX Solutions is an independent technology, software development, AI automation, and digital marketing agency based in Sulur, Coimbatore, Tamil Nadu."
          />

          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              We founded EngineX Solutions to bridge the gap between complex software engineering and practical business growth. Rather than peddling vanity metrics or one-size-fits-all website templates, we partner with Indian businesses to engineer custom digital platforms, automated workflows, and measurable customer acquisition engines.
            </p>
          </div>

          {/* Operational Pillars */}
          <div className="grid md:grid-cols-3 gap-6 mb-24">
            {operationalPillars.map((pillar, i) => {
              const Icon = pillar.icon
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card-subtle p-7 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 text-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Core Values */}
          <div className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="section-label">Our Philosophy</span>
              <h2 className="section-title">Core Operating Principles</h2>
              <p className="section-desc mt-3 mx-auto">
                How we approach engineering, client relationships, and commercial accountability.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, i) => {
                const Icon = value.icon
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -15 : 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="card-subtle p-8 flex gap-5 hover:border-primary/30 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">
                        {value.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Leadership & E-E-A-T */}
          <div className="mb-24 card-subtle p-8 sm:p-12 border border-primary/20 bg-gradient-to-br from-primary/05 via-transparent to-transparent max-w-4xl mx-auto">
            <span className="section-label">Leadership</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Hands-On Technical Leadership
            </h2>
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-primary text-white font-bold text-2xl flex items-center justify-center shrink-0 shadow-md">
                P
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Pughalvanan
                </h3>
                <div className="text-xs font-semibold text-primary mb-3">
                  Founder & Principal Systems Engineer
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  With deep hands-on expertise spanning full-stack TypeScript architecture, Next.js, cloud systems, and search algorithms, Pughalvanan leads technical strategy and delivery at EngineX Solutions. Every client project receives senior architectural oversight from scoping through production deployment.
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-medium text-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" /> Sulur, Coimbatore, Tamil Nadu
                  </span>
                  <a
                    href="mailto:pughalvanan231@gmail.com"
                    className="text-primary hover:underline"
                  >
                    pughalvanan231@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Looking for a Reliable Digital Partner?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-8">
              Let&apos;s evaluate your current technical stack, organic visibility, and customer acquisition channels.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg" className="gap-2 group shadow-lg shadow-primary/20">
                Schedule a Consultation{' '}
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
