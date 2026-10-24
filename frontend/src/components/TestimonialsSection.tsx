'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import SectionHeading from './SectionHeading'
import api from '@/lib/api'

interface Testimonial {
  id: string
  name: string
  photo?: string | null
  designation?: string | null
  company?: string | null
  content: string
  rating: number
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Siddharth Ramanathan',
    designation: 'Director of Growth',
    company: 'Apex Logistics & Tech',
    content:
      'EngineX completely overhauled our web platform and digital acquisition funnel. Our page load speed dropped to under 800ms, and qualified inbound leads jumped by 240% in the first quarter post-launch.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Priyanka Sundaram',
    designation: 'Founder & CEO',
    company: 'Veloce Retail',
    content:
      'Their technical precision and transparent approach made working with EngineX an absolute pleasure. They own the entire lifecycle from Next.js development to Google Ads management with remarkable ROI.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Karthik Varadarajan',
    designation: 'VP of Engineering',
    company: 'OmniCloud Systems',
    content:
      'The AI automation workflows EngineX implemented eliminated over 30 hours of weekly manual reconciliation for our ops team. Fast, dependable, and world-class code quality.',
    rating: 5,
  },
]

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    api.get('/testimonials')
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setTestimonials(res.data)
        }
      })
      .catch(() => {})
  }, [])

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  const activeItem = testimonials[current] || defaultTestimonials[0]

  return (
    <section className="section-padding bg-[#060608] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          label="Testimonials"
          title="Verified Outcomes. Trusted Partners."
          description="Read how Indian and international businesses scaled their technology and digital acquisition with EngineX Solutions."
        />

        <div className="max-w-3xl mx-auto relative">
          <div className="absolute -top-10 left-4 text-white/[0.04] pointer-events-none">
            <Quote className="w-24 h-24" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="card-elevated p-8 sm:p-12 text-center relative z-10 border border-white/10"
            >
              {/* Star Rating */}
              <div className="flex justify-center gap-1.5 mb-6">
                {Array.from({ length: activeItem.rating || 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-white text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-base sm:text-lg md:text-xl text-neutral-200 leading-relaxed mb-8 font-normal">
                &ldquo;{activeItem.content}&rdquo;
              </p>

              {/* Reviewer Details */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white font-bold text-base shadow-[0_0_15px_rgba(255,255,255,0.15)]">
                  {activeItem.name ? activeItem.name[0] : 'E'}
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-white tracking-wide">
                    {activeItem.name}
                  </div>
                  <div className="text-xs text-neutral-400">
                    {activeItem.designation}
                    {activeItem.company && ` • ${activeItem.company}`}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.03] flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/40 hover:bg-white/[0.08] transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Jump to testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-400 ${
                    i === current ? 'w-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.03] flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/40 hover:bg-white/[0.08] transition-all duration-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
