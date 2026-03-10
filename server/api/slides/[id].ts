export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = getRouterParam(event, 'id')!
  const method = getMethod(event)

  if (method === 'PUT' || method === 'PATCH') {
    const body = await readBody(event)
    return prisma.slideImage.update({
      where: { id },
      data: { url: body.url, caption: body.caption ?? null, order: body.order ?? undefined },
    })
  }
  if (method === 'DELETE') {
    await prisma.slideImage.delete({ where: { id } })
    return { ok: true }
  }
})
