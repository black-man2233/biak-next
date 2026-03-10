export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)
  if (!body.url) throw createError({ statusCode: 400, message: 'url required' })
  const max = await prisma.slideImage.aggregate({ _max: { order: true } })
  return prisma.slideImage.create({
    data: { url: body.url, caption: body.caption ?? null, page: body.page ?? 'home', order: (max._max.order ?? -1) + 1 },
  })
})
