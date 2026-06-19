import { Router, Request, Response } from 'express'
import prisma from '../utils/prisma'
import { protect, adminOnly } from '../middleware/auth'

const router = Router()

router.get('/', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    const { page = '1', limit = '20' } = req.query
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string)
    const take = parseInt(limit as string)

    const [messages, total] = await Promise.all([
      prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, skip, take }),
      prisma.contactMessage.count(),
    ])

    res.json({ messages, total, pages: Math.ceil(total / take), page: parseInt(page as string) })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, company, subject, message } = req.body
    const contact = await prisma.contactMessage.create({
      data: { name, email, phone, company, subject, message },
    })
    res.status(201).json(contact)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.put('/:id/read', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    const message = await prisma.contactMessage.update({
      where: { id: req.params.id },
      data: { read: true },
    })
    res.json(message)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.delete('/:id', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    await prisma.contactMessage.delete({ where: { id: req.params.id } })
    res.json({ message: 'Message deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
