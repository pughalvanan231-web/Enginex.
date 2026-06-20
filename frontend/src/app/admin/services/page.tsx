'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Save, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import api from '@/lib/api'

export default function AdminServicesPage() {
  const router = useRouter()
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ title: '', description: '', icon: '', features: '', order: 0, published: true })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/admin/login'); return }
    api.get('/services/all')
      .then(res => setServices(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [router])

  const handleEdit = (service: any) => {
    setEditId(service.id)
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon || '',
      features: service.features?.join(', ') || '',
      order: service.order,
      published: service.published,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editId) return
    setSaving(true)
    try {
      await api.put(`/services/${editId}`, {
        ...formData,
        features: formData.features.split(',').map((f: string) => f.trim()).filter(Boolean),
      })
      const res = await api.get('/services/all')
      setServices(res.data)
      setEditId(null)
    } catch {} finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Services</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your service offerings</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {loading ? (
            <div className="space-y-4">{[1, 2, 3].map(i => <div key={i} className="card-subtle p-6 animate-pulse"><div className="h-6 bg-muted rounded w-1/3" /></div>)}</div>
          ) : (
            services.map((service) => (
              <div key={service.id} className="card-subtle p-6 cursor-pointer hover:border-border transition-all" onClick={() => handleEdit(service)}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                    {service.icon?.[0] || 'S'}
                  </div>
                  <div className="flex-1">
                    <div className="text-foreground font-medium">{service.title}</div>
                    <div className="text-sm text-muted-foreground mt-1 line-clamp-2">{service.description}</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {service.features?.slice(0, 3).map((f: string) => (
                        <span key={f} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">{f}</span>
                      ))}
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${service.published ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
                    {service.published ? 'Active' : 'Hidden'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {editId && (
          <form onSubmit={handleSubmit} className="card-subtle p-6 space-y-4 h-fit sticky top-24">
            <h3 className="text-lg font-semibold text-foreground">Edit Service</h3>
            <div><label className="block text-sm text-muted-foreground mb-2">Title</label><Input value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} /></div>
            <div><label className="block text-sm text-muted-foreground mb-2">Icon Name</label><Input value={formData.icon} onChange={e => setFormData(p => ({ ...p, icon: e.target.value }))} placeholder="Globe, Smartphone, Brain..." /></div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Description</label>
              <Textarea value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} />
            </div>
            <div><label className="block text-sm text-muted-foreground mb-2">Features (comma separated)</label><Input value={formData.features} onChange={e => setFormData(p => ({ ...p, features: e.target.value }))} /></div>
            <div><label className="block text-sm text-muted-foreground mb-2">Order</label><Input type="number" value={String(formData.order)} onChange={e => setFormData(p => ({ ...p, order: parseInt(e.target.value) || 0 }))} /></div>
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={formData.published} onChange={e => setFormData(p => ({ ...p, published: e.target.checked }))} className="w-4 h-4 accent-primary" />
              <span className="text-sm text-muted-foreground">Published</span>
            </label>
            <div className="flex gap-3">
              <Button type="submit" variant="primary" className="gap-2" disabled={saving}>
                <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save'}
              </Button>
              <Button type="button" variant="secondary" onClick={() => setEditId(null)}>Cancel</Button>
            </div>
          </form>
        )}
      </div>
    </>
  )
}
