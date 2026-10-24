'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Global Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neutral-600 via-white to-neutral-400 z-[60] origin-left"
        style={{ scaleX }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? 'bg-[#060608]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6)] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10 group flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-all duration-300">
              <span className="text-white font-bold text-sm">X</span>
            </div>
            <span className="text-lg md:text-xl font-bold tracking-tight">
              <span className="text-white">Engine</span>
              <span className="text-white font-black">X</span>
              <span className="text-neutral-500 text-xs ml-1 font-normal tracking-wide">.solutions</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-1.5 rounded-full text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-all duration-300 relative group"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact?quote=true"
              className="px-4 py-2 rounded-full border border-white/15 text-neutral-300 hover:text-white hover:border-white/40 hover:bg-white/[0.05] text-xs font-medium transition-all duration-300"
            >
              Get Quote
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_28px_rgba(255,255,255,0.35)] transition-all duration-300 flex items-center gap-1.5 group"
            >
              <span>Book Call</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden relative z-10 text-white p-2 rounded-lg bg-white/[0.05] border border-white/10"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 top-0 bg-[#060608]/95 backdrop-blur-2xl z-40 lg:hidden flex flex-col justify-center items-center px-6"
            >
              <div className="w-full max-w-sm flex flex-col items-center gap-6">
                <nav className="flex flex-col items-center gap-4 w-full">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      className="w-full text-center"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 text-xl font-medium text-neutral-300 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="w-full pt-6 border-t border-white/10 flex flex-col gap-3">
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="w-full py-3.5 rounded-full bg-white text-black font-semibold text-sm text-center shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                  >
                    Book Consultation
                  </Link>
                  <Link
                    href="/contact?quote=true"
                    onClick={() => setMobileOpen(false)}
                    className="w-full py-3.5 rounded-full border border-white/20 text-white font-medium text-sm text-center hover:bg-white/[0.05]"
                  >
                    Get Instant Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
