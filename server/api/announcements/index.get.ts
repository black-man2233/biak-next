export default defineEventHandler(async () => {
  return prisma.announcement.findMany({ orderBy: { createdAt: 'desc' } })
})
