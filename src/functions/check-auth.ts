// This file details the policies for authentication,
// and provides a function for checking if a user is authenticated based on the current policy.

// The policies are sorted from most to least restrictive.
// Each consecutive step opens up Cue to more users,
// and those who match previous steps can still access the app.

// The policies are:
// 1. `INVITE_ONLY` — Only users with a valid invite code can access Cue
// 2. `USF_ONLY`    — Users with a USF email address or a valid invite code can access Cue
// 3. `EDU_ONLY`    — Users with an email address from an educational institution or a valid invite code can access Cue
// 4. `PUBLIC`      — Users with any email address can access Cue

// Example user:                  invited.student@gmail.com | student@dons.usfca.edu | student@berkeley.edu | student@gmail.com
// Can access with auth levels:   1, 2, 3, 4                | 2, 3, 4                | 3, 4                 | 4

// import { createUser } from './user-management'
// import { fetch, invalidate } from './invite-management'
import type { Session } from 'next-auth'

export enum policies {
  INVITE_ONLY = 1,
  USF_ONLY = 2,
  EDU_ONLY = 3,
  PUBLIC = 4
}
export const currentPolicy = policies.INVITE_ONLY

export default async function checkAuth (session: Session) {
  if (!session) return false
  const user = session.user

  /*
  if (currentPolicy >= policies.INVITE_ONLY)
    if (inviteCode) {
      const invite = await fetch(inviteCode)
      if (invite?.valid) {
        const userProperties = {}
        if (invite.conditions.includes('use-once'))
          await invalidate(inviteCode)
        if (invite.conditions.includes('no-invite'))
          userProperties.invitesRemaining = 0
        await createUser(userProperties)
        return true
      }
    }
  */

  if (currentPolicy >= policies.USF_ONLY) {
    const email = user.email.toLowerCase()
    if (email.endsWith('@dons.usfca.edu'))
      // await createUser()
      return true
  }

  if (currentPolicy >= policies.EDU_ONLY) {
    const email = user.email.toLowerCase()
    if (email.endsWith('.edu'))
      // await createUser()
      return true
  }

  if (currentPolicy >= policies.PUBLIC)
    // await createUser()
    return true

  return false
}
