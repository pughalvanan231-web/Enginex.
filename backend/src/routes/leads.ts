import { Router, Request, Response } from 'express'
import prisma from '../utils/prisma'
import { protect, adminOnly } from '../middleware/auth'

const router = Router()

router.get('/', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    const { status, priority, search, page = '1', limit = '20' } = req.query
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string)
    const take = parseInt(limit as string)
    const where: any = {}
    if (status && status !== 'all') where.status = status
    if (priority && priority !== 'all') where.priority = priority
    if (search) where.OR = [
      { name: { contains: search as string, mode: 'insensitive' } },
      { email: { contains: search as string, mode: 'insensitive' } },
      { company: { contains: search as string, mode: 'insensitive' } },
    ]

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take }),
      prisma.lead.count({ where }),
    ])

    res.json({ leads, total, pages: Math.ceil(total / take), page: parseInt(page as string) })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/stats', protect, adminOnly, async (_req: Request, res: Response) => {
  try {
    const [total, newLeads, contacted, proposalSent, won, lost] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: 'NEW' } }),
      prisma.lead.count({ where: { status: 'CONTACTED' } }),
      prisma.lead.count({ where: { status: 'PROPOSAL_SENT' } }),
      prisma.lead.count({ where: { status: 'WON' } }),
      prisma.lead.count({ where: { status: 'LOST' } }),
    ])
    res.json({ total, new: newLeads, contacted, proposalSent, won, lost })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/:id', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    const lead = await prisma.lead.findUnique({ where: { id: req.params.id } })
    if (!lead) return res.status(404).json({ error: 'Lead not found' })
    res.json(lead)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, company, budget, projectType, message, source } = req.body
    const lead = await prisma.lead.create({
      data: { name, email, phone, company, budget, projectType, message, source },
    })
    res.status(201).json(lead)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.put('/:id', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    const { status, priority, notes, converted } = req.body
    const lead = await prisma.lead.update({
      where: { id: req.params.id },
      data: { status, priority, notes, converted },
    })
    res.json(lead)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.delete('/:id', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    await prisma.lead.delete({ where: { id: req.params.id } })
    res.json({ message: 'Lead deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
