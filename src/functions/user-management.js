// Next imports
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route.js'

// Database imports
import connect from '@/functions/db-connect.js'
import User from '@/schemas/user-schema.js'

export async function getUser () {
  const session = await getServerSession(authOptions)
  if (!session) return null
  const sessionData = session.user

  // Search the database for the user's ID
  await connect()
  const user = await User.findOne({ googleId: sessionData.id })

  // Associate the user's session data with the user's database data and return as one object
  const userData = JSON.parse(JSON.stringify(user))
  return {
    sessionData: sessionData || null,
    userData: userData || null
  }
}

export async function createUser () {
  const user = await getUser()
  if (!user) return null

  await connect()
  const newUser = await User.create({
    googleId: user.sessionData.id,
    cues: []
    // TODO: invitesRemaining
  })
  return newUser
}
