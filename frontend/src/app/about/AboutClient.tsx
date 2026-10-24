'use client'

import { motion } from 'framer-motion'
import { Shield, Eye, Target, Heart, ArrowRight, Code2, Cpu, LineChart, MapPin, Sparkles } from 'lucide-react'
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
    <main className="min-h-screen bg-[#060608] text-white">
      <Header />
      <div className="pt-36 pb-24 relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

        <div className="container-custom relative z-10">
          <SectionHeading
            as="h1"
            label="About Us"
            title="Engineering High-Performance Digital Solutions"
            description="EngineX Solutions is an independent technology, software development, AI automation, and digital marketing agency based in Sulur, Coimbatore, Tamil Nadu."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
              We founded EngineX Solutions to bridge the gap between complex software engineering and practical business growth. Rather than peddling vanity metrics or one-size-fits-all website templates, we partner with businesses to engineer custom digital platforms, automated workflows, and measurable customer acquisition engines.
            </p>
          </motion.div>

          {/* Operational Pillars with Card Hover Physics */}
          <div className="grid md:grid-cols-3 gap-6 mb-24">
            {operationalPillars.map((pillar, i) => {
              const Icon = pillar.icon
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="card-elevated p-8 border border-white/10 hover:border-white/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-6 text-white group-hover:bg-white group-hover:text-black group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2.5">{pillar.title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Core Values */}
          <div className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-16">
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.6 }}
                    whileHover={{ y: -4 }}
                    className="card-elevated p-8 flex gap-5 border border-white/10 hover:border-white/30 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {value.title}
                      </h3>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Leadership & E-E-A-T */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-24 card-elevated p-8 sm:p-12 border border-white/15 bg-white/[0.02] max-w-4xl mx-auto relative overflow-hidden backdrop-blur-xl"
          >
            <span className="section-label">Leadership</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Hands-On Technical Leadership
            </h2>
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white text-black font-extrabold text-2xl flex items-center justify-center shrink-0 shadow-[0_0_25px_rgba(255,255,255,0.3)]">
                P
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Pughalvanan
                </h3>
                <div className="text-xs font-semibold text-neutral-400 mb-3 tracking-wide uppercase">
                  Founder &amp; Principal Systems Engineer
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                  With deep hands-on expertise spanning full-stack TypeScript architecture, Next.js, cloud systems, and search algorithms, Pughalvanan leads technical strategy and delivery at EngineX Solutions. Every client project receives senior architectural oversight from scoping through production deployment.
                </p>
                <div className="flex flex-wrap gap-6 text-xs font-medium text-neutral-400">
                  <span className="flex items-center gap-1.5 text-white">
                    <MapPin className="w-3.5 h-3.5 text-white" /> Sulur, Coimbatore, Tamil Nadu
                  </span>
                  <a
                    href="mailto:pughalvanan231@gmail.com"
                    className="text-white hover:underline"
                  >
                    pughalvanan231@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Looking for a Reliable Digital Partner?
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mb-8 leading-relaxed">
              Let&apos;s evaluate your current technical stack, organic visibility, and customer acquisition channels.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg" className="gap-2 group shadow-[0_0_25px_rgba(255,255,255,0.25)]">
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
