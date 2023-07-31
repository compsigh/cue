// Next imports
import { getSessionData } from '@/functions/user-management'
import { redirect } from 'next/navigation'

// Component imports
import SignInButton from '@/components/Button/SignInButton'

// Style imports
import styles from '@/styles/Home.module.scss'

export default async function Home () {
  const sessionData = await getSessionData()

  if (sessionData)
    redirect('/profile')

  return (
    <div className={styles.center}>
      <h1>Cue</h1>
      <SignInButton />
    </div>
  )
}
