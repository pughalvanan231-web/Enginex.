'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Briefcase, Clock, DollarSign, ArrowRight, Upload } from 'lucide-react'
import Link from 'next/link'
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

export default function CareersPage() {
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
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <SectionHeading
            label="Careers"
            title="Join Our Team"
            description="We are always looking for talented individuals who are passionate about technology and innovation."
          />

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-6">Open Positions</h3>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="card-subtle p-6 animate-pulse">
                      <div className="h-5 bg-muted rounded w-2/3 mb-3" />
                      <div className="h-3 bg-muted rounded w-1/3" />
                    </div>
                  ))}
                </div>
              ) : jobs.length === 0 ? (
                <div className="card-subtle p-8 text-center">
                  <p className="text-muted-foreground mb-2">No open positions right now.</p>
                  <p className="text-sm text-muted-foreground">Check back later or send us your resume.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className={`card-subtle p-6 cursor-pointer transition-all ${
                        selectedJob?.id === job.id ? 'border-primary/30' : ''
                      }`}
                      onClick={() => { setSelectedJob(job); setApplying(false); setAppSubmitted(false) }}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-lg font-semibold text-foreground mb-2">{job.title}</h4>
                          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                            <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.type.replace('_', ' ')}</span>
                            {job.department && <Badge variant="secondary">{job.department}</Badge>}
                          </div>
                        </div>
                        <ArrowRight className={`w-5 h-5 transition-colors ${selectedJob?.id === job.id ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div>
              {!selectedJob ? (
                <div className="card-subtle p-8 text-center">
                  <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Select a Position</h3>
                  <p className="text-sm text-muted-foreground">Click on a job listing to view details and apply.</p>
                </div>
              ) : appSubmitted ? (
                <div className="card-subtle p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                    <ArrowRight className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Application Submitted!</h3>
                  <p className="text-muted-foreground mb-6">We will review your application and get back to you soon.</p>
                  <Button variant="primary" onClick={() => { setSelectedJob(null); setAppSubmitted(false) }}>Browse More Jobs</Button>
                </div>
              ) : applying ? (
                <form onSubmit={submitApplication} className="card-subtle p-8 space-y-4">
                  <h3 className="text-xl font-bold text-foreground mb-4">Apply for {selectedJob.title}</h3>
                  <Input placeholder="Full Name" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} required />
                  <Input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} required />
                  <Input placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))} />
                  <Input placeholder="Resume URL (Google Drive, Dropbox, etc.)" value={formData.resumeUrl} onChange={(e) => setFormData(p => ({ ...p, resumeUrl: e.target.value }))} />
                  <Textarea placeholder="Cover Letter / Why you?" value={formData.coverLetter} onChange={(e) => setFormData(p => ({ ...p, coverLetter: e.target.value }))} />
                  <div className="flex gap-3">
                    <Button type="submit" variant="primary" className="flex-1">Submit Application</Button>
                    <Button type="button" variant="secondary" onClick={() => setApplying(false)}>Cancel</Button>
                  </div>
                </form>
              ) : (
                <div className="card-subtle p-8">
                  <h3 className="text-xl font-bold text-foreground mb-2">{selectedJob.title}</h3>
                  <div className="flex flex-wrap gap-3 mb-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{selectedJob.location}</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{selectedJob.type.replace('_', ' ')}</span>
                    {selectedJob.salaryMin && (
                      <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />${selectedJob.salaryMin.toLocaleString()} - ${selectedJob.salaryMax?.toLocaleString()}</span>
                    )}
                  </div>
                  <div className="text-muted-foreground text-sm leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: selectedJob.description }} />
                  {selectedJob.requirements && (
                    <div className="mb-6">
                      <h4 className="text-foreground font-medium mb-2">Requirements</h4>
                      <div className="text-muted-foreground text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedJob.requirements }} />
                    </div>
                  )}
                  <Button variant="primary" size="lg" className="w-full gap-2 group" onClick={() => setApplying(true)}>
                    Apply Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
