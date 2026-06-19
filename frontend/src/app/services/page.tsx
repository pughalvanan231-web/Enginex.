'use client'

import { motion } from 'framer-motion'
import { Globe, Smartphone, Brain, Palette, Code, Cloud, Zap, RefreshCw, ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'

const iconMap: Record<string, React.ElementType> = {
  Globe, Smartphone, Brain, Palette, Code, Cloud, Zap, RefreshCw,
}

const services = [
  {
    icon: 'Globe', title: 'Web Development', description: 'Custom websites and web applications built with modern frameworks and best practices.',
    features: ['Responsive Design', 'Full-Stack Development', 'CMS Integration', 'E-Commerce Solutions', 'Performance Optimization', 'API Development'],
    detail: 'We build high-performance web applications using cutting-edge technologies like Next.js, React, Node.js, and more. From simple landing pages to complex enterprise platforms, we deliver exceptional digital experiences.',
  },
  {
    icon: 'Smartphone', title: 'Mobile App Development', description: 'Native and cross-platform mobile applications for iOS and Android.',
    features: ['iOS & Android', 'Cross-Platform (React Native/Flutter)', 'UI/UX Design', 'App Store Deployment', 'Push Notifications', 'Real-Time Features'],
    detail: 'Our mobile team creates stunning, high-performance apps that users love. We leverage both native and cross-platform technologies to deliver the best experience for your audience.',
  },
  {
    icon: 'Brain', title: 'AI Solutions', description: 'Intelligent AI-powered solutions including LLMs, computer vision, and predictive analytics.',
    features: ['Custom AI Models', 'LLM Integration', 'Computer Vision', 'Predictive Analytics', 'Natural Language Processing', 'AI Chatbots'],
    detail: 'We help businesses harness the power of artificial intelligence. From custom machine learning models to LLM-powered applications, we build intelligent systems that drive real business value.',
  },
  {
    icon: 'Palette', title: 'UI/UX Design', description: 'User-centered design that combines aesthetics with functionality for exceptional experiences.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design', 'Design Systems', 'Usability Testing'],
    detail: 'Great design is about more than looks — it is about creating intuitive, engaging experiences. Our design team follows a research-driven approach to craft interfaces that users love.',
  },
  {
    icon: 'Code', title: 'Custom Software Development', description: 'Tailored software solutions built to address your unique business challenges.',
    features: ['Requirements Analysis', 'Architecture Design', 'Agile Development', 'Quality Assurance', 'Deployment', 'Maintenance'],
    detail: 'Off-the-shelf software does not always cut it. We build custom solutions that perfectly align with your business processes, giving you a competitive edge.',
  },
  {
    icon: 'Cloud', title: 'Cloud Solutions', description: 'Scalable cloud infrastructure and DevOps solutions for modern applications.',
    features: ['AWS/Azure/GCP', 'Microservices', 'Containerization', 'CI/CD Pipelines', 'Auto Scaling', 'Monitoring'],
    detail: 'We design and implement cloud architectures that scale with your business. From migration to optimization, we ensure your infrastructure is robust, secure, and cost-effective.',
  },
  {
    icon: 'Zap', title: 'Automation Systems', description: 'Streamline operations with intelligent automation and workflow optimization.',
    features: ['Process Automation', 'Workflow Design', 'RPA Solutions', 'Integration APIs', 'Data Pipelines', 'Reporting Dashboards'],
    detail: 'Eliminate manual processes and boost efficiency with our automation solutions. We design intelligent workflows that save time, reduce errors, and free up your team for high-value work.',
  },
  {
    icon: 'RefreshCw', title: 'Digital Transformation', description: 'End-to-end digital transformation services to modernize your business.',
    features: ['Digital Strategy', 'Legacy Modernization', 'Change Management', 'Tech Stack Optimization', 'Digital Marketing', 'Analytics'],
    detail: 'Transform your business for the digital age. We guide you through every step of the transformation journey, from strategy to execution.',
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <SectionHeading
            label="Our Services"
            title="Comprehensive Digital Solutions"
            description="From web development to AI, we offer everything you need to build, scale, and transform your business in the digital age."
          />

          <div className="space-y-24">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon]
              return (
                <motion.div
                  key={service.title}
                  id={service.title.toLowerCase().replace(/\s+/g, '-')}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                >
                  <div className="flex-1">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                      {Icon && <Icon className="w-8 h-8 text-primary" />}
                    </div>
                    <h2 className="text-3xl font-bold text-foreground mb-4">{service.title}</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">{service.detail}</p>
                    <div className="grid sm:grid-cols-2 gap-3 mb-8">
                      {service.features.map((f) => (
                        <div key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                    <Link href="/contact">
                      <Button variant="primary" className="gap-2 group">
                        Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                  <div className="flex-1 card-subtle p-8 lg:p-12">
                    <div className="aspect-square bg-gradient-to-br from-primary/5 to-transparent rounded-xl flex items-center justify-center">
                      {Icon && <Icon className="w-32 h-32 text-primary/20" />}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
