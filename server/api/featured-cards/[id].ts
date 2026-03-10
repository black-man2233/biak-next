export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = getRouterParam(event, 'id')!
  const method = getMethod(event)

  if (method === 'PUT' || method === 'PATCH') {
    const body = await readBody(event)
    return prisma.featuredCard.update({
      where: { id },
      data: {
        title: body.title,
        subtitle: body.subtitle ?? null,
        description: body.description ?? null,
        imageUrl: body.imageUrl ?? null,
        icon: body.icon ?? null,
        order: body.order ?? undefined,
        isActive: body.isActive ?? undefined,
      },
    })
  }
  if (method === 'DELETE') {
    await prisma.featuredCard.delete({ where: { id } })
    return { ok: true }
  }
})
