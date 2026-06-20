'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import api from '@/lib/api'

export default function AdminTestimonialsPage() {
  const router = useRouter()
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', designation: '', company: '', content: '', rating: 5 })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/admin/login'); return }
    api.get('/testimonials/all')
      .then(res => setTestimonials(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/testimonials', formData)
      setShowForm(false)
      setFormData({ name: '', designation: '', company: '', content: '', rating: 5 })
      const res = await api.get('/testimonials/all')
      setTestimonials(res.data)
    } catch {}
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    try {
      await api.delete(`/testimonials/${id}`)
      setTestimonials(prev => prev.filter(t => t.id !== id))
    } catch {}
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Testimonials</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage client testimonials</p>
        </div>
        <Button variant="primary" className="gap-2" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4" /> {showForm ? 'Cancel' : 'Add Testimonial'}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card-subtle p-6 mb-6 max-w-2xl space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input placeholder="Client Name" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} required />
            <Input placeholder="Designation" value={formData.designation} onChange={e => setFormData(p => ({ ...p, designation: e.target.value }))} />
            <Input placeholder="Company" value={formData.company} onChange={e => setFormData(p => ({ ...p, company: e.target.value }))} />
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Rating (1-5)</label>
              <Input type="number" min={1} max={5} value={formData.rating} onChange={e => setFormData(p => ({ ...p, rating: parseInt(e.target.value) }))} />
            </div>
          </div>
          <Textarea placeholder="Testimonial content" value={formData.content} onChange={e => setFormData(p => ({ ...p, content: e.target.value }))} required />
          <Button type="submit" variant="primary">Save Testimonial</Button>
        </form>
      )}

      {loading ? (
        <div className="space-y-4">{[1, 2, 3].map(i => <div key={i} className="card-subtle p-6 animate-pulse"><div className="h-6 bg-muted rounded w-1/3" /></div>)}</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {testimonials.map(t => (
            <div key={t.id} className="card-subtle p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">{t.name[0]}</div>
                  <div>
                    <div className="text-sm text-foreground font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.designation}{t.company ? ` · ${t.company}` : ''}</div>
                  </div>
                </div>
                <button onClick={() => handleDelete(t.id)} className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
              </div>
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
              </div>
              <p className="text-sm text-muted-foreground">{t.content}</p>
            </div>
          ))}
          {testimonials.length === 0 && <div className="col-span-2 text-center py-12 text-muted-foreground">No testimonials yet.</div>}
        </div>
      )}
    </>
  )
}
