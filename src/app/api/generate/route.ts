// import { getUser } from '@/functions/user-management'
import { checkAuth } from '@/functions/check-auth'
import { NextResponse } from 'next/server'
import { OpenAIStream } from '@/utils/OpenAIStream'
import { auth } from 'auth'
import { generatePrompt } from './prompt'

if (!process.env.OPENAI_API_KEY)
  throw new Error('Missing OpenAI API key.')

export const runtime = 'edge'

/* TODO: generation tracking
async function getUserGenerations (user) {
  let generations = await kv.hget(`user:${user.sessionData.sub}`, 'generations') || []
  const now = Date.now()
  const week = 1000 * 60 * 60 * 24 * 7
  generations = generations.filter(generation => now - generation.generatedAt < week)
  await kv.hset(`user:${user.sessionData.sub}`, { generations })
  return generations
}

async function addGeneration (user, generation) {
  const generations = await getUserGenerations(user)
  generations.push(generation)
  return await kv.hset(`user:${user.sessionData.sub}`, { generations })
}
*/

export async function POST (req: Request) {
  try {
    // const user = await getUser()
    const session = await auth()
    const authed = await checkAuth(session)
    if (!authed) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

    const { notes } = await req.json() as { notes: string }

    if (!notes)
      return new NextResponse(
        JSON.stringify({ error: 'Missing notes.' }),
        { status: 400, statusText: 'Missing notes.' }
      )

    /*
    const generations = await getUserGenerations(user)
    if (generations.length >= 10)
      return NextResponse.json(
        { error: 'You have reached the maximum number of cue generations (10) for the week. Please wait a bit before generating more.' },
        { status: 400, statusText: 'You have reached the maximum number of cue generations (10) for the week. Please wait a bit before generating more.' }
      )

    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const now = Date.now()
    const generation = constructGeneration({ id, generatedAt: now })
    await addGeneration(user, generation)
    */

    const payload = {
      model: 'gpt-4',
      messages: [{ role: 'user', content: generatePrompt(notes) }],
      temperature: 0.3,
      user: session.user.id,
      stream: true
    }

    const stream = await OpenAIStream(payload)
    return new NextResponse(stream)
  }
  catch (error) {
    console.error('[generate] error: ', error)
  }
}
