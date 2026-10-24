'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Briefcase, ArrowRight, CheckCircle2 } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import api from '@/lib/api'

interface Job {
  id: string
  title: string
  slug: string
  location: string
  type: string
  department: string | null
  description: string
  requirements: string | null
  salaryMin: number | null
  salaryMax: number | null
}

export default function CareersClient() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [applying, setApplying] = useState(false)
  const [appSubmitted, setAppSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', resumeUrl: '', coverLetter: '' })

  useEffect(() => {
    api.get('/jobs')
      .then(res => setJobs(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const submitApplication = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedJob) return
    try {
      await api.post('/applications', { ...formData, jobId: selectedJob.id })
      setAppSubmitted(true)
    } catch {}
  }

  return (
    <main className="min-h-screen bg-[#060608] text-white">
      <Header />
      <div className="pt-36 pb-24 relative overflow-hidden">
        {/* Background Ambience */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

        <div className="container-custom relative z-10">
          <SectionHeading
            as="h1"
            label="Careers"
            title="Join Our High-Performance Team"
            description="We are always looking for passionate engineers, digital architects, and technical problem solvers to build next-generation software products."
          />

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Open Positions</h2>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="card-elevated p-6 animate-pulse border border-white/10">
                      <div className="h-5 bg-white/10 rounded w-2/3 mb-3" />
                      <div className="h-3 bg-white/10 rounded w-1/3" />
                    </div>
                  ))}
                </div>
              ) : jobs.length === 0 ? (
                <div className="card-elevated p-8 text-center border border-white/10">
                  <p className="text-neutral-300 font-medium mb-2">No open positions right now.</p>
                  <p className="text-sm text-neutral-400">
                    We welcome spontaneous applications. Send your GitHub/portfolio to{' '}
                    <a href="mailto:pughalvanan231@gmail.com" className="text-white underline">
                      pughalvanan231@gmail.com
                    </a>.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className={`card-elevated p-6 cursor-pointer transition-all border ${
                        selectedJob?.id === job.id
                          ? 'border-white bg-white/[0.08] shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                      onClick={() => { setSelectedJob(job); setApplying(false); setAppSubmitted(false) }}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2">{job.title}</h3>
                          <div className="flex flex-wrap gap-3 text-xs text-neutral-400">
                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-white" />{job.location}</span>
                            <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-white" />{job.type.replace('_', ' ')}</span>
                            {job.department && <Badge variant="secondary">{job.department}</Badge>}
                          </div>
                        </div>
                        <ArrowRight className={`w-5 h-5 transition-colors ${selectedJob?.id === job.id ? 'text-white' : 'text-neutral-500'}`} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div>
              {!selectedJob ? (
                <div className="card-elevated p-10 text-center border border-white/10">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mx-auto mb-4 text-white">
                    <Briefcase className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Select a Position</h3>
                  <p className="text-sm text-neutral-400">Click on any role listing to review responsibilities, stack, and apply directly.</p>
                </div>
              ) : appSubmitted ? (
                <div className="card-elevated p-10 text-center border border-white/15">
                  <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-5 text-white shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Application Submitted!</h3>
                  <p className="text-neutral-400 text-sm mb-6">Our founders review every application personally and will get back to you shortly.</p>
                  <Button variant="primary" onClick={() => { setSelectedJob(null); setAppSubmitted(false) }}>Browse More Roles</Button>
                </div>
              ) : applying ? (
                <form onSubmit={submitApplication} className="card-elevated p-8 space-y-4 border border-white/15">
                  <h3 className="text-xl font-bold text-white mb-4">Apply for {selectedJob.title}</h3>
                  <Input placeholder="Full Name" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} required />
                  <Input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} required />
                  <Input placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))} />
                  <Input placeholder="Resume URL (Google Drive, LinkedIn, Portfolio)" value={formData.resumeUrl} onChange={(e) => setFormData(p => ({ ...p, resumeUrl: e.target.value }))} />
                  <Textarea placeholder="Brief note / Why you'd thrive at EngineX?" value={formData.coverLetter} onChange={(e) => setFormData(p => ({ ...p, coverLetter: e.target.value }))} />
                  <div className="flex gap-3 pt-2">
                    <Button type="submit" variant="primary" className="flex-1">Submit Application</Button>
                    <Button type="button" variant="secondary" onClick={() => setApplying(false)}>Cancel</Button>
                  </div>
                </form>
              ) : (
                <div className="card-elevated p-8 border border-white/15">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedJob.title}</h3>
                  <div className="flex flex-wrap gap-3 mb-6 text-xs text-neutral-400">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-white" />{selectedJob.location}</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-white" />{selectedJob.type.replace('_', ' ')}</span>
                  </div>
                  <div className="text-neutral-300 text-sm leading-relaxed mb-6 space-y-2" dangerouslySetInnerHTML={{ __html: selectedJob.description }} />
                  {selectedJob.requirements && (
                    <div className="mb-6 pt-4 border-t border-white/10">
                      <h4 className="text-white font-bold text-sm mb-2">Requirements</h4>
                      <div className="text-neutral-300 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedJob.requirements }} />
                    </div>
                  )}
                  <Button variant="primary" size="lg" className="w-full gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.2)]" onClick={() => setApplying(true)}>
                    Apply for this Role <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
