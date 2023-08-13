import { getSessionData } from '@/functions/user-management'
import { redirect } from 'next/navigation'
import { fetch } from '@/functions/invite-management'
import SignInButton from '@/components/Button/SignInButton'
import styles from './Invite.module.scss'

export default async function Card ({ params }) {
  const sessionData = await getSessionData()
  if (sessionData)
    return redirect('/profile')

  const { inviteCode } = params
  const invite = await fetch(inviteCode)

  if (!invite)
    return (
      <div className={styles.invite}>
        <h1>Sorry, that invite code does not exist!</h1>
      </div>
    )

  if (!invite.valid)
    return (
      <div className={styles.invite}>
        <h1>Sorry, that invite code is no longer valid!</h1>
      </div>
    )

  const conditionExplanations = {
    'no-invite': "you won't be able to invite others to use Cue just yet.",
    expires: "this invite code will expire on January 1st, 2024. (It's very likely we'll release Cue well before this date.)",
    'use-once': "this invite code is valid only once — please make sure you're signing up with the Google account you'd like to use with Cue."
  }

  return (
    <div className={styles.invite}>
      <h1>Welcome to Cue</h1>
      <h2>Invite code <code>{inviteCode}</code></h2>
      <div>
        <h3>To redeem, you can either:</h3>
        <ul>
          <li>Sign in below to accept and associate your Google account with the invite; or</li>
          <li>If you&apos;d like to redeem on a different device, head to the Redeem page (https://app.cue.study/redeem) and enter code <code>{inviteCode}</code>.</li>
        </ul>
      </div>

      {invite.conditions && invite.conditions.length > 0 && (
        <div>
          <h3>Please note the following about your invite:</h3>
          <ul>
            {invite.conditions.map((condition, index) => (
              <li key={index}><code>{condition}</code>: {conditionExplanations[condition]}</li>
            ))}
          </ul>
        </div>
      )}

      <SignInButton callbackUrl={`/profile?inviteCode=${inviteCode}`} />
    </div>
  )
}
