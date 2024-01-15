import { auth } from '@/../auth'

/**
 * @deprecated Until we migrate to a new database, use `auth()`.
 */
export async function getSessionData () {
  const session = await auth()
  if (!session) return null
  return session.user
}

/**
 * @deprecated Until we migrate to a new database, use `auth()`.
 */
export async function getUserData () {
  // const sessionData = await getSessionData()
  // if (!sessionData) return null
  // const userData = await kv.hgetall(`user:${sessionData.}`)
  // return userData
  return new Error('User management not yet migrated')
}

/**
 * @deprecated Until we migrate to a new database, use `auth()`.
 */
export async function getUser () {
  // const sessionData = await getSessionData()
  // const userData = await getUserData()

  // return {
  //   sessionData,
  //   userData
  // }

  return new Error('User management not yet migrated')
}

/**
 * @deprecated Until we migrate to a new database, do not create users.
 */
export async function createUser (properties: {} | { invitesRemaining: number }) {
  properties = properties || {}
  /*
  const { sessionData, userData } = await getUser()
  if (userData) return null

  const newUserData = { ...schema }
  if (properties)
    Object.keys(properties).forEach(key => {
      newUserData[key] = properties[key]
    })

  const newUser = await kv.hset(`user:${sessionData.sub}`, newUserData)
  return newUser
  */
  return new Error('User management not yet migrated')
}
