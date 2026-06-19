'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '../layout'
import api from '@/lib/api'

export default function AdminLeadsPage() {
  const router = useRouter()
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/admin/login'); return }
    fetchLeads()
  }, [router, filter])

  const fetchLeads = () => {
    const token = localStorage.getItem('token')
    const params = new URLSearchParams()
    if (filter !== 'all') params.set('status', filter)
    api.get(`/leads?${params}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setLeads(res.data.leads))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.put(`/leads/${id}`, { status })
      fetchLeads()
    } catch {}
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Leads</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage client inquiries and leads</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'NEW', 'CONTACTED', 'PROPOSAL_SENT', 'WON', 'LOST'].map(status => (
          <button key={status} onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${filter === status ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>
            {status === 'all' ? 'All' : status.replace('_', ' ')}
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
                <th className="text-left p-4 text-sm text-muted-foreground font-medium">Company</th>
                <th className="text-left p-4 text-sm text-muted-foreground font-medium">Status</th>
                <th className="text-left p-4 text-sm text-muted-foreground font-medium">Priority</th>
                <th className="text-left p-4 text-sm text-muted-foreground font-medium">Date</th>
                <th className="text-right p-4 text-sm text-muted-foreground font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id} className="border-b border-border hover:bg-muted transition-colors">
                  <td className="p-4"><div className="text-sm text-foreground font-medium">{lead.name}</div></td>
                  <td className="p-4 text-sm text-muted-foreground">{lead.email}</td>
                  <td className="p-4 text-sm text-muted-foreground">{lead.company || '-'}</td>
                  <td className="p-4">
                    <select value={lead.status} onChange={(e) => updateStatus(lead.id, e.target.value)}
                      className="text-xs bg-transparent border border-input rounded-full px-2 py-1 text-muted-foreground cursor-pointer">
                      <option value="NEW">New</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="PROPOSAL_SENT">Proposal Sent</option>
                      <option value="WON">Won</option>
                      <option value="LOST">Lost</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      lead.priority === 'HIGH' ? 'bg-red-50 text-red-600' :
                      lead.priority === 'URGENT' ? 'bg-primary/10 text-primary' :
                      'bg-muted text-muted-foreground'
                    }`}>{lead.priority}</span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => router.push(`/admin/leads/${lead.id}`)}
                      className="text-sm text-primary hover:text-primary/80">View</button>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No leads found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  )
}
