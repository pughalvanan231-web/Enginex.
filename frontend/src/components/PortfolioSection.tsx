'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Layers, ArrowUpRight, Sparkles } from 'lucide-react'
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
    <section className="section-padding bg-[#0A0A0D] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/[0.015] rounded-full blur-[140px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          label="Featured Work"
          title="Engineered Case Studies & Solutions"
          description="Explore real engineering, software development, and digital marketing implementations built for measurable business growth."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              <Link href={`/portfolio/${project.slug}`} className="group block h-full">
                <div className="card-elevated h-full flex flex-col justify-between overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-400">
                  {/* Visual Header / Banner */}
                  <div className="aspect-[16/9] bg-gradient-to-br from-white/[0.05] via-white/[0.01] to-black flex flex-col items-center justify-center p-8 text-center border-b border-white/[0.08] relative overflow-hidden group-hover:bg-white/[0.03] transition-colors">
                    <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
                    
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/15 backdrop-blur-md flex items-center justify-center mb-3 text-white group-hover:scale-110 group-hover:bg-white group-hover:text-black group-hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all duration-300 relative z-10">
                      <Layers className="w-7 h-7" />
                    </div>
                    
                    <span className="text-[11px] font-bold text-white tracking-widest uppercase relative z-10">
                      {project.category}
                    </span>
                    <span className="text-xs text-neutral-400 mt-1 font-medium relative z-10">
                      Interactive Client Case Study
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] text-neutral-400 font-semibold uppercase tracking-wider">
                          CASE STUDY // 0{i + 1}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors leading-snug">
                        {project.title}
                      </h3>

                      <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-5 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies?.slice(0, 3).map((tech: string) => (
                          <span
                            key={tech}
                            className="text-[11px] px-3 py-1 rounded-full bg-white/[0.04] text-neutral-300 font-medium border border-white/[0.08]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <span className="text-xs font-semibold text-white inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                        View Study <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-16"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold text-sm transition-all duration-300 hover:bg-neutral-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] group active:scale-95"
          >
            <span>Explore All Case Studies</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
