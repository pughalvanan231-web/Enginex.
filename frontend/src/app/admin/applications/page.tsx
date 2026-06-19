'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '../layout'
import api from '@/lib/api'

export default function AdminApplicationsPage() {
  const router = useRouter()
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/admin/login'); return }
    fetchApps()
  }, [router, filter])

  const fetchApps = () => {
    const params = new URLSearchParams()
    if (filter !== 'all') params.set('status', filter)
    api.get(`/applications?${params}`)
      .then(res => setApplications(res.data.applications))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.put(`/applications/${id}`, { status })
      fetchApps()
    } catch {}
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Applications</h1>
        <p className="text-muted-foreground text-sm mt-1">Review job applications</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'PENDING', 'REVIEWED', 'SHORTLISTED', 'INTERVIEWED', 'OFFERED', 'REJECTED'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${filter === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>
            {s === 'all' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">{[1, 2, 3].map(i => <div key={i} className="card-subtle p-6 animate-pulse"><div className="h-6 bg-muted rounded w-1/3" /></div>)}</div>
      ) : (
        <div className="card-subtle overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm text-muted-foreground font-medium">Name</th>
                <th className="text-left p-4 text-sm text-muted-foreground font-medium">Email</th>
                <th className="text-left p-4 text-sm text-muted-foreground font-medium">Position</th>
                <th className="text-left p-4 text-sm text-muted-foreground font-medium">Status</th>
                <th className="text-left p-4 text-sm text-muted-foreground font-medium">Date</th>
                <th className="text-right p-4 text-sm text-muted-foreground font-medium">Resume</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app.id} className="border-b border-border hover:bg-muted transition-colors">
                  <td className="p-4"><div className="text-sm text-foreground font-medium">{app.name}</div></td>
                  <td className="p-4 text-sm text-muted-foreground">{app.email}</td>
                  <td className="p-4 text-sm text-muted-foreground">{app.job?.title || 'N/A'}</td>
                  <td className="p-4">
                    <select value={app.status} onChange={(e) => updateStatus(app.id, e.target.value)}
                      className="text-xs bg-transparent border border-input rounded-full px-2 py-1 text-muted-foreground cursor-pointer">
                      <option value="PENDING">Pending</option>
                      <option value="REVIEWED">Reviewed</option>
                      <option value="SHORTLISTED">Shortlisted</option>
                      <option value="INTERVIEWED">Interviewed</option>
                      <option value="OFFERED">Offered</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{new Date(app.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    {app.resumeUrl ? (
                      <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:text-primary/80">View</a>
                    ) : <span className="text-sm text-muted-foreground">N/A</span>}
                  </td>
                </tr>
              ))}
              {applications.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No applications yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  )
}
