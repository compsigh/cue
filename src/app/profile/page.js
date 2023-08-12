// Next imports
import { redirect } from 'next/navigation'

// Auth imports
import { getUser } from '@/functions/user-management'
import checkAuth from '@/functions/check-auth'

// Style imports
import styles from './Profile.module.scss'

// Component imports
import ProfileCard from '@/components/ProfileCard/ProfileCard'
import Sidebar from '@/components/Sidebar/Sidebar'

export default async function Profile ({ searchParams }) {
  const user = await getUser()

  const authRequest = {}
  authRequest.user = user

  const inviteCode = searchParams?.inviteCode
  if (inviteCode)
    authRequest.inviteCode = inviteCode

  const authed = await checkAuth(authRequest)
  if (!authed)
    redirect('/')

  return (
    <>
      <Sidebar user={user} path={'/profile'} />
      <div className={styles.profileCard}>
        <ProfileCard user={user} />
      </div>
    </>
  )
}
