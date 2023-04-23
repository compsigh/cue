import { getServerSession } from 'next-auth/next'
import getUserSessionAndData from '@/functions/get-user-session-and-data.js'

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res)

    if (!session) {
      res.status(401).json({ error: "Unauthorized" })
      return
    }

    const userData = await getUserSessionAndData(req, res)
    res.status(200).json(userData)
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" })
  }
}
