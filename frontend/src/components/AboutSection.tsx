'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Eye, Target, Heart } from 'lucide-react'
import SectionHeading from './SectionHeading'

const values = [
  { icon: Shield, title: 'Innovation', description: 'We push boundaries with cutting-edge technology and creative problem-solving.' },
  { icon: Eye, title: 'Transparency', description: 'Open communication and honest collaboration throughout every project.' },
  { icon: Target, title: 'Excellence', description: 'We deliver nothing less than exceptional quality in every solution.' },
  { icon: Heart, title: 'People-First', description: 'Our clients and team are at the heart of everything we build.' },
]

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  useEffect(() => {
    if (!isInView || !ref.current) return
    let start = 0
    const end = value
    const duration = 2000
    const step = Math.ceil(end / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= end) { start = end; clearInterval(timer) }
      if (ref.current) ref.current.textContent = String(start)
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, value])
  return <span ref={ref}>0</span>
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function AboutSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeading
          label="About Us"
          title="End-to-end solutions. One focus: Results."
          description="From high-performance technology platforms to solutions that actually convert — everything we do is engineered for measurable impact."
        />

        <div className="grid md:grid-cols-4 gap-5 mb-16">
          {values.map((value, i) => (
            <motion.div key={value.title} {...fadeUp(i * 0.08)} className="card-subtle p-7 text-center group">
              <div className="w-12 h-12 rounded-xl bg-[#FF8C38]/08 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF8C38]/12 transition-all duration-500">
                <value.icon className="w-5 h-5 text-[#FF8C38]" />
              </div>
              <h3 className="text-base font-semibold text-[#1A1A1A] mb-2">{value.title}</h3>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>


        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {[
            { value: 28, suffix: '+', label: 'PROJECTS DELIVERED' },
            { value: 4, suffix: '+', label: 'EXPERT PROFESSIONALS' },
            { value: 20, suffix: '+', label: 'COUNTRIES SERVED' },
            { value: 2, suffix: '+', label: 'CLIENTS SERVED' },
          ].map((stat, i) => (
            <motion.div key={stat.label} {...fadeUp(i * 0.08)} className="text-center p-6 rounded-xl bg-white border border-[#F0F0F0] hover:border-[#FF8C38]/20 hover:shadow-lg hover:shadow-[#FF8C38]/05 transition-all duration-500">
              <div className="text-4xl md:text-5xl font-bold text-[#FF8C38] mb-1">
                <Counter value={stat.value} />{stat.suffix}
              </div>
              <div className="text-[11px] font-semibold text-[#1A1A1A] tracking-[0.08em] uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp(0.3)} className="text-center max-w-3xl mx-auto p-8 md:p-10 rounded-2xl bg-[#FF8C38]/05 border border-[#FF8C38]/10">
          <p className="text-base md:text-lg text-[#1A1A1A] leading-relaxed font-medium">
            <span className="font-bold text-[#FF8C38]">Our Promise:</span> We measure success only by the tangible business results we create for you — leads, revenue, rankings, and efficiency gains.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
