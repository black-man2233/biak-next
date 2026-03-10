export default defineEventHandler(() =>
  prisma.featuredCard.findMany({ orderBy: { order: 'asc' } })
)
