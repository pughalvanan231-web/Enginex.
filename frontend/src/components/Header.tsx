'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        scrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-[0_1px_0_rgba(0,0,0,0.04)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="relative z-10">
          <span className="text-xl md:text-2xl font-bold tracking-tight">
            <span className="text-[#1A1A1A]">Engine</span>
            <span className="text-[#FF8C38]">X</span>
            <span className="text-[#B0B0B0] text-xs md:text-sm ml-0.5 font-normal">.solution</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors duration-500 ease-out relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#FF8C38] transition-all duration-500 ease-out group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-full bg-[#FF8C38] text-white text-sm font-medium transition-all duration-500 ease-out hover:bg-[#E67A2E] hover:shadow-lg hover:shadow-[#FF8C38]/20"
          >
            Book Consultation
          </Link>
          <Link
            href="/contact?quote=true"
            className="px-5 py-2.5 rounded-full border border-[#E0E0E0] text-[#1A1A1A] text-sm font-medium transition-all duration-500 ease-out hover:border-[#FF8C38]/30 hover:text-[#FF8C38] hover:bg-[#FF8C38]/03"
          >
            Get Quote
          </Link>
        </div>

        <button
          className="lg:hidden relative z-10 text-[#1A1A1A] p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 bg-white/98 backdrop-blur-2xl z-0 lg:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl text-[#1A1A1A] hover:text-[#FF8C38] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="flex flex-col gap-3 mt-6">
                <a href="/contact" onClick={() => setMobileOpen(false)}
                  className="px-8 py-3 rounded-full bg-[#FF8C38] text-white text-sm font-medium text-center">
                  Book Consultation
                </a>
                <a href="/contact?quote=true" onClick={() => setMobileOpen(false)}
                  className="px-8 py-3 rounded-full border border-[#E0E0E0] text-[#1A1A1A] text-sm font-medium text-center">
                  Get Quote
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
