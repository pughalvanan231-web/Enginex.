'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, ExternalLink, Layers, ArrowRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'
import { Input } from '@/components/ui/input'
import api from '@/lib/api'
import { staticProjects } from '@/lib/portfolio-data'

interface Project {
  id: string
  title: string
  slug: string
  description: string
  category: string
  technologies: string[]
  clientName?: string
  completionDate?: string
  projectUrl?: string | null
}

const defaultProjects: Project[] = staticProjects.map((p) => ({
  id: p.id,
  title: p.title,
  slug: p.slug,
  description: p.description,
  category: p.category,
  technologies: p.technologies,
  clientName: p.clientName,
  completionDate: p.completionDate,
  projectUrl: p.projectUrl,
}))

export default function PortfolioClient() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects)
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([
    { name: 'Web Development', count: 1 },
    { name: 'Digital Marketing', count: 1 },
    { name: 'AI Automation', count: 1 },
    { name: 'Mobile App Development', count: 1 },
  ])
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.get('/projects/categories')
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setCategories(res.data)
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (activeCategory === 'all' && !search) {
      setProjects(defaultProjects)
      return
    }

    const filtered = defaultProjects.filter((p) => {
      const matchCat =
        activeCategory === 'all' || p.category.toLowerCase() === activeCategory.toLowerCase()
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })

    setProjects(filtered)
  }, [activeCategory, search])

  return (
    <main className="min-h-screen bg-[#060608] text-white">
      <Header />
      <div className="pt-36 pb-24 relative overflow-hidden">
        {/* Background Ambience */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

        <div className="container-custom relative z-10">
          <SectionHeading
            as="h1"
            label="Portfolio & Case Studies"
            title="Engineered Solutions & Client Case Studies"
            description="Explore our portfolio of high-performance websites, custom software, practical AI automations, and digital marketing systems delivered across India."
          />

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  activeCategory === 'all'
                    ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)] font-semibold'
                    : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/10'
                }`}
              >
                All Projects ({defaultProjects.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    activeCategory === cat.name
                      ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)] font-semibold'
                      : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/10'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Search case studies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 text-sm"
              />
            </div>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-20 card-elevated p-12 max-w-lg mx-auto border border-white/10">
              <p className="text-neutral-400 text-base">No case studies matched your criteria.</p>
              <button
                onClick={() => {
                  setActiveCategory('all')
                  setSearch('')
                }}
                className="mt-4 text-xs font-medium text-white hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  whileHover={{ y: -6 }}
                >
                  <Link href={`/portfolio/${project.slug}`} className="group block h-full">
                    <div className="card-elevated overflow-hidden h-full flex flex-col justify-between border border-white/10 hover:border-white/30 transition-all duration-300">
                      <div className="aspect-[16/9] bg-gradient-to-br from-white/[0.05] via-white/[0.01] to-black flex flex-col items-center justify-center p-6 text-center border-b border-white/[0.08] relative">
                        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
                        <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/15 flex items-center justify-center mb-3 text-white group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-300 relative z-10">
                          <Layers className="w-7 h-7" />
                        </div>
                        <span className="text-[11px] font-bold text-white tracking-widest uppercase relative z-10">
                          Case Study
                        </span>
                        <span className="text-xs text-neutral-400 mt-0.5 font-medium relative z-10">
                          {project.category}
                        </span>
                      </div>

                      <div className="p-8 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider">
                              {project.category}
                            </span>
                            <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                          </div>
                          <h2 className="text-xl font-bold text-white group-hover:text-white transition-colors leading-snug">
                            {project.title}
                          </h2>
                          <p className="text-sm text-neutral-400 mt-2.5 leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-2">
                          <div className="flex flex-wrap gap-1.5">
                            {project.technologies?.slice(0, 3).map((tech: string) => (
                              <span
                                key={tech}
                                className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/[0.04] text-neutral-300 font-medium border border-white/[0.08]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <span className="text-xs font-semibold text-white inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                            View Study <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
