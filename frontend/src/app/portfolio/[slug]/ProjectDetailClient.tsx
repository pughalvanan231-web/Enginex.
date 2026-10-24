'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Calendar, User, CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import api from '@/lib/api'
import { PortfolioProject } from '@/lib/portfolio-data'

interface ProjectDetailClientProps {
  slug: string
  initialProject?: PortfolioProject
}

export default function ProjectDetailClient({ slug, initialProject }: ProjectDetailClientProps) {
  const [project, setProject] = useState<any>(initialProject || null)
  const [loading, setLoading] = useState(!initialProject)

  useEffect(() => {
    if (!slug) return
    api.get(`/projects/${slug}`)
      .then((res) => {
        if (res.data) setProject(res.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  if (loading && !project) {
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
        <div className="pt-32 pb-20 text-center container-custom">
          <h1 className="text-4xl font-bold text-foreground">Case Study Not Found</h1>
          <p className="text-muted-foreground mt-2">The case study you requested could not be located.</p>
          <Link href="/portfolio">
            <Button variant="primary" className="mt-6">
              Back to Portfolio
            </Button>
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Case Studies
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <Badge>{project.category}</Badge>
              {project.completionDate && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {project.completionDate}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-4">
              {project.title}
            </h1>

            {project.clientName && (
              <p className="text-sm font-semibold text-primary mb-6">
                Client Profile: {project.clientName}
              </p>
            )}

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-border">
              {project.technologies?.map((tech: string) => (
                <Badge key={tech} variant="secondary" className="px-3 py-1 text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Structured Case Study Sections */}
          <div className="space-y-8 mb-14">
            {project.challenge && (
              <div className="card-subtle p-7">
                <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-2">
                  The Problem &amp; Business Context
                </span>
                <h2 className="text-xl font-bold text-foreground mb-3">Project Challenge</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.challenge}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="card-subtle p-7 border-primary/20 bg-gradient-to-br from-primary/05 to-transparent">
                <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-2">
                  Our Engineering Approach
                </span>
                <h2 className="text-xl font-bold text-foreground mb-3">Technical Solution</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.solution}
                </p>
              </div>
            )}

            {project.outcome && (
              <div className="card-subtle p-7">
                <span className="text-xs font-bold uppercase tracking-wider text-green-600 block mb-2">
                  Measurable Business Impact
                </span>
                <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" /> Key Outcomes &amp; Results
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.outcome}
                </p>
              </div>
            )}
          </div>

          {/* Bottom Conversion CTA */}
          <div className="card-subtle p-8 text-center border-primary/20">
            <h3 className="text-xl font-bold text-foreground mb-2">
              Have a Similar Project Requirement?
            </h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
              Discuss your architecture and growth goals with our engineering team. We deliver custom solutions tailored to your operational needs.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg" className="gap-2 group">
                Schedule a Consultation{' '}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
