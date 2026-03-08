export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)
  if (!body.key) throw createError({ statusCode: 400, message: 'key is required' })

  return prisma.churchInfo.upsert({
    where: { key: body.key },
    update: { value: body.value ?? '' },
    create: { key: body.key, value: body.value ?? '' },
  })
})
