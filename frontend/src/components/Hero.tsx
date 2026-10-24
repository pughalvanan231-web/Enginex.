'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#FF8C38]/05 to-transparent blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-[#FF8C38]/03 to-transparent blur-[80px]" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hero-float absolute top-[15%] right-[12%] w-3 h-3 rounded-full bg-[#FF8C38]/10" />
        <div className="hero-float-2 absolute top-[35%] left-[8%] w-2 h-2 rounded-full bg-[#FF8C38]/08" />
        <div className="hero-float-3 absolute bottom-[30%] right-[20%] w-4 h-4 rounded-full bg-[#FF8C38]/06" />
        <div className="hero-float absolute top-[55%] left-[15%] w-1.5 h-1.5 rounded-full bg-[#FF8C38]/08" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container-custom relative z-10 pt-28 pb-20"
      >
        <div className="max-w-4xl">
          <motion.div variants={itemVariants} className="mb-5">
            <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FF8C38]/08 text-[#FF8C38] text-[11px] font-semibold tracking-[0.15em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C38]" />
              Results First
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-[clamp(2.5rem,6vw,4.75rem)] font-bold text-[#1A1A1A] leading-[1.05] tracking-[-0.03em] mb-5"
          >
            We deliver{' '}
            <span className="text-gradient">measurable results</span>
            <br />
            that transform businesses.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-[#6B6B6B] leading-relaxed max-w-xl mb-10"
          >
            EngineX is a premier IT & Digital solutions agency focused exclusively on outcomes. We combine world-class technology with performance-driven strategies to drive real business growth.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FF8C38] text-white text-sm font-medium transition-all duration-500 ease-out hover:bg-[#E67A2E] hover:shadow-lg hover:shadow-[#FF8C38]/20"
            >
              Start Your Results Journey
              <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
            </Link>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#E0E0E0] text-[#1A1A1A] text-sm font-medium transition-all duration-500 ease-out hover:border-[#FF8C38]/30 hover:text-[#FF8C38] hover:bg-[#FF8C38]/03"
            >
              View Our Work
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-14 flex flex-wrap items-center gap-6 pt-8 border-t border-[#F0F0F0] text-xs text-[#6B6B6B]"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-semibold text-[#1A1A1A]">Engineered in Coimbatore</span> (Serving India-Wide)
            </div>
            <span className="text-[#D0D0D0] hidden sm:inline">&bull;</span>
            <div>100% Client Code &amp; Ad Account Ownership</div>
            <span className="text-[#D0D0D0] hidden sm:inline">&bull;</span>
            <div>Strict Data Privacy &amp; Zero Public Model Training</div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 p-8 rounded-2xl bg-[#FAFAFA] border border-[#F0F0F0]"
        >
          {[
            { value: 'Next.js 15', label: 'EDGE ARCHITECTURE', sublabel: 'Sub-second SSR & Core Web Vitals' },
            { value: '100%', label: 'ACCOUNT OWNERSHIP', sublabel: 'Client owns all code, pixels & ad assets' },
            { value: 'India-Wide', label: 'SERVICE REACH', sublabel: 'Headquarters: Sulur, Coimbatore' },
            { value: 'White-Hat', label: 'SEARCH METHODOLOGY', sublabel: 'Strict Google Search Essentials alignment' },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="text-2xl md:text-3xl font-bold text-[#FF8C38] mb-1">{stat.value}</div>
              <div className="text-[11px] font-semibold text-[#1A1A1A] tracking-[0.08em] uppercase mb-0.5">{stat.label}</div>
              <div className="text-[11px] text-[#B0B0B0]">{stat.sublabel}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
