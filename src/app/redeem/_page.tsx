'use client'

// Next imports
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Style imports
import styles from './Redeem.module.scss'

/**
 * @deprecated Do not render this page until we get the invite system back up.
 */
export default function Redeem () {
  const [inviteCode, setInviteCode] = useState('')
  const router = useRouter()

  return (
    <>
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
              router.push(`/invite/${inviteCode}`)
            }}>
            </button>
          </form>
        </div>
      </main>
    </>
  )
}
