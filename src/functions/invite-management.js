import { connect } from '@/functions/db-connect.js'
import InviteCode from '@/schemas/invite-code-schema'

export async function validate (invite) {
  const inviteStatus = {}
  await connect()
  const inviteCode = await InviteCode.findOne({ code: invite })
  if (!inviteCode) inviteStatus.valid = false
  if (!inviteCode?.valid) inviteStatus.valid = false
  for (const condition of inviteCode?.conditions) {
    if (condition === 'use-once') {
      inviteCode.valid = false
      await inviteCode.save()
    }
    if (condition === 'no-invite')
      inviteStatus.noInvite = true
  }
  inviteStatus.valid = true
  return inviteStatus
}
