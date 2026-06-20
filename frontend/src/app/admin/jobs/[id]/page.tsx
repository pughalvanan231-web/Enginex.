'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import api from '@/lib/api'

export default function AdminJobFormPage() {
  const router = useRouter()
  const params = useParams()
  const isNew = params.id === 'new'
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '', location: '', type: 'FULL_TIME', department: '',
    description: '', requirements: '', salaryMin: '', salaryMax: '', active: true,
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/admin/login'); return }
    if (!isNew) {
      api.get('/jobs/all')
        .then(res => {
          const job = res.data.find((j: any) => j.id === params.id)
          if (job) {
            setFormData({
              title: job.title, location: job.location, type: job.type,
              department: job.department || '', description: job.description,
              requirements: job.requirements || '', salaryMin: job.salaryMin?.toString() || '',
              salaryMax: job.salaryMax?.toString() || '', active: job.active,
            })
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false))
    }
  }, [isNew, params.id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const data = {
        ...formData,
        salaryMin: formData.salaryMin ? parseFloat(formData.salaryMin) : null,
        salaryMax: formData.salaryMax ? parseFloat(formData.salaryMax) : null,
      }
      if (isNew) {
        await api.post('/jobs', data)
      } else {
        await api.put(`/jobs/${params.id}`, data)
      }
      router.push('/admin/jobs')
    } catch {} finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-[#FF8C38] border-t-transparent rounded-full animate-spin" /></div>
  }

  return (
    <>
      <Link href="/admin/jobs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Jobs
      </Link>
      <h1 className="text-2xl font-bold text-foreground mb-8">{isNew ? 'New Job' : 'Edit Job'}</h1>
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-sm text-muted-foreground mb-2">Title *</label><Input value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} required /></div>
          <div><label className="block text-sm text-muted-foreground mb-2">Location *</label><Input value={formData.location} onChange={e => setFormData(p => ({ ...p, location: e.target.value }))} required /></div>
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Type</label>
            <select value={formData.type} onChange={e => setFormData(p => ({ ...p, type: e.target.value }))} className="w-full h-12 rounded-lg border border-input bg-background px-4 text-sm text-foreground">
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="CONTRACT">Contract</option>
              <option value="FREELANCE">Freelance</option>
              <option value="INTERNSHIP">Internship</option>
            </select>
          </div>
          <div><label className="block text-sm text-muted-foreground mb-2">Department</label><Input value={formData.department} onChange={e => setFormData(p => ({ ...p, department: e.target.value }))} /></div>
          <div><label className="block text-sm text-muted-foreground mb-2">Salary Min</label><Input type="number" value={formData.salaryMin} onChange={e => setFormData(p => ({ ...p, salaryMin: e.target.value }))} /></div>
          <div><label className="block text-sm text-muted-foreground mb-2">Salary Max</label><Input type="number" value={formData.salaryMax} onChange={e => setFormData(p => ({ ...p, salaryMax: e.target.value }))} /></div>
        </div>
        <div><label className="block text-sm text-muted-foreground mb-2">Description *</label><Textarea value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} className="min-h-[150px]" required /></div>
        <div><label className="block text-sm text-muted-foreground mb-2">Requirements</label><Textarea value={formData.requirements} onChange={e => setFormData(p => ({ ...p, requirements: e.target.value }))} className="min-h-[150px]" /></div>
        <label className="flex items-center gap-3">
          <input type="checkbox" checked={formData.active} onChange={e => setFormData(p => ({ ...p, active: e.target.checked }))} className="w-4 h-4 accent-primary" />
          <span className="text-sm text-muted-foreground">Active</span>
        </label>
        <Button type="submit" variant="primary" size="lg" className="gap-2" disabled={saving}>
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Job'}
        </Button>
      </form>
    </>
  )
}
