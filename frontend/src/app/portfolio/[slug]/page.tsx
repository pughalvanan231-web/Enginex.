'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Calendar, User } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import api from '@/lib/api'

interface Project {
  id: string
  title: string
  slug: string
  description: string
  content: string | null
  category: string
  technologies: string[]
  clientName: string
  completionDate: string
  projectUrl: string | null
  images: { url: string }[]
  author: { name: string }
}

export default function ProjectDetailPage() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!params.slug) return
    api.get(`/projects/${params.slug}`)
      .then(res => setProject(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [params.slug])

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 container-custom">
          <div className="animate-pulse space-y-6 max-w-4xl mx-auto">
            <div className="h-8 bg-muted rounded w-1/3" />
            <div className="h-12 bg-muted rounded w-2/3" />
            <div className="aspect-video bg-muted rounded-xl" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-3/4" />
          </div>
        </div>
      </main>
    )
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-4xl font-bold text-foreground">Project Not Found</h1>
          <Link href="/portfolio"><Button variant="primary" className="mt-6">Back to Portfolio</Button></Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container-custom max-w-5xl">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>{project.category}</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">{project.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-10">
              <span className="flex items-center gap-2"><User className="w-4 h-4" />{project.clientName}</span>
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{new Date(project.completionDate).toLocaleDateString()}</span>
              {project.projectUrl && (
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:text-primary/80">
                  <ExternalLink className="w-4 h-4" /> Live Project
                </a>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-subtle p-2 mb-10">
            {project.images?.[0] ? (
              <img src={project.images[0].url} alt={project.title} className="w-full aspect-video object-cover rounded-lg" />
            ) : (
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-transparent rounded-lg flex items-center justify-center">
                <span className="text-8xl text-primary/10 font-bold">{project.title[0]}</span>
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-4">About This Project</h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>{project.description}</p>
                {project.content && <div dangerouslySetInnerHTML={{ __html: project.content }} />}
              </div>
            </div>
            <div>
              <div className="card-subtle p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </div>
                <Link href="/contact">
                  <Button variant="primary" className="w-full">Start a Similar Project</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
