'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { LayoutDashboard, Briefcase, FileText, Users, Star, MessageSquare, Settings, LogOut, TrendingUp, Mail, Eye } from 'lucide-react'
import AdminLayout from './layout'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState<any>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const u = localStorage.getItem('user')
    if (!token) { router.push('/admin/login'); return }
    if (u) setUser(JSON.parse(u))

    fetch('/api/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => {})
  }, [router])

  if (!stats) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-[#FF8C38] border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    )
  }

  const statCards = [
    { label: 'Total Projects', value: stats.stats.projects, icon: Briefcase, color: 'text-blue-500 bg-blue-500/10' },
    { label: 'Blog Posts', value: stats.stats.blogs, icon: FileText, color: 'text-green-500 bg-green-500/10' },
    { label: 'Total Leads', value: stats.stats.leads, icon: Users, color: 'text-[#FF8C38] bg-[#FF8C38]/10' },
    { label: 'Testimonials', value: stats.stats.testimonials, icon: Star, color: 'text-yellow-500 bg-yellow-500/10' },
    { label: 'Active Jobs', value: stats.stats.jobs, icon: Briefcase, color: 'text-purple-500 bg-purple-500/10' },
    { label: 'Messages', value: stats.stats.messages, icon: MessageSquare, color: 'text-pink-500 bg-pink-500/10' },
    { label: 'Applications', value: stats.stats.applications, icon: Eye, color: 'text-cyan-500 bg-cyan-500/10' },
    { label: 'Total Inquiries', value: stats.stats.leads + stats.stats.messages, icon: TrendingUp, color: 'text-[#FF8C38] bg-[#FF8C38]/10' },
  ]

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back{user ? `, ${user.name}` : ''}</h1>
        <p className="text-muted-foreground">Here is what is happening with your platform today.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card-subtle p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">{card.label}</span>
              <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center`}>
                <card.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground">{card.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-subtle p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Leads</h3>
          {stats.recentLeads?.length === 0 ? (
            <p className="text-muted-foreground text-sm">No leads yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentLeads?.map((lead: any) => (
                <div key={lead.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div>
                    <div className="text-sm text-foreground font-medium">{lead.name}</div>
                    <div className="text-xs text-muted-foreground">{lead.email} - {lead.company || 'N/A'}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    lead.status === 'NEW' ? 'bg-blue-50 text-blue-600' :
                    lead.status === 'CONTACTED' ? 'bg-yellow-50 text-yellow-600' :
                    lead.status === 'WON' ? 'bg-green-50 text-green-600' :
                    'bg-red-50 text-red-600'
                  }`}>{lead.status.replace('_', ' ')}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card-subtle p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Messages</h3>
          {stats.recentMessages?.length === 0 ? (
            <p className="text-muted-foreground text-sm">No messages yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentMessages?.map((msg: any) => (
                <div key={msg.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div>
                    <div className="text-sm text-foreground font-medium">{msg.name}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">{msg.message}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${msg.read ? 'bg-green-50 text-green-600' : 'bg-primary/10 text-primary'}`}>
                    {msg.read ? 'Read' : 'New'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
