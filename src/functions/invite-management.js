import { kv } from '@vercel/kv'

export async function getAllCodes () {
  const inviteKeys = await kv.keys('invite:*')
  const inviteCodes = []
  for (const inviteKey of inviteKeys) {
    const inviteCode = inviteKey.split(':')[1]
    inviteCodes.push(inviteCode)
  }
  return inviteCodes
}

export async function fetch (inviteCode) {
  const invite = await kv.hgetall(`invite:${inviteCode}`)
  if (!invite) return null
  return invite
}

export async function invalidate (inviteCode) {
  const invite = await kv.hgetall(`invite:${inviteCode}`)
  if (!invite) return null
  await kv.hset(`invite:${inviteCode}`, { valid: false })
  return invite
}

export async function remove (inviteCode) {
  const invite = await kv.hgetall(`invite:${inviteCode}`)
  if (!invite) return null
  await kv.del(`invite:${inviteCode}`)
  return invite
}
