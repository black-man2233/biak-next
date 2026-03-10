export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event).catch(() => ({}))

  // Delete specific IDs
  if (Array.isArray(body?.ids) && body.ids.length > 0) {
    await prisma.sermon.deleteMany({ where: { id: { in: body.ids } } })
    return { deleted: body.ids.length }
  }

  // Delete all
  const { count } = await prisma.sermon.deleteMany()
  return { deleted: count }
})
