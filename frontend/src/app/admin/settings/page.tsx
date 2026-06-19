'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Save } from 'lucide-react'
import AdminLayout from '../layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import api from '@/lib/api'

export default function AdminSettingsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState<Record<string, string>>({})

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/admin/login'); return }
    api.get('/settings')
      .then(res => setSettings(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api.put('/settings', settings)
      alert('Settings saved!')
    } catch {} finally {
      setSaving(false)
    }
  }

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-[#FF8C38] border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your site settings</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <div className="card-subtle p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Company Information</h3>
          <div><label className="block text-sm text-muted-foreground mb-2">Company Name</label><Input value={settings.company_name || ''} onChange={e => updateSetting('company_name', e.target.value)} /></div>
          <div><label className="block text-sm text-muted-foreground mb-2">Tagline</label><Input value={settings.company_tagline || ''} onChange={e => updateSetting('company_tagline', e.target.value)} /></div>
          <div><label className="block text-sm text-muted-foreground mb-2">Email</label><Input value={settings.company_email || ''} onChange={e => updateSetting('company_email', e.target.value)} /></div>
          <div><label className="block text-sm text-muted-foreground mb-2">Phone</label><Input value={settings.company_phone || ''} onChange={e => updateSetting('company_phone', e.target.value)} /></div>
          <div><label className="block text-sm text-muted-foreground mb-2">Address</label><Input value={settings.company_address || ''} onChange={e => updateSetting('company_address', e.target.value)} /></div>
        </div>

        <div className="card-subtle p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Social Links</h3>
          <div><label className="block text-sm text-muted-foreground mb-2">Twitter</label><Input value={settings.social_twitter || ''} onChange={e => updateSetting('social_twitter', e.target.value)} /></div>
          <div><label className="block text-sm text-muted-foreground mb-2">LinkedIn</label><Input value={settings.social_linkedin || ''} onChange={e => updateSetting('social_linkedin', e.target.value)} /></div>
          <div><label className="block text-sm text-muted-foreground mb-2">GitHub</label><Input value={settings.social_github || ''} onChange={e => updateSetting('social_github', e.target.value)} /></div>
        </div>

        <Button type="submit" variant="primary" size="lg" className="gap-2" disabled={saving}>
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </form>
    </AdminLayout>
  )
}
