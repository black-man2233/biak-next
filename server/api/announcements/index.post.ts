export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)

  if (!body.title || !body.content) {
    throw createError({ statusCode: 400, message: 'Title and content are required' })
  }

  return prisma.announcement.create({
    data: { title: body.title, content: body.content, isActive: body.active ?? true },
  })
})
