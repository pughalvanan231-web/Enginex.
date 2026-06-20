'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import api from '@/lib/api'

export default function AdminProjectsPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/admin/login'); return }
    api.get('/projects/all')
      .then(res => setProjects(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [router])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return
    try {
      await api.delete(`/projects/${id}`)
      setProjects(prev => prev.filter(p => p.id !== id))
    } catch {}
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your portfolio projects</p>
        </div>
        <Link href="/admin/projects/new">
          <Button variant="primary" className="gap-2"><Plus className="w-4 h-4" /> New Project</Button>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="card-subtle p-6 animate-pulse"><div className="h-6 bg-muted rounded w-1/3" /></div>)}
        </div>
      ) : (
        <div className="card-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm text-muted-foreground font-medium">Title</th>
                  <th className="text-left p-4 text-sm text-muted-foreground font-medium">Category</th>
                  <th className="text-left p-4 text-sm text-muted-foreground font-medium">Client</th>
                  <th className="text-left p-4 text-sm text-muted-foreground font-medium">Featured</th>
                  <th className="text-right p-4 text-sm text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(project => (
                  <tr key={project.id} className="border-b border-border hover:bg-muted transition-colors">
                    <td className="p-4">
                      <div className="text-sm text-foreground font-medium">{project.title}</div>
                      <div className="text-xs text-muted-foreground">{project.slug}</div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{project.category}</td>
                    <td className="p-4 text-sm text-muted-foreground">{project.clientName}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${project.featured ? 'bg-green-50 text-green-600' : 'bg-muted text-muted-foreground'}`}>
                        {project.featured ? 'Featured' : 'No'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/portfolio/${project.slug}`} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link href={`/admin/projects/${project.id}`} className="p-2 text-primary hover:text-primary/80 transition-colors">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(project.id)} className="p-2 text-red-400 hover:text-red-300 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {projects.length === 0 && (
                  <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No projects yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}
