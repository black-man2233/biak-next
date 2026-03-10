export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)
  if (!body.title) throw createError({ statusCode: 400, message: 'title required' })
  const max = await prisma.featuredCard.aggregate({ _max: { order: true } })
  return prisma.featuredCard.create({
    data: {
      title: body.title,
      subtitle: body.subtitle ?? null,
      description: body.description ?? null,
      imageUrl: body.imageUrl ?? null,
      icon: body.icon ?? null,
      order: (max._max.order ?? -1) + 1,
      isActive: body.isActive ?? true,
    },
  })
})
