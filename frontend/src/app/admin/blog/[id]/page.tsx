'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import api from '@/lib/api'

export default function AdminBlogFormPage() {
  const router = useRouter()
  const params = useParams()
  const isNew = params.id === 'new'
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '', content: '', excerpt: '', category: '',
    tags: '', coverImage: '', published: false,
    seoTitle: '', seoDesc: '',
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/admin/login'); return }
    if (!isNew) {
      api.get(`/blog/all`)
        .then(res => {
          const post = res.data.find((p: any) => p.id === params.id)
          if (post) {
            setFormData({
              title: post.title, content: post.content, excerpt: post.excerpt || '',
              category: post.category, tags: post.tags?.join(', ') || '',
              coverImage: post.coverImage || '', published: post.published,
              seoTitle: post.seoTitle || '', seoDesc: post.seoDesc || '',
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
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      }
      if (isNew) {
        await api.post('/blog', data)
      } else {
        await api.put(`/blog/${params.id}`, data)
      }
      router.push('/admin/blog')
    } catch {} finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-[#FF8C38] border-t-transparent rounded-full animate-spin" /></div>
  }

  return (
    <>
      <Link href="/admin/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>
      <h1 className="text-2xl font-bold text-foreground mb-8">{isNew ? 'New Blog Post' : 'Edit Blog Post'}</h1>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2"><label className="block text-sm text-muted-foreground mb-2">Title *</label><Input value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} required /></div>
          <div><label className="block text-sm text-muted-foreground mb-2">Category *</label><Input value={formData.category} onChange={e => setFormData(p => ({ ...p, category: e.target.value }))} required /></div>
          <div><label className="block text-sm text-muted-foreground mb-2">Tags (comma separated)</label><Input value={formData.tags} onChange={e => setFormData(p => ({ ...p, tags: e.target.value }))} /></div>
          <div><label className="block text-sm text-muted-foreground mb-2">Cover Image URL</label><Input value={formData.coverImage} onChange={e => setFormData(p => ({ ...p, coverImage: e.target.value }))} /></div>
          <div><label className="block text-sm text-muted-foreground mb-2">SEO Title</label><Input value={formData.seoTitle} onChange={e => setFormData(p => ({ ...p, seoTitle: e.target.value }))} /></div>
          <div className="sm:col-span-2"><label className="block text-sm text-muted-foreground mb-2">SEO Description</label><Input value={formData.seoDesc} onChange={e => setFormData(p => ({ ...p, seoDesc: e.target.value }))} /></div>
        </div>
        <div><label className="block text-sm text-muted-foreground mb-2">Excerpt</label><Textarea value={formData.excerpt} onChange={e => setFormData(p => ({ ...p, excerpt: e.target.value }))} /></div>
        <div><label className="block text-sm text-muted-foreground mb-2">Content (HTML) *</label><Textarea value={formData.content} onChange={e => setFormData(p => ({ ...p, content: e.target.value }))} className="min-h-[300px]" required /></div>
        <label className="flex items-center gap-3">
          <input type="checkbox" checked={formData.published} onChange={e => setFormData(p => ({ ...p, published: e.target.checked }))} className="w-4 h-4 accent-primary" />
          <span className="text-sm text-muted-foreground">Published</span>
        </label>
        <Button type="submit" variant="primary" size="lg" className="gap-2" disabled={saving}>
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Post'}
        </Button>
      </form>
    </>
  )
}
