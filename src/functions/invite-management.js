import connect from '@/functions/db-connect.js'
import Invite from '@/schemas/invite-schema'
// TODO: Migrate invites to Vercel KV

export async function validate (inviteCode) {
  const inviteStatus = {}
  await connect()
  const invite = await Invite.findOne({ code: inviteCode })
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
