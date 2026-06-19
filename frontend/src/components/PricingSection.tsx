'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import SectionHeading from './SectionHeading'

const plans = [
  {
    name: 'Starter',
    price: '₹20,000',
    description: 'Perfect for startups and small businesses getting started.',
    features: ['Custom Website (5 Pages)', 'Responsive Design', 'Basic SEO Setup', 'Contact Form Integration', '1 Month Support', 'Hosting Setup'],
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '₹49,999',
    description: 'Ideal for growing businesses needing robust solutions.',
    features: ['Custom Website (10 Pages)', 'CMS Integration', 'Advanced SEO', 'API Integrations', '3 Months Support', 'Performance Optimization', 'Analytics Dashboard', 'Mobile App MVP'],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with complex requirements.',
    features: ['Full-Stack Development', 'AI/ML Integration', 'Custom Dashboard', 'Unlimited Pages', 'Dedicated Team', '12 Months Support', 'SLA Guarantee', '24/7 Support', 'Cloud Infrastructure', 'Security Audit'],
    highlighted: false,
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function PricingSection() {
  return (
    <section className="section-padding bg-[#FAFAFA]">
      <div className="container-custom">
        <SectionHeading
          label="Pricing"
          title="Transparent Pricing Plans"
          description="Choose the plan that fits your needs. All plans include a free consultation to get started."
        />

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} {...fadeUp(i * 0.08)}
              className={`card-elevated p-8 relative flex flex-col ${
                plan.highlighted
                  ? 'border-[#FF8C38]/20 shadow-lg shadow-[#FF8C38]/05 scale-[1.02] md:scale-105'
                  : ''
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-[#FF8C38] text-white text-[10px] font-bold rounded-full tracking-wider uppercase">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">{plan.name}</h3>
                <p className="text-sm text-[#6B6B6B] mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#1A1A1A]">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-[#B0B0B0] text-sm">/project</span>}
                </div>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-[#6B6B6B]">
                    <Check className="w-4 h-4 text-[#FF8C38] mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/contact">
                <button className={`w-full py-3 rounded-full text-sm font-medium transition-all duration-500 ease-out group ${
                  plan.highlighted
                    ? 'bg-[#FF8C38] text-white hover:bg-[#E67A2E] hover:shadow-lg hover:shadow-[#FF8C38]/20'
                    : 'border border-[#E0E0E0] text-[#1A1A1A] hover:border-[#FF8C38]/30 hover:text-[#FF8C38] hover:bg-[#FF8C38]/03'
                }`}>
                  <span className="inline-flex items-center gap-2">
                    Get Started <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                  </span>
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
