'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import AdminLayout from '../../layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import api from '@/lib/api'

export default function AdminLeadDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [lead, setLead] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/admin/login'); return }
    api.get(`/leads/${params.id}`)
      .then(res => {
        setLead(res.data)
        setStatus(res.data.status)
        setPriority(res.data.priority)
        setNotes(res.data.notes || '')
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [params.id, router])

  const handleUpdate = async () => {
    try {
      await api.put(`/leads/${params.id}`, { status, priority, notes })
      alert('Lead updated!')
    } catch {}
  }

  if (loading) {
    return <AdminLayout><div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-[#FF8C38] border-t-transparent rounded-full animate-spin" /></div></AdminLayout>
  }

  if (!lead) {
    return <AdminLayout><div className="text-center py-20"><p className="text-muted-foreground">Lead not found.</p></div></AdminLayout>
  }

  return (
    <AdminLayout>
      <Link href="/admin/leads" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Leads
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card-subtle p-6 space-y-4">
          <h1 className="text-2xl font-bold text-foreground">{lead.name}</h1>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div><span className="text-muted-foreground">Email:</span> <span className="text-foreground">{lead.email}</span></div>
            <div><span className="text-muted-foreground">Phone:</span> <span className="text-foreground">{lead.phone || '-'}</span></div>
            <div><span className="text-muted-foreground">Company:</span> <span className="text-foreground">{lead.company || '-'}</span></div>
            <div><span className="text-muted-foreground">Budget:</span> <span className="text-foreground">{lead.budget || '-'}</span></div>
            <div><span className="text-muted-foreground">Project Type:</span> <span className="text-foreground">{lead.projectType || '-'}</span></div>
            <div><span className="text-muted-foreground">Source:</span> <span className="text-foreground">{lead.source || 'Direct'}</span></div>
            <div><span className="text-muted-foreground">Created:</span> <span className="text-foreground">{new Date(lead.createdAt).toLocaleString()}</span></div>
          </div>
          {lead.message && (
            <div>
              <div className="text-sm text-muted-foreground mb-2">Message:</div>
              <div className="text-sm text-foreground p-4 rounded-lg bg-muted">{lead.message}</div>
            </div>
          )}
        </div>

        <div className="card-subtle p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Update Lead</h3>
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)}
              className="w-full h-12 rounded-lg border border-input bg-background px-4 text-sm text-foreground">
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="PROPOSAL_SENT">Proposal Sent</option>
              <option value="WON">Won</option>
              <option value="LOST">Lost</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Priority</label>
            <select value={priority} onChange={e => setPriority(e.target.value)}
              className="w-full h-12 rounded-lg border border-input bg-background px-4 text-sm text-foreground">
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Notes</label>
            <Textarea value={notes} onChange={e => setNotes(e.target.value)} />
          </div>
          <Button variant="primary" className="w-full" onClick={handleUpdate}>Update Lead</Button>
        </div>
      </div>
    </AdminLayout>
  )
}
