// Next imports
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

// Component imports
import SignInButton from '@/components/Button/SignInButton'

// Style imports
import styles from '@/styles/Home.module.scss'

export default async function Home () {
  const session = await getServerSession()

  if (session)
    redirect('/profile')

  return (
    <div className={styles.center}>
      <h1>Cue</h1>
      <SignInButton />
    </div>
  )
}
