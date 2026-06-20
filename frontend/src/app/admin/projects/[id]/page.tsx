'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import api from '@/lib/api'

export default function AdminProjectFormPage() {
  const router = useRouter()
  const params = useParams()
  const isNew = params.id === 'new'
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '', description: '', content: '', category: '',
    technologies: '', clientName: '', completionDate: '',
    projectUrl: '', featured: false, images: '',
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/admin/login'); return }
    if (!isNew) {
      api.get(`/projects/all`)
        .then(res => {
          const project = res.data.find((p: any) => p.id === params.id)
          if (project) {
            setFormData({
              title: project.title,
              description: project.description,
              content: project.content || '',
              category: project.category,
              technologies: project.technologies?.join(', ') || '',
              clientName: project.clientName,
              completionDate: project.completionDate?.split('T')[0] || '',
              projectUrl: project.projectUrl || '',
              featured: project.featured,
              images: project.images?.map((i: any) => i.url).join('\n') || '',
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
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
        images: formData.images.split('\n').map(l => l.trim()).filter(Boolean),
      }
      if (isNew) {
        await api.post('/projects', data)
      } else {
        await api.put(`/projects/${params.id}`, data)
      }
      router.push('/admin/projects')
    } catch {} finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-[#FF8C38] border-t-transparent rounded-full animate-spin" /></div>
  }

  return (
    <>
      <Link href="/admin/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Projects
      </Link>
      <h1 className="text-2xl font-bold text-foreground mb-8">{isNew ? 'New Project' : 'Edit Project'}</h1>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-sm text-muted-foreground mb-2">Title *</label><Input value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} required /></div>
          <div><label className="block text-sm text-muted-foreground mb-2">Category *</label><Input value={formData.category} onChange={e => setFormData(p => ({ ...p, category: e.target.value }))} required /></div>
          <div><label className="block text-sm text-muted-foreground mb-2">Client Name *</label><Input value={formData.clientName} onChange={e => setFormData(p => ({ ...p, clientName: e.target.value }))} required /></div>
          <div><label className="block text-sm text-muted-foreground mb-2">Completion Date</label><Input type="date" value={formData.completionDate} onChange={e => setFormData(p => ({ ...p, completionDate: e.target.value }))} /></div>
          <div><label className="block text-sm text-muted-foreground mb-2">Project URL</label><Input value={formData.projectUrl} onChange={e => setFormData(p => ({ ...p, projectUrl: e.target.value }))} /></div>
          <div><label className="block text-sm text-muted-foreground mb-2">Technologies (comma separated)</label><Input value={formData.technologies} onChange={e => setFormData(p => ({ ...p, technologies: e.target.value }))} /></div>
        </div>
        <div><label className="block text-sm text-muted-foreground mb-2">Description *</label><Textarea value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} required /></div>
        <div><label className="block text-sm text-muted-foreground mb-2">Content (HTML)</label><Textarea value={formData.content} onChange={e => setFormData(p => ({ ...p, content: e.target.value }))} className="min-h-[200px]" /></div>
        <div><label className="block text-sm text-muted-foreground mb-2">Image URLs (one per line)</label><Textarea value={formData.images} onChange={e => setFormData(p => ({ ...p, images: e.target.value }))} /></div>
        <label className="flex items-center gap-3">
          <input type="checkbox" checked={formData.featured} onChange={e => setFormData(p => ({ ...p, featured: e.target.checked }))} className="w-4 h-4 accent-primary" />
          <span className="text-sm text-muted-foreground">Featured Project</span>
        </label>
        <Button type="submit" variant="primary" size="lg" className="gap-2" disabled={saving}>
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Project'}
        </Button>
      </form>
    </>
  )
}
