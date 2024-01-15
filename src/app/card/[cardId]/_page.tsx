// import { kv } from '@vercel/kv'
// import { redirect } from 'next/navigation'
// import { getAllCodes } from '@/functions/invite-management'

/**
 * @deprecated Do not render this page until we get the invite system back up.
 */
/*
export default async function Card ({ params }) {
  const { cardId } = params
  const inviteCodes = await getAllCodes()
  for (const inviteCode of inviteCodes) {
    // const inviteCardId = await kv.hget(`invite:${inviteCode}`, 'cardId')
    const inviteCardId = 1
    if (inviteCardId === Number(cardId))
      return redirect(`/invite/${inviteCode}`)
  }

  return (
    <div>
      <h1>Sorry, that card does not exist!</h1>
    </div>
  )
}
*/
