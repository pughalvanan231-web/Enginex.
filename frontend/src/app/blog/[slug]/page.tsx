'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { formatDate } from '@/lib/utils'
import api from '@/lib/api'

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string | null
  category: string
  tags: string[]
  coverImage: string | null
  author: { name: string }
  publishedAt: string
  readingTime: number | null
  comments: { id: string; name: string; content: string; createdAt: string }[]
  related: { title: string; slug: string; coverImage: string | null; excerpt: string | null; publishedAt: string }[]
}

export default function BlogDetailPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [commentName, setCommentName] = useState('')
  const [commentEmail, setCommentEmail] = useState('')
  const [commentContent, setCommentContent] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!params.slug) return
    api.get(`/blog/${params.slug}`)
      .then(res => setPost(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [params.slug])

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post(`/blog/${post?.id}/comments`, { name: commentName, email: commentEmail, content: commentContent })
      setSubmitted(true)
    } catch {}
  }

  if (loading) {
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
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-4xl font-bold text-foreground">Article Not Found</h1>
          <Link href="/blog"><Button variant="primary" className="mt-6">Back to Blog</Button></Link>
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
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>{post.category}</Badge>
              {post.tags?.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-10">
              <span className="flex items-center gap-2"><User className="w-4 h-4" />{post.author.name}</span>
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{formatDate(post.publishedAt)}</span>
              {post.readingTime && <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{post.readingTime} min read</span>}
            </div>
          </motion.div>

          {post.coverImage && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-subtle p-2 mb-10">
              <img src={post.coverImage} alt={post.title} className="w-full aspect-video object-cover rounded-lg" />
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="prose prose-gray max-w-none text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
          </motion.div>

          <div className="mt-16 pt-10 border-t border-border">
            <h3 className="text-xl font-bold text-foreground mb-6">Comments ({post.comments.length})</h3>
            {post.comments.length === 0 ? (
              <p className="text-muted-foreground mb-8">No comments yet. Be the first to share your thoughts!</p>
            ) : (
              <div className="space-y-6 mb-8">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="card-subtle p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">{comment.name[0]}</div>
                      <div><span className="text-sm text-foreground font-medium">{comment.name}</span><span className="text-xs text-muted-foreground ml-2">{formatDate(comment.createdAt)}</span></div>
                    </div>
                    <p className="text-sm text-muted-foreground">{comment.content}</p>
                  </div>
                ))}
              </div>
            )}

            {submitted ? (
              <div className="card-subtle p-6 text-center">
                <p className="text-green-600 font-medium">Comment submitted for approval!</p>
              </div>
            ) : (
              <form onSubmit={submitComment} className="card-subtle p-6 space-y-4">
                <h4 className="text-foreground font-medium">Leave a Comment</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input placeholder="Your Name" value={commentName} onChange={(e) => setCommentName(e.target.value)} required />
                  <Input type="email" placeholder="Your Email" value={commentEmail} onChange={(e) => setCommentEmail(e.target.value)} required />
                </div>
                <Textarea placeholder="Your Comment" value={commentContent} onChange={(e) => setCommentContent(e.target.value)} required />
                <Button type="submit" variant="primary">Post Comment</Button>
              </form>
            )}
          </div>

          {post.related.length > 0 && (
            <div className="mt-16 pt-10 border-t border-border">
              <h3 className="text-xl font-bold text-foreground mb-6">Related Articles</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {post.related.map((article) => (
                  <Link key={article.slug} href={`/blog/${article.slug}`} className="group">
                    <div className="card-subtle p-4">
                      <div className="aspect-video bg-gradient-to-br from-primary/10 to-transparent rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                        {article.coverImage ? <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" /> : <span className="text-2xl text-primary/20 font-bold">{article.title[0]}</span>}
                      </div>
                      <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{article.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
