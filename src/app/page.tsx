// Next imports
// import { getUser } from '@/functions/user-management'
import { checkAuth } from '@/functions/check-auth'
import { redirect } from 'next/navigation'

// Component imports
import SignInButton from '@/components/Button/SignInButton'

// Style imports
import styles from '@/styles/Home.module.scss'
import { auth } from 'auth'

export default async function Home () {
  // const user = await getUser()
  const session = await auth()
  const authed = await checkAuth(session)

  if (authed)
    redirect('/profile')

  return (
    <div className={styles.center}>
      <h1>Cue</h1>
      <SignInButton callbackUrl='/profile' />
    </div>
  )
}
