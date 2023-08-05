import { kv } from '@vercel/kv'
import connect from '@/functions/db-connect'
import Invite from '@/schemas/invite-schema'
import { NextResponse } from 'next/server'

export const inviteSchema = {
  source: '',
  conditions: [],
  expires: Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles' }).format(new Date(new Date().getFullYear() + 1, 0, 1)),
  valid: true,
  createdAt: Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles' }).format(new Date())
}

async function copy () {
  await connect()
  console.log('Connected to MongoDB.')
  let invites = await Invite.find({})
  invites = JSON.parse(JSON.stringify(invites))
  console.log(`Found ${invites.length} invites.`)

  for (const invite of invites) {
    console.log(`Copying invite code: ${invite.code}...`)
    // const copiedInvite = { ...inviteProperties }
    const copiedInvite = {}
    Object.keys(invite).forEach(key => {
      if (key === '_id' || key === '__v' || key === 'code') return
      if (key === 'inviteId') {
        if (invite[key] <= 50)
          copiedInvite.cardId = invite[key]
      }
      else
        copiedInvite[key] = invite[key]
      console.log(`[${invite.code}] Original key: ${key} — ${invite[key]} (${typeof invite[key]}))`)
      console.log(`[${invite.code}] Copied key: ${key} — ${copiedInvite[key]} (${typeof copiedInvite[key]}))`)
    })

    await kv.hset(`invite:${invite.code}`, copiedInvite)
    console.log(`Copied invite code: ${invite.code}`)
  }
}

export async function GET () {
  if (process.env.NODE_ENV !== 'development')
    return NextResponse.json({ error: 'This is a dev-mode debug API route.' }, { status: 403 })
  await copy()
  return NextResponse.json({ success: true })
}
