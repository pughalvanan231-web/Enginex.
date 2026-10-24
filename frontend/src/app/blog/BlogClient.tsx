'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Clock, ArrowRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import api from '@/lib/api'
import { staticBlogPosts } from '@/lib/blog-data'

interface Blog {
  id?: string
  title: string
  slug: string
  excerpt: string | null
  category: string
  tags: string[]
  coverImage?: string | null
  author: { name: string }
  publishedAt: string
  readingTime: number | null
  _count?: { comments: number }
}

const defaultStaticBlogs: Blog[] = staticBlogPosts.map((p, idx) => ({
  id: `static-${idx}`,
  title: p.title,
  slug: p.slug,
  excerpt: p.excerpt,
  category: p.category,
  tags: p.tags,
  coverImage: null,
  author: p.author,
  publishedAt: p.publishedAt,
  readingTime: p.readingTime,
  _count: { comments: 0 },
}))

export default function BlogClient() {
  const [blogs, setBlogs] = useState<Blog[]>(defaultStaticBlogs)
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([
    { name: 'Digital Marketing', count: 1 },
    { name: 'Web Development', count: 1 },
    { name: 'Paid Advertising', count: 1 },
    { name: 'Video Production', count: 1 },
    { name: 'SEO', count: 1 },
    { name: 'AI & Automation', count: 1 },
  ])
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.get('/blog/categories')
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setCategories(res.data)
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (activeCategory === 'all' && !search) {
      setBlogs(defaultStaticBlogs)
      return
    }

    const filtered = defaultStaticBlogs.filter((b) => {
      const matchCat = activeCategory === 'all' || b.category.toLowerCase() === activeCategory.toLowerCase()
      const matchSearch =
        !search ||
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        (b.excerpt && b.excerpt.toLowerCase().includes(search.toLowerCase()))
      return matchCat && matchSearch
    })

    setBlogs(filtered)
  }, [activeCategory, search])

  return (
    <main className="min-h-screen bg-[#060608] text-white">
      <Header />
      <div className="pt-36 pb-24 relative overflow-hidden">
        {/* Background Ambience */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

        <div className="container-custom relative z-10">
          <SectionHeading
            as="h1"
            label="Insights & Guides"
            title="Practical Engineering & Marketing Guides"
            description="In-depth analysis, cost guides, and technical strategies designed to help Indian businesses grow organic visibility and operational efficiency."
          />

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  activeCategory === 'all'
                    ? 'bg-white text-black font-semibold shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                    : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/10'
                }`}
              >
                All Topics ({defaultStaticBlogs.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    activeCategory === cat.name
                      ? 'bg-white text-black font-semibold shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                      : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/10'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Search articles & guides..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 text-sm"
              />
            </div>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-20 card-elevated p-12 max-w-lg mx-auto border border-white/10">
              <p className="text-neutral-400 text-base">No articles matched your filter criteria.</p>
              <button
                onClick={() => {
                  setActiveCategory('all')
                  setSearch('')
                }}
                className="mt-4 text-xs font-medium text-white hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog, i) => (
                <motion.div
                  key={blog.slug}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.6 }}
                  whileHover={{ y: -6 }}
                >
                  <Link href={`/blog/${blog.slug}`} className="group block h-full">
                    <div className="card-elevated p-8 h-full flex flex-col justify-between border border-white/10 hover:border-white/30 transition-all duration-300">
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-5">
                          <Badge variant="outline" className="text-[11px] bg-white/[0.04] border-white/15 text-neutral-300">
                            {blog.category}
                          </Badge>
                          {blog.readingTime && (
                            <span className="text-xs text-neutral-400 flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-neutral-400" />
                              {blog.readingTime} min read
                            </span>
                          )}
                        </div>

                        <h2 className="text-xl font-bold text-white group-hover:text-white transition-colors mb-3 leading-snug">
                          {blog.title}
                        </h2>

                        <p className="text-sm text-neutral-400 line-clamp-3 leading-relaxed mb-6">
                          {blog.excerpt}
                        </p>
                      </div>

                      <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-xs font-bold text-white">
                            {blog.author.name[0]}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-white">
                              {blog.author.name}
                            </div>
                            <div className="text-[10px] text-neutral-500">
                              {formatDate(blog.publishedAt)}
                            </div>
                          </div>
                        </div>

                        <span className="text-xs font-medium text-white flex items-center gap-1 group-hover:gap-1.5 transition-all">
                          Read <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
