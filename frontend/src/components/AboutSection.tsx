'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Eye, Target, Heart, Globe, Cpu, ArrowUpRight } from 'lucide-react'
import SectionHeading from './SectionHeading'

const values = [
  {
    icon: Cpu,
    title: 'Technical Precision',
    description: 'We architect resilient systems using modern edge stacks, typed safety, and microservices built to scale effortlessly.',
  },
  {
    icon: Eye,
    title: 'Radical Transparency',
    description: 'Direct communication, real-time reporting dashboards, and complete client ownership of repositories and ad platforms.',
  },
  {
    icon: Target,
    title: 'Outcome Engineering',
    description: 'We prioritize tangible commercial results—speed, search rank dominance, qualified conversions, and pipeline growth.',
  },
  {
    icon: Shield,
    title: 'Data Fortress',
    description: 'Enterprise data hygiene with strictly private AI boundaries. Your proprietary business knowledge is never exposed.',
  },
]

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!isInView || !ref.current) return
    let start = 0
    const end = value
    const duration = 1800
    const step = Math.ceil(end / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        start = end
        clearInterval(timer)
      }
      if (ref.current) ref.current.textContent = String(start)
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, value])

  return <span ref={ref}>0</span>
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function AboutSection() {
  return (
    <section className="section-padding bg-[#0A0A0D] relative overflow-hidden">
      {/* Subtle background ambient lights */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          label="Our Philosophy"
          title="Engineered for measurable commercial impact."
          description="From custom enterprise web platforms to conversion-focused digital marketing engines, every line of code and campaign is built for peak performance."
        />

        {/* 4 Pillars Grid with Card Hover Animations */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="card-elevated p-8 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300">
                  <value.icon className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-white transition-colors">
                  {value.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {value.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors">
                <span>0{i + 1}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Metrics / Stats Showcase */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { value: 28, suffix: '+', label: 'PROJECTS DELIVERED', sub: 'On-time enterprise deployments' },
            { value: 4, suffix: '+', label: 'SPECIALIZED DOMAINS', sub: 'Engineering, AI, Ads & SEO' },
            { type: 'message', text: 'GLOBAL CLIENT DELIVERY', sub: 'Serving companies worldwide from India' },
            { value: 99, suffix: '%', label: 'CLIENT RETENTION', sub: 'Long-term continuous partnerships' },
          ].map((stat, i) => (
            stat.type === 'message' ? (
              <motion.div
                key={stat.text}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="p-8 rounded-2xl bg-white/[0.03] border border-white/15 flex flex-col items-center justify-center text-center relative overflow-hidden group backdrop-blur-md"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-bold text-white tracking-wider uppercase mb-1">
                  {stat.text}
                </div>
                <div className="text-xs text-neutral-400">
                  {stat.sub}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={stat.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="p-8 rounded-2xl card-elevated text-left group"
              >
                <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2 flex items-baseline">
                  <Counter value={stat.value as number} />
                  <span className="text-neutral-400 ml-0.5">{stat.suffix}</span>
                </div>
                <div className="text-xs font-bold text-neutral-300 tracking-wider uppercase mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-neutral-500">
                  {stat.sub}
                </div>
              </motion.div>
            )
          ))}
        </div>

        {/* The EngineX Promise Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto p-8 sm:p-10 rounded-2xl bg-white/[0.03] border border-white/15 backdrop-blur-xl overflow-hidden text-center"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-normal">
            <span className="font-bold text-white tracking-wide">The EngineX Standard:</span>{' '}
            We measure our success strictly through the business impact we create for our partners—accelerated customer acquisition, higher revenue conversions, sub-second latency, and frictionless automation.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
