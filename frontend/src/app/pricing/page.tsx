'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'

const plans = [
  {
    name: 'Starter',
    price: '₹20,000',
    description: 'Perfect for startups and small businesses getting started with their digital presence.',
    features: ['Custom Website (5 Pages)', 'Responsive Design', 'Basic SEO Setup', 'Contact Form Integration', '1 Month Support', 'Hosting Setup', '1 Revision Round', 'Basic Analytics'],
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '₹49,999',
    description: 'Ideal for growing businesses needing robust, scalable solutions.',
    features: ['Custom Website (10 Pages)', 'CMS Integration', 'Advanced SEO', 'API Integrations', '3 Months Support', 'Performance Optimization', 'Analytics Dashboard', 'Mobile App MVP', '5 Revision Rounds', 'Priority Support'],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with complex, enterprise-grade requirements.',
    features: ['Full-Stack Development', 'AI/ML Integration', 'Custom Dashboard', 'Unlimited Pages', 'Dedicated Team', '12 Months Support', 'SLA Guarantee', '24/7 Priority Support', 'Cloud Infrastructure', 'Security Audit', 'Dedicated Project Manager', 'Custom Integrations'],
    highlighted: false,
  },
]

const faqs = [
  { q: 'How long does a typical project take?', a: 'Project timelines vary based on complexity. A standard website takes 2-4 weeks, while complex applications may take 2-6 months.' },
  { q: 'Do you offer post-launch support?', a: 'Yes! All our plans include support. We offer maintenance packages to keep your project running smoothly.' },
  { q: 'Can I upgrade my plan later?', a: 'Absolutely. You can upgrade at any time. We will work with you to adjust the scope and timeline.' },
  { q: 'What payment terms do you offer?', a: 'We typically work with milestone-based payments: 30% upfront, 40% on mid-point delivery, and 30% on completion.' },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <SectionHeading
            label="Pricing"
            title="Simple, Transparent Pricing"
            description="Choose the plan that fits your needs. All plans include a free consultation to discuss your project."
          />

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-24">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`card-subtle p-8 relative flex flex-col ${
                  plan.highlighted ? 'border-primary/30 shadow-lg shadow-primary/5 scale-[1.02] md:scale-105' : ''
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className="text-muted-foreground text-sm">/project</span>}
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button variant={plan.highlighted ? 'primary' : 'secondary'} className="w-full gap-2 group">
                    Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground text-center mb-8">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.q} className="card-subtle p-6 group cursor-pointer">
                  <summary className="text-foreground font-medium flex items-center justify-between">
                    {faq.q}
                    <span className="text-primary transform group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
