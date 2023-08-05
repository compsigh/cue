// TODO: implement for /redeem
// TODO: implement for /invite/[code]
// TODO: implement for /card/[cardId]

import { kv } from '@vercel/kv'

export async function validate (inviteCode) {
  const inviteStatus = {}
  const invite = await kv.hgetall(`invite:${inviteCode}`)
  if (!invite) inviteStatus.valid = false
  if (!invite?.valid) inviteStatus.valid = false
  for (const condition of invite?.conditions) {
    if (condition === 'use-once') {
      invite.valid = false
      await invite.save()
    }
    if (condition === 'no-invite')
      inviteStatus.noInviteForwarding = true
  }
  inviteStatus.valid = true
  return inviteStatus
}
