// Next imports
import { redirect } from 'next/navigation'

// Auth imports
// import { getUser } from '@/functions/user-management'
import { auth } from 'auth'
import { checkAuth } from '@/functions/check-auth'

// Style imports
import styles from './Profile.module.scss'

// Component imports
import ProfileCard from '@/components/ProfileCard/ProfileCard'
import Sidebar from '@/components/Sidebar/Sidebar'

export default async function Profile () {
  // let user = await getUser()
  const session = await auth()

  const authed = await checkAuth(session)
  if (!authed)
    redirect('/')
  const user = session.user

  return (
    <>
      <Sidebar user={user} path={'/profile'} />
      <div className={styles.profileCard}>
        <ProfileCard user={user} />
      </div>
    </>
  )
}
