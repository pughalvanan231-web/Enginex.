'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles, CheckCircle2, Terminal, Shield, Zap, TrendingUp } from 'lucide-react'

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#060608] pt-28 pb-20">
      {/* Background Ambience & Tech Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -top-40 right-[-10%] w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-[-10%] w-[450px] h-[450px] bg-white/[0.02] rounded-full blur-[130px] pointer-events-none" />

      {/* Floating Ambient Dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hero-float absolute top-[20%] right-[15%] w-2.5 h-2.5 rounded-full bg-white/20 blur-[1px]" />
        <div className="hero-float-2 absolute top-[40%] left-[10%] w-2 h-2 rounded-full bg-white/15 blur-[1px]" />
        <div className="hero-float-3 absolute bottom-[25%] right-[22%] w-3 h-3 rounded-full bg-white/10 blur-[1px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container-custom relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center"
      >
        {/* Availability Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/15 text-neutral-300 text-xs font-medium backdrop-blur-md hover:border-white/30 transition-all duration-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="tracking-wider uppercase text-[11px] font-semibold text-white/90">
              ENGINEERED FOR SCALE
            </span>
            <span className="text-white/30">•</span>
            <span className="text-neutral-400 text-[11px]">Accepting Select Projects</span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-bold text-white tracking-tight leading-[1.06] mb-6 max-w-4xl"
        >
          We engineer{' '}
          <span className="text-gradient-silver underline decoration-white/20 decoration-1 underline-offset-8">
            measurable impact
          </span>{' '}
          for ambitious brands.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-neutral-400 leading-relaxed max-w-2xl mb-10"
        >
          EngineX Solutions builds ultra-fast web platforms, custom AI automations, and ROI-focused digital growth engines. Pure performance, zero vanity metrics.
        </motion.p>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center items-center gap-4 mb-16">
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-black font-semibold text-sm transition-all duration-300 hover:bg-neutral-200 hover:shadow-[0_0_35px_rgba(255,255,255,0.3)] active:scale-95"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/[0.04] border border-white/15 text-white font-medium text-sm transition-all duration-300 hover:bg-white/10 hover:border-white/35 backdrop-blur-md active:scale-95"
          >
            Explore Case Studies
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-3xl pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs text-neutral-400"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            <span className="text-white font-medium">Headquarters: Sulur, Coimbatore</span>
          </div>
          <span className="text-white/20 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-white" />
            <span>100% Client Code Ownership</span>
          </div>
          <span className="text-white/20 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-white" />
            <span>Sub-second Edge Deployment</span>
          </div>
        </motion.div>

        {/* Animated Key Metrics Grid */}
        <motion.div
          variants={itemVariants}
          className="w-full mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl"
        >
          {[
            { value: 'Next.js 15', label: 'EDGE ARCHITECTURE', sub: 'Sub-second SSR & Core Web Vitals' },
            { value: '100%', label: 'IP & CODE OWNERSHIP', sub: 'Client retains all repositories & assets' },
            { value: 'Pan-India', label: 'OPERATIONAL REACH', sub: 'Serving high-growth firms nationwide' },
            { value: 'White-Hat', label: 'GROWTH METHODOLOGY', sub: 'Algorithmic alignment & zero spam' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -4, backgroundColor: 'rgba(255, 255, 255, 0.04)' }}
              transition={{ duration: 0.3 }}
              className="p-5 rounded-xl border border-white/[0.05] bg-white/[0.01] text-left transition-all duration-300"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
                {stat.value}
              </div>
              <div className="text-[11px] font-bold text-neutral-300 tracking-wider uppercase mb-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-neutral-500 leading-snug">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
