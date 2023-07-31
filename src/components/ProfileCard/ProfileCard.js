'use client'

// Next imports
import Image from 'next/image'

// Auth
import { signOut } from 'next-auth/react'

// Component imports
import Button from '@/components/Button/Button'

// Style imports
import styles from './ProfileCard.module.scss'

const ProfileCard = ({ user }) => {
  const name = user.sessionData.name
  const email = user.sessionData.email
  const invitesRemaining = user.userData.invitesRemaining

  return (
    <div className={styles.profileCard}>
      <div className={styles.profileCardImage}>
        <Image
          src={user.sessionData.image}
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

export default ProfileCard
