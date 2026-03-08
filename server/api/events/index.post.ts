export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)

  if (!body.title || !body.date) {
    throw createError({ statusCode: 400, message: 'Title and date are required' })
  }

  return prisma.event.create({
    data: {
      title: body.title,
      description: body.description ?? '',
      date: new Date(body.date),
      startTime: body.startTime ?? null,
      endTime: body.endTime ?? null,
      location: body.location ?? '',
      category: body.category ?? 'general',
      imageUrl: body.imageUrl ?? null,
    },
  })
})
