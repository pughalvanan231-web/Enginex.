import { Router, Request, Response } from 'express'
import prisma from '../utils/prisma'
import { protect, adminOnly } from '../middleware/auth'

const router = Router()

router.get('/', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    const { status, jobId, page = '1', limit = '20' } = req.query
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string)
    const take = parseInt(limit as string)
    const where: any = {}
    if (status && status !== 'all') where.status = status
    if (jobId) where.jobId = jobId

    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where, include: { job: { select: { title: true, slug: true } } },
        orderBy: { createdAt: 'desc' }, skip, take,
      }),
      prisma.application.count({ where }),
    ])

    res.json({ applications, total, pages: Math.ceil(total / take), page: parseInt(page as string) })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, resumeUrl, coverLetter, jobId } = req.body
    const application = await prisma.application.create({
      data: { name, email, phone, resumeUrl, coverLetter, jobId },
    })
    res.status(201).json(application)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.put('/:id', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    const application = await prisma.application.update({
      where: { id: req.params.id },
      data: { status: req.body.status },
    })
    res.json(application)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.delete('/:id', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    await prisma.application.delete({ where: { id: req.params.id } })
    res.json({ message: 'Application deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
