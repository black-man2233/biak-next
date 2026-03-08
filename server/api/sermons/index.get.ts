export default defineEventHandler(async () => {
  return prisma.sermon.findMany({ orderBy: { date: 'desc' } })
})
