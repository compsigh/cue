'use client'

// Next imports
import { signOut } from 'next-auth/react'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { redirect } from 'next/navigation'

// Auth imports
import { getUser } from '@/functions/user-management'
import { checkAuth } from '@/functions/check-auth'

// Style imports
import styles from './Profile.module.scss'

// Component imports
import ProfileCard from '@/components/ProfileCard/ProfileCard'

export default async function Profile ({ params }) {
  const user = await getUser()
  if (!user.sessionData || !user.userData)
    redirect('/')

  const authRequest = {}
  authRequest.user = user

  const { query } = params
  const inviteCode = query?.code
  if (inviteCode)
    authRequest.inviteCode = inviteCode

  const authed = await checkAuth(authRequest)
  if (!authed)
    redirect('/api/auth/signin?error=accessDenied')

  // Clear invite code param
  const router = useRouter()
  const routerRef = useRef(router)
  useEffect(() => {
    routerRef.current.replace('/profile', undefined, { shallow: true })
  }, [])

  return (
    <div className={styles.profileCard}>
      <ProfileCard user={user} signOut={signOut} />
      <Sidebar user={user} path={'/profile'} />
    </div>
  )
}
