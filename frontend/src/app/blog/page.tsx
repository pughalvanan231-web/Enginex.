'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import api from '@/lib/api'

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string | null
  category: string
  tags: string[]
  coverImage: string | null
  author: { name: string }
  publishedAt: string
  readingTime: number | null
  _count: { comments: number }
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    api.get('/blog/categories').then(res => setCategories(res.data)).catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page), limit: '9' })
    if (activeCategory !== 'all') params.set('category', activeCategory)
    if (search) params.set('search', search)

    api.get(`/blog?${params}`)
      .then(res => {
        setBlogs(res.data.blogs)
        setTotalPages(res.data.pages)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [activeCategory, page, search])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <SectionHeading
            label="Blog"
            title="Insights & Articles"
            description="Stay updated with the latest trends in software development, AI, and digital transformation."
          />

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
            <div className="flex flex-wrap gap-2">
              <button onClick={() => { setActiveCategory('all'); setPage(1) }}
                className={`px-4 py-2 rounded-full text-sm transition-all ${activeCategory === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>All</button>
              {categories.map((cat) => (
                <button key={cat.name} onClick={() => { setActiveCategory(cat.name); setPage(1) }}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${activeCategory === cat.name ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>{cat.name} ({cat.count})</button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search articles..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} className="pl-10" />
            </div>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card-subtle p-6 animate-pulse">
                  <div className="aspect-video bg-muted rounded-lg mb-4" />
                  <div className="h-4 bg-muted rounded w-1/4 mb-2" />
                  <div className="h-6 bg-muted rounded w-3/4 mb-3" />
                  <div className="h-3 bg-muted rounded w-full" />
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20"><p className="text-muted-foreground text-lg">No articles found.</p></div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog, i) => (
                <motion.div key={blog.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Link href={`/blog/${blog.slug}`} className="group block">
                    <div className="card-subtle overflow-hidden h-full">
                      <div className="aspect-video bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center overflow-hidden">
                        {blog.coverImage ? (
                          <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <span className="text-4xl text-primary/20 font-bold">{blog.title[0]}</span>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge>{blog.category}</Badge>
                          {blog.readingTime && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{blog.readingTime} min read</span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">{blog.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{blog.excerpt}</p>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                          <span className="text-xs text-muted-foreground">{formatDate(blog.publishedAt)}</span>
                          <span className="text-xs text-muted-foreground">{blog._count.comments} comments</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-lg text-sm transition-all ${page === i + 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>{i + 1}</button>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
