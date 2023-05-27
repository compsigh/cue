// Auth.js
import { getServerSession } from 'next-auth/next'
import { getToken } from 'next-auth/jwt'

// Database imports
import connect from '@/functions/db-connect.js'
import User from '@/schemas/user-schema.js'

// Utils imports
import { OpenAIStream } from '../../../utils/OpenAIStream'

if (!process.env.OPENAI_API_KEY)
  throw new Error('Missing OpenAI API key.')

export const runtime = 'edge';

function generatePrompt (notes) {
  return `From the given notes, suggest study questions to use as active recall prompts.
Keep these in mind to curate your response:
- Only suggest questions in the context of the given notes, and not what you already know about the topic.
- Pick only the most relevant and high-level pieces of information to convert into questions.
- For each suggested question, generate a potential answer. These answers, like your suggested questions, should only be derived from the given notes, and not any prior knowledge of the subject.
- Format your response like so, and do not deviate from it:
$NOTES_IDENTIFIED
(2 new lines)
$CUE
(2 new lines)
$ANSWER
- Replace $NOTES_IDENTIFIED with a numerical value indicating the amount of separate notes processed. These may be formatted in the given notes as Markdown bullet points (-), newlines, or some other form of delineation. It is up to you to determine what that is.
- Replace $CUE with your suggested question.
- Replace $ANSWER with your generated potential answer to your suggested question.

Below are two examples of notes and relevant prompts for those notes.

First set of notes:
- To access knowledge is to access power; distribution of knowledge goes hand-in-hand with distribution of power
- Rome became a center of intellectual development
- New knowledge can subvert the old knowledge
- If new knowledge is power as well, it likewise has the ability to subvert old power
- Very learned priests were interested in figuring out the way to relate to God
- Lawyers: humans relate to each other
- Ruling class: steeped in mos maiorum
- Romans were willing to adapt other people's knowledge if it brought them advantage
- Knowledge was mainly transferred through apprenticeship or by ancestry
- Elites wanted to keep the knowledge in their hands

First set of active recall prompts:
- What was the relationship between knowledge and power in Rome?
- Why was the Roman elite hellbent on keeping new knowledge out of Rome, particularly out of the minds of commoners?
- Given how the Roman elite wanted to keep knowledge all to themselves, how was it gatekept?

Second set of notes:
- Before the appearance of Greek philosophers, there was no Roman philosophy
- Greeks brought an alternate discourse of morality i.e. Plato, Aristotle, et al.
- The idea of proper moral behavior wasn't in the hands of the elite anymore
- Cicero: oratory is the key to public life
- Teachers of oratory began to emerge, which posed a great threat to Roman elites
- 161: consuls expelled philosophers and orators from Rome
- 92: they worked their way back, expelled again

Second set of active recall prompts:
- What did the arrival of Greek philosophy mean for Rome?
- How were professional orators a threat for the Roman elite?

Now, below are the given notes to generate prompts for.

${notes}

Suggested active recall prompts:
`
}

export async function POST (req) {
  try {
    const session = await getServerSession()

    if (!session)
      return new Response('Unauthorized', { status: 401 })

    // Search the database for the user's ID
    await connect()
    const token = await getToken({ req })
    const user = await User.findOne({ googleId: token.sub })

    const { notes } = await req.json()

    if (!notes)
      return new Response('Missing notes.', { status: 400 })

    const payload = {
      model: 'gpt-4',
      messages: [{ role: 'user', content: generatePrompt(notes) }],
      temperature: 0.3,
      user: user.id,
      stream: true
    }

    const stream = await OpenAIStream(payload)
    return new Response(stream)
  }
  catch (error) {
    console.error('[generate] error: ', error)
  }
}
