import { Router, Request, Response } from 'express'
import prisma from '../utils/prisma'
import { protect, adminOnly } from '../middleware/auth'
import slugify from 'slugify'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const { type, department, active } = req.query
    const where: any = {}
    if (active !== 'false') where.active = true
    if (type && type !== 'all') where.type = type
    if (department && department !== 'all') where.department = department

    const jobs = await prisma.jobListing.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { applications: true } } },
    })
    res.json(jobs)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/all', protect, adminOnly, async (_req: Request, res: Response) => {
  try {
    const jobs = await prisma.jobListing.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { applications: true } } },
    })
    res.json(jobs)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const job = await prisma.jobListing.findUnique({
      where: { slug: req.params.slug },
      include: { _count: { select: { applications: true } } },
    })
    if (!job) return res.status(404).json({ error: 'Job not found' })
    res.json(job)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.post('/', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    const { title, location, type, department, description, requirements, salaryMin, salaryMax } = req.body
    let slug = slugify(title, { lower: true, strict: true })
    const existing = await prisma.jobListing.findUnique({ where: { slug } })
    if (existing) slug = `${slug}-${Date.now()}`

    const job = await prisma.jobListing.create({
      data: { title, slug, location, type, department, description, requirements, salaryMin, salaryMax },
    })
    res.status(201).json(job)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.put('/:id', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    const job = await prisma.jobListing.update({
      where: { id: req.params.id },
      data: req.body,
    })
    res.json(job)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.delete('/:id', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    await prisma.jobListing.delete({ where: { id: req.params.id } })
    res.json({ message: 'Job deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
