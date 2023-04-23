// Next imports
import Head from 'next/head'
import { getServerSession } from 'next-auth/next'
import { useState } from 'react'
import { useRouter } from 'next/router'

// Style imports
import styles from '@/styles/Redeem.module.scss'

export default function Redeem () {
const [inviteCode, setInviteCode] = useState('')
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Redeem Invite | Cue</title>
        <meta name="description" content="Redeem an invite to Cue: Study with AI-powered active recall" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.center}>
          <h1>Redeem Cue Invite</h1>
          <p>To redeem your invite, please enter the code below:</p>
          <form>
            <input
              type="text"
              name="inviteCode"
              placeholder="Invite code"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
            />
            <button type="submit" onClick={(e) => {
              e.preventDefault()
              router.push(`/invite/${inviteCode}`)}}>
            </button>
          </form>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps (context) {
  const session = await getServerSession(context.req, context.res)

  if (session)
    return {
      redirect: {
        destination: '/profile',
        permanent: false
      }
    }

  return {
    props: {
      session
    }
  }
}
