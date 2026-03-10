import { writeFile, mkdir } from 'node:fs/promises'
import { join, extname } from 'node:path'

const ALLOWED = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'])
const MAX_BYTES = 10 * 1024 * 1024 // 10 MB

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const parts = await readMultipartFormData(event)
  const filePart = parts?.find(p => p.name === 'file')
  if (!filePart?.filename || !filePart.data) {
    throw createError({ statusCode: 400, message: 'No file provided' })
  }

  const ext = extname(filePart.filename).toLowerCase()
  if (!ALLOWED.has(ext)) {
    throw createError({ statusCode: 400, message: 'File type not allowed' })
  }
  if (filePart.data.length > MAX_BYTES) {
    throw createError({ statusCode: 400, message: 'File too large (max 10 MB)' })
  }

  const dataDir = process.env.DATA_DIR ?? '/app/data'
  const uploadsDir = join(dataDir, 'uploads')
  await mkdir(uploadsDir, { recursive: true })

  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`
  await writeFile(join(uploadsDir, filename), filePart.data)

  return { url: `/uploads/${filename}` }
})
