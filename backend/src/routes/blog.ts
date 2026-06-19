import { Router, Request, Response } from 'express'
import prisma from '../utils/prisma'
import { protect, adminOnly, AuthRequest } from '../middleware/auth'
import slugify from 'slugify'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, search, page = '1', limit = '12' } = req.query
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string)
    const take = parseInt(limit as string)
    const where: any = { published: true }
    if (category && category !== 'all') where.category = category
    if (search) where.OR = [
      { title: { contains: search as string, mode: 'insensitive' } },
      { content: { contains: search as string, mode: 'insensitive' } },
    ]

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        include: { author: { select: { name: true, avatar: true } }, _count: { select: { comments: true } } },
        orderBy: { publishedAt: 'desc' },
        skip, take,
      }),
      prisma.blog.count({ where }),
    ])

    res.json({ blogs, total, pages: Math.ceil(total / take), page: parseInt(page as string) })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/all', protect, adminOnly, async (_req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: { author: { select: { name: true } }, _count: { select: { comments: true } } },
      orderBy: { createdAt: 'desc' },
    })
    res.json(blogs)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/categories', async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.blog.groupBy({
      by: ['category'],
      _count: { category: true },
    })
    res.json(categories.map(c => ({ name: c.category, count: c._count.category })))
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug: req.params.slug },
      include: {
        author: { select: { name: true, avatar: true } },
        comments: { where: { approved: true }, orderBy: { createdAt: 'desc' } },
      },
    })
    if (!blog) return res.status(404).json({ error: 'Blog not found' })

    const related = await prisma.blog.findMany({
      where: { category: blog.category, id: { not: blog.id }, published: true },
      take: 3,
      orderBy: { publishedAt: 'desc' },
      select: { title: true, slug: true, coverImage: true, excerpt: true, publishedAt: true },
    })

    res.json({ ...blog, related })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.post('/', protect, adminOnly, async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, excerpt, category, tags, coverImage, published, seoTitle, seoDesc } = req.body
    let slug = slugify(title, { lower: true, strict: true })
    const existing = await prisma.blog.findUnique({ where: { slug } })
    if (existing) slug = `${slug}-${Date.now()}`

    const readingTime = Math.ceil(content.split(/\s+/).length / 200)

    const blog = await prisma.blog.create({
      data: {
        title, slug, content, excerpt, category, tags: tags || [],
        coverImage, published, seoTitle, seoDesc, readingTime,
        authorId: req.user!.id,
        publishedAt: published ? new Date() : null,
      },
      include: { author: { select: { name: true } } },
    })

    res.status(201).json(blog)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
})

router.put('/:id', protect, adminOnly, async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, excerpt, category, tags, coverImage, published, seoTitle, seoDesc } = req.body
    const readingTime = content ? Math.ceil(content.split(/\s+/).length / 200) : undefined

    const blog = await prisma.blog.update({
      where: { id: req.params.id },
      data: {
        title, content, excerpt, category, tags, coverImage,
        published, seoTitle, seoDesc, readingTime,
        slug: title ? slugify(title, { lower: true, strict: true }) : undefined,
        publishedAt: published ? new Date() : null,
      },
    })

    res.json(blog)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.delete('/:id', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    await prisma.blog.delete({ where: { id: req.params.id } })
    res.json({ message: 'Blog deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.post('/:id/comments', async (req: Request, res: Response) => {
  try {
    const { name, email, content } = req.body
    const comment = await prisma.blogComment.create({
      data: { name, email, content, blogId: req.params.id },
    })
    res.status(201).json(comment)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
