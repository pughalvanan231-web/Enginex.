'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Layers } from 'lucide-react'
import Link from 'next/link'
import SectionHeading from './SectionHeading'
import api from '@/lib/api'
import { staticProjects } from '@/lib/portfolio-data'

interface Project {
  id: string
  title: string
  slug: string
  description: string
  category: string
  technologies: string[]
}

const defaultProjects: Project[] = staticProjects.map((p) => ({
  id: p.id,
  title: p.title,
  slug: p.slug,
  description: p.description,
  category: p.category,
  technologies: p.technologies,
}))

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects)

  useEffect(() => {
    api.get('/projects?limit=4&featured=true')
      .then((res) => {
        if (Array.isArray(res.data?.projects) && res.data.projects.length > 0) {
          setProjects(res.data.projects)
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeading
          label="Proven Work"
          title="Featured Case Studies & Projects"
          description="Explore real engineering, software development, and digital marketing implementations built for measurable business growth."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div key={project.id} {...fadeUp(i * 0.1)}>
              <Link href={`/portfolio/${project.slug}`} className="group block h-full">
                <div className="card-elevated overflow-hidden h-full flex flex-col justify-between border border-border/80 hover:border-primary/40 transition-all duration-300">
                  <div className="aspect-[16/9] bg-gradient-to-br from-primary/10 via-primary/05 to-transparent flex flex-col items-center justify-center p-6 text-center border-b border-border/60">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-3 text-primary">
                      <Layers className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-primary tracking-widest uppercase">
                      Case Study
                    </span>
                    <span className="text-xs text-muted-foreground mt-0.5 font-medium">
                      {project.category}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] text-[#FF8C38] font-bold uppercase tracking-[0.1em]">
                        {project.category}
                      </span>
                      <h3 className="text-lg font-bold text-[#1A1A1A] mt-1 group-hover:text-[#FF8C38] transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6B6B6B] mt-2.5 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies?.slice(0, 3).map((tech: string) => (
                          <span
                            key={tech}
                            className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#F5F5F5] text-[#555] font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-[#FF8C38] inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                        View Study <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp(0.2)} className="text-center mt-12">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FF8C38] text-white text-sm font-medium transition-all duration-500 ease-out hover:bg-[#E67A2E] hover:shadow-lg hover:shadow-[#FF8C38]/20 group"
          >
            Explore All Case Studies{' '}
            <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
