import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const { password } = await readBody(event)
  const config = useRuntimeConfig()
  const adminPassword = config.adminPassword || 'admin123'

  let valid = false
  // Support bcrypt hashes (starting with $2) or plain text
  if (adminPassword.startsWith('$2')) {
    valid = await bcrypt.compare(password, adminPassword)
  } else {
    valid = password === adminPassword
  }

  if (!valid) {
    throw createError({ statusCode: 401, message: 'Invalid password' })
  }

  const session = await useSession(event, { password: config.sessionSecret })
  await session.update({ admin: true })
  return { ok: true }
})
