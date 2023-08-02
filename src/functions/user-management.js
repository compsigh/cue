// NextAuth
import { auth } from '@/../auth'

// Database imports
import connect from '@/functions/db-connect.js'
import User from '@/schemas/user-schema.js'

export async function getSessionData () {
  const session = await auth()
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

export async function createUser (properties) {
  const { sessionData, userData } = await getUser()
  if (userData) return null

  await connect()
  const user = {
    googleId: sessionData.id,
    cues: [],
    invitesRemaining: properties?.invitesRemaining || 1
  }
  const newUser = await User.create(user)
  return newUser
}
