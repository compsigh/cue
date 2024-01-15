'use client'

// Next imports
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

// Auth
import { signOut } from 'next-auth/react'

// Component imports
import { Button } from '@/components/Button/Button'

// Style imports
import styles from './ProfileCard.module.scss'

export function ProfileCard ({ user }) {
  // Clear invite code search param
  const router = useRouter()
  const routerRef = useRef(router)
  useEffect(() => {
    routerRef.current.replace('/profile', { shallow: true })
  }, [])

  const name = user.sessionData.name
  const email = user.sessionData.email
  const invitesRemaining = user.userData.invitesRemaining

  return (
    <div className={styles.profileCard}>
      <div className={styles.profileCardImage}>
        <Image
          src={user.sessionData.picture}
          alt="Profile Picture"
          width={110}
          height={110}
        />
      </div>
      <div className={styles.profileCardInfo}>
        <h1 className={styles.name}>{name}</h1>
        <p className={styles.email}>{email}</p>
        <p className={styles.invitesRemaining}>{invitesRemaining} {invitesRemaining === 1 ? 'invite' : 'invites'} remaining</p>
      </div>

      <div className={styles.actions}>
        {/* <Button
          type={'primary'}
          onClick={() => router.push('/saved')}
          text="View saved cues"
        /> */}
        <Button
          type={'primary'}
          onClick={() => signOut()}
          text="Sign out"
        />
      </div>
    </div>
  )
}