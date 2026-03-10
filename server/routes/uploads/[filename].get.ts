import { readFile } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png', '.gif': 'image/gif',
  '.webp': 'image/webp', '.avif': 'image/avif',
}

export default defineEventHandler(async (event) => {
  const filename = basename(getRouterParam(event, 'filename') ?? '')
  if (!filename || filename.includes('..')) {
    throw createError({ statusCode: 400 })
  }

  const dataDir = process.env.DATA_DIR ?? '/app/data'
  const file = join(dataDir, 'uploads', filename)

  try {
    const data = await readFile(file)
    const mime = MIME[extname(filename).toLowerCase()] ?? 'application/octet-stream'
    setHeader(event, 'Content-Type', mime)
    setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
    return data
  } catch {
    throw createError({ statusCode: 404 })
  }
})
