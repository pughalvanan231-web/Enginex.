'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import api from '@/lib/api'

export default function AdminJobsPage() {
  const router = useRouter()
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/admin/login'); return }
    api.get('/jobs/all')
      .then(res => setJobs(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [router])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this job?')) return
    try {
      await api.delete(`/jobs/${id}`)
      setJobs(prev => prev.filter(j => j.id !== id))
    } catch {}
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Jobs</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage job listings</p>
        </div>
        <Link href="/admin/jobs/new">
          <Button variant="primary" className="gap-2"><Plus className="w-4 h-4" /> New Job</Button>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">{[1, 2, 3].map(i => <div key={i} className="card-subtle p-6 animate-pulse"><div className="h-6 bg-muted rounded w-1/3" /></div>)}</div>
      ) : (
        <div className="card-subtle overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm text-muted-foreground font-medium">Title</th>
                <th className="text-left p-4 text-sm text-muted-foreground font-medium">Location</th>
                <th className="text-left p-4 text-sm text-muted-foreground font-medium">Type</th>
                <th className="text-left p-4 text-sm text-muted-foreground font-medium">Applications</th>
                <th className="text-left p-4 text-sm text-muted-foreground font-medium">Active</th>
                <th className="text-right p-4 text-sm text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.id} className="border-b border-border hover:bg-muted transition-colors">
                  <td className="p-4"><div className="text-sm text-foreground font-medium">{job.title}</div></td>
                  <td className="p-4 text-sm text-muted-foreground">{job.location}</td>
                  <td className="p-4 text-sm text-muted-foreground">{job.type.replace('_', ' ')}</td>
                  <td className="p-4 text-sm text-muted-foreground">{job._count?.applications || 0}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${job.active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      {job.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/jobs/${job.id}`} className="p-2 text-primary hover:text-primary/80"><Edit className="w-4 h-4" /></Link>
                      <button onClick={() => handleDelete(job.id)} className="p-2 text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No jobs yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
