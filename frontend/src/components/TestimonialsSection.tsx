'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import SectionHeading from './SectionHeading'
import api from '@/lib/api'

interface Testimonial {
  id: string
  name: string
  photo: string | null
  designation: string | null
  company: string | null
  content: string
  rating: number
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/testimonials')
      .then(res => setTestimonials(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading || testimonials.length === 0) return null

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeading
          label="Testimonials"
          title="Real Results. Real Clients."
          description="What our clients say about working with EngineX."
        />

        <div className="max-w-3xl mx-auto relative">
          <div className="absolute -top-6 left-0 text-[#FF8C38]/06">
            <Quote className="w-20 h-20" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="card-elevated p-8 md:p-12 text-center relative z-10"
            >
              <div className="flex justify-center gap-1 mb-5">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FF8C38] text-[#FF8C38]" />
                ))}
              </div>

              <p className="text-base md:text-lg text-[#6B6B6B] leading-relaxed mb-8 italic">
                &ldquo;{testimonials[current].content}&rdquo;
              </p>

              <div className="flex items-center justify-center gap-4">
                <div className="w-11 h-11 rounded-full bg-[#FF8C38]/10 flex items-center justify-center text-[#FF8C38] font-bold text-sm">
                  {testimonials[current].name[0]}
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-[#1A1A1A]">{testimonials[current].name}</div>
                  <div className="text-xs text-[#B0B0B0]">
                    {testimonials[current].designation}
                    {testimonials[current].company && ` · ${testimonials[current].company}`}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-3 mt-8">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-[#E0E0E0] flex items-center justify-center text-[#B0B0B0] hover:text-[#FF8C38] hover:border-[#FF8C38]/30 transition-all duration-400">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-500 ease-out ${i === current ? 'w-6 bg-[#FF8C38]' : 'w-2 bg-[#E0E0E0]'}`} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-[#E0E0E0] flex items-center justify-center text-[#B0B0B0] hover:text-[#FF8C38] hover:border-[#FF8C38]/30 transition-all duration-400">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
