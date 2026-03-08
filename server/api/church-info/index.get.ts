export default defineEventHandler(async () => {
  const rows = await prisma.churchInfo.findMany()
  return Object.fromEntries(rows.map(r => [r.key, r.value]))
})
