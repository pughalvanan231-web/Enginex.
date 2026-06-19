import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import projectRoutes from './routes/projects'
import blogRoutes from './routes/blog'
import leadRoutes from './routes/leads'
import testimonialRoutes from './routes/testimonials'
import jobRoutes from './routes/jobs'
import applicationRoutes from './routes/applications'
import contactRoutes from './routes/contact'
import serviceRoutes from './routes/services'
import dashboardRoutes from './routes/dashboard'
import uploadRoutes from './routes/upload'
import settingsRoutes from './routes/settings'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(compression())
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }))
app.use(morgan('dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
})
app.use('/api/auth', limiter)

app.use('/uploads', express.static('uploads'))

app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/leads', leadRoutes)
app.use('/api/testimonials', testimonialRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/applications', applicationRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/settings', settingsRoutes)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.listen(PORT, () => {
  console.log(`EngineX API running on port ${PORT}`)
})

export default app
