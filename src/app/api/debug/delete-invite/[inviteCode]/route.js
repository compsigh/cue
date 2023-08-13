import { remove } from '@/functions/invite-management'
import { NextResponse } from 'next/server'

export async function GET (request, { params }) {
  if (process.env.NODE_ENV !== 'development')
    return NextResponse.json({ error: 'This is a dev-mode debug API route.' }, { status: 403 })
  const inviteCode = params.inviteCode
  const invite = await remove(inviteCode)
  if (!invite) return NextResponse.json({ error: 'Invite not found.' }, { status: 404 })
  return NextResponse.json(invite)
}
