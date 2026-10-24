'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { formatDate } from '@/lib/utils'
import api from '@/lib/api'
import { StaticBlogPost, staticBlogPosts } from '@/lib/blog-data'

interface BlogPost {
  id?: string
  title: string
  content: string
  excerpt: string | null
  category: string
  tags: string[]
  coverImage?: string | null
  author: { name: string; role?: string }
  publishedAt: string
  readingTime: number | null
  comments?: { id: string; name: string; content: string; createdAt: string }[]
  related?: { title: string; slug: string; coverImage: string | null; excerpt: string | null; publishedAt: string }[]
}

interface BlogDetailClientProps {
  slug: string
  initialStaticPost?: StaticBlogPost
}

// Simple markdown-to-HTML parser for static blog posts
function renderMarkdownContent(content: string) {
  // Convert markdown headings, lists, links, bold, tables to basic HTML
  const lines = content.trim().split('\n')
  const htmlParts: string[] = []
  let inList = false
  let inTable = false

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]

    if (line.startsWith('## ')) {
      if (inList) { htmlParts.push('</ul>'); inList = false }
      if (inTable) { htmlParts.push('</tbody></table></div>'); inTable = false }
      htmlParts.push(`<h2 class="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4 tracking-tight">${line.replace('## ', '')}</h2>`)
      continue
    }

    if (line.startsWith('### ')) {
      if (inList) { htmlParts.push('</ul>'); inList = false }
      if (inTable) { htmlParts.push('</tbody></table></div>'); inTable = false }
      htmlParts.push(`<h3 class="text-xl font-semibold text-foreground mt-6 mb-3">${line.replace('### ', '')}</h3>`)
      continue
    }

    if (line.startsWith('---')) {
      if (inList) { htmlParts.push('</ul>'); inList = false }
      if (inTable) { htmlParts.push('</tbody></table></div>'); inTable = false }
      htmlParts.push('<hr class="my-8 border-border" />')
      continue
    }

    if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!inList) {
        htmlParts.push('<ul class="list-disc pl-6 space-y-2 mb-6 text-muted-foreground">')
        inList = true
      }
      const itemText = line.replace(/^[-*]\s+/, '')
      htmlParts.push(`<li>${formatInline(itemText)}</li>`)
      continue
    } else if (inList) {
      htmlParts.push('</ul>')
      inList = false
    }

    if (line.startsWith('|') && line.endsWith('|')) {
      if (!inTable) {
        htmlParts.push('<div class="overflow-x-auto my-6"><table class="w-full text-left text-sm border-collapse border border-border"><tbody>')
        inTable = true
      }
      if (line.includes('---')) {
        continue // separator line
      }
      const cells = line.split('|').slice(1, -1).map(c => c.trim())
      htmlParts.push('<tr class="border-b border-border/60 hover:bg-muted/30">')
      for (const cell of cells) {
        htmlParts.push(`<td class="p-3 border-r border-border/40">${formatInline(cell)}</td>`)
      }
      htmlParts.push('</tr>')
      continue
    } else if (inTable) {
      htmlParts.push('</tbody></table></div>')
      inTable = false
    }

    if (line.trim().length > 0) {
      htmlParts.push(`<p class="text-muted-foreground leading-relaxed mb-4">${formatInline(line)}</p>`)
    }
  }

  if (inList) htmlParts.push('</ul>')
  if (inTable) htmlParts.push('</tbody></table></div>')

  return htmlParts.join('\n')
}

function formatInline(text: string): string {
  // Convert [text](url) to <a href="url" class="...">text</a>
  let out = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary font-medium hover:underline">$1</a>')
  // Convert **bold** to <strong class="text-foreground font-semibold">bold</strong>
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
  // Convert *italic* to <em>italic</em>
  out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>')
  // Convert `code` to <code class="...">code</code>
  out = out.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-muted text-foreground text-xs font-mono">$1</code>')
  return out
}

export default function BlogDetailClient({ slug, initialStaticPost }: BlogDetailClientProps) {
  const [post, setPost] = useState<BlogPost | null>(() => {
    if (initialStaticPost) {
      return {
        title: initialStaticPost.title,
        content: renderMarkdownContent(initialStaticPost.content),
        excerpt: initialStaticPost.excerpt,
        category: initialStaticPost.category,
        tags: initialStaticPost.tags,
        author: initialStaticPost.author,
        publishedAt: initialStaticPost.publishedAt,
        readingTime: initialStaticPost.readingTime,
        comments: [],
        related: staticBlogPosts
          .filter((p) => p.slug !== slug)
          .slice(0, 3)
          .map((p) => ({
            title: p.title,
            slug: p.slug,
            coverImage: null,
            excerpt: p.excerpt,
            publishedAt: p.publishedAt,
          })),
      }
    }
    return null
  })

  const [loading, setLoading] = useState(!initialStaticPost)
  const [commentName, setCommentName] = useState('')
  const [commentEmail, setCommentEmail] = useState('')
  const [commentContent, setCommentContent] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!slug) return
    // Attempt to load dynamic comments / extra data from backend without blocking view
    api.get(`/blog/${slug}`)
      .then((res) => {
        if (res.data) {
          setPost((prev) => ({
            ...res.data,
            // If static content exists, keep the rich markdown
            content: prev?.content || res.data.content,
          }))
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (post?.id) {
        await api.post(`/blog/${post.id}/comments`, {
          name: commentName,
          email: commentEmail,
          content: commentContent,
        })
      }
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    }
  }

  if (loading && !post) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 container-custom max-w-4xl mx-auto animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="h-12 bg-muted rounded w-2/3" />
          <div className="aspect-video bg-muted rounded-xl" />
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-3/4" />
        </div>
      </main>
    )
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 text-center container-custom">
          <h1 className="text-4xl font-bold text-foreground">Article Not Found</h1>
          <p className="text-muted-foreground mt-3">The article you requested could not be located.</p>
          <Link href="/blog">
            <Button variant="primary" className="mt-6">
              Back to Blog
            </Button>
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Articles
          </Link>

          <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>{post.category}</Badge>
              {post.tags?.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-10 pb-6 border-b border-border">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <span className="text-foreground font-medium">{post.author.name}</span>
                {post.author.role && <span className="text-xs text-muted-foreground">({post.author.role})</span>}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                {formatDate(post.publishedAt)}
              </span>
              {post.readingTime && (
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  {post.readingTime} min read
                </span>
              )}
            </div>

            {post.coverImage && (
              <div className="card-subtle p-2 mb-10 overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full aspect-video object-cover rounded-lg"
                />
              </div>
            )}

            <div
              className="prose prose-gray max-w-none text-muted-foreground leading-relaxed text-base"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.article>

          {/* Author Bio Box for E-E-A-T */}
          <div className="mt-14 p-6 rounded-2xl bg-muted/40 border border-border flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">
              P
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">About the Author: {post.author.name}</div>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Pughalvanan is the founder of EngineX Solutions, leading software architecture, AI engineering, and technical SEO implementations for businesses throughout India.
              </p>
              <div className="mt-3">
                <Link
                  href="/services"
                  className="text-xs text-primary font-medium hover:underline inline-flex items-center gap-1"
                >
                  Explore EngineX Solutions Services <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {post.related && post.related.length > 0 && (
            <div className="mt-16 pt-10 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Related Articles & Guides</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {post.related.map((article) => (
                  <Link key={article.slug} href={`/blog/${article.slug}`} className="group block">
                    <div className="card-subtle p-5 h-full flex flex-col justify-between hover:border-primary/40 transition-all">
                      <div>
                        <span className="text-[11px] text-primary font-semibold uppercase tracking-wider">
                          Engineering Guide
                        </span>
                        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mt-2 mb-2 line-clamp-2">
                          {article.title}
                        </h3>
                        {article.excerpt && (
                          <p className="text-xs text-muted-foreground line-clamp-3 mb-4">
                            {article.excerpt}
                          </p>
                        )}
                      </div>
                      <span className="text-xs font-medium text-primary inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                        Read Guide <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Comment Section */}
          <div className="mt-16 pt-10 border-t border-border">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Comments ({post.comments ? post.comments.length : 0})
            </h2>

            {post.comments && post.comments.length > 0 ? (
              <div className="space-y-4 mb-8">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="card-subtle p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                        {comment.name[0]}
                      </div>
                      <div>
                        <span className="text-sm text-foreground font-medium">{comment.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{comment.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mb-8">
                Have thoughts or questions on this article? Leave a response below.
              </p>
            )}

            {submitted ? (
              <div className="card-subtle p-6 text-center border-green-500/30 bg-green-500/05">
                <p className="text-green-700 font-medium text-sm">
                  Thank you! Your comment has been submitted for editorial review.
                </p>
              </div>
            ) : (
              <form onSubmit={submitComment} className="card-subtle p-6 space-y-4">
                <h3 className="text-base font-semibold text-foreground">Leave a Comment</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your Business Email"
                    value={commentEmail}
                    onChange={(e) => setCommentEmail(e.target.value)}
                    required
                  />
                </div>
                <Textarea
                  placeholder="Your comment or question..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  required
                />
                <Button type="submit" variant="primary">
                  Submit Comment
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
