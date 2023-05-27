// Auth.js
import { getServerSession } from 'next-auth/next'
import { getToken } from 'next-auth/jwt'

// Next imports
import { NextResponse } from 'next/server'

// Database imports
import connect from '@/functions/db-connect.js'
import User from '@/schemas/user-schema.js'

export async function GET (req) {
  try {
    const session = await getServerSession()

    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Search the database for the user's ID
    await connect()
    const token = await getToken({ req })
    const user = await User.findOne({ googleId: token.sub })

    // Associate the user's session data with the user's database data and return as one object
    const userData = JSON.parse(JSON.stringify(user))
    const sessionData = session.user

    return NextResponse.json({
      sessionData: sessionData || null,
      userData: userData || null,
      id: token.sub || null
    }, { status: 200 })
  }
  catch (error) {
    NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST () {
  try {
    const session = await getServerSession()

    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

      const newUser = await User.create({
        googleId: id,
        cues: []
        // TODO: figure out invitesRemaining based on whether the user was invited or not
      })
      return NextResponse.json(newUser, { status: 200 })
  }
  catch (error) {
    NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT (req) {
  try {
    const session = await getServerSession()

    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id, data } = req.body

    if (!id || !data)
      return NextResponse.json({ error: 'Bad Request' }, { status: 400 })

    await connect()
    const updatedUser = await User.findOneAndUpdate({ googleId: id }, data)
    return NextResponse.json(updatedUser, { status: 200 })
  }
  catch (error) {
    NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE (req) {
  const session = await getServerSession()

  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = req.body

  if (!id)
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 })

  await connect()
  const deletedUser = await User.findOneAndDelete({ googleId: id })
  return NextResponse.json(deletedUser, { status: 200 })
}
