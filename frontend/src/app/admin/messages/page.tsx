'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Mail, MailOpen } from 'lucide-react'
import api from '@/lib/api'

export default function AdminMessagesPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/admin/login'); return }
    api.get('/contact')
      .then(res => setMessages(res.data.messages))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [router])

  const markRead = async (id: string) => {
    try {
      await api.put(`/contact/${id}/read`)
      setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m))
    } catch {}
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return
    try {
      await api.delete(`/contact/${id}`)
      setMessages(prev => prev.filter(m => m.id !== id))
      if (selected?.id === id) setSelected(null)
    } catch {}
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground text-sm mt-1">Contact form submissions</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className={selected ? 'hidden lg:block' : ''}>
          {loading ? (
            <div className="space-y-4">{[1, 2, 3].map(i => <div key={i} className="card-subtle p-6 animate-pulse"><div className="h-6 bg-muted rounded w-1/3" /></div>)}</div>
          ) : (
            <div className="space-y-2">
              {messages.map(msg => (
                <div key={msg.id}
                  className={`card-subtle p-4 cursor-pointer transition-all ${selected?.id === msg.id ? 'border-primary/30' : ''} ${!msg.read ? 'border-l-2 border-l-primary' : ''}`}
                  onClick={() => { setSelected(msg); if (!msg.read) markRead(msg.id) }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-foreground font-medium">{msg.name}</span>
                        {!msg.read && <span className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{msg.email}</div>
                      <div className="text-xs text-muted-foreground mt-2 line-clamp-2">{msg.message}</div>
                      <div className="text-xs text-muted-foreground mt-2">{new Date(msg.createdAt).toLocaleString()}</div>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(msg.id) }} className="text-red-400 hover:text-red-300 shrink-0"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
              {messages.length === 0 && <div className="text-center py-12 text-muted-foreground">No messages yet.</div>}
            </div>
          )}
        </div>

        {selected && (
          <div className="card-subtle p-6 lg:block">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-foreground">{selected.name}</h3>
                <p className="text-sm text-muted-foreground">{selected.email}</p>
                {selected.phone && <p className="text-sm text-muted-foreground">{selected.phone}</p>}
                {selected.company && <p className="text-sm text-muted-foreground">{selected.company}</p>}
                {selected.subject && <p className="text-sm text-muted-foreground">{selected.subject}</p>}
              </div>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground lg:hidden">Close</button>
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{selected.message}</div>
            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{new Date(selected.createdAt).toLocaleString()}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${selected.read ? 'bg-green-50 text-green-600' : 'bg-primary/10 text-primary'}`}>
                {selected.read ? 'Read' : 'New'}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
