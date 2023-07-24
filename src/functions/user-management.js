// Next imports
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route.js'

// Database imports
import connect from '@/functions/db-connect.js'
import User from '@/schemas/user-schema.js'

export async function getSessionData () {
  const session = await getServerSession(authOptions)
  if (!session) return null
  const sessionData = session.user

  return sessionData
}

export async function getUserData () {
  const sessionData = await getSessionData()
  if (!sessionData) return null

  // Search the database for the user's ID
  await connect()
  const userData = await User.findOne({ googleId: sessionData.id })

  return userData
}

export async function getUser () {
  const sessionData = await getSessionData()
  let userData = await getUserData()
  userData = JSON.parse(JSON.stringify(userData))

  // Associate the user's session data with the user's database data and return as one object
  return {
    sessionData: sessionData || null,
    userData: userData || null
  }
}

export async function createUser () {
  const { sessionData, userData } = await getUser()
  if (userData) return null

  await connect()
  const newUser = await User.create({
    googleId: sessionData.id,
    cues: []
    // TODO: invitesRemaining
  })
  return newUser
}
