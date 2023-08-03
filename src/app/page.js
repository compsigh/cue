// Next imports
import { getUser } from '@/functions/user-management'
import checkAuth from '@/functions/check-auth'
import { redirect } from 'next/navigation'

// Component imports
import SignInButton from '@/components/Button/SignInButton'

// Style imports
import styles from '@/styles/Home.module.scss'

export default async function Home () {
  const user = await getUser()
  const authed = await checkAuth({ user })

  if (authed)
    redirect('/profile')

  return (
    <div className={styles.center}>
      <h1>Cue</h1>
      <SignInButton />
    </div>
  )
}
