'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Clock, ArrowRight } from 'lucide-react'
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
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Attempt to merge backend categories if online
    api.get('/blog/categories')
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setCategories(res.data)
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    // If user filtered or searched, filter from static articles or fetch from API
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
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container-custom">
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
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
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
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search articles & guides..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 text-sm"
              />
            </div>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-20 card-subtle p-12 max-w-lg mx-auto">
              <p className="text-muted-foreground text-base">No articles matched your filter criteria.</p>
              <button
                onClick={() => {
                  setActiveCategory('all')
                  setSearch('')
                }}
                className="mt-4 text-xs font-medium text-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog, i) => (
                <motion.div
                  key={blog.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={`/blog/${blog.slug}`} className="group block h-full">
                    <div className="card-subtle p-6 h-full flex flex-col justify-between hover:border-primary/40 transition-all duration-300">
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-4">
                          <Badge variant="outline" className="text-xs">
                            {blog.category}
                          </Badge>
                          {blog.readingTime && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3 text-primary" />
                              {blog.readingTime} min read
                            </span>
                          )}
                        </div>

                        <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-3 leading-snug">
                          {blog.title}
                        </h2>

                        <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mb-6">
                          {blog.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-border flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {formatDate(blog.publishedAt)}
                        </span>
                        <span className="text-xs font-semibold text-primary inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                          Read Guide <ArrowRight className="w-3 h-3" />
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
