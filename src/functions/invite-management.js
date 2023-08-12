// TODO: implement for /redeem

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

export async function validate (inviteCode) {
  const invite = await kv.hgetall(`invite:${inviteCode}`)
  if (!invite) return null
  for (const condition of invite.conditions)
    if (condition === 'use-once')
      await kv.hset(`invite:${inviteCode}`, 'valid', false)
  return invite
}
