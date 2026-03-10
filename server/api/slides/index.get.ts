export default defineEventHandler(() =>
  prisma.slideImage.findMany({ orderBy: { order: 'asc' } })
)
