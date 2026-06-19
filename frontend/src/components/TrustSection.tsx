'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Shield, Users, HeadphonesIcon, Lightbulb, Clock } from 'lucide-react'
import SectionHeading from './SectionHeading'

const trustPoints = [
  { icon: TrendingUp, title: 'Results-Driven Approach', description: 'Every strategy and solution is engineered to deliver tangible, measurable outcomes — traffic, rankings, leads, and revenue.' },
  { icon: Shield, title: 'Full Transparency', description: 'No hidden charges, no jargon. We keep you informed at every stage with clear reporting and open communication.' },
  { icon: Users, title: 'Dedicated Team', description: 'You get a committed team that understands your vision, not just a project manager. We work as an extension of your business.' },
  { icon: HeadphonesIcon, title: 'Reliable Support', description: 'Post-launch support is built into every engagement. We are always available when you need us.' },
  { icon: Lightbulb, title: 'Innovation First', description: 'We leverage the latest technology — AI, automation, modern stacks — to give your business a competitive edge.' },
  { icon: Clock, title: 'On-Time Delivery', description: 'We respect your timelines. Our structured workflows ensure every milestone is delivered on schedule, every time.' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function TrustSection() {
  return (
    <section className="section-padding bg-[#F8F9FB]">
      <div className="container-custom">
        <SectionHeading
          label="Why Trust Us"
          title="Why Brands Trust EngineX.solution"
          description="We don't just build products — we build long-term partnerships grounded in results, transparency, and reliability."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {trustPoints.map((point, i) => (
            <motion.div
              key={point.title}
              {...fadeUp(i * 0.08)}
              className="card-subtle p-8 group hover:border-[#FF8C38]/20 hover:shadow-lg hover:shadow-[#FF8C38]/05 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FF8C38]/08 flex items-center justify-center mb-5 group-hover:bg-[#FF8C38]/12 transition-all duration-500">
                <point.icon className="w-5 h-5 text-[#FF8C38]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3">{point.title}</h3>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">{point.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp(0.4)} className="text-center mt-16 p-10 rounded-2xl bg-white border border-[#FF8C38]/10 max-w-4xl mx-auto">
          <p className="text-base md:text-lg text-[#1A1A1A] leading-relaxed">
            <span className="font-bold text-[#FF8C38]">Ready to work with a team that delivers?</span> Contact us today for a free consultation and discover how we can help your business grow.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
