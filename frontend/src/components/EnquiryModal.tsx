'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle2, Loader2, ArrowRight } from 'lucide-react'

interface EnquiryModalProps {
  isOpen: boolean
  onClose: () => void
  defaultService?: string
}

export default function EnquiryModal({ isOpen, onClose, defaultService }: EnquiryModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [budget, setBudget] = useState('')
  const [message, setMessage] = useState('')
  const [projectType, setProjectType] = useState(defaultService || 'General Inquiry')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please provide your name, business email, and project message.')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          company: company.trim() || undefined,
          budget: budget || undefined,
          projectType: projectType || defaultService || 'General Inquiry',
          message: message.trim(),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry')
      }

      setSubmitted(true)

      // Safely dispatch custom event for analytics if available
      if (typeof window !== 'undefined' && (window as any).va) {
        try {
          ;(window as any).va('event', {
            name: 'lead_form_submitted',
            data: { service: projectType },
          })
        } catch {}
      }
    } catch (err: any) {
      setError(
        err.message || 'An unexpected error occurred. Please try reaching out directly via phone or email.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setSubmitted(false)
    setError(null)
    setName('')
    setEmail('')
    setPhone('')
    setCompany('')
    setBudget('')
    setMessage('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleReset()}>
      <DialogContent className="sm:max-w-lg p-6 sm:p-8 max-h-[90vh] overflow-y-auto bg-[#0B0B0E] border border-white/15 text-white shadow-2xl backdrop-blur-2xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-white">
            {submitted ? 'Inquiry Received' : `Consultation: ${defaultService || 'EngineX Solutions'}`}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {submitted
              ? 'Thank you for contacting EngineX Solutions. Our senior engineering team will review your specifications within 24 business hours.'
              : 'Share your requirements for an objective technical evaluation and commercial estimate. Zero spam, complete confidentiality.'}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <p className="text-sm text-foreground font-medium">
              We have dispatched a confirmation to <span className="font-semibold">{email}</span>.
            </p>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              For immediate assistance or time-critical projects, you can also reach us directly at{' '}
              <a href="tel:+917867050320" className="text-primary font-medium hover:underline">
                +91 7867050320
              </a>.
            </p>
            <Button variant="primary" onClick={handleReset} className="mt-4">
              Close Window
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-xs rounded-lg bg-red-500/10 border border-red-500/20 text-red-600">
                {error}
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="e.g. Anand Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">
                  Business Email <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="anand@company.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">
                  Company / Organization
                </label>
                <Input
                  placeholder="e.g. Apex Manufacturing"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">
                  Service Category
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full text-xs rounded-xl border border-white/10 bg-[#141418] px-3 py-2.5 text-white focus:outline-none focus:border-white/40"
                >
                  <option value="Digital Marketing Services">Digital Marketing Services</option>
                  <option value="Search Engine Optimization (SEO)">Search Engine Optimization (SEO)</option>
                  <option value="Google Ads Management">Google Ads Management</option>
                  <option value="Meta Ads Management">Meta Ads Management</option>
                  <option value="Social Media Marketing">Social Media Marketing</option>
                  <option value="Website Development">Website Development</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="Video Production & Editing">Video Production & Editing</option>
                  <option value="Branding & Logo Design">Branding & Logo Design</option>
                  <option value="AI Automation & Custom Software">AI Automation & Custom Software</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">
                  Estimated Budget
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full text-xs rounded-xl border border-white/10 bg-[#141418] px-3 py-2.5 text-white focus:outline-none focus:border-white/40"
                >
                  <option value="">Select an investment range</option>
                  <option value="₹25k - ₹50k">₹25,000 – ₹50,000</option>
                  <option value="₹50k - ₹1.5L">₹50,000 – ₹1,50,000</option>
                  <option value="₹1.5L - ₹3.5L">₹1,50,000 – ₹3,50,000</option>
                  <option value="₹3.5L+">₹3,50,000+</option>
                  <option value="Flexible / Undetermined">Flexible / Need Scoping</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">
                Project Scope & Business Goals <span className="text-red-500">*</span>
              </label>
              <Textarea
                placeholder="Briefly describe your objectives, existing challenges, and target timeline..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" disabled={loading} className="w-full gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting Request...
                  </>
                ) : (
                  <>
                    Submit Consultation Request <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>

            <p className="text-[11px] text-center text-muted-foreground pt-1">
              Your details are protected under our{' '}
              <a href="/privacy" target="_blank" className="underline hover:text-foreground">
                Privacy Policy
              </a>
              . No spam, ever.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
