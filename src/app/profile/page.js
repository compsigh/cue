// Next imports
// import { useEffect, useRef } from 'react'
// import { useRouter } from 'next/router'
import { redirect } from 'next/navigation'

// Auth imports
import { getUser } from '@/functions/user-management'
import checkAuth from '@/functions/check-auth'

// Style imports
import styles from './Profile.module.scss'

// Component imports
import ProfileCard from '@/components/ProfileCard/ProfileCard'
import Sidebar from '@/components/Sidebar/Sidebar'

export default async function Profile ({ params }) {
  const user = await getUser()

  const authRequest = {}
  authRequest.user = user

  const { query } = params
  const inviteCode = query?.code
  if (inviteCode)
    authRequest.inviteCode = inviteCode

  const authed = await checkAuth(authRequest)
  if (!authed)
    redirect('/')

  // TODO: Clear invite code param
  // const router = useRouter()
  // const routerRef = useRef(router)
  // useEffect(() => {
  //   routerRef.current.replace('/profile', undefined, { shallow: true })
  // }, [])

  return (
    <div className={styles.profileCard}>
      <Sidebar user={user} path={'/profile'} />
      <ProfileCard user={user} />
    </div>
  )
}
