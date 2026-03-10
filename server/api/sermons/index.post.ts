export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)

  if (!body.title) {
    throw createError({ statusCode: 400, message: 'Title is required' })
  }

  return prisma.sermon.create({
    data: {
      title: body.title,
      speaker: body.speaker ?? '',
      date: body.date ? new Date(body.date) : new Date(),
      description: body.description ?? '',
      videoUrl: body.videoUrl ?? null,
      imageUrl: body.imageUrl ?? null,
    },
  })
})
