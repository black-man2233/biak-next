export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!
  const method = getMethod(event)

  if (method === 'PUT' || method === 'PATCH') {
    await requireAdmin(event)
    const body = await readBody(event)
    return prisma.announcement.update({
      where: { id },
      data: { title: body.title, content: body.content, isActive: body.active },
    })
  }

  if (method === 'DELETE') {
    await requireAdmin(event)
    await prisma.announcement.delete({ where: { id } })
    return { ok: true }
  }

  return prisma.announcement.findUniqueOrThrow({ where: { id } })
})
