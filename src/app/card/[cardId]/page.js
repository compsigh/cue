import { kv } from '@vercel/kv'
import { redirect } from 'next/navigation'

export default async function Card ({ params }) {
  const { cardId } = params
  const invites = await kv.keys('invite:*')
  for (const invite of invites) {
    const inviteCode = invite.split(':')[1]
    const inviteData = await kv.hgetall(invite)
    if (inviteData.cardId === Number(cardId))
      return redirect(`/invite/${inviteCode}`)
  }

  return (
    <div>
      <h1>Sorry, that card does not exist!</h1>
    </div>
  )
}
