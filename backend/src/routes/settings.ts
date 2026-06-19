import { Router, Request, Response } from 'express'
import prisma from '../utils/prisma'
import { protect, adminOnly } from '../middleware/auth'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const settings = await prisma.setting.findMany()
    const obj: Record<string, string> = {}
    settings.forEach(s => { obj[s.key] = s.value })
    res.json(obj)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.put('/', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    const settings = req.body
    for (const [key, value] of Object.entries(settings)) {
      await prisma.setting.upsert({
        where: { key },
        update: { value: value as string },
        create: { key, value: value as string },
      })
    }
    res.json({ message: 'Settings updated' })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
