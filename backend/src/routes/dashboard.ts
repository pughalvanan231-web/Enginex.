import { Router, Response } from 'express'
import prisma from '../utils/prisma'
import { protect, adminOnly, AuthRequest } from '../middleware/auth'

const router = Router()

router.get('/', protect, adminOnly, async (_req: AuthRequest, res: Response) => {
  try {
    const [projects, blogs, leads, testimonials, jobs, messages, applications, recentLeads, recentMessages] = await Promise.all([
      prisma.project.count(),
      prisma.blog.count(),
      prisma.lead.count(),
      prisma.testimonial.count(),
      prisma.jobListing.count({ where: { active: true } }),
      prisma.contactMessage.count(),
      prisma.application.count(),
      prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
      prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    ])

    const monthlyLeads = await prisma.$queryRaw`
      SELECT DATE_TRUNC('month', created_at) as month, COUNT(*)::int as count
      FROM leads
      WHERE created_at >= NOW() - INTERVAL '12 months'
      GROUP BY month ORDER BY month
    `

    res.json({
      stats: { projects, blogs, leads, testimonials, jobs, messages, applications },
      recentLeads,
      recentMessages,
      monthlyLeads,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
