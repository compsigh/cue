import connect from '@/functions/db-connect.js'
import InviteCode from '@/schemas/invite-code-schema.js'

export default function Card () {
  return (
    <div>
      <h1>Sorry, that card does not exist!</h1>
    </div>
  )
}

export async function getServerSideProps (context) {
  // Get the card from the database
  const { cardId } = context.params
  await connect()
  const card = await InviteCode.findOne({ inviteId: cardId })

  // Redirect to the invite code page associated with the card
  if (card)
    return {
      redirect: {
        destination: `/invite/${card.code}`,
        permanent: false
      }
    }

  // Otherwise, render that the card doesn't exist
  return {
    props: {}
  }
}
