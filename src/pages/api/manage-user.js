import { getServerSession } from 'next-auth/next'
import connect from '@/functions/db-connect.js'
import User from '@/schemas/user-schema.js'

export default async function handler (req, res) {
  const session = await getServerSession(req, res)

  if (!session) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  const { id, action, data } = req.body

  if (!id || !action) {
    res.status(400).json({ error: 'Bad Request' })
    return
  }

  await connect()

  if (action === 'create') {
    const newUser = await User.create({
      googleId: id,
      cues: []
      // TODO: figure out invitesRemaining based on whether the user was invited or not
    })
    return res.status(200).json(newUser)
  }

  if (action === 'delete') {
    const deletedUser = await User.findOneAndDelete({ googleId: id })
    return res.status(200).json(deletedUser)
  }

  if (action === 'update') {
    const updatedUser = await User.findOneAndUpdate({ googleId: id }, data)
    return res.status(200).json(updatedUser)
  }

  return res.status(400).json({ error: 'Bad Request' })
}
