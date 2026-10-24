'use client'

import { motion } from 'framer-motion'

interface SectionHeadingProps {
  label: string
  title: string
  description?: string
  center?: boolean
  as?: 'h1' | 'h2'
}

export default function SectionHeading({
  label,
  title,
  description,
  center = true,
  as = 'h2',
}: SectionHeadingProps) {
  const HeadingTag = as as any

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`max-w-3xl ${center ? 'mx-auto text-center' : ''} mb-16 md:mb-20`}
    >
      <div className={`${center ? 'justify-center' : 'justify-start'} flex mb-3`}>
        <span className="section-label">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          {label}
        </span>
      </div>

      <HeadingTag className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.12]">
        {title}
      </HeadingTag>

      {description && (
        <p className={`text-base sm:text-lg text-neutral-400 mt-4 leading-relaxed ${center ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
