export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!
  const method = getMethod(event)

  if (method === 'PUT' || method === 'PATCH') {
    await requireAdmin(event)
    const body = await readBody(event)
    return prisma.event.update({
      where: { id },
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
  }

  if (method === 'DELETE') {
    await requireAdmin(event)
    await prisma.event.delete({ where: { id } })
    return { ok: true }
  }

  return prisma.event.findUniqueOrThrow({ where: { id } })
})
