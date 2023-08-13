import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

export const inviteSchema = {
  source: '',
  conditions: [],
  expires: Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles' }).format(new Date(new Date().getFullYear() + 1, 0, 1)),
  valid: true,
  createdAt: Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles' }).format(new Date())
}

async function run () {
  const invitees = []

  for (const invitee of invitees) {
    const invite = { ...inviteSchema }
    invite.source = 'v0.5.0-invites'
    invite.conditions = ['use-once', 'expires', 'no-invite']

    await kv.hset(`invite:${invitee}`, invite)
    console.log(`Created invite for ${invitee}`)
  }

  console.log('Done.')
}

export async function GET () {
  if (process.env.NODE_ENV !== 'development')
    return NextResponse.json({ error: 'This is a dev-mode debug API route.' }, { status: 403 })
  await run()
  return NextResponse.json({ success: true })
}
