export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = getRouterParam(event, 'id')!
  const method = getMethod(event)

  if (method === 'PUT' || method === 'PATCH') {
    const body = await readBody(event)
    return prisma.leader.update({
      where: { id },
      data: {
        name: body.name,
        role: body.role,
        bio: body.bio ?? null,
        imageUrl: body.imageUrl ?? null,
        isActive: body.isActive ?? undefined,
        order: body.order ?? undefined,
      },
    })
  }
  if (method === 'DELETE') {
    await prisma.leader.delete({ where: { id } })
    return { ok: true }
  }
})
