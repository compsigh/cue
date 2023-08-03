import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'
import { getSessionData } from '@/functions/user-management'

export async function GET () {
  const sessionData = await getSessionData()
  if (!sessionData) return NextResponse.json({ error: 'You\'re not signed in!' }, { status: 401 })
  const userData = await kv.get(sessionData.sub)
  if (!userData) return NextResponse.json({
    error: 'You\'re singed in but we couldn\'t find your data! Visit the profile page to have it generated.'
  }, { status: 401 })
  return NextResponse.json(userData)
}
