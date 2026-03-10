export default defineEventHandler((event) => {
  const page = getQuery(event).page as string | undefined
  return prisma.slideImage.findMany({
    where: page ? { page } : undefined,
    orderBy: { order: 'asc' },
  })
})
