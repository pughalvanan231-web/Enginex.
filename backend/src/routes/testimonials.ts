import { Router, Request, Response } from 'express'
import prisma from '../utils/prisma'
import { protect, adminOnly, AuthRequest } from '../middleware/auth'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { featured: true },
      orderBy: { createdAt: 'desc' },
    })
    res.json(testimonials)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/all', protect, adminOnly, async (_req: Request, res: Response) => {
  try {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(testimonials)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.post('/', protect, adminOnly, async (req: AuthRequest, res: Response) => {
  try {
    const { name, photo, designation, company, content, rating, featured } = req.body
    const testimonial = await prisma.testimonial.create({
      data: { name, photo, designation, company, content, rating: rating || 5, featured: featured || false, authorId: req.user!.id },
    })
    res.status(201).json(testimonial)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.put('/:id', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    const testimonial = await prisma.testimonial.update({
      where: { id: req.params.id },
      data: req.body,
    })
    res.json(testimonial)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.delete('/:id', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    await prisma.testimonial.delete({ where: { id: req.params.id } })
    res.json({ message: 'Testimonial deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
