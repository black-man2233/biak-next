import type { H3Event } from 'h3'

export async function requireAdmin(event: H3Event) {
  const config = useRuntimeConfig()
  const session = await useSession(event, { password: config.sessionSecret })
  if (!session.data?.admin) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }
  return session
}
