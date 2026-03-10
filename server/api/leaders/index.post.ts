export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)
  if (!body.name || !body.role) throw createError({ statusCode: 400, message: 'name and role required' })
  const max = await prisma.leader.aggregate({ _max: { order: true } })
  return prisma.leader.create({
    data: {
      name: body.name,
      role: body.role,
      bio: body.bio ?? null,
      imageUrl: body.imageUrl ?? null,
      order: (max._max.order ?? -1) + 1,
    },
  })
})
