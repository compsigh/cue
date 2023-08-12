// This file details the policies for authentication,
// and provides a function for checking if a user is authenticated based on the current policy.

// The policies are sorted from most to least restrictive.
// Each consecutive step opens up Cue to more users,
// and those who match previous steps can still access the app.

// The policies are:
// 1. `invite-only` — Only users with a valid invite code can access Cue
// 2. `usf-only` — Users with a USF email address or a valid invite code can access Cue
// 3. `edu-only` — Users with an email address from an educational institution or a valid invite code can access Cue
// 4. `public` — Users with any email address can access Cue

// Example user:                  invited.student@gmail.com | student@dons.usfca.edu | student@berkeley.edu | student@gmail.com
// Can access with auth levels:   1, 2, 3, 4                | 2, 3, 4                | 3, 4                 | 4

import { createUser } from './user-management'
import { validate } from './invite-management'

export const authLevels = {
  'invite-only': 1,
  'usf-only': 2,
  'edu-only': 3,
  public: 4
}
export const currentPolicy = 'invite-only'
export const currentAuthLevel = authLevels[currentPolicy]

export default async function checkAuth ({ user, inviteCode }) {
  if (!user.sessionData)
    return false

  if (currentAuthLevel >= 1)
    if (inviteCode) {
      const invite = await validate(inviteCode)
      if (invite?.valid) {
        const userProperties = {}
        if (invite.conditions.includes('use-once'))
          userProperties.invitesRemaining = 0
        await createUser(userProperties)
        return true
      }
    }

  if (currentAuthLevel >= 2) {
    const email = user.sessionData.email.toLowerCase()
    if (email.endsWith('@dons.usfca.edu')) {
      await createUser()
      return true
    }
  }

  if (currentAuthLevel >= 3) {
    const email = user.sessionData.email.toLowerCase()
    if (email.endsWith('.edu'))
      return true
  }

  if (currentAuthLevel >= 4)
    return true

  return false
}
