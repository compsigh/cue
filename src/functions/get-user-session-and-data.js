// Next imports
import { getServerSession } from 'next-auth/next'
import { getToken } from 'next-auth/jwt'

// Database imports
import connect from '@/functions/db-connect.js'
import User from '@/schemas/user-schema.js'

export default async function getUserSessionAndData(req, res) {
  const session = await getServerSession(req, res)
  if (!session) return null
  const sessionData = session?.user

  // Search the database for the user's ID
  await connect()
  const token = await getToken({ req })
  const user = await User.findOne({ googleId: token.sub })

  // Associate the user's session data with the user's database data and return as one object
  const userData = JSON.parse(JSON.stringify(user))
  return {
    sessionData: sessionData || null,
    userData: userData || null,
    id: token.sub || null
  }
}
