'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react'
import AdminLayout from '../layout'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import api from '@/lib/api'

export default function AdminBlogPage() {
  const router = useRouter()
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/admin/login'); return }
    api.get('/blog/all')
      .then(res => setBlogs(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [router])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return
    try {
      await api.delete(`/blog/${id}`)
      setBlogs(prev => prev.filter(b => b.id !== id))
    } catch {}
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Blog Posts</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your blog content</p>
        </div>
        <Link href="/admin/blog/new">
          <Button variant="primary" className="gap-2"><Plus className="w-4 h-4" /> New Post</Button>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="card-subtle p-6 animate-pulse"><div className="h-6 bg-muted rounded w-1/3" /></div>)}
        </div>
      ) : (
        <div className="card-subtle overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm text-muted-foreground font-medium">Title</th>
                <th className="text-left p-4 text-sm text-muted-foreground font-medium">Category</th>
                <th className="text-left p-4 text-sm text-muted-foreground font-medium">Status</th>
                <th className="text-left p-4 text-sm text-muted-foreground font-medium">Date</th>
                <th className="text-right p-4 text-sm text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(post => (
                <tr key={post.id} className="border-b border-border hover:bg-muted transition-colors">
                  <td className="p-4">
                    <div className="text-sm text-foreground font-medium">{post.title}</div>
                    <div className="text-xs text-muted-foreground">{post.slug}</div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{post.category}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${post.published ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{post.publishedAt ? formatDate(post.publishedAt) : '-'}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/blog/${post.slug}`} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <Link href={`/admin/blog/${post.id}`} className="p-2 text-primary hover:text-primary/80 transition-colors">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(post.id)} className="p-2 text-red-400 hover:text-red-300 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No posts yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  )
}
