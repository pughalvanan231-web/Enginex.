import { Router, Request, Response } from 'express'
import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { protect, adminOnly } from '../middleware/auth'

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'uploads/'),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${uuidv4()}${ext}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg|pdf|doc|docx/
    const ext = allowed.test(path.extname(file.originalname).toLowerCase())
    const mime = allowed.test(file.mimetype)
    cb(null, ext || mime)
  },
})

const router = Router()

router.post('/', protect, adminOnly, upload.single('file'), (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
    const url = `/uploads/${req.file.filename}`
    res.json({ url, filename: req.file.filename, size: req.file.size })
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' })
  }
})

router.post('/multiple', protect, adminOnly, upload.array('files', 10), (req: Request, res: Response) => {
  try {
    const files = (req.files as Express.Multer.File[]).map(f => ({
      url: `/uploads/${f.filename}`,
      filename: f.filename,
      size: f.size,
    }))
    res.json({ files })
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' })
  }
})

export default router
