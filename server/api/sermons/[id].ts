export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!
  const method = getMethod(event)

  if (method === 'PUT' || method === 'PATCH') {
    await requireAdmin(event)
    const body = await readBody(event)
    return prisma.sermon.update({
      where: { id },
      data: {
        title: body.title,
        speaker: body.speaker ?? '',
        date: body.date ? new Date(body.date) : undefined,
        description: body.description ?? '',
        videoUrl: body.videoUrl ?? null,
      },
    })
  }

  if (method === 'DELETE') {
    await requireAdmin(event)
    await prisma.sermon.delete({ where: { id } })
    return { ok: true }
  }

  return prisma.sermon.findUniqueOrThrow({ where: { id } })
})
