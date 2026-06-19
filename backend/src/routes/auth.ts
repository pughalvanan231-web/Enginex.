import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../utils/prisma'
import { protect, AuthRequest } from '../middleware/auth'
import { z } from 'zod'

const router = Router()

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body)

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors })
    }
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/me', protect, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user?.id },
      select: { id: true, email: true, name: true, role: true, avatar: true, createdAt: true },
    })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.put('/profile', protect, async (req: AuthRequest, res: Response) => {
  try {
    const { name, email } = req.body
    const user = await prisma.user.update({
      where: { id: req.user?.id },
      data: { name, email },
      select: { id: true, email: true, name: true, role: true, avatar: true },
    })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.put('/password', protect, async (req: AuthRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body
    const user = await prisma.user.findUnique({ where: { id: req.user?.id } })
    if (!user) return res.status(404).json({ error: 'User not found' })

    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) return res.status(400).json({ error: 'Current password is incorrect' })

    const hashedPassword = await bcrypt.hash(newPassword, 12)
    await prisma.user.update({
      where: { id: req.user?.id },
      data: { password: hashedPassword },
    })

    res.json({ message: 'Password updated successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
