import { kv } from '@vercel/kv'
import { redirect } from 'next/navigation'
import { getAllCodes } from '@/functions/invite-management'

export default async function Card ({ params }) {
  const { cardId } = params
  const inviteCodes = await getAllCodes()
  for (const inviteCode of inviteCodes) {
    const inviteCardId = await kv.hget(`invite:${inviteCode}`, 'cardId')
    if (inviteCardId === Number(cardId))
      return redirect(`/invite/${inviteCode}`)
  }

  return (
    <div>
      <h1>Sorry, that card does not exist!</h1>
    </div>
  )
}
