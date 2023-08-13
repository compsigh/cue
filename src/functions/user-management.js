import { auth } from '@/../auth'
import { kv } from '@vercel/kv'

export const schema = {
  generations: [],
  savedCues: [],
  invitesRemaining: 1
}

// TODO: remove authParams once transition to App Router is complete

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

export async function getUserData (authParams) {
  let sessionData
  if (authParams)
    sessionData = await getSessionData(authParams)
  else
    sessionData = await getSessionData()
  if (!sessionData) return null
  const userData = await kv.hgetall(`user:${sessionData.sub}`)
  return userData
}

export async function getUser (authParams) {
  let sessionData
  if (authParams)
    sessionData = await getSessionData(authParams)
  else
    sessionData = await getSessionData()

  let userData
  if (authParams)
    userData = await getUserData(authParams)
  else
    userData = await getUserData()

  return {
    sessionData: sessionData || null,
    userData: userData || null
  }
}

export async function createUser (properties) {
  const { sessionData, userData } = await getUser()
  if (userData) return null

  const newUserData = { ...schema }
  if (properties)
    Object.keys(properties).forEach(key => {
      newUserData[key] = properties[key]
    })

  const newUser = await kv.hset(`user:${sessionData.sub}`, newUserData)
  return newUser
}
