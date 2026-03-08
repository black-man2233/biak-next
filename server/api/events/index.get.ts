export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const showAll = query.all === '1'

  const now = new Date()
  now.setHours(0, 0, 0, 0)

  return prisma.event.findMany({
    where: showAll ? {} : { date: { gte: now } },
    orderBy: { date: 'asc' },
  })
})
