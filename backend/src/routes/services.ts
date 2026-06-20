import { Router, Request, Response } from 'express'
import prisma from '../utils/prisma'
import { protect, adminOnly } from '../middleware/auth'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const services = (await prisma.service.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    })).map(s => ({ ...s, features: JSON.parse(s.features) }))
    res.json(services)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/all', protect, adminOnly, async (_req: Request, res: Response) => {
  try {
    const services = (await prisma.service.findMany({ orderBy: { order: 'asc' } }))
      .map(s => ({ ...s, features: JSON.parse(s.features) }))
    res.json(services)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.put('/:id', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    const data = { ...req.body }
    if (data.features && Array.isArray(data.features)) {
      data.features = JSON.stringify(data.features)
    }
    const service = await prisma.service.update({
      where: { id: req.params.id },
      data,
    })
    res.json({ ...service, features: JSON.parse(service.features) })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
