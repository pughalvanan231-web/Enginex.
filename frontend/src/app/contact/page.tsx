'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, CheckCircle2, Loader2, ArrowRight, Clock, ShieldCheck } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SITE_URL } from '@/lib/json-ld'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email Inquiries',
    value: 'pughalvanan231@gmail.com',
    href: 'mailto:pughalvanan231@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone & WhatsApp',
    value: '+91 7867050320',
    href: 'tel:+917867050320',
  },
  {
    icon: MapPin,
    label: 'Registered Office',
    value: '2/222c Sulur, Coimbatore, Tamil Nadu, 641402',
    href: 'https://maps.google.com/?q=Sulur,Coimbatore,Tamil+Nadu',
  },
]

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [budget, setBudget] = useState('')
  const [projectType, setProjectType] = useState('Website Development')
  const [message, setMessage] = useState('')
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
          projectType,
          message: message.trim(),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry')
      }

      setSubmitted(true)

      if (typeof window !== 'undefined' && (window as any).va) {
        try {
          ;(window as any).va('event', {
            name: 'contact_page_form_submitted',
            data: { service: projectType },
          })
        } catch {}
      }
    } catch (err: any) {
      setError(
        err.message || 'An error occurred. Please contact us directly via email or phone.'
      )
    } finally {
      setLoading(false)
    }
  }

  const breadcrumbJson = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact` },
    ],
  }

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJson).replace(/</g, '\\u003c'),
        }}
      />
      <Header />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <SectionHeading
            as="h1"
            label="Get in Touch"
            title="Start Your Project With EngineX Solutions"
            description="Discuss your project goals with our senior engineering team. We deliver measurable business outcomes with zero fluff."
          />

          <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
            {/* Left Column: Direct Contact Info & Guarantees */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  Direct Contact Channels
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Whether you are planning a new website, evaluating AI workflow automation, or looking to scale your digital marketing in India, we are here to assist.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.label}
                      className="card-subtle p-5 flex items-start gap-4 hover:border-primary/40 transition-all"
                    >
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-medium">
                          {item.label}
                        </div>
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="card-subtle p-6 space-y-4 border-primary/20 bg-gradient-to-br from-primary/05 to-transparent">
                <div className="flex items-center gap-2.5 text-foreground font-semibold text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Prompt 24-Hour Review</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Every inquiry is reviewed directly by our technical and marketing leadership. You will receive an objective assessment, timeline estimate, and next steps within 24 business hours.
                </p>

                <div className="flex items-center gap-2.5 text-foreground font-semibold text-sm pt-2 border-t border-border/60">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>Complete Non-Disclosure & Privacy</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your project specifications, proprietary workflows, and customer data remain strictly confidential.
                </p>
              </div>
            </div>

            {/* Right Column: Working Interactive Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="card-elevated p-8 sm:p-10 bg-white">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Request a Project Quote & Consultation
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mb-6">
                  Fill in your details below for an objective technical evaluation and commercial quotation.
                </p>

                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Inquiry Received Successfully!</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      Thank you for contacting EngineX Solutions. We have dispatched a confirmation email to <span className="font-semibold text-foreground">{email}</span>. A senior specialist will be in touch shortly.
                    </p>
                    <Button
                      variant="primary"
                      className="mt-6"
                      onClick={() => {
                        setSubmitted(false)
                        setName('')
                        setEmail('')
                        setMessage('')
                      }}
                    >
                      Submit Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="p-3.5 text-xs rounded-xl bg-red-500/10 border border-red-500/20 text-red-600">
                        {error}
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-foreground mb-1 block">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          placeholder="e.g. Suresh Kumar"
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
                          placeholder="suresh@company.in"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-foreground mb-1 block">
                          Phone / WhatsApp Number
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
                          placeholder="e.g. Tech Solutions Pvt Ltd"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-foreground mb-1 block">
                          Primary Service of Interest
                        </label>
                        <select
                          value={projectType}
                          onChange={(e) => setProjectType(e.target.value)}
                          className="w-full text-xs sm:text-sm rounded-md border border-input bg-background px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                        >
                          <option value="Website Development">Website Development (Next.js)</option>
                          <option value="Digital Marketing Services">Digital Marketing Services</option>
                          <option value="Search Engine Optimization (SEO)">Search Engine Optimization (SEO)</option>
                          <option value="Google Ads Management">Google Ads Management</option>
                          <option value="Meta Ads Management">Meta Ads Management</option>
                          <option value="Social Media Marketing">Social Media Marketing</option>
                          <option value="Mobile App Development">Mobile App Development</option>
                          <option value="Video Production & Editing">Video Production & Editing</option>
                          <option value="Branding & Logo Design">Branding & Logo Design</option>
                          <option value="AI Automation & Custom Software">AI Automation & Custom Software</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-foreground mb-1 block">
                          Estimated Budget (INR)
                        </label>
                        <select
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="w-full text-xs sm:text-sm rounded-md border border-input bg-background px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                        >
                          <option value="">Select an investment range</option>
                          <option value="₹25k - ₹50k">₹25,000 – ₹50,000</option>
                          <option value="₹50k - ₹1.5L">₹50,000 – ₹1,50,000</option>
                          <option value="₹1.5L - ₹3.5L">₹1,50,000 – ₹3,50,000</option>
                          <option value="₹3.5L+">₹3,50,000+</option>
                          <option value="Flexible / Need Scoping">Flexible / Need Scoping</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-foreground mb-1 block">
                        Project Scope & Requirements <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        placeholder="Tell us about your project goals, challenges, and target timeline..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        required
                      />
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={loading}
                        className="w-full gap-2 shadow-lg shadow-primary/20"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Submitting Your Request...
                          </>
                        ) : (
                          <>
                            Send Project Inquiry <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </div>

                    <p className="text-[11px] text-center text-muted-foreground pt-1">
                      We respect your privacy. No unsolicited emails or sharing with third parties.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
