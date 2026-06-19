'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Briefcase, FileText, Users, Star, MessageSquare, Settings, LogOut, Menu, X, Mail, Eye } from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: Briefcase },
  { href: '/admin/blog', label: 'Blog Posts', icon: FileText },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { href: '/admin/jobs', label: 'Jobs', icon: Mail },
  { href: '/admin/applications', label: 'Applications', icon: Eye },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/services', label: 'Services', icon: Settings },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const u = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if (!token) { router.push('/admin/login'); return }
    if (u) setUser(JSON.parse(u))
  }, [router])

  // On login page, don't show admin layout
  if (pathname === '/admin/login') return <>{children}</>

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-background flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0A0A0A] border-r border-white/5 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative`}>
        <div className="p-6 border-b border-white/5">
          <Link href="/admin" className="text-xl font-bold">
            <span className="text-white">Engine</span><span className="text-[#FF8C38]">X</span>
            <span className="text-white/40 text-xs ml-1">Admin</span>
          </Link>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                  active ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
          <div className="flex items-center justify-between mb-3 px-4 py-2">
            <div className="text-sm text-white/60">{user?.name || 'Admin'}</div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-400 hover:bg-red-500/10 w-full transition-all">
            <LogOut className="w-4 h-4" /> Logout
          </button>
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-white/40 hover:text-white hover:bg-white/5 w-full transition-all mt-1">
            <Eye className="w-4 h-4" /> View Site
          </Link>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-40 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5 lg:hidden">
          <div className="flex items-center justify-between p-4">
            <button onClick={() => setSidebarOpen(true)} className="text-white">
              <Menu className="w-6 h-6" />
            </button>
            <span className="text-sm font-bold text-white">EngineX Admin</span>
            <div className="w-6" />
          </div>
        </header>

        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
