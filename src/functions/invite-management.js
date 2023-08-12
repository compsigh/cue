// TODO: implement for /redeem
// TODO: implement for /card/[cardId]

import { kv } from '@vercel/kv'

export async function validate (inviteCode) {
  const invite = await kv.hgetall(`invite:${inviteCode}`)
  if (!invite) return null
  for (const condition of invite.conditions)
    if (condition === 'use-once')
      await kv.hset(`invite:${inviteCode}`, 'valid', false)
  return invite
}
