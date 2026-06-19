import { Router, Request, Response } from 'express'
import prisma from '../utils/prisma'
import { protect, adminOnly, AuthRequest } from '../middleware/auth'
import slugify from 'slugify'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, search, featured, page = '1', limit = '12' } = req.query
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string)
    const take = parseInt(limit as string)

    const where: any = { published: true }
    if (category && category !== 'all') where.category = category
    if (featured === 'true') where.featured = true
    if (search) where.OR = [
      { title: { contains: search as string, mode: 'insensitive' } },
      { description: { contains: search as string, mode: 'insensitive' } },
    ]

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        include: { images: true, author: { select: { name: true } } },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      prisma.project.count({ where }),
    ])

    res.json({ projects, total, pages: Math.ceil(total / take), page: parseInt(page as string) })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/all', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      include: { images: true, author: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    })
    res.json(projects)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/categories', async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.project.groupBy({
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
    const project = await prisma.project.findUnique({
      where: { slug: req.params.slug },
      include: { images: true, author: { select: { name: true, avatar: true } } },
    })
    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.json(project)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.post('/', protect, adminOnly, async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, content, category, technologies, clientName, completionDate, projectUrl, featured, images, seoTitle, seoDesc } = req.body
    let slug = slugify(title, { lower: true, strict: true })

    const existing = await prisma.project.findUnique({ where: { slug } })
    if (existing) slug = `${slug}-${Date.now()}`

    const project = await prisma.project.create({
      data: {
        title, slug, description, content, category,
        technologies, clientName, completionDate: new Date(completionDate),
        projectUrl, featured: featured || false,
        seoTitle, seoDesc,
        authorId: req.user!.id,
        images: {
          create: images?.map((url: string) => ({ url })) || [],
        },
      },
      include: { images: true },
    })

    res.status(201).json(project)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
})

router.put('/:id', protect, adminOnly, async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, content, category, technologies, clientName, completionDate, projectUrl, featured, published, images, seoTitle, seoDesc } = req.body

    if (images) {
      await prisma.projectImage.deleteMany({ where: { projectId: req.params.id } })
      await prisma.projectImage.createMany({
        data: images.map((url: string) => ({ url, projectId: req.params.id })),
      })
    }

    const project = await prisma.project.update({
      where: { id: req.params.id },
      data: {
        title, description, content, category,
        technologies, clientName,
        completionDate: completionDate ? new Date(completionDate) : undefined,
        projectUrl, featured, published, seoTitle, seoDesc,
        slug: title ? slugify(title, { lower: true, strict: true }) : undefined,
      },
      include: { images: true },
    })

    res.json(project)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
})

router.delete('/:id', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    await prisma.project.delete({ where: { id: req.params.id } })
    res.json({ message: 'Project deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
