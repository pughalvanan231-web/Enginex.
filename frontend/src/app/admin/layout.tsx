import type { Metadata } from 'next'
import AdminClientLayout from './AdminClientLayout'

export const metadata: Metadata = {
  title: 'Admin Portal | EngineX Solutions',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminClientLayout>{children}</AdminClientLayout>
}
