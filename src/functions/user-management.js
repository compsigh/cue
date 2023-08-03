import { auth } from '@/../auth'
import { kv } from '@vercel/kv'
// TODO: schema validation

export async function getSessionData (authParams) {
  let session
  if (authParams)
    session = await auth(authParams)
  else
    session = await auth()
  if (!session) return null
  const sessionData = session.user
  return sessionData
}

export async function getUserData () {
  const sessionData = await getSessionData()
  if (!sessionData) return null
  const userData = await kv.get(sessionData.sub)
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
  const newUser = await kv.set(sessionData.sub, {
    googleId: sessionData.sub,
    cues: [],
    invitesRemaining: properties?.invitesRemaining || 1
  })
  return newUser
}
