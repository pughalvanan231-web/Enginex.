'use client'

import { Mail, Phone, MapPin, ArrowRight, Clock, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import SectionHeading from './SectionHeading'

const contactInfo = [
  {
    icon: Mail,
    label: 'Direct Inquiry Email',
    value: 'pughalvanan231@gmail.com',
    href: 'mailto:pughalvanan231@gmail.com',
    sub: 'Average response: < 2 hours',
  },
  {
    icon: Phone,
    label: 'Direct Phone & WhatsApp',
    value: '+91 7867050320',
    href: 'tel:+917867050320',
    sub: 'Available Mon-Sat, 9AM-7PM IST',
  },
  {
    icon: MapPin,
    label: 'Headquarters',
    value: '2/222c Sulur, Coimbatore,\nTamil Nadu, 641402, India',
    href: 'https://maps.google.com/?q=Sulur,Coimbatore,Tamil+Nadu',
    sub: 'Pan-India & Global Delivery',
  },
]

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-[#060608] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          label="Get In Touch"
          title="Let's Build Something Exceptional"
          description="Have a software project, AI automation requirement, or growth mandate? Reach out for a direct consultation."
        />

        <div className="max-w-4xl mx-auto">
          {/* Contact Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -6 }}
                  className="card-elevated p-8 text-center flex flex-col items-center justify-between group border border-white/10 hover:border-white/30"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-6 text-white group-hover:bg-white group-hover:text-black group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                      {item.label}
                    </div>
                    <div className="text-sm font-semibold text-white whitespace-pre-line group-hover:text-white transition-colors leading-relaxed">
                      {item.value}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.08] w-full text-[11px] text-neutral-500">
                    {item.sub}
                  </div>
                </motion.a>
              )
            })}
          </div>

          {/* Consultation Assurance Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl bg-white/[0.03] border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-xl"
          >
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-white">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-base font-bold text-white">
                  30-Minute Complimentary Strategy Session
                </div>
                <div className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                  Direct review of your technical stack, architecture, and marketing performance with zero obligation.
                </div>
              </div>
            </div>

            <Link
              href="/contact?quote=true"
              className="shrink-0 px-6 py-3.5 rounded-full bg-white text-black font-semibold text-xs transition-all duration-300 hover:bg-neutral-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95 flex items-center gap-2 group"
            >
              <span>Request Evaluation</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
