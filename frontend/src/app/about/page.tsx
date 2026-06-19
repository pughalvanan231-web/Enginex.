'use client'

import { motion } from 'framer-motion'
import { Shield, Eye, Target, Heart, ArrowRight, Globe } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'

const values = [
  { icon: Shield, title: 'Innovation', description: 'We push boundaries with cutting-edge technology and creative problem-solving to deliver solutions that set new standards.' },
  { icon: Eye, title: 'Transparency', description: 'Open communication and honest collaboration throughout every project. No hidden agendas, just results.' },
  { icon: Target, title: 'Excellence', description: 'We deliver nothing less than exceptional quality in every solution, every time.' },
  { icon: Heart, title: 'People-First', description: 'Our clients and team are at the heart of everything we build. Technology serves people, not the other way around.' },
]

const stats = [
  { type: 'stat', value: '50+', label: 'Projects Delivered' },
  { type: 'stat', value: '5+', label: 'Years Experience' },
  { type: 'message', text: 'DELIVERING ALL OVER THE WORLD' },
  { type: 'stat', value: '98%', label: 'Client Satisfaction' },
]

const team = [
  { name: 'Alex Chen', role: 'CEO & Founder', bio: 'Visionary leader with 15+ years in software engineering and AI.' },
  { name: 'Sarah Mitchell', role: 'CTO', bio: 'Expert in cloud architecture and distributed systems.' },
  { name: 'David Park', role: 'Head of Design', bio: 'Award-winning designer focused on user-centered experiences.' },
  { name: 'Maria Rodriguez', role: 'AI Research Lead', bio: 'PhD in Machine Learning with focus on NLP and computer vision.' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <SectionHeading
            label="About Us"
            title="Transforming Ideas into Intelligent Digital Solutions"
            description="EngineX.solution is a software development and AI solutions company that specializes in custom software, AI applications, web development, mobile applications, UI/UX design, automation systems, and digital transformation services."
          />

          <div className="max-w-3xl mx-auto text-center mb-20">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded in 2018, we have grown from a small team of passionate developers into a full-service technology company serving clients worldwide. Our mission is to bridge the gap between innovative ideas and powerful digital solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-24">
            {stats.map((stat, i) => (
              stat.type === 'message' ? (
                <motion.div
                  key={stat.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card-subtle p-8 text-center flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 to-transparent border border-primary/20"
                >
                  <Globe className="w-10 h-10 text-primary mb-3" />
                  <div className="text-sm text-muted-foreground font-semibold tracking-wider leading-relaxed">{stat.text}</div>
                </motion.div>
              ) : (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card-subtle p-8 text-center"
                >
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              )
            ))}
          </div>

          <div className="mb-24">
            <h3 className="text-2xl font-bold text-foreground text-center mb-12">Our Core Values</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card-subtle p-8 flex gap-6"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">{value.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mb-24">
            <h3 className="text-2xl font-bold text-foreground text-center mb-12">Our Leadership Team</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card-subtle p-6 text-center group hover:border-primary/20 transition-all"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">{member.name[0]}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-1">{member.name}</h4>
                  <div className="text-sm text-primary mb-3">{member.role}</div>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Work Together?</h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Let&apos;s discuss your project and find the best solution for your needs.</p>
            <Link href="/contact">
              <Button variant="primary" size="lg" className="gap-2 group">
                Get in Touch <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
