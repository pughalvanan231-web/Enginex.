'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, ExternalLink, Layers, ArrowRight } from 'lucide-react'
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
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container-custom">
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
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
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
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search case studies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 text-sm"
              />
            </div>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-20 card-subtle p-12 max-w-lg mx-auto">
              <p className="text-muted-foreground text-base">No case studies matched your criteria.</p>
              <button
                onClick={() => {
                  setActiveCategory('all')
                  setSearch('')
                }}
                className="mt-4 text-xs font-medium text-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
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
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] text-primary font-bold uppercase tracking-wider">
                              {project.category}
                            </span>
                            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                            {project.title}
                          </h2>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-2.5 leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                          <div className="flex flex-wrap gap-1.5">
                            {project.technologies?.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="text-[11px] px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <span className="text-xs font-semibold text-primary inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                            View Case Study <ArrowRight className="w-3 h-3" />
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
