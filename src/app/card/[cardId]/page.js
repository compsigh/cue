import connect from '@/functions/db-connect.js'
import InviteCode from '@/schemas/invite-code-schema.js'
import { redirect } from 'next/navigation'

export default async function Card ({ params }) {
  // Get the card from the database
  const { cardId } = params
  await connect()
  const card = await InviteCode.findOne({ inviteId: cardId })

  // If the card exists, redirect to the invite code page associated with it
  if (card)
    redirect(`/invite/${card.code}`)

  // Otherwise, render that the card doesn't exist
  return (
    <div>
      <h1>Sorry, that card does not exist!</h1>
    </div>
  )
}
