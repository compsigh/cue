'use client'

// Next imports
import { signOut } from 'next-auth/react'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { redirect } from 'next/navigation'

// Database imports
import connect from '@/functions/db-connect'
import InviteCode from '@/schemas/invite-code-schema'
import User from '@/schemas/user-schema'
import { checkAuth } from '@/functions/check-auth'

// Style imports
import styles from './Profile.module.scss'

// Component imports
import ProfileCard from '@/components/ProfileCard/ProfileCard'

export default async function Profile ({ params }) {
  const user = await fetch('/api/user')
  user = await user.json()
  if (!user.ok)
    redirect('/')

  const { query } = params
  const inviteCode = query?.code
  let invite = null
  if (inviteCode) {
    await connect()
    invite = await InviteCode.findOne({ inviteCode })
  }
  if (invite)
    user.invite = invite

  const authed = await checkAuth(user)
  if (!authed)
    redirect('/api/auth/signin?error=accessDenied')

  // Clear invite code
  const router = useRouter()
  const routerRef = useRef(router)
  useEffect(() => {
    routerRef.current.replace('/profile', undefined, { shallow: true })
  }, [])

  return (
    <div className={styles.profileCard}>
      <ProfileCard user={user} signOut={signOut} />
    </div>
  )
}

export async function getServerSideProps (context) {

  /**
   * If:
   * 1) The user doesn't exist and is a student at USF; or
   * 2) The user doesn't exist and has a valid invite code...
   *
   * Then:
   * 1) Invalidate the invite code if it exists; and
   * 2) Create a new user.
   */
  if ((!userData && sessionData?.email.includes('@dons.usfca.edu')) || (!userData && invite?.valid)) {
    let invitesRemaining = 1
    if (invite?.valid)
      for (const condition of invite.conditions) {
        if (condition === 'no-invite')
          invitesRemaining = 0
        if (condition === 'use-once') {
          invite.valid = false
          await invite.save()
        }
      }

    await connect()
    await User.create({
      googleId: result.id,
      cues: [],
      invitesRemaining
    })

    return {
      props: {
        user: {
          ...sessionData,
          ...userData
        }
      }
    }
  }

  // If the user doesn't have permission to access the page, redirect them to the access denied page
  if (sessionData)
    return {
      redirect: {
        destination: '/api/auth/signin?error=accessDenied',
        permanent: false
      }
    }

}
