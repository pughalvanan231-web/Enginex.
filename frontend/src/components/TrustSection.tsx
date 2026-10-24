'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Shield, Users, HeadphonesIcon, Lightbulb, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import SectionHeading from './SectionHeading'

const trustPoints = [
  {
    icon: TrendingUp,
    title: 'Results-Driven Engineering',
    description: 'Every architecture and marketing strategy is designed to deliver verified, measurable outcomes—search volume, conversion rates, and revenue.',
  },
  {
    icon: Shield,
    title: '100% Asset Ownership',
    description: 'No vendor lock-in. You retain complete, unencumbered ownership of your source repositories, ad accounts, design files, and customer data.',
  },
  {
    icon: Users,
    title: 'Senior Dedicated Engineering',
    description: 'Direct collaboration with experienced engineers and growth architects who immerse themselves in your product roadmap and industry.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Continuous Post-Launch SLA',
    description: 'Production-grade maintenance, security audits, and rapid issue resolution are backed by strict uptime and support agreements.',
  },
  {
    icon: Lightbulb,
    title: 'Modern Edge & AI Technology',
    description: 'We build on Next.js 15, TypeScript, Tailwind, and private AI RAG systems to deliver a lasting technological advantage over competitors.',
  },
  {
    icon: Clock,
    title: 'Rigorous On-Time Delivery',
    description: 'Predictable sprint cadences, transparent milestones, and weekly demo deployments ensure on-time delivery with zero surprises.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function TrustSection() {
  return (
    <section className="section-padding bg-[#0A0A0D] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-white/[0.02] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-white/[0.02] rounded-full blur-[130px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          label="Why EngineX"
          title="Why Leading Brands Partner With Us"
          description="We engineer long-term competitive moats through technical rigor, complete commercial transparency, and reliable execution."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustPoints.map((point, i) => (
            <motion.div
              key={point.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="card-elevated p-8 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                    <point.icon className="w-5 h-5 text-white group-hover:text-black transition-colors duration-300" />
                  </div>
                  <span className="text-xs font-mono text-neutral-500 group-hover:text-neutral-300 transition-colors">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-white transition-colors">
                  {point.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {point.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Verified Standard
                </span>
                <span className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-white group-hover:shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* High-Impact Consultation Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-8 sm:p-12 rounded-2xl bg-white/[0.03] border border-white/15 max-w-4xl mx-auto backdrop-blur-xl relative overflow-hidden text-center flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="text-center sm:text-left max-w-xl">
            <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Ready to engineer your growth?
            </h4>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Schedule a complimentary 30-minute technical evaluation &amp; growth architecture session with our founders.
            </p>
          </div>

          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm transition-all duration-300 hover:bg-neutral-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] active:scale-95 group"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
