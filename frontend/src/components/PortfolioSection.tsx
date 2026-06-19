'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import SectionHeading from './SectionHeading'
import api from '@/lib/api'

interface Project {
  id: string
  title: string
  slug: string
  description: string
  category: string
  technologies: string[]
  images: { url: string }[]
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/projects?limit=4&featured=true')
      .then(res => setProjects(res.data.projects))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeading
          label="Portfolio"
          title="Our Work"
          description="Explore our latest projects showcasing cutting-edge technology and innovative solutions."
        />

        {loading ? (
          <div className="grid md:grid-cols-2 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-subtle p-6 animate-pulse">
                <div className="aspect-video bg-[#F5F5F5] rounded-lg mb-4" />
                <div className="h-4 bg-[#F5F5F5] rounded w-1/3 mb-2" />
                <div className="h-6 bg-[#F5F5F5] rounded w-2/3 mb-3" />
                <div className="h-3 bg-[#F5F5F5] rounded w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {projects.map((project, i) => (
              <motion.div key={project.id} {...fadeUp(i * 0.1)}>
                <Link href={`/portfolio/${project.slug}`} className="group block">
                  <div className="card-elevated overflow-hidden">
                    <div className="aspect-video bg-[#FAFAFA] flex items-center justify-center overflow-hidden">
                      {project.images?.[0] ? (
                        <img src={project.images[0].url} alt={project.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-all duration-700 ease-out" />
                      ) : (
                        <span className="text-5xl text-[#FF8C38]/10 font-bold">{project.title[0]}</span>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="text-[11px] text-[#FF8C38] font-semibold uppercase tracking-[0.1em]">{project.category}</span>
                      <h3 className="text-lg font-semibold text-[#1A1A1A] mt-1 group-hover:text-[#FF8C38] transition-colors duration-500">{project.title}</h3>
                      <p className="text-sm text-[#6B6B6B] mt-2 line-clamp-2">{project.description}</p>
                      {project.technologies && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {project.technologies.slice(0, 3).map((tech: string) => (
                            <span key={tech} className="text-[11px] px-2.5 py-1 rounded-full bg-[#F5F5F5] text-[#6B6B6B]">{tech}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div {...fadeUp(0.2)} className="text-center mt-12">
          <Link href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF8C38] text-white text-sm font-medium transition-all duration-500 ease-out hover:bg-[#E67A2E] hover:shadow-lg hover:shadow-[#FF8C38]/20 group">
            View All Projects <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
