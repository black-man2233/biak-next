export default defineEventHandler(() =>
  prisma.leader.findMany({ orderBy: { order: 'asc' } })
)
